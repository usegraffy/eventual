(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{41:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",function(){return s}),t.d(n,"rightToc",function(){return c}),t.d(n,"default",function(){return p});t(0);var a=t(59);function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s={id:"overview",title:"Overview"},c=[{value:"What are channels?",id:"what-are-channels",children:[]},{value:"Creating channels",id:"creating-channels",children:[]}],i={rightToc:c},l="wrapper";function p(e){var n=e.components,t=o(e,["components"]);return Object(a.b)(l,r({},i,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"NOTE: These docs assumes some familiarity with recent javascript features, specifically ",Object(a.b)("a",r({parentName:"em"},{href:"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises"}),"promises"),", ",Object(a.b)("a",r({parentName:"em"},{href:"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await"}),"async/await")," and ",Object(a.b)("a",r({parentName:"em"},{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators"}),"iterators/generators"),". If you are unfamiliar with these features, what follows might not make much sense.")),Object(a.b)("h2",null,Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"what-are-channels"})),Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#what-are-channels"}),"#"),"What are channels?"),Object(a.b)("p",null,"Channels are opaque objects which implement the methods found on the ",Object(a.b)("a",r({parentName:"p"},{href:"https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es2018.asynciterable.d.ts"}),"async iterator interface"),". ",Object(a.b)("inlineCode",{parentName:"p"},"Channel.prototype.next")," returns a promise which resolves to the next iteration result, and ",Object(a.b)("inlineCode",{parentName:"p"},"Channel.prototype.return")," closes the channel prematurely. Channels are most useful when consumed via ",Object(a.b)("a",r({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of"}),Object(a.b)("inlineCode",{parentName:"a"},"for await…of"))," loops, which call and await the channel’s ",Object(a.b)("inlineCode",{parentName:"p"},"next"),"/",Object(a.b)("inlineCode",{parentName:"p"},"return")," methods automatically."),Object(a.b)("p",null,"Channels are designed with the explicit goal of behaving exactly like async generators and contain no methods or properties not found on the async iterator interface. If you discover a discrepancy between channels and async generators, please ",Object(a.b)("a",r({parentName:"p"},{href:"https://github.com/channeljs/channel/issues/new"}),"open an issue"),"."),Object(a.b)("h2",null,Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"creating-channels"})),Object(a.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#creating-channels"}),"#"),"Creating channels"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),'const channel = new Channel(async (push, stop) => {\n  push(1);\n  push(2);\n  stop(new Error("My error"));\n});\n\n(async () => {\n  console.log(await channel.next());   // { value: 1, done: false }\n  console.log(await channel.next());   // { value: 2, done: false }\n  try {\n    console.log(await channel.next());\n  } catch (err) {\n    console.log(err); // Error: My error\n  }\n})();\n')),Object(a.b)("p",null,"Inspired by the ",Object(a.b)("inlineCode",{parentName:"p"},"Promise")," constructor, the ",Object(a.b)("inlineCode",{parentName:"p"},"Channel")," constructor takes an ",Object(a.b)("em",{parentName:"p"},"executor"),", a function which is passed the arguments ",Object(a.b)("inlineCode",{parentName:"p"},"push")," and ",Object(a.b)("inlineCode",{parentName:"p"},"stop"),". These arguments are analogous to the ",Object(a.b)("inlineCode",{parentName:"p"},"resolve")," and ",Object(a.b)("inlineCode",{parentName:"p"},"reject")," functions passed to the promise executor: ",Object(a.b)("inlineCode",{parentName:"p"},"push")," can be called with a value so that ",Object(a.b)("inlineCode",{parentName:"p"},"next")," resolves to that value, and ",Object(a.b)("inlineCode",{parentName:"p"},"stop")," can be called with an error so that ",Object(a.b)("inlineCode",{parentName:"p"},"next")," rejects with that error. However, unlike ",Object(a.b)("inlineCode",{parentName:"p"},"resolve"),", ",Object(a.b)("inlineCode",{parentName:"p"},"push")," can be called more than once to enqueue multiple values, and unlike ",Object(a.b)("inlineCode",{parentName:"p"},"reject"),", ",Object(a.b)("inlineCode",{parentName:"p"},"stop")," can be called with no arguments to close the channel without error."),Object(a.b)("p",null,"Additionally, the executor API exposes promises which resolve depending on the internal state of the channel. ",Object(a.b)("inlineCode",{parentName:"p"},"push")," returns a promise which resolves when the channel is ready to accept more values, and the ",Object(a.b)("inlineCode",{parentName:"p"},"stop")," function does double duty as a promise which resolves when the channel is stopped. As a promise, ",Object(a.b)("inlineCode",{parentName:"p"},"stop")," can be awaited to defer event listener cleanup, and it can also be used with ",Object(a.b)("inlineCode",{parentName:"p"},"Promise.race")," to abort pending promises."),Object(a.b)("p",null,"These two arguments make it easy to setup and teardown callbacks within the executor, and they can be exposed to parent closures to model complex architectural patterns like ",Object(a.b)("a",r({parentName:"p"},{href:"https://github.com/channeljs/channel/blob/master/packages/pubsub/src/index.ts"}),"generic pubsub classes")," and ",Object(a.b)("a",r({parentName:"p"},{href:"https://github.com/channeljs/channel/blob/master/packages/limiters/src/index.ts"}),"semaphores"),"."))}p.isMDXComponent=!0}}]);