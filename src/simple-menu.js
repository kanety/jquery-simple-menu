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
    this.$menu.addClass(NAMESPACE).addClass(`sm-${this.options.align}`);

    this.$menu.find('ul').addClass('sm-vertical');

    this.$menu.find('li').each((i, elem) => {
      let $li = $(elem);
      if ($li.children('ul').length) {
        $li.addClass('sm-expandable');
      }
      if (this.options.autoOpen) {
        $li.addClass('sm-autoopen');
      }
    });
  }

  bind() {
    this.$menu.on(`click.${NAMESPACE}`, 'a', (e) => {
      if ($(e.target).parent().hasClass('sm-expandable')) {
        e.preventDefault();
      }
    });

    if (!this.options.autoOpen) {
      this.$menu.on(`click.${NAMESPACE}`, '> li > a', (e) => {
        let $submenu = $(e.target).parent().children('ul');
        if ($submenu.length) {
          if (!this.active) {
            e.stopPropagation();
          }
          this.toggle($submenu);
          this.active = true;
        }
      }).on(`mouseenter.${NAMESPACE}`, '> li > a', (e) => {
        if (!this.active) {
          return;
        }
        this.closeAll();
        let $submenu = $(e.target).parent().children('ul');
        if ($submenu.length) {
          this.open($submenu);
        }
      });

      $(document).on(`click.${NAMESPACE}`, (e) => {
        this.closeAll();
        this.active = false;
      });
    }
  }

  unbind() {
    this.$menu.off(`.${NAMESPACE}`);
    $(document).off(`.${NAMESPACE}`);
  }

  toggle($submenu) {
    if ($submenu.parent().hasClass('sm-opened')) {
      this.close($submenu);
    } else {
      this.open($submenu);
    }
  }

  open($submenu) {
    this.closeAll();
    $submenu.parent().addClass('sm-opened');
    $submenu.css('display', 'flex');
  }

  close($submenu) {
    $submenu.parent().removeClass('sm-opened')
    $submenu.css('display', 'none');
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
