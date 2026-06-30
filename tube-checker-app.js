'use strict';

// ── Standards & Tolerances ────────────────────────────────────────────────────

const STANDARDS = {
  'astm-a53': {
    name: 'ASTM A53',
    tolerances: { od: { plus: 1.0, minus: 1.0 }, wt: { plus: 20.0, minus: 12.5 }, straightness: 0.20, length: { plus: 25, minus: 0 }, weight: { plus: 6.5, minus: 3.5 } }
  },
  'astm-a106': {
    name: 'ASTM A106',
    tolerances: { od: { plus: 1.0, minus: 1.0 }, wt: { plus: 20.0, minus: 12.5 }, straightness: 0.15, length: { plus: 25, minus: 0 }, weight: { plus: 6.5, minus: 3.5 } }
  },
  'astm-a312': {
    name: 'ASTM A312',
    tolerances: { od: { plus: 1.6, minus: 0.8 }, wt: { plus: 20.0, minus: 12.5 }, straightness: 0.30, length: { plus: 25, minus: 0 }, weight: { plus: 10.0, minus: 3.5 } }
  },
  'iso-1127': {
    name: 'ISO 1127',
    tolerances: { od: { plus: 0.75, minus: 0.75 }, wt: { plus: 20.0, minus: 10.0 }, straightness: 0.30, length: { plus: 20, minus: 0 }, weight: { plus: 8.0, minus: 4.0 } }
  },
  'en-10210': {
    name: 'EN 10210',
    tolerances: { od: { plus: 1.0, minus: 1.0 }, wt: { plus: 10.0, minus: 10.0 }, straightness: 0.20, length: { plus: 30, minus: 0 }, weight: { plus: 6.0, minus: 6.0 } }
  },
  'custom': { name: 'Custom', tolerances: null }
};

// ── App State ─────────────────────────────────────────────────────────────────

const state = {
  sessionId: makeSessionId(),
  uploadedImage: null,
  imageResults: null,
  dimResults: null,
};

function makeSessionId() {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'TC-' + Array.from({ length: 8 }, () => c[Math.random() * c.length | 0]).join('');
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  document.getElementById('session-id').textContent = state.sessionId;
  updateClock();
  setInterval(updateClock, 1000);
  setupTabs();
  setupImageTab();
  setupDimTab();
  renderReport(); // placeholder
}

function updateClock() {
  const n = new Date();
  document.getElementById('current-time').textContent =
    n.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) +
    ' ' + n.toLocaleTimeString('en-US', { hour12: false });
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

function setupTabs() {
  document.querySelectorAll('.tc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tc-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tc-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
      if (tab.dataset.tab === 'report') renderReport();
    });
  });
}

// ── Image Upload Tab ──────────────────────────────────────────────────────────

function setupImageTab() {
  const dropzone   = document.getElementById('dropzone');
  const fileInput  = document.getElementById('file-input');
  const sensitivity = document.getElementById('sensitivity');

  document.getElementById('browse-btn').addEventListener('click', e => { e.stopPropagation(); fileInput.click(); });
  dropzone.addEventListener('click', () => { if (!state.uploadedImage) fileInput.click(); });
  fileInput.addEventListener('change', e => { if (e.target.files[0]) loadFile(e.target.files[0]); });
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('tc-dropzone--active'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('tc-dropzone--active'));
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('tc-dropzone--active');
    if (e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]);
  });

  sensitivity.addEventListener('input', () => {
    document.getElementById('sensitivity-val').textContent = sensitivity.value;
  });

  document.getElementById('analyze-btn').addEventListener('click', runAnalysis);
  document.getElementById('clear-img-btn').addEventListener('click', clearImage);
}

