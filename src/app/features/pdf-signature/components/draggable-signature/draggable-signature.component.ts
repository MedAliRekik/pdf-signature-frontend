import { CdkDragEnd, CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-draggable-signature',
  standalone: true,
  imports: [DragDropModule],
  template: `
    <div
      cdkDrag
      class="signature"
      [cdkDragBoundary]="boundarySelector"
      [cdkDragFreeDragPosition]="{ x, y }"
      (cdkDragMoved)="onDragMoved($event)"
      (cdkDragEnded)="onDragEnded($event)"
    >
      {{ signerName || 'Signature' }}
    </div>
  `,
  styles: [
    `.signature{position:absolute;cursor:move;font-family:'Brush Script MT',cursive;font-size:32px;color:#0f172a;background:rgba(255,255,255,.95);padding:.35rem .65rem;border-radius:.6rem;border:1px dashed #64748b;box-shadow:0 8px 20px rgba(15,23,42,.15);user-select:none;z-index:5;white-space:nowrap;}`
  ]
})
export class DraggableSignatureComponent {
  @Input() x = 24;
  @Input() y = 24;
  @Input() signerName = '';
  @Input() boundarySelector = '';
  @Output() positionChange = new EventEmitter<{ x: number; y: number }>();

  onDragMoved(event: CdkDragMove): void {
    const position = event.source.getFreeDragPosition();
    this.positionChange.emit({ x: Math.max(0, position.x), y: Math.max(0, position.y) });
  }

  onDragEnded(event: CdkDragEnd): void {
    const position = event.source.getFreeDragPosition();
    this.positionChange.emit({ x: Math.max(0, position.x), y: Math.max(0, position.y) });
  }
}
