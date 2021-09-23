import { TestBed, inject } from '@angular/core/testing';

import { DeviceActivityService } from './device-activity.service';

describe('DeviceActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceActivityService]
    });
  });

  it('should be created', inject([DeviceActivityService], (service: DeviceActivityService) => {
    expect(service).toBeTruthy();
  }));
});
