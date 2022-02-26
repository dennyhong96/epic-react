(this["webpackJsonpreact-hooks"]=this["webpackJsonpreact-hooks"]||[]).push([[40],{186:function(e,t,a){"use strict";a.d(t,"a",(function(){return h}));var n=a(1),o=a.n(n);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var c=o.a.createContext({}),i=function(e){var t=o.a.useContext(c),a=t;return e&&(a="function"===typeof e?e(t):p(p({},t),e)),a},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,s=e.originalType,r=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=i(a),h=n,b=d["".concat(r,".").concat(h)]||d[h]||u[h]||s;return a?o.a.createElement(b,p(p({ref:t},c),{},{components:a})):o.a.createElement(b,p({ref:t},c))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"===typeof e||n){var s=a.length,r=new Array(s);r[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"===typeof e?e:n,r[1]=p;for(var c=2;c<s;c++)r[c]=a[c];return o.a.createElement.apply(null,r)}return o.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"},201:function(e,t,a){"use strict";a.r(t),a.d(t,"readingTime",(function(){return r})),a.d(t,"default",(function(){return l})),a.d(t,"tableOfContents",(function(){return c})),a.d(t,"frontMatter",(function(){return i}));var n=a(42),o=(a(1),a(186)),s=["components"],r={text:"3 min read",minutes:2.87,time:172200,words:574},p={};function l(e){var t=e.components,a=Object(n.a)(e,s);return Object(o.a)("wrapper",Object.assign({},p,a,{components:t,mdxType:"MDXLayout"}),Object(o.a)("h1",{id:"usestate-tic-tac-toe"},"useState: tic tac toe"),Object(o.a)("h2",{id:"-your-notes"},"\ud83d\udcdd Your Notes"),Object(o.a)("p",null,"Elaborate on your learnings here in ",Object(o.a)("inlineCode",{parentName:"p"},"src/exercise/04.md")),Object(o.a)("h2",{id:"background"},"Background"),Object(o.a)("p",null,"A ",Object(o.a)("inlineCode",{parentName:"p"},"name")," is one thing, but a real UI is a bit different. Often you need more\nthan one element of state in your component, so you\u2019ll call ",Object(o.a)("inlineCode",{parentName:"p"},"React.useState"),"\nmore than once. Please note that each call to ",Object(o.a)("inlineCode",{parentName:"p"},"React.useState")," in a given\ncomponent will give you a unique state and updater function."),Object(o.a)("h2",{id:"exercise"},"Exercise"),Object(o.a)("p",null,"Production deploys:"),Object(o.a)("ul",null,Object(o.a)("li",{parentName:"ul"},Object(o.a)("a",{parentName:"li",href:"https://react-hooks.netlify.app/isolated/exercise/04.js"},"Exercise")),Object(o.a)("li",{parentName:"ul"},Object(o.a)("a",{parentName:"li",href:"https://react-hooks.netlify.app/isolated/final/04.js"},"Final"))),Object(o.a)("p",null,"We\u2019re going to build tic-tac-toe (with localStorage support)! If you\u2019ve gone\nthrough React\u2019s official tutorial, this was lifted from that (except that\nexample still uses classes)."),Object(o.a)("p",null,"You\u2019re going to need some managed state and some derived state:"),Object(o.a)("ul",null,Object(o.a)("li",{parentName:"ul"},Object(o.a)("strong",{parentName:"li"},"Managed State:")," State that you need to explicitly manage"),Object(o.a)("li",{parentName:"ul"},Object(o.a)("strong",{parentName:"li"},"Derived State:")," State that you can calculate based on other state")),Object(o.a)("p",null,Object(o.a)("inlineCode",{parentName:"p"},"squares")," is the managed state and it\u2019s the state of the board in a\nsingle-dimensional array:"),Object(o.a)("pre",null,Object(o.a)("code",{parentName:"pre"},"[\n  'X', 'O', 'X',\n  'X', 'O', 'O',\n  'X', 'X', 'O'\n]\n")),Object(o.a)("p",null,"This will start out as an empty array because it\u2019s the start of the game."),Object(o.a)("p",null,Object(o.a)("inlineCode",{parentName:"p"},"nextValue")," will be either the string ",Object(o.a)("inlineCode",{parentName:"p"},"X")," or ",Object(o.a)("inlineCode",{parentName:"p"},"O")," and is derived state which you\ncan determine based on the value of ",Object(o.a)("inlineCode",{parentName:"p"},"squares"),". We can determine whose turn it is\nbased on how many \u201cX\u201d and \u201cO\u201d squares there are. We\u2019ve written this out for you\nin a ",Object(o.a)("inlineCode",{parentName:"p"},"calculateNextValue")," function at the bottom of the file."),Object(o.a)("p",null,Object(o.a)("inlineCode",{parentName:"p"},"winner")," will be either the string ",Object(o.a)("inlineCode",{parentName:"p"},"X")," or ",Object(o.a)("inlineCode",{parentName:"p"},"O")," and is derived state which can\nalso be determined based on the value of ",Object(o.a)("inlineCode",{parentName:"p"},"squares")," and we\u2019ve provided a\n",Object(o.a)("inlineCode",{parentName:"p"},"calculateWinner")," function you can use to get that value."),Object(o.a)("p",null,"\ud83d\udcdc Read more about derived state in\n",Object(o.a)("a",{parentName:"p",href:"https://kentcdodds.com/blog/dont-sync-state-derive-it"},"Don\u2019t Sync State. Derive It!")),Object(o.a)("h3",{id:"alternate"},"Alternate:"),Object(o.a)("p",null,"If you\u2019d prefer to practice refactoring a class that does this to a hook, then\nyou can open ",Object(o.a)("inlineCode",{parentName:"p"},"src/exercise/04-classes.js")," and open that on\n",Object(o.a)("a",{parentName:"p",href:"http://localhost:3000/isolated/exercise/04-classes.js"},"an isolated page")," to\npractice that."),Object(o.a)("h2",{id:"extra-credit"},"Extra Credit"),Object(o.a)("h3",{id:"1--preserve-state-in-localstorage"},"1. \ud83d\udcaf preserve state in localStorage"),Object(o.a)("p",null,Object(o.a)("a",{parentName:"p",href:"https://react-hooks.netlify.app/isolated/final/04.extra-1.js"},"Production deploy")),Object(o.a)("p",null,"\ud83d\udc68\u200d\ud83d\udcbc Our customers want to be able to pause a game, close the tab, and then resume\nthe game later. Can you store the game\u2019s state in ",Object(o.a)("inlineCode",{parentName:"p"},"localStorage"),"?"),Object(o.a)("h3",{id:"2--uselocalstoragestate"},"2. \ud83d\udcaf useLocalStorageState"),Object(o.a)("p",null,Object(o.a)("a",{parentName:"p",href:"https://react-hooks.netlify.app/isolated/final/04.extra-2.js"},"Production deploy")),Object(o.a)("p",null,"It\u2019s cool that we can get localStorage support with a simple ",Object(o.a)("inlineCode",{parentName:"p"},"useEffect"),", but\nit\u2019d be even cooler to use the ",Object(o.a)("inlineCode",{parentName:"p"},"useLocalStorageState")," hook that\u2019s already\nwritten for us in ",Object(o.a)("inlineCode",{parentName:"p"},"src/utils.js"),"!"),Object(o.a)("p",null,"Refactor your code to use that custom hook instead. (This should be a pretty\nquick extra credit)."),Object(o.a)("h3",{id:"3--add-game-history-feature"},"3. \ud83d\udcaf add game history feature"),Object(o.a)("p",null,Object(o.a)("a",{parentName:"p",href:"https://react-hooks.netlify.app/isolated/final/04.extra-3.js"},"Production deploy")),Object(o.a)("p",null,"Open ",Object(o.a)("inlineCode",{parentName:"p"},"http://localhost:3000/isolated/final/04.extra-3.js")," and see that the extra\nversion supports keeping a history of the game and allows you to go backward and\nforward in time. See if you can implement that!"),Object(o.a)("p",null,"NOTE: This extra credit is one of the harder extra credits. Don\u2019t worry if you\nstruggle on it!"),Object(o.a)("p",null,"\ud83d\udcb0 Tip, in the final example, we store the history of squares in an array of\narrays. ",Object(o.a)("inlineCode",{parentName:"p"},"[[/* step 0 squares */], [/* step 1 squares */], ...etc]"),", so we have\ntwo states: ",Object(o.a)("inlineCode",{parentName:"p"},"history")," and ",Object(o.a)("inlineCode",{parentName:"p"},"currentStep"),"."),Object(o.a)("p",null,"\ud83d\udcb0 Tip, in the final example, we move the state management from the ",Object(o.a)("inlineCode",{parentName:"p"},"Board"),"\ncomponent to the ",Object(o.a)("inlineCode",{parentName:"p"},"Game")," component and that helps a bit. Here\u2019s what the JSX\nreturned from the ",Object(o.a)("inlineCode",{parentName:"p"},"Game")," component is in the final version:"),Object(o.a)("pre",null,Object(o.a)("code",{parentName:"pre",className:"language-javascript","data-language":"javascript","data-highlighted-line-numbers":"",dangerouslySetInnerHTML:{__html:'<span class="token keyword">return</span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"game"</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"game-board"</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span>Board onClick<span class="token operator">=</span><span class="token punctuation">{</span>selectSquare<span class="token punctuation">}</span> squares<span class="token operator">=</span><span class="token punctuation">{</span>currentSquares<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span>button className<span class="token operator">=</span><span class="token string">"restart"</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span>restart<span class="token punctuation">}</span><span class="token operator">></span>\n        restart\n      <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"game-info"</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token punctuation">{</span>status<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n      <span class="token operator">&lt;</span>ol<span class="token operator">></span><span class="token punctuation">{</span>moves<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>ol<span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n<span class="token punctuation">)</span>\n'}})),Object(o.a)("h2",{id:"-feedback"},"\ud83e\udd89 Feedback"),Object(o.a)("p",null,"Fill out\n",Object(o.a)("a",{parentName:"p",href:"https://ws.kcd.im/?ws=React%20Hooks%20%F0%9F%8E%A3&e=04%3A%20useState%3A%20tic%20tac%20toe&em="},"the feedback form"),"."))}l.isMDXComponent=!0;var c=function(){return[{id:"-your-notes",level:2,title:"\ud83d\udcdd Your Notes",children:[]},{id:"background",level:2,title:"Background",children:[]},{id:"exercise",level:2,title:"Exercise",children:[{id:"alternate",level:3,title:"Alternate:",children:[]}]},{id:"extra-credit",level:2,title:"Extra Credit",children:[{id:"1--preserve-state-in-localstorage",level:3,title:"1. \ud83d\udcaf preserve state in localStorage",children:[]},{id:"2--uselocalstoragestate",level:3,title:"2. \ud83d\udcaf useLocalStorageState",children:[]},{id:"3--add-game-history-feature",level:3,title:"3. \ud83d\udcaf add game history feature",children:[]}]},{id:"-feedback",level:2,title:"\ud83e\udd89 Feedback",children:[]}]},i={}}}]);
//# sourceMappingURL=40.bb8eb85e.chunk.js.map