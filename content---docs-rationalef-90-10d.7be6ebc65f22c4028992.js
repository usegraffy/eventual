(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{43:function(e,n,a){"use strict";a.r(n),a.d(n,"frontMatter",function(){return s}),a.d(n,"rightToc",function(){return i}),a.d(n,"default",function(){return b});a(0);var t=a(59);function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e}).apply(this,arguments)}function o(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s={id:"rationale",title:"Rationale"},i=[{value:"Why not async generators?",id:"why-not-async-generators",children:[]},{value:"Why not observables?",id:"why-not-observables",children:[]}],c={rightToc:i},l="wrapper";function b(e){var n=e.components,a=o(e,["components"]);return Object(t.b)(l,r({},c,a,{components:n,mdxType:"MDXLayout"}),Object(t.b)("p",null,"While ",Object(t.b)("a",r({parentName:"p"},{href:"https://github.com/tc39/proposal-async-iteration"}),"async iterators")," are available in most modern javascript runtimes, they have yet to achieve widespread usage due to various perceived ",Object(t.b)("a",r({parentName:"p"},{href:"https://github.com/apollographql/graphql-subscriptions/issues/116"}),"flaws")," and ",Object(t.b)("a",r({parentName:"p"},{href:"https://github.com/tc39/proposal-async-iteration/issues/126"}),"pitfalls"),". What’s needed is something like the ",Object(t.b)("inlineCode",{parentName:"p"},"Promise")," constructor, which helped promises succeed by providing a common pattern for converting callback-based APIs into promises. The ",Object(t.b)("inlineCode",{parentName:"p"},"Channel")," constructor makes it easy to turn ",Object(t.b)("em",{parentName:"p"},"any")," callback-based source of data into an async iterator, and prevents common async iterator mistakes ",Object(t.b)("a",r({parentName:"p"},{href:"safety"}),"by design"),". The constructor pattern is easy to memorize and adaptable for almost every async iterator use case."),Object(t.b)("h2",null,Object(t.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"why-not-async-generators"})),Object(t.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#why-not-async-generators"}),"#"),"Why not async generators?"),Object(t.b)("p",null,"Channels are meant to be used alongside async generators rather than replace them. The problem with using async generators exclusively is that they rely on the ",Object(t.b)("inlineCode",{parentName:"p"},"yield"),", ",Object(t.b)("inlineCode",{parentName:"p"},"return")," and ",Object(t.b)("inlineCode",{parentName:"p"},"throw")," statements to produce values, which are unavailable in child closures. "),Object(t.b)("pre",null,Object(t.b)("code",r({parentName:"pre"},{className:"language-js"}),"async function* messages(url) {\n  const socket = new WebSocket(url);\n  socket.onmessage = (ev) => {\n     // can’t make the outer generator yield from here.\n  };\n}\n")),Object(t.b)("p",null,"The solution using async generators is often some ad-hoc ",Object(t.b)("inlineCode",{parentName:"p"},"while (true)")," loop which awaits a newly constructed promise which adds and removes event handlers for each iteration. The resulting code is often prone to race-conditions, dropped messages and memory leaks unless done with an expert understanding of both promises and generators. Channels behave identically to async generators, except they provide the ",Object(t.b)("inlineCode",{parentName:"p"},"yield"),", ",Object(t.b)("inlineCode",{parentName:"p"},"return")," and ",Object(t.b)("inlineCode",{parentName:"p"},"throw")," statements as the functions ",Object(t.b)("inlineCode",{parentName:"p"},"push")," and ",Object(t.b)("inlineCode",{parentName:"p"},"stop"),". These functions give imperative control over channels in child closures, making channels ideal for use with callback-based APIs."),Object(t.b)("p",null,"Once you have converted callback-based APIs to channel-returning functions, channels can be used seamlessly with async generators to write easy-to-understand async code."),Object(t.b)("h2",null,Object(t.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"anchor",id:"why-not-observables"})),Object(t.b)("a",r({parentName:"h2"},{"aria-hidden":!0,className:"hash-link",href:"#why-not-observables"}),"#"),"Why not observables?"),Object(t.b)("p",null,"Observables are often thought of as competing with async iterators and therefore channels, and it’s true that most channel code can be rewritten with observables. Here, for instance, is the ",Object(t.b)("a",r({parentName:"p"},{href:"quickstart#listening-for-the-konami-code"}),"Konami example from the quickstart"),", rewritten using ",Object(t.b)("inlineCode",{parentName:"p"},"rxjs"),":"),Object(t.b)("pre",null,Object(t.b)("code",r({parentName:"pre"},{className:"language-js"}),'import { Observable } from "rxjs";\nimport { takeWhile } from "rxjs/operators";\nconst keys = new Observable(subscriber => {\n  const listener = ev => {\n    if (ev.key === "Escape") {\n      subscriber.complete();\n    } else {\n      subscriber.next(ev.key);\n    }\n  };\n  window.addEventListener("keyup", listener);\n  return () => window.removeEventListener("keyup", listener);\n});\n\nconst konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];\n\nlet i = 0;\nlet subscription = keys\n  .pipe(\n    takeWhile(key => {\n      if (key === konami[i]) {\n        i++;\n      } else {\n        i = 0;\n      }\n      if (i >= konami.length) {\n        console.log("KONAMI!!!");\n        return false;\n      }\n      return true;\n    }),\n  )\n  .subscribe();\n')),Object(t.b)("p",null,"While you can often create an equivalent observable for any channel, there are several differences that make channels much nicer to use."),Object(t.b)("p",null,"Firstly, channels support ",Object(t.b)("inlineCode",{parentName:"p"},"async"),"/",Object(t.b)("inlineCode",{parentName:"p"},"await")," and ",Object(t.b)("inlineCode",{parentName:"p"},"for await…of")," syntax, so we don’t need a library of “operators” like ",Object(t.b)("inlineCode",{parentName:"p"},"takeWhile")," to consume channels. To someone unfamiliar with ",Object(t.b)("inlineCode",{parentName:"p"},"rxjs"),", it might not be immediately obvious in the example what ",Object(t.b)("inlineCode",{parentName:"p"},"takeWhile")," does, whereas the same programmer would probably recognize what a ",Object(t.b)("inlineCode",{parentName:"p"},"break")," statement does in a ",Object(t.b)("inlineCode",{parentName:"p"},"for await…of")," loop. Using ",Object(t.b)("inlineCode",{parentName:"p"},"for await…of")," loops means we get to leverage what we already know about synchronous loops and control-flow statements to write cleaner, more intuitive code. Rather than using the ",Object(t.b)("inlineCode",{parentName:"p"},"map")," operator, we can assign a variable, rather than using the ",Object(t.b)("inlineCode",{parentName:"p"},"filter")," operator, we can use ",Object(t.b)("inlineCode",{parentName:"p"},"if"),"/",Object(t.b)("inlineCode",{parentName:"p"},"else")," statements, and rather than using the ",Object(t.b)("inlineCode",{parentName:"p"},"reduce")," operator, we can reassign or mutate a variable in the outer scope. I suspect that if observables ever ",Object(t.b)("a",r({parentName:"p"},{href:"https://github.com/ReactiveX/rxjs/issues/4002"}),"decided to support the async iterator protocol"),", the market for higher-order observable functions would collapse overnight."),Object(t.b)("p",null,"Secondly, despite the claims observable advocates make about how observables are “monadic” or that they are the “mathematical dual” of synchronous iterables, observables are ultimately callback-based APIs. The above example hides this detail by calling the ",Object(t.b)("inlineCode",{parentName:"p"},"subscribe")," method without arguments, but if we wanted to compose this observable with other code, we would have to call other observable methods, which take callbacks. Being a callback-based API makes using observables with ",Object(t.b)("inlineCode",{parentName:"p"},"async"),"/",Object(t.b)("inlineCode",{parentName:"p"},"await")," and promises awkward; in fact, observables suffer from the same issue of “callback hell” which promises were designed to solve. Observable libraries are aware of this and provide “higher-order observable operators,” which work on observables of observables, but these solutions are seldom used and virtually incomprehensible to human beings, who are unaccustomed to thinking in extradimensional spaces."))}b.isMDXComponent=!0}}]);