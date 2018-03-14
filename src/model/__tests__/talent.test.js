// Test the Talent functionality
import * as talent from '../talent.js';

describe('test the Talent endpoint', () => {
  it('should get all talent when you call getTalent', () => {
    expect.assertions(1);
    const data = talent.getTalent();
    expect(data).not.toBeUndefined();
  });
});
