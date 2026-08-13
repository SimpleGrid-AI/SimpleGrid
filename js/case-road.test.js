/* Does the road draw, and does the list survive as its fallback?

   node js/case-road.test.js   (needs jsdom: npm install jsdom)

   Asserts the 19 stations are built from the page's own markup, that the
   list is hidden only after the road exists, and that clicking a station
   moves the work there and updates the caption under it.
*/

const fs=require('fs'), vm=require('vm');
let JSDOM;
try {
  ({ JSDOM } = require('jsdom'));
} catch (e) {
  console.error('This test needs jsdom, which the site itself does not:\n  npm install jsdom\n' +
                'or point at an existing copy:\n  NODE_PATH=/path/to/node_modules node ' + process.argv[1]);
  process.exit(2);
}

const page=fs.readFileSync('/Users/simplegrid/SGUI/case-furniture-manufacturer.html','utf8');
const src=fs.readFileSync('/Users/simplegrid/SGUI/js/case-road.js','utf8');

/* The page's own <script> tags decide what runs — loading the file by hand
   would pass even on a page that never links it, which is exactly how the
   missing tag shipped the first time. */
const wants = [...page.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
if (!wants.includes('js/case-road.js')) {
  console.error('FAIL: case-furniture-manufacturer.html does not load js/case-road.js');
  process.exit(1);
}
const dom=new JSDOM(page.replace(/<script[\s\S]*?<\/script>/g,''),{runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window;
let observed=null;
w.matchMedia = w.matchMedia || (q => ({ matches:false, media:q, addListener(){}, removeListener(){} }));
w.IntersectionObserver=class{constructor(cb){this.cb=cb;} observe(el){observed=el; this.cb([{isIntersecting:true}]);} disconnect(){}};
vm.runInContext(src, dom.getInternalVMContext());

setTimeout(() => {
const road=w.document.querySelector('.road2');
const stations=w.document.querySelectorAll('.road2__stn');
const list=w.document.querySelector('.flow');
const cap=w.document.querySelector('.road2__cap-name');

console.log('road drawn            :', !!road);
console.log('stations              :', stations.length);
console.log('list hidden           :', list.hidden);
console.log('list still in the DOM :', !!list, '(fallback)');
console.log('starts at             :', cap && cap.textContent);
console.log('first station state   :', stations[0] && stations[0].getAttribute('data-state'));
console.log('kinds used            :', [...new Set([...stations].map(s=>s.getAttribute('data-kind')))].join(', '));

// click station 11 (Assembly QC)
stations[10].dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
console.log('after clicking #11    :', cap.textContent, '|', w.document.querySelector('.road2__cap-note').textContent.slice(0,44));
console.log('that station state    :', stations[10].getAttribute('data-state'), '| one before:', stations[9].getAttribute('data-state'));
const done=w.document.querySelector('.road2__done');
console.log('progress fill height  :', done.getAttribute('height'));
console.log('cargo at              :', w.document.querySelector('.road2__cargo').getAttribute('transform'));

const ok = road && stations.length===19 && list.hidden && cap.textContent.includes('QC2')
  && stations[10].getAttribute('data-state')==='at' && stations[9].getAttribute('data-state')==='done';
console.log(ok ? '\nPASS' : '\nFAIL');
process.exit(ok?0:1);
}, 50);
