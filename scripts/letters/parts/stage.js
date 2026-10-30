/* ------------------------------------ The gap: your ERP vs your floor.
   The template sets window.STAGE = { erp, notes, tidy } before this runs:
     erp    four rows of [label, what the ERP says, what's true once linked]
     notes  twelve things that land on the floor, in the order below
     tidy   four lines the floor reads once it's linked */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(id){ return document.getElementById(id); };
  var data = window.STAGE;

  var PHONE = '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.2 1.3l2 3.2c.2.3.1.7-.1.9L5 6.6c.7 1.7 2.6 3.7 4.4 4.4l1.2-1.1c.3-.2.6-.3.9-.1l3.2 2c.3.2.4.6.3.9-.5 1.2-1.5 2-2.8 2C6.8 14.7 1.3 9.2 1.3 3.8 1.3 2.5 2 1.5 3.3 1c.3-.1.7 0 .9.3z"/></svg>';
  var ENVELOPE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="1.5"/><path d="M2 4l6 5 6-5"/></svg>';
  var TICK = '<i aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.4l2.6 2.6L11 4.4"/></svg></i>';
  // kind, tilt, where it lands on a laptop, where it lands on a phone
  var SLOTS = [
    ['sticky', -6, 'left:1%;top:1%',   'left:0;top:0'],
    ['call',    3, 'left:33%;top:0',   'right:0;top:8%'],
    ['file',   -3, 'right:0;top:9%',   'left:3%;top:17%'],
    ['pink',    5, 'right:5%;top:20%', 'right:0;top:24.5%'],
    ['board',  -4, 'left:2%;top:20%',  'left:0;top:33.5%'],
    ['mail',    3, 'right:9%;top:36%', 'right:2%;top:42%'],
    ['tag',    -7, 'left:0;top:40%',   'left:4%;top:50%'],
    ['file',   -2, 'right:0;top:51%',  'right:0;top:57%'],
    ['call',    4, 'left:6%;top:57%',  'left:0;top:65%'],
    ['sticky', -5, 'right:3%;top:66%', 'right:0;top:73%'],
    ['pink',    3, 'left:1%;top:78%',  'left:0;top:82%'],
    ['board',  -3, 'right:7%;top:85%', 'right:4%;top:90.5%']
  ];
  var stage = $('stage'), pile = $('pile'), erpRows = $('erpRows'), stageNote = $('stageNote');
  var chaosBtn = $('chaosBtn'), linkBtn = $('linkBtn'), stageReset = $('stageReset');
  var NOTE = {
    calm: stageNote.textContent,
    chaos: 'So people fill the gap by hand, with Excel, whiteboards and phone calls. That’s the chaos, and it costs real money.',
    linked: 'That’s SimpleGrid: one live record between your ERP and your floor. Your ERP stays. The spreadsheets go.'
  };
  var timers = [];
  function later(fn, ms){ timers.push(setTimeout(fn, reduce ? 0 : ms)); }

  $('tidy').innerHTML = data.tidy.map(function(line, i){
    return '<li style="--i:' + i + '">' + TICK + '<span>' + line + '</span></li>';
  }).join('');

  function renderErp(linked){
    erpRows.innerHTML = data.erp.map(function(row, i){
      return '<li' + (linked ? ' class="hit" style="--d:' + (.25 + i*.14) + 's"' : '') + '><span>' + row[0] + '</span><b>' + row[linked ? 2 : 1] + '</b></li>';
    }).join('');
    $('erpStatus').textContent = linked ? 'In sync' : 'All good';
    $('erpFoot').textContent = linked ? 'Last updated: just now' : 'Last updated: yesterday, 6:00 PM';
  }
  function runMorning(){
    var onPhone = window.matchMedia('(max-width:620px)').matches;
    stage.dataset.state = 'chaos';
    $('floorClock').textContent = '9:41 AM';
    stageNote.textContent = NOTE.chaos;
    pile.innerHTML = data.notes.map(function(text, i){
      var slot = SLOTS[i];
      var icon = slot[0] === 'call' ? PHONE : slot[0] === 'mail' ? ENVELOPE : '';
      return '<div class="n n-' + slot[0] + '" style="--r:' + slot[1] + 'deg;--d:' + (i*.17).toFixed(2) + 's;' + slot[onPhone ? 3 : 2] + '">' + icon + '<span>' + text + '</span></div>';
    }).join('');
    later(function(){
      stage.dataset.state = 'messy';
      linkBtn.focus({ preventScroll: true });
    }, data.notes.length*170 + 300);
  }
  // The chaos gets pulled into the pipe, and what comes out the other side is tidy.
  function linkUp(){
    var link = $('stageLink').getBoundingClientRect();
    var tx = link.left + link.width/2, ty = link.top + link.height/2;
    [].slice.call(pile.children).forEach(function(el, i){
      var r = el.getBoundingClientRect();
      var rot = el.style.getPropertyValue('--r');
      el.style.animation = 'none';
      el.style.opacity = 1;
      el.style.transform = 'rotate(' + rot + ')';
      void el.offsetWidth;
      el.style.transition = 'transform .5s cubic-bezier(.6,0,.9,.4) ' + (i*.025) + 's,opacity .5s ease-in ' + (i*.025) + 's';
      el.style.transform = 'translate(' + (tx - r.left - r.width/2) + 'px,' + (ty - r.top - r.height/2) + 'px) scale(.12)';
      el.style.opacity = 0;
    });
    linkBtn.disabled = true;
    later(function(){
      stage.dataset.state = 'linked';
      linkBtn.disabled = false;
      pile.innerHTML = '';
      renderErp(true);
      stageNote.textContent = NOTE.linked;
      stageReset.focus({ preventScroll: true });
    }, 720);
  }
  function resetStage(){
    timers.forEach(clearTimeout);
    timers = [];
    stage.dataset.state = 'calm';
    pile.innerHTML = '';
    $('floorClock').textContent = '6:58 AM';
    stageNote.textContent = NOTE.calm;
    renderErp(false);
    chaosBtn.focus({ preventScroll: true });
  }
  chaosBtn.addEventListener('click', runMorning);
  linkBtn.addEventListener('click', linkUp);
  stageReset.addEventListener('click', resetStage);
  renderErp(false);
})();
