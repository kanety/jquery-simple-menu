import $ from 'jquery';

import { NAMESPACE } from './consts';
import SimpleMenu from './simple-menu';
import './jquery-simple-menu.scss';

$.fn.simpleMenu = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if ($elem.data(NAMESPACE)) $elem.data(NAMESPACE).destroy();
    $elem.data(NAMESPACE, new SimpleMenu($elem, options));
  });
};

$.SimpleMenu = SimpleMenu;
