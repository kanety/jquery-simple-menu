!function(t){var a={};function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var a in n)i.d(t,a,function(e){return n[e]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/dist",i(i.s=2)}([function(e,n){e.exports=jQuery},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),c="simple-menu";function o(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var s={align:"horizontal",context:null,checkable:null,autoOpen:!1,keepOpen:!1},u=function(){function t(e){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.options=i.a.extend(!0,{},s,n),this.$menu=i()(e),this.$context=i()(this.options.context),this.uid=(new Date).getTime()+Math.random(),this.namespace="".concat(c,"-").concat(this.uid),this.init()}return function(e,n,t){n&&o(e.prototype,n),t&&o(e,t)}(t,[{key:"init",value:function(){if(this.$menu.addClass("".concat(c," ").concat(c,"-").concat(this.options.align)),this.$menu.find("ul").addClass("".concat(c,"-vertical")),this.$menu.find("li:has(>ul)").addClass("".concat(c,"-openable")),this.options.context&&this.$menu.addClass("".concat(c,"-context")).hide(),this.options.checkable){var e=this.$menu.find(this.options.checkable);e.find("li").addClass("".concat(c,"-space")),e.find("li:not(:has(>ul))").addClass("".concat(c,"-checkable"))}this.active=!1,this.unbind(),this.bind()}},{key:"destroy",value:function(){function e(e,n){var t=new RegExp("".concat(c,"(-\\S+)?"),"g");return(n.match(t)||[]).join(" ")}this.$menu.removeClass(e),this.$menu.find("ul").removeClass(e),this.$menu.find("li").removeClass(e),this.unbind()}},{key:"bind",value:function(){var t=this;this.$menu.on("click.".concat(this.namespace),"li > :not(ul)",function(e){var n=i()(e.target).parent();n.hasClass("".concat(c,"-openable"))&&e.preventDefault(),n.hasClass("".concat(c,"-checkable"))&&(t.toggleCheck(n),e.preventDefault())}),this.options.autoOpen?this.bindHover():this.bindClick(),this.options.context&&this.bindContext()}},{key:"bindClick",value:function(){var t=this;this.$menu.on("click.".concat(this.namespace),"li > :not(ul)",function(e){var n=i()(e.target).parent();t.isOpenable(n)?t.isOpened(n)?t.close(n.find("ul")):(t.openMenus(n),t.active=!0):t.options.keepOpen||(t.closeAllMenus(),t.active=!1)}),this.isTouchDevice()||this.$menu.on("mouseenter.".concat(this.namespace),"li > :not(ul)",function(e){var n=i()(e.target).parent();t.isOpenable(n)&&t.active&&t.openMenus(n)}),i()(document).on("click.".concat(this.namespace),function(e){i.a.contains(t.$menu[0],e.target)||(t.closeAllMenus(),t.active=!1)})}},{key:"bindHover",value:function(){var t=this;this.$menu.on("mouseenter.".concat(this.namespace),"li",function(e){var n=i()(e.target).parent();t.isOpenable(n)&&t.openMenus(n)}).on("mouseleave.".concat(this.namespace),"> li",function(e){t.closeAllMenus()}).on("click.".concat(this.namespace),"li > :not(ul)",function(e){var n=i()(e.target).parent();t.options.keepOpen||t.isOpenable(n)||t.closeAllMenus()})}},{key:"bindContext",value:function(){var t=this;this.$context.on("contextmenu.".concat(this.namespace),function(e){e.preventDefault(),t.$menu.css({display:"flex",position:"absolute",top:"".concat(e.pageY+1,"px"),left:"".concat(e.pageX+1,"px")})}),this.$menu.on("click.".concat(this.namespace),"li > :not(ul)",function(e){var n=i()(e.target).parent();t.isOpenable(n)||t.$menu.hide()}),i()(document).on("click.".concat(this.namespace),function(e){i.a.contains(t.$menu[0],e.target)||t.$menu.hide()})}},{key:"unbind",value:function(){this.$menu.off(".".concat(this.namespace)),this.$context.off(".".concat(this.namespace)),i()(document).off(".".concat(this.namespace))}},{key:"isOpenable",value:function(e){return e.hasClass("".concat(c,"-openable"))}},{key:"isOpened",value:function(e){return e.hasClass("".concat(c,"-opened"))}},{key:"findMenus",value:function(e){return e.parents("ul:has(.".concat(c,"-vertical, .").concat(c,"-horizontal)")).add(e.children("ul"))}},{key:"openMenus",value:function(e){var t=this;this.closeAllMenus(),this.findMenus(e).each(function(e,n){t.open(i()(n))})}},{key:"closeAllMenus",value:function(){var t=this;this.$menu.find("ul").each(function(e,n){t.close(i()(n))})}},{key:"open",value:function(e){e.parent().addClass("".concat(c,"-opened")),e.css("display","flex")}},{key:"close",value:function(e){e.parent().removeClass("".concat(c,"-opened")),e.css("display","none")}},{key:"toggleCheck",value:function(e){this.isChecked(e)?this.uncheck(e):this.check(e)}},{key:"isChecked",value:function(e){return e.hasClass("".concat(c,"-checked"))}},{key:"check",value:function(e){e.addClass("".concat(c,"-checked")),this.$menu.trigger("menu:checked",[e])}},{key:"uncheck",value:function(e){e.removeClass("".concat(c,"-checked")),this.$menu.trigger("menu:unchecked",[e])}},{key:"isTouchDevice",value:function(){return window.ontouchstart&&navigator.userAgent.match(/(iPhone|iPod|Android|Windows Phone)/i)}}],[{key:"getDefaults",value:function(){return s}},{key:"setDefaults",value:function(e){return i.a.extend(!0,s,e)}}]),t}();t(1);i.a.fn.simpleMenu=function(a){return this.each(function(e,n){var t=i()(n);t.data(c)&&t.data(c).destroy(),t.data(c,new u(t,a))})},i.a.SimpleMenu=u}]);