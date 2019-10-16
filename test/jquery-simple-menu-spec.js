describe('jquery-simple-menu', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  it('opens menu by click', () => {
    let $menu = $('#click_menu');
    let $menuItem = $menu.find('li').first();
    let $link = $menuItem.find('a').first();

    $link.trigger('click');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(true);

    $link.trigger('click');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(false);

    $link.trigger('click');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(true);

    $(document).trigger('click');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(false);

    spyOn(window, 'alert');
    $menu.find('a[href="#Menu3"]').trigger('click');
    expect(window.alert).toHaveBeenCalledWith('#Menu3');
  });

  it('keeps opened menu by click', () => {
    let $menu = $('#click_keep_menu');
    let $menuItem = $menu.find('li').first();
    let $link = $menuItem.find('a').first();

    $link.trigger('click');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(true);

    $menuItem.find('ul:first-of-type > li:first-child > a:first-child').trigger('click');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(true);
  });

  it('opens menu by hovering', () => {
    let $menu = $('#hover_menu');
    let $menuItem = $menu.find('li').first();
    let $link = $menuItem.find('a').first();

    $menuItem.trigger('mouseenter');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(true);

    $link.trigger('click');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(true);

    $menuItem.trigger('mouseleave');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(false);
  });

  it('keeps opened menu by hovering', () => {
    let $menu = $('#hover_keep_menu');
    let $menuItem = $menu.find('li').first();
    let $link = $menuItem.find('a').first();

    $menuItem.trigger('mouseenter');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(true);

    let $firstItem = $menuItem.find('ul:first-of-type > li:first-child > a:first-child');
    $firstItem.trigger('click');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(true);
    expect($firstItem.parent().hasClass('simple-menu-checked')).toEqual(true);

    $firstItem.trigger('click');
    expect($menuItem.hasClass('simple-menu-opened')).toEqual(true);
    expect($firstItem.parent().hasClass('simple-menu-checked')).toEqual(false);
  });

  it('opens context menu', () => {
    let $menu = $('#context_menu');
    let $container = $('#container');

    $container.trigger('contextmenu');
    expect($menu.is(':visible')).toEqual(true);

    $container.trigger('click');
    expect($menu.is(':visible')).toEqual(false);
  });

  it('destroy', () => {
    eval($('script').text());
    let $menu = $('#click_menu');
    $menu.data('simple-menu').destroy();

    expect($menu.hasClass('simple-upload')).toEqual(false);
    expect($._data($menu.get(0), 'events')).toEqual(undefined);
  });
});