function loadFile(file) {
  if (!file.type.startsWith('image/')) { toast('Please upload an image file', 'error'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      state.uploadedImage = img;
      const dz = document.getElementById('dropzone');
      dz.classList.add('tc-dropzone--loaded');
      dz.innerHTML = `
        <img src="${ev.target.result}" class="tc-dropzone__preview" alt="Tube image" />
        <div class="tc-dropzone__overlay">
          <span>${file.name}</span>
          <span>${img.naturalWidth} × ${img.naturalHeight}px</span>
        </div>`;
      document.getElementById('analysis-controls').style.display = 'block';
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function clearImage() {
  state.uploadedImage = null;
  state.imageResults = null;
  document.getElementById('dropzone').outerHTML = document.getElementById('dropzone').outerHTML; // reset
  location.reload(); // simplest clean reset
}

// ── Analysis ──────────────────────────────────────────────────────────────────

async function runAnalysis() {
  if (!state.uploadedImage) { toast('Upload an image first', 'error'); return; }

  const btn = document.getElementById('analyze-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="tc-spinner-sm"></span> Analyzing…';

  document.getElementById('image-display').style.display = 'block';
  document.getElementById('canvas-loading').style.display = 'flex';
  document.getElementById('result-canvas').style.display = 'none';

  await sleep(30);

  const opts = {
    sensitivity:  parseInt(document.getElementById('sensitivity').value, 10),
    cracks:       document.getElementById('d-cracks').checked,
    corrosion:    document.getElementById('d-corrosion').checked,
    pitting:      document.getElementById('d-pitting').checked,
    deformation:  document.getElementById('d-deform').checked,
  };

  const results = await analyzeImage(state.uploadedImage, opts);
  state.imageResults = results;

  renderAnalysisResults(results);
  drawAnnotatedImage(results);
  updateStatusBar();

  document.getElementById('canvas-loading').style.display = 'none';
  document.getElementById('result-canvas').style.display = 'block';

  btn.disabled = false;
  btn.innerHTML = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="6"/><path d="m15 15 3 3"/></svg> Re-Analyze';
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Image Processing Algorithms ───────────────────────────────────────────────

async function analyzeImage(img, opts) {
  // Draw image onto hidden canvas, scaled to ≤1000px wide for performance
  const canvas = document.getElementById('source-canvas');
  const maxW = 1000;
  const scale = Math.min(1, maxW / img.naturalWidth);
  canvas.width  = Math.round(img.naturalWidth  * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const data = imageData.data;
  const W = canvas.width;
  const H = canvas.height;
  const N = W * H;

  // Grayscale
  const gray = new Uint8ClampedArray(N);
  for (let i = 0; i < data.length; i += 4) {
    gray[i >> 2] = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) | 0;
  }

  const results = { W, H, defects: [], cracks: null, corrosion: null, pitting: null, deformation: null, uniformity: null };

  // Sobel edges (needed for cracks)
  const edges = sobelFilter(gray, W, H);
  await sleep(10);

  if (opts.cracks) {
    results.cracks = detectCracks(edges, W, H, opts.sensitivity);
    await sleep(10);
  }
  if (opts.corrosion) {
    results.corrosion = detectCorrosion(data, W, H);
    await sleep(10);
  }
  if (opts.pitting) {
    results.pitting = detectPitting(gray, W, H, opts.sensitivity);
    await sleep(10);
  }
  if (opts.deformation) {
    results.deformation = detectDeformation(gray, W, H);
    await sleep(10);
  }

  results.uniformity = calcUniformity(gray);

  // Score
  let score = 100;
  const push = (res, label, penaltyFactor) => {
    if (res && res.detected) {
      const p = typeof res.percentage === 'number' ? res.percentage : (res.score || 10);
      const penalty = Math.min(penaltyFactor, p * (penaltyFactor / 15));
      score -= penalty;
      results.defects.push({ type: label, severity: res.severity, percentage: res.percentage ?? null, score: res.score ?? null });
    }
  };
  push(results.cracks,      'Cracks & Fractures',   40);
  push(results.corrosion,   'Corrosion & Rust',      35);
  push(results.pitting,     'Pitting & Cavities',    25);
  push(results.deformation, 'Surface Deformation',   20);

  results.overallScore = Math.max(0, Math.round(score));
  results.status = score >= 80 ? 'PASS' : score >= 60 ? 'WARNING' : 'FAIL';
  return results;
}

function sobelFilter(gray, W, H) {
  const edges = new Float32Array(W * H);
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const tl = gray[(y-1)*W+(x-1)], tm = gray[(y-1)*W+x], tr = gray[(y-1)*W+(x+1)];
      const ml = gray[y*W+(x-1)],                            mr = gray[y*W+(x+1)];
      const bl = gray[(y+1)*W+(x-1)], bm = gray[(y+1)*W+x], br = gray[(y+1)*W+(x+1)];
      const gx = -tl - 2*ml - bl + tr + 2*mr + br;
      const gy = -tl - 2*tm - tr + bl + 2*bm + br;
      edges[y*W+x] = Math.sqrt(gx*gx + gy*gy);
    }
  }
  return edges;
}

function detectCracks(edges, W, H, sensitivity) {
  // Find adaptive threshold: high-percentile edge value
  const sample = [];
  for (let i = 0; i < edges.length; i += 10) if (edges[i] > 0) sample.push(edges[i]);
  sample.sort((a, b) => a - b);
  const p85 = sample[Math.floor(sample.length * 0.85)] || 150;
  // Sensitivity 1–10 shifts the threshold; higher sensitivity = lower threshold = more detections
  const threshold = p85 * (1.4 - sensitivity * 0.08);

  const map = new Uint8ClampedArray(W * H);
  let count = 0;
  for (let i = 0; i < edges.length; i++) {
    if (edges[i] > threshold) { map[i] = 255; count++; }
  }

  const pct = (count / (W * H)) * 100;
  const sev = pct > 8 ? 'CRITICAL' : pct > 4 ? 'HIGH' : pct > 1.5 ? 'MEDIUM' : pct > 0.2 ? 'LOW' : 'NONE';
  return { map, percentage: round1(pct), severity: sev, detected: pct > 0.15 };
}

function detectCorrosion(data, W, H) {
  const map = new Uint8ClampedArray(W * H);
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    // Rust: red dominant, brownish tone
    const isRust   = r > 100 && r > g * 1.35 && r > b * 1.7 && g > 25 && b < 130;
    // Brown oxide
    const isBrown  = r > 70 && r < 200 && g > 30 && g < 140 && b < 100 && r > g * 1.15 && r > b * 1.3;
    if (isRust || isBrown) { map[i >> 2] = 255; count++; }
  }
  const pct = (count / (W * H)) * 100;
  const sev = pct > 15 ? 'CRITICAL' : pct > 5 ? 'HIGH' : pct > 1 ? 'MEDIUM' : pct > 0.2 ? 'LOW' : 'NONE';
  return { map, percentage: round1(pct), severity: sev, detected: pct > 0.15 };
}

function detectPitting(gray, W, H, sensitivity) {
  const ws = Math.max(4, Math.floor(Math.min(W, H) / 60));       // window size
  const thr = 22 + (10 - sensitivity) * 3;                        // brightness drop threshold
  const map = new Uint8ClampedArray(W * H);
  let count = 0;

  for (let y = ws; y < H - ws; y++) {
    for (let x = ws; x < W - ws; x++) {
      const center = gray[y * W + x];
      let sum = 0, n = 0;
      for (let dy = -ws; dy <= ws; dy++) {
        for (let dx = -ws; dx <= ws; dx++) {
          if (dx === 0 && dy === 0) continue;
          sum += gray[(y + dy) * W + (x + dx)]; n++;
        }
      }
      if ((sum / n) - center > thr) { map[y * W + x] = 255; count++; }
    }
  }

  const pct = (count / (W * H)) * 100;
  const sev = pct > 5 ? 'CRITICAL' : pct > 2 ? 'HIGH' : pct > 0.5 ? 'MEDIUM' : pct > 0.1 ? 'LOW' : 'NONE';
  return { map, percentage: round1(pct), severity: sev, detected: pct > 0.08 };
}

function detectDeformation(gray, W, H) {
  // Block-level brightness variance → large variance = surface inconsistency
  const bs = Math.max(20, Math.floor(Math.min(W, H) / 18));
  const means = [];
  for (let by = 0; by + bs <= H; by += bs) {
    for (let bx = 0; bx + bs <= W; bx += bs) {
      let s = 0, n = 0;
      for (let y = by; y < by + bs; y++) for (let x = bx; x < bx + bs; x++) { s += gray[y * W + x]; n++; }
      means.push(s / n);
    }
  }
  if (means.length < 4) return { detected: false, severity: 'NONE', score: 0 };

  const mean = means.reduce((a, b) => a + b) / means.length;
  const stdDev = Math.sqrt(means.reduce((acc, v) => acc + (v - mean) ** 2, 0) / means.length);
  const score = Math.min(100, stdDev * 1.4);
  const sev = score > 45 ? 'HIGH' : score > 22 ? 'MEDIUM' : score > 8 ? 'LOW' : 'NONE';
  return { score: Math.round(score), severity: sev, detected: score > 8 };
}

function calcUniformity(gray) {
  let sum = 0;
  for (let i = 0; i < gray.length; i++) sum += gray[i];
  const mean = sum / gray.length;
  let v = 0;
  for (let i = 0; i < gray.length; i++) v += (gray[i] - mean) ** 2;
  const std = Math.sqrt(v / gray.length);
  return { mean: Math.round(mean), stdDev: round1(std), uniformityScore: Math.max(0, Math.round(100 - std * 0.75)) };
}

function round1(n) { return Math.round(n * 10) / 10; }

// ── Render Analysis Results ───────────────────────────────────────────────────

function renderAnalysisResults(r) {
  document.getElementById('results-placeholder').style.display = 'none';
  document.getElementById('analysis-results').style.display = 'block';

  const arc   = document.getElementById('score-arc');
  const score = r.overallScore;
  arc.style.strokeDashoffset = 314 - (314 * score / 100);
  arc.style.stroke = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
  arc.style.transition = 'stroke-dashoffset 0.8s ease';
  document.getElementById('score-num').textContent = score;

  const vb = document.getElementById('verdict-badge');
  vb.className = `tc-verdict tc-verdict--${r.status.toLowerCase()}`;
  vb.textContent = r.status;

  const vd = document.getElementById('verdict-desc');
  vd.textContent = r.status === 'PASS'
    ? 'No significant defects detected. Tube meets visual quality standards.'
    : r.status === 'WARNING'
    ? 'Minor defects detected. Closer inspection recommended before use.'
    : 'Significant defects found. Tube fails visual quality inspection.';

  document.getElementById('results-sub').textContent =
    `Analysis complete — ${r.defects.length} defect type${r.defects.length !== 1 ? 's' : ''} detected`;

  const types = [
    { key: 'cracks',      label: 'Cracks & Fractures',  color: 'red' },
    { key: 'corrosion',   label: 'Corrosion & Rust',    color: 'orange' },
    { key: 'pitting',     label: 'Pitting & Cavities',  color: 'yellow' },
    { key: 'deformation', label: 'Surface Deformation', color: 'purple' },
  ];

  const dl = document.getElementById('defect-list');
  dl.innerHTML = types.map(t => {
    const res = r[t.key];
    if (!res) return '';
    const pct = typeof res.percentage === 'number' ? res.percentage : null;
    const barW = pct !== null ? Math.min(100, pct * 6) : (res.score || 0);
    return `
      <div class="tc-defect-item">
        <div class="tc-defect-item__hd">
          <span class="tc-defect-item__name">${t.label}</span>
          <span class="tc-sev tc-sev--${res.severity.toLowerCase()}">${res.severity}</span>
        </div>
        <div class="tc-defect-item__bar"><div class="tc-defect-item__fill tc-defect-item__fill--${t.color}" style="width:${barW}%"></div></div>
        <span class="tc-defect-item__pct">${res.detected
          ? (pct !== null ? pct + '% of surface affected' : 'Detected (variance score: ' + res.score + ')')
          : 'Not detected'}</span>
      </div>`;
  }).join('') + `
    <div class="tc-defect-item">
      <div class="tc-defect-item__hd">
        <span class="tc-defect-item__name">Surface Uniformity</span>
        <span class="tc-sev ${r.uniformity.uniformityScore >= 70 ? 'tc-sev--none' : r.uniformity.uniformityScore >= 50 ? 'tc-sev--low' : 'tc-sev--medium'}">${r.uniformity.uniformityScore}/100</span>
      </div>
      <div class="tc-defect-item__bar"><div class="tc-defect-item__fill tc-defect-item__fill--blue" style="width:${r.uniformity.uniformityScore}%"></div></div>
      <span class="tc-defect-item__pct">Std dev: ${r.uniformity.stdDev} | Mean brightness: ${r.uniformity.mean}</span>
    </div>`;
}

// ── Draw Annotated Canvas ─────────────────────────────────────────────────────

function drawAnnotatedImage(r) {
  const src = document.getElementById('source-canvas');
  const dst = document.getElementById('result-canvas');
  dst.width  = src.width;
  dst.height = src.height;
  const ctx = dst.getContext('2d');

  // Original image
  ctx.drawImage(src, 0, 0);

  // Build RGBA overlay
  const W = src.width, H = src.height;
  const ov = new Uint8ClampedArray(W * H * 4);

  const paint = (map, rr, gg, bb, aa) => {
    if (!map) return;
    for (let i = 0; i < map.length; i++) {
      if (map[i] > 0 && ov[i * 4 + 3] === 0) {
        ov[i*4]=rr; ov[i*4+1]=gg; ov[i*4+2]=bb; ov[i*4+3]=aa;
      }
    }
  };

  paint(r.cracks?.map,     255,  30,  30, 155);  // red
  paint(r.corrosion?.map,  255, 130,   0, 135);  // orange
  paint(r.pitting?.map,    255, 215,   0, 130);  // yellow

  // Composite
  const tmp = document.createElement('canvas');
  tmp.width = W; tmp.height = H;
  tmp.getContext('2d').putImageData(new ImageData(ov, W, H), 0, 0);
  ctx.drawImage(tmp, 0, 0);

  // Legend on image
  const legendItems = [
    { color: '#ff2222', label: 'Cracks',    show: r.cracks?.detected },
    { color: '#ff8200', label: 'Corrosion', show: r.corrosion?.detected },
    { color: '#ffd700', label: 'Pitting',   show: r.pitting?.detected },
  ].filter(l => l.show);

  if (legendItems.length) {
    const lh = 20, pad = 8, bw = 110;
    const lx = 8, ly = H - legendItems.length * lh - pad * 2;
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.beginPath();
    ctx.roundRect(lx, ly, bw, legendItems.length * lh + pad * 2, 4);
    ctx.fill();
    legendItems.forEach((item, i) => {
      const y = ly + pad + i * lh + lh / 2;
      ctx.fillStyle = item.color;
      ctx.fillRect(lx + 8, y - 5, 10, 10);
      ctx.fillStyle = '#fff';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(item.label, lx + 24, y + 4);
    });
  }

  // Score watermark
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.beginPath();
  ctx.roundRect(W - 92, 8, 84, 32, 4);
  ctx.fill();
  ctx.fillStyle = r.overallScore >= 80 ? '#22c55e' : r.overallScore >= 60 ? '#f59e0b' : '#ef4444';
  ctx.font = 'bold 11px Inter, sans-serif';
  ctx.fillText('Score: ' + r.overallScore + '/100', W - 86, 28);
}

// ── Dimension Checker Tab ─────────────────────────────────────────────────────

function setupDimTab() {
  document.getElementById('standard-select').addEventListener('change', e => {
    document.getElementById('custom-tol').style.display = e.target.value === 'custom' ? 'block' : 'none';
  });

  const od = document.getElementById('m-od');
  const wt = document.getElementById('m-wt');
  const calcId = () => {
    const o = parseFloat(od.value), w = parseFloat(wt.value);
    document.getElementById('calc-id').textContent =
      (o > 0 && w > 0 && w * 2 < o) ? (o - w * 2).toFixed(3) + ' mm' : '—';
  };
  od.addEventListener('input', calcId);
  wt.addEventListener('input', calcId);

  document.getElementById('check-dims-btn').addEventListener('click', runDimCheck);
  document.getElementById('clear-dims-btn').addEventListener('click', clearDims);
}

function getTolerance() {
  const key = document.getElementById('standard-select').value;
  if (key === 'custom') {
    return {
      name: 'Custom',
      od: { plus: parseFloat(document.getElementById('tol-od').value) || 1.0, minus: parseFloat(document.getElementById('tol-od').value) || 1.0 },
      wt: { plus: 20, minus: parseFloat(document.getElementById('tol-wt').value) || 12.5 },
      straightness: parseFloat(document.getElementById('tol-str').value) || 0.2,
      length: { plus: 25, minus: 0 },
      weight: { plus: 10, minus: 10 },
    };
  }
  const s = STANDARDS[key];
  return { name: s.name, ...s.tolerances };
}

function runDimCheck() {
  const tol = getTolerance();

  const get = id => parseFloat(document.getElementById(id).value);
  const nomOD  = get('n-od'),  measOD  = get('m-od');
  const nomWT  = get('n-wt'),  measWT  = get('m-wt');
  const nomLen = get('n-length'), measLen = get('m-length');
  const nomWt  = get('n-weight'), measWt  = get('m-weight');
  const measOv = get('m-ovality');
  const measSt = get('m-straight');
  const measSq = get('m-square');

  const checks = [];

  const pctCheck = (label, measured, nominal, plusTol, minusTol, tolStr) => {
    if (!(nominal > 0) || !(measured > 0)) return;
    const dev = ((measured - nominal) / nominal) * 100;
    checks.push({
      name: label,
      measured: measured.toFixed(3) + ' mm',
      nominal: nominal.toFixed(3) + ' mm',
      deviation: (dev >= 0 ? '+' : '') + dev.toFixed(2) + '%',
      tolerance: tolStr || `+${plusTol}% / −${minusTol}%`,
      pass: dev <= plusTol && dev >= -minusTol,
      rawDev: dev,
    });
  };

  pctCheck('Outer Diameter (OD)', measOD, nomOD, tol.od.plus, tol.od.minus);
  pctCheck('Wall Thickness (WT)', measWT, nomWT, tol.wt.plus,  tol.wt.minus);

  // Length — absolute mm tolerance
  if (nomLen > 0 && measLen > 0) {
    const dev = measLen - nomLen;
    checks.push({
      name: 'Length',
      measured: measLen.toFixed(1) + ' mm',
      nominal: nomLen.toFixed(1) + ' mm',
      deviation: (dev >= 0 ? '+' : '') + dev.toFixed(1) + ' mm',
      tolerance: `+${tol.length.plus} / −${tol.length.minus} mm`,
      pass: dev >= -tol.length.minus && dev <= tol.length.plus,
    });
  }

  // Ovality
  if (nomOD > 0 && !isNaN(measOv) && measOv >= 0) {
    const ovalPct = (measOv / nomOD) * 100;
    const limit = tol.od.plus;
    checks.push({
      name: 'Ovality (OD max − min)',
      measured: measOv.toFixed(3) + ' mm',
      nominal: '≤ ' + (nomOD * limit / 100).toFixed(3) + ' mm',
      deviation: ovalPct.toFixed(2) + '% of OD',
      tolerance: `≤ ${limit}% of OD`,
      pass: ovalPct <= limit,
    });
  }

  // Straightness — %L
  if (measLen > 0 && !isNaN(measSt) && measSt >= 0) {
    const stPct = (measSt / measLen) * 100;
    const lim   = tol.straightness;
    checks.push({
      name: 'Straightness',
      measured: measSt.toFixed(3) + ' mm',
      nominal: '≤ ' + (measLen * lim / 100).toFixed(3) + ' mm',
      deviation: stPct.toFixed(3) + '% of L',
      tolerance: `≤ ${lim}% of L`,
      pass: stPct <= lim,
    });
  }

  // Weight/meter
  if (nomWt > 0 && measWt > 0 && tol.weight) {
    pctCheck('Weight per Meter', measWt, nomWt, tol.weight.plus, tol.weight.minus);
  }

  // End squareness (if OD known, typically ≤ 1.5% of OD)
  if (nomOD > 0 && !isNaN(measSq) && measSq >= 0) {
    const limit = nomOD * 0.015;
    checks.push({
      name: 'End Squareness',
      measured: measSq.toFixed(3) + ' mm',
      nominal: '≤ ' + limit.toFixed(3) + ' mm',
      deviation: measSq.toFixed(3) + ' mm',
      tolerance: '≤ 1.5% of OD',
      pass: measSq <= limit,
    });
  }

  if (checks.length === 0) {
    toast('Enter at least one measured + nominal value pair', 'error');
    return;
  }

  state.dimResults = { checks, standardKey: document.getElementById('standard-select').value };
  renderDimResults(checks);
  updateStatusBar();
}

function renderDimResults(checks) {
  document.getElementById('dim-placeholder').style.display = 'none';
  document.getElementById('dim-results').style.display = 'block';

  const allPass = checks.every(c => c.pass);
  document.getElementById('dim-overall-badge').innerHTML =
    `<span class="tc-chip tc-chip--${allPass ? 'pass' : 'fail'}">${allPass ? 'ALL PASS' : 'FAIL'}</span>`;

  document.getElementById('compliance-table').innerHTML = `
    <table class="tc-table">
      <thead><tr>
        <th>Parameter</th><th>Measured</th><th>Nominal</th>
        <th>Deviation</th><th>Tolerance</th><th>Result</th>
      </tr></thead>
      <tbody>
        ${checks.map(c => `
          <tr class="${c.pass ? 'row-pass' : 'row-fail'}">
            <td class="tc-param">${c.name}</td>
            <td class="mono">${c.measured}</td>
            <td class="mono">${c.nominal}</td>
            <td class="mono ${c.pass ? '' : 'tc-danger'}">${c.deviation}</td>
            <td class="mono" style="color:var(--muted)">${c.tolerance}</td>
            <td><span class="tc-badge-sm ${c.pass ? 'tc-badge-sm--pass' : 'tc-badge-sm--fail'}">${c.pass ? '✓ PASS' : '✗ FAIL'}</span></td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

function clearDims() {
  ['m-od','m-wt','m-id','m-length','m-ovality','m-straight','m-weight','m-square',
   'n-od','n-wt','n-length','n-weight'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('calc-id').textContent = '—';
  document.getElementById('dim-placeholder').style.display = 'flex';
  document.getElementById('dim-results').style.display = 'none';
  document.getElementById('dim-overall-badge').innerHTML = '';
  state.dimResults = null;
  updateStatusBar();
}

// ── Status Bar ────────────────────────────────────────────────────────────────

function updateStatusBar() {
  const ir = state.imageResults;
  const dr = state.dimResults;

  let status = 'neutral', label = 'Not Analyzed', score = null;

  if (ir) {
    score = ir.overallScore;
    status = ir.status.toLowerCase();
    label  = ir.status;
    if (dr && dr.checks.some(c => !c.pass) && status === 'pass') { status = 'warning'; label = 'DIM FAIL'; }
  } else if (dr) {
    const ok = dr.checks.every(c => c.pass);
    status = ok ? 'pass' : 'fail';
    label  = ok ? 'PASS' : 'FAIL';
    score  = ok ? 100 : 40;
  }

  document.getElementById('overall-status').innerHTML = `<span class="tc-chip tc-chip--${status}">${label}</span>`;
  document.getElementById('quality-score').textContent = score !== null ? score + '/100' : '—/100';
}

// ── Report ────────────────────────────────────────────────────────────────────

function renderReport() {
  const el = document.getElementById('report-content');
  const ir = state.imageResults;
  const dr = state.dimResults;

  if (!ir && !dr) {
    el.innerHTML = `
      <div class="tc-placeholder">
        <svg viewBox="0 0 64 64" fill="none"><rect x="12" y="4" width="40" height="56" rx="3" stroke="#1e3a5f" stroke-width="2"/><line x1="20" y1="18" x2="44" y2="18" stroke="#1e3a5f" stroke-width="2"/><line x1="20" y1="26" x2="44" y2="26" stroke="#1e3a5f" stroke-width="2"/><line x1="20" y1="34" x2="36" y2="34" stroke="#1e3a5f" stroke-width="2"/></svg>
        <p>Complete an image analysis or dimension check to generate a report</p>
      </div>`;
    return;
  }

  let overallStatus = 'PASS';
  if (ir) overallStatus = ir.status;
  if (dr && dr.checks.some(c => !c.pass) && overallStatus === 'PASS') overallStatus = 'WARNING';
  if (ir?.status === 'FAIL' || (dr && dr.checks.some(c => !c.pass) && ir?.status !== 'PASS')) overallStatus = 'FAIL';

  const score = ir ? ir.overallScore + '/100' : (dr?.checks.every(c => c.pass) ? '100/100' : '—/100');
  const now = new Date();
  const stdName = dr ? (STANDARDS[dr.standardKey]?.name || 'Custom') : '—';

  el.innerHTML = `
    <div id="printable-report">
      <div class="tc-report-hd">
        <div>
          <div class="tc-report-brand">TubeCheck <span>Pro</span></div>
          <div class="tc-report-brand-sub">Metal Tube Inspection Report</div>
        </div>
        <div class="tc-report-meta">
          <div class="tc-report-meta-row"><span>Report ID</span><span class="mono">${state.sessionId}-${Date.now().toString(36).toUpperCase()}</span></div>
          <div class="tc-report-meta-row"><span>Date</span><span>${now.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</span></div>
          <div class="tc-report-meta-row"><span>Time</span><span class="mono">${now.toLocaleTimeString('en-US', { hour12: false })}</span></div>
          <div class="tc-report-meta-row"><span>Standard</span><span>${stdName}</span></div>
        </div>
      </div>

      <div class="tc-report-verdict tc-report-verdict--${overallStatus.toLowerCase()}">
        <div class="tc-report-verdict__lbl">Overall Verdict</div>
        <div class="tc-report-verdict__status">${overallStatus}</div>
        <div class="tc-report-verdict__score">Quality Score: ${score}</div>
      </div>

      ${ir ? `
        <div class="tc-report-sec">
          <div class="tc-report-sec__title">Visual Defect Analysis</div>
          ${ir.defects.length === 0
            ? '<p class="tc-report-ok">✓ No visual defects detected</p>'
            : ir.defects.map(d => `
              <div class="tc-report-defect">
                <span class="tc-report-defect__name">${d.type}</span>
                <div class="tc-report-defect__info">
                  <span class="tc-sev tc-sev--${d.severity.toLowerCase()}">${d.severity}</span>
                  ${d.percentage !== null ? `<span style="font-size:.82rem;color:var(--sub)">${d.percentage}% surface affected</span>` : ''}
                </div>
              </div>`).join('')}
          <div class="tc-report-uniformity">
            <span>Surface Uniformity Score</span>
            <span class="mono">${ir.uniformity?.uniformityScore ?? '—'}/100 (σ = ${ir.uniformity?.stdDev ?? '—'})</span>
          </div>
        </div>
      ` : ''}

      ${dr ? `
        <div class="tc-report-sec">
          <div class="tc-report-sec__title">Dimensional Compliance — ${stdName}</div>
          <table class="tc-table">
            <thead><tr><th>Parameter</th><th>Measured</th><th>Nominal</th><th>Deviation</th><th>Tolerance</th><th>Result</th></tr></thead>
            <tbody>
              ${dr.checks.map(c => `
                <tr class="${c.pass ? 'row-pass' : 'row-fail'}">
                  <td class="tc-param">${c.name}</td>
                  <td class="mono">${c.measured}</td>
                  <td class="mono">${c.nominal}</td>
                  <td class="mono ${c.pass ? '' : 'tc-danger'}">${c.deviation}</td>
                  <td class="mono" style="color:var(--muted)">${c.tolerance}</td>
                  <td><span class="tc-badge-sm ${c.pass ? 'tc-badge-sm--pass' : 'tc-badge-sm--fail'}">${c.pass ? '✓ PASS' : '✗ FAIL'}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <div class="tc-report-sec">
        <div class="tc-report-sec__title">Defect Summary</div>
        <ul class="tc-report-list">
          ${ir ? [
            ir.cracks?.detected     ? `<li class="li-danger">Surface cracks detected — ${ir.cracks.percentage}% of surface (${ir.cracks.severity})</li>` : '<li>No cracks detected</li>',
            ir.corrosion?.detected  ? `<li class="li-danger">Corrosion/rust detected — ${ir.corrosion.percentage}% of surface (${ir.corrosion.severity})</li>` : '<li>No corrosion detected</li>',
            ir.pitting?.detected    ? `<li class="li-warn">Pitting detected — ${ir.pitting.percentage}% of surface (${ir.pitting.severity})</li>` : '<li>No pitting detected</li>',
            ir.deformation?.detected ? `<li class="li-warn">Surface deformation detected (variance score: ${ir.deformation.score})</li>` : '<li>No deformation detected</li>',
          ].join('') : '<li>No image analysis performed</li>'}
          ${dr ? dr.checks.map(c => `<li class="${c.pass ? '' : 'li-danger'}">${c.name}: ${c.pass ? 'Within tolerance' : 'OUT OF TOLERANCE — ' + c.deviation}</li>`).join('') : ''}
        </ul>
      </div>

      <div class="tc-report-footer">
        <p>Generated by TubeCheck Pro &bull; Session ${state.sessionId} &bull; ${now.toISOString()}</p>
        <p class="tc-report-disclaimer">This report is for quality control reference only. All results must be verified by a certified metallurgical inspector before making critical decisions.</p>
      </div>
    </div>`;

  document.getElementById('print-btn').onclick = () => window.print();
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function toast(msg, type = 'success') {
  document.querySelector('.tc-toast')?.remove();
  const el = document.createElement('div');
  el.className = `tc-toast tc-toast--${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('tc-toast--visible'));
  setTimeout(() => { el.classList.remove('tc-toast--visible'); setTimeout(() => el.remove(), 300); }, 3000);
}

// ── Start ─────────────────────────────────────────────────────────────────────
init();
