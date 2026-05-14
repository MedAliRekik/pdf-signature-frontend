import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSignaturePageComponent } from './pdf-signature-page.component';

describe('PdfSignaturePageComponent', () => {
  let component: PdfSignaturePageComponent;
  let fixture: ComponentFixture<PdfSignaturePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfSignaturePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfSignaturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
