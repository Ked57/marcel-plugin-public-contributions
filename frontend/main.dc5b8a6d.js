parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"epB2":[function(require,module,exports) {
function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e,n,r,o,c,i){try{var a=t[c](i),l=a.value}catch(s){return void n(s)}a.done?e(l):Promise.resolve(l).then(r,o)}function n(t){return function(){var n=this,r=arguments;return new Promise(function(o,c){var i=t.apply(n,r);function a(t){e(i,o,c,a,l,"next",t)}function l(t){e(i,o,c,a,l,"throw",t)}a(void 0)})}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function i(e,n){return!n||"object"!==t(n)&&"function"!=typeof n?a(e):n}function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var f=function(t){function e(){var t;return r(this,e),(t=i(this,l(e).call(this))).root=document.getElementById("root"),t.interval=null,t}return s(e,Marcel.Plugin),c(e,[{key:"autoScroll",value:function(){var t=this;this.interval=setInterval(function(){window.scrollBy(0,1),window.innerHeight+window.scrollY>=document.body.offsetHeight&&(clearInterval(t.interval),window.scrollBy(0,-window.scrollY),setTimeout(function(){return t.autoScroll()},5e3))},50)}},{key:"fetchData",value:function(){var t=n(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}});case 2:if((n=t.sent)&&n.ok){t.next=6;break}return console.error("no response from server"),t.abrupt("return");case 6:return t.next=8,n.json();case 8:return t.abrupt("return",t.sent);case 9:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},{key:"computeTemplate",value:function(t,e){for(var n=[],r=0,o=Object.keys(t);r<o.length;r++)key=o[r],n.push(t[key]);var c=n.shift();return'\n    <div class="container">\n      <div class="header">\n        '.concat(e,'\n      </div>\n      <div class="info-container">\n        ','<div class="row first">\n            <div class="row-item"><img class="thumbnail" src='.concat(c.avatarUrl,'></div>\n            <div class="row-item">').concat(c.name,'</div>\n            <div class="row-item">').concat(c.count,"</div>\n          </div>"),"\n        ").concat(n.map(function(t){return'<div class="row">\n              <div class="row-item"><img class="thumbnail" src='.concat(t.avatarUrl,'></div>\n              <div class="row-item">').concat(t.name,'</div>\n              <div class="row-item">').concat(t.count,"</div>\n            </div>")}).join(""),"\n      </div>\n    </div>")}},{key:"render",value:function(){var t=n(regeneratorRuntime.mark(function t(){var e,r,o,c,i,a,l,s,u,f,d,y,m,p,v,b,h=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(e=this.props,r=e.backend_url,o=e.top_message,c=e.body_bg_color,i=e.body_txt_color,a=e.body_font,l=e.row_border_color,s=e.first_txt_color,u=e.stylesvar,f=void 0===u?{}:u,document.body.style.backgroundColor=c,document.body.style.color=i,document.body.style.fontFamily=a,d=document.querySelectorAll(".header"),y=0;y<d.length;y++)elements[y].style.borderBottom="1px solid ".concat(l),elements[y].style.backgroundColor=c,elements[y].style.color=i;for(m=document.querySelectorAll(".row"),p=0;p<m.length;p++)elements[p].style.borderTop="1px solid ".concat(l);for(v=document.querySelectorAll(".first"),b=0;b<v.length;b++)elements[b].style.color=s;return t.t0=this,t.next=13,this.fetchData(r);case 13:t.t1=t.sent,t.t2=o,this.root.innerHTML=t.t0.computeTemplate.call(t.t0,t.t1,t.t2),setTimeout(function(){return h.autoScroll()},5e3),setInterval(n(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=h,t.next=3,h.fetchData(r);case 3:t.t1=t.sent,t.t2=o,h.root.innerHTML=t.t0.computeTemplate.call(t.t0,t.t1,t.t2),console.log("Fetched updated data");case 7:case"end":return t.stop()}},t)})),36e5),f["primary-color"]&&(this.root.style.color=f["primary-color"]),f["font-family"]&&(this.root.style.fontFamily=f["font-family"]);case 20:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}]),e}();Marcel.init(f),Marcel.changeProps({backend_url:"http://localhost:8080",body_bg_color:"#f2f2f2",body_txt_color:"#4c4c4c",body_font:"Helvetica, Arial, sans-serif",row_border_color:"#d2d6d8",first_txt_color:"#b51432",top_message:"Public contributions of Zenika Members during hacktoberfest !"});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.dc5b8a6d.js.map