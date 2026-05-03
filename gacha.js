// =============================================
//   GACHA MACHINE — Core Logic
// =============================================

(function () {
  'use strict';

  const STORAGE_KEY = 'gacha_collection';

  // ── Weighted random pull ───────────────────
  function weightedPull() {
    const pool = [];
    for (const item of ITEMS) {
      const cfg = RARITY_CONFIG[item.rarity];
      const w = cfg ? cfg.weight : 1;
      for (let i = 0; i < w; i++) pool.push(item);
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ── Storage helpers ────────────────────────
  function loadCollection() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveCollection(col) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(col));
  }
  function addToCollection(item) {
    const col = loadCollection();
    col.push({
      id: item.id, name: item.name, rarity: item.rarity,
      image: item.image, description: item.description,
      type: item.type,
      pulledAt: Date.now()
    });
    saveCollection(col);
    updateBadge();
  }
  function clearCollection() {
    localStorage.removeItem(STORAGE_KEY);
    updateBadge();
  }
  function updateBadge() {
    const col = loadCollection();
    document.getElementById('collectionCount').textContent = col.length;
  }

  // ── DOM refs ───────────────────────────────
  const pullBtn          = document.getElementById('pullBtn');
  const resultModal      = document.getElementById('resultModal');
  const resultBackdrop   = document.getElementById('resultBackdrop');
  const closeResultBtn   = document.getElementById('closeResult');
  const resultCard       = document.getElementById('resultCard');
  const itemTypeBadge    = document.getElementById('itemTypeBadge');
  const flyingCapsule    = document.getElementById('flyingCapsule');
  const rarityBadge      = document.getElementById('rarityBadge');
  const itemImage        = document.getElementById('itemImage');
  const itemName         = document.getElementById('itemName');
  const itemDesc         = document.getElementById('itemDesc');
  const itemDetailModal      = document.getElementById('itemDetailModal');
  const itemDetailBackdrop   = document.getElementById('itemDetailBackdrop');
  const closeItemDetailBtn   = document.getElementById('closeItemDetail');
  const itemDetailCard       = document.getElementById('itemDetailCard');
  const itemDetailBadge      = document.getElementById('itemDetailBadge');
  const itemDetailTypeBadge  = document.getElementById('itemDetailTypeBadge');
  const itemDetailImage   = document.getElementById('itemDetailImage');
  const itemDetailName    = document.getElementById('itemDetailName');
  const itemDetailDesc    = document.getElementById('itemDetailDesc');
  const itemDetailCount   = document.getElementById('itemDetailCount');
  const collectionBtn    = document.getElementById('collectionBtn');
  const collectionModal  = document.getElementById('collectionModal');
  const modalBackdrop    = document.getElementById('modalBackdrop');
  const closeModalBtn    = document.getElementById('closeModal');
  const clearBtn         = document.getElementById('clearBtn');
  const collectionGrid   = document.getElementById('collectionGrid');
  const missingGrid      = document.getElementById('missingGrid');
  const emptyCollection  = document.getElementById('emptyCollection');
  const emptyMissing     = document.getElementById('emptyMissing');
  const tabCollected     = document.getElementById('tabCollected');
  const tabMissing       = document.getElementById('tabMissing');

  // ── Pull logic ─────────────────────────────
  let isPulling = false;

  pullBtn.addEventListener('click', doPull);

  function doPull() {
    if (isPulling) return;
    isPulling = true;
    pullBtn.disabled = true;
    pullBtn.classList.add('pulling');

    const item = weightedPull();
    const cfg  = RARITY_CONFIG[item.rarity] || RARITY_CONFIG['common'];

    // Hide previous result while animating
    resultModal.classList.add('hidden');
    resultCard.classList.remove('pop-in');

    // ── Step 1: Show capsule, animate it ──────
    flyingCapsule.classList.remove('animate');
    flyingCapsule.classList.add('active');

    // Force reflow so animation restarts cleanly
    void flyingCapsule.offsetWidth;
    flyingCapsule.classList.add('animate');

    // ── Step 2: After capsule animation, show card ──
    setTimeout(function () {
      flyingCapsule.classList.remove('active', 'animate');

      // Populate card
      var typeCfg = TYPE_CONFIG[item.type] || Object.values(TYPE_CONFIG)[0];
      itemTypeBadge.innerHTML        = typeCfg.icon + typeCfg.label;
      itemTypeBadge.style.background = typeCfg.bg;
      itemTypeBadge.style.color      = typeCfg.color;
      itemTypeBadge.title            = typeCfg.label;

      rarityBadge.textContent        = cfg.label;
      rarityBadge.style.background   = cfg.gradient;
      rarityBadge.style.color        = cfg.color;
      rarityBadge.style.boxShadow    = '0 0 14px ' + cfg.glow;

      resultCard.style.borderColor   = cfg.border;
      resultCard.style.boxShadow     = '0 0 28px ' + cfg.glow + ', 0 0 55px ' + cfg.glow + '44';

      itemImage.src  = item.image;
      itemImage.alt  = item.name;
      itemImage.style.filter = (item.rarity === 'legendary')
        ? 'drop-shadow(0 0 10px ' + cfg.color + ')'
        : 'none';
      itemName.textContent = item.name;
      itemDesc.textContent = item.description;

      // Show result modal with pop-in
      resultModal.classList.remove('hidden');
      void resultCard.offsetWidth;   // reflow
      resultCard.classList.add('pop-in');

      if (item.rarity === 'legendary') triggerLegendary();

      addToCollection(item);
      isPulling = false;
      pullBtn.disabled = false;
      pullBtn.classList.remove('pulling');
    }, 1200);  // matches capsulePop animation duration
  }

  // ── Legendary effects ─────────────────────
  function triggerLegendary() {
    const sparkColors = ['#f43f5e', '#fbbf24', '#a78bfa', '#fff', '#34d399', '#38bdf8'];
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.className = 'spark';
      el.style.cssText = [
        'left:'            + (25 + Math.random() * 50) + '%',
        'top:'             + (15 + Math.random() * 65) + '%',
        'background:'      + sparkColors[Math.floor(Math.random() * sparkColors.length)],
        'width:'           + (3 + Math.random() * 7) + 'px',
        'height:'          + (3 + Math.random() * 7) + 'px',
        'animation-delay:' + (Math.random() * 0.5) + 's',
        '--dx:'            + ((Math.random() - 0.5) * 130) + 'px',
        '--dy:'            + ((Math.random() - 0.5) * 130) + 'px'
      ].join(';');
      resultCard.appendChild(el);
      setTimeout(function () { el.remove(); }, 1600);
    }
    triggerConfetti();
    playLegendarySound();
  }

  function triggerConfetti() {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');

    var colors = ['#f43f5e','#fbbf24','#38bdf8','#34d399','#a78bfa','#fff','#fb923c','#fb7185','#fcd34d'];
    var pieces = [];

    // Launch from both bottom corners
    for (var i = 0; i < 140; i++) {
      var fromLeft = i < 70;
      var spread   = Math.PI * 0.45;
      var base     = fromLeft ? -Math.PI * 0.15 : -Math.PI * 0.85;
      var angle    = base - Math.random() * spread;
      var speed    = 9 + Math.random() * 11;
      pieces.push({
        x:       fromLeft ? canvas.width * 0.08 : canvas.width * 0.92,
        y:       canvas.height,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed,
        w:       7 + Math.random() * 8,
        h:       4 + Math.random() * 5,
        color:   colors[Math.floor(Math.random() * colors.length)],
        rot:     Math.random() * Math.PI * 2,
        rotV:    (Math.random() - 0.5) * 0.22,
        gravity: 0.28 + Math.random() * 0.12,
        opacity: 1
      });
    }

    var duration = 4200;
    var start    = null;

    function draw(ts) {
      if (!start) start = ts;
      var elapsed = ts - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach(function (p) {
        p.vy += p.gravity;
        p.x  += p.vx;
        p.y  += p.vy;
        p.rot += p.rotV;
        if (elapsed > duration * 0.55) {
          p.opacity = Math.max(0, 1 - (elapsed - duration * 0.55) / (duration * 0.45));
        }
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < duration) {
        requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }

    requestAnimationFrame(draw);
  }

  function playLegendarySound() {
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    var actx = new AudioCtx();
    if (actx.state === 'suspended') actx.resume();

    function bell(freq, t, dur, vol) {
      var osc  = actx.createOscillator();
      var osc2 = actx.createOscillator();
      var gain = actx.createGain();

      osc.type  = 'sine';  osc.frequency.value  = freq;
      osc2.type = 'sine';  osc2.frequency.value = freq * 2.756; // inharmonic partial for bell tone

      var g2 = actx.createGain();
      g2.gain.value = 0.15;

      osc.connect(gain);
      osc2.connect(g2);
      g2.connect(gain);
      gain.connect(actx.destination);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.start(t);  osc.stop(t + dur);
      osc2.start(t); osc2.stop(t + dur);
    }

    var now = actx.currentTime;
    // Rising arpeggio
    bell(523.25, now,        0.6,  0.22);  // C5
    bell(659.25, now + 0.13, 0.6,  0.22);  // E5
    bell(783.99, now + 0.26, 0.6,  0.22);  // G5
    bell(1046.5, now + 0.39, 0.75, 0.26);  // C6
    bell(1318.5, now + 0.54, 1.0,  0.28);  // E6
    // Triumphant chord
    bell(523.25, now + 0.6,  1.6,  0.18);  // C5
    bell(659.25, now + 0.6,  1.6,  0.18);  // E5
    bell(783.99, now + 0.6,  1.6,  0.18);  // G5

    setTimeout(function () { actx.close(); }, 3500);
  }

  // ── Item detail modal ──────────────────────
  function showItemDetail(entry, count) {
    var cfg = RARITY_CONFIG[entry.rarity] || RARITY_CONFIG['common'];
    var entryType = entry.type || (ITEMS.find(function(i) { return i.id === entry.id; }) || {}).type;
    var typeCfg = TYPE_CONFIG[entryType] || Object.values(TYPE_CONFIG)[0];

    itemDetailTypeBadge.innerHTML        = typeCfg.icon + typeCfg.label;
    itemDetailTypeBadge.style.background = typeCfg.bg;
    itemDetailTypeBadge.style.color      = typeCfg.color;
    itemDetailTypeBadge.title            = typeCfg.label;

    itemDetailBadge.textContent     = cfg.label;
    itemDetailBadge.style.background  = cfg.gradient;
    itemDetailBadge.style.color       = cfg.color;
    itemDetailBadge.style.boxShadow   = '0 0 14px ' + cfg.glow;

    itemDetailCard.style.borderColor  = cfg.border;
    itemDetailCard.style.boxShadow    = '0 0 28px ' + cfg.glow + ', 0 0 55px ' + cfg.glow + '44';

    itemDetailImage.src    = entry.image;
    itemDetailImage.alt    = entry.name;
    itemDetailImage.style.filter = (entry.rarity === 'legendary')
      ? 'drop-shadow(0 0 10px ' + cfg.color + ')'
      : 'none';

    itemDetailName.textContent  = entry.name;
    itemDetailDesc.textContent  = entry.description;
    itemDetailCount.textContent = 'Owned: ' + count;

    itemDetailModal.classList.remove('hidden');
  }

  closeItemDetailBtn.addEventListener('click', function () {
    itemDetailModal.classList.add('hidden');
  });
  itemDetailBackdrop.addEventListener('click', function () {
    itemDetailModal.classList.add('hidden');
  });

  // ── Result modal close ─────────────────────
  closeResultBtn.addEventListener('click', function () {
    resultModal.classList.add('hidden');
  });
  resultBackdrop.addEventListener('click', function () {
    resultModal.classList.add('hidden');
  });

  // ── Collection modal ───────────────────────
  var activeTab = 'collected';

  collectionBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  tabCollected.addEventListener('click', function () {
    activeTab = 'collected';
    tabCollected.classList.add('active');
    tabMissing.classList.remove('active');
    clearBtn.style.display = '';
    collectionGrid.classList.remove('hidden');
    missingGrid.classList.add('hidden');
    emptyMissing.classList.add('hidden');
    renderCollection();
  });

  tabMissing.addEventListener('click', function () {
    activeTab = 'missing';
    tabMissing.classList.add('active');
    tabCollected.classList.remove('active');
    clearBtn.style.display = 'none';
    missingGrid.classList.remove('hidden');
    collectionGrid.classList.add('hidden');
    emptyCollection.classList.add('hidden');
    renderMissing();
  });

  clearBtn.addEventListener('click', function () {
    if (confirm('Clear your entire collection? This cannot be undone.')) {
      clearCollection();
      renderCollection();
    }
  });

  function openModal() {
    // Reset to collected tab each open
    activeTab = 'collected';
    tabCollected.classList.add('active');
    tabMissing.classList.remove('active');
    clearBtn.style.display = '';
    collectionGrid.classList.remove('hidden');
    missingGrid.classList.add('hidden');
    emptyMissing.classList.add('hidden');
    renderCollection();
    collectionModal.classList.remove('hidden');
  }
  function closeModal() {
    collectionModal.classList.add('hidden');
  }

  function renderCollection() {
    const col = loadCollection();
    collectionGrid.innerHTML = '';

    if (col.length === 0) {
      emptyCollection.classList.remove('hidden');
      collectionGrid.classList.add('hidden');
      return;
    }
    emptyCollection.classList.add('hidden');
    collectionGrid.classList.remove('hidden');

    // Count and deduplicate by item id
    const counts = {};
    const byId = {};
    col.forEach(function (entry) {
      counts[entry.id] = (counts[entry.id] || 0) + 1;
      byId[entry.id] = entry;
    });

    const typeOrder   = Object.keys(TYPE_CONFIG);
    const rarityOrder = ['common', 'rare', 'ultra-rare', 'legendary'];

    // Group unique items by type, sort within each type by rarity
    const typeGroups = {};
    typeOrder.forEach(function (t) { typeGroups[t] = []; });
    Object.values(byId).forEach(function (entry) {
      var t = entry.type || (ITEMS.find(function(i) { return i.id === entry.id; }) || {}).type || typeOrder[0];
      if (typeGroups[t]) typeGroups[t].push(entry);
      else typeGroups[typeOrder[0]].push(entry);
    });

    typeOrder.forEach(function (type) {
      const items = typeGroups[type];
      if (items.length === 0) return;

      items.sort(function (a, b) {
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      });

      const typeCfg = TYPE_CONFIG[type];

      const header = document.createElement('div');
      header.className = 'col-group-header';
      header.style.color = typeCfg.color;
      header.style.borderBottomColor = typeCfg.border;
      header.innerHTML =
        '<span class="col-type-header-icon" style="color:' + typeCfg.color + '">' + typeCfg.icon + '</span>' +
        typeCfg.label;
      collectionGrid.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'col-rarity-grid';
      items.forEach(function (entry) {
        const count  = counts[entry.id];
        const cfg    = RARITY_CONFIG[entry.rarity] || RARITY_CONFIG['common'];
        const card   = document.createElement('div');
        card.className = 'col-card col-card-clickable';
        card.style.borderColor = cfg.border;
        card.style.boxShadow   = '0 0 10px ' + cfg.glow + '55';
        card.innerHTML =
          '<div class="col-type-icon" style="background:' + typeCfg.bg + ';color:' + typeCfg.color + '" title="' + typeCfg.label + '">' + typeCfg.icon + '</div>' +
          (count > 1 ? '<div class="col-own-count">×' + count + '</div>' : '') +
          '<div class="col-rarity" style="color:' + cfg.color + '">' + cfg.label + '</div>' +
          '<img src="' + entry.image + '" alt="' + entry.name + '" />' +
          '<div class="col-name">' + entry.name + '</div>';
        card.addEventListener('click', function () { showItemDetail(entry, count); });
        grid.appendChild(card);
      });
      collectionGrid.appendChild(grid);
    });
  }

  function renderMissing() {
    missingGrid.innerHTML = '';
    emptyMissing.classList.add('hidden');

    var col      = loadCollection();
    var ownedIds = {};
    col.forEach(function (e) { ownedIds[e.id] = true; });

    var missing = ITEMS.filter(function (item) { return !ownedIds[item.id]; });

    if (missing.length === 0) {
      missingGrid.classList.add('hidden');
      emptyMissing.classList.remove('hidden');
      return;
    }
    missingGrid.classList.remove('hidden');

    var typeOrder   = Object.keys(TYPE_CONFIG);
    var rarityOrder = ['common', 'rare', 'ultra-rare', 'legendary'];

    var typeGroups = {};
    typeOrder.forEach(function (t) { typeGroups[t] = []; });
    missing.forEach(function (item) {
      var t = item.type || typeOrder[0];
      if (typeGroups[t]) typeGroups[t].push(item);
      else typeGroups[typeOrder[0]].push(item);
    });

    typeOrder.forEach(function (type) {
      var items = typeGroups[type];
      if (items.length === 0) return;

      items.sort(function (a, b) {
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      });

      var typeCfg = TYPE_CONFIG[type];

      var header = document.createElement('div');
      header.className = 'col-group-header';
      header.style.color = typeCfg.color;
      header.style.borderBottomColor = typeCfg.border;
      header.innerHTML =
        '<span class="col-type-header-icon" style="color:' + typeCfg.color + '">' + typeCfg.icon + '</span>' +
        typeCfg.label;
      missingGrid.appendChild(header);

      var grid = document.createElement('div');
      grid.className = 'col-rarity-grid';
      items.forEach(function (item) {
        var card = document.createElement('div');
        card.className = 'col-card col-card-missing';
        card.innerHTML =
          '<img src="' + item.image + '" alt="?" />' +
          '<div class="col-name col-mystery">???</div>';
        grid.appendChild(card);
      });
      missingGrid.appendChild(grid);
    });
  }

  // ── Init ───────────────────────────────────
  updateBadge();

})();
