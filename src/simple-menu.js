import $ from 'jquery';
import { NAMESPACE } from './consts';

const DEFAULTS = {
  autoOpen: false,
  align: 'horizontal'
};

export default class SimpleMenu {
  constructor(menu, options = {}) {
    this.options = $.extend(true, {}, DEFAULTS, options);

    this.active = false;
    this.$menu = $(menu);

    this.init();
    this.bind();
  }

  init() {
    this.$menu.addClass(NAMESPACE).addClass(`menu-${this.options.align}`);

    this.$menu.find('ul').addClass('menu-vertical');
    this.$menu.find('li').each((i, elem) => {
      let $li = $(elem);
      if ($li.children('ul').length) {
        $li.addClass('menu-expandable');
      }
      if (this.options.autoOpen) {
        $li.addClass('menu-autoopen');
      }
    });
  }

  bind() {
    this.$menu.children('li').on(`click.${NAMESPACE}`, (e) => {
      let $submenu = $(e.currentTarget).children('ul');
      if ($submenu.length) {
        if (!this.active) {
          e.stopPropagation();
        }
        this.toggle($submenu);
        this.active = true;
      }
    }).on(`mouseenter.${NAMESPACE}`, (e) => {
      if (!this.active) {
        return;
      }
      this.closeAll();
      let $submenu = $(e.currentTarget).children('ul');
      if ($submenu.length) {
        this.open($submenu);
      }
    });

    $(document).on(`click.${NAMESPACE}`, (e) => {
      this.closeAll();
      this.active = false;
    });
  }

  unbind() {
    this.$menu.off(`.${NAMESPACE}`);
    $(document).off(`.${NAMESPACE}`);
  }

  toggle($submenu) {
    if ($submenu.parent().hasClass('menu-opened')) {
      this.close($submenu);
    } else {
      this.open($submenu);
    }
  }

  open($submenu) {
    this.closeAll();
    $submenu.parent().addClass('menu-opened');
  }

  close($submenu) {
    $submenu.parent().removeClass('menu-opened');
  }

  closeAll() {
    this.$menu.find('> li > ul').each((i, elem) => {
      this.close($(elem));
    });
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    $.extend(true, DEFAULTS, options);
  }
}
