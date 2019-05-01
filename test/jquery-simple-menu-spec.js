describe('jquery-simple-menu', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
  });

  it('opens menu by click', function() {
    var $menu = $('#click_menu');
    var $menuItem = $menu.find('li:first');
    var $link = $menuItem.find('a:first');
    $menu.simpleMenu();

    $link.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    $link.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(false);

    $link.click();
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    $(document).click();
    expect($menuItem.hasClass('menu-opened')).toEqual(false);
  });

  it('keeps opened menu by click', function() {
    var $menu = $('#click_keep_menu');
    var $menuItem = $menu.find('li:first');
    var $link = $menuItem.find('a:first');
    $menu.simpleMenu({ keepOpen: true });

    $link.trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    $menuItem.find('ul > li:first > a:first').trigger('click');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);
  });

  it('opens menu by hovering', function() {
    var $menu = $('#hover_menu');
    var $menuItem = $menu.find('li:first');
    var $link = $menuItem.find('a:first');
    $menu.simpleMenu({ autoOpen: true });

    $menuItem.trigger('mouseenter');
    expect($menuItem.hasClass('menu-opened')).toEqual(true);

    $menuItem.trigger('mouseleave');
    expect($menuItem.hasClass('menu-opened')).toEqual(false);
  });

  it('keeps opened menu by hovering', function() {
    var $menu = $('#hover_keep_menu');
    var $menuItem = $menu.find('li:first');
    var $link = $menuItem.find('a:first');
    $menu.simpleMenu({ autoOpen: true, keepOpen: true, checkable: 'ul.submenu' });

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
    $menu.simpleMenu({ context: $container, align: 'vertical' });

    $container.trigger('contextmenu');
    expect($menu.is(':visible')).toEqual(true);

    $container.trigger('click');
    expect($menu.is(':visible')).toEqual(false);
  });
});
