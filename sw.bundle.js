if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let d={};const a=e=>n(e,c),t={module:{uri:c},exports:d,require:a};i[c]=Promise.all(r.map((e=>t[e]||a(e)))).then((e=>(s(...e),d)))}}define(["./workbox-3bd9af45"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"526.bundle.js",revision:"222a92c05ec2c41644386f47ec20d27d"},{url:"608.bundle.js",revision:"a2117e7ab4a5c3a55cea81634964e5c2"},{url:"app.webmanifest",revision:"91f12638d0a0e3520d1dd74bf1c18c36"},{url:"app~33cc77b3.bundle.js",revision:"0124d1566f552aaee8d413c930fff818"},{url:"app~33cc77b3.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~71c0e426.bundle.js",revision:"56a5c826ac39d6c8ff3a839f22cdf13b"},{url:"app~71c0e426.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~f6563343.bundle.js",revision:"668d81dc34706345d8633fc1dbf44fc6"},{url:"app~f6563343.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"index.html",revision:"91fb495c4a1bc78bc146367c70dfc9c5"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/")),new e.StaleWhileRevalidate({cacheName:"restaurant-api",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/images/medium/")),new e.StaleWhileRevalidate({cacheName:"restaurant-image-api",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map