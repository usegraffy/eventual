(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{44:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return s})),t.d(n,"rightToc",(function(){return i})),t.d(n,"default",(function(){return p}));t(0);var r=t(64);function a(){return(a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s={id:"quickstart",title:"Quickstart"},i=[{value:"Installation",id:"installation",children:[]},{value:"Requirements",id:"requirements",children:[]},{value:"Examples",id:"examples",children:[]}],l={rightToc:i},c="wrapper";function p(e){var n=e.components,t=o(e,["components"]);return Object(r.b)(c,a({},l,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"installation"},"Installation"),Object(r.b)("p",null,"Repeater.js is available on ",Object(r.b)("a",a({parentName:"p"},{href:"https://www.npmjs.com/package/@repeaterjs/repeater"}),"npm")," in the CommonJS and ESModule formats."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"$ npm install @repeaterjs/repeater")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"$ yarn add @repeaterjs/repeater")),Object(r.b)("h2",{id:"requirements"},"Requirements"),Object(r.b)("p",null,"The core ",Object(r.b)("inlineCode",{parentName:"p"},"@repeaterjs/repeater")," module has no dependencies, but requires the following globals in order to work:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"Promise")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"WeakMap")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"Symbol"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"Symbol.iterator")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"Symbol.asyncIterator"))))),Object(r.b)("p",null,"In addition, repeaters are most useful when used via ",Object(r.b)("inlineCode",{parentName:"p"},"async/await")," and ",Object(r.b)("inlineCode",{parentName:"p"},"for await…of")," syntax. You can transpile your code with babel or typescript to support enviroments which lack these features."),Object(r.b)("h2",{id:"examples"},"Examples"),Object(r.b)("h4",{id:"timestamps"},"Logging timestamps with setInterval"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-js"}),'import { Repeater } from "@repeaterjs/repeater";\n\nconst timestamps = new Repeater(async (push, stop) => {\n  push(Date.now());\n  const interval = setInterval(() => push(Date.now()), 1000);\n  await stop;\n  clearInterval(interval);\n});\n\n(async function() {\n  let i = 0;\n  for await (const timestamp of timestamps) {\n    console.log(timestamp);\n    i++;\n    if (i >= 10) {\n      console.log("ALL DONE!");\n      break; // triggers clearInterval above\n    }\n  }\n})();\n')),Object(r.b)("h4",{id:"websocket"},"Creating a repeater from a websocket"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-js"}),'import { Repeater } from "@repeaterjs/repeater";\n\nconst socket = new WebSocket("ws://echo.websocket.org");\nconst messages = new Repeater(async (push, stop) => {\n  socket.onmessage = (ev) => push(ev.data);\n  socket.onerror = () => stop(new Error("WebSocket error"));\n  socket.onclose = () => stop();\n  await stop;\n  socket.close();\n});\n\n(async function() {\n  for await (const message of messages) {\n    console.log(message);\n    if (message === "close") {\n      console.log("Closing!");\n      break; // closes the socket\n    }\n  }\n})();\n\nsocket.onopen = () => {\n  socket.send("hello"); // "hello"\n  socket.send("world"); // "world"\n  socket.send("close"); // "close", "Closing!"\n};\n')),Object(r.b)("h4",{id:"konami-code"},"Listening for the ",Object(r.b)("a",{href:"https://en.wikipedia.org/wiki/Konami_Code"},"Konami Code")," and canceling if ",Object(r.b)("kbd",null,"Escape")," is pressed"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-js"}),'import { Repeater } from "@repeaterjs/repeater";\n\nconst keys = new Repeater(async (push, stop) => {\n  const listener = (ev) => {\n    if (ev.key === "Escape") {\n      stop();\n    } else {\n      push(ev.key);\n    }\n  };\n  window.addEventListener("keyup", listener);\n  await stop;\n  window.removeEventListener("keyup", listener);\n});\n\nconst konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];\n\n(async function() {\n  let i = 0;\n  for await (const key of keys) {\n    if (key === konami[i]) {\n      i++;\n    } else {\n      i = 0;\n    }\n    if (i >= konami.length) {\n      console.log("KONAMI!!!");\n      break; // removes the keyup listener\n    }\n  }\n})();\n')),Object(r.b)("h4",{id:"observables"},"Converting an observable to an async iterator"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-js"}),'import { Subject } from "rxjs";\nimport { Repeater } from "@repeaterjs/repeater";\n\nconst observable = new Subject();\nconst repeater = new Repeater(async (push, stop) => {\n  const subscription = observable.subscribe({\n    next: (value) => push(value),\n    error: (err) => stop(err),\n    complete: () => stop(),\n  });\n  await stop;\n  subscription.unsubscribe();\n});\n\n(async function() {\n  try {\n    for await (const value of repeater) {\n      console.log("Value: ", value);\n    }\n  } catch (err) {\n    console.log("Error caught: ", err);\n  }\n})();\nobservable.next(1);\n// Value: 1\nobservable.next(2);\n// Value: 2\nobservable.error(new Error("Hello from observable"));\n// Error caught: Error: Hello from observable\n')))}p.isMDXComponent=!0},64:function(e,n,t){"use strict";t.d(n,"a",(function(){return i})),t.d(n,"b",(function(){return b}));var r=t(0),a=t.n(r),o=a.a.createContext({}),s=function(e){var n=a.a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):Object.assign({},n,e)),t},i=function(e){var n=s(e.components);return a.a.createElement(o.Provider,{value:n},e.children)};var l="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},p=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===n.indexOf(r)&&(t[r]=e[r]);return t}(e,["components","mdxType","originalType","parentName"]),p=s(t),b=r,u=p[i+"."+b]||p[b]||c[b]||o;return t?a.a.createElement(u,Object.assign({},{ref:n},l,{components:t})):a.a.createElement(u,Object.assign({},{ref:n},l))}));function b(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,s=new Array(o);s[0]=p;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i[l]="string"==typeof e?e:r,s[1]=i;for(var b=2;b<o;b++)s[b]=t[b];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,t)}p.displayName="MDXCreateElement"}}]);