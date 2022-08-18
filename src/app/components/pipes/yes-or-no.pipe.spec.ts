import { YesOrNoPipe } from './yes-or-no.pipe';

describe('YesOrNoPipe', () => {
  it('create an instance', () => {
    const pipe = new YesOrNoPipe();
    expect(pipe).toBeTruthy();
  });
});
