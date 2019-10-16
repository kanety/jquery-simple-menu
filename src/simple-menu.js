import $ from 'jquery';
import { NAMESPACE } from './consts';

const DEFAULTS = {
  align: 'horizontal',
  context: null,
  checkable: null,
  autoOpen: false,
  keepOpen: false
};

export default class SimpleMenu {
  constructor(menu, options = {}) {
    this.options = $.extend(true, {}, DEFAULTS, options);

    this.$menu = $(menu);
    this.$context = $(this.options.context);

    this.uid = new Date().getTime() + Math.random();
    this.namespace = `${NAMESPACE}-${this.uid}`;

    this.active = false;

    this.init();
  }

  init() {
    this.$menu.addClass(`${NAMESPACE} menu-${this.options.align}`);
    this.$menu.find('ul').addClass('menu-vertical');
    this.$menu.find('li:has(>ul)').addClass('menu-openable');

    if (this.options.context) {
      this.$menu.addClass('menu-context').hide();
    }
    if (this.options.checkable) {
      let $submenu = this.$menu.find(this.options.checkable);
      $submenu.find('li').addClass('menu-space');
      $submenu.find('li:not(:has(>ul))').addClass('menu-checkable');
    }

    this.unbind();
    this.bind();
  }

  bind() {
    if (this.options.context) {
      this.bindContext();
    }

    if (this.options.autoOpen) {
      this.bindHover();
    } else {
      this.bindClick();
    }

    this.$menu.on(`click.${this.namespace}`, 'a', (e) => {
      let $li = $(e.target).parent();
      if ($li.hasClass('menu-checkable')) {
        this.toggleCheck($li);
        e.preventDefault();
      }
      if ($li.hasClass('menu-openable')) {
        e.preventDefault();
      }
    });
  }

  bindClick() {
    this.$menu.on(`click.${this.namespace}`, '> li', (e) => {
      let $submenu = $(e.currentTarget).children('ul');
      if ($submenu.length) {
        if (this.isOpened($submenu)) {
          if (!this.options.keepOpen) {
            this.close($submenu);
            this.active = false;
          }
        } else {
          this.open($submenu);
          this.active = true;
        }
      }
    }).on(`mouseenter.${this.namespace}`, '> li', (e) => {
      if (this.active) {
        let $submenu = $(e.currentTarget).children('ul');
        if ($submenu.length) {
          this.open($submenu);
        }
      }
    });

    $(document).on(`click.${this.namespace}`, (e) => {
      if (!$.contains(this.$menu[0], e.target)) {
        this.closeAll();
        this.active = false;
      }
    });
  }

  bindHover() {
    this.$menu.on(`mouseenter.${this.namespace}`, '> li', (e) => {
      let $submenu = $(e.currentTarget).children('ul');
      if ($submenu.length) {
        this.open($submenu);
      }
    }).on(`mouseleave.${this.namespace}`, '> li', (e) => {
      let $submenu = $(e.currentTarget).children('ul');
      if ($submenu.length) {
        this.close($submenu);
      }
    });

    if (!this.options.keepOpen) {
      this.$menu.on(`click.${this.namespace}`, '> li', (e) => {
        if (e.target.parentNode != e.currentTarget) {
          let $submenu = $(e.currentTarget).children('ul');
          if ($submenu.length) {
            this.close($submenu);
          }
        }
      });
    }
  }

  bindContext() {
    this.$context.on(`contextmenu.${this.namespace}`, (e) => {
      e.preventDefault();
      this.$menu.css({
        display: 'flex',
        position: 'absolute',
        top: `${e.pageY + 1}px`,
        left: `${e.pageX + 1}px`
      });
    });

    this.$menu.on(`click.${this.namespace}`, 'a', (e) => {
      this.$menu.hide();
    });
    $(document).on(`click.${this.namespace}`, (e) => {
      this.$menu.hide();
    });
  }

  unbind() {
    this.$menu.off(`.${this.namespace}`);
    this.$context.off(`.${this.namespace}`);
    $(document).off(`.${this.namespace}`)
  }

  toggle($submenu) {
    if (this.isOpened($submenu)) {
      this.close($submenu);
    } else {
      this.open($submenu);
    }
  }

  isOpened($submenu) {
    return $submenu.parent().hasClass('menu-opened');
  }

  open($submenu) {
    this.closeAll();
    $submenu.parent().addClass('menu-opened');
    $submenu.css('display', 'flex');
  }

  close($submenu) {
    $submenu.parent().removeClass('menu-opened')
    $submenu.css('display', 'none');
  }

  closeAll() {
    this.$menu.find('> li > ul').each((i, elem) => {
      this.close($(elem));
    });
  }

  toggleCheck($li) {
    if (this.isChecked($li)) {
      this.uncheck($li);
    } else {
      this.check($li);
    }
  }

  isChecked($li) {
    return $li.hasClass('menu-checked');
  }

  check($li) {
    $li.addClass('menu-checked');
    this.$menu.trigger('menu:checked', [$li]);
  }

  uncheck($li) {
    $li.removeClass('menu-checked');
    this.$menu.trigger('menu:unchecked', [$li]);
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    return $.extend(true, DEFAULTS, options);
  }
}
