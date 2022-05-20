const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should give single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('ok'), 'ok');
  });
});
