import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { DraggableSignatureComponent } from '../draggable-signature/draggable-signature.component';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';

@Component({
  selector: 'app-pdf-preview',
  standalone: true,
  imports: [CommonModule, DraggableSignatureComponent],
  templateUrl: './pdf-preview.component.html',
  styleUrl: './pdf-preview.component.scss'
})
export class PdfPreviewComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() file: File | null = null;
  @Input() signerName = '';
  @Input() signatureX = 0;
  @Input() signatureY = 0;
  @Output() signatureMoved = new EventEmitter<{ x: number; y: number; pageNumber: number }>();

  canvasWidth = 0;
  canvasHeight = 0;

  async ngAfterViewInit(): Promise<void> { await this.renderPdf(); }
  async ngOnChanges(): Promise<void> { await this.renderPdf(); }

  async renderPdf(): Promise<void> {
    if (!this.file || !this.canvasRef) return;
    const buffer = await this.file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.2 });
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    this.canvasWidth = viewport.width;
    this.canvasHeight = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
  }

  onSignatureMove(position: { x: number; y: number }): void {
    const pdfY = this.canvasHeight - position.y;
    this.signatureMoved.emit({ x: position.x, y: Math.max(0, pdfY), pageNumber: 1 });
  }
}
