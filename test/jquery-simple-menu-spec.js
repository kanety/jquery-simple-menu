describe('jquery-simple-menu', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  it('opens menu by click', function() {
    var $menu = $('#click_menu');
    var $menuItem = $menu.find('li:first');
    var $link = $menuItem.find('a:first');

    $link.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    $link.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(false);

    $link.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    $(document).trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(false);

    spyOn(window, 'alert');
    $menu.find('a[href="#Menu3"]').trigger('click');
    expect(window.alert).toHaveBeenCalledWith('#Menu3');
  });

  it('keeps opened menu by click', function() {
    var $menu = $('#click_keep_menu');
    var $menuItem = $menu.find('li:first');
    var $link = $menuItem.find('a:first');

    $link.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    $menuItem.find('ul > li:first > a:first').trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);
  });

  it('opens menu by hovering', function() {
    var $menu = $('#hover_menu');
    var $menuItem = $menu.find('li:first');
    var $link = $menuItem.find('a:first');

    $menuItem.trigger('mouseenter');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    $link.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    $menuItem.trigger('mouseleave');
    expect($menuItem.hasClass('menu-opened')).toEqual(false);
  });

  it('keeps opened menu by hovering', function() {
    var $menu = $('#hover_keep_menu');
    var $menuItem = $menu.find('li:first');
    var $link = $menuItem.find('a:first');

    $menuItem.trigger('mouseenter');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    var $firstItem = $menuItem.find('ul > li:first > a:first');
    $firstItem.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);
    expect($firstItem.parent().hasClass('menu-checked')).toEqual(true);

    $firstItem.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);
    expect($firstItem.parent().hasClass('menu-checked')).toEqual(false);
  });

  it('opens context menu', function() {
    var $menu = $('#context_menu');
    var $container = $('#container');

    $container.trigger('contextmenu');
    expect($menu.is(':visible')).toEqual(true);

    $container.trigger('click');
    expect($menu.is(':visible')).toEqual(false);
  });
});
