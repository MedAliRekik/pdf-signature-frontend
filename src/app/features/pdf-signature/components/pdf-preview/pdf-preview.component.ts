import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, ViewChildren } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as pdfjsLib from 'pdfjs-dist';
import { SignaturePosition } from '../../models/signature-position.model';
import { DraggableSignatureComponent } from '../draggable-signature/draggable-signature.component';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';

interface RenderedPage { pageNumber: number; width: number; height: number; }
@Component({
  selector: 'app-pdf-preview', standalone: true,
  imports: [CommonModule, DraggableSignatureComponent, MatCardModule], templateUrl: './pdf-preview.component.html', styleUrl: './pdf-preview.component.scss'
})
export class PdfPreviewComponent implements AfterViewInit, OnChanges {
  @ViewChildren('canvas') canvasRefs!: QueryList<ElementRef<HTMLCanvasElement>>;
  @Input() file: File | null = null;
  @Input() signerName = '';
  @Input() signaturePosition: SignaturePosition = { pageNumber: 1, x: 24, y: 24 };
  @Output() signatureMoved = new EventEmitter<SignaturePosition>();
  renderedPages: RenderedPage[] = [];

  async ngAfterViewInit(): Promise<void> { await this.renderPdf(); }
  async ngOnChanges(): Promise<void> { await this.renderPdf(); }

  async renderPdf(): Promise<void> {
    if (!this.file) { this.renderedPages = []; return; }
    const buffer = await this.file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    this.renderedPages = Array.from({ length: pdf.numPages }, (_, i) => ({ pageNumber: i + 1, width: 0, height: 0 }));
    queueMicrotask(async () => {
      for (const item of this.renderedPages) {
        const page = await pdf.getPage(item.pageNumber);
        const viewport = page.getViewport({ scale: 1.25 });
        const canvas = this.canvasRefs.get(item.pageNumber - 1)?.nativeElement;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) continue;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        item.width = viewport.width;
        item.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;
      }
    });
  }

  onSignatureMove(position: { x: number; y: number }, page: RenderedPage): void {
    this.signatureMoved.emit({ x: position.x, y: Math.max(0, page.height - position.y), pageNumber: page.pageNumber });
  }
}
