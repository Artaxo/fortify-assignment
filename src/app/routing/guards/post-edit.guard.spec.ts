import { TestBed } from '@angular/core/testing';

import { PostEditGuard } from './post-edit.guard';

describe('PostEditGuard', () => {
  let guard: PostEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PostEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
