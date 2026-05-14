import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-draggable-signature',
  standalone: true,
  imports: [CdkDrag],
  template: `
    <div
      cdkDrag
      class="signature"
      [cdkDragBoundary]="boundarySelector"
      [cdkDragFreeDragPosition]="{ x, y }"
      (cdkDragEnded)="onDragEnded($event)"
    >
      {{ signerName || 'Signature' }}
    </div>
  `,
  styles: [
    `.signature{position:absolute;cursor:grab;font-family:'Brush Script MT',cursive;font-size:32px;color:#0f172a;background:rgba(255,255,255,.95);padding:.35rem .65rem;border-radius:.6rem;border:1px dashed #64748b;box-shadow:0 8px 20px rgba(15,23,42,.15);user-select:none;z-index:20;white-space:nowrap;pointer-events:auto;touch-action:none;}`,
    `.signature:active{cursor:grabbing;}`
  ]
})
export class DraggableSignatureComponent {
  @Input() x = 24;
  @Input() y = 24;
  @Input() signerName = '';
  @Input() boundarySelector = '';
  @Output() positionChange = new EventEmitter<{ x: number; y: number }>();

  onDragEnded(event: CdkDragEnd): void {
    const position = event.source.getFreeDragPosition();
    this.positionChange.emit({ x: Math.max(0, position.x), y: Math.max(0, position.y) });
  }
}
