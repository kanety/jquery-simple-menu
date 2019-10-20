import $ from 'jquery';
import { NAMESPACE } from './consts';
import './simple-menu.scss';

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

    this.init();
  }

  init() {
    this.$menu.addClass(`${NAMESPACE} ${NAMESPACE}-${this.options.align}`);
    this.$menu.find('ul').addClass(`${NAMESPACE}-vertical`);
    this.$menu.find('li:has(>ul)').addClass(`${NAMESPACE}-openable`);

    if (this.options.context) {
      this.$menu.addClass(`${NAMESPACE}-context`).hide();
    }

    if (this.options.checkable) {
      let $menu = this.$menu.find(this.options.checkable);
      $menu.find('li').addClass(`${NAMESPACE}-space`);
      $menu.find('li:not(:has(>ul))').addClass(`${NAMESPACE}-checkable`);
    }

    this.active = false;

    this.unbind();
    this.bind();
  }

  destroy() {
    let detector = (i, className) => {
      let reg = new RegExp(`${NAMESPACE}(-\\S+)?`, 'g');
      return (className.match(reg) || []).join(' ');
    }
    this.$menu.removeClass(detector)
    this.$menu.find('ul').removeClass(detector);
    this.$menu.find('li').removeClass(detector)

    this.unbind();
  }

  bind() {
    this.$menu.on(`click.${this.namespace}`, 'li > :not(ul)', (e) => {
      let $li = $(e.target).parent();
      if ($li.hasClass(`${NAMESPACE}-openable`)) {
        e.preventDefault();
      }
      if ($li.hasClass(`${NAMESPACE}-checkable`)) {
        this.toggleCheck($li);
        e.preventDefault();
      }
    });

    if (this.options.autoOpen) {
      this.bindHover();
    } else {
      this.bindClick();
    }

    if (this.options.context) {
      this.bindContext();
    }
  }

  bindClick() {
    this.$menu.on(`click.${this.namespace}`, 'li > :not(ul)', (e) => {
      let $li = $(e.target).parent();
      if (this.isOpenable($li)) {
        if (this.isOpened($li)) {
          this.close($li.find('ul'));
        } else {
          this.openMenus($li);
          this.active = true;
        }
      } else if (!this.options.keepOpen) {
        this.closeAllMenus();
        this.active = false;
      }
    });

    if (!this.isTouchDevice()) {
      this.$menu.on(`mouseenter.${this.namespace}`, 'li > :not(ul)', (e) => {
        let $li = $(e.target).parent();
        if (this.isOpenable($li) && this.active) {
          this.openMenus($li);
        }
      });
    }

    $(document).on(`click.${this.namespace}`, (e) => {
      if (!$.contains(this.$menu[0], e.target)) {
        this.closeAllMenus();
        this.active = false;
      }
    });
  }

  bindHover() {
    this.$menu.on(`mouseenter.${this.namespace}`, 'li', (e) => {
      let $li = $(e.target).parent();
      if (this.isOpenable($li)) {
        this.openMenus($li);
      }
    }).on(`mouseleave.${this.namespace}`, '> li', (e) => {
      this.closeAllMenus();
    }).on(`click.${this.namespace}`, 'li > :not(ul)', (e) => {
      let $li = $(e.target).parent();
      if (!this.options.keepOpen && !this.isOpenable($li)) this.closeAllMenus();
    });
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

    this.$menu.on(`click.${this.namespace}`, 'li > :not(ul)', (e) => {
      let $li = $(e.target).parent();
      if (!this.isOpenable($li)) {
        this.$menu.hide();
      }
    });
    $(document).on(`click.${this.namespace}`, (e) => {
      if (!$.contains(this.$menu[0], e.target)) {
        this.$menu.hide();
      }
    });
  }

  unbind() {
    this.$menu.off(`.${this.namespace}`);
    this.$context.off(`.${this.namespace}`);
    $(document).off(`.${this.namespace}`)
  }

  isOpenable($li) {
    return $li.hasClass(`${NAMESPACE}-openable`);
  }

  isOpened($li) {
    return $li.hasClass(`${NAMESPACE}-opened`);
  }

  findMenus($li) {
    return $li.parents(`ul:has(.${NAMESPACE}-vertical, .${NAMESPACE}-horizontal)`).add($li.children('ul'));
  }

  openMenus($li) {
    this.closeAllMenus();
    this.findMenus($li).each((i, menu) => {
      this.open($(menu));
    });
  }

  closeAllMenus() {
    this.$menu.find('ul').each((i, menu) => {
      this.close($(menu));
    });
  }

  open($menu) {
    $menu.parent().addClass(`${NAMESPACE}-opened`);
    $menu.css('display', 'flex');
  }

  close($menu) {
    $menu.parent().removeClass(`${NAMESPACE}-opened`)
    $menu.css('display', 'none');
  }

  toggleCheck($li) {
    if (this.isChecked($li)) {
      this.uncheck($li);
    } else {
      this.check($li);
    }
  }

  isChecked($li) {
    return $li.hasClass(`${NAMESPACE}-checked`);
  }

  check($li) {
    $li.addClass(`${NAMESPACE}-checked`);
    this.$menu.trigger('menu:checked', [$li]);
  }

  uncheck($li) {
    $li.removeClass(`${NAMESPACE}-checked`);
    this.$menu.trigger('menu:unchecked', [$li]);
  }

  isTouchDevice() {
    return window.ontouchstart && navigator.userAgent.match(/(iPhone|iPod|Android|Windows Phone)/i);
  }
  
  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    return $.extend(true, DEFAULTS, options);
  }
}
