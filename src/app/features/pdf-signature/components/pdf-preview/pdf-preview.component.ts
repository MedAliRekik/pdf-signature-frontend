import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as pdfjsLib from 'pdfjs-dist';
import { firstValueFrom } from 'rxjs';
import { filter, startWith, take } from 'rxjs/operators';
import { PDFDocumentProxy, PDFPageProxy, RenderTask } from 'pdfjs-dist/types/src/display/api';
import { SignaturePosition } from '../../models/signature-position.model';
import { DraggableSignatureComponent } from '../draggable-signature/draggable-signature.component';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

interface RenderedPage { pageNumber: number; width: number; height: number; boundaryId: string; }

@Component({
  selector: 'app-pdf-preview',
  standalone: true,
  imports: [CommonModule, DraggableSignatureComponent, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './pdf-preview.component.html',
  styleUrl: './pdf-preview.component.scss'
})
export class PdfPreviewComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChildren('canvas') canvasRefs!: QueryList<ElementRef<HTMLCanvasElement>>;
  @Input() file: File | null = null;
  @Input() signerName = '';
  @Input() signaturePosition: SignaturePosition = { pageNumber: 1, x: 24, y: 24 };
  @Output() signatureMoved = new EventEmitter<SignaturePosition>();

  renderedPages: RenderedPage[] = [];
  isLoading = false;
  isRendering = false;

  private renderToken = 0;
  private pdfDocument: PDFDocumentProxy | null = null;
  private activeRenderTasks: RenderTask[] = [];
  private isViewReady = false;
  private pendingRender = false;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.isViewReady = true;
    void this.renderPdf();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file'] && this.isViewReady) {
      this.pendingRender = true;
      void this.renderPdf();
    }
  }

  ngOnDestroy(): void {
    void this.cancelRendering();
    this.cleanupCanvases();
    void this.pdfDocument?.destroy();
  }

  async renderPdf(): Promise<void> {
    if (!this.isViewReady) {
      return;
    }

    if (!this.file) {
      this.pendingRender = false;
        this.cleanupCanvases();
        this.renderedPages = [];
      return;
    }

    if (this.isRendering) {
      return;
    }

    this.pendingRender = false;
    this.isRendering = true;
    this.isLoading = true;
    this.renderToken += 1;
    const token = this.renderToken;

    await this.cancelRendering();
    this.cleanupCanvases();

    try {
      const buffer = await this.file.arrayBuffer();
      this.pdfDocument = await pdfjsLib.getDocument({ data: buffer }).promise;
      this.renderedPages = Array.from({ length: this.pdfDocument.numPages }, (_, index) => ({
        pageNumber: index + 1,
        width: 0,
        height: 0,
        boundaryId: `pdf-page-boundary-${index + 1}`
      }));
      this.cdr.detectChanges();
      await this.waitForCanvases(this.renderedPages.length);

      for (const pageMeta of this.renderedPages) {
        if (token !== this.renderToken || !this.pdfDocument) {
          return;
        }

        const page = await this.pdfDocument.getPage(pageMeta.pageNumber);
        await this.renderPage(page, pageMeta, token);
      }
    } finally {
      this.isRendering = false;
      this.isLoading = false;
      if (this.pendingRender) {
        this.pendingRender = false;
        void this.renderPdf();
      }
    }
  }

  private async waitForCanvases(expectedCount: number): Promise<void> {
    await firstValueFrom(
      this.canvasRefs.changes.pipe(
        startWith(this.canvasRefs),
        filter(() => this.canvasRefs.length >= expectedCount),
        take(1)
      )
    );
  }

  onSignatureMove(position: { x: number; y: number }, page: RenderedPage): void {
    const yFromBottom = Math.max(0, page.height - position.y);
    this.signatureMoved.emit({ x: position.x, y: yFromBottom, pageNumber: page.pageNumber });
  }

  getSignatureTop(page: RenderedPage): number {
    return Math.max(0, page.height - this.signaturePosition.y);
  }

  private async renderPage(page: PDFPageProxy, pageMeta: RenderedPage, token: number): Promise<void> {
    const viewport = page.getViewport({ scale: 1.25 });
    const canvas = this.canvasRefs.get(pageMeta.pageNumber - 1)?.nativeElement;
    const context = canvas?.getContext('2d');

    if (!canvas || !context || token !== this.renderToken) {
      return;
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    pageMeta.width = viewport.width;
    pageMeta.height = viewport.height;

    const renderTask = page.render({ canvasContext: context, viewport });
    this.activeRenderTasks.push(renderTask);

    try {
      await renderTask.promise;
    } catch (error: unknown) {
      if (!(error instanceof Error && error.name === 'RenderingCancelledException')) {
        throw error;
      }
    } finally {
      this.activeRenderTasks = this.activeRenderTasks.filter(task => task !== renderTask);
    }
  }

  private async cancelRendering(): Promise<void> {
    for (const task of this.activeRenderTasks) {
      task.cancel();
      try {
        await task.promise;
      } catch {
        // expected on cancellation
      }
    }
    this.activeRenderTasks = [];
  }

  private cleanupCanvases(): void {
    this.canvasRefs?.forEach(ref => {
      const canvas = ref.nativeElement;
      const context = canvas.getContext('2d');
      context?.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
    });
  }
}
