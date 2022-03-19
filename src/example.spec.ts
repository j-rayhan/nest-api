function addNumbers(num1: number, num2: number): number {
  return num1 + num2;
}

describe('Example test', () => {
  it('equals true', () => {
    expect(true).toEqual(true);
    expect(1 + 2).toEqual(3);
    expect('Johir').toEqual('Johir');
  });

  it('Add Tow Numbers', () => {
    expect(addNumbers(2, 5)).toEqual(7);
  })
});
