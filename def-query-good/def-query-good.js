!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";n.r(e);n(2),n(4)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=function(){function t(){this._panelOptionsForm={bottom:"0em",right:"50px",top:"50px",left:"450px"}}return t.prototype.init=function(e){this.mapApi=e,this.config=this._RV.getConfig("plugins").defQueryGood,this.config.language=this._RV.getCurrentLang(),this._button=this.mapApi.mapI.addPluginButton(t.prototype.translations[this._RV.getCurrentLang()].placeHolder,this.onMenuItemClick()),this._panelForm=this.mapApi.panels.create("customForm"),this._panelForm.element.css(this._panelOptionsForm),this._panelForm.header.title=t.prototype.translations[this._RV.getCurrentLang()].placeHolder,this._panelForm.header.closeButton,this._panelForm.open(),this.setAngular(),this._panelForm.body=o.SAMPLE_BUTTON,this._panelForm.body.append(this.compileTemplate(o.SAMPLE_BUTTON))},t.prototype.onMenuItemClick=function(){return function(){console.log("side menu clicked")}},t.prototype.setAngular=function(){this.mapApi.agControllerRegister("SampleCtrl",(function(){this.sampleFunction=function(){console.log("click")}}))},t.prototype.compileTemplate=function(t){var e=$(t);return this.mapApi.$compile(e),e},t}();e.default=r,r.prototype.translations={"en-CA":{placeHolder:"translation"},"fr-CA":{placeHolder:"traduction"}},window.DefQueryGood=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SAMPLE_BUTTON='\n<div class="" ng-controller="SampleCtrl as ctrl">\n    <md-button\n        aria-label="{{ \'plugins.myFirstPlugin.placeHolder\' | translate }}"\n        class="rv-button-square md-button ng-scope md-ink-ripple"\n        ng-click="ctrl.sampleFunction()">\n            {{ \'plugins.myFirstPlugin.placeHolder\' | translate }}\n        <md-tooltip>{{ \'plugins.myFirstPlugin.placeHolder\' | translate }}</md-tooltip>\n    </md-button>\n</div>\n'},function(t,e,n){}]);