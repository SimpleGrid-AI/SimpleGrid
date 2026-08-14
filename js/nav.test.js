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
/* Phone width, so the script treats the nav as the drawer it is. */
w.matchMedia = q => ({ matches: /max-width: 900px/.test(q), media: q,
                       addEventListener(){}, removeEventListener(){},
                       addListener(){}, removeListener(){} });
vm.runInContext(src, dom.getInternalVMContext());
setTimeout(()=>{
  const items=[...w.document.querySelectorAll('.nav__item')];
  const names=items.map(i=>i.querySelector('.nav__link').textContent.trim());
  console.log('collections in the nav :', names.join(', '));
  console.log('state on first paint   :', items.map(i=>i.getAttribute('data-open')).join(', '));

  const toggle=w.document.querySelector('.nav-toggle');
  /* A real tap is three events in order: the browser focuses the button
     between pointerdown and click, which is what used to close the menu the
     click had just opened. */
  const tap = el => {
    el.dispatchEvent(new w.Event('pointerdown', { bubbles: true }));
    if (el.focus) el.focus();
    el.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,detail:1}));
  };

  tap(toggle);                                   // open the drawer
  console.log('drawer open            :', w.document.querySelector('.site-header').getAttribute('data-open'));
  console.log('collections after open :', items.map(i=>i.getAttribute('data-open')).join(', '));

  tap(items[1].querySelector('.nav__link'));     // tap Partners
  const opensOnTap = items[1].getAttribute('data-open') === 'true';
  console.log('after tapping "%s"     :', names[1], items.map(i=>i.getAttribute('data-open')).join(', '));

  tap(items[2].querySelector('.nav__link'));     // tap Resources — Partners must close
  const closesOthers = items[2].getAttribute('data-open') === 'true'
                    && items[1].getAttribute('data-open') === 'false';
  console.log('after tapping "%s"    :', names[2], items.map(i=>i.getAttribute('data-open')).join(', '));

  tap(items[2].querySelector('.nav__link'));     // tap it again — closes
  const togglesShut = items[2].getAttribute('data-open') === 'false';
  console.log('tapping it again       :', items.map(i=>i.getAttribute('data-open')).join(', '));

  tap(items[0].querySelector('.nav__link'));     // open one, then close the drawer
  tap(toggle);
  tap(toggle);                                   // reopen
  console.log('reopened drawer        :', items.map(i=>i.getAttribute('data-open')).join(', '));

  const ok = opensOnTap && closesOthers && togglesShut
            && items.every(i=>i.getAttribute('data-open')==='false');
  if (!opensOnTap)   console.log('  FAIL: tapping a collection did not open it');
  if (!closesOthers) console.log('  FAIL: opening one did not close the other');
  if (!togglesShut)  console.log('  FAIL: tapping the open one did not close it');
  console.log(ok ? '\nPASS — taps open one at a time, and the drawer reopens closed' : '\nFAIL');
  process.exit(ok?0:1);
},60);
