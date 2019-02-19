describe('jquery-simple-menu', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
  });

  it('opens menu', function() {
    var $menu = $('#basic_menu');
    var $link = $menu.find('li > a:first');
    $menu.simpleMenu();

    $link.click();
    expect($link.parent().hasClass('sm-opened')).toEqual(true);

    $link.click();
    expect($link.parent().hasClass('sm-opened')).toEqual(false);
  });

  it('closes menu from window event', function() {
    var $menu = $('#basic_menu');
    var $link = $menu.find('li > a:first');
    $menu.simpleMenu();

    $link.click();
    expect($link.parent().hasClass('sm-opened')).toEqual(true);

    $(document).click();
    expect($link.parent().hasClass('sm-opened')).toEqual(false);
  });
});
