describe('jquery-simple-menu', () => {
  it('config', () => {
    let defaults = $.SimpleMenu.getDefaults();
    expect(defaults.test).toEqual(undefined);

    defaults = $.SimpleMenu.setDefaults({test: 'test'});
    expect(defaults.test).toEqual('test');
  });
});
