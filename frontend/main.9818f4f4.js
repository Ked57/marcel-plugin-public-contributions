parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"epB2":[function(require,module,exports) {
function t(o){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(o)}function o(t,o,e,n,r,i,c){try{var l=t[i](c),a=l.value}catch(s){return void e(s)}l.done?o(a):Promise.resolve(a).then(n,r)}function e(t){return function(){var e=this,n=arguments;return new Promise(function(r,i){var c=t.apply(e,n);function l(t){o(c,r,i,l,a,"next",t)}function a(t){o(c,r,i,l,a,"throw",t)}l(void 0)})}}function n(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}function r(t,o){for(var e=0;e<o.length;e++){var n=o[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,o,e){return o&&r(t.prototype,o),e&&r(t,e),t}function c(o,e){return!e||"object"!==t(e)&&"function"!=typeof e?l(o):e}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(o&&o.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),o&&u(t,o)}function u(t,o){return(u=Object.setPrototypeOf||function(t,o){return t.__proto__=o,t})(t,o)}var f=function(t){function o(){var t;return n(this,o),(t=c(this,a(o).call(this))).root=document.getElementById("root"),t.interval=null,t}return s(o,Marcel.Plugin),i(o,[{key:"autoScroll",value:function(){var t=this;this.interval=setInterval(function(){window.scrollBy(0,1),window.innerHeight+window.scrollY>=document.body.offsetHeight&&(clearInterval(t.interval),window.scrollBy(0,-window.scrollY),setTimeout(function(){return t.autoScroll()},5e3))},50)}},{key:"render",value:function(){var t=e(regeneratorRuntime.mark(function t(){var o,e,n,r,i,c,l,a,s,u,f,d,y,v,b,m,p,h,w,_,g,k=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(o=this.props,e=o.backend_url,n=o.top_message,r=o.body_bg_color,i=o.body_txt_color,c=o.body_font,l=o.row_border_color,a=o.first_txt_color,s=o.stylesvar,u=void 0===s?{}:s,document.body.style.backgroundColor=r,document.body.style.color=i,document.body.style.fontFamily=c,f=document.querySelectorAll(".row"),d=0;d<f.length;d++)elements[d].style.borderTop="1px solid ".concat(l);for(y=document.querySelectorAll(".first"),v=0;v<y.length;v++)elements[v].style.color=a;return t.next=10,fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}});case 10:if((b=t.sent)&&b.ok){t.next=14;break}return console.error("no response from server"),t.abrupt("return");case 14:return t.next=16,b.json();case 16:for(m=t.sent,p=[],h=0,w=Object.keys(m);h<w.length;h++)key=w[h],p.push(m[key]);_=p.shift(),g='\n    <div class="container">\n      <div class="header">\n        '.concat(n,'\n      </div>\n      <div class="info-container">\n        ','<div class="row first">\n            <div class="row-item"><img class="thumbnail" src='.concat(_.avatarUrl,'></div>\n            <div class="row-item">').concat(_.name,'</div>\n            <div class="row-item">').concat(_.count,"</div>\n          </div>"),"\n        ").concat(p.map(function(t){return'<div class="row">\n              <div class="row-item"><img class="thumbnail" src='.concat(t.avatarUrl,'></div>\n              <div class="row-item">').concat(t.name,'</div>\n              <div class="row-item">').concat(t.count,"</div>\n            </div>")}).join(""),"\n      </div>\n    </div>"),this.root.innerHTML=g,setTimeout(function(){return k.autoScroll()},5e3),u["primary-color"]&&(this.root.style.color=u["primary-color"]),u["font-family"]&&(this.root.style.fontFamily=u["font-family"]);case 25:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}]),o}();Marcel.init(f),Marcel.changeProps({backend_url:"http://localhost:8080",body_bg_color:"#f2f2f2",body_txt_color:"#4c4c4c",body_font:"Helvetica, Arial, sans-serif",row_border_color:"#d2d6d8",first_txt_color:"#b51432",top_message:"Public contributions of Zenika Members during hacktoberfest !"});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.9818f4f4.js.map