const sum = require('../components/sum');

test("test for sum", () => {
    expect(sum(10,3)).toBe(13);
})

test("test with object", () => {
    expect({one: 1, b: {a:2}}).toEqual({b: {a:2}, "one": 1});
})

test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  
  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  function throwError(){
    throw new Error('This is new error for testing');
  }

  test("testing throw error", () => {
    expect(() => throwError()).toThrow();
    expect(() => throwError()).toThrow(Error);
    expect(() => throwError()).toThrow('This is new error for testing');
    expect(() => throwError()).toThrow(/error/);
  })
