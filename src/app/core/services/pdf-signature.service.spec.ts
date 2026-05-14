import { TestBed } from '@angular/core/testing';

import { PdfSignatureService } from './pdf-signature.service';

describe('PdfSignatureService', () => {
  let service: PdfSignatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfSignatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
