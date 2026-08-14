/* The drawer's collections must start closed.

   node js/nav.test.js   (needs jsdom: npm install jsdom)

   On a phone the three collections used to be listed open, which put 22 rows
   in front of a thumb before it had chosen anything. They collapse now, one
   at a time, and the drawer resets them whenever it is opened or closed.
*/

const fs=require('fs'), vm=require('vm');
let JSDOM; try { ({JSDOM}=require('jsdom')); } catch(e){ console.error('needs jsdom'); process.exit(2); }
const src=fs.readFileSync('/Users/simplegrid/SGUI/js/components.js','utf8');
const dom=new JSDOM('<!doctype html><body><sg-header></sg-header></body>',{runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window;
vm.runInContext(src, dom.getInternalVMContext());
setTimeout(()=>{
  const items=[...w.document.querySelectorAll('.nav__item')];
  const names=items.map(i=>i.querySelector('.nav__link').textContent.trim());
  console.log('collections in the nav :', names.join(', '));
  console.log('state on first paint   :', items.map(i=>i.getAttribute('data-open')).join(', '));

  const toggle=w.document.querySelector('.nav-toggle');
  const tap=el=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,detail:1}));

  tap(toggle);                                   // open the drawer
  console.log('drawer open            :', w.document.querySelector('.site-header').getAttribute('data-open'));
  console.log('collections after open :', items.map(i=>i.getAttribute('data-open')).join(', '));

  tap(items[1].querySelector('.nav__link'));     // tap Partners
  console.log('after tapping "%s"     :', names[1], items.map(i=>i.getAttribute('data-open')).join(', '));

  tap(items[2].querySelector('.nav__link'));     // tap Resources — Partners must close
  console.log('after tapping "%s"    :', names[2], items.map(i=>i.getAttribute('data-open')).join(', '));

  tap(items[2].querySelector('.nav__link'));     // tap it again — closes
  console.log('tapping it again       :', items.map(i=>i.getAttribute('data-open')).join(', '));

  tap(items[0].querySelector('.nav__link'));     // open one, then close the drawer
  tap(toggle);
  tap(toggle);                                   // reopen
  console.log('reopened drawer        :', items.map(i=>i.getAttribute('data-open')).join(', '));

  const ok = items.every(i=>i.getAttribute('data-open')==='false');
  console.log(ok ? '\nPASS — every collection starts and reopens closed' : '\nFAIL');
  process.exit(ok?0:1);
},60);
