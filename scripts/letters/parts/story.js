/* ---------------------------------------------------------------- The story
   Every hero tells the one the Legacy jar tells. Your ERP and your floor sit
   apart. Push them together, the way most go-lives do, and you get a mess
   that stays: that's your operations today. Add SimpleGrid, do it again, and
   the mess comes out clean.

   A page draws its own object and hands SG.story() its moves, each returning
   a promise: mess() turns the two halves into the mess, dose() puts
   SimpleGrid in, clean() turns the mess into the clean result. restore()
   puts the object back at the start, at once, and final(on) swaps the
   callouts for the end state. This runs the button, the words, the ops panel
   beside the object (ops.html) and Start over. It returns go(), for pages
   that let you do the next step by hand. */
SG.story = function(o){
  var $ = function(id){ return document.getElementById(id); };
  var hero = o.hero, obj = o.obj, btn = o.btn, resetBtn = o.reset, caption = o.caption;
  var opsTitle = $('opsTitle'), opsText = $('opsText'), chips = $('opsChips');
  var phase = 'apart', busy = false, run = 0;
  // From each resting phase: the moving phase, where it lands, and the move that gets it there.
  var NEXT = { apart: ['messing', 'mess', o.mess], mess: ['dosing', 'dosed', o.dose], dosed: ['cleaning', 'done', o.clean] };
  var IN_MESS = { messing: 1, mess: 1, dosing: 1, dosed: 1, cleaning: 1 };
  var OPS = {
    mess: ['Your operations, today', 'Pushed together, still not linked. Everyone’s working from a different version.'],
    dosed: ['Your operations, plus SimpleGrid', 'Same mess, same people. Now there’s a link in it.']
  };
  if (o.ops) for (var k in o.ops) OPS[k] = o.ops[k];
  OPS.messing = OPS.mess; OPS.dosing = OPS.mess; OPS.cleaning = OPS.dosed;
  var KIND = ['sticky', 'file', 'call', 'pink', 'mail'], TILT = [-4, 3, -2, 5, -3];

  function set(p){
    phase = p;
    hero.dataset.story = p;
    hero.classList.toggle('in-mess', !!IN_MESS[p]);
    btn.textContent = o.copy[p].btn;
    btn.disabled = /ing$/.test(p);
    caption.textContent = o.copy[p].caption;
    if (o.aria && o.aria[p]) obj.setAttribute('aria-label', o.aria[p]);
    if (OPS[p] && opsTitle){ opsTitle.textContent = OPS[p][0]; opsText.textContent = OPS[p][1]; }
  }
  // What lands on the floor in the stage below shows up here first, as the mess.
  function fillChips(){
    if (!chips) return;
    var notes = (window.STAGE && window.STAGE.notes) || [];
    chips.innerHTML = [0, 2, 1, 4, 8].map(function(n){ return notes[n]; }).filter(Boolean).map(function(text, i){
      return '<li class="chip chip-' + KIND[i] + '" style="--r:' + TILT[i] + 'deg;--d:' + (.15 + i*.14).toFixed(2) + 's">' + text + '</li>';
    }).join('');
  }
  // As it comes clean, the mess gets pulled into the object, the way the stage pulls the floor's notes into the link.
  function swallow(){
    if (!chips || SG.reduce) return;
    var r = obj.getBoundingClientRect(), tx = r.left + r.width/2, ty = r.top + r.height/2;
    [].forEach.call(chips.children, function(el, i){
      var b = el.getBoundingClientRect();
      el.style.animation = 'none';
      el.style.transition = 'transform .55s cubic-bezier(.6,0,.9,.4) ' + (i*.06) + 's,opacity .5s ease-in ' + (i*.06) + 's';
      el.style.transform = 'translate(' + (tx - b.left - b.width/2) + 'px,' + (ty - b.top - b.height/2) + 'px) scale(.15)';
      el.style.opacity = '0';
    });
  }
  function go(){
    if (busy) return;
    if (phase === 'done'){ var gap = $('gap'); if (gap) gap.scrollIntoView(); return; }
    var n = NEXT[phase];
    if (!n) return;
    var token = ++run;
    busy = true;
    if (phase === 'apart') fillChips();
    if (phase === 'dosed') swallow();
    set(n[0]);
    Promise.resolve(n[2]()).then(function(){
      if (token !== run) return;
      busy = false;
      if (n[1] !== 'done'){ set(n[1]); return; }
      set('done');
      if (o.final) o.final(true);
      resetBtn.hidden = false;
      SG.wipeTo(hero, obj, 'b', o.skip);
    });
  }
  function startOver(){
    run++;
    busy = false;
    o.restore();
    if (o.final) o.final(false);
    if (chips) chips.innerHTML = '';
    set('apart');
    resetBtn.hidden = true;
    SG.wipeTo(hero, obj, 'a', o.skip);
  }
  btn.addEventListener('click', go);
  resetBtn.addEventListener('click', startOver);
  set('apart');
  return { go: go, phase: function(){ return phase; }, busy: function(){ return busy; } };
};
