# jquery-simple-menu

A jquery plugin for simple menu.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-menu --save

## Basic usage

Build html as follows:

```html
<ul id="menu">
  <li>
    <a href="#">Menu</a>
    <ul style="width: 120px;">
      <li><a href="#">Menu1</a></li>
      <li><a href="#">Menu2</a></li>
      <li><a href="#">Menu3</a></li>
    </ul>
  </li>
</ul>
```

Then run:

```javascript
$('#menu').simpleMenu();
```

Open menu by mouse hovering:

```javascript
$('#menu').simpleMenu({
  autoOpen: true
});
```

Keep menu opened after clicking menu items:

```javascript
$('#menu').simpleMenu({
  autoOpen: true,
  keepOpen: true
});
```

Set checkable submenu:

```javascript
$('#menu').simpleMenu({
  checkable: 'ul:first'
});
```

Change to vertical align:

```javascript
$('#menu').simpleMenu({
  align: 'vertical'
});
```

## Context menu

Set context menu container as follows:

```html
<div id="container"></div>
<ul id="menu">
  <li>
    <a href="#">Menu</a>
    <ul style="width: 120px;">
      <li><a href="#">Menu1</a></li>
      <li><a href="#">Menu2</a></li>
      <li><a href="#">Menu3</a></li>
    </ul>
  </li>
</ul>
```

```javascript
$('#menu').simpleMenu({
  context: '#container',
  align: 'vertical'
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
