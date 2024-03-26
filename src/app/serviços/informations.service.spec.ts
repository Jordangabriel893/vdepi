/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InformationsService } from './informations.service';

describe('Service: Informations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InformationsService]
    });
  });

  it('should ...', inject([InformationsService], (service: InformationsService) => {
    expect(service).toBeTruthy();
  }));
});
