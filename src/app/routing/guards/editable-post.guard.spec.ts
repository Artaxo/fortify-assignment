import { TestBed } from '@angular/core/testing';

import { EditablePostGuard } from './editable-post.guard';

describe('EditablePostGuard', () => {
  let guard: EditablePostGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditablePostGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
