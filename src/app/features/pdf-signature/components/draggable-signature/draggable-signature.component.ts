import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-draggable-signature',
  standalone: true,
  template: `<div class="signature" [style.left.px]="x" [style.top.px]="y" (mousedown)="startDrag($event)">{{ signerName || 'Signature' }}</div>`,
  styles: [`.signature{position:absolute;cursor:move;font-family:'Brush Script MT',cursive;font-size:34px;color:#1d3557;background:rgba(255,255,255,.75);padding:.25rem .5rem;border-radius:.5rem;border:1px dashed #457b9d;user-select:none;}`]
})
export class DraggableSignatureComponent {
  @Input() x = 24;
  @Input() y = 24;
  @Input() signerName = '';
  @Output() positionChange = new EventEmitter<{ x: number; y: number }>();

  startDrag(event: MouseEvent): void {
    event.preventDefault();
    const startX = event.clientX - this.x;
    const startY = event.clientY - this.y;
    const onMove = (moveEvent: MouseEvent) => {
      this.positionChange.emit({ x: Math.max(0, moveEvent.clientX - startX), y: Math.max(0, moveEvent.clientY - startY) });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }
}
