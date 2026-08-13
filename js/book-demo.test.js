/* Does the Book a demo form actually submit?

   The dialog's submit button is labelled "Book a demo", the same words the
   document-level opener matches on, so for a while the opener caught the
   click, called preventDefault(), and reopened the dialog instead of letting
   the form submit. Nothing visible failed — the request simply never went
   out. This is the regression test for that.

   Needs jsdom, which the site itself does not:
     npm install jsdom && node js/book-demo.test.js
   Optionally takes a path, so a deployed copy can be checked too:
     curl -s https://simplegrid.ai/js/book-demo.js -o /tmp/live.js
     node js/book-demo.test.js /tmp/live.js
*/

const fs = require('fs');
const vm = require('vm');
let JSDOM;
try {
  ({ JSDOM } = require('jsdom'));
} catch (e) {
  console.error('This test needs jsdom, which the site itself does not:\n  npm install jsdom\n' +
                'or point at an existing copy:\n  NODE_PATH=/path/to/node_modules node ' + process.argv[1]);
  process.exit(2);
}


const SCRIPT = process.argv[2] || '/Users/simplegrid/SGUI/js/book-demo.js';
const source = fs.readFileSync(SCRIPT, 'utf8');

function run(label, fill) {
  const dom = new JSDOM(
    '<!doctype html><html><body><a class="btn" href="pricing.html#demo">Book a demo</a></body></html>',
    { runScripts: 'outside-only', pretendToBeVisual: true }
  );
  const { window } = dom;

  const sent = [];
  window.fetch = (url, opts) => {
    sent.push({ url, body: opts && opts.body });
    return Promise.resolve({ ok: true, json: () => Promise.resolve({ success: 'true' }) });
  };

  vm.runInContext(source, dom.getInternalVMContext(), { filename: SCRIPT });

  // open it the way a visitor does
  window.document.querySelector('a.btn').click();
  const dialog = window.document.querySelector('.bd');
  const form = dialog && dialog.querySelector('form');
  if (!form) return { label, opened: false };

  let submitFired = false;
  form.addEventListener('submit', () => { submitFired = true; });

  fill(dialog);
  dialog.querySelector('.bd__submit').click();

  const err = dialog.querySelector('.bd__error');
  return {
    label,
    opened: true,
    submitFired,
    requests: sent.length,
    to: sent[0] && sent[0].url,
    error: err && !err.hidden ? err.textContent : null,
    invalidFields: dialog.querySelectorAll('[data-invalid]').length
  };
}

const good = run('valid details', (d) => {
  d.querySelector('#bd-name').value = 'Mike Doyle';
  d.querySelector('#bd-org').value = 'Ridgeline Manufacturing';
  d.querySelector('#bd-email').value = 'mike@ridgeline.com';
});

const badEmail = run('two @ in the email', (d) => {
  d.querySelector('#bd-name').value = 'Mike Doyle';
  d.querySelector('#bd-org').value = 'Ridgeline Manufacturing';
  d.querySelector('#bd-email').value = 'test@sm@ai';
});

const empty = run('nothing filled in', () => {});

/* Which CTAs open it at all. "Book a call" is the footer's and the partner
   pages' wording for the same ask, so it opens the same form; everything else
   stays an ordinary link. */
function opensFor(html) {
  const dom = new JSDOM('<!doctype html><body>' + html + '</body>',
                        { runScripts: 'outside-only', pretendToBeVisual: true });
  dom.window.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  vm.runInContext(source, dom.getInternalVMContext(), { filename: SCRIPT });
  dom.window.document.querySelector('#t').dispatchEvent(
    new dom.window.MouseEvent('click', { bubbles: true, cancelable: true }));
  return !!dom.window.document.querySelector('.bd form');
}
const triggers = {
  'book a demo': opensFor('<a id="t" href="pricing.html#demo">Book a demo</a>'),
  'book a call': opensFor('<a id="t" href="pricing.html#demo">Book a call</a>'),
  'see it live': opensFor('<a id="t" href="https://erp.simplegrid.ai/?sandbox=true">See it live</a>'),
  'read the case': opensFor('<a id="t" href="case-apex.html">Read the case</a>')
};

console.log(JSON.stringify({ good, badEmail, empty, triggers }, null, 2));

const pass =
  good.submitFired && good.requests === 1 &&
  good.to === 'https://formsubmit.co/ajax/hello@simplegrid.ai' &&
  badEmail.requests === 0 && /email does not look right/.test(badEmail.error || '') &&
  empty.requests === 0 && empty.invalidFields === 3 &&
  triggers['book a demo'] && triggers['book a call'] &&
  !triggers['see it live'] && !triggers['read the case'];

console.log(pass ? '\nPASS' : '\nFAIL');
process.exit(pass ? 0 : 1);
