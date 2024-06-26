/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedMethodsService } from './shared-methods.service';

describe('Service: SharedMethods', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedMethodsService]
    });
  });

  it('should ...', inject([SharedMethodsService], (service: SharedMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
