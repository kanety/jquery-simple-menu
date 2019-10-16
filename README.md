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

### Options

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

Change to vertical align:

```javascript
$('#menu').simpleMenu({
  align: 'vertical'
});
```

### Checkable menu

```javascript
$('#menu').simpleMenu({
  checkable: '.checkable-submenu'
}).on('menu:checked', function(e, $li) {
  ...
}).on('menu:unchecked', function(e, $li) {
  ...
})
```

### Context menu

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

## Other example

Use button tag instead of a tag:

```html
<ul id="menu">
  <li>
    <button>Menu</button>
    <ul style="width: 120px;">
      <li><a href="#">Menu1</a></li>
      <li><a href="#">Menu2</a></li>
      <li><a href="#">Menu3</a></li>
    </ul>
  </li>
</ul>
```

```javascript
$('#menu').simpleMenu();
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
