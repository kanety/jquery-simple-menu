# jquery-simple-menu

A jquery plugin for simple menu.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-menu --save

## Usage

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

Open menu automatically on mouseover:

```javascript
$('#menu').simpleMenu({
  autoOpen: true
});
```

Charnge to vertical align:

```javascript
$('#menu').simpleMenu({
  align: 'vertical'
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
