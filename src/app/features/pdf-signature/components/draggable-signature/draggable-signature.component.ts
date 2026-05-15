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
      [attr.data-signature-id]="id"
      [cdkDragBoundary]="boundarySelector"
      [cdkDragFreeDragPosition]="{ x, y }"
      (cdkDragEnded)="onDragEnded($event)"
    >
      <button class="remove-btn" type="button" (click)="remove.emit(id)">×</button>
      {{ signerName || 'Signature' }}
      <span class="signature-debug">SIGNATURE HERE</span>
    </div>
  `,
  styles: [
    `.signature{position:absolute;top:0;left:0;cursor:grab;font-family:'Brush Script MT',cursive;font-size:32px;color:#000;background:rgba(255,255,204,.98);padding:.35rem .65rem;border-radius:.6rem;border:2px solid #000;box-shadow:0 8px 20px rgba(15,23,42,.15);user-select:none;z-index:999;white-space:nowrap;pointer-events:auto;touch-action:none;}`,
    `.signature:active{cursor:grabbing;}`,
    `.signature-debug{display:block;font-family:Arial,sans-serif;font-size:11px;line-height:1.2;font-weight:700;color:#000;}`,
    `.remove-btn{position:absolute;top:-8px;right:-8px;border-radius:50%;border:1px solid #111;background:#fff;color:#111;width:20px;height:20px;line-height:16px;cursor:pointer;}`
  ]
})
export class DraggableSignatureComponent {
  @Input() id = '';
  @Input() x = 24;
  @Input() y = 24;
  @Input() signerName = '';
  @Input() boundarySelector = '';
  @Output() positionChange = new EventEmitter<{ id: string; x: number; y: number }>();
  @Output() remove = new EventEmitter<string>();

  onDragEnded(event: CdkDragEnd): void {
    const position = event.source.getFreeDragPosition();
    this.positionChange.emit({ id: this.id, x: Math.max(0, position.x), y: Math.max(0, position.y) });
  }
}
