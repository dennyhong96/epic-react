/*! For license information please see 13.e948a1d5.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-hooks"]=this["webpackJsonpreact-hooks"]||[]).push([[13],{183:function(e,n,t){"use strict";e.exports=t(184)},184:function(e,n,t){"use strict";t(53);var r=t(1),o=60103;if(n.Fragment=60107,"function"===typeof Symbol&&Symbol.for){var a=Symbol.for;o=a("react.element"),n.Fragment=a("react.fragment")}var c=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,s={key:!0,ref:!0,__self:!0,__source:!0};function u(e,n,t){var r,a={},u=null,m=null;for(r in void 0!==t&&(u=""+t),void 0!==n.key&&(u=""+n.key),void 0!==n.ref&&(m=n.ref),n)i.call(n,r)&&!s.hasOwnProperty(r)&&(a[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===a[r]&&(a[r]=n[r]);return{$$typeof:o,type:e,key:u,ref:m,props:a,_owner:c.current}}n.jsx=u,n.jsxs=u},185:function(e,n,t){"use strict";t.d(n,"c",(function(){return l})),t.d(n,"b",(function(){return d})),t.d(n,"a",(function(){return p})),t.d(n,"d",(function(){return m}));t(41);var r=t(6),o=t(5),a=t.n(o),c=t(24),i=t(1),s=(t(54),t(183)),u=function(e){return"".concat(e.getHours(),":").concat(String(e.getMinutes()).padStart(2,"0")," ").concat(String(e.getSeconds()).padStart(2,"0"),".").concat(String(e.getMilliseconds()).padStart(3,"0"))};function m(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500,t="\n    query PokemonInfo($name: String) {\n      pokemon(name: $name) {\n        id\n        number\n        name\n        image\n        attacks {\n          special {\n            name\n            type\n            damage\n          }\n        }\n      }\n    }\n  ";return window.fetch("https://graphql-pokemon2.vercel.app/",{method:"POST",headers:{"content-type":"application/json;charset=UTF-8",delay:n},body:JSON.stringify({query:t,variables:{name:e.toLowerCase()}})}).then(function(){var n=Object(c.a)(a.a.mark((function n(t){var r,o,c,i,s;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.json();case 2:if(r=n.sent,o=r.data,!t.ok){n.next=14;break}if(!(c=null===o||void 0===o?void 0:o.pokemon)){n.next=11;break}return c.fetchedAt=u(new Date),n.abrupt("return",c);case 11:return n.abrupt("return",Promise.reject(new Error('No pokemon with the name "'.concat(e,'"'))));case 12:n.next=16;break;case 14:return s={message:null===o||void 0===o||null===(i=o.errors)||void 0===i?void 0:i.map((function(e){return e.message})).join("\n")},n.abrupt("return",Promise.reject(s));case 16:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}function l(e){var n=e.name,t={name:i.useRef(n).current,number:"XXX",image:"/img/pokemon/fallback-pokemon.jpg",attacks:{special:[{name:"Loading Attack 1",type:"Type",damage:"XX"},{name:"Loading Attack 2",type:"Type",damage:"XX"}]},fetchedAt:"loading..."};return Object(s.jsx)(p,{pokemon:t})}function p(e){var n=e.pokemon;return Object(s.jsxs)("div",{children:[Object(s.jsx)("div",{className:"pokemon-info__img-wrapper",children:Object(s.jsx)("img",{src:n.image,alt:n.name})}),Object(s.jsx)("section",{children:Object(s.jsxs)("h2",{children:[n.name,Object(s.jsx)("sup",{children:n.number})]})}),Object(s.jsx)("section",{children:Object(s.jsx)("ul",{children:n.attacks.special.map((function(e){return Object(s.jsxs)("li",{children:[Object(s.jsx)("label",{children:e.name}),":"," ",Object(s.jsxs)("span",{children:[e.damage," ",Object(s.jsxs)("small",{children:["(",e.type,")"]})]})]},e.name)}))})}),Object(s.jsx)("small",{className:"pokemon-info__fetch-time",children:n.fetchedAt})]})}function d(e){var n=e.pokemonName,t=e.initialPokemonName,o=void 0===t?n||"":t,a=e.onSubmit,c=i.useState(o),u=Object(r.a)(c,2),m=u[0],l=u[1];function p(e){l(e),a(e)}return i.useEffect((function(){"string"===typeof n&&l(n)}),[n]),Object(s.jsxs)("form",{onSubmit:function(e){e.preventDefault(),a(m)},className:"pokemon-form",children:[Object(s.jsx)("label",{htmlFor:"pokemonName-input",children:"Pokemon Name"}),Object(s.jsxs)("small",{children:["Try"," ",Object(s.jsx)("button",{className:"invisible-button",type:"button",onClick:function(){return p("pikachu")},children:'"pikachu"'}),", ",Object(s.jsx)("button",{className:"invisible-button",type:"button",onClick:function(){return p("charizard")},children:'"charizard"'}),", or ",Object(s.jsx)("button",{className:"invisible-button",type:"button",onClick:function(){return p("mew")},children:'"mew"'})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{className:"pokemonName-input",id:"pokemonName-input",name:"pokemonName",placeholder:"Pokemon Name...",value:m,onChange:function(e){l(e.target.value)}}),Object(s.jsx)("button",{type:"submit",disabled:!m.length,children:"Submit"})]})]})}},225:function(e,n,t){"use strict";t.r(n);var r=t(6),o=t(1),a=t(185),c=t(183);function i(e){var n=e.pokemonName,t=o.useState({status:"idle",pokemon:null,error:null}),i=Object(r.a)(t,2),s=i[0],u=i[1],m=s.status,l=s.pokemon,p=s.error;if(o.useEffect((function(){n&&(u({status:"pending"}),Object(a.d)(n).then((function(e){u({status:"resolved",pokemon:e})}),(function(e){u({status:"rejected",error:e})})))}),[n]),"idle"===m)return"Submit a pokemon";if("pending"===m)return Object(c.jsx)(a.c,{name:n});if("rejected"===m)return Object(c.jsxs)("div",{children:["There was an error:"," ",Object(c.jsx)("pre",{style:{whiteSpace:"normal"},children:p.message})]});if("resolved"===m)return Object(c.jsx)(a.a,{pokemon:l});throw new Error("This should be impossible")}n.default=function(){var e=o.useState(""),n=Object(r.a)(e,2),t=n[0],s=n[1];return Object(c.jsxs)("div",{className:"pokemon-info-app",children:[Object(c.jsx)(a.b,{pokemonName:t,onSubmit:function(e){s(e)}}),Object(c.jsx)("hr",{}),Object(c.jsx)("div",{className:"pokemon-info",children:Object(c.jsx)(i,{pokemonName:t})})]})}}}]);
//# sourceMappingURL=13.e948a1d5.chunk.js.map