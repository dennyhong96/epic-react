/*! For license information please see 23.17db9e25.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-hooks"]=this["webpackJsonpreact-hooks"]||[]).push([[23],{183:function(e,t,r){"use strict";e.exports=r(184)},184:function(e,t,r){"use strict";r(53);var n=r(1),a=60103;if(t.Fragment=60107,"function"===typeof Symbol&&Symbol.for){var o=Symbol.for;a=o("react.element"),t.Fragment=o("react.fragment")}var c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,s={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,r){var n,o={},u=null,l=null;for(n in void 0!==r&&(u=""+r),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(l=t.ref),t)i.call(t,n)&&!s.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===o[n]&&(o[n]=t[n]);return{$$typeof:a,type:e,key:u,ref:l,props:o,_owner:c.current}}t.jsx=u,t.jsxs=u},198:function(e,t,r){"use strict";r.r(t);var n=r(6),a=r(1),o=r(183);function c(e){var t=e.name,r=e.onNameChange;return Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{htmlFor:"name",children:"Name: "}),Object(o.jsx)("input",{id:"name",value:t,onChange:r})]})}function i(){var e=a.useState(""),t=Object(n.a)(e,2),r=t[0],c=t[1];return Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{htmlFor:"animal",children:"Favorite Animal: "}),Object(o.jsx)("input",{id:"animal",value:r,onChange:function(e){return c(e.target.value)}})]})}function s(e){var t=e.name;return Object(o.jsx)("div",{children:"Hey ".concat(t,", you are great!")})}t.default=function(){var e=a.useState(""),t=Object(n.a)(e,2),r=t[0],u=t[1];return Object(o.jsxs)("form",{children:[Object(o.jsx)(c,{name:r,onNameChange:function(e){return u(e.target.value)}}),Object(o.jsx)(i,{}),Object(o.jsx)(s,{name:r})]})}}}]);
//# sourceMappingURL=23.17db9e25.chunk.js.map