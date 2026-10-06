/* js/engine/render-props.js
 * Desenho dos props do cenario no canvas (rg...Pg), incluindo a fogueira (hg).
 * Trecho de legacy/app.original.js (linhas 18363-20124); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  function rg(e, t, l) {
    ((e.fillStyle = "#3d2215"),
      e.beginPath(),
      e.moveTo(-6 * t, 4 * t),
      e.quadraticCurveTo(-4 * t, -4 * t, -3.5 * t, -14 * t),
      e.lineTo(3.5 * t, -14 * t),
      e.quadraticCurveTo(4 * t, -4 * t, 6 * t, 4 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#5c3826"),
      e.beginPath(),
      e.moveTo(-4 * t, 2 * t),
      e.lineTo(-2.5 * t, -14 * t),
      e.lineTo(2.5 * t, -14 * t),
      e.lineTo(4 * t, 2 * t),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#29140a"),
      (e.lineWidth = 1 * t),
      e.beginPath(),
      e.moveTo(-1 * t, 2 * t),
      e.lineTo(-1.2 * t, -12 * t),
      e.moveTo(1.2 * t, 2 * t),
      e.lineTo(1 * t, -10 * t),
      e.stroke());
    const o = Math.sin(l * 1.4 + t * 8) * 1.5 * t,
      u = Math.cos(l * 1.8 + t * 6) * 1.2 * t;
    ((e.fillStyle = "#113318"),
      e.beginPath(),
      e.arc(0 + o * 0.4, -22 * t, 22 * t, 0, Math.PI * 2),
      e.arc(-8 * t + o * 0.3, -24 * t, 16 * t, 0, Math.PI * 2),
      e.arc(8 * t + o * 0.3, -23 * t, 16 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#1b5228"),
      e.beginPath(),
      e.arc(-7 * t + o, -28 * t, 15 * t, 0, Math.PI * 2),
      e.arc(7 * t + u, -27 * t, 14 * t, 0, Math.PI * 2),
      e.arc(0 + o * 0.7, -33 * t, 16 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#266b34"),
      e.beginPath(),
      e.arc(-9 * t + o, -30 * t, 10 * t, 0, Math.PI * 2),
      e.arc(-2 * t + o * 0.8, -36 * t, 11 * t, 0, Math.PI * 2),
      e.arc(4 * t + u, -32 * t, 8 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#307a3e"),
      e.beginPath(),
      e.arc(-7 * t + o, -32 * t, 5 * t, 0, Math.PI * 2),
      e.arc(-3 * t + o * 0.8, -38 * t, 6 * t, 0, Math.PI * 2),
      e.arc(3 * t + u, -34 * t, 4 * t, 0, Math.PI * 2),
      e.fill());
  }
  function lg(e, t, l, o) {
    ((e.fillStyle = "#2e1c14"),
      e.fillRect(-3.5 * t, -12 * t, 7 * t, 16 * t),
      (e.fillStyle = "#452b1f"),
      e.fillRect(-2 * t, -12 * t, 4 * t, 16 * t));
    const u = [
      { y: -8 * t, w: 28 * t, h: 16 * t },
      { y: -19 * t, w: 22 * t, h: 15 * t },
      { y: -29 * t, w: 16 * t, h: 14 * t },
      { y: -38 * t, w: 10 * t, h: 12 * t },
    ];
    for (let m = 0; m < u.length; m++) {
      const c = u[m],
        f = Math.sin(o * 1.6 + m) * (0.8 + m * 0.4) * t;
      ((e.fillStyle = "#0b2d1c"),
        e.beginPath(),
        e.moveTo(-c.w / 2 + f * 0.5, c.y),
        e.lineTo(c.w / 2 + f * 0.5, c.y),
        e.lineTo(f, c.y - c.h),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#13462f"),
        e.beginPath(),
        e.moveTo(-c.w / 2 + f * 0.5, c.y - 2 * t));
      const g = 4;
      for (let y = 0; y <= g; y++) {
        const w = -c.w / 2 + (c.w / g) * y + f * 0.5,
          v = y % 2 === 0 ? c.y : c.y - 3 * t;
        e.lineTo(w, v);
      }
      (e.lineTo(f, c.y - c.h),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#1d5c3f"),
        e.beginPath(),
        e.moveTo(-c.w / 2 + f * 0.5, c.y - 2 * t),
        e.lineTo(f, c.y),
        e.lineTo(f, c.y - c.h),
        e.closePath(),
        e.fill(),
        l &&
          ((e.fillStyle = "#cbd5e1"),
          e.beginPath(),
          e.moveTo(-c.w * 0.38 + f * 0.5, c.y - c.h * 0.28),
          e.lineTo(c.w * 0.38 + f * 0.5, c.y - c.h * 0.28),
          e.lineTo(f, c.y - c.h),
          e.closePath(),
          e.fill(),
          (e.fillStyle = "#ffffff"),
          e.beginPath(),
          e.moveTo(-c.w * 0.32 + f * 0.5, c.y - c.h * 0.32),
          e.quadraticCurveTo(
            f,
            c.y - c.h * 0.25,
            c.w * 0.32 + f * 0.5,
            c.y - c.h * 0.32,
          ),
          e.lineTo(f, c.y - c.h),
          e.closePath(),
          e.fill()));
    }
  }
  function ig(e, t, l) {
    const o = Math.sin(l * 1.5) * 2.5 * t,
      u = 6 * t + o,
      m = -36 * t;
    ((e.strokeStyle = "#451a03"),
      (e.lineWidth = 6.5 * t),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(0, 2 * t),
      e.quadraticCurveTo(8 * t, -18 * t, u, m),
      e.stroke(),
      (e.strokeStyle = "#78350f"),
      (e.lineWidth = 4.8 * t),
      e.stroke(),
      (e.fillStyle = "#9a3412"));
    for (let f = 0.2; f <= 0.85; f += 0.15) {
      const g = (1 - f) * (1 - f) * 0 + 2 * (1 - f) * f * (8 * t) + f * f * u,
        y =
          (1 - f) * (1 - f) * (2 * t) + 2 * (1 - f) * f * (-18 * t) + f * f * m;
      (e.beginPath(), e.arc(g, y, 3.2 * t, 0, Math.PI * 2), e.fill());
    }
    ((e.fillStyle = "#451a03"),
      e.beginPath(),
      e.arc(u - 2.5 * t, m + 3 * t, 2.5 * t, 0, Math.PI * 2),
      e.arc(u + 2.5 * t, m + 3.5 * t, 2.6 * t, 0, Math.PI * 2),
      e.arc(u, m + 5 * t, 2.8 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#78350f"),
      e.beginPath(),
      e.arc(u - 3 * t, m + 2.5 * t, 1.2 * t, 0, Math.PI * 2),
      e.arc(u + 2 * t, m + 3 * t, 1.2 * t, 0, Math.PI * 2),
      e.fill());
    const c = [
      { dx: -26 * t, dy: 10 * t, archY: -16 * t },
      { dx: 26 * t + o, dy: 12 * t, archY: -14 * t },
      { dx: -22 * t, dy: -12 * t, archY: -22 * t },
      { dx: 22 * t + o, dy: -10 * t, archY: -20 * t },
      { dx: -10 * t, dy: -24 * t, archY: -28 * t },
      { dx: 12 * t + o, dy: -24 * t, archY: -28 * t },
    ];
    for (const f of c) {
      const g = u + f.dx,
        y = m + f.dy,
        w = u + f.dx * 0.5,
        v = m + f.archY;
      ((e.strokeStyle = "#143d1f"),
        (e.lineWidth = 3.5 * t),
        e.beginPath(),
        e.moveTo(u, m),
        e.quadraticCurveTo(w, v, g, y),
        e.stroke(),
        (e.strokeStyle = "#1f592d"),
        (e.lineWidth = 2 * t),
        e.stroke(),
        (e.strokeStyle = "#164823"),
        (e.lineWidth = 1.4 * t));
      for (let T = 0.2; T <= 0.9; T += 0.15) {
        const S = (1 - T) * (1 - T) * u + 2 * (1 - T) * T * w + T * T * g,
          p = (1 - T) * (1 - T) * m + 2 * (1 - T) * T * v + T * T * y;
        (e.beginPath(),
          e.moveTo(S, p),
          e.lineTo(S + (f.dx > 0 ? 3 : -3) * t, p + 6 * t),
          e.stroke());
      }
    }
  }
  function ng(e, t, l) {
    ((e.fillStyle = "#2d1810"),
      e.beginPath(),
      e.moveTo(-6 * t, 4 * t),
      e.quadraticCurveTo(-3 * t, -4 * t, -4 * t, -16 * t),
      e.lineTo(4 * t, -16 * t),
      e.quadraticCurveTo(3 * t, -4 * t, 6 * t, 4 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#422416"),
      e.fillRect(-3 * t, -14 * t, 6 * t, 16 * t));
    const o = Math.sin(l * 1.3) * 1.5 * t;
    ((e.fillStyle = "#183018"),
      e.beginPath(),
      e.arc(0 + o * 0.5, -24 * t, 22 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#244824"),
      e.beginPath(),
      e.arc(-4 * t + o, -26 * t, 16 * t, 0, Math.PI * 2),
      e.arc(5 * t + o, -25 * t, 15 * t, 0, Math.PI * 2),
      e.fill());
    for (let u = -16; u <= 16; u += 4) {
      const m = Math.sin(l * 1.8 + u * 0.4) * 3 * t,
        c = (18 + Math.sin(u * 3) * 6) * t,
        f = e.createLinearGradient(u * t, -20 * t, u * t + m, -20 * t + c);
      (f.addColorStop(0, "rgba(48, 76, 22, 0.85)"),
        f.addColorStop(0.7, "rgba(68, 106, 32, 0.65)"),
        f.addColorStop(1, "rgba(84, 126, 40, 0.35)"),
        (e.strokeStyle = f),
        (e.lineWidth = 1.6 * t),
        e.beginPath(),
        e.moveTo(u * t, -20 * t),
        e.quadraticCurveTo(
          u * t + m * 0.5,
          -20 * t + c * 0.5,
          u * t + m,
          -20 * t + c,
        ),
        e.stroke());
    }
  }
  function sg(e, t, l) {
    ((e.strokeStyle = "#0c0a09"),
      (e.lineWidth = 4.5 * t),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(0, 2 * t),
      e.lineTo(-2 * t, -22 * t),
      e.lineTo(-12 * t, -32 * t),
      e.moveTo(-2 * t, -16 * t),
      e.lineTo(10 * t, -28 * t),
      e.stroke());
    const o = (Math.sin(l * 4) + 1) * 0.5;
    ((e.fillStyle = `rgba(249, 115, 22, ${0.4 + o * 0.5})`),
      e.beginPath(),
      e.arc(-1.5 * t, -16 * t, 1.8 * t, 0, Math.PI * 2),
      e.fill());
  }
  function cg(e, t) {
    ((e.fillStyle = "#143d22"),
      e.beginPath(),
      e.roundRect(-4.5 * t, -28 * t, 9 * t, 32 * t, 4.5 * t),
      e.fill(),
      (e.fillStyle = "#1c552f"),
      e.beginPath(),
      e.roundRect(-4 * t, -28 * t, 6 * t, 31 * t, 4 * t),
      e.fill(),
      (e.fillStyle = "#26703f"),
      e.beginPath(),
      e.roundRect(-3.5 * t, -27 * t, 2.5 * t, 29 * t, 2 * t),
      e.fill(),
      (e.lineWidth = 3.5 * t),
      (e.strokeStyle = "#1c552f"),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(-4 * t, -16 * t),
      e.lineTo(-12 * t, -16 * t),
      e.lineTo(-12 * t, -24 * t),
      e.stroke(),
      e.beginPath(),
      e.moveTo(4 * t, -12 * t),
      e.lineTo(12 * t, -12 * t),
      e.lineTo(12 * t, -22 * t),
      e.stroke(),
      (e.fillStyle = "#d4b26f"));
    for (let l = -24; l <= -2; l += 6)
      (e.fillRect(-5.5 * t, l * t, 1.2 * t, 1 * t),
        e.fillRect(4.5 * t, l * t, 1.2 * t, 1 * t));
  }
  function dg(e, t, l, o) {
    let u = "#1e293b",
      m = "#475569",
      c = "#94a3b8",
      f = "#cbd5e1";
    (o === BiomeId.VOLCANIC
      ? ((u = "#0c0a09"), (m = "#262626"), (c = "#44403c"), (f = "#78716c"))
      : o === BiomeId.CANYON
        ? ((u = "#451a03"), (m = "#7c2d12"), (c = "#c2410c"), (f = "#fdba74"))
        : o === BiomeId.GLACIER
          ? ((u = "#0369a1"), (m = "#0284c7"), (c = "#7dd3fc"), (f = "#ffffff"))
          : (o === BiomeId.DESERT || o === BiomeId.BEACH) &&
            ((u = "#78350f"),
            (m = "#b45309"),
            (c = "#d97706"),
            (f = "#fde68a")),
      (e.fillStyle = u),
      e.beginPath(),
      e.moveTo(-11 * t, 2 * t),
      e.lineTo(11 * t, 2 * t),
      e.lineTo(12 * t, -4 * t),
      e.lineTo(4 * t, -12 * t),
      e.lineTo(-8 * t, -11 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = m),
      e.beginPath(),
      e.moveTo(-11 * t, 2 * t),
      e.lineTo(0, -5 * t),
      e.lineTo(4 * t, -12 * t),
      e.lineTo(-8 * t, -11 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = c),
      e.beginPath(),
      e.moveTo(-10 * t, 0),
      e.lineTo(-2 * t, -7 * t),
      e.lineTo(-4 * t, -12 * t),
      e.lineTo(-8 * t, -11 * t),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = f),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.moveTo(-8 * t, -11 * t),
      e.lineTo(-2 * t, -7 * t),
      e.lineTo(4 * t, -12 * t),
      e.stroke(),
      o !== BiomeId.VOLCANIC &&
      o !== BiomeId.DESERT &&
      o !== BiomeId.CANYON &&
      o !== BiomeId.GLACIER
        ? ((e.fillStyle = "#65a30d"),
          e.beginPath(),
          e.arc(-2 * t, -3 * t, 2.5 * t, 0, Math.PI * 2),
          e.arc(3 * t, -1 * t, 2 * t, 0, Math.PI * 2),
          e.fill())
        : o === BiomeId.VOLCANIC &&
          ((e.strokeStyle = "#ef4444"),
          (e.lineWidth = 1 * t),
          e.beginPath(),
          e.moveTo(-2 * t, 0),
          e.lineTo(2 * t, -4 * t),
          e.stroke()));
  }
  function ug(e, t, l, o) {
    const u = Math.sin(o * 3 + l * 10) * 0.8 * l;
    ((e.strokeStyle = "#15803d"),
      (e.lineWidth = 1.6 * l),
      e.beginPath(),
      e.moveTo(0, 3 * l),
      e.quadraticCurveTo(-1 * l, -2 * l, u, -8 * l),
      e.stroke(),
      (e.fillStyle = "#22c55e"),
      e.beginPath(),
      e.ellipse(-2 * l, -3 * l, 2.5 * l, 1.2 * l, -0.4, 0, Math.PI * 2),
      e.fill());
    let m = "#ef4444",
      c = "#fef08a";
    t === "flower_blue"
      ? ((m = "#38bdf8"), (c = "#ffffff"))
      : t === "flower_yellow" && ((m = "#eab308"), (c = "#78350f"));
    const f = u,
      g = -8 * l;
    e.fillStyle = m;
    for (let y = 0; y < Math.PI * 2; y += Math.PI / 2.5) {
      const w = f + Math.cos(y) * 3.2 * l,
        v = g + Math.sin(y) * 3.2 * l;
      (e.beginPath(), e.arc(w, v, 2.2 * l, 0, Math.PI * 2), e.fill());
    }
    ((e.fillStyle = c),
      e.beginPath(),
      e.arc(f, g, 1.8 * l, 0, Math.PI * 2),
      e.fill());
  }
  function drawBluePlant(e, t, l, o, isNight) {
    e.save();
    e.translate(0, 1 * l);
    e.strokeStyle = "#164e63";
    e.lineWidth = 2.2 * l;
    e.lineCap = "round";
    e.beginPath();
    e.moveTo(0, 3 * l);
    e.quadraticCurveTo(-1 * l, -3 * l, 0.5 * l, -11 * l);
    e.stroke();
    e.strokeStyle = "#2563eb";
    e.lineWidth = 1.5 * l;
    e.beginPath();
    e.moveTo(0, 1 * l);
    e.quadraticCurveTo(-5 * l, -2 * l, -7 * l, -6 * l);
    e.moveTo(0, -1 * l);
    e.quadraticCurveTo(5 * l, -4 * l, 7 * l, -8 * l);
    e.stroke();
    e.fillStyle = "#60a5fa";
    e.beginPath();
    e.ellipse(-5 * l, -5 * l, 3.2 * l, 1.4 * l, -0.55, 0, Math.PI * 2);
    e.ellipse(5 * l, -7 * l, 3.2 * l, 1.4 * l, 0.55, 0, Math.PI * 2);
    e.fill();
    if (isNight) {
      e.shadowColor = "#60a5fa";
      e.shadowBlur = 9 * l;
      e.fillStyle = "#2563eb";
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 2.5) {
        e.beginPath();
        e.arc(Math.cos(a) * 3.4 * l, -12 * l + Math.sin(a) * 3.4 * l, 2.5 * l, 0, Math.PI * 2);
        e.fill();
      }
      e.fillStyle = "#dbeafe";
      e.beginPath();
      e.arc(0, -12 * l, 1.8 * l, 0, Math.PI * 2);
      e.fill();
    }
    e.restore();
  }
  function fg(e, t) {
    ((e.fillStyle = "#e7e5e4"),
      e.beginPath(),
      e.roundRect(-2.5 * t, -7 * t, 5 * t, 9 * t, 2 * t),
      e.fill(),
      (e.fillStyle = "#b91c1c"),
      e.beginPath(),
      e.arc(0, -7 * t, 7 * t, Math.PI, 0),
      e.fill(),
      (e.fillStyle = "#ef4444"),
      e.beginPath(),
      e.arc(-1.5 * t, -8 * t, 5 * t, Math.PI, 0),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(-3 * t, -10 * t, 1.2 * t, 0, Math.PI * 2),
      e.arc(2 * t, -11 * t, 1.4 * t, 0, Math.PI * 2),
      e.arc(0, -13 * t, 1 * t, 0, Math.PI * 2),
      e.fill());
  }
  function mg(e, t, l, o) {
    ((e.fillStyle = "#334155"),
      e.fillRect(-14 * t, -4 * t, 28 * t, 8 * t),
      (e.fillStyle = "#475569"),
      e.fillRect(-10 * t, -12 * t, 20 * t, 8 * t));
    const u = Math.sin(o * 2.5) * 3,
      m = -26 * t + u;
    (e.save(),
      (e.shadowColor = "#38bdf8"),
      (e.shadowBlur = 14),
      (e.fillStyle = "#38bdf8"),
      e.beginPath(),
      e.moveTo(0, m - 14 * t),
      e.lineTo(8 * t, m),
      e.lineTo(0, m + 14 * t),
      e.lineTo(-8 * t, m),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#e0f2fe"),
      e.beginPath(),
      e.moveTo(0, m - 14 * t),
      e.lineTo(0, m + 14 * t),
      e.lineTo(-8 * t, m),
      e.closePath(),
      e.fill(),
      e.restore(),
      (e.strokeStyle = "rgba(56, 189, 248, 0.6)"),
      (e.lineWidth = 1.5),
      e.beginPath(),
      e.ellipse(0, 0, 18 * t, 6 * t, 0, 0, Math.PI * 2),
      e.stroke());
  }
  function hg(e, t, l, o = !0, u, isSaveFire = false) {
    for (let w = 0; w < Math.PI * 2; w += Math.PI / 4) {
      const v = Math.cos(w) * 8.5 * t,
        T = Math.sin(w) * 4.5 * t;
      ((e.fillStyle = "#27272a"),
        e.beginPath(),
        e.arc(v, T + 0.5 * t, 3.2 * t, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#71717a"),
        e.beginPath(),
        e.arc(v - 0.8 * t, T - 0.8 * t, 2.2 * t, 0, Math.PI * 2),
        e.fill());
    }
    if (!o) {
      ((e.fillStyle = "#18181b"),
        e.beginPath(),
        e.ellipse(0, 1 * t, 5.8 * t, 2.8 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#27272a"),
        e.beginPath(),
        e.ellipse(0, 0.8 * t, 3.8 * t, 1.8 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = "#271206"),
        (e.lineWidth = 3.2 * t),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(-6 * t, 2.5 * t),
        e.lineTo(5.5 * t, -2.2 * t),
        e.moveTo(-5.5 * t, -2.2 * t),
        e.lineTo(6 * t, 2.5 * t),
        e.moveTo(-6.5 * t, 0),
        e.lineTo(6.5 * t, 0),
        e.stroke(),
        (e.strokeStyle = "#78350f"),
        (e.lineWidth = 2 * t),
        e.beginPath(),
        e.moveTo(-4.5 * t, 2.8 * t),
        e.lineTo(0, -5.5 * t),
        e.moveTo(4.5 * t, 2.8 * t),
        e.lineTo(0, -5.5 * t),
        e.moveTo(-2.2 * t, 3.2 * t),
        e.lineTo(-0.5 * t, -6 * t),
        e.moveTo(2.2 * t, 3.2 * t),
        e.lineTo(0.5 * t, -6 * t),
        e.moveTo(0, 3.5 * t),
        e.lineTo(0, -6 * t),
        e.stroke(),
        (e.strokeStyle = "#a16207"),
        (e.lineWidth = 1.2 * t),
        e.beginPath(),
        e.moveTo(-3.5 * t, 2.5 * t),
        e.lineTo(-0.2 * t, -5 * t),
        e.moveTo(3.5 * t, 2.5 * t),
        e.lineTo(0.2 * t, -5 * t),
        e.moveTo(-1.2 * t, 3 * t),
        e.lineTo(-0.2 * t, -5.8 * t),
        e.stroke(),
        (e.fillStyle = "#b45309"),
        e.fillRect(-1.5 * t, 0, 3 * t, 1.2 * t));
      return;
    }
    const m = Math.sin(l * 5) * 0.2 + 0.8;
    ((e.fillStyle = `rgba(234, 88, 12, ${0.7 * m})`),
      e.beginPath(),
      e.ellipse(0, 1 * t, 6 * t, 3 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = `rgba(254, 240, 138, ${0.85 * m})`),
      e.beginPath(),
      e.ellipse(0, 1 * t, 3.5 * t, 1.8 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = "#271206"),
      (e.lineWidth = 3.8 * t),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(-6.5 * t, 3 * t),
      e.lineTo(6.5 * t, -2.5 * t),
      e.moveTo(-6.5 * t, -2.5 * t),
      e.lineTo(6.5 * t, 3 * t),
      e.stroke(),
      (e.strokeStyle = "#78350f"),
      (e.lineWidth = 2.4 * t),
      e.stroke());
    const c = Math.sin(l * 14) * 2.5 * t,
      f = (17 + Math.cos(l * 18) * 3.5) * t;
    if (isSaveFire) {
      // Fogo AZUL: marca visual do ponto de Salve atual (sem texto no mapa)
      (e.save(),
        (e.shadowColor = "#38bdf8"),
        (e.shadowBlur = 16),
        (e.fillStyle = "#0ea5e9"),
        e.beginPath(),
        e.moveTo(-5.5 * t, 1 * t),
        e.quadraticCurveTo(-4 * t, -f * 0.5, c, -f),
        e.quadraticCurveTo(4 * t, -f * 0.5, 5.5 * t, 1 * t),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#38bdf8"),
        e.beginPath(),
        e.moveTo(-3.5 * t, 1 * t),
        e.quadraticCurveTo(-2.5 * t, -f * 0.45, c * 0.6, -f * 0.78),
        e.quadraticCurveTo(2.5 * t, -f * 0.45, 3.5 * t, 1 * t),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#e0f2fe"),
        e.beginPath(),
        e.moveTo(-2 * t, 1 * t),
        e.quadraticCurveTo(-1 * t, -f * 0.3, c * 0.3, -f * 0.45),
        e.quadraticCurveTo(1 * t, -f * 0.3, 2 * t, 1 * t),
        e.closePath(),
        e.fill(),
        e.restore());
      // Faíscas azuis REMOVIDAS a pedido do jogador: fogueira de save deve ficar limpa (apenas o fogo azul).
    } else {
    (e.save(),
      (e.shadowColor = "#ea580c"),
      (e.shadowBlur = 14),
      (e.fillStyle = "#ea580c"),
      e.beginPath(),
      e.moveTo(-5.5 * t, 1 * t),
      e.quadraticCurveTo(-4 * t, -f * 0.5, c, -f),
      e.quadraticCurveTo(4 * t, -f * 0.5, 5.5 * t, 1 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#f59e0b"),
      e.beginPath(),
      e.moveTo(-3.5 * t, 1 * t),
      e.quadraticCurveTo(-2.5 * t, -f * 0.45, c * 0.6, -f * 0.78),
      e.quadraticCurveTo(2.5 * t, -f * 0.45, 3.5 * t, 1 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#fef08a"),
      e.beginPath(),
      e.moveTo(-2 * t, 1 * t),
      e.quadraticCurveTo(-1 * t, -f * 0.3, c * 0.3, -f * 0.45),
      e.quadraticCurveTo(1 * t, -f * 0.3, 2 * t, 1 * t),
      e.closePath(),
      e.fill(),
      e.restore());
    const g = Math.min(12, Math.round(4 + (t - 1) * 2.2));
    for (let w = 0; w < g; w++) {
      const v = (l * 3 + w * 1.3) % 3,
        T = Math.sin(l * 5 + w * 2) * (4 + w * 1.5) * t,
        S = -8 * t - v * 10 * t,
        p = Math.max(0, 1 - v / 3);
      ((e.fillStyle = `rgba(254, 215, 170, ${p})`),
        e.fillRect(T, S, 1.4 * t, 1.4 * t));
    }
    // REMOVIDO a pedido do jogador: fumaca em circulos girando sobre a fogueira (arcos cinza orbitando).
    if (u && u.roasting) {
      const rt = u.roasting,
        w = Date.now() - rt.startTime,
        v = w >= rt.durationMs,
        T = Math.min(1, Math.max(0, w / rt.durationMs)),
        S = Math.max(0, Math.ceil((rt.durationMs - w) / 1e3));
      e.save();
      const p = -13 * t,
        j = 13 * t,
        P = 2 * t,
        A = -12 * t;
      ((e.strokeStyle = "#2e1205"),
        (e.lineWidth = 2.4 * t),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(p, P),
        e.lineTo(p, A),
        e.lineTo(p - 3 * t, A - 3 * t),
        e.moveTo(p, A),
        e.lineTo(p + 2.5 * t, A - 3 * t),
        e.stroke(),
        e.beginPath(),
        e.moveTo(j, P),
        e.lineTo(j, A),
        e.lineTo(j - 2.5 * t, A - 3 * t),
        e.moveTo(j, A),
        e.lineTo(j + 3 * t, A - 3 * t),
        e.stroke(),
        (e.strokeStyle = "#854d0e"),
        (e.lineWidth = 1.3 * t),
        e.beginPath(),
        e.moveTo(p, P),
        e.lineTo(p, A),
        e.moveTo(j, P),
        e.lineTo(j, A),
        e.stroke(),
        (e.strokeStyle = "#3e1c05"),
        (e.lineWidth = 2.2 * t),
        e.beginPath(),
        e.moveTo(-16 * t, A),
        e.lineTo(16 * t, A),
        e.stroke(),
        (e.strokeStyle = "#a16207"),
        (e.lineWidth = 1.2 * t),
        e.beginPath(),
        e.moveTo(-16 * t, A),
        e.lineTo(16 * t, A),
        e.stroke());
      const x = t * 0.95,
        M = rt.fishItem.color || "#38bdf8",
        $ = v ? "#d97706" : T > 0.6 ? "#ca8a04" : M;
      if (
        (e.save(),
        e.translate(0, A),
        (e.fillStyle = $),
        e.beginPath(),
        e.ellipse(0, 0, 7.5 * x, 3.8 * x, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = v ? "#78350f" : "#0f172a"),
        (e.lineWidth = 1 * x),
        e.stroke(),
        (e.fillStyle = v ? "#92400e" : $),
        e.beginPath(),
        e.moveTo(-7.5 * x, 0),
        e.lineTo(-11.5 * x, -3.2 * x),
        e.lineTo(-9.5 * x, 0),
        e.lineTo(-11.5 * x, 3.2 * x),
        e.closePath(),
        e.fill(),
        e.stroke(),
        (e.fillStyle = "#1e293b"),
        e.beginPath(),
        e.arc(5 * x, -1 * x, 0.8 * x, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = v ? "#78350f" : "#64748b"),
        e.beginPath(),
        e.moveTo(-1 * x, -3.8 * x),
        e.lineTo(2 * x, -6 * x),
        e.lineTo(3 * x, -3.6 * x),
        e.closePath(),
        e.fill(),
        (e.strokeStyle = v ? "#451a03" : "rgba(0,0,0,0.3)"),
        (e.lineWidth = 1.2 * x),
        e.beginPath(),
        e.moveTo(-3 * x, -2.5 * x),
        e.lineTo(-1.5 * x, 2.5 * x),
        e.moveTo(0, -2.5 * x),
        e.lineTo(1.5 * x, 2.5 * x),
        e.moveTo(3 * x, -2.5 * x),
        e.lineTo(4.5 * x, 2.5 * x),
        e.stroke(),
        v)
      ) {
        const K = (l * 2) % 1;
        ((e.fillStyle = "rgba(254, 240, 138, 0.6)"),
          e.beginPath(),
          e.arc(
            Math.sin(l * 3) * 2 * t,
            -5 * t - K * 6 * t,
            (1.5 + K * 2) * t,
            0,
            Math.PI * 2,
          ),
          e.fill());
      } else {
        const V = ((l * 4.5) % 1) * 9 * t;
        ((e.fillStyle = "#fef08a"), e.fillRect(-0.6 * t, V, 1.2 * t, 2 * t));
      }
      e.restore();
      const z = A - 11 * t;
      if (
        ((e.font = "bold 8px system-ui, sans-serif"),
        (e.textAlign = "center"),
        (e.textBaseline = "middle"),
        v)
      ) {
        const K = "🍢 PRONTO!",
          V = Math.sin(l * 6) * 0.15 + 0.85,
          O = 50 * t * V,
          _ = 14 * t;
        ((e.fillStyle = "rgba(22, 101, 52, 0.95)"),
          e.beginPath(),
          e.roundRect(-O / 2, z - _ / 2, O, _, 4 * t),
          e.fill(),
          (e.strokeStyle = "#4ade80"),
          (e.lineWidth = 1.2),
          e.stroke(),
          (e.fillStyle = "#ffffff"),
          e.fillText(K, 0, z));
      } else {
        const K = `⏳ ${S}s`,
          V = 40 * t,
          O = 13 * t;
        ((e.fillStyle = "rgba(15, 23, 42, 0.88)"),
          e.beginPath(),
          e.roundRect(-V / 2, z - O / 2, V, O, 4 * t),
          e.fill(),
          (e.strokeStyle = "#f59e0b"),
          (e.lineWidth = 1),
          e.stroke());
        const _ = (V - 4 * t) * T;
        ((e.fillStyle = "#f59e0b"),
          e.fillRect(-V / 2 + 2 * t, z + O / 2 - 2.5 * t, _, 1.8 * t),
          (e.fillStyle = "#fef08a"),
          e.fillText(K, 0, z - 1 * t));
      }
      e.restore();
    }
    }
    u && u.cookingPot && gG(e, t, l, o, u.cookingPot);
  }
  function gG(e, t, l, o = !0, u) {
    if (!u) return;
    const m = o ? 1 : 0.85,
      c = -2 * t * m,
      f = 6.2 * t * m,
      g = 4.2 * t * m,
      y = (u.potItem || {}).name || "",
      w = y.toLowerCase().includes("caldeirão") || y.toLowerCase().includes("caldeirao");
    e.save();
    e.translate(0, c);
    ((e.fillStyle = "rgba(0, 0, 0, 0.35)"),
      e.beginPath(),
      e.ellipse(0, g + 1.2 * t, f * 0.95, g * 0.42, 0, 0, Math.PI * 2),
      e.fill());
    if (w) {
      ((e.strokeStyle = "#1c1917"),
        (e.lineWidth = 1.6 * t),
        e.beginPath(),
        e.arc(0, -g * 0.2, f * 1.02, Math.PI * 1.12, Math.PI * 1.88),
        e.stroke());
    }
    ((e.fillStyle = w ? "#44403c" : "#57534e"),
      e.beginPath(),
      e.moveTo(-f, -g * 0.55),
      e.quadraticCurveTo(-f * 1.06, g * 0.9, -f * 0.62, g),
      e.lineTo(f * 0.62, g),
      e.quadraticCurveTo(f * 1.06, g * 0.9, f, -g * 0.55),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "rgba(255,255,255,0.12)"),
      e.beginPath(),
      e.ellipse(-f * 0.45, g * 0.15, f * 0.22, g * 0.55, 0.25, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = w ? "#292524" : "#44403c"),
      (e.lineWidth = 1.4 * t),
      e.beginPath(),
      e.moveTo(-f * 0.62, g),
      e.lineTo(f * 0.62, g),
      e.stroke(),
      (e.fillStyle = w ? "#292524" : "#3f3f46"),
      e.beginPath(),
      e.ellipse(0, -g * 0.55, f, g * 0.42, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = w ? "#1c1917" : "#27272a"),
      (e.lineWidth = 1.2 * t),
      e.stroke());
    const v = u.hasWater ? "#38bdf8" : "#d97706";
    ((e.fillStyle = u.hasWater ? "rgba(56, 189, 248, 0.85)" : "rgba(217, 119, 6, 0.9)"),
      e.beginPath(),
      e.ellipse(0, -g * 0.5, f * 0.78, g * 0.3, 0, 0, Math.PI * 2),
      e.fill());
    for (let T = 0; T < (u.ingredients || []).length; T++) {
      const S = u.ingredients[T],
        p = (S.name || "").toLowerCase(),
        j = p.includes("carne") || p.includes("meat") ? "#b91c1c" : p.includes("gosma") || p.includes("gelatina") ? "#4ade80" : v,
        P = Math.sin(T * 2.4) * f * 0.4,
        A = Math.cos(T * 1.7) * g * 0.12;
      ((e.fillStyle = j),
        e.beginPath(),
        e.ellipse(P, -g * 0.5 + A, 2.4 * t, 1.5 * t, 0, 0, Math.PI * 2),
        e.fill());
    }
    if (o) {
      const K = Date.now() - u.startTime,
        V = K >= 45e3,
        O = Math.min(1, Math.max(0, K / 45e3)),
        _ = Math.max(0, Math.ceil((45e3 - K) / 1e3));
      for (let ue = 0; ue < 4; ue++) {
        const se = ((l * (V ? 0.55 : 0.9) + ue * 0.25) % 1) * 26 * t,
          Ce = Math.sin(l * 2 + ue * 1.6) * 3.5 * t,
          na = (1.6 + se / 9) * t,
          ia = Math.max(0, 0.3 - (se / (26 * t)) * 0.3);
        ((e.fillStyle = `rgba(226, 232, 240, ${ia})`),
          e.beginPath(),
          e.arc(Ce, -g * 0.7 - se, na, 0, Math.PI * 2),
          e.fill());
      }
      e.font = `bold ${Math.max(7, 8 * t)}px system-ui, sans-serif`;
      ((e.textAlign = "center"), (e.textBaseline = "middle"));
      const Je = -g * 0.55 - 34 * t;
      if (V) {
        const he = "🍲 PRONTO! [R]",
          $e = Math.sin(l * 6) * 0.15 + 0.85,
          da = 78 * t * $e,
          ka = 14 * t;
        ((e.fillStyle = "rgba(22, 101, 52, 0.95)"),
          e.beginPath(),
          e.roundRect(-da / 2, Je - ka / 2, da, ka, 4 * t),
          e.fill(),
          (e.strokeStyle = "#4ade80"),
          (e.lineWidth = 1.2),
          e.stroke(),
          (e.fillStyle = "#ffffff"),
          e.fillText(he, 0, Je));
      } else {
        const he = `⏳ ${_}s`,
          $e = 44 * t,
          da = 13 * t;
        ((e.fillStyle = "rgba(15, 23, 42, 0.88)"),
          e.beginPath(),
          e.roundRect(-$e / 2, Je - da / 2, $e, da, 4 * t),
          e.fill(),
          (e.strokeStyle = "#f59e0b"),
          (e.lineWidth = 1),
          e.stroke());
        const ka = ($e - 4 * t) * O;
        ((e.fillStyle = "#f59e0b"),
          e.fillRect(-$e / 2 + 2 * t, Je + da / 2 - 2.5 * t, ka, 1.8 * t),
          (e.fillStyle = "#fef08a"),
          e.fillText(he, 0, Je - 1 * t));
      }
    }
    e.restore();
  }
  function pg(e, t, l = !1, o = 0) {
    if (
      ((e.fillStyle = "#451a03"),
      e.beginPath(),
      e.roundRect(-9.5 * t, -8.5 * t, 19 * t, 13 * t, 2 * t),
      e.fill(),
      (e.fillStyle = "#78350f"),
      e.fillRect(-9 * t, -8 * t, 18 * t, 12 * t),
      (e.strokeStyle = "#2e1205"),
      (e.lineWidth = 1 * t),
      e.beginPath(),
      e.moveTo(-9 * t, -4 * t),
      e.lineTo(9 * t, -4 * t),
      e.stroke(),
      (e.fillStyle = "#1e293b"),
      e.fillRect(-8 * t, -8 * t, 3 * t, 12 * t),
      e.fillRect(5 * t, -8 * t, 3 * t, 12 * t),
      (e.fillStyle = "#94a3b8"),
      e.fillRect(-7 * t, -7 * t, 1.2 * t, 1.2 * t),
      e.fillRect(-7 * t, -1 * t, 1.2 * t, 1.2 * t),
      e.fillRect(6 * t, -7 * t, 1.2 * t, 1.2 * t),
      e.fillRect(6 * t, -1 * t, 1.2 * t, 1.2 * t),
      l)
    ) {
      ((e.fillStyle = "#451a03"),
        e.beginPath(),
        e.moveTo(-10 * t, -8 * t),
        e.lineTo(-8 * t, -19 * t),
        e.lineTo(8 * t, -19 * t),
        e.lineTo(10 * t, -8 * t),
        e.closePath(),
        e.fill());
      const u = Math.sin(o * 4) * 0.15 + 0.85;
      ((e.fillStyle = `rgba(251, 191, 36, ${0.8 * u})`),
        e.beginPath(),
        e.ellipse(0, -6 * t, 6 * t, 3 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#ffffff"),
        e.beginPath(),
        e.arc(-2 * t, -7 * t, 1.2 * t, 0, Math.PI * 2),
        e.arc(3 * t, -6 * t, 1.4 * t, 0, Math.PI * 2),
        e.fill());
    } else
      ((e.fillStyle = "#451a03"),
        e.beginPath(),
        e.roundRect(-10 * t, -15 * t, 20 * t, 8 * t, [4 * t, 4 * t, 0, 0]),
        e.fill(),
        (e.fillStyle = "#92400e"),
        e.beginPath(),
        e.roundRect(-9.5 * t, -14.5 * t, 19 * t, 7 * t, [3 * t, 3 * t, 0, 0]),
        e.fill(),
        (e.fillStyle = "#1e293b"),
        e.fillRect(-8 * t, -14.5 * t, 3 * t, 7 * t),
        e.fillRect(5 * t, -14.5 * t, 3 * t, 7 * t),
        (e.fillStyle = "#f59e0b"),
        e.beginPath(),
        e.roundRect(-2.5 * t, -9.5 * t, 5 * t, 5.5 * t, 1.5 * t),
        e.fill(),
        (e.fillStyle = "#1c1917"),
        e.beginPath(),
        e.arc(0, -7.5 * t, 1 * t, 0, Math.PI * 2),
        e.rect(-0.6 * t, -7.5 * t, 1.2 * t, 2 * t),
        e.fill());
  }
  function gg(e, t, l) {
    // Coluna Dórica Grega de Mármore Branco com caneluras verticais, capitel e hera
    e.save();
    // Base / Estilóbata de mármore em 2 degraus
    e.fillStyle = "#94a3b8";
    e.fillRect(-10.5 * t, -1.5 * t, 21 * t, 4.5 * t);
    e.fillStyle = "#e2e8f0";
    e.fillRect(-9.5 * t, -4 * t, 19 * t, 3 * t);
    e.strokeStyle = "#64748b";
    e.lineWidth = 0.9 * t;
    e.strokeRect(-9.5 * t, -4 * t, 19 * t, 3 * t);

    // Fuste da coluna (inteira quando l !== 1, ou semi-quebrada em ruína quando l === 1)
    const colH = l === 1 ? 18 * t : 26 * t;
    const topY = -4 * t - colH;
    const fusteGrad = e.createLinearGradient(-7.5 * t, 0, 7.5 * t, 0);
    fusteGrad.addColorStop(0, "#cbd5e1");
    fusteGrad.addColorStop(0.35, "#f8fafc");
    fusteGrad.addColorStop(0.75, "#e2e8f0");
    fusteGrad.addColorStop(1, "#94a3b8");
    e.fillStyle = fusteGrad;
    e.fillRect(-7.2 * t, topY, 14.4 * t, colH);

    // Caneluras clássicas gregas (sulcos verticais)
    e.strokeStyle = "rgba(100, 116, 139, 0.55)";
    e.lineWidth = 1.1 * t;
    for (const fx of [-4.5, -1.5, 1.5, 4.5]) {
      e.beginPath();
      e.moveTo(fx * t, topY + 2 * t);
      e.lineTo(fx * t, -4 * t);
      e.stroke();
    }

    if (l !== 1) {
      // Capitel Dórico (Equino + Ábaco com friso dourado helênico)
      e.fillStyle = "#e2e8f0";
      e.beginPath();
      e.moveTo(-7.5 * t, topY);
      e.lineTo(-10 * t, topY - 3 * t);
      e.lineTo(10 * t, topY - 3 * t);
      e.lineTo(7.5 * t, topY);
      e.closePath();
      e.fill();

      e.fillStyle = "#f8fafc";
      e.fillRect(-10.5 * t, topY - 6.5 * t, 21 * t, 3.8 * t);
      e.strokeStyle = "#d97706";
      e.lineWidth = 1.1 * t;
      e.strokeRect(-9.5 * t, topY - 5.5 * t, 19 * t, 1.8 * t);
    } else {
      // Topo fraturado em diagonal de coluna grega arruinada
      e.fillStyle = "#cbd5e1";
      e.beginPath();
      e.moveTo(-7.2 * t, topY);
      e.lineTo(-3 * t, topY - 3.5 * t);
      e.lineTo(2 * t, topY - 1 * t);
      e.lineTo(7.2 * t, topY - 4 * t);
      e.lineTo(7.2 * t, topY);
      e.closePath();
      e.fill();
    }

    // Hera mediterrânea subindo pela coluna
    e.fillStyle = "#15803d";
    e.beginPath();
    e.arc(-5.5 * t, -10 * t, 2.6 * t, 0, Math.PI * 2);
    e.arc(-4 * t, -14 * t, 2.2 * t, 0, Math.PI * 2);
    e.arc(-2.5 * t, -17.5 * t, 1.8 * t, 0, Math.PI * 2);
    e.fill();
    e.restore();
  }
  function drawGreekRuinWall25D(e, t, subType = 0, neighbors = null, wallHeightState = 0) {
    e.save();
    const nL = !!(neighbors && neighbors.left),
      nR = !!(neighbors && neighbors.right),
      nT = !!(neighbors && neighbors.top),
      nB = !!(neighbors && neighbors.bottom),
      half = 18 * t,
      leftX = nL ? -half - 1 * t : -half + 1 * t,
      rightX = nR ? half + 1 * t : half - 1 * t,
      w = rightX - leftX,
      // Altura variável: 0 = completa (26*t), 1 = topo irregular quebrado (22*t), 2 = meia parede (14*t), 3 = base baixa inacabada/ruína (7*t)
      wallH =
        wallHeightState === 3
          ? 7.5 * t
          : wallHeightState === 2
            ? 14.5 * t
            : wallHeightState === 1
              ? 22 * t
              : 26 * t,
      baseY = 18 * t,
      topFrontY = baseY - wallH,
      topBackY = -half - wallH;

    // Sombra forte projetada no piso ao redor da base da parede para destacar o volume 3D
    if (!nB) {
      e.fillStyle = "rgba(2, 6, 23, 0.58)";
      e.fillRect(leftX - 1 * t, baseY - 2 * t, w + 2 * t, (wallHeightState >= 2 ? 6 : 9.5) * t);
    }

    // Face Frontal 2.5D de blocos de Mármore Branco Pario (bem clara, contrastando com o piso terracota/ocre escuro)
    const frontGrad = e.createLinearGradient(0, topFrontY, 0, baseY);
    frontGrad.addColorStop(0, "#ffffff");
    frontGrad.addColorStop(0.55, "#f1f5f9");
    frontGrad.addColorStop(1, "#cbd5e1");
    e.fillStyle = frontGrad;

    if (wallHeightState === 0) {
      // Parede de topo completo
      e.fillRect(leftX, topFrontY, w, wallH);
    } else {
      // Topo irregular com blocos em degraus quebrados / incompletos!
      e.beginPath();
      e.moveTo(leftX, baseY);
      e.lineTo(leftX, topFrontY + (subType === 1 ? 4 * t : 1 * t));
      e.lineTo(leftX + w * 0.28, topFrontY + (subType === 1 ? 4 * t : 1 * t));
      e.lineTo(leftX + w * 0.32, topFrontY - (subType === 2 ? 2.5 * t : -3.5 * t));
      e.lineTo(leftX + w * 0.68, topFrontY - (subType === 2 ? 2.5 * t : -3.5 * t));
      e.lineTo(leftX + w * 0.72, topFrontY + (subType === 0 ? 3.5 * t : 0));
      e.lineTo(rightX, topFrontY + (subType === 0 ? 3.5 * t : 0));
      e.lineTo(rightX, baseY);
      e.closePath();
      e.fill();
    }

    // Rodapé (Ortostato) escuro na base da parede onde ela toca o piso (separa 100% a parede do chão!)
    e.fillStyle = "#1e293b";
    e.fillRect(leftX, baseY - 3.8 * t, w, 3.8 * t);
    e.fillStyle = "#d97706";
    e.fillRect(leftX, baseY - 4.8 * t, w, 1.1 * t);

    // Juntas dos blocos de cantaria de mármore (isódomo grego)
    e.strokeStyle = "rgba(51, 65, 85, 0.65)";
    e.lineWidth = 1.2 * t;
    e.beginPath();
    if (wallHeightState <= 1) {
      e.moveTo(leftX, topFrontY + 8.5 * t);
      e.lineTo(rightX, topFrontY + 8.5 * t);
      e.moveTo(0, topFrontY + 8.5 * t);
      e.lineTo(0, topFrontY + 17 * t);
    }
    if (wallHeightState <= 2) {
      e.moveTo(leftX, baseY - 8.5 * t);
      e.lineTo(rightX, baseY - 8.5 * t);
      e.moveTo(-6 * t, baseY - 8.5 * t);
      e.lineTo(-6 * t, baseY - 4 * t);
    }
    e.stroke();

    // Friso Grego Dourado/Azul-Olímpico (Meandro Helênico) na faixa superior da parede
    if (wallHeightState === 0 || (wallHeightState === 1 && subType !== 1)) {
      const friezeW = wallHeightState === 1 ? w * 0.62 : w;
      const friezeX = wallHeightState === 1 ? leftX + w * 0.18 : leftX;
      e.fillStyle = "#0369a1";
      e.fillRect(friezeX, topFrontY + 2 * t, friezeW, 4.4 * t);
      e.strokeStyle = "#fbbf24";
      e.lineWidth = 1.2 * t;
      e.beginPath();
      e.moveTo(friezeX, topFrontY + 2 * t);
      e.lineTo(friezeX + friezeW, topFrontY + 2 * t);
      e.moveTo(friezeX, topFrontY + 6.4 * t);
      e.lineTo(friezeX + friezeW, topFrontY + 6.4 * t);
      e.stroke();
    }

    // Topo da Parede 2.5D: Cornija Superior em Ardósia Azul-Escura / Cinza-Chumbo com borda de Mármore e Ouro
    // (dá leitura imediata de onde está o topo da parede visto de cima!)
    const topDepth = topFrontY - topBackY;
    if (wallHeightState === 0) {
      e.fillStyle = "#334155";
      e.fillRect(leftX, topBackY, w, topDepth + 1.5 * t);
      e.strokeStyle = "#f8fafc";
      e.lineWidth = 1.6 * t;
      e.strokeRect(leftX + 0.8 * t, topBackY + 0.8 * t, w - 1.6 * t, topDepth - 0.5 * t);
      e.strokeStyle = "#fbbf24";
      e.lineWidth = 0.9 * t;
      e.strokeRect(leftX + 2.5 * t, topBackY + 2.5 * t, w - 5 * t, topDepth - 4 * t);
    } else {
      // Blocos superiores irregulares mostrando o miolo escuro da alvenaria grega (emplekton) e blocos de mármore lascados
      e.fillStyle = "#1e293b";
      e.fillRect(leftX + 1 * t, topBackY + 2.5 * t, w - 2 * t, topDepth - 2 * t);
      e.fillStyle = "#e2e8f0";
      e.fillRect(leftX + 1.5 * t, topBackY + 3.5 * t, w * 0.4, topDepth - 4 * t);
      e.fillStyle = "#ffffff";
      e.fillRect(leftX + w * 0.42, topBackY + (subType === 2 ? 0.5 * t : 5 * t), w * 0.46, topDepth - 4 * t);
      e.strokeStyle = "#0f172a";
      e.lineWidth = 1.3 * t;
      e.strokeRect(leftX + 1 * t, topBackY + 2.5 * t, w - 2 * t, topDepth - 2 * t);
      // Pedras soltas no topo quebrado
      e.fillStyle = "#94a3b8";
      e.beginPath();
      e.arc(leftX + w * 0.22, topFrontY - 4 * t, 2.8 * t, 0, Math.PI * 2);
      e.arc(leftX + w * 0.78, topFrontY - 2.5 * t, 2.4 * t, 0, Math.PI * 2);
      e.fill();
    }

    // Hera e rachaduras de ruína
    if (subType === 1 || wallHeightState === 2) {
      e.fillStyle = "#15803d";
      e.beginPath();
      e.arc(-5 * t, baseY - 6 * t, 3 * t, 0, Math.PI * 2);
      e.arc(-2 * t, baseY - 9 * t, 2.3 * t, 0, Math.PI * 2);
      e.fill();
    } else if (subType === 2 || wallHeightState === 1) {
      e.strokeStyle = "rgba(71, 85, 105, 0.75)";
      e.lineWidth = 1.2 * t;
      e.beginPath();
      e.moveTo(-3 * t, topFrontY + 4 * t);
      e.lineTo(0, topFrontY + 10 * t);
      e.lineTo(-2 * t, baseY - 2 * t);
      e.stroke();
    }

    if (!nL) {
      e.fillStyle = "#94a3b8";
      e.fillRect(leftX, topBackY + (wallHeightState > 0 ? 3 * t : 0), 2 * t, baseY - topBackY);
    }
    if (!nR) {
      e.fillStyle = "#94a3b8";
      e.fillRect(rightX - 2 * t, topBackY + (wallHeightState > 0 ? 3 * t : 0), 2 * t, baseY - topBackY);
    }
    e.restore();
  }

  function drawGreekStatue(e, t, subType = 0, animTimer = 0) {
    e.save();
    // Pedestal escalonado de mármore com friso dourado
    e.fillStyle = "#94a3b8";
    e.fillRect(-11 * t, -1 * t, 22 * t, 5 * t);
    e.fillStyle = "#e2e8f0";
    e.fillRect(-9.5 * t, -7 * t, 19 * t, 6.5 * t);
    e.strokeStyle = "#d97706";
    e.lineWidth = 1 * t;
    e.strokeRect(-8.5 * t, -6 * t, 17 * t, 4.5 * t);

    if (subType === 0) {
      // Estátua Monumental de Atena Parthenos (com elmo coríntio, lança dourada e escudo Égide)
      e.fillStyle = "#f8fafc";
      // Peplos / Túnica drapeada
      e.beginPath();
      e.moveTo(-5.5 * t, -7 * t);
      e.lineTo(-4.5 * t, -25 * t);
      e.lineTo(4.5 * t, -25 * t);
      e.lineTo(5.5 * t, -7 * t);
      e.closePath();
      e.fill();
      e.strokeStyle = "#94a3b8";
      e.lineWidth = 0.9 * t;
      e.stroke();
      // Cabeça + Elmo com crista dourada
      e.fillStyle = "#f1f5f9";
      e.beginPath();
      e.arc(0, -28 * t, 3.6 * t, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = "#fbbf24";
      e.beginPath();
      e.arc(0, -30 * t, 3.8 * t, Math.PI, 0);
      e.fill();
      e.fillRect(-1.2 * t, -34 * t, 2.4 * t, 4 * t);
      // Escudo redondo grego (Hoplon) ao lado
      e.fillStyle = "#d97706";
      e.beginPath();
      e.ellipse(-6.5 * t, -15 * t, 3.5 * t, 6.5 * t, -0.1, 0, Math.PI * 2);
      e.fill();
      e.strokeStyle = "#fef08a";
      e.lineWidth = 1.1 * t;
      e.stroke();
      // Lança Dourada
      e.strokeStyle = "#b45309";
      e.lineWidth = 1.5 * t;
      e.beginPath();
      e.moveTo(6.5 * t, -7 * t);
      e.lineTo(6.5 * t, -35 * t);
      e.stroke();
      const glow = (Math.sin(animTimer * 3) + 1) * 0.5;
      e.fillStyle = `rgba(254, 240, 138, ${0.65 + glow * 0.35})`;
      e.beginPath();
      e.moveTo(6.5 * t, -39 * t);
      e.lineTo(4.5 * t, -34 * t);
      e.lineTo(8.5 * t, -34 * t);
      e.closePath();
      e.fill();
    } else if (subType === 1) {
      // Estátua de Filósofo / Orador com Himation (manto) e pergaminho
      e.fillStyle = "#f1f5f9";
      e.fillRect(-4.8 * t, -23 * t, 9.6 * t, 16 * t);
      // Dobra diagonal do manto grego
      e.strokeStyle = "#0284c7";
      e.lineWidth = 1.6 * t;
      e.beginPath();
      e.moveTo(-4.5 * t, -22 * t);
      e.lineTo(4.5 * t, -12 * t);
      e.stroke();
      // Cabeça barbada clássica
      e.fillStyle = "#f8fafc";
      e.beginPath();
      e.arc(0, -26.5 * t, 3.5 * t, 0, Math.PI * 2);
      e.fill();
      // Rolo de pergaminho na mão
      e.fillStyle = "#fef3c7";
      e.fillRect(3.5 * t, -19 * t, 3.5 * t, 2.2 * t);
    } else {
      // Estátua em Ruínas / Torso Esculpido Inacabado (sem um braço, estilo arqueológico)
      e.fillStyle = "#e2e8f0";
      e.beginPath();
      e.moveTo(-5 * t, -7 * t);
      e.lineTo(-4 * t, -19 * t);
      e.lineTo(1 * t, -21 * t);
      e.lineTo(4.5 * t, -17 * t);
      e.lineTo(4.5 * t, -7 * t);
      e.closePath();
      e.fill();
      // Fragmento da cabeça/busto caído na base do pedestal
      e.fillStyle = "#cbd5e1";
      e.beginPath();
      e.arc(7.5 * t, 1 * t, 3.2 * t, 0, Math.PI * 2);
      e.fill();
    }
    e.restore();
  }

  function drawGreekVaseCluster(e, t, subType = 0) {
    e.save();
    // Sombra
    e.fillStyle = "rgba(15, 23, 42, 0.3)";
    e.beginPath();
    e.ellipse(0, 3 * t, 11 * t, 5 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Ânfora Grega Principal de Terracota (Figuras Negras)
    e.fillStyle = "#c2410c";
    e.beginPath();
    e.ellipse(-2 * t, -4 * t, 5.5 * t, 7.5 * t, 0, 0, Math.PI * 2);
    e.fill();
    // Faixa preta helênica no bojo do vaso
    e.fillStyle = "#1c1917";
    e.fillRect(-7 * t, -6 * t, 10 * t, 3.5 * t);
    e.strokeStyle = "#f59e0b";
    e.lineWidth = 0.9 * t;
    e.beginPath();
    e.moveTo(-7 * t, -4.2 * t);
    e.lineTo(3 * t, -4.2 * t);
    e.stroke();
    // Gargalo e 2 alças curvas da ânfora
    e.fillStyle = "#ea580c";
    e.fillRect(-4 * t, -14 * t, 4 * t, 4 * t);
    e.strokeStyle = "#9a3412";
    e.lineWidth = 1.4 * t;
    e.beginPath();
    e.arc(-5 * t, -10.5 * t, 2.5 * t, Math.PI * 0.5, Math.PI * 1.5);
    e.arc(1 * t, -10.5 * t, 2.5 * t, -Math.PI * 0.5, Math.PI * 0.5);
    e.stroke();

    // Segundo vaso ao lado (Krater larga ou ânfora tombada/quebrada)
    if (subType === 1) {
      // Krater de misturar vinho nos banquetes
      e.fillStyle = "#9a3412";
      e.beginPath();
      e.ellipse(6 * t, -2 * t, 5 * t, 4.5 * t, 0, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = "#1c1917";
      e.beginPath();
      e.ellipse(6 * t, -5.5 * t, 5.5 * t, 1.8 * t, 0, 0, Math.PI * 2);
      e.fill();
    } else {
      // Jarro menor / cacos de cerâmica no chão
      e.fillStyle = "#ea580c";
      e.beginPath();
      e.ellipse(5.5 * t, 0 * t, 4.2 * t, 3 * t, 0.35, 0, Math.PI * 2);
      e.fill();
    }
    e.restore();
  }

  function drawGreekFurniture(e, t, subType = 0) {
    e.save();
    if (subType === 0) {
      // Kline: Divã / Cama grega de banquete e repouso com tecido azul/púrpura e almofadas douradas
      e.fillStyle = "#78350f";
      e.fillRect(-12 * t, -2 * t, 24 * t, 3.5 * t);
      e.fillRect(-11 * t, 1.5 * t, 2.5 * t, 5 * t);
      e.fillRect(8.5 * t, 1.5 * t, 2.5 * t, 5 * t);
      // Colchão e manto helênico
      e.fillStyle = "#f8fafc";
      e.fillRect(-11.5 * t, -6.5 * t, 23 * t, 4.8 * t);
      e.fillStyle = "#0284c7";
      e.fillRect(-8 * t, -6.5 * t, 16 * t, 3.5 * t);
      // Cabeceira curva com almofada real
      e.fillStyle = "#fbbf24";
      e.beginPath();
      e.ellipse(-8.5 * t, -8 * t, 3.8 * t, 2.4 * t, -0.2, 0, Math.PI * 2);
      e.fill();
    } else if (subType === 1) {
      // Trapeza: Mesa grega de madeira e bronze posta com taças Kylix e oferendas
      e.fillStyle = "#92400e";
      e.fillRect(-10 * t, -5 * t, 20 * t, 3 * t);
      e.fillStyle = "#451a03";
      e.fillRect(-8.5 * t, -2 * t, 2.2 * t, 6.5 * t);
      e.fillRect(6.3 * t, -2 * t, 2.2 * t, 6.5 * t);
      // Taça Kylix dourada e prato de frutas sobre a mesa
      e.fillStyle = "#fbbf24";
      e.beginPath();
      e.arc(-4 * t, -6.8 * t, 2.2 * t, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = "#dc2626";
      e.beginPath();
      e.arc(3.5 * t, -6.5 * t, 2.4 * t, 0, Math.PI * 2);
      e.fill();
    } else if (subType === 3) {
      // Bema: Tribuna oratória de mármore esculpido no Bouleuterion
      e.fillStyle = "#cbd5e1";
      e.fillRect(-11 * t, -2 * t, 22 * t, 6 * t);
      e.fillStyle = "#f8fafc";
      e.fillRect(-8 * t, -13 * t, 16 * t, 11 * t);
      e.strokeStyle = "#d97706";
      e.lineWidth = 1.1 * t;
      e.strokeRect(-7 * t, -12 * t, 14 * t, 9 * t);
    } else {
      // Bancada de Mármore do Bouleuterion / Assento Klismos
      e.fillStyle = "#94a3b8";
      e.fillRect(-12 * t, 0 * t, 24 * t, 4.5 * t);
      e.fillStyle = "#f1f5f9";
      e.fillRect(-13 * t, -4.5 * t, 26 * t, 5 * t);
      e.strokeStyle = "#64748b";
      e.lineWidth = 1 * t;
      e.strokeRect(-13 * t, -4.5 * t, 26 * t, 5 * t);
    }
    e.restore();
  }

  function drawGreekDoor(e, t, isVertical = !1, isOpen = !1) {
    e.save();
    if (isVertical) {
      // =======================================================================
      // PORTA EM PAREDE ESQUERDA / DIREITA (Parede Vertical Norte-Sul):
      // Alinhada na vertical conectando a parede de cima (y = -18*t) com a
      // parede de baixo (y = +18*t), com passagem Leste-Oeste!
      // =======================================================================
      const half = 18 * t,
        wallH = 26 * t,
        baseY = 18 * t,
        topBackY = -half - wallH;

      // 1. Soleira de mármore no piso (orientada Norte-Sul sob o vão da parede vertical)
      e.fillStyle = "#cbd5e1";
      e.fillRect(-10 * t, -18 * t, 20 * t, 36 * t);
      e.strokeStyle = "#64748b";
      e.lineWidth = 1 * t;
      e.strokeRect(-10 * t, -18 * t, 20 * t, 36 * t);

      // 2. Pilar / Batente Norte de Mármore (conecta com a parede de cima em y = -18*t)
      e.fillStyle = "#e2e8f0";
      e.fillRect(-7 * t, -18 * t - wallH, 14 * t, 9 * t + wallH);
      e.fillStyle = "#334155";
      e.fillRect(-7 * t, topBackY, 14 * t, 9 * t);
      e.strokeStyle = "#f8fafc";
      e.lineWidth = 1.2 * t;
      e.strokeRect(-6.5 * t, topBackY + 0.5 * t, 13 * t, 8 * t);

      if (!isOpen) {
        // 3. Folhas da Porta de Cedro e Bronze FECHADAS na vertical (bloqueando a passagem Leste-Oeste)
        // Face lateral/frontal da porta vertical
        e.fillStyle = "#78350f";
        e.fillRect(-4.5 * t, -9 * t - wallH, 9 * t, 20 * t + wallH);
        // Topo da folha da porta de madeira e bronze visto de cima
        e.fillStyle = "#451a03";
        e.fillRect(-4.5 * t, -9 * t - wallH, 9 * t, 20 * t);
        // Travessas e cravos de bronze helênico ao longo da porta vertical
        e.fillStyle = "#d97706";
        e.fillRect(-5 * t, -4 * t - wallH * 0.65, 10 * t, 2.2 * t);
        e.fillRect(-5 * t, 4 * t - wallH * 0.65, 10 * t, 2.2 * t);
        e.fillRect(-5 * t, -2 * t - wallH * 0.25, 10 * t, 2.2 * t);
        e.fillRect(-5 * t, 6 * t - wallH * 0.25, 10 * t, 2.2 * t);
        // Argolas de bronze no centro
        e.beginPath();
        e.arc(0, -wallH * 0.45, 1.8 * t, 0, Math.PI * 2);
        e.arc(0, 3.5 * t - wallH * 0.45, 1.8 * t, 0, Math.PI * 2);
        e.fill();
      } else {
        // 3. Folhas da Porta ABERTAS (rebatidas para o lado Leste/Oeste, liberando a passagem no centro!)
        e.fillStyle = "#78350f";
        // Folha norte aberta para o lado
        e.fillRect(4 * t, -11 * t - wallH * 0.85, 10 * t, 3.5 * t + wallH * 0.75);
        // Folha sul aberta para o lado
        e.fillRect(4 * t, 7.5 * t - wallH * 0.85, 10 * t, 3.5 * t + wallH * 0.75);
        e.fillStyle = "#d97706";
        e.fillRect(4 * t, -11 * t - wallH * 0.85, 10 * t, 1.5 * t);
        e.fillRect(4 * t, 7.5 * t - wallH * 0.85, 10 * t, 1.5 * t);
      }

      // 4. Pilar / Batente Sul de Mármore (conecta com a parede de baixo em y = +18*t)
      e.fillStyle = "#f1f5f9";
      e.fillRect(-7 * t, 9 * t - wallH, 14 * t, 9 * t + wallH);
      e.fillStyle = "#1e293b";
      e.fillRect(-7 * t, baseY - 3.5 * t, 14 * t, 3.5 * t);
      e.fillStyle = "#334155";
      e.fillRect(-7 * t, 9 * t - wallH, 14 * t, 9 * t);
      e.strokeStyle = "#f8fafc";
      e.lineWidth = 1.2 * t;
      e.strokeRect(-6.5 * t, 9.5 * t - wallH, 13 * t, 8 * t);

      // 5. Lintel / Arquitrave Superior orientado na VERTICAL (Norte-Sul) ligando os dois batentes por cima!
      e.fillStyle = "#334155";
      e.fillRect(-8 * t, topBackY - 3 * t, 16 * t, 36 * t);
      e.strokeStyle = "#f8fafc";
      e.lineWidth = 1.4 * t;
      e.strokeRect(-7 * t, topBackY - 2 * t, 14 * t, 34 * t);
      e.strokeStyle = "#d97706";
      e.lineWidth = 1 * t;
      e.strokeRect(-5 * t, topBackY, 10 * t, 30 * t);

      e.restore();
      return;
    }

    // =========================================================================
    // PORTA EM PAREDE DE CIMA / BAIXO (Parede Horizontal Leste-Oeste):
    // =========================================================================
    // Soleira de mármore no chão
    e.fillStyle = "#cbd5e1";
    e.fillRect(-16 * t, -6 * t, 32 * t, 14 * t);
    e.strokeStyle = "#64748b";
    e.lineWidth = 1 * t;
    e.strokeRect(-16 * t, -6 * t, 32 * t, 14 * t);

    // Batentes laterais (ombreiras de mármore dórico)
    e.fillStyle = "#e2e8f0";
    e.fillRect(-16 * t, -26 * t, 4.5 * t, 30 * t);
    e.fillRect(11.5 * t, -26 * t, 4.5 * t, 30 * t);
    // Lintel / Arquitrave superior com friso dourado
    e.fillStyle = "#f8fafc";
    e.fillRect(-17.5 * t, -30 * t, 35 * t, 5 * t);
    e.strokeStyle = "#d97706";
    e.lineWidth = 1.1 * t;
    e.strokeRect(-16.5 * t, -29 * t, 33 * t, 3 * t);

    if (!isOpen) {
      // Folhas duplas de cedro e bronze fechadas
      e.fillStyle = "#78350f";
      e.fillRect(-11.5 * t, -25 * t, 11.2 * t, 27 * t);
      e.fillRect(0.3 * t, -25 * t, 11.2 * t, 27 * t);
      // Faixas e argolas de bronze helênico
      e.fillStyle = "#d97706";
      e.fillRect(-11 * t, -20 * t, 22 * t, 2 * t);
      e.fillRect(-11 * t, -8 * t, 22 * t, 2 * t);
      e.beginPath();
      e.arc(-2.5 * t, -14 * t, 1.8 * t, 0, Math.PI * 2);
      e.arc(2.5 * t, -14 * t, 1.8 * t, 0, Math.PI * 2);
      e.fill();
    } else {
      // Folhas da porta abertas em escorço nas laterais permitindo passagem livre
      e.fillStyle = "#78350f";
      e.fillRect(-11.5 * t, -25 * t, 3.5 * t, 25 * t);
      e.fillRect(8 * t, -25 * t, 3.5 * t, 25 * t);
    }
    e.restore();
  }

  function drawGreekUnfinishedWork(e, t, subType = 0) {
    e.save();
    if (subType === 0) {
      // Andaime de Madeira e Guindaste Grego (Polyspastos) erguendo um bloco de mármore
      e.strokeStyle = "#78350f";
      e.lineWidth = 2.6 * t;
      e.beginPath();
      e.moveTo(-11 * t, 4 * t);
      e.lineTo(-3 * t, -28 * t);
      e.lineTo(11 * t, 4 * t);
      e.moveTo(-9 * t, -10 * t);
      e.lineTo(7 * t, -10 * t);
      e.stroke();
      // Corda do guindaste
      e.strokeStyle = "#d97706";
      e.lineWidth = 1.3 * t;
      e.beginPath();
      e.moveTo(-2 * t, -27 * t);
      e.lineTo(-2 * t, -12 * t);
      e.stroke();
      // Bloco de mármore suspenso pela metade
      e.fillStyle = "#f1f5f9";
      e.fillRect(-8 * t, -12 * t, 12 * t, 8 * t);
      e.strokeStyle = "#64748b";
      e.lineWidth = 1 * t;
      e.strokeRect(-8 * t, -12 * t, 12 * t, 8 * t);
    } else {
      // Blocos de mármore bruto recém-cortados e tambor de coluna inacabado no chão
      e.fillStyle = "#e2e8f0";
      e.fillRect(-11 * t, -6 * t, 13 * t, 9 * t);
      e.strokeStyle = "#64748b";
      e.lineWidth = 1 * t;
      e.strokeRect(-11 * t, -6 * t, 13 * t, 9 * t);
      // Tambor cilíndrico de coluna dórica ainda sem montar
      e.fillStyle = "#cbd5e1";
      e.beginPath();
      e.ellipse(7 * t, 0 * t, 5.5 * t, 3.5 * t, 0, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = "#f8fafc";
      e.beginPath();
      e.ellipse(7 * t, -4 * t, 5.5 * t, 3.5 * t, 0, 0, Math.PI * 2);
      e.fill();
      e.stroke();
    }
    e.restore();
  }

  function drawGreekCorridorTorch(e, t = 1, isLit = !1, animTimer = 0) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // 1. Sombra no piso do corredor
    e.fillStyle = "rgba(2, 6, 23, 0.36)";
    e.beginPath();
    e.ellipse(0, 3 * t, 6.5 * t, 3 * t, 0, 0, Math.PI * 2);
    e.fill();

    // 2. Pedestal de Mármore Helênico e Coluna de Bronze do Tocheiro
    e.fillStyle = "#cbd5e1";
    e.fillRect(-5 * t, 0, 10 * t, 3.2 * t);
    e.fillStyle = "#f8fafc";
    e.fillRect(-3.8 * t, -3.5 * t, 7.6 * t, 3.8 * t);
    e.strokeStyle = "#64748b";
    e.lineWidth = 0.8 * t;
    e.strokeRect(-3.8 * t, -3.5 * t, 7.6 * t, 3.8 * t);

    // Haste vertical de bronze/ferro forjado
    e.fillStyle = "#78350f";
    e.fillRect(-1.6 * t, -15.5 * t, 3.2 * t, 12.2 * t);
    e.fillStyle = "#d97706";
    e.fillRect(-2.4 * t, -9.5 * t, 4.8 * t, 1.4 * t);

    // 3. Cesto / Braseiro da Tocha no topo
    e.fillStyle = "#451a03";
    e.beginPath();
    e.moveTo(-4.8 * t, -19 * t);
    e.lineTo(4.8 * t, -19 * t);
    e.lineTo(2.8 * t, -14.5 * t);
    e.lineTo(-2.8 * t, -14.5 * t);
    e.closePath();
    e.fill();
    e.strokeStyle = "#f59e0b";
    e.lineWidth = 1 * t;
    e.stroke();

    if (!isLit) {
      // Estado APAGADO: Pavio e carvão escuro no topo aguardando ser aceso com uma tocha na mão
      e.fillStyle = "#1c1917";
      e.beginPath();
      e.ellipse(0, -19.2 * t, 3.4 * t, 1.6 * t, 0, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = "#44403c";
      e.beginPath();
      e.arc(-1 * t, -20 * t, 1.4 * t, 0, Math.PI * 2);
      e.arc(1.2 * t, -19.8 * t, 1.2 * t, 0, Math.PI * 2);
      e.fill();
    } else {
      // Estado ACESO: Halo luminoso e chama viva dançante!
      const flicker = Math.sin(animTimer * 11) * 1.1 * t,
        pulse = 1 + Math.cos(animTimer * 8) * 0.12;

      const glow = e.createRadialGradient(0, -22 * t, 1 * t, 0, -22 * t, 16 * pulse * t);
      glow.addColorStop(0, "rgba(254, 240, 138, 0.75)");
      glow.addColorStop(0.45, "rgba(249, 115, 22, 0.35)");
      glow.addColorStop(1, "rgba(249, 115, 22, 0)");
      e.fillStyle = glow;
      e.beginPath();
      e.arc(0, -22 * t, 16 * pulse * t, 0, Math.PI * 2);
      e.fill();

      // Língua externa da chama (laranja-avermelhada)
      e.fillStyle = "#f97316";
      e.beginPath();
      e.moveTo(-3.8 * t, -18.8 * t);
      e.quadraticCurveTo(-4.5 * t, -24 * t, flicker, -28.5 * pulse * t);
      e.quadraticCurveTo(4.5 * t, -24 * t, 3.8 * t, -18.8 * t);
      e.closePath();
      e.fill();

      // Núcleo interno da chama (amarelo-ouro brilhante)
      e.fillStyle = "#fef08a";
      e.beginPath();
      e.moveTo(-2 * t, -19 * t);
      e.quadraticCurveTo(-2.2 * t, -22.5 * t, flicker * 0.5, -25.2 * pulse * t);
      e.quadraticCurveTo(2.2 * t, -22.5 * t, 2 * t, -19 * t);
      e.closePath();
      e.fill();
    }
    e.restore();
  }
  function getCaveBiomeTheme(biome) {
    const bId = (biome && biome.id) || "MEADOW";
    const groundCol = (biome && biome.groundColor) || "#5fa743";
    const accentCol = (biome && biome.groundAccentColor) || "#6cb64d";
    // 1. Biomas de Areia (DESERT, BEACH): Pedra de Arenito dourado/amarelado com estratos e areia acumulada
    if (bId === "DESERT" || bId === "BEACH") {
      return {
        kind: "sandstone",
        rockOuter: "#92400e",
        rockMid: "#b45309",
        rockLight: "#d97706",
        rockHighlight: "#f59e0b",
        stratumCol: "rgba(120, 53, 15, 0.55)",
        mossColor: groundCol,
        mossAccent: accentCol,
        hasMoss: !1,
        hasSand: !0,
      };
    }
    // 2. Cânion Vermelho (CANYON): Arenito avermelhado/terracota
    if (bId === "CANYON") {
      return {
        kind: "canyon",
        rockOuter: "#7c2d12",
        rockMid: "#9a3412",
        rockLight: "#c2410c",
        rockHighlight: "#ea580c",
        stratumCol: "rgba(67, 20, 7, 0.6)",
        mossColor: groundCol,
        mossAccent: accentCol,
        hasMoss: !1,
        hasSand: !0,
      };
    }
    // 3. Biomas de Neve / Gelo (SNOW_TAIGA, SNOW_PEAK, GLACIER): Rocha alpina fria com cobertura de neve/gelo
    if (bId === "SNOW_TAIGA" || bId === "SNOW_PEAK" || bId === "GLACIER") {
      return {
        kind: "snow",
        rockOuter: "#1e293b",
        rockMid: "#334155",
        rockLight: "#475569",
        rockHighlight: "#64748b",
        stratumCol: "rgba(15, 23, 42, 0.6)",
        mossColor: "#f8fafc",
        mossAccent: "#bae6fd",
        hasMoss: !0,
        hasSand: !1,
      };
    }
    // 4. Vulcão (VOLCANIC): Basalto vulcânico negro/obsidiana com veios incandescentes
    if (bId === "VOLCANIC") {
      return {
        kind: "volcanic",
        rockOuter: "#09090b",
        rockMid: "#18181b",
        rockLight: "#27272a",
        rockHighlight: "#3f3f46",
        stratumCol: "rgba(220, 38, 38, 0.55)",
        mossColor: "#dc2626",
        mossAccent: "#f97316",
        hasMoss: !1,
        hasSand: !1,
      };
    }
    // 5. Biomas de Grama / Floresta / Savana / Oásis / Pântano / Montanha:
    //    Rocha granítica irregular coberta com MUSGO DA EXATA COR DA GRAMA DO BIOMA!
    return {
      kind: "grass_moss",
      rockOuter: "#1e293b",
      rockMid: "#334155",
      rockLight: "#475569",
      rockHighlight: "#64748b",
      stratumCol: "rgba(15, 23, 42, 0.55)",
      mossColor: groundCol,
      mossAccent: accentCol,
      hasMoss: !0,
      hasSand: !1,
    };
  }

  function drawIrregularCaveRockFormation(e, t, theme, isExit = !1, isMerged = !1, mergedCount = 1) {
    const wMul = isMerged ? 1.32 : 1,
      hMul = isMerged ? 1.48 : 1;

    // 1. Sombra de base irregular sob os rochedos
    e.fillStyle = "rgba(2, 6, 23, 0.45)";
    e.beginPath();
    e.moveTo(-29 * wMul * t, 5 * t);
    e.lineTo(-24 * wMul * t, 9 * t);
    e.lineTo(25 * wMul * t, 9 * t);
    e.lineTo(30 * wMul * t, 4 * t);
    e.lineTo(24 * wMul * t, -4 * t);
    e.lineTo(-24 * wMul * t, -4 * t);
    e.closePath();
    e.fill();

    // Se for uma Caverna Unificada (duas ou mais cavernas próximas que se juntaram),
    // desenha primeiro os grandes picos traseiros extras (muito mais alta!)
    if (isMerged) {
      e.fillStyle = theme.rockOuter;
      e.beginPath();
      e.moveTo(-36 * t, 4 * t);
      e.lineTo(-39 * t, -10 * t);
      e.lineTo(-33 * t, -26 * t);
      e.lineTo(-25 * t, -42 * t);
      e.lineTo(-16 * t, -38 * t);
      e.lineTo(-11 * t, -54 * t);
      e.lineTo(-2 * t, -60 * t);
      e.lineTo(8 * t, -56 * t);
      e.lineTo(15 * t, -44 * t);
      e.lineTo(24 * t, -47 * t);
      e.lineTo(32 * t, -31 * t);
      e.lineTo(38 * t, -14 * t);
      e.lineTo(36 * t, 4 * t);
      e.closePath();
      e.fill();

      // Facetas intermediárias dos picos altos da caverna unificada
      e.fillStyle = theme.rockMid;
      e.beginPath();
      e.moveTo(-23 * t, -26 * t);
      e.lineTo(-18 * t, -40 * t);
      e.lineTo(-9 * t, -52 * t);
      e.lineTo(-1 * t, -57 * t);
      e.lineTo(7 * t, -53 * t);
      e.lineTo(14 * t, -39 * t);
      e.lineTo(22 * t, -44 * t);
      e.lineTo(28 * t, -28 * t);
      e.closePath();
      e.fill();

      // Planos de luz nos picos superiores
      e.fillStyle = theme.rockLight;
      e.beginPath();
      e.moveTo(-9 * t, -49 * t);
      e.lineTo(-2 * t, -55 * t);
      e.lineTo(5 * t, -51 * t);
      e.lineTo(1 * t, -39 * t);
      e.closePath();
      e.moveTo(16 * t, -38 * t);
      e.lineTo(22 * t, -43 * t);
      e.lineTo(26 * t, -31 * t);
      e.lineTo(19 * t, -27 * t);
      e.closePath();
      e.fill();
    }

    // 2. Maciço Rochoso Principal Irregular (Polígono angular escarpado em vez de círculos!)
    e.fillStyle = theme.rockOuter;
    e.beginPath();
    e.moveTo(-28 * wMul * t, 4 * t);
    e.lineTo(-30 * wMul * t, -5 * hMul * t);
    e.lineTo(-26 * wMul * t, -16 * hMul * t);
    e.lineTo(-21 * wMul * t, -23 * hMul * t);
    e.lineTo(-15 * wMul * t, -21 * hMul * t);
    e.lineTo(-11 * wMul * t, -32 * hMul * t);
    e.lineTo(-3 * wMul * t, -37 * hMul * t);
    e.lineTo(5 * wMul * t, -35 * hMul * t);
    e.lineTo(12 * wMul * t, -29 * hMul * t);
    e.lineTo(17 * wMul * t, -25 * hMul * t);
    e.lineTo(24 * wMul * t, -21 * hMul * t);
    e.lineTo(29 * wMul * t, -12 * hMul * t);
    e.lineTo(27 * wMul * t, 4 * t);
    e.closePath();
    e.fill();

    // 3. Facetas Rochosas Intermediárias Irregulares (3 blocos angulares lascados: esquerdo, central/topo e direito)
    e.fillStyle = theme.rockMid;
    // Bloco rochoso esquerdo
    e.beginPath();
    e.moveTo(-26 * wMul * t, 3 * t);
    e.lineTo(-27 * wMul * t, -7 * hMul * t);
    e.lineTo(-23 * wMul * t, -17 * hMul * t);
    e.lineTo(-17 * wMul * t, -20 * hMul * t);
    e.lineTo(-12 * wMul * t, -14 * hMul * t);
    e.lineTo(-13 * wMul * t, 3 * t);
    e.closePath();
    e.fill();

    // Crista rochosa superior
    e.beginPath();
    e.moveTo(-15 * wMul * t, -16 * hMul * t);
    e.lineTo(-9 * wMul * t, -29 * hMul * t);
    e.lineTo(-2 * wMul * t, -34 * hMul * t);
    e.lineTo(6 * wMul * t, -32 * hMul * t);
    e.lineTo(13 * wMul * t, -24 * hMul * t);
    e.lineTo(9 * wMul * t, -15 * hMul * t);
    e.closePath();
    e.fill();

    // Bloco rochoso direito
    e.beginPath();
    e.moveTo(12 * wMul * t, 3 * t);
    e.lineTo(11 * wMul * t, -15 * hMul * t);
    e.lineTo(17 * wMul * t, -22 * hMul * t);
    e.lineTo(23 * wMul * t, -18 * hMul * t);
    e.lineTo(26 * wMul * t, -9 * hMul * t);
    e.lineTo(25 * wMul * t, 3 * t);
    e.closePath();
    e.fill();

    // 4. Planos de Luz / Quinas de Pedra Lascada (facetas iluminadas angulares)
    e.fillStyle = theme.rockLight;
    e.beginPath();
    // Faceta clara esquerda
    e.moveTo(-24 * wMul * t, -6 * hMul * t);
    e.lineTo(-21 * wMul * t, -16 * hMul * t);
    e.lineTo(-16 * wMul * t, -18 * hMul * t);
    e.lineTo(-15 * wMul * t, -8 * hMul * t);
    e.closePath();
    // Faceta clara topo
    e.moveTo(-8 * wMul * t, -27 * hMul * t);
    e.lineTo(-2 * wMul * t, -32 * hMul * t);
    e.lineTo(5 * wMul * t, -30 * hMul * t);
    e.lineTo(2 * wMul * t, -22 * hMul * t);
    e.closePath();
    // Faceta clara direita
    e.moveTo(14 * wMul * t, -14 * hMul * t);
    e.lineTo(17 * wMul * t, -20 * hMul * t);
    e.lineTo(22 * wMul * t, -16 * hMul * t);
    e.lineTo(19 * wMul * t, -7 * hMul * t);
    e.closePath();
    e.fill();

    // 5. Fendas geológicas e estratos (no arenito desenha faixas horizontais de sedimentos)
    e.strokeStyle = theme.stratumCol;
    e.lineWidth = (isMerged ? 1.6 : 1.3) * t;
    e.beginPath();
    if (theme.kind === "sandstone" || theme.kind === "canyon") {
      // Camadas sedimentares de arenito
      e.moveTo(-26 * wMul * t, -10 * hMul * t);
      e.lineTo(-14 * wMul * t, -12 * hMul * t);
      e.moveTo(-10 * wMul * t, -25 * hMul * t);
      e.lineTo(9 * wMul * t, -24 * hMul * t);
      e.moveTo(13 * wMul * t, -11 * hMul * t);
      e.lineTo(25 * wMul * t, -9 * hMul * t);
      if (isMerged) {
        e.moveTo(-16 * t, -42 * t);
        e.lineTo(14 * t, -40 * t);
      }
    } else {
      // Fraturas angulares de rocha
      e.moveTo(-21 * wMul * t, -19 * hMul * t);
      e.lineTo(-17 * wMul * t, -11 * hMul * t);
      e.lineTo(-22 * wMul * t, -4 * hMul * t);
      e.moveTo(-3 * wMul * t, -33 * hMul * t);
      e.lineTo(1 * wMul * t, -25 * hMul * t);
      e.moveTo(19 * wMul * t, -21 * hMul * t);
      e.lineTo(16 * wMul * t, -10 * hMul * t);
    }
    e.stroke();

    // 6. Pedras irregulares menores nas laterais da entrada
    e.fillStyle = theme.rockMid;
    e.beginPath();
    e.moveTo(-29 * wMul * t, 4 * t);
    e.lineTo(-27 * wMul * t, -2 * t);
    e.lineTo(-21 * wMul * t, -1 * t);
    e.lineTo(-19 * wMul * t, 5 * t);
    e.closePath();
    e.moveTo(19 * wMul * t, 5 * t);
    e.lineTo(21 * wMul * t, -1 * t);
    e.lineTo(27 * wMul * t, 0 * t);
    e.lineTo(29 * wMul * t, 5 * t);
    e.closePath();
    e.fill();

    // 7. Quando duas ou mais cavernas se juntam (isMerged), adiciona MUITO MAIS PEDRAS IRREGULARES na entrada!
    if (isMerged) {
      const extraRocks = [
        // Aglomerado esquerdo de rochedos na entrada
        { x: -34, y: 6, w: 9, h: 8, col: theme.rockOuter },
        { x: -31, y: 5, w: 7, h: 6, col: theme.rockMid },
        { x: -25, y: 7, w: 8, h: 6.5, col: theme.rockOuter },
        { x: -24, y: 6, w: 6, h: 5, col: theme.rockLight },
        { x: -18, y: 8, w: 6.5, h: 5, col: theme.rockMid },
        // Aglomerado direito de rochedos na entrada
        { x: 34, y: 6, w: 9.5, h: 8, col: theme.rockOuter },
        { x: 31, y: 5, w: 7, h: 6, col: theme.rockMid },
        { x: 25, y: 7, w: 8, h: 6.5, col: theme.rockOuter },
        { x: 24, y: 6, w: 6, h: 5, col: theme.rockLight },
        { x: 18, y: 8, w: 6.5, h: 5, col: theme.rockMid },
        // Pedras extras empilhadas nas ombreiras da entrada
        { x: -20, y: -4, w: 7, h: 8, col: theme.rockMid },
        { x: 20, y: -4, w: 7, h: 8, col: theme.rockMid },
      ];
      for (let i = 0; i < extraRocks.length; i++) {
        const rk = extraRocks[i];
        e.fillStyle = rk.col;
        e.beginPath();
        e.moveTo((rk.x - rk.w * 0.5) * t, rk.y * t);
        e.lineTo((rk.x - rk.w * 0.38) * t, (rk.y - rk.h * 0.85) * t);
        e.lineTo((rk.x + rk.w * 0.12) * t, (rk.y - rk.h) * t);
        e.lineTo((rk.x + rk.w * 0.48) * t, (rk.y - rk.h * 0.55) * t);
        e.lineTo((rk.x + rk.w * 0.52) * t, (rk.y + 1) * t);
        e.closePath();
        e.fill();
      }
    }
  }

  function drawCaveBiomeOverlay(e, t, theme, isMerged = !1) {
    const wMul = isMerged ? 1.32 : 1,
      hMul = isMerged ? 1.48 : 1;
    // Se for bioma de grama/floresta/neve, aplica tapetes irregulares de MUSGO DA COR DA GRAMA (ou neve) sobre as cristas da pedra!
    if (theme.hasMoss) {
      e.fillStyle = theme.mossColor;
      // Camada de musgo superior acompanhando a crista irregular da caverna
      e.beginPath();
      e.moveTo(-23 * wMul * t, -16 * hMul * t);
      e.lineTo(-21 * wMul * t, -23 * hMul * t);
      e.lineTo(-15 * wMul * t, -21 * hMul * t);
      e.lineTo(-11 * wMul * t, -32 * hMul * t);
      e.lineTo(-3 * wMul * t, -37 * hMul * t);
      e.lineTo(5 * wMul * t, -35 * hMul * t);
      e.lineTo(12 * wMul * t, -29 * hMul * t);
      e.lineTo(17 * wMul * t, -25 * hMul * t);
      e.lineTo(23 * wMul * t, -20 * hMul * t);
      e.lineTo(18 * wMul * t, -16 * hMul * t);
      e.lineTo(11 * wMul * t, -20 * hMul * t);
      e.lineTo(4 * wMul * t, -26 * hMul * t);
      e.lineTo(-4 * wMul * t, -27 * hMul * t);
      e.lineTo(-12 * wMul * t, -18 * hMul * t);
      e.lineTo(-18 * wMul * t, -14 * hMul * t);
      e.closePath();
      e.fill();

      // Destaque secundário do musgo (groundAccentColor do bioma) e manchas nas pedras laterais
      e.fillStyle = theme.mossAccent;
      e.beginPath();
      e.moveTo(-10 * wMul * t, -29 * hMul * t);
      e.lineTo(-3 * wMul * t, -35 * hMul * t);
      e.lineTo(4 * wMul * t, -33 * hMul * t);
      e.lineTo(8 * wMul * t, -27 * hMul * t);
      e.lineTo(1 * wMul * t, -28 * hMul * t);
      e.closePath();
      // Manchas de musgo descendo pela rocha esquerda e direita
      e.moveTo(-25 * wMul * t, -8 * hMul * t);
      e.lineTo(-22 * wMul * t, -14 * hMul * t);
      e.lineTo(-16 * wMul * t, -12 * hMul * t);
      e.lineTo(-18 * wMul * t, -6 * hMul * t);
      e.closePath();
      e.moveTo(16 * wMul * t, -12 * hMul * t);
      e.lineTo(21 * wMul * t, -15 * hMul * t);
      e.lineTo(25 * wMul * t, -9 * hMul * t);
      e.lineTo(19 * wMul * t, -7 * hMul * t);
      e.closePath();
      if (isMerged) {
        // Musgo nos rochedos extras da entrada da caverna unificada
        e.moveTo(-34 * t, 2 * t);
        e.lineTo(-29 * t, -1 * t);
        e.lineTo(-22 * t, 2 * t);
        e.lineTo(-26 * t, 5 * t);
        e.closePath();
        e.moveTo(22 * t, 2 * t);
        e.lineTo(29 * t, -1 * t);
        e.lineTo(34 * t, 2 * t);
        e.lineTo(26 * t, 5 * t);
        e.closePath();
      }
      e.fill();
    } else if (theme.hasSand) {
      // Dunas de areia / poeira de arenito acumulada na base e nas fendas da caverna
      e.fillStyle = theme.mossColor;
      e.beginPath();
      e.moveTo(-30 * wMul * t, 5 * t);
      e.quadraticCurveTo(-22 * wMul * t, -2 * t, -13 * wMul * t, 5 * t);
      e.closePath();
      e.moveTo(13 * wMul * t, 5 * t);
      e.quadraticCurveTo(22 * wMul * t, -2 * t, 30 * wMul * t, 5 * t);
      e.closePath();
      e.fill();
      e.fillStyle = theme.rockHighlight;
      e.beginPath();
      e.moveTo(-9 * wMul * t, -29 * hMul * t);
      e.lineTo(-2 * wMul * t, -34 * hMul * t);
      e.lineTo(5 * wMul * t, -32 * hMul * t);
      e.lineTo(1 * wMul * t, -28 * hMul * t);
      e.closePath();
      e.fill();
    }
  }

  function drawRuinsSubterraneanStaircase(e, t, l, isExit = !1, isMerged = !1) {
    const wMul = isMerged ? 1.28 : 1,
      hMul = isMerged ? 1.22 : 1;

    if (isExit) {
      // =========================================================================
      // SAÍDA DA ESCADARIA NO SUBSOLO (Escadaria de Mármore que SOBE do chão da
      // caverna em direção à abertura iluminada da superfície no teto!)
      // =========================================================================
      // 1. Tapete de luz solar projetado no chão da caverna ao pé da escadaria
      const floorBeam = e.createRadialGradient(0, 6 * t, 2 * t, 0, 8 * t, 26 * wMul * t);
      floorBeam.addColorStop(0, "rgba(254, 240, 138, 0.38)");
      floorBeam.addColorStop(0.55, "rgba(56, 189, 248, 0.16)");
      floorBeam.addColorStop(1, "rgba(15, 23, 42, 0)");
      e.fillStyle = floorBeam;
      e.beginPath();
      e.ellipse(0, 8 * t, 26 * wMul * t, 11 * t, 0, 0, Math.PI * 2);
      e.fill();

      // 2. Sombra da estrutura da escadaria que se ergue no subsolo
      e.fillStyle = "rgba(2, 6, 23, 0.55)";
      e.fillRect(-24 * wMul * t, -34 * hMul * t, 48 * wMul * t, (34 * hMul + 12) * t);

      // 3. Estrutura Lateral de Pedra/Mármore Sustentando a Escadaria Ascendente (2.5D)
      e.fillStyle = "#334155";
      e.beginPath();
      e.moveTo(-22 * wMul * t, 8 * t);
      e.lineTo(-18 * wMul * t, -34 * hMul * t);
      e.lineTo(18 * wMul * t, -34 * hMul * t);
      e.lineTo(22 * wMul * t, 8 * t);
      e.closePath();
      e.fill();

      // Balaustradas / Corrimãos Laterais de Mármore Branco subindo em rampa até o teto
      e.fillStyle = "#f8fafc";
      // Corrimão esquerdo
      e.beginPath();
      e.moveTo(-21 * wMul * t, 8 * t);
      e.lineTo(-16 * wMul * t, -34 * hMul * t);
      e.lineTo(-11.5 * wMul * t, -34 * hMul * t);
      e.lineTo(-15.5 * wMul * t, 8 * t);
      e.closePath();
      e.fill();
      // Corrimão direito
      e.beginPath();
      e.moveTo(15.5 * wMul * t, 8 * t);
      e.lineTo(11.5 * wMul * t, -34 * hMul * t);
      e.lineTo(16 * wMul * t, -34 * hMul * t);
      e.lineTo(21 * wMul * t, 8 * t);
      e.closePath();
      e.fill();

      // Friso dourado ao longo das balaustradas ascendentes
      e.strokeStyle = "#f59e0b";
      e.lineWidth = 1.2 * t;
      e.beginPath();
      e.moveTo(-18.5 * wMul * t, 7 * t);
      e.lineTo(-14 * wMul * t, -33 * hMul * t);
      e.moveTo(18.5 * wMul * t, 7 * t);
      e.lineTo(14 * wMul * t, -33 * hMul * t);
      e.stroke();

      // 4. Degraus Ascendentes (começam largos na base da caverna e sobem em degraus 3D até o portal iluminado no topo!)
      const numUpSteps = isMerged ? 10 : 8;
      for (let s = 0; s < numUpSteps; s++) {
        const r0 = s / numUpSteps;
        const r1 = (s + 1) / numUpSteps;
        // Base em y = +8*t subindo até y = -28*hMul*t
        const yBottom = (8 - r0 * (34 * hMul)) * t;
        const yTop = (8 - r1 * (34 * hMul)) * t;
        const stepH = Math.max(2 * t, yBottom - yTop);
        const halfW0 = (15.5 - r0 * 4) * wMul * t;
        const halfW1 = (15.5 - r1 * 4) * wMul * t;

        // Espelho frontal vertical do degrau (quem está na caverna vê a frente do degrau subindo!)
        const riserLum = Math.round(110 + r0 * 95);
        e.fillStyle = `rgb(${riserLum}, ${riserLum + 4}, ${riserLum + 12})`;
        e.fillRect(-halfW0, yBottom - stepH * 0.55, halfW0 * 2, stepH * 0.55);

        // Pisada superior do degrau banhada pela luz do dia que vem de cima
        const treadLum = Math.round(165 + r1 * 88);
        e.fillStyle = `rgb(${treadLum}, ${treadLum}, ${Math.min(255, treadLum + 8)})`;
        e.fillRect(-halfW1, yTop, halfW1 * 2, stepH * 0.48);

        // Borda dourada sutil nos degraus superiores
        if (s % 2 === 1) {
          e.fillStyle = "rgba(251, 191, 36, 0.45)";
          e.fillRect(-halfW0 + 1 * t, yBottom - stepH * 0.55, (halfW0 - 1 * t) * 2, 0.7 * t);
        }
      }

      // 5. Portal / Claraboia de Saída no Topo da Escadaria (Céu aberto e luz do dia lá em cima!)
      const skyGrad = e.createLinearGradient(0, -38 * hMul * t, 0, -22 * hMul * t);
      skyGrad.addColorStop(0, "#38bdf8");
      skyGrad.addColorStop(0.55, "#bae6fd");
      skyGrad.addColorStop(1, "#fef08a");
      e.fillStyle = skyGrad;
      e.fillRect(-12 * wMul * t, -37 * hMul * t, 24 * wMul * t, 11 * hMul * t);

      // Feixe de luz solar descendo da abertura sobre os degraus
      const rayGrad = e.createLinearGradient(0, -36 * hMul * t, 0, 8 * t);
      rayGrad.addColorStop(0, "rgba(254, 240, 138, 0.42)");
      rayGrad.addColorStop(0.5, "rgba(254, 240, 138, 0.16)");
      rayGrad.addColorStop(1, "rgba(254, 240, 138, 0)");
      e.fillStyle = rayGrad;
      e.beginPath();
      e.moveTo(-12 * wMul * t, -36 * hMul * t);
      e.lineTo(12 * wMul * t, -36 * hMul * t);
      e.lineTo(18 * wMul * t, 8 * t);
      e.lineTo(-18 * wMul * t, 8 * t);
      e.closePath();
      e.fill();

      // Colunas Dóricas e Arquitrave de Mármore emoldurando a Saída no Topo e na Base
      for (const side of [-1, 1]) {
        // Pilares da base da escadaria
        const bx = side * 18 * wMul * t;
        e.fillStyle = "#94a3b8";
        e.fillRect(bx - 3.2 * t, 4 * t, 6.4 * t, 4 * t);
        e.fillStyle = "#f8fafc";
        e.fillRect(bx - 2.4 * t, -8 * t, 4.8 * t, 12 * t);
        e.fillStyle = "#f59e0b";
        e.fillRect(bx - 3 * t, -9.5 * t, 6 * t, 1.8 * t);

        // Colunas do portal superior de saída
        const tx = side * 13.5 * wMul * t;
        e.fillStyle = "#f8fafc";
        e.fillRect(tx - 2.4 * t, -39 * hMul * t, 4.8 * t, 13 * hMul * t);
        e.fillStyle = "#e2e8f0";
        e.fillRect(tx - 3.2 * t, -41 * hMul * t, 6.4 * t, 2.2 * t);
      }

      // Arquitrave superior de mármore com friso dourado (sem texto escrito SAÍDA)
      e.fillStyle = "#f8fafc";
      e.fillRect(-17 * wMul * t, -43 * hMul * t, 34 * wMul * t, 4 * t);
      e.fillStyle = "#334155";
      e.fillRect(-18 * wMul * t, -45 * hMul * t, 36 * wMul * t, 2 * t);
      e.strokeStyle = "#fbbf24";
      e.lineWidth = 1 * t;
      e.strokeRect(-16 * wMul * t, -42.5 * hMul * t, 32 * wMul * t, 3 * t);

      // Tochas de bronze acesas na base da escadaria de saída
      const flicker = Math.sin((l || 0) * 6) * 0.15;
      for (const side of [-1, 1]) {
        const tx = side * 18 * wMul * t,
          ty = -11 * t;
        e.fillStyle = `rgba(251, 191, 36, ${0.9 + flicker})`;
        e.beginPath();
        e.arc(tx, ty, 2.8 * t, 0, Math.PI * 2);
        e.fill();
      }
      return;
    }

    // =========================================================================
    // ENTRADA DA ESCADARIA NA SUPERFÍCIE (Poço de Mármore que DESCE ao Subsolo)
    // =========================================================================
    // 1. Sombra projetada ao redor do poço da escadaria
    e.fillStyle = "rgba(2, 6, 23, 0.45)";
    e.fillRect(-25 * wMul * t, -24 * hMul * t, 50 * wMul * t, (24 * hMul + 11) * t);

    // 2. Piso/Moldura externa de mármore travertino e borda dourada ao nível do solo
    e.fillStyle = "#cbd5e1";
    e.fillRect(-23 * wMul * t, -22 * hMul * t, 46 * wMul * t, (22 * hMul + 9) * t);
    e.strokeStyle = "#475569";
    e.lineWidth = 1.3 * t;
    e.strokeRect(-23 * wMul * t, -22 * hMul * t, 46 * wMul * t, (22 * hMul + 9) * t);

    // Friso grego dourado na borda externa da escadaria
    e.strokeStyle = "#d97706";
    e.lineWidth = 1.1 * t;
    e.strokeRect(-21 * wMul * t, -20 * hMul * t, 42 * wMul * t, (20 * hMul + 7) * t);

    // 3. Muretas Laterais (Parapeitos de Mármore 2.5D nas bordas esquerda, direita e fundo norte)
    e.fillStyle = "#f8fafc";
    e.fillRect(-22 * wMul * t, -26 * hMul * t, 44 * wMul * t, 6 * t);
    e.fillStyle = "#334155";
    e.fillRect(-22 * wMul * t, -28 * hMul * t, 44 * wMul * t, 2.5 * t);

    e.fillStyle = "#e2e8f0";
    e.fillRect(-22 * wMul * t, -22 * hMul * t, 6.5 * wMul * t, (22 * hMul + 8) * t);
    e.fillRect(15.5 * wMul * t, -22 * hMul * t, 6.5 * wMul * t, (22 * hMul + 8) * t);
    e.fillStyle = "#334155";
    e.fillRect(-21.5 * wMul * t, -22 * hMul * t, 5.5 * wMul * t, (22 * hMul + 6) * t);
    e.fillRect(16 * wMul * t, -22 * hMul * t, 5.5 * wMul * t, (22 * hMul + 6) * t);
    e.strokeStyle = "#f8fafc";
    e.lineWidth = 1 * t;
    e.strokeRect(-21.5 * wMul * t, -22 * hMul * t, 5.5 * wMul * t, (22 * hMul + 6) * t);
    e.strokeRect(16 * wMul * t, -22 * hMul * t, 5.5 * wMul * t, (22 * hMul + 6) * t);

    // 4. Vão Central da Escadaria (Fosso que desce da superfície para a escuridão do subsolo)
    const innerW = 31 * wMul * t,
      innerX = -15.5 * wMul * t,
      innerTopY = -20 * hMul * t,
      innerH = (20 * hMul + 8) * t;

    const voidGrad = e.createLinearGradient(0, innerTopY, 0, innerTopY + innerH);
    voidGrad.addColorStop(0, "#020617");
    voidGrad.addColorStop(0.45, "#09090b");
    voidGrad.addColorStop(0.8, "#1e293b");
    voidGrad.addColorStop(1, "#334155");
    e.fillStyle = voidGrad;
    e.fillRect(innerX, innerTopY, innerW, innerH);

    // 5. Degraus de Mármore em Perspectiva Descendo para o Subsolo
    const numSteps = isMerged ? 9 : 7;
    for (let s = 0; s < numSteps; s++) {
      const ratio = s / numSteps;
      const nextRatio = (s + 1) / numSteps;
      const stepY1 = 7 * t - ratio * (25 * hMul * t);
      const stepY2 = 7 * t - nextRatio * (25 * hMul * t);
      const stepH = Math.max(1.8 * t, stepY1 - stepY2);
      const inset = ratio * 4.5 * wMul * t;
      const sx = innerX + inset;
      const sw = innerW - inset * 2;

      const shade = Math.round(235 - ratio * 175);
      e.fillStyle = `rgb(${shade}, ${shade}, ${Math.min(255, shade + 8)})`;
      e.fillRect(sx, stepY2, sw, stepH * 0.72);

      const riserShade = Math.max(12, shade - 55);
      e.fillStyle = `rgb(${riserShade}, ${riserShade}, ${riserShade + 5})`;
      e.fillRect(sx, stepY2 + stepH * 0.72, sw, stepH * 0.28);
    }

    // 6. Pares de Colunas Dóricas guardando a entrada da escadaria
    const colPositions = isMerged
      ? [-18.5 * wMul, -11.5 * wMul, 11.5 * wMul, 18.5 * wMul]
      : [-18.5 * wMul, 18.5 * wMul];
    for (let i = 0; i < colPositions.length; i++) {
      const cx = colPositions[i] * t;
      e.fillStyle = "#94a3b8";
      e.fillRect(cx - 3.5 * t, -19 * hMul * t, 7 * t, 4 * t);
      e.fillStyle = "#f8fafc";
      e.fillRect(cx - 2.8 * t, -32 * hMul * t, 5.6 * t, 14 * hMul * t);
      e.fillStyle = "#cbd5e1";
      e.fillRect(cx + 0.5 * t, -32 * hMul * t, 2.3 * t, 14 * hMul * t);
      e.fillStyle = "#e2e8f0";
      e.fillRect(cx - 3.8 * t, -34.5 * hMul * t, 7.6 * t, 2.8 * t);
      e.fillStyle = "#f59e0b";
      e.fillRect(cx - 3.5 * t, -32.2 * hMul * t, 7 * t, 1 * t);
    }

    // Arquitrave / Portal de Mármore no topo norte da escadaria
    e.fillStyle = "#f1f5f9";
    e.fillRect(-22 * wMul * t, -37.5 * hMul * t, 44 * wMul * t, 4 * t);
    e.fillStyle = "#334155";
    e.fillRect(-23 * wMul * t, -39.5 * hMul * t, 46 * wMul * t, 2.2 * t);
    e.strokeStyle = "#fbbf24";
    e.lineWidth = 1 * t;
    e.strokeRect(-21 * wMul * t, -37 * hMul * t, 42 * wMul * t, 3 * t);

    // 7. Tochas / Arandelas de Bronze acesas nas laterais da escadaria
    const flicker = Math.sin((l || 0) * 6) * 0.15;
    for (const side of [-1, 1]) {
      const tx = side * 14.2 * wMul * t,
        ty = -6 * t;
      e.fillStyle = "#78350f";
      e.fillRect(tx - 1.2 * t, ty - 5 * t, 2.4 * t, 6 * t);
      e.fillStyle = `rgba(251, 191, 36, ${0.88 + flicker})`;
      e.beginPath();
      e.arc(tx, ty - 6.5 * t, 2.6 * t, 0, Math.PI * 2);
      e.fill();
    }
  }

  function bg(e, t, l, biome = null, isMerged = !1, mergedCount = 1, isStaircase = !1) {
    if (isStaircase || (biome && biome.id === "MEADOW")) {
      drawRuinsSubterraneanStaircase(e, t, l, !1, isMerged);
      return;
    }
    const theme = getCaveBiomeTheme(biome);
    drawIrregularCaveRockFormation(e, t, theme, !1, isMerged, mergedCount);

    const archW = isMerged ? 1.25 : 1,
      archH = isMerged ? 1.32 : 1;

    // Boca escura irregular da caverna (arco rochoso facetado em vez de elipse redonda)
    const o = e.createRadialGradient(0, 0, 2 * t, 0, -4 * archH * t, 18 * archW * t);
    (o.addColorStop(0, "#000000"),
      o.addColorStop(0.7, "#09090b"),
      o.addColorStop(1, "#18181b"),
      (e.fillStyle = o),
      e.beginPath(),
      e.moveTo(-14 * archW * t, 4 * t),
      e.lineTo(-14 * archW * t, -8 * archH * t),
      e.lineTo(-10 * archW * t, -17 * archH * t),
      e.lineTo(-3 * archW * t, -20 * archH * t),
      e.lineTo(4 * archW * t, -20 * archH * t),
      e.lineTo(10 * archW * t, -16 * archH * t),
      e.lineTo(14 * archW * t, -8 * archH * t),
      e.lineTo(14 * archW * t, 4 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#27272a"),
      e.fillRect(-10 * archW * t, 0 * t, 20 * archW * t, 2.5 * t),
      (e.fillStyle = "#18181b"),
      e.fillRect(-8 * archW * t, 2.5 * t, 16 * archW * t, 2.5 * t),
      (e.fillStyle = "#451a03"),
      e.fillRect(-13 * archW * t, -16 * archH * t, 3.5 * t, (16 * archH + 2) * t),
      e.fillRect((13 * archW - 3.5) * t, -16 * archH * t, 3.5 * t, (16 * archH + 2) * t),
      (e.fillStyle = "#78350f"),
      e.fillRect(-14 * archW * t, -18 * archH * t, 28 * archW * t, 4 * t),
      (e.strokeStyle = "#0f172a"),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.moveTo(6 * archW * t, -14 * archH * t),
      e.lineTo(6 * archW * t, -9 * archH * t),
      e.stroke(),
      (e.fillStyle = "#1e293b"),
      e.fillRect((6 * archW - 2) * t, -9 * archH * t, 4 * t, 5.5 * t));
    const u = Math.sin(l * 6) * 0.15;
    e.fillStyle = `rgba(251, 191, 36, ${0.85 + u})`;
    e.fillRect((6 * archW - 1.2) * t, (-9 * archH + 0.8) * t, 2.4 * t, 3.8 * t);

    // Cobertura de musgo da cor da grama (ou areia/neve conforme o bioma)
    drawCaveBiomeOverlay(e, t, theme, isMerged);
  }
  function yg(e, t, l = 0, biome = null, isMerged = !1, mergedCount = 1, isStaircase = !1) {
    if (isStaircase || (biome && biome.id === "MEADOW")) {
      drawRuinsSubterraneanStaircase(e, t, l, !0, isMerged);
      return;
    }
    const theme = getCaveBiomeTheme(biome);
    drawIrregularCaveRockFormation(e, t, theme, !0, isMerged, mergedCount);

    const archW = isMerged ? 1.25 : 1,
      archH = isMerged ? 1.32 : 1;

    // Luz do dia saindo pelo arco rochoso irregular da saída da caverna
    const o = e.createLinearGradient(0, -20 * archH * t, 0, 4 * t);
    (o.addColorStop(0, "#0284c7"),
      o.addColorStop(0.35, "#38bdf8"),
      o.addColorStop(0.7, "#7dd3fc"),
      o.addColorStop(1, "#fde047"),
      (e.fillStyle = o),
      e.beginPath(),
      e.moveTo(-14 * archW * t, 4 * t),
      e.lineTo(-14 * archW * t, -8 * archH * t),
      e.lineTo(-10 * archW * t, -17 * archH * t),
      e.lineTo(-3 * archW * t, -20 * archH * t),
      e.lineTo(4 * archW * t, -20 * archH * t),
      e.lineTo(10 * archW * t, -16 * archH * t),
      e.lineTo(14 * archW * t, -8 * archH * t),
      e.lineTo(14 * archW * t, 4 * t),
      e.closePath(),
      e.fill());
    const r = e.createLinearGradient(0, -2 * t, 0, 16 * t);
    (r.addColorStop(0, "rgba(254, 240, 138, 0.18)"),
      r.addColorStop(0.5, "rgba(254, 240, 138, 0.06)"),
      r.addColorStop(1, "rgba(254, 240, 138, 0)"),
      (e.fillStyle = r),
      e.beginPath(),
      e.moveTo(-11 * archW * t, -2 * t),
      e.lineTo(11 * archW * t, -2 * t),
      e.lineTo(20 * archW * t, 14 * t),
      e.lineTo(-20 * archW * t, 14 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#334155"),
      e.fillRect(-10 * archW * t, 0 * t, 20 * archW * t, 2.5 * t),
      (e.fillStyle = "#1e293b"),
      e.fillRect(-8 * archW * t, 2.5 * t, 16 * archW * t, 2.5 * t),
      (e.fillStyle = "#451a03"),
      e.fillRect(-13 * archW * t, -16 * archH * t, 3.5 * t, (16 * archH + 2) * t),
      e.fillRect((13 * archW - 3.5) * t, -16 * archH * t, 3.5 * t, (16 * archH + 2) * t),
      (e.fillStyle = "#78350f"),
      e.fillRect(-14 * archW * t, -18 * archH * t, 28 * archW * t, 4 * t),
      (e.fillStyle = "#451a03"),
      e.fillRect(-10 * t, (-23 * archH) * t, 20 * t, 5 * t),
      (e.fillStyle = "#92400e"),
      e.fillRect(-9 * t, (-23 * archH + 1) * t, 18 * t, 4 * t),
      (e.fillStyle = "#fef08a"),
      (e.font = `bold ${Math.round(3.5 * t)}px sans-serif`),
      (e.textAlign = "center"),
      e.fillText("▲ SAÍDA", 0, (-23 * archH + 4) * t),
      (e.strokeStyle = "#0f172a"),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.moveTo(6 * archW * t, -14 * archH * t),
      e.lineTo(6 * archW * t, -9 * archH * t),
      e.stroke(),
      (e.fillStyle = "#1e293b"),
      e.fillRect((6 * archW - 2) * t, -9 * archH * t, 4 * t, 5.5 * t));
    const u = Math.sin((l || 0) * 6) * 0.15;
    e.fillStyle = `rgba(251, 191, 36, ${0.85 + u})`;
    e.fillRect((6 * archW - 1.2) * t, (-9 * archH + 0.8) * t, 2.4 * t, 3.8 * t);

    // Cobertura de musgo/arenito/neve seguindo o bioma da superfície correspondente
    drawCaveBiomeOverlay(e, t, theme, isMerged);
  }
  function vg(e, t, l, o = !1) {
    if (
      ((e.fillStyle = "#1c1917"),
      e.beginPath(),
      e.ellipse(0, 3 * t, 13 * t, 6 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#292524"),
      e.beginPath(),
      e.ellipse(0, 2 * t, 10 * t, 4.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      o)
    ) {
      ((e.fillStyle = "#a855f7"),
        e.beginPath(),
        e.moveTo(-3 * t, 2 * t),
        e.lineTo(-2 * t, -2 * t),
        e.lineTo(0, 2 * t),
        e.fill(),
        (e.fillStyle = "#cbd5e1"),
        e.fillRect(1 * t, 1 * t, 3 * t, 2 * t));
      return;
    }
    const u = [
        ["#581c87", "#9333ea", "#c084fc", "#f3e8ff"],
        ["#0369a1", "#0284c7", "#38bdf8", "#e0f2fe"],
        ["#9f1239", "#e11d48", "#fb7185", "#ffe4e6"],
        ["#065f46", "#059669", "#34d399", "#d1fae5"],
      ],
      m = u[l % u.length];
    e.save();
    const c = [
      { x: -5 * t, y: 3 * t, w: 4 * t, h: 14 * t, angle: -0.22 },
      { x: 0, y: 3 * t, w: 5 * t, h: 22 * t, angle: 0.05 },
      { x: 5 * t, y: 3 * t, w: 4.5 * t, h: 16 * t, angle: 0.26 },
      { x: -2 * t, y: 4 * t, w: 3 * t, h: 10 * t, angle: -0.1 },
    ];
    for (const f of c)
      (e.save(),
        e.translate(f.x, f.y),
        e.rotate(f.angle),
        (e.fillStyle = m[0]),
        e.beginPath(),
        e.moveTo(-f.w / 2, 0),
        e.lineTo(0, -f.h),
        e.lineTo(f.w / 2, 0),
        e.closePath(),
        e.fill(),
        (e.fillStyle = m[1]),
        e.beginPath(),
        e.moveTo(-f.w / 2, 0),
        e.lineTo(0, -f.h),
        e.lineTo(0, 0),
        e.closePath(),
        e.fill(),
        (e.fillStyle = m[2]),
        e.beginPath(),
        e.moveTo(0, 0),
        e.lineTo(0, -f.h),
        e.lineTo(f.w / 4, -f.h * 0.4),
        e.closePath(),
        e.fill(),
        (e.fillStyle = m[3]),
        e.fillRect(-0.6 * t, -f.h, 1.2 * t, 2 * t),
        e.restore());
    e.restore();
  }
  function wg(e, t, l, o = !1) {
    if (
      ((e.fillStyle = "#292524"),
      e.beginPath(),
      e.moveTo(-11 * t, 4 * t),
      e.lineTo(-13 * t, -4 * t),
      e.lineTo(-7 * t, -14 * t),
      e.lineTo(5 * t, -15 * t),
      e.lineTo(12 * t, -6 * t),
      e.lineTo(11 * t, 4 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#44403c"),
      e.beginPath(),
      e.moveTo(-7 * t, -14 * t),
      e.lineTo(5 * t, -15 * t),
      e.lineTo(0 * t, -4 * t),
      e.lineTo(-11 * t, -4 * t),
      e.closePath(),
      e.fill(),
      o)
    ) {
      ((e.fillStyle = "#0c0a09"),
        e.beginPath(),
        e.ellipse(0, -5 * t, 5 * t, 3.5 * t, 0, 0, Math.PI * 2),
        e.fill());
      return;
    }
    const u = [
        ["#d97706", "#fbbf24", "#fef08a"],
        ["#0284c7", "#38bdf8", "#e0f2fe"],
        ["#64748b", "#cbd5e1", "#f8fafc"],
      ],
      m = u[l % u.length],
      c = [
        { x: -4 * t, y: -8 * t, r: 2.8 * t },
        { x: 1 * t, y: -10 * t, r: 3.2 * t },
        { x: -1 * t, y: -4 * t, r: 2.5 * t },
        { x: 5 * t, y: -7 * t, r: 2.4 * t },
      ];
    for (const f of c)
      ((e.fillStyle = m[0]),
        e.beginPath(),
        e.arc(f.x, f.y, f.r, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = m[1]),
        e.beginPath(),
        e.arc(f.x - f.r * 0.25, f.y - f.r * 0.25, f.r * 0.7, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = m[2]),
        e.beginPath(),
        e.arc(f.x - f.r * 0.4, f.y - f.r * 0.4, f.r * 0.35, 0, Math.PI * 2),
        e.fill());
  }
  function Tg(e, t, l) {
    const o = (l === 0 ? 18 : l === 1 ? 24 : 14) * t,
      u = 8 * t;
    ((e.fillStyle = "#292524"),
      e.beginPath(),
      e.ellipse(0, 3 * t, 7 * t, 3.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#44403c"),
      e.beginPath(),
      e.moveTo(-u / 2, 2 * t),
      e.lineTo(0, -o),
      e.lineTo(u / 2, 2 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#78716c"),
      e.beginPath(),
      e.moveTo(-u / 2, 2 * t),
      e.lineTo(0, -o),
      e.lineTo(0, 2 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#e7e5e4"),
      e.beginPath(),
      e.arc(0, -o + 1.5 * t, 1.2 * t, 0, Math.PI * 2),
      e.fill());
  }
  function Sg(e, t) {
    ((e.fillStyle = "#451a03"),
      e.fillRect(-12 * t, 2 * t, 24 * t, 3 * t),
      (e.fillStyle = "#94a3b8"),
      e.fillRect(-14 * t, 0, 28 * t, 1.5 * t),
      e.fillRect(-14 * t, 4 * t, 28 * t, 1.5 * t),
      (e.fillStyle = "#334155"),
      e.beginPath(),
      e.arc(-7 * t, 1 * t, 3.2 * t, 0, Math.PI * 2),
      e.arc(7 * t, 1 * t, 3.2 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#78350f"),
      e.beginPath(),
      e.moveTo(-10 * t, 0),
      e.lineTo(-12 * t, -9 * t),
      e.lineTo(12 * t, -9 * t),
      e.lineTo(10 * t, 0),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#475569"),
      (e.lineWidth = 1.5 * t),
      e.stroke(),
      (e.fillStyle = "#fbbf24"),
      e.beginPath(),
      e.arc(-4 * t, -10 * t, 3 * t, 0, Math.PI * 2),
      e.arc(2 * t, -11 * t, 3.5 * t, 0, Math.PI * 2),
      e.arc(6 * t, -10 * t, 2.5 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#c084fc"),
      e.beginPath(),
      e.arc(0, -12 * t, 2 * t, 0, Math.PI * 2),
      e.fill());
  }
  function kP(e, t, l) {
    const o = l === 0,
      u = o ? "#0d9488" : "#a855f7",
      m = o ? "rgba(45, 212, 191, 0.08)" : "rgba(168, 85, 247, 0.08)",
      c = o ? "#ccfbf1" : "#f3e8ff";
    ((e.fillStyle = m),
      e.beginPath(),
      e.ellipse(0, 3 * t, 6 * t, 3 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = c),
      e.beginPath(),
      e.moveTo(-1.5 * t, 2 * t),
      e.quadraticCurveTo(-0.5 * t, -5 * t, -1 * t, -8 * t),
      e.lineTo(1 * t, -8 * t),
      e.quadraticCurveTo(1.2 * t, -5 * t, 1.5 * t, 2 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = u),
      e.beginPath(),
      e.arc(0, -8 * t, 6 * t, Math.PI, 0),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#e2e8f0"),
      e.beginPath(),
      e.arc(-2.5 * t, -11 * t, 0.9 * t, 0, Math.PI * 2),
      e.arc(2 * t, -12 * t, 1 * t, 0, Math.PI * 2),
      e.arc(0, -9.5 * t, 0.8 * t, 0, Math.PI * 2),
      e.fill());
  }
  function Mg(e, t, l = 0, o = !1) {
    e.save();
    const u = Math.sin(l * 2.2) * 0.12 + 0.88;
    if (
      ((e.fillStyle = "rgba(124, 45, 18, 0.28)"),
      e.beginPath(),
      e.ellipse(0, 4 * t, 14 * t, 7 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = "rgba(254, 215, 170, 0.4)"),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.ellipse(0, 4 * t, 16 * t * u, 8 * t * u, 0, 0, Math.PI * 2),
      e.stroke(),
      (e.fillStyle = "#431407"),
      e.beginPath(),
      e.ellipse(0, 2 * t, 12 * t, 6.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#7c2d12"),
      e.beginPath(),
      e.ellipse(-1 * t, 0, 10.5 * t, 5.5 * t, -0.05, 0, Math.PI * 2),
      e.fill(),
      o)
    )
      ((e.fillStyle = "#451a03"),
        e.beginPath(),
        e.ellipse(0, -1 * t, 8 * t, 4 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "rgba(14, 165, 233, 0.45)"),
        e.beginPath(),
        e.ellipse(0, -0.5 * t, 6 * t, 2.8 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = "#9a3412"),
        (e.lineWidth = 1.2 * t),
        e.beginPath(),
        e.arc(0, -1 * t, 6.5 * t, 0.3, Math.PI - 0.3),
        e.stroke());
    else {
      ((e.fillStyle = "#9a3412"),
        e.beginPath(),
        e.ellipse(0, -2 * t, 9 * t, 5 * t, 0.04, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#c2410c"),
        e.beginPath(),
        e.ellipse(-1.2 * t, -4.5 * t, 7 * t, 4.2 * t, -0.08, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#ea580c"),
        e.beginPath(),
        e.ellipse(0.5 * t, -6 * t, 5 * t, 2.8 * t, 0.05, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#9a3412"),
        e.beginPath(),
        e.ellipse(5.5 * t, -0.5 * t, 4.2 * t, 3 * t, 0.3, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#c2410c"),
        e.beginPath(),
        e.ellipse(5 * t, -1.2 * t, 3.2 * t, 2.2 * t, 0.25, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = "#7c2d12"),
        (e.lineWidth = 1.3 * t),
        e.beginPath(),
        e.arc(-1 * t, -3.5 * t, 4.5 * t, 0.4, 2.2),
        e.stroke(),
        e.beginPath(),
        e.arc(1.5 * t, -2.5 * t, 3.8 * t, 0.2, 1.8),
        e.stroke(),
        (e.fillStyle = "rgba(255, 247, 237, 0.75)"),
        e.beginPath(),
        e.ellipse(-2.2 * t, -6.8 * t, 2.4 * t, 1.1 * t, -0.2, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "rgba(254, 215, 170, 0.6)"),
        e.beginPath(),
        e.ellipse(3.8 * t, -2.5 * t, 1.6 * t, 0.8 * t, 0.3, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#15803d"),
        e.beginPath(),
        e.moveTo(-6 * t, 2 * t),
        e.quadraticCurveTo(-7.5 * t, -5 * t, -9 * t, -11 * t),
        e.quadraticCurveTo(-6.8 * t, -5 * t, -5.2 * t, 2 * t),
        e.fill(),
        (e.fillStyle = "#22c55e"),
        e.beginPath(),
        e.moveTo(-4.5 * t, 2 * t),
        e.quadraticCurveTo(-5 * t, -4 * t, -5.5 * t, -9 * t),
        e.quadraticCurveTo(-4.2 * t, -4 * t, -3.8 * t, 2 * t),
        e.fill());
      const m = -8 * t - ((l * 8) % (12 * t)),
        c = Math.sin((((l * 8) % (12 * t)) / (12 * t)) * Math.PI);
      ((e.fillStyle = `rgba(254, 215, 170, ${c * 0.75})`),
        e.beginPath(),
        e.arc(2.5 * t, m, 1.2 * t, 0, Math.PI * 2),
        e.fill());
      const f = Math.sin(l * 3.5);
      if (f > 0.6) {
        const g = (f - 0.6) / 0.4;
        ((e.fillStyle = `rgba(255, 255, 255, ${g * 0.9})`),
          e.beginPath(),
          e.arc(-1.5 * t, -7 * t, 1.5 * t, 0, Math.PI * 2),
          e.fill());
      }
    }
    e.restore();
  }
  function Cg(e, t, l = 0, o = "pote", u = 0, m = 12e4) {
    e.save();
    const c = Math.max(0, Date.now() - u),
      f = Math.min(1, Math.max(0, c / m)),
      g = f >= 1;
    ((e.fillStyle = "rgba(28, 25, 23, 0.45)"),
      e.beginPath(),
      e.ellipse(0, 3 * t, 11 * t, 5.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#78716c"),
      e.beginPath(),
      e.ellipse(0, 2.5 * t, 10 * t, 5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = "#a8a29e"),
      (e.lineWidth = 0.8 * t),
      e.stroke());
    const y = Math.round(110 + f * 84),
      w = Math.round(40 + f * 48),
      v = Math.round(15 + f * 15),
      T = `rgb(${y}, ${w}, ${v})`,
      S = `rgb(${Math.round(y * 0.65)}, ${Math.round(w * 0.65)}, ${Math.round(v * 0.65)})`,
      p = `rgb(${Math.min(255, y + 45)}, ${Math.min(255, w + 35)}, ${Math.min(255, v + 25)})`;
    o === "frasco"
      ? ((e.fillStyle = S),
        e.beginPath(),
        e.ellipse(0, 1 * t, 6.5 * t, 4 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = T),
        e.beginPath(),
        e.ellipse(0, -2 * t, 6 * t, 5.5 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = T),
        e.fillRect(-2.2 * t, -11 * t, 4.4 * t, 6 * t),
        (e.fillStyle = p),
        e.beginPath(),
        e.ellipse(0, -11 * t, 3.2 * t, 1.4 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = S),
        (e.lineWidth = 1.6 * t),
        e.beginPath(),
        e.arc(4.2 * t, -4.5 * t, 2.8 * t, -Math.PI / 2, Math.PI / 2),
        e.stroke(),
        g ||
          ((e.fillStyle = "rgba(255, 255, 255, 0.4)"),
          e.beginPath(),
          e.ellipse(-1.8 * t, -3.5 * t, 1.2 * t, 2.2 * t, -0.3, 0, Math.PI * 2),
          e.fill()))
      : o === "jarra"
        ? ((e.fillStyle = S),
          e.beginPath(),
          e.ellipse(0, 1 * t, 7 * t, 4.2 * t, 0, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = T),
          e.beginPath(),
          e.ellipse(0, -3 * t, 6.8 * t, 6.5 * t, 0, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = p),
          e.beginPath(),
          e.moveTo(-3 * t, -6 * t),
          e.lineTo(-2 * t, -12 * t),
          e.lineTo(3.5 * t, -12.5 * t),
          e.lineTo(2.5 * t, -6 * t),
          e.closePath(),
          e.fill(),
          (e.fillStyle = S),
          e.beginPath(),
          e.ellipse(0.5 * t, -12 * t, 2.8 * t, 1.2 * t, 0, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = p),
          (e.lineWidth = 1.8 * t),
          e.beginPath(),
          e.moveTo(-2 * t, -11 * t),
          e.quadraticCurveTo(-6 * t, -7 * t, -3 * t, -2 * t),
          e.stroke(),
          g ||
            ((e.fillStyle = "rgba(255, 255, 255, 0.35)"),
            e.beginPath(),
            e.ellipse(1 * t, -4 * t, 1.4 * t, 3 * t, 0.2, 0, Math.PI * 2),
            e.fill()))
        : o === "panela"
          ? ((e.fillStyle = S),
            e.beginPath(),
            e.ellipse(0, 1 * t, 8.5 * t, 4.8 * t, 0, 0, Math.PI * 2),
            e.fill(),
            (e.fillStyle = T),
            e.beginPath(),
            e.ellipse(0, -2 * t, 8.2 * t, 5 * t, 0, 0, Math.PI * 2),
            e.fill(),
            (e.fillStyle = p),
            e.beginPath(),
            e.ellipse(0, -5.5 * t, 7.8 * t, 2.6 * t, 0, 0, Math.PI * 2),
            e.fill(),
            (e.fillStyle = S),
            e.beginPath(),
            e.ellipse(0, -5.5 * t, 6.2 * t, 1.9 * t, 0, 0, Math.PI * 2),
            e.fill(),
            (e.strokeStyle = p),
            (e.lineWidth = 1.8 * t),
            e.beginPath(),
            e.arc(-7.2 * t, -3 * t, 2 * t, Math.PI / 2, -Math.PI / 2, !1),
            e.stroke(),
            e.beginPath(),
            e.arc(7.2 * t, -3 * t, 2 * t, -Math.PI / 2, Math.PI / 2, !1),
            e.stroke(),
            g ||
              ((e.fillStyle = "rgba(255, 255, 255, 0.35)"),
              e.beginPath(),
              e.ellipse(-2 * t, -2 * t, 2.5 * t, 1.2 * t, 0, 0, Math.PI * 2),
              e.fill()))
          : o === "caldeirao"
            ? ((e.fillStyle = S),
              e.fillRect(-5.5 * t, 1.5 * t, 2 * t, 2.5 * t),
              e.fillRect(3.5 * t, 1.5 * t, 2 * t, 2.5 * t),
              e.fillRect(-1 * t, 2 * t, 2 * t, 2.5 * t),
              (e.fillStyle = S),
              e.beginPath(),
              e.ellipse(0, -0.5 * t, 8.5 * t, 5.5 * t, 0, 0, Math.PI * 2),
              e.fill(),
              (e.fillStyle = T),
              e.beginPath(),
              e.ellipse(0, -2.5 * t, 8 * t, 5.2 * t, 0, 0, Math.PI * 2),
              e.fill(),
              (e.fillStyle = p),
              e.beginPath(),
              e.ellipse(0, -7 * t, 7 * t, 2.5 * t, 0, 0, Math.PI * 2),
              e.fill(),
              (e.fillStyle = S),
              e.beginPath(),
              e.ellipse(0, -7 * t, 5.5 * t, 1.8 * t, 0, 0, Math.PI * 2),
              e.fill(),
              (e.strokeStyle = p),
              (e.lineWidth = 2 * t),
              e.beginPath(),
              e.arc(-7 * t, -4 * t, 2.2 * t, Math.PI / 2, -Math.PI / 2, !1),
              e.stroke(),
              e.beginPath(),
              e.arc(7 * t, -4 * t, 2.2 * t, -Math.PI / 2, Math.PI / 2, !1),
              e.stroke(),
              g ||
                ((e.fillStyle = "rgba(255, 255, 255, 0.35)"),
                e.beginPath(),
                e.ellipse(
                  -3 * t,
                  -2.5 * t,
                  2.5 * t,
                  1.2 * t,
                  -0.2,
                  0,
                  Math.PI * 2,
                ),
                e.fill()))
            : o === "tijolo"
              ? ((e.fillStyle = S),
                e.beginPath(),
                e.moveTo(-6 * t, 2 * t),
                e.lineTo(4 * t, 3.5 * t),
                e.lineTo(7 * t, 1 * t),
                e.lineTo(-3 * t, -0.5 * t),
                e.closePath(),
                e.fill(),
                (e.fillStyle = p),
                e.beginPath(),
                e.moveTo(-6 * t, -4 * t),
                e.lineTo(4 * t, -2.5 * t),
                e.lineTo(7 * t, -5 * t),
                e.lineTo(-3 * t, -6.5 * t),
                e.closePath(),
                e.fill(),
                (e.fillStyle = T),
                e.beginPath(),
                e.moveTo(-6 * t, -4 * t),
                e.lineTo(4 * t, -2.5 * t),
                e.lineTo(4 * t, 3.5 * t),
                e.lineTo(-6 * t, 2 * t),
                e.closePath(),
                e.fill())
              : ((e.fillStyle = S),
                e.beginPath(),
                e.ellipse(0, 1 * t, 7 * t, 4.2 * t, 0, 0, Math.PI * 2),
                e.fill(),
                (e.fillStyle = T),
                e.beginPath(),
                e.ellipse(0, -2.5 * t, 7 * t, 6 * t, 0, 0, Math.PI * 2),
                e.fill(),
                (e.fillStyle = p),
                e.beginPath(),
                e.ellipse(0, -8 * t, 5 * t, 2 * t, 0, 0, Math.PI * 2),
                e.fill(),
                (e.fillStyle = S),
                e.beginPath(),
                e.ellipse(0, -8 * t, 3.8 * t, 1.4 * t, 0, 0, Math.PI * 2),
                e.fill(),
                (e.strokeStyle = S),
                (e.lineWidth = 0.9 * t),
                e.beginPath(),
                e.ellipse(0, -2 * t, 6.4 * t, 2.4 * t, 0, 0.2, Math.PI - 0.2),
                e.stroke(),
                g ||
                  ((e.fillStyle = "rgba(255, 255, 255, 0.4)"),
                  e.beginPath(),
                  e.ellipse(
                    -2.2 * t,
                    -3.5 * t,
                    1.5 * t,
                    2.5 * t,
                    -0.25,
                    0,
                    Math.PI * 2,
                  ),
                  e.fill()));
    const j = -18 * t + Math.sin(l * 2.5) * 1.5;
    if (g) {
      const P = 44 * t,
        A = 13 * t,
        x = Math.sin(l * 4) * 0.15 + 0.85;
      ((e.fillStyle = "rgba(6, 78, 59, 0.9)"),
        e.beginPath(),
        e.roundRect(-P / 2, j - A / 2, P, A, 5 * t),
        e.fill(),
        (e.strokeStyle = `rgba(52, 211, 153, ${x})`),
        (e.lineWidth = 1.2 * t),
        e.stroke(),
        (e.fillStyle = "#6ee7b7"),
        (e.font = `bold ${Math.max(9, Math.round(7.5 * t))}px sans-serif`),
        (e.textAlign = "center"),
        (e.textBaseline = "middle"),
        e.fillText("✨ Pronto [F]", 0, j));
      for (let M = 0; M < 3; M++) {
        const $ = l * 2.5 + (M * Math.PI * 2) / 3,
          z = Math.cos($) * (9 * t),
          K = Math.sin($) * (5 * t) - 3 * t;
        ((e.fillStyle = "#fde047"),
          e.beginPath(),
          e.arc(z, K, 1.2 * t, 0, Math.PI * 2),
          e.fill());
      }
    }
    e.restore();
  }
  function Pg(e, t, l, o = !0, u) {
    (e.save(),
      (e.fillStyle = "rgba(15, 23, 42, 0.45)"),
      e.beginPath(),
      e.ellipse(0, 4 * t, 15 * t, 7 * t, 0, 0, Math.PI * 2),
      e.fill());
    const m = 2 * t;
    for (let f = 0; f < Math.PI * 2; f += Math.PI / 5) {
      const g = Math.cos(f) * 11.5 * t,
        y = Math.sin(f) * 5.2 * t + m;
      ((e.fillStyle = "#292524"),
        e.beginPath(),
        e.arc(g, y + 0.8 * t, 3.8 * t, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#57534e"),
        e.beginPath(),
        e.arc(g, y, 3.2 * t, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#78716c"),
        e.beginPath(),
        e.arc(g - 0.7 * t, y - 0.7 * t, 2 * t, 0, Math.PI * 2),
        e.fill());
    }
    const c = e.createRadialGradient(-3 * t, -6 * t, 2 * t, 0, -3 * t, 14 * t);
    if (
      (c.addColorStop(0, "#ea580c"),
      c.addColorStop(0.4, "#c2410c"),
      c.addColorStop(0.85, "#9a3412"),
      c.addColorStop(1, "#431407"),
      (e.fillStyle = c),
      e.beginPath(),
      e.moveTo(-11 * t, 3 * t),
      e.quadraticCurveTo(-12 * t, -10 * t, 0, -13 * t),
      e.quadraticCurveTo(12 * t, -10 * t, 11 * t, 3 * t),
      e.quadraticCurveTo(0, 5 * t, -11 * t, 3 * t),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "rgba(67, 20, 7, 0.4)"),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.ellipse(0, -4 * t, 9 * t, 3.5 * t, 0, 0, Math.PI),
      e.stroke(),
      (e.fillStyle = "#7c2d12"),
      e.beginPath(),
      e.rect(-2.8 * t, -17.5 * t, 5.6 * t, 6 * t),
      e.fill(),
      (e.strokeStyle = "#431407"),
      (e.lineWidth = 1 * t),
      e.stroke(),
      (e.fillStyle = "#9a3412"),
      e.beginPath(),
      e.ellipse(0, -17.5 * t, 3.6 * t, 1.4 * t, 0, 0, Math.PI * 2),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#1c1917"),
      e.beginPath(),
      e.ellipse(0, -17.5 * t, 2.4 * t, 0.9 * t, 0, 0, Math.PI * 2),
      e.fill(),
      o)
    )
      for (let f = 0; f < 3; f++) {
        const g = (l * 1.8 + f * 1.2) % 3,
          y = -18 * t - g * 6 * t,
          w = Math.sin(l * 2 + f) * 2 * t + g * 1.5 * t,
          v = (1.8 + g * 1.5) * t,
          T = Math.max(0, 0.35 - (g / 3) * 0.35);
        ((e.fillStyle = `rgba(214, 211, 209, ${T})`),
          e.beginPath(),
          e.arc(w, y, v, 0, Math.PI * 2),
          e.fill());
      }
    if (
      ((e.strokeStyle = "#7c2d12"),
      (e.lineWidth = 2 * t),
      e.beginPath(),
      e.moveTo(-5.5 * t, 3 * t),
      e.quadraticCurveTo(-5.5 * t, -5 * t, 0, -5.5 * t),
      e.quadraticCurveTo(5.5 * t, -5 * t, 5.5 * t, 3 * t),
      e.stroke(),
      (e.fillStyle = "#1c1917"),
      e.beginPath(),
      e.moveTo(-4.5 * t, 3 * t),
      e.quadraticCurveTo(-4.5 * t, -4.5 * t, 0, -4.8 * t),
      e.quadraticCurveTo(4.5 * t, -4.5 * t, 4.5 * t, 3 * t),
      e.closePath(),
      e.fill(),
      o)
    ) {
      const f = Math.sin(l * 8) * 0.15,
        g = e.createRadialGradient(0, 1 * t, 1 * t, 0, 0, 6 * t);
      (g.addColorStop(0, `rgba(254, 240, 138, ${0.9 + f})`),
        g.addColorStop(0.3, `rgba(249, 115, 22, ${0.85 + f})`),
        g.addColorStop(0.7, "rgba(220, 38, 38, 0.7)"),
        g.addColorStop(1, "rgba(0, 0, 0, 0)"),
        (e.fillStyle = g),
        e.beginPath(),
        e.ellipse(0, 1 * t, 4.2 * t, 3.2 * t, 0, 0, Math.PI * 2),
        e.fill());
      const y = (3.5 + Math.sin(l * 12) * 1.2) * t,
        w = (2.2 + Math.cos(l * 10) * 0.6) * t;
      ((e.fillStyle = "#fef08a"),
        e.beginPath(),
        e.moveTo(-w * 0.6, 2 * t),
        e.quadraticCurveTo(-w * 0.3, -y * 0.4, 0, -y),
        e.quadraticCurveTo(w * 0.3, -y * 0.4, w * 0.6, 2 * t),
        e.closePath(),
        e.fill());
      const v = e.createRadialGradient(0, 3.5 * t, 1 * t, 0, 4.5 * t, 9 * t);
      (v.addColorStop(0, "rgba(251, 146, 60, 0.35)"),
        v.addColorStop(1, "rgba(251, 146, 60, 0)"),
        (e.fillStyle = v),
        e.beginPath(),
        e.ellipse(0, 4.5 * t, 9 * t, 3.5 * t, 0, 0, Math.PI * 2),
        e.fill());
    }
    if (u && u.fishItem) {
      const f = Date.now() - u.startTime,
        g = Math.min(1, f / u.durationMs);
      ((e.strokeStyle = "#18181b"),
        (e.lineWidth = 1.4 * t),
        e.beginPath(),
        e.moveTo(-4 * t, 1.8 * t),
        e.lineTo(4 * t, 1.8 * t),
        e.stroke(),
        e.save(),
        e.translate(0, 1 * t));
      const y = g >= 1 ? "#78350f" : "#ea580c";
      if (
        ((e.fillStyle = y),
        e.beginPath(),
        e.ellipse(0, 0, 3.5 * t, 1.3 * t, 0, 0, Math.PI * 2),
        e.fill(),
        o)
      ) {
        const S = (l * 3) % 2;
        ((e.fillStyle = "rgba(255, 255, 255, 0.5)"),
          e.beginPath(),
          e.arc(
            Math.sin(l * 4) * 1.5 * t,
            -2 * t - S * 3 * t,
            1 * t,
            0,
            Math.PI * 2,
          ),
          e.fill());
      }
      e.restore();
      const w = 28 * t,
        v = 4 * t,
        T = -24 * t;
      if (
        ((e.fillStyle = "rgba(0, 0, 0, 0.85)"),
        e.beginPath(),
        e.roundRect(-w / 2 - 2 * t, T - 2 * t, w + 4 * t, v + 4 * t, 3 * t),
        e.fill(),
        (e.strokeStyle = g >= 1 ? "#22c55e" : "#f59e0b"),
        (e.lineWidth = 1 * t),
        e.stroke(),
        (e.fillStyle = g >= 1 ? "#22c55e" : "#f59e0b"),
        e.beginPath(),
        e.roundRect(-w / 2, T, w * g, v, 2 * t),
        e.fill(),
        (e.font = `bold ${Math.max(8, Math.round(7.5 * t))}px monospace`),
        (e.textAlign = "center"),
        (e.textBaseline = "bottom"),
        g >= 1)
      )
        ((e.fillStyle = "#4ade80"),
          e.fillText("🐟 [F] Coletar Assado!", 0, T - 3 * t));
      else {
        const S = Math.max(0, Math.ceil((u.durationMs - f) / 1e3));
        ((e.fillStyle = "#fef08a"),
          e.fillText(`🔥 Assando (${S}s)`, 0, T - 3 * t));
      }
    }
    e.restore();
  }
  // [PERF/FIX] Gradientes dos paredoes criados uma unica vez por altura (antes: estas duas funcoes eram
  // chamadas mas NAO existiam em nenhum arquivo -> ReferenceError ao desenhar qualquer paredao com face externa).
  // Cores reconstruidas com a paleta slate dos paredoes vizinhos (oeste/leste/platô).
  const _cliffGradCache = new Map();
  function getCliffWallFaceGradient(e, y0, y1) {
    const key = "f" + y0.toFixed(2) + "|" + y1.toFixed(2);
    let g = _cliffGradCache.get(key);
    if (!g) {
      g = e.createLinearGradient(0, y0, 0, y1);
      g.addColorStop(0, "#64748b");
      g.addColorStop(0.35, "#475569");
      g.addColorStop(0.8, "#334155");
      g.addColorStop(1, "#1e293b");
      _cliffGradCache.set(key, g);
    }
    return g;
  }
  function getCliffNorthGradient(e, y0, y1) {
    const key = "n" + y0.toFixed(2) + "|" + y1.toFixed(2);
    let g = _cliffGradCache.get(key);
    if (!g) {
      g = e.createLinearGradient(0, y0, 0, y1);
      g.addColorStop(0, "#0f172a");
      g.addColorStop(0.65, "#334155");
      g.addColorStop(1, "#475569");
      _cliffGradCache.set(key, g);
    }
    return g;
  }
  function drawCliffWall25D(e, t, l = 1, o = 0.5, u = 0, neighbors = null) {
    e.save();
    // nL, nR, nT, nB = true quando o tile vizinho faz parte do platô elevado (seja outro paredão ou o chão interno de MOUNTAIN_25D)
    // Assim, o lado interno NUNCA tem queda/parede nem sombra: o topo do paredão se funde 100% no mesmo nível do interior!
    const nL = !!(neighbors && neighbors.left),
      nR = !!(neighbors && neighbors.right),
      nT = !!(neighbors && neighbors.top),
      nB = !!(neighbors && neighbors.bottom),
      nTL = !!(neighbors && neighbors.topLeft),
      nTR = !!(neighbors && neighbors.topRight),
      nBL = !!(neighbors && neighbors.bottomLeft),
      nBR = !!(neighbors && neighbors.bottomRight);

    const halfTile = 18 * t,
      // Sangria de 1.5px para dentro de qualquer lado conectado ao platô/paredão para zero frestas
      leftX = nL ? -halfTile - 1.5 * t : -halfTile + 0.5 * t,
      rightX = nR ? halfTile + 1.5 * t : halfTile - 0.5 * t,
      fullW = rightX - leftX,
      // Paredão 4x maior na face externa (112px de altura monumental 2.5D)!
      hWall = 112 * t,
      baseY = 18 * t + (nB ? 0 : 94 * t),
      topY = 18 * t - 18 * t,
      platBackY = -halfTile - 1.5 * t,
      platFrontY = halfTile + 1.5 * t;

    // Chanfros apenas nas quinas externas livres (que dão para fora do bioma)
    const bevelL = nL || nT ? 0 : 6 * t,
      bevelR = nR || nT ? 0 : 6 * t;

    // 1. Sombra de Base externa gigante (APENAS quando o sul é fora do bioma: !nB)
    if (!nB) {
      e.fillStyle = "rgba(2, 6, 23, 0.52)";
      e.beginPath();
      if (nL && nR) {
        e.fillRect(leftX, baseY - 4 * t, fullW, 22 * t);
      } else {
        e.roundRect(
          leftX,
          baseY - 4 * t,
          fullW,
          24 * t,
          [0, 0, nR ? 0 : 10 * t, nL ? 0 : 10 * t],
        );
        e.fill();
      }
    }

    // 2. Face Vertical Rochosa Exposta 4x MAIOR (APENAS onde há queda para fora do bioma!)
    // O topo do paredão fica em platFrontY (18*t), conectado com o interior do bioma,
    // e a parede colossal desce 4x (até baseY = 112*t) para fora do bioma!
    if (!nB) {
      const faceTopY = platFrontY - 2 * t;
      const faceBottomY = baseY;
      // Bitmap pré-assado: gradiente vertical da face reutilizado (identico em todos os tiles),
      // criado uma unica vez por espessura de tile em vez de a cada frame (ver OTIMIZACAO-DESEMPENHO-v2.md)
      const wallGrad = getCliffWallFaceGradient(e, faceTopY, faceBottomY);
      e.fillStyle = wallGrad;
      e.beginPath();
      e.moveTo(leftX, faceBottomY);
      e.lineTo(leftX, faceTopY + bevelL);
      e.lineTo(leftX + bevelL, faceTopY);
      e.lineTo(rightX - bevelR, faceTopY);
      e.lineTo(rightX, faceTopY + bevelR);
      e.lineTo(rightX, faceBottomY);
      e.closePath();
      e.fill();

      // Pontes diagonais externas (4x maiores para acompanhar a parede colossal)
      if (!nL && nTL) {
        e.fillStyle = wallGrad;
        e.fillRect(-halfTile - 18 * t, faceTopY - 18 * t, 22 * t, 64 * t);
      }
      if (!nR && nTR) {
        e.fillStyle = wallGrad;
        e.fillRect(halfTile - 4 * t, faceTopY - 18 * t, 22 * t, 64 * t);
      }
      if (!nL && nBL) {
        e.fillStyle = wallGrad;
        e.fillRect(-halfTile - 18 * t, faceTopY + 12 * t, 22 * t, 80 * t);
      }
      if (!nR && nBR) {
        e.fillStyle = wallGrad;
        e.fillRect(halfTile - 4 * t, faceTopY + 12 * t, 22 * t, 80 * t);
      }

      // 5 faixas de estratos geológicos e fendas ao longo da altura 4x da parede
      const faceH = faceBottomY - faceTopY;
      e.strokeStyle = "rgba(15, 23, 42, 0.58)";
      e.lineWidth = 1.8 * t;
      e.beginPath();
      for (let i = 1; i <= 4; i++) {
        const sy = faceTopY + faceH * (i * 0.2);
        e.moveTo(leftX + (nL ? 0 : 1.5 * t), sy);
        e.lineTo(-5 * t, sy + (i % 2 === 0 ? -2.2 : 2.2) * t);
        e.lineTo(6 * t, sy + (i % 2 === 0 ? 1.8 : -1.8) * t);
        e.lineTo(rightX - (nR ? 0 : 1.5 * t), sy);
      }

      const vx = (o - 0.5) * 12 * t;
      e.moveTo(vx, faceTopY + 3 * t);
      e.lineTo(vx - 3.5 * t, faceTopY + faceH * 0.33);
      e.lineTo(vx + 2.5 * t, faceTopY + faceH * 0.66);
      e.lineTo(vx - 1.5 * t, faceBottomY - 4 * t);
      e.stroke();

      e.fillStyle = "rgba(148, 163, 184, 0.24)";
      e.fillRect(leftX + 2 * t, faceTopY + faceH * 0.2 - 3 * t, fullW * 0.45, 2.8 * t);
      e.fillRect(1 * t, faceTopY + faceH * 0.6 - 3 * t, fullW * 0.4, 2.5 * t);

      // Rodapé escuro na base externa sul
      e.fillStyle = "rgba(9, 13, 22, 0.65)";
      e.fillRect(leftX, faceBottomY - 6 * t, fullW, 6 * t);
    }

    // 3. Platô Superior 2.5D Contínuo — EXATAMENTE na mesma cor (#64748b) e nível do chão interno de MOUNTAIN_25D!
    // Assim, o topo do paredão é a continuação direta e nivelada do terreno interno do bioma!
    e.fillStyle = "#64748b";
    e.fillRect(leftX, platBackY, fullW, platFrontY - platBackY);

    // Textura idêntica à do chão interno do platô para fusão visual perfeita
    e.fillStyle = "rgba(30, 41, 59, 0.26)";
    const platMidY = (platBackY + platFrontY) * 0.5;
    e.fillRect(leftX + 4 * t, platMidY - 1.5 * t, fullW - 8 * t, 2 * t);
    e.fillStyle = "rgba(241, 245, 249, 0.22)";
    e.fillRect(leftX + 5 * t, platMidY - 2.7 * t, fullW - 10 * t, 1.2 * t);

    // 4. Bordas / Escarpas 4x maiores nas laterais que dão para FORA do bioma (Norte, Oeste, Leste, Sul)
    if (!nT) {
      const northCliffH = 24 * t;
      // Bitmap pre-assado: gradiente vertical da escarpa norte (identico em todos os tiles)
      const nGrad = getCliffNorthGradient(e, platBackY - northCliffH, platBackY - northCliffH + northCliffH + 5 * t);
      e.fillStyle = nGrad;
      e.fillRect(leftX, platBackY - northCliffH, fullW, northCliffH + 2 * t);
      e.strokeStyle = "#e2e8f0";
      e.lineWidth = 2.4 * t;
      e.beginPath();
      e.moveTo(leftX, platBackY + 1 * t);
      e.lineTo(rightX, platBackY + 1 * t);
      e.stroke();
    }

    if (!nL) {
      const westCliffW = 24 * t;
      const wGrad = e.createLinearGradient(leftX - westCliffW, 0, leftX + 3 * t, 0);
      wGrad.addColorStop(0, "#0f172a");
      wGrad.addColorStop(0.65, "#334155");
      wGrad.addColorStop(1, "#475569");
      e.fillStyle = wGrad;
      e.fillRect(leftX - westCliffW, platBackY, westCliffW + 2 * t, (nB ? platFrontY : baseY) - platBackY);
      e.strokeStyle = "#e2e8f0";
      e.lineWidth = 2.4 * t;
      e.beginPath();
      e.moveTo(leftX + 1 * t, platBackY);
      e.lineTo(leftX + 1 * t, platFrontY);
      e.stroke();
    }

    if (!nR) {
      const eastCliffW = 24 * t;
      const eGrad = e.createLinearGradient(rightX - 3 * t, 0, rightX + eastCliffW, 0);
      eGrad.addColorStop(0, "#475569");
      eGrad.addColorStop(0.35, "#1e293b");
      eGrad.addColorStop(1, "#0f172a");
      e.fillStyle = eGrad;
      e.fillRect(rightX - 2 * t, platBackY, eastCliffW + 2 * t, (nB ? platFrontY : baseY) - platBackY);
      e.strokeStyle = "#cbd5e1";
      e.lineWidth = 2.4 * t;
      e.beginPath();
      e.moveTo(rightX - 1 * t, platBackY);
      e.lineTo(rightX - 1 * t, platFrontY);
      e.stroke();
    }

    // Se o Sul é fora do bioma (!nB), desenha a crista iluminada frontal onde o platô encontra o topo da parede vertical sul
    if (!nB) {
      e.strokeStyle = "#e2e8f0";
      e.lineWidth = 2.8 * t;
      e.beginPath();
      e.moveTo(leftX, platFrontY - 1 * t);
      e.lineTo(rightX, platFrontY - 1 * t);
      e.stroke();
    }

    e.restore();
  }

  function drawCliffRamp25D(e, t, upperTier = 1, lowerTier = 0, rampDir = "up", neighbors = null) {
    e.save();
    const halfTile = 18 * t,
      floor = Math.max(1, Math.min(5, upperTier || 1)),
      hWall = (25 + floor * 3.5) * t,
      baseY = 18 * t,
      topY = baseY - hWall,
      nL = !!(neighbors && neighbors.leftWall),
      nR = !!(neighbors && neighbors.rightWall),
      nT = !!(neighbors && neighbors.topRamp),
      nB = !!(neighbors && neighbors.bottomRamp);

    // Cores do andar inferior (base da rampa) e do andar superior (topo da rampa)
    const getTierColor = (tr) =>
      tr >= 5
        ? "#e2e8f0"
        : tr === 4
          ? "#cbd5e1"
          : tr === 3
            ? "#94a3b8"
            : tr === 2
              ? "#64748b"
              : tr === 1
                ? "#475569"
                : "#57534e";
    const upperCol = getTierColor(floor);
    const lowerCol = getTierColor(lowerTier);

    // A rampa 2.5D começa no nível do chão do andar inferior (baseY) e sobe inclinada na altura 2.5D
    // até encontrar a altura exata do platô do andar superior (topY), conectando visualmente os dois andares!
    const rampTopY = nT ? -halfTile - 2 * t : topY + 2 * t;
    const rampBotY = baseY;
    const rampLeftX = -halfTile;
    const rampRightX = halfTile;
    const rampW = rampRightX - rampLeftX;
    const rampH = rampBotY - rampTopY;

    // 1. Paredes laterais de sustentação da rampa (conectando com o paredão ao lado)
    e.fillStyle = "#1e293b";
    e.beginPath();
    e.moveTo(rampLeftX, rampBotY);
    e.lineTo(rampLeftX, rampTopY);
    e.lineTo(rampRightX, rampTopY);
    e.lineTo(rampRightX, rampBotY);
    e.closePath();
    e.fill();

    // 2. Superfície inclinada da rampa (gradiente contínuo do andar inferior até a cor do andar superior no topo)
    const slopeGrad = e.createLinearGradient(0, rampTopY, 0, rampBotY);
    if (rampDir === "down") {
      slopeGrad.addColorStop(0, lowerCol);
      slopeGrad.addColorStop(0.5, "#64748b");
      slopeGrad.addColorStop(1, upperCol);
    } else {
      slopeGrad.addColorStop(0, upperCol);
      slopeGrad.addColorStop(0.55, "#64748b");
      slopeGrad.addColorStop(1, lowerCol);
    }
    e.fillStyle = slopeGrad;
    e.fillRect(rampLeftX + 2.5 * t, rampTopY, rampW - 5 * t, rampH);

    // 3. Degraus 3D esculpidos em perspectiva subindo do andar inferior até o topo do paredão
    const stepCount = 6;
    const stepH = rampH / stepCount;
    for (let i = 0; i < stepCount; i++) {
      const sy = rampBotY - (i + 1) * stepH;
      const stepProgress = (i + 1) / stepCount;
      // Face vertical do degrau (espelho do degrau)
      e.fillStyle = "rgba(15, 23, 42, 0.62)";
      e.fillRect(rampLeftX + 3 * t, sy + stepH * 0.52, rampW - 6 * t, stepH * 0.48);

      // Piso do degrau (mais claro conforme sobe para o andar superior)
      e.fillStyle =
        stepProgress > 0.65
          ? upperCol
          : stepProgress > 0.35
            ? "#94a3b8"
            : lowerCol;
      e.fillRect(rampLeftX + 3 * t, sy, rampW - 6 * t, stepH * 0.56);

      // Quina iluminada de cada degrau
      e.fillStyle = floor >= 4 ? "rgba(255, 255, 255, 0.7)" : "rgba(241, 245, 249, 0.5)";
      e.fillRect(rampLeftX + 3 * t, sy, rampW - 6 * t, 1.3 * t);
    }

    // 4. Parapeitos / Muretas laterais em rampa que acompanham a inclinação do andar inferior ao superior
    // Mureta esquerda
    const curbGradL = e.createLinearGradient(0, rampTopY, 0, rampBotY);
    curbGradL.addColorStop(0, upperCol);
    curbGradL.addColorStop(1, "#334155");
    e.fillStyle = curbGradL;
    e.fillRect(rampLeftX, rampTopY, 3.8 * t, rampH);
    e.strokeStyle = "#e2e8f0";
    e.lineWidth = 1.2 * t;
    e.beginPath();
    e.moveTo(rampLeftX + 3.6 * t, rampTopY);
    e.lineTo(rampLeftX + 3.6 * t, rampBotY);
    e.stroke();

    // Mureta direita
    e.fillStyle = curbGradL;
    e.fillRect(rampRightX - 3.8 * t, rampTopY, 3.8 * t, rampH);
    e.strokeStyle = "#0f172a";
    e.lineWidth = 1.2 * t;
    e.beginPath();
    e.moveTo(rampRightX - 3.6 * t, rampTopY);
    e.lineTo(rampRightX - 3.6 * t, rampBotY);
    e.stroke();

    // 5. Patamar de chegada no topo (encaixe perfeito com o piso do andar superior)
    if (!nT) {
      e.fillStyle = upperCol;
      e.fillRect(rampLeftX + 2 * t, rampTopY - 3 * t, rampW - 4 * t, 5 * t);
      e.strokeStyle = floor >= 4 ? "#ffffff" : "#e2e8f0";
      e.lineWidth = 1.8 * t;
      e.beginPath();
      e.moveTo(rampLeftX + 2 * t, rampTopY + 1 * t);
      e.lineTo(rampRightX - 2 * t, rampTopY + 1 * t);
      e.stroke();
    }

    // 6. Soleira de entrada na base (encaixe com o andar inferior)
    if (!nB) {
      e.fillStyle = "rgba(15, 23, 42, 0.38)";
      e.fillRect(rampLeftX + 2 * t, rampBotY - 2 * t, rampW - 4 * t, 3.5 * t);
    }

    e.restore();
  }

  // =========================================================================
  // ELEMENTOS DO CALABOUÇO E MASMORRAS SUBTERRÂNEAS (ANDAR INFERIOR)
  // =========================================================================

  function drawDungeonStaircase(e, t = 1, isUp = !1, animTimer = 0) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    const wMul = 1.15;
    const hMul = 1.15;

    if (isUp) {
      // 1. Auréola de luz dourada irradiando no piso em frente à escadaria
      const floorGlow = e.createRadialGradient(0, 8 * t, 3 * t, 0, 8 * t, 36 * wMul * t);
      floorGlow.addColorStop(0, "rgba(251, 191, 36, 0.65)");
      floorGlow.addColorStop(0.45, "rgba(245, 158, 11, 0.35)");
      floorGlow.addColorStop(0.75, "rgba(234, 88, 12, 0.12)");
      floorGlow.addColorStop(1, "rgba(15, 23, 42, 0)");
      e.fillStyle = floorGlow;
      e.beginPath();
      e.ellipse(0, 9 * t, 36 * wMul * t, 16 * t, 0, 0, Math.PI * 2);
      e.fill();

      // 2. Base e reentrância do pórtico na muralha de pedra
      e.fillStyle = "rgba(2, 6, 23, 0.85)";
      e.fillRect(-26 * wMul * t, -36 * hMul * t, 52 * wMul * t, (36 * hMul + 14) * t);

      // Pilares laterais maciços de granito chanfrado
      e.fillStyle = "#334155";
      e.fillRect(-26 * wMul * t, -36 * hMul * t, 7 * wMul * t, (36 * hMul + 12) * t);
      e.fillRect(19 * wMul * t, -36 * hMul * t, 7 * wMul * t, (36 * hMul + 12) * t);

      // Chanfros e relevos das pilastras
      e.fillStyle = "#475569";
      e.fillRect(-25 * wMul * t, -35 * hMul * t, 5 * wMul * t, (35 * hMul + 10) * t);
      e.fillRect(20 * wMul * t, -35 * hMul * t, 5 * wMul * t, (35 * hMul + 10) * t);

      // 3. Feixe de luz celestial/dourada que desce dos salões superiores do subsolo
      const beamPulse = Math.sin((animTimer || 0) * 4) * 0.08 + 0.38;
      const beamGrad = e.createLinearGradient(0, -32 * hMul * t, 0, 8 * t);
      beamGrad.addColorStop(0, `rgba(254, 240, 138, ${beamPulse * 1.5})`);
      beamGrad.addColorStop(0.4, `rgba(251, 191, 36, ${beamPulse})`);
      beamGrad.addColorStop(0.85, `rgba(245, 158, 11, ${beamPulse * 0.5})`);
      beamGrad.addColorStop(1, "rgba(217, 119, 6, 0.05)");
      e.fillStyle = beamGrad;
      e.beginPath();
      e.moveTo(-16 * wMul * t, -32 * hMul * t);
      e.lineTo(16 * wMul * t, -32 * hMul * t);
      e.lineTo(22 * wMul * t, 8 * t);
      e.lineTo(-22 * wMul * t, 8 * t);
      e.closePath();
      e.fill();

      // 4. Degraus de cantaria ascendentes iluminados
      const numSteps = 9;
      for (let s = 0; s < numSteps; s++) {
        const r0 = s / numSteps;
        const r1 = (s + 1) / numSteps;
        const yBottom = (8 - r0 * (34 * hMul)) * t;
        const yTop = (8 - r1 * (34 * hMul)) * t;
        const stepH = Math.max(2.5 * t, yBottom - yTop);
        const halfW0 = (17.5 - r0 * 4.5) * wMul * t;
        const halfW1 = (17.5 - r1 * 4.5) * wMul * t;

        // Espelho do degrau
        const riserLum = Math.round(70 + r0 * 95);
        e.fillStyle = `rgb(${riserLum + 12}, ${riserLum + 8}, ${riserLum})`;
        e.fillRect(-halfW0, yBottom - stepH * 0.55, halfW0 * 2, stepH * 0.55);

        // Piso do degrau com destaque de iluminação
        const treadLum = Math.round(130 + r1 * 100);
        e.fillStyle = `rgb(${Math.min(255, treadLum + 20)}, ${Math.min(255, treadLum + 16)}, ${treadLum})`;
        e.fillRect(-halfW1, yTop, halfW1 * 2, stepH * 0.52);

        // Friso dourado polido na quina do degrau
        e.fillStyle = `rgba(254, 240, 138, ${0.45 + r1 * 0.45})`;
        e.fillRect(-halfW1, yTop, halfW1 * 2, 1.2 * t);
      }

      // 5. Corrimãos pesados de latão polido e ferro forjado
      e.strokeStyle = "#fbbf24";
      e.lineWidth = 1.8 * t;
      e.beginPath();
      e.moveTo(-18 * wMul * t, 8 * t);
      e.lineTo(-13 * wMul * t, -32 * hMul * t);
      e.moveTo(18 * wMul * t, 8 * t);
      e.lineTo(13 * wMul * t, -32 * hMul * t);
      e.stroke();

      // 6. Arco Superior / Verga de cantaria com arco
      e.fillStyle = "#1e293b";
      e.fillRect(-27 * wMul * t, -40 * hMul * t, 54 * wMul * t, 8 * hMul * t);
      e.fillStyle = "#334155";
      e.fillRect(-26 * wMul * t, -39 * hMul * t, 52 * wMul * t, 6 * hMul * t);
      e.strokeStyle = "#64748b";
      e.lineWidth = 1.2 * t;
      e.strokeRect(-26 * wMul * t, -39 * hMul * t, 52 * wMul * t, 6 * hMul * t);

      // 7. Placa de Pedra com inscrição entalhada em relevo dourado
      e.fillStyle = "#090d16";
      e.fillRect(-19 * wMul * t, -37.5 * hMul * t, 38 * wMul * t, 5 * hMul * t);
      e.strokeStyle = "#f59e0b";
      e.lineWidth = 1.2 * t;
      e.strokeRect(-19 * wMul * t, -37.5 * hMul * t, 38 * wMul * t, 5 * hMul * t);

      // Texto entalhado na pedra: "▲ SUBSOLO I ▲"
      e.fillStyle = "#fef08a";
      e.font = `bold ${Math.round(4.5 * t)}px monospace`;
      e.textAlign = "center";
      e.textBaseline = "middle";
      e.fillText("▲ SUBSOLO I ▲", 0, -35 * hMul * t);

      // 8. Tochas gêmeas flamejantes de ferro forjado nas pilastras laterais
      const torchFlicker = Math.sin((animTimer || 0) * 8) * 0.18;
      for (const side of [-1, 1]) {
        const tx = side * 22 * wMul * t;
        const ty = -14 * t;
        // Suporte de ferro
        e.fillStyle = "#0f172a";
        e.fillRect(tx - 1.5 * t, ty - 6 * t, 3 * t, 8 * t);
        e.fillRect(tx - (side > 0 ? 3 : 0) * t, ty, 3 * t, 2 * t);
        // Cesta da tocha
        e.fillStyle = "#78350f";
        e.fillRect(tx - 2.5 * t, ty - 8 * t, 5 * t, 3.5 * t);

        // Halo de luz da tocha
        const tHalo = e.createRadialGradient(tx, ty - 9 * t, 1 * t, tx, ty - 9 * t, 12 * t);
        tHalo.addColorStop(0, "rgba(254, 240, 138, 0.85)");
        tHalo.addColorStop(0.5, "rgba(249, 115, 22, 0.45)");
        tHalo.addColorStop(1, "rgba(249, 115, 22, 0)");
        e.fillStyle = tHalo;
        e.beginPath();
        e.arc(tx, ty - 9 * t, 12 * t, 0, Math.PI * 2);
        e.fill();

        // Chama viva
        e.fillStyle = `rgba(249, 115, 22, ${0.9 + torchFlicker})`;
        e.beginPath();
        e.arc(tx, ty - 9.5 * t, 3.2 * t, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#fef08a";
        e.beginPath();
        e.arc(tx, ty - 9.5 * t, 1.6 * t, 0, Math.PI * 2);
        e.fill();
      }

      // 9. Sinalizador / Indicador luminoso flutuante no topo
      const beaconFloat = Math.sin((animTimer || 0) * 5) * 2 * t;
      const beaconAlpha = Math.sin((animTimer || 0) * 4) * 0.2 + 0.8;
      e.fillStyle = `rgba(251, 191, 36, ${beaconAlpha})`;
      e.font = `bold ${Math.round(8 * t)}px monospace`;
      e.textAlign = "center";
      e.textBaseline = "middle";
      e.fillText("▲", 0, (-44 * hMul * t) + beaconFloat);
    } else {
      // Escadaria que DESCE para o calabouço (poço escuro profundo com névoa sombria, tochas vivas e ferro forjado)
      e.fillStyle = "rgba(2, 6, 23, 0.65)";
      e.fillRect(-26 * wMul * t, -26 * hMul * t, 52 * wMul * t, (26 * hMul + 12) * t);

      // Moldura externa pesada de cantaria de granito escuro chanfrado
      e.fillStyle = "#1e293b";
      e.fillRect(-24 * wMul * t, -24 * hMul * t, 48 * wMul * t, (24 * hMul + 10) * t);
      e.fillStyle = "#334155";
      e.fillRect(-23 * wMul * t, -23 * hMul * t, 46 * wMul * t, (23 * hMul + 8) * t);
      e.strokeStyle = "#0f172a";
      e.lineWidth = 1.6 * t;
      e.strokeRect(-23 * wMul * t, -23 * hMul * t, 46 * wMul * t, (23 * hMul + 8) * t);

      // Frisos de blocos de cantaria talhados na moldura
      e.strokeStyle = "rgba(15, 23, 42, 0.75)";
      e.lineWidth = 1 * t;
      for (let by = -20; by <= 6; by += 7) {
        e.beginPath();
        e.moveTo(-23 * wMul * t, by * hMul * t);
        e.lineTo(-17 * wMul * t, by * hMul * t);
        e.moveTo(17 * wMul * t, by * hMul * t);
        e.lineTo(23 * wMul * t, by * hMul * t);
        e.stroke();
      }

      // Parapeitos e balaustradas de ferro negro forjado nas bordas
      e.fillStyle = "#09090b";
      e.fillRect(-22 * wMul * t, -26 * hMul * t, 44 * wMul * t, 4.5 * t);
      e.fillRect(-22 * wMul * t, -24 * hMul * t, 4.5 * wMul * t, (24 * hMul + 6) * t);
      e.fillRect(17.5 * wMul * t, -24 * hMul * t, 4.5 * wMul * t, (24 * hMul + 6) * t);

      // Pontas afiadas / lanças de ferro forjado no topo do parapeito
      e.fillStyle = "#475569";
      for (let px = -18; px <= 18; px += 4.5) {
        e.beginPath();
        e.moveTo(px * wMul * t, -26 * hMul * t);
        e.lineTo((px + 1) * wMul * t, -30 * hMul * t);
        e.lineTo((px + 2) * wMul * t, -26 * hMul * t);
        e.closePath();
        e.fill();
      }

      // Vão central do fosso
      const innerW = 31 * wMul * t;
      const innerX = -15.5 * wMul * t;
      const innerTopY = -21 * hMul * t;
      const innerH = (21 * hMul + 7) * t;

      // Gradiente abissal com toque avermelhado/sombrio do calabouço
      const voidGrad = e.createLinearGradient(0, innerTopY, 0, innerTopY + innerH);
      voidGrad.addColorStop(0, "#020617");
      voidGrad.addColorStop(0.4, "#09090b");
      voidGrad.addColorStop(0.8, "#1a0b16");
      voidGrad.addColorStop(1, "#2e1022");
      e.fillStyle = voidGrad;
      e.fillRect(innerX, innerTopY, innerW, innerH);

      // Brilho pulsante sutil que emana das profundezas (câmara de tortura/brasas lá embaixo)
      const glowPulse = Math.sin((animTimer || 0) * 3) * 0.08 + 0.18;
      const depthGlow = e.createRadialGradient(0, innerTopY + 4 * t, 2 * t, 0, innerTopY + 6 * t, 16 * wMul * t);
      depthGlow.addColorStop(0, `rgba(225, 29, 72, ${glowPulse * 1.4})`);
      depthGlow.addColorStop(0.5, `rgba(180, 83, 9, ${glowPulse * 0.8})`);
      depthGlow.addColorStop(1, "rgba(2, 6, 23, 0)");
      e.fillStyle = depthGlow;
      e.beginPath();
      e.ellipse(0, innerTopY + 5 * t, 15 * wMul * t, 8 * t, 0, 0, Math.PI * 2);
      e.fill();

      // Degraus descendentes na escuridão
      const numSteps = 8;
      for (let s = 0; s < numSteps; s++) {
        const ratio = s / numSteps;
        const nextRatio = (s + 1) / numSteps;
        const stepY1 = 6 * t - ratio * (25 * hMul * t);
        const stepY2 = 6 * t - nextRatio * (25 * hMul * t);
        const stepH = Math.max(1.8 * t, stepY1 - stepY2);
        const inset = ratio * 4.2 * wMul * t;
        const sx = innerX + inset;
        const sw = innerW - inset * 2;

        const shade = Math.round(145 - ratio * 115);
        e.fillStyle = `rgb(${shade}, ${shade}, ${shade + 6})`;
        e.fillRect(sx, stepY2, sw, stepH * 0.7);

        const riserShade = Math.max(10, shade - 48);
        e.fillStyle = `rgb(${riserShade + 6}, ${riserShade}, ${riserShade + 8})`;
        e.fillRect(sx, stepY2 + stepH * 0.7, sw, stepH * 0.3);

        // Corrimão interno de ferro
        e.strokeStyle = "#475569";
        e.lineWidth = 1 * t;
        e.strokeRect(sx, stepY2, sw, stepH);
      }

      // Correntes de ferro penduradas nas laterais
      e.strokeStyle = "#64748b";
      e.lineWidth = 1.3 * t;
      for (const side of [-1, 1]) {
        const cx = side * 14 * wMul * t;
        e.beginPath();
        e.moveTo(cx, -22 * hMul * t);
        e.lineTo(cx + side * 1 * t, -12 * t);
        e.stroke();
        // Argola da corrente
        e.fillStyle = "#334155";
        e.beginPath();
        e.arc(cx + side * 1 * t, -11 * t, 2 * t, 0, Math.PI * 2);
        e.fill();
      }

      // Tochas de ferro negro nas laterais com chama tremeluzente
      const flicker = Math.sin((animTimer || 0) * 6) * 0.15;
      for (const side of [-1, 1]) {
        const tx = side * 15 * wMul * t;
        const ty = -6 * t;
        // Suporte de ferro chumbado na rocha
        e.fillStyle = "#09090b";
        e.fillRect(tx - 1.5 * t, ty - 5 * t, 3 * t, 7 * t);
        e.fillRect(tx - (side > 0 ? 3 : 0) * t, ty, 3 * t, 1.8 * t);

        // Cesta da tocha
        e.fillStyle = "#1e293b";
        e.fillRect(tx - 2 * t, ty - 7 * t, 4 * t, 3 * t);

        // Chama
        e.fillStyle = `rgba(249, 115, 22, ${0.85 + flicker})`;
        e.beginPath();
        e.arc(tx, ty - 8.5 * t, 3 * t, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "rgba(254, 240, 138, 0.95)";
        e.beginPath();
        e.arc(tx, ty - 8.5 * t, 1.5 * t, 0, Math.PI * 2);
        e.fill();
      }
    }
    e.restore();
  }

  function drawDungeonWall25D(e, t = 1, neighbors = null) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    const nL = !!(neighbors && neighbors.left);
    const nR = !!(neighbors && neighbors.right);
    const nT = !!(neighbors && neighbors.top);
    const nB = !!(neighbors && neighbors.bottom);
    const half = 17 * t;
    const leftX = nL ? -half - 1 * t : -half;
    const rightX = nR ? half + 1 * t : half;
    const w = rightX - leftX;
    const wallH = 26 * t;
    const baseY = 16 * t;
    const topFrontY = baseY - wallH;

    // Sombra projetada na base
    if (!nB) {
      e.fillStyle = "rgba(2, 6, 23, 0.75)";
      e.fillRect(leftX - 1 * t, baseY - 2 * t, w + 2 * t, 9.5 * t);
    }

    // Face frontal da muralha de granito escuro com contraste nítido
    const frontGrad = e.createLinearGradient(0, topFrontY, 0, baseY);
    frontGrad.addColorStop(0, "#64748b");
    frontGrad.addColorStop(0.35, "#475569");
    frontGrad.addColorStop(0.75, "#334155");
    frontGrad.addColorStop(1, "#1e293b");
    e.fillStyle = frontGrad;
    e.fillRect(leftX, topFrontY, w, wallH);

    // Rodapé reforçado de cantaria bruta
    e.fillStyle = "#0f172a";
    e.fillRect(leftX, baseY - 3.5 * t, w, 3.5 * t);

    // Linhas de argamassa e chanfros de relevo nos blocos de pedra
    e.strokeStyle = "rgba(15, 23, 42, 0.95)";
    e.lineWidth = 1.3 * t;
    e.beginPath();
    // Linhas horizontais de argamassa
    e.moveTo(leftX, topFrontY + 8.5 * t);
    e.lineTo(rightX, topFrontY + 8.5 * t);
    e.moveTo(leftX, topFrontY + 17 * t);
    e.lineTo(rightX, topFrontY + 17 * t);
    // Linhas verticais alternadas
    e.moveTo(0, topFrontY);
    e.lineTo(0, topFrontY + 8.5 * t);
    e.moveTo(-6 * t, topFrontY + 8.5 * t);
    e.lineTo(-6 * t, topFrontY + 17 * t);
    e.moveTo(6 * t, topFrontY + 8.5 * t);
    e.lineTo(6 * t, topFrontY + 17 * t);
    e.moveTo(0, topFrontY + 17 * t);
    e.lineTo(0, baseY - 3.5 * t);
    e.stroke();

    // Destaque de luz nas bordas superiores dos blocos de cantaria
    e.strokeStyle = "rgba(148, 163, 184, 0.35)";
    e.lineWidth = 1 * t;
    e.beginPath();
    e.moveTo(leftX + 1, topFrontY + 1 * t);
    e.lineTo(rightX - 1, topFrontY + 1 * t);
    e.moveTo(leftX + 1, topFrontY + 9.5 * t);
    e.lineTo(rightX - 1, topFrontY + 9.5 * t);
    e.moveTo(leftX + 1, topFrontY + 18 * t);
    e.lineTo(rightX - 1, topFrontY + 18 * t);
    e.stroke();

    // Topo da parede (laje de cobertura visível se não tiver parede acima)
    if (!nT) {
      e.fillStyle = "#94a3b8";
      e.fillRect(leftX, topFrontY - 3.5 * t, w, 3.5 * t);
      e.fillStyle = "#cbd5e1";
      e.fillRect(leftX, topFrontY - 4 * t, w, 1 * t);
      e.strokeStyle = "#475569";
      e.lineWidth = 0.8 * t;
      e.strokeRect(leftX, topFrontY - 3.5 * t, w, 3.5 * t);
    }

    // Manchas de umidade e musgo na base da muralha
    e.fillStyle = "rgba(22, 101, 52, 0.4)";
    e.fillRect(leftX, baseY - 5 * t, w, 2 * t);

    e.restore();
  }

  function drawIronBarsGate(e, t = 1, isVert = !0, isOpened = !1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();

    if (isVert) {
      // Portão de grade das celas em parede vertical (dx === -2, alinhado Norte-Sul)
      // 1. Sombra da base
      e.fillStyle = "rgba(2, 6, 23, 0.6)";
      e.fillRect(-5 * t, -16 * t, 10 * t, 32 * t);

      // 2. Soleira de cantaria escura no piso do vão
      e.fillStyle = "#0f172a";
      e.fillRect(-4.5 * t, -11 * t, 9 * t, 22 * t);
      e.strokeStyle = "rgba(255, 255, 255, 0.08)";
      e.lineWidth = 1 * t;
      e.strokeRect(-4.5 * t, -11 * t, 9 * t, 22 * t);

      // 3. Batentes de alvenaria superior e inferior (conectando às paredes norte e sul)
      // Batente Superior (conecta com a parede norte em y = -16*t)
      e.fillStyle = "#1e293b";
      e.fillRect(-5 * t, -16 * t, 10 * t, 5 * t);
      e.strokeStyle = "#090d16";
      e.lineWidth = 1 * t;
      e.strokeRect(-5 * t, -16 * t, 10 * t, 5 * t);

      // Batente Inferior (conecta com a parede sul em y = 11*t)
      e.fillStyle = "#1e293b";
      e.fillRect(-5 * t, 11 * t, 10 * t, 5 * t);
      e.strokeRect(-5 * t, 11 * t, 10 * t, 5 * t);

      if (isOpened) {
        // GRADE DA CELA ABERTA NORMALMENTE:
        // Usa o MESMO modo de abrir das portas normais:
        // O portão de ferro gira 90 graus na dobradiça superior e abre para dentro da cela (-X)
        // Tamanho AUMENTADO, grande e proporcional (altura 20*t, largura 11.5*t), NUNCA cortado!
        
        // Sombra da grade aberta no chão da cela
        e.fillStyle = "rgba(0, 0, 0, 0.35)";
        e.fillRect(-13.5 * t, -9 * t, 12 * t, 19 * t);

        // Moldura externa da grade aberta em ferro escuro forjado
        e.fillStyle = "#0f172a";
        e.fillRect(-13 * t, -11 * t, 11.5 * t, 20 * t);
        e.strokeStyle = "#334155";
        e.lineWidth = 1.2 * t;
        e.strokeRect(-13 * t, -11 * t, 11.5 * t, 20 * t);

        // Vão interior da grade aberta
        e.fillStyle = "#1e293b";
        e.fillRect(-12 * t, -10 * t, 9.5 * t, 18 * t);

        // Travessas horizontais de reforço
        e.fillStyle = "#0f172a";
        e.fillRect(-13 * t, -6 * t, 11.5 * t, 2.5 * t);
        e.fillRect(-13 * t, 1 * t, 11.5 * t, 2.5 * t);

        // Barras verticais de ferro com pontas pontiagudas
        e.fillStyle = "#475569";
        for (const bx of [-11, -8.5, -6, -3.5]) {
          e.fillRect(bx * t, -11 * t, 1.8 * t, 20 * t);
          // Pontas afiadas no topo
          e.beginPath();
          e.moveTo(bx * t, -11 * t);
          e.lineTo((bx + 0.9) * t, -13.5 * t);
          e.lineTo((bx + 1.8) * t, -11 * t);
          e.closePath();
          e.fill();
        }

        // Dobradiças de ferro maciço no batente superior
        e.fillStyle = "#0f172a";
        e.fillRect(-3 * t, -12 * t, 4 * t, 5 * t);
        e.fillRect(-11 * t, -12 * t, 3 * t, 5 * t);

        // Cadeado destrancado aberto pendurado na borda que abre
        e.fillStyle = "#78350f";
        e.fillRect(-14 * t, -1 * t, 3.5 * t, 4 * t);
        e.strokeStyle = "#d97706";
        e.lineWidth = 0.9 * t;
        e.strokeRect(-14 * t, -1 * t, 3.5 * t, 4 * t);
        e.beginPath();
        e.arc(-12.2 * t, -2 * t, 1.6 * t, Math.PI * 0.8, Math.PI * 1.8);
        e.stroke();

        // Passagem da porta 100% aberta e desimpedida do corredor para a cela
        e.fillStyle = "rgba(255, 255, 255, 0.05)";
        e.fillRect(-1.5 * t, -11 * t, 6 * t, 22 * t);
      } else {
        // GRADE DA CELA FECHADA E TRANCADA NA VERTICAL (conectando batente norte ao sul)
        // Moldura externa da grade de ferro
        e.fillStyle = "#0f172a";
        e.fillRect(-4 * t, -11 * t, 8 * t, 22 * t);
        e.strokeStyle = "#334155";
        e.lineWidth = 1.2 * t;
        e.strokeRect(-4 * t, -11 * t, 8 * t, 22 * t);

        // Travessas horizontais de ferro
        e.fillStyle = "#090d16";
        e.fillRect(-4.5 * t, -6 * t, 9 * t, 2.5 * t);
        e.fillRect(-4.5 * t, 4 * t, 9 * t, 2.5 * t);

        // Barras verticais redondas de aço
        e.fillStyle = "#475569";
        for (const bx of [-2.5, 0, 2.5]) {
          e.fillRect((bx - 0.9) * t, -11 * t, 1.8 * t, 22 * t);
          // Pontas pontiagudas no topo
          e.beginPath();
          e.moveTo((bx - 0.9) * t, -11 * t);
          e.lineTo(bx * t, -13.5 * t);
          e.lineTo((bx + 0.9) * t, -11 * t);
          e.closePath();
          e.fill();
        }

        // Cadeado pesado de ferro e bronze com corrente na tranca central
        e.fillStyle = "#78350f";
        e.fillRect(-2 * t, -2 * t, 4 * t, 4.5 * t);
        e.strokeStyle = "#d97706";
        e.lineWidth = 0.9 * t;
        e.strokeRect(-2 * t, -2 * t, 4 * t, 4.5 * t);
        e.beginPath();
        e.arc(0, -2.5 * t, 1.6 * t, Math.PI, 0);
        e.stroke();
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.arc(0, -0.2 * t, 0.7 * t, 0, Math.PI * 2);
        e.fillRect(-0.4 * t, -0.2 * t, 0.8 * t, 1.5 * t);
        e.fill();
      }
    } else {
      // Fallback para parede horizontal (caso ocorra em algum corredor)
      e.fillStyle = "rgba(2, 6, 23, 0.6)";
      e.fillRect(-16 * t, -16 * t, 32 * t, 32 * t);

      e.fillStyle = "#0f172a";
      e.fillRect(-12 * t, -14 * t, 24 * t, 28 * t);

      e.fillStyle = "#1e293b";
      e.fillRect(-16 * t, -17 * t, 4.5 * t, 34 * t);
      e.fillRect(11.5 * t, -17 * t, 4.5 * t, 34 * t);
      e.strokeStyle = "#0f172a";
      e.lineWidth = 1 * t;
      e.strokeRect(-16 * t, -17 * t, 4.5 * t, 34 * t);
      e.strokeRect(11.5 * t, -17 * t, 4.5 * t, 34 * t);

      if (isOpened) {
        // Grade aberta em perspectiva aumentada rente à esquerda
        e.fillStyle = "#0f172a";
        e.fillRect(-12 * t, -15 * t, 10 * t, 29 * t);
        e.strokeStyle = "#334155";
        e.lineWidth = 1.2 * t;
        e.strokeRect(-12 * t, -15 * t, 10 * t, 29 * t);

        e.fillStyle = "#475569";
        for (const bx of [-10, -7, -4]) {
          e.fillRect(bx * t, -15 * t, 1.8 * t, 29 * t);
        }
        e.fillStyle = "rgba(255, 255, 255, 0.05)";
        e.fillRect(-2 * t, -14 * t, 13.5 * t, 28 * t);
      } else {
        e.fillStyle = "#0f172a";
        e.fillRect(-14 * t, -14 * t, 28 * t, 3 * t);
        e.fillRect(-14 * t, -1 * t, 28 * t, 3 * t);
        e.fillRect(-14 * t, 11 * t, 28 * t, 3 * t);

        e.fillStyle = "#334155";
        for (let bx = -10; bx <= 10; bx += 4) {
          e.fillRect((bx - 1) * t, -16 * t, 2.2 * t, 29 * t);
        }
      }
    }

    e.restore();
  }

  function drawDungeonDoor(e, t = 1, isVert = !1, isOpened = !1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();

    if (isVert) {
      // Porta em parede vertical (passagem Leste-Oeste entre corredor e salão)
      // 1. Sombra e soleira de pedra no chão
      e.fillStyle = "rgba(2, 6, 23, 0.6)";
      e.fillRect(-5 * t, -16 * t, 10 * t, 32 * t);

      e.fillStyle = "#0f172a";
      e.fillRect(-4.5 * t, -11 * t, 9 * t, 22 * t);
      e.strokeStyle = "rgba(255, 255, 255, 0.08)";
      e.lineWidth = 1 * t;
      e.strokeRect(-4.5 * t, -11 * t, 9 * t, 22 * t);

      // 2. Batentes de alvenaria superior e inferior (EXATAMENTE IDENTICOS aberta e fechada!)
      // Batente Superior (conecta com a parede norte)
      e.fillStyle = "#1e293b";
      e.fillRect(-5 * t, -16 * t, 10 * t, 5 * t);
      e.strokeStyle = "#090d16";
      e.lineWidth = 1 * t;
      e.strokeRect(-5 * t, -16 * t, 10 * t, 5 * t);

      // Batente Inferior (conecta com a parede sul)
      e.fillStyle = "#1e293b";
      e.fillRect(-5 * t, 11 * t, 10 * t, 5 * t);
      e.strokeRect(-5 * t, 11 * t, 10 * t, 5 * t);

      if (isOpened) {
        // PORTA COMUM ABERTA NORMALMENTE:
        // Folha ÚNICA inteira de carvalho que gira 90 graus na dobradiça superior e abre para dentro do salão (+X)
        // NÃO DIVIDE NO MEIO: é uma porta comum de folha única!
        // TAMANHO AUMENTADO (altura 20*t, largura 11.5*t): grande, substancial, imponente e NUNCA cortada!
        
        // Sombra da porta aberta no piso do salão
        e.fillStyle = "rgba(0, 0, 0, 0.35)";
        e.fillRect(1.5 * t, -9 * t, 12 * t, 19 * t);

        // Folha da porta de carvalho maciço aberta vista em perspectiva no salão
        e.fillStyle = "#5c2e0b";
        e.fillRect(1.5 * t, -11 * t, 11.5 * t, 20 * t);
        e.strokeStyle = "#381c07";
        e.lineWidth = 1.2 * t;
        e.strokeRect(1.5 * t, -11 * t, 11.5 * t, 20 * t);

        // Frisos verticais das pranchas de madeira na folha aberta
        e.strokeStyle = "#451a03";
        e.lineWidth = 0.9 * t;
        e.beginPath();
        e.moveTo(5.3 * t, -11 * t); e.lineTo(5.3 * t, 9 * t);
        e.moveTo(9.1 * t, -11 * t); e.lineTo(9.1 * t, 9 * t);
        e.stroke();

        // Cintas reforçadas de ferro forjado horizontais
        e.fillStyle = "#0f172a";
        e.fillRect(1.5 * t, -7 * t, 11.5 * t, 2.5 * t);
        e.fillRect(1.5 * t, 3 * t, 11.5 * t, 2.5 * t);

        // Rebites de ferro nas cintas
        e.fillStyle = "#94a3b8";
        for (const bx of [3.5, 7.2, 11]) {
          e.beginPath();
          e.arc(bx * t, -5.8 * t, 0.9 * t, 0, Math.PI * 2);
          e.arc(bx * t, 4.2 * t, 0.9 * t, 0, Math.PI * 2);
          e.fill();
        }

        // Dobradiças de ferro no batente superior
        e.fillStyle = "#0f172a";
        e.fillRect(-1 * t, -12 * t, 4 * t, 5 * t);
        e.fillRect(8 * t, -12 * t, 3 * t, 5 * t);

        // Maçaneta e argola de ferro na ponta da porta aberta
        e.strokeStyle = "#cbd5e1";
        e.lineWidth = 1.2 * t;
        e.beginPath();
        e.arc(11.5 * t, -1 * t, 1.8 * t, 0, Math.PI * 2);
        e.stroke();

        // Passagem livre central totalmente desimpedida
        e.fillStyle = "rgba(255, 255, 255, 0.05)";
        e.fillRect(-4.5 * t, -11 * t, 6 * t, 22 * t);
      } else {
        // PORTA COMUM FECHADA (Folha única maciça de carvalho conectando do topo até a base)
        e.fillStyle = "#5c2e0b";
        e.fillRect(-4 * t, -11 * t, 8 * t, 22 * t);
        e.strokeStyle = "#381c07";
        e.lineWidth = 1.2 * t;
        e.strokeRect(-4 * t, -11 * t, 8 * t, 22 * t);

        // Frisos verticais
        e.strokeStyle = "#451a03";
        e.lineWidth = 0.9 * t;
        e.beginPath();
        e.moveTo(-1.3 * t, -11 * t); e.lineTo(-1.3 * t, 11 * t);
        e.moveTo(1.3 * t, -11 * t); e.lineTo(1.3 * t, 11 * t);
        e.stroke();

        // Cintas de ferro forjado reforçando a folha
        e.fillStyle = "#0f172a";
        e.fillRect(-4.5 * t, -7 * t, 9 * t, 2.5 * t);
        e.fillRect(-4.5 * t, 5 * t, 9 * t, 2.5 * t);

        // Rebites
        e.fillStyle = "#94a3b8";
        for (const bx of [-2.5, 0, 2.5]) {
          e.beginPath();
          e.arc(bx * t, -5.8 * t, 0.9 * t, 0, Math.PI * 2);
          e.arc(bx * t, 6.2 * t, 0.9 * t, 0, Math.PI * 2);
          e.fill();
        }

        // Maçaneta com argola de ferro para abrir
        e.strokeStyle = "#cbd5e1";
        e.lineWidth = 1.3 * t;
        e.beginPath();
        e.arc(1.5 * t, 0, 2.2 * t, 0, Math.PI * 2);
        e.stroke();
      }
    } else {
      // Porta em parede horizontal (passagem Norte-Sul)
      // 1. Sombra da base
      e.fillStyle = "rgba(2, 6, 23, 0.6)";
      e.fillRect(-16 * t, -16 * t, 32 * t, 32 * t);

      // 2. Soleira de pedra no chão
      e.fillStyle = "#0f172a";
      e.fillRect(-11 * t, -15 * t, 22 * t, 30 * t);
      e.strokeStyle = "rgba(255, 255, 255, 0.08)";
      e.lineWidth = 1 * t;
      e.strokeRect(-11 * t, -15 * t, 22 * t, 30 * t);

      // 3. Batentes laterais de alvenaria (EXATAMENTE IDENTICOS aberta e fechada!)
      e.fillStyle = "#1e293b";
      e.fillRect(-16 * t, -16 * t, 5 * t, 32 * t);
      e.fillRect(11 * t, -16 * t, 5 * t, 32 * t);
      e.strokeStyle = "#090d16";
      e.lineWidth = 1 * t;
      e.strokeRect(-16 * t, -16 * t, 5 * t, 32 * t);
      e.strokeRect(11 * t, -16 * t, 5 * t, 32 * t);

      if (isOpened) {
        // PORTA COMUM ABERTA NORMALMENTE:
        // Folha ÚNICA inteira de carvalho que gira 90 graus na dobradiça esquerda e fica aberta
        // TAMANHO AUMENTADO (largura 11*t, altura total 30*t): grande, substancial e NUNCA cortada!
        
        // Sombra da folha aberta
        e.fillStyle = "rgba(0, 0, 0, 0.35)";
        e.fillRect(-11 * t, -13 * t, 12 * t, 29 * t);

        // Folha de carvalho aberta
        e.fillStyle = "#5c2e0b";
        e.fillRect(-11 * t, -15 * t, 11 * t, 30 * t);
        e.strokeStyle = "#381c07";
        e.lineWidth = 1.2 * t;
        e.strokeRect(-11 * t, -15 * t, 11 * t, 30 * t);

        // Frisos das pranchas
        e.strokeStyle = "#451a03";
        e.lineWidth = 0.9 * t;
        e.beginPath();
        e.moveTo(-7.5 * t, -15 * t); e.lineTo(-7.5 * t, 15 * t);
        e.moveTo(-4 * t, -15 * t); e.lineTo(-4 * t, 15 * t);
        e.stroke();

        // Cintas de ferro da folha aberta conectadas ao batente esquerdo
        e.fillStyle = "#0f172a";
        e.fillRect(-11 * t, -10 * t, 11 * t, 3.5 * t);
        e.fillRect(-11 * t, 7 * t, 11 * t, 3.5 * t);

        // Rebites
        e.fillStyle = "#94a3b8";
        for (const rx of [-9, -5.5, -2]) {
          e.beginPath();
          e.arc(rx * t, -8.2 * t, 1 * t, 0, Math.PI * 2);
          e.arc(rx * t, 8.8 * t, 1 * t, 0, Math.PI * 2);
          e.fill();
        }

        // Maçaneta na borda livre da porta aberta
        e.strokeStyle = "#cbd5e1";
        e.lineWidth = 1.2 * t;
        e.beginPath();
        e.arc(-1 * t, 0, 2.2 * t, 0, Math.PI * 2);
        e.stroke();

        // Vão central 100% aberto e desimpedido para passagem
        e.fillStyle = "rgba(255, 255, 255, 0.05)";
        e.fillRect(0 * t, -15 * t, 11 * t, 30 * t);
      } else {
        // PORTA COMUM FECHADA (Folha única maciça de carvalho preenchendo todo o vão)
        e.fillStyle = "#5c2e0b";
        e.fillRect(-11 * t, -15 * t, 22 * t, 30 * t);
        e.strokeStyle = "#381c07";
        e.lineWidth = 1.2 * t;
        e.strokeRect(-11 * t, -15 * t, 22 * t, 30 * t);

        // Frisos de pranchas de madeira da folha única
        e.strokeStyle = "#451a03";
        e.lineWidth = 1 * t;
        e.beginPath();
        e.moveTo(-5.5 * t, -15 * t); e.lineTo(-5.5 * t, 15 * t);
        e.moveTo(0, -15 * t); e.lineTo(0, 15 * t);
        e.moveTo(5.5 * t, -15 * t); e.lineTo(5.5 * t, 15 * t);
        e.stroke();

        // Cintas de ferro horizontais reforçadas
        e.fillStyle = "#0f172a";
        e.fillRect(-11 * t, -10 * t, 22 * t, 3.5 * t);
        e.fillRect(-11 * t, 7 * t, 22 * t, 3.5 * t);

        // Rebites de ferro
        e.fillStyle = "#94a3b8";
        for (const rx of [-8, -3, 3, 8]) {
          e.beginPath();
          e.arc(rx * t, -8.2 * t, 1.1 * t, 0, Math.PI * 2);
          e.arc(rx * t, 8.8 * t, 1.1 * t, 0, Math.PI * 2);
          e.fill();
        }

        // Maçaneta única com argola do lado direito para abrir
        e.strokeStyle = "#cbd5e1";
        e.lineWidth = 1.3 * t;
        e.beginPath();
        e.arc(6 * t, 0, 2.6 * t, 0, Math.PI * 2);
        e.stroke();
      }
    }

    e.restore();
  }

  function drawTortureRack(e, t = 1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // Sombra
    e.fillStyle = "rgba(2, 6, 23, 0.6)";
    e.fillRect(-18 * t, -8 * t, 36 * t, 20 * t);

    // Estrutura de vigas de madeira escura
    e.fillStyle = "#3e2723";
    e.fillRect(-16 * t, -12 * t, 32 * t, 4 * t);
    e.fillRect(-16 * t, 8 * t, 32 * t, 4 * t);
    e.fillRect(-16 * t, -12 * t, 4 * t, 24 * t);
    e.fillRect(12 * t, -12 * t, 4 * t, 24 * t);

    // Prancha central manchada de sangue antigo
    e.fillStyle = "#5d4037";
    e.fillRect(-12 * t, -8 * t, 24 * t, 16 * t);
    e.fillStyle = "rgba(127, 29, 29, 0.75)";
    e.beginPath();
    e.ellipse(0, 0, 8 * t, 5 * t, 0.3, 0, Math.PI * 2);
    e.fill();

    // Rolos cilíndricos com manivelas nas pontas
    e.fillStyle = "#1e293b";
    e.fillRect(-14 * t, -7 * t, 3 * t, 14 * t);
    e.fillRect(11 * t, -7 * t, 3 * t, 14 * t);

    // Manivelas dentadas
    e.strokeStyle = "#475569";
    e.lineWidth = 1.8 * t;
    e.beginPath();
    e.moveTo(13 * t, -10 * t); e.lineTo(17 * t, -14 * t);
    e.moveTo(13 * t, 10 * t); e.lineTo(17 * t, 14 * t);
    e.stroke();

    // Correntes de ferro esticadas
    e.strokeStyle = "#94a3b8";
    e.lineWidth = 1.2 * t;
    e.beginPath();
    e.moveTo(-11 * t, -4 * t); e.lineTo(-5 * t, -2 * t);
    e.moveTo(-11 * t, 4 * t); e.lineTo(-5 * t, 2 * t);
    e.moveTo(11 * t, -4 * t); e.lineTo(5 * t, -2 * t);
    e.moveTo(11 * t, 4 * t); e.lineTo(5 * t, 2 * t);
    e.stroke();

    // Manoplas de couro/ferro
    e.fillStyle = "#78350f";
    e.fillRect(-6 * t, -4 * t, 2 * t, 3 * t);
    e.fillRect(-6 * t, 1 * t, 2 * t, 3 * t);
    e.fillRect(4 * t, -4 * t, 2 * t, 3 * t);
    e.fillRect(4 * t, 1 * t, 2 * t, 3 * t);

    e.restore();
  }

  function drawIronMaiden(e, t = 1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // Sombra
    e.fillStyle = "rgba(2, 6, 23, 0.65)";
    e.beginPath();
    e.ellipse(0, 12 * t, 14 * t, 6 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Corpo do sarcófago de ferro negro
    e.fillStyle = "#1e293b";
    e.fillRect(-9 * t, -24 * t, 18 * t, 34 * t);

    // Topo em arco
    e.beginPath();
    e.arc(0, -24 * t, 9 * t, Math.PI, 0);
    e.fill();

    // Borda metálica e rebites
    e.strokeStyle = "#475569";
    e.lineWidth = 1.5 * t;
    e.strokeRect(-9 * t, -24 * t, 18 * t, 34 * t);

    // Rosto moldado na porta em agonia
    e.fillStyle = "#334155";
    e.beginPath();
    e.ellipse(0, -22 * t, 5 * t, 6 * t, 0, 0, Math.PI * 2);
    e.fill();
    e.fillStyle = "#0f172a";
    e.fillRect(-2.5 * t, -24 * t, 1.8 * t, 2 * t);
    e.fillRect(0.8 * t, -24 * t, 1.8 * t, 2 * t);
    e.fillRect(-2 * t, -19 * t, 4 * t, 2.5 * t);

    // Porta ligeiramente entreaberta mostrando espinhos afiados por dentro
    e.fillStyle = "#09090b";
    e.fillRect(2 * t, -18 * t, 6 * t, 27 * t);

    // Espinhos pontiagudos internos brilhando
    e.fillStyle = "#cbd5e1";
    for (let sy = -14; sy <= 6; sy += 5) {
      e.beginPath();
      e.moveTo(8 * t, sy * t);
      e.lineTo(3 * t, (sy + 1.5) * t);
      e.lineTo(8 * t, (sy + 3) * t);
      e.closePath();
      e.fill();
    }

    e.restore();
  }

  function drawHangingCage(e, t = 1, animTimer = 0) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    const sway = Math.sin((animTimer || 0) * 1.6) * 0.04;
    e.rotate(sway);

    // Corrente pendurada no teto
    e.strokeStyle = "#475569";
    e.lineWidth = 1.4 * t;
    e.beginPath();
    e.moveTo(0, -32 * t);
    e.lineTo(0, -14 * t);
    e.stroke();

    // Sombra no chão
    e.fillStyle = "rgba(2, 6, 23, 0.45)";
    e.beginPath();
    e.ellipse(0, 10 * t, 10 * t, 4 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Cúpula e anéis da gaiola
    e.fillStyle = "#1e293b";
    e.beginPath();
    e.ellipse(0, -14 * t, 8 * t, 3 * t, 0, 0, Math.PI * 2);
    e.ellipse(0, 2 * t, 8 * t, 3 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Barras verticais da gaiola
    e.strokeStyle = "#334155";
    e.lineWidth = 1.6 * t;
    for (const bx of [-7, -3.5, 0, 3.5, 7]) {
      e.beginPath();
      e.moveTo(bx * t, -14 * t);
      e.lineTo(bx * t, 2 * t);
      e.stroke();
    }

    // Ossadas e crânio dentro da gaiola
    e.fillStyle = "#e2e8f0";
    // Crânio
    e.beginPath();
    e.arc(1 * t, -4 * t, 3 * t, 0, Math.PI * 2);
    e.fill();
    e.fillStyle = "#0f172a";
    e.fillRect(0, -4.5 * t, 1 * t, 1.2 * t);
    e.fillRect(2 * t, -4.5 * t, 1 * t, 1.2 * t);
    // Costelas / ossos
    e.strokeStyle = "#cbd5e1";
    e.lineWidth = 1.2 * t;
    e.beginPath();
    e.moveTo(-2 * t, -1 * t); e.lineTo(3 * t, 0);
    e.stroke();

    e.restore();
  }

  function drawTortureBrazier(e, t = 1, animTimer = 0) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // Sombra
    e.fillStyle = "rgba(2, 6, 23, 0.55)";
    e.beginPath();
    e.ellipse(0, 8 * t, 12 * t, 5 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Tripé de ferro forjado
    e.strokeStyle = "#1e293b";
    e.lineWidth = 2 * t;
    e.beginPath();
    e.moveTo(0, 2 * t); e.lineTo(-8 * t, 8 * t);
    e.moveTo(0, 2 * t); e.lineTo(8 * t, 8 * t);
    e.moveTo(0, 2 * t); e.lineTo(0, 8 * t);
    e.stroke();

    // Bacia de ferro
    e.fillStyle = "#0f172a";
    e.beginPath();
    e.ellipse(0, 0, 11 * t, 5 * t, 0, 0, Math.PI * 2);
    e.fill();
    e.strokeStyle = "#334155";
    e.lineWidth = 1.5 * t;
    e.stroke();

    // Carvão em brasa ardente
    const flicker = Math.sin((animTimer || 0) * 7) * 0.15;
    e.fillStyle = `rgba(239, 68, 68, ${0.85 + flicker})`;
    e.beginPath();
    e.ellipse(0, -1 * t, 9 * t, 3.8 * t, 0, 0, Math.PI * 2);
    e.fill();
    e.fillStyle = "rgba(249, 115, 22, 0.9)";
    e.beginPath();
    e.ellipse(0, -1.5 * t, 6 * t, 2.5 * t, 0, 0, Math.PI * 2);
    e.fill();
    e.fillStyle = "rgba(254, 240, 138, 0.95)";
    e.beginPath();
    e.ellipse(0, -2 * t, 3 * t, 1.5 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Ferros de marcar a brasa compridos saindo do braseiro
    e.strokeStyle = "#1e293b";
    e.lineWidth = 1.6 * t;
    e.beginPath();
    e.moveTo(-3 * t, -1 * t); e.lineTo(-11 * t, -12 * t);
    e.moveTo(2 * t, -1 * t); e.lineTo(10 * t, -11 * t);
    e.stroke();
    // Pontas incandescentes dos ferros
    e.strokeStyle = "#ef4444";
    e.lineWidth = 2.2 * t;
    e.beginPath();
    e.moveTo(-1 * t, -1 * t); e.lineTo(-4 * t, -3 * t);
    e.moveTo(1 * t, -1 * t); e.lineTo(3.5 * t, -3 * t);
    e.stroke();

    e.restore();
  }

  function drawTortureTools(e, t = 1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // Mesa rústica ensanguentada
    e.fillStyle = "rgba(2, 6, 23, 0.5)";
    e.fillRect(-14 * t, -4 * t, 28 * t, 14 * t);

    e.fillStyle = "#292524";
    e.fillRect(-12 * t, -8 * t, 24 * t, 12 * t);
    e.strokeStyle = "#1c1917";
    e.lineWidth = 1.2 * t;
    e.strokeRect(-12 * t, -8 * t, 24 * t, 12 * t);

    // Manchas de sangue
    e.fillStyle = "rgba(185, 28, 28, 0.7)";
    e.beginPath();
    e.ellipse(-4 * t, -2 * t, 4 * t, 2 * t, 0.2, 0, Math.PI * 2);
    e.fill();

    // Ferramentas: serra, tenaz, pinças
    e.strokeStyle = "#94a3b8";
    e.lineWidth = 1.3 * t;
    // Serra
    e.beginPath();
    e.moveTo(2 * t, -6 * t); e.lineTo(9 * t, -2 * t);
    e.stroke();
    // Pinças / Alicates
    e.beginPath();
    e.moveTo(-8 * t, -5 * t); e.lineTo(-4 * t, -1 * t);
    e.moveTo(-8 * t, -1 * t); e.lineTo(-4 * t, -5 * t);
    e.stroke();

    e.restore();
  }

  function drawLatrinePit(e, t = 1, animTimer = 0) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // Borda de pedra escavada da fossa
    e.fillStyle = "#1e293b";
    e.beginPath();
    e.ellipse(0, 0, 18 * t, 14 * t, 0, 0, Math.PI * 2);
    e.fill();
    e.strokeStyle = "#0f172a";
    e.lineWidth = 2 * t;
    e.stroke();

    // Poço profundo escuro
    e.fillStyle = "#020617";
    e.beginPath();
    e.ellipse(0, 0, 15 * t, 11 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Água pútrida/lama com reflexos verdes de limo
    const wave = Math.sin((animTimer || 0) * 2) * 0.5 * t;
    e.fillStyle = "rgba(20, 83, 45, 0.55)";
    e.beginPath();
    e.ellipse(0, wave, 13 * t, 9 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Grade de escoamento de ferro cruzando a fossa
    e.strokeStyle = "#334155";
    e.lineWidth = 1.5 * t;
    e.beginPath();
    for (let gx = -10; gx <= 10; gx += 4) {
      e.moveTo(gx * t, -7 * t);
      e.lineTo(gx * t, 7 * t);
    }
    e.moveTo(-12 * t, 0);
    e.lineTo(12 * t, 0);
    e.stroke();

    // Pranchas podres de contenção nas bordas
    e.fillStyle = "#3e2723";
    e.fillRect(-16 * t, -12 * t, 9 * t, 3.5 * t);
    e.fillRect(7 * t, 8 * t, 10 * t, 3.5 * t);

    e.restore();
  }

  function drawLatrineBench(e, t = 1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // Bancos de latrina em alvenaria
    e.fillStyle = "rgba(2, 6, 23, 0.5)";
    e.fillRect(-12 * t, -4 * t, 24 * t, 14 * t);

    // Bloco de cantaria da latrina
    e.fillStyle = "#334155";
    e.fillRect(-10 * t, -8 * t, 20 * t, 14 * t);
    e.strokeStyle = "#1e293b";
    e.lineWidth = 1.3 * t;
    e.strokeRect(-10 * t, -8 * t, 20 * t, 14 * t);

    // Orifícios escavados na pedra
    e.fillStyle = "#020617";
    e.beginPath();
    e.ellipse(-4 * t, -2 * t, 3 * t, 3.5 * t, 0, 0, Math.PI * 2);
    e.ellipse(4 * t, -2 * t, 3 * t, 3.5 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Tampo de madeira encostado na parede
    e.fillStyle = "#451a03";
    e.fillRect(-9 * t, -11 * t, 18 * t, 3 * t);

    e.restore();
  }

  function drawDungeonSkeleton(e, t = 1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // Sombra
    e.fillStyle = "rgba(2, 6, 23, 0.4)";
    e.beginPath();
    e.ellipse(0, 2 * t, 10 * t, 5 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Correntes e grilhões presos na parede
    e.strokeStyle = "#475569";
    e.lineWidth = 1.3 * t;
    e.beginPath();
    e.moveTo(-8 * t, -8 * t); e.lineTo(-5 * t, -3 * t);
    e.moveTo(8 * t, -8 * t); e.lineTo(5 * t, -3 * t);
    e.stroke();

    // Crânio
    e.fillStyle = "#cbd5e1";
    e.beginPath();
    e.arc(0, -3 * t, 3.2 * t, 0, Math.PI * 2);
    e.fill();
    e.fillStyle = "#0f172a";
    e.fillRect(-1.5 * t, -3.5 * t, 1 * t, 1 * t);
    e.fillRect(0.5 * t, -3.5 * t, 1 * t, 1 * t);

    // Costelas e ossos caídos
    e.strokeStyle = "#94a3b8";
    e.lineWidth = 1.2 * t;
    e.beginPath();
    e.moveTo(-3 * t, 0); e.lineTo(3 * t, 0);
    e.moveTo(-2.5 * t, 2 * t); e.lineTo(2.5 * t, 2 * t);
    e.moveTo(-4 * t, 4 * t); e.lineTo(-1 * t, 7 * t);
    e.moveTo(4 * t, 4 * t); e.lineTo(1 * t, 7 * t);
    e.stroke();

    e.restore();
  }

  function drawDungeonStraw(e, t = 1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // Monte de palha mofada
    e.fillStyle = "#713f12";
    e.beginPath();
    e.ellipse(0, 0, 11 * t, 6 * t, 0.1, 0, Math.PI * 2);
    e.fill();
    e.strokeStyle = "#a16207";
    e.lineWidth = 1 * t;
    for (let i = -7; i <= 7; i += 3) {
      e.beginPath();
      e.moveTo(i * t, -3 * t);
      e.lineTo((i + 2) * t, 3 * t);
      e.stroke();
    }
    // Tigela de barro quebrada
    e.fillStyle = "#9a3412";
    e.beginPath();
    e.arc(6 * t, 2 * t, 2.2 * t, 0, Math.PI);
    e.fill();
    e.restore();
  }

  function drawJailerTable(e, t = 1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    e.fillStyle = "rgba(2, 6, 23, 0.5)";
    e.fillRect(-13 * t, -4 * t, 26 * t, 14 * t);

    e.fillStyle = "#3e2723";
    e.fillRect(-11 * t, -8 * t, 22 * t, 12 * t);
    e.strokeStyle = "#1b0f0a";
    e.lineWidth = 1.2 * t;
    e.strokeRect(-11 * t, -8 * t, 22 * t, 12 * t);

    // Livro de registros de prisioneiros
    e.fillStyle = "#fef3c7";
    e.fillRect(-6 * t, -6 * t, 6 * t, 8 * t);
    e.strokeStyle = "#78350f";
    e.lineWidth = 0.8 * t;
    e.strokeRect(-6 * t, -6 * t, 6 * t, 8 * t);

    // Garrafa e chaveiro
    e.fillStyle = "#15803d";
    e.fillRect(3 * t, -6 * t, 2.5 * t, 5 * t);
    // Argola com chaves de ferro
    e.strokeStyle = "#cbd5e1";
    e.lineWidth = 1.1 * t;
    e.beginPath();
    e.arc(6 * t, 0, 2 * t, 0, Math.PI * 2);
    e.moveTo(6 * t, 2 * t); e.lineTo(7 * t, 4 * t);
    e.stroke();

    e.restore();
  }

  function drawWeaponRack(e, t = 1) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    e.fillStyle = "rgba(2, 6, 23, 0.45)";
    e.fillRect(-11 * t, -2 * t, 22 * t, 10 * t);

    // Suporte de madeira
    e.fillStyle = "#451a03";
    e.fillRect(-9 * t, -12 * t, 3 * t, 18 * t);
    e.fillRect(6 * t, -12 * t, 3 * t, 18 * t);
    e.fillRect(-9 * t, -6 * t, 18 * t, 2.5 * t);

    // Lanças e alabardas enferrujadas
    e.strokeStyle = "#78350f";
    e.lineWidth = 1.4 * t;
    e.beginPath();
    e.moveTo(-5 * t, 4 * t); e.lineTo(-2 * t, -16 * t);
    e.moveTo(2 * t, 4 * t); e.lineTo(5 * t, -16 * t);
    e.stroke();

    // Pontas de metal
    e.fillStyle = "#94a3b8";
    e.beginPath();
    e.moveTo(-2 * t, -18 * t); e.lineTo(-3.5 * t, -15 * t); e.lineTo(-0.5 * t, -15 * t);
    e.closePath();
    e.fill();
    e.beginPath();
    e.moveTo(5 * t, -18 * t); e.lineTo(3.5 * t, -15 * t); e.lineTo(6.5 * t, -15 * t);
    e.closePath();
    e.fill();

    e.restore();
  }

  function drawPedregulhos(e, t = 1, subType = 0) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();
    // Pilha de pedregulhos e cascalho da escavação
    const colors = ["#475569", "#334155", "#64748b", "#1e293b"];
    const col0 = colors[subType % 4];
    const col1 = colors[(subType + 1) % 4];

    // Sombra das pedras
    e.fillStyle = "rgba(2, 6, 23, 0.4)";
    e.beginPath();
    e.ellipse(0, 3 * t, 12 * t, 6 * t, 0, 0, Math.PI * 2);
    e.fill();

    // Pedra maior
    e.fillStyle = col0;
    e.beginPath();
    e.moveTo(-6 * t, 2 * t);
    e.lineTo(-3 * t, -5 * t);
    e.lineTo(3 * t, -4 * t);
    e.lineTo(5 * t, 3 * t);
    e.lineTo(-1 * t, 5 * t);
    e.closePath();
    e.fill();
    e.strokeStyle = "#0f172a";
    e.lineWidth = 0.9 * t;
    e.stroke();

    // Pedra média
    e.fillStyle = col1;
    e.beginPath();
    e.moveTo(3 * t, 0);
    e.lineTo(8 * t, -3 * t);
    e.lineTo(9 * t, 3 * t);
    e.lineTo(5 * t, 4 * t);
    e.closePath();
    e.fill();
    e.stroke();

    // Pedregulhos menores espalhados
    e.fillStyle = "#64748b";
    e.fillRect(-8 * t, -1 * t, 2.5 * t, 2 * t);
    e.fillRect(-2 * t, 4 * t, 2 * t, 1.8 * t);
    e.fillRect(6 * t, -4 * t, 1.8 * t, 1.5 * t);

    e.restore();
  }

  function drawBonePile(e, t = 1, subType = 0) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    e.save();

    // 1. Sombra macabra projetada no piso da caverna
    e.fillStyle = "rgba(2, 6, 23, 0.55)";
    e.beginPath();
    e.ellipse(0, 4 * t, 15 * t, 8 * t, 0, 0, Math.PI * 2);
    e.fill();

    // 2. Base de terra escura, pó de osso e fragmentos
    e.fillStyle = "rgba(15, 23, 42, 0.7)";
    e.beginPath();
    e.ellipse(0, 2 * t, 13 * t, 6.5 * t, 0, 0, Math.PI * 2);
    e.fill();

    // 3. Fêmures e ossos compridos cruzados na base
    e.strokeStyle = "#94a3b8";
    e.fillStyle = "#cbd5e1";
    e.lineWidth = 2 * t;
    e.lineCap = "round";

    // Fêmur cruzado diagonal esquerda
    e.beginPath();
    e.moveTo(-11 * t, 3 * t);
    e.lineTo(10 * t, -3 * t);
    e.stroke();
    e.beginPath();
    e.arc(-11 * t, 3 * t, 1.8 * t, 0, Math.PI * 2);
    e.arc(10 * t, -3 * t, 1.8 * t, 0, Math.PI * 2);
    e.fill();

    // Fêmur cruzado diagonal direita
    e.beginPath();
    e.moveTo(-9 * t, -3 * t);
    e.lineTo(11 * t, 3 * t);
    e.stroke();
    e.beginPath();
    e.arc(-9 * t, -3 * t, 1.8 * t, 0, Math.PI * 2);
    e.arc(11 * t, 3 * t, 1.8 * t, 0, Math.PI * 2);
    e.fill();

    // 4. Caixa torácica / costelas curvadas abraçando a pilha
    e.strokeStyle = "#cbd5e1";
    e.lineWidth = 1.3 * t;
    for (let r = -2; r <= 2; r++) {
      const rx = r * 3.5 * t;
      const ry = (2 - Math.abs(r)) * 1.5 * t;
      e.beginPath();
      e.arc(rx - 2 * t, ry + 2 * t, 3.5 * t, Math.PI * 0.2, Math.PI * 0.9);
      e.stroke();
      e.beginPath();
      e.arc(rx + 2 * t, ry + 2 * t, 3.5 * t, Math.PI * 0.1, Math.PI * 0.8, !0);
      e.stroke();
    }

    // 5. Camada intermediária de crânios envelhecidos
    const skulls = [
      { x: -6 * t, y: 1 * t, r: 2.8 * t, a: -0.2 },
      { x: 5 * t, y: 1.5 * t, r: 2.8 * t, a: 0.25 },
      { x: -2.5 * t, y: -2 * t, r: 3.2 * t, a: -0.1 },
      { x: 3 * t, y: -2.5 * t, r: 3 * t, a: 0.15 },
    ];

    for (const s of skulls) {
      e.fillStyle = "#e2e8f0";
      e.strokeStyle = "#475569";
      e.lineWidth = 0.8 * t;
      e.beginPath();
      e.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      e.fill();
      e.stroke();

      // Cavidades oculares pretas
      e.fillStyle = "#090d16";
      e.beginPath();
      e.ellipse(s.x - s.r * 0.35, s.y - s.r * 0.1, s.r * 0.22, s.r * 0.3, s.a, 0, Math.PI * 2);
      e.ellipse(s.x + s.r * 0.35, s.y - s.r * 0.1, s.r * 0.22, s.r * 0.3, s.a, 0, Math.PI * 2);
      e.fill();
      // Cavidade nasal
      e.beginPath();
      e.moveTo(s.x, s.y + s.r * 0.2);
      e.lineTo(s.x - 0.6 * t, s.y + s.r * 0.45);
      e.lineTo(s.x + 0.6 * t, s.y + s.r * 0.45);
      e.closePath();
      e.fill();
    }

    // 6. Crânio Central / Superior no topo da pilha (destaque macabro)
    const topY = -7 * t;
    const topR = 4 * t;

    e.fillStyle = "#f8fafc";
    e.strokeStyle = "#334155";
    e.lineWidth = 1 * t;
    e.beginPath();
    e.arc(0, topY, topR, 0, Math.PI * 2);
    e.fill();
    e.stroke();

    // Mandíbula e dentes
    e.fillStyle = "#e2e8f0";
    e.fillRect(-2 * t, topY + topR * 0.6, 4 * t, 2.5 * t);
    e.strokeRect(-2 * t, topY + topR * 0.6, 4 * t, 2.5 * t);
    e.strokeStyle = "#475569";
    e.lineWidth = 0.7 * t;
    for (let d = -1.2; d <= 1.2; d += 0.8) {
      e.beginPath();
      e.moveTo(d * t, topY + topR * 0.6);
      e.lineTo(d * t, topY + topR * 0.6 + 2.5 * t);
      e.stroke();
    }

    // Olhos profundos com fulgor sutil
    e.fillStyle = "#090d16";
    e.beginPath();
    e.ellipse(-1.5 * t, topY - 0.5 * t, 1.1 * t, 1.4 * t, -0.1, 0, Math.PI * 2);
    e.ellipse(1.5 * t, topY - 0.5 * t, 1.1 * t, 1.4 * t, 0.1, 0, Math.PI * 2);
    e.fill();

    // Nariz
    e.beginPath();
    e.moveTo(0, topY + 0.8 * t);
    e.lineTo(-0.8 * t, topY + 2 * t);
    e.lineTo(0.8 * t, topY + 2 * t);
    e.closePath();
    e.fill();

    // Detalhes por subType:
    if (subType === 0) {
      // Chifres ancestrais de besta saindo do crânio do topo
      e.strokeStyle = "#78350f";
      e.lineWidth = 2.2 * t;
      e.beginPath();
      e.moveTo(-3 * t, topY - 2 * t);
      e.quadraticCurveTo(-9 * t, topY - 7 * t, -7 * t, topY - 11 * t);
      e.stroke();
      e.beginPath();
      e.moveTo(3 * t, topY - 2 * t);
      e.quadraticCurveTo(9 * t, topY - 7 * t, 7 * t, topY - 11 * t);
      e.stroke();
    } else if (subType === 1) {
      // Vários crânios menores rodeando o topo
      e.fillStyle = "#cbd5e1";
      e.beginPath();
      e.arc(-5.5 * t, topY + 2 * t, 2.5 * t, 0, Math.PI * 2);
      e.arc(5.5 * t, topY + 2 * t, 2.5 * t, 0, Math.PI * 2);
      e.fill();
    } else if (subType === 2) {
      // Espinha dorsal longa e vértebras
      e.strokeStyle = "#94a3b8";
      e.lineWidth = 1.6 * t;
      for (let v = 0; v < 6; v++) {
        e.beginPath();
        e.arc(-6 * t + v * 2.5 * t, 6 * t, 1.4 * t, 0, Math.PI * 2);
        e.stroke();
      }
    } else if (subType === 3) {
      // Vela com chaminha espectral azulada na pilha
      e.fillStyle = "#ca8a04";
      e.fillRect(-1 * t, topY - 6 * t, 2 * t, 5 * t);
      e.fillStyle = "rgba(56, 189, 248, 0.85)";
      e.beginPath();
      e.ellipse(0, topY - 7.5 * t, 1.2 * t, 2.2 * t, 0, 0, Math.PI * 2);
      e.fill();
    }

    e.restore();
  }

  function drawBookshelf(e, t = 1, subType = 0, isCollected = !1, booksTaken = 0) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    booksTaken = typeof booksTaken === "number" ? booksTaken : (isCollected ? 4 : 0);
    const maxBooks = 4;
    const remainingBooks = isCollected ? 0 : Math.max(0, maxBooks - booksTaken);
    e.save();

    // 1. Sombra projetada no piso de mosaico
    e.fillStyle = "rgba(15, 23, 42, 0.45)";
    e.beginPath();
    e.ellipse(0, 5 * t, 15 * t, 4.5 * t, 0, 0, Math.PI * 2);
    e.fill();

    // 2. Estrutura de madeira nobre de cedro (fundo da estante)
    const w = 26 * t;
    const h = 32 * t;
    const x0 = -w / 2;
    const y0 = -h + 4 * t;

    // Fundo escuro do móvel
    e.fillStyle = "#3b1604";
    e.fillRect(x0 + 2 * t, y0 + 2 * t, w - 4 * t, h - 3 * t);

    // Laterais de madeira de cedro
    e.fillStyle = "#78350f";
    e.fillRect(x0, y0, 3 * t, h);
    e.fillRect(x0 + w - 3 * t, y0, 3 * t, h);

    // Detalhe entalhado nas laterais (caneluras clássicas)
    e.fillStyle = "#b45309";
    e.fillRect(x0 + 1 * t, y0 + 4 * t, 1 * t, h - 8 * t);
    e.fillRect(x0 + w - 2 * t, y0 + 4 * t, 1 * t, h - 8 * t);

    // Topo com cornija / frontão clássico esculpido
    e.fillStyle = "#92400e";
    e.fillRect(x0 - 1.5 * t, y0 - 3 * t, w + 3 * t, 4 * t);
    e.fillStyle = "#d97706";
    e.fillRect(x0 - 0.5 * t, y0 - 1.5 * t, w + 1 * t, 1.2 * t);

    // Base sólida reforçada
    e.fillStyle = "#5c2509";
    e.fillRect(x0 - 1 * t, y0 + h - 2 * t, w + 2 * t, 4 * t);

    // 3 Prateleiras horizontais de apoio
    const shelvesY = [
      y0 + h * 0.32,
      y0 + h * 0.64,
      y0 + h - 2 * t,
    ];

    for (const sy of shelvesY) {
      e.fillStyle = "#92400e";
      e.fillRect(x0 + 2 * t, sy, w - 4 * t, 2.2 * t);
      e.fillStyle = "#b45309";
      e.fillRect(x0 + 2 * t, sy + 0.5 * t, w - 4 * t, 0.8 * t);
    }

    // 3. APENAS LIVROS COLETÁVEIS (Sem livros de decoração!)
    // Cada livro desenhado corresponde exatamente a 1 livro que pode ser recolhido.
    // Quando todos forem coletados (remainingBooks === 0), a estante fica limpa/vazia.
    if (remainingBooks > 0) {
      const bookColors = ["#991b1b", "#1e3a8a", "#14532d", "#78350f", "#581c87"];
      const accentColors = ["#fbbf24", "#fef08a", "#fde047", "#f8fafc"];

      // 1º Livro Coletável (se restante >= 1): Tomo na prateleira superior
      if (remainingBooks >= 1) {
        const b1X = x0 + 5 * t;
        const b1W = 4.2 * t;
        const b1H = 8.5 * t;
        const b1Y = shelvesY[0] - b1H;
        e.fillStyle = bookColors[subType % bookColors.length];
        e.fillRect(b1X, b1Y, b1W, b1H);
        e.fillStyle = accentColors[subType % accentColors.length];
        e.fillRect(b1X + 0.5 * t, b1Y + 1.5 * t, b1W - 1 * t, 0.9 * t);
        e.fillRect(b1X + 0.5 * t, b1Y + b1H - 2.2 * t, b1W - 1 * t, 0.9 * t);
      }

      // 2º Livro Coletável (se restante >= 2): Segundo tomo na prateleira superior
      if (remainingBooks >= 2) {
        const b2X = x0 + 10.5 * t;
        const b2W = 4 * t;
        const b2H = 7.8 * t;
        const b2Y = shelvesY[0] - b2H;
        e.fillStyle = bookColors[(subType + 1) % bookColors.length];
        e.fillRect(b2X, b2Y, b2W, b2H);
        e.fillStyle = accentColors[(subType + 1) % accentColors.length];
        e.fillRect(b2X + 0.5 * t, b2Y + 2 * t, b2W - 1 * t, 0.8 * t);
      }

      // 3º Livro Coletável (se restante >= 3): Tomo na prateleira do meio
      if (remainingBooks >= 3) {
        const b3X = x0 + 7 * t;
        const b3W = 4.5 * t;
        const b3H = 8 * t;
        const b3Y = shelvesY[1] - b3H;
        e.fillStyle = bookColors[(subType + 2) % bookColors.length];
        e.fillRect(b3X, b3Y, b3W, b3H);
        e.fillStyle = accentColors[(subType + 2) % accentColors.length];
        e.fillRect(b3X + 0.5 * t, b3Y + 1.8 * t, b3W - 1 * t, 1 * t);
        e.fillRect(b3X + 0.5 * t, b3Y + b3H - 2.5 * t, b3W - 1 * t, 1 * t);
      }

      // 4º Livro Coletável (se restante >= 4): Grande Compêndio na prateleira inferior
      if (remainingBooks >= 4) {
        const b4X = x0 + 8 * t;
        const b4W = 5.2 * t;
        const b4H = 9 * t;
        const b4Y = shelvesY[2] - b4H;
        e.fillStyle = bookColors[(subType + 3) % bookColors.length];
        e.fillRect(b4X, b4Y, b4W, b4H);
        e.fillStyle = accentColors[(subType + 3) % accentColors.length];
        e.fillRect(b4X + 0.6 * t, b4Y + 2 * t, b4W - 1.2 * t, 1.2 * t);
        e.fillRect(b4X + 0.6 * t, b4Y + 4.5 * t, b4W - 1.2 * t, 1 * t);
      }
    }

    e.strokeStyle = "#451a03";
    e.lineWidth = 1 * t;
    e.strokeRect(x0, y0, w, h);

    e.restore();
  }

  function drawScrollStand(e, t = 1, subType = 0, isCollected = !1, scrollsTaken = 0) {
    t = (typeof t === "number" && isFinite(t) && t > 0) ? t : 1;
    scrollsTaken = typeof scrollsTaken === "number" ? scrollsTaken : (isCollected ? 2 : 0);
    const maxScrolls = 2;
    const remainingScrolls = isCollected ? 0 : Math.max(0, maxScrolls - scrollsTaken);
    e.save();

    // 1. Sombra da mesa/escrivaninha
    e.fillStyle = "rgba(15, 23, 42, 0.42)";
    e.beginPath();
    e.ellipse(0, 5 * t, 14 * t, 6 * t, 0, 0, Math.PI * 2);
    e.fill();

    // 2. Mesa helênica de madeira polida (Trapeza de estudo)
    e.fillStyle = "#5c2509";
    e.fillRect(-10 * t, -2 * t, 2.5 * t, 7 * t);
    e.fillRect(8 * t, -2 * t, 2.5 * t, 7 * t);
    e.fillRect(-1 * t, -1 * t, 2.2 * t, 6 * t);

    // Tampo inclinado da escrivaninha de escriba
    e.fillStyle = "#854d0e";
    e.beginPath();
    e.moveTo(-12 * t, -1 * t);
    e.lineTo(-11 * t, -10 * t);
    e.lineTo(11 * t, -10 * t);
    e.lineTo(12 * t, -1 * t);
    e.closePath();
    e.fill();
    e.strokeStyle = "#713f12";
    e.lineWidth = 1 * t;
    e.stroke();

    // Friso de madeira no topo e na base do tampo
    e.fillStyle = "#a16207";
    e.fillRect(-12.5 * t, -1 * t, 25 * t, 2 * t);
    e.fillRect(-11.5 * t, -10.5 * t, 23 * t, 1.5 * t);

    // 3. APENAS PERGAMINHOS COLETÁVEIS (Sem pergaminhos de decoração!)
    // 1º Pergaminho Coletável: desenrolado sobre a escrivaninha (se restam 2)
    if (remainingScrolls >= 2) {
      e.fillStyle = "#fef3c7";
      e.fillRect(-8 * t, -8.5 * t, 14 * t, 7 * t);
      e.strokeStyle = "#d97706";
      e.lineWidth = 0.8 * t;
      e.strokeRect(-8 * t, -8.5 * t, 14 * t, 7 * t);

      e.fillStyle = "#78350f";
      e.fillRect(-8.8 * t, -9 * t, 1.2 * t, 8 * t);
      e.fillRect(5.6 * t, -9 * t, 1.2 * t, 8 * t);
      e.fillStyle = "#f59e0b";
      e.fillRect(-9 * t, -9.5 * t, 1.6 * t, 1 * t);
      e.fillRect(5.4 * t, -9.5 * t, 1.6 * t, 1 * t);
      e.fillRect(-9 * t, -1.2 * t, 1.6 * t, 1 * t);
      e.fillRect(5.4 * t, -1.2 * t, 1.6 * t, 1 * t);

      e.strokeStyle = "#78350f";
      e.lineWidth = 0.6 * t;
      for (let r = 0; r < 4; r++) {
        const lineY = (-7 + r * 1.5) * t;
        e.beginPath();
        e.moveTo(-6 * t, lineY);
        e.lineTo(4 * t, lineY);
        e.stroke();
      }
      if (subType === 0) {
        e.strokeStyle = "#92400e";
        e.beginPath();
        e.arc(1.5 * t, -4 * t, 1.8 * t, 0, Math.PI * 2);
        e.stroke();
      }
    }

    // 4. Capsa (cesta cilíndrica de bronze) ao lado da mesa
    const capsaX = 8 * t;
    const capsaY = 1 * t;

    e.fillStyle = "rgba(15, 23, 42, 0.35)";
    e.beginPath();
    e.ellipse(capsaX, capsaY + 3 * t, 4 * t, 2 * t, 0, 0, Math.PI * 2);
    e.fill();

    // 2º Pergaminho Coletável: rolo com fita vermelha na capsa (se resta pelo menos 1)
    if (remainingScrolls >= 1) {
      e.fillStyle = "#fef08a";
      e.fillRect(capsaX - 1 * t, capsaY - 8 * t, 2 * t, 7 * t);
      e.fillStyle = "#b91c1c";
      e.fillRect(capsaX - 1 * t, capsaY - 5 * t, 2 * t, 1 * t);
    }

    // Estrutura da cesta de bronze
    e.fillStyle = "#b45309";
    e.fillRect(capsaX - 3.5 * t, capsaY - 3 * t, 7 * t, 6.5 * t);
    e.fillStyle = "#d97706";
    e.fillRect(capsaX - 3.5 * t, capsaY - 3 * t, 7 * t, 1.2 * t);
    e.strokeStyle = "#78350f";
    e.lineWidth = 0.8 * t;
    e.strokeRect(capsaX - 3.5 * t, capsaY - 3 * t, 7 * t, 6.5 * t);

    // 5. Tinteiro de cerâmica escura com cálamo
    e.fillStyle = "#1e293b";
    e.beginPath();
    e.arc(-9.5 * t, -8.5 * t, 1.5 * t, 0, Math.PI * 2);
    e.fill();
    e.strokeStyle = "#f8fafc";
    e.lineWidth = 0.8 * t;
    e.beginPath();
    e.moveTo(-9.5 * t, -8.5 * t);
    e.lineTo(-12 * t, -13 * t);
    e.stroke();

    e.restore();
  }

  // =========================================================================
  // VILA GLACIAL DOS PICOS GELADOS: DESENHO DE PISOS, CASAS, CHAMINÉS E MÓVEIS
  // =========================================================================

  // 1. Desenho do Piso: Paralelepípedos nas ruas/praça, tábuas e pedras nas casas
  function drawSnowCityFloor(g, l, o, u, t, animTimer) {
    const role = t.snowCityRole || "road";
    const roomName = t.snowCityRoom || "";
    const isChecker = (Math.abs(t.tx + t.ty) % 2) === 0;

    // A. RUAS DE PARALELEPÍPEDO (Cobblestone)
    if (role === "road") {
      // Base de argamassa escura entre as pedras
      g.fillStyle = "#1e293b";
      g.fillRect(l, o, u + 1, u + 1);

      // 4 fileiras de pedras retangulares de paralelepípedo
      const rows = 4;
      const rowH = u / rows;
      const stoneColors = ["#475569", "#3b4252", "#4c566a", "#334155", "#525d72"];

      for (let r = 0; r < rows; r++) {
        const ry = o + r * rowH;
        // Alterna o deslocamento horizontal das pedras nas fileiras ímpares (running bond)
        const offset = (r % 2 === 1) ? u * 0.25 : 0;
        const stoneW = u * 0.46;

        for (let col = -1; col < 3; col++) {
          const rx = l + offset + col * stoneW + 1;
          const rw = stoneW - 2;
          const rh = rowH - 1.5;

          // Seleciona cor pseudo-aleatória determinística por posição
          const colorIdx = Math.abs(t.tx * 7 + t.ty * 13 + r * 5 + col * 3) % stoneColors.length;
          g.fillStyle = stoneColors[colorIdx];
          g.fillRect(rx, ry + 0.5, rw, rh);

          // Chanfro de luz no topo e esquerda do paralelepípedo (relevo 3D)
          g.fillStyle = "rgba(226, 232, 240, 0.35)";
          g.fillRect(rx, ry + 0.5, rw, 1);
          g.fillRect(rx, ry + 0.5, 1, rh);

          // Sombra chanfrada na base e direita
          g.fillStyle = "rgba(15, 23, 42, 0.7)";
          g.fillRect(rx, ry + rh - 0.5, rw, 1);
          g.fillRect(rx + rw - 1, ry + 0.5, 1, rh);
        }
      }

      // Pequenas nesgas de neve acumulada nas frestas e cantos do calçamento
      const snowSeed = Math.abs(t.tx * 11 + t.ty * 17) % 5;
      if (snowSeed < 3) {
        g.fillStyle = "rgba(241, 245, 249, 0.65)";
        g.beginPath();
        if (snowSeed === 0) {
          g.arc(l + u * 0.2, o + u * 0.25, 2.2, 0, Math.PI * 2);
          g.arc(l + u * 0.75, o + u * 0.8, 1.8, 0, Math.PI * 2);
        } else if (snowSeed === 1) {
          g.arc(l + u * 0.82, o + u * 0.3, 2.5, 0, Math.PI * 2);
        } else {
          g.arc(l + u * 0.35, o + u * 0.72, 2.0, 0, Math.PI * 2);
        }
        g.fill();
      }
      return;
    }

    // B. PRAÇA CENTRAL DE PARALELEPÍPEDOS (Mosaico Ornamental)
    if (role === "plaza") {
      g.fillStyle = "#1e293b";
      g.fillRect(l, o, u + 1, u + 1);

      // Padrão de paralelepípedos em anéis decorativos com pedra azul-ardósia
      const plazaColors = isChecker
        ? ["#334155", "#475569", "#3b4252"]
        : ["#475569", "#525d72", "#334155"];

      const cols = 3;
      const colW = u / cols;
      const rows = 3;
      const rowH = u / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = l + c * colW + 1;
          const py = o + r * rowH + 1;
          const pw = colW - 2;
          const ph = rowH - 2;

          const pCol = plazaColors[(r + c) % plazaColors.length];
          g.fillStyle = pCol;
          g.fillRect(px, py, pw, ph);

          // Borda chanfrada
          g.fillStyle = "rgba(241, 245, 249, 0.4)";
          g.fillRect(px, py, pw, 1);
          g.fillRect(px, py, 1, ph);
          g.fillStyle = "rgba(15, 23, 42, 0.75)";
          g.fillRect(px, py + ph - 1, pw, 1);
          g.fillRect(px + pw - 1, py, 1, ph);
        }
      }

      // Detalhe central no piso da praça
      if (isChecker) {
        g.fillStyle = "rgba(245, 158, 11, 0.25)";
        g.fillRect(l + u * 0.35, o + u * 0.35, u * 0.3, u * 0.3);
      }

      // Neve nas juntas
      g.fillStyle = "rgba(241, 245, 249, 0.5)";
      g.fillRect(l + u * 0.05, o + u * 0.9, 3, 2);
      g.fillRect(l + u * 0.9, o + u * 0.1, 2.5, 2.5);
      return;
    }

    // C. PISO INTERIOR DAS CASAS
    if (role === "house_floor") {
      // Banheiro: Lajes polidas de ardósia cinza-azulada com tapete azul
      if (roomName.includes("Banheiro")) {
        g.fillStyle = isChecker ? "#334155" : "#1e293b";
        g.fillRect(l, o, u + 1, u + 1);

        g.strokeStyle = "rgba(15, 23, 42, 0.8)";
        g.lineWidth = 1;
        g.strokeRect(l + 0.5, o + 0.5, u * 0.5, u * 0.5);
        g.strokeRect(l + u * 0.5 + 0.5, o + 0.5, u * 0.5, u * 0.5);
        g.strokeRect(l + 0.5, o + u * 0.5 + 0.5, u * 0.5, u * 0.5);
        g.strokeRect(l + u * 0.5 + 0.5, o + u * 0.5 + 0.5, u * 0.5, u * 0.5);

        // Tapete azul no centro do banheiro
        if ((Math.abs(t.tx * 3 + t.ty) % 4) === 0) {
          g.fillStyle = "rgba(2, 132, 199, 0.35)";
          g.fillRect(l + 3, o + 3, u - 6, u - 6);
        }
        return;
      }

      // Quarto e Sala: Tábuas aconchegantes de pinheiro nórdico com verniz âmbar
      g.fillStyle = isChecker ? "#92400e" : "#78350f";
      g.fillRect(l, o, u + 1, u + 1);

      // Linhas das tábuas horizontais de madeira
      const planks = 4;
      const plankH = u / planks;
      g.strokeStyle = "rgba(69, 26, 3, 0.65)";
      g.lineWidth = 1;

      for (let p = 0; p < planks; p++) {
        const py = o + p * plankH;
        g.beginPath();
        g.moveTo(l, py);
        g.lineTo(l + u, py);
        g.stroke();

        // Cabeças de pregos e veios sutis
        g.fillStyle = "#451a03";
        g.fillRect(l + 3, py + plankH * 0.45, 1.2, 1.2);
        g.fillRect(l + u - 4, py + plankH * 0.45, 1.2, 1.2);
      }

      // Tapete felpudo decorativo no centro do quarto ou em frente à lareira da sala
      if ((Math.abs(t.tx + t.ty * 2) % 3) === 0) {
        g.fillStyle = "rgba(180, 83, 9, 0.32)";
        g.fillRect(l + 2, o + 2, u - 4, u - 4);
        g.strokeStyle = "#d97706";
        g.lineWidth = 0.8;
        g.strokeRect(l + 2.5, o + 2.5, u - 5, u - 5);
      }
      return;
    }

    // D. SOLEIRA DA PORTA
    if (role === "door") {
      g.fillStyle = "#475569";
      g.fillRect(l, o, u + 1, u + 1);
      g.fillStyle = "#64748b";
      g.fillRect(l + 2, o + 2, u - 4, u - 4);
      g.strokeStyle = "#334155";
      g.lineWidth = 1.2;
      g.strokeRect(l + 2, o + 2, u - 4, u - 4);
      return;
    }

    // Fundo padrão
    g.fillStyle = "#334155";
    g.fillRect(l, o, u + 1, u + 1);
  }

  // 2. Parede 2.5D de Pedra da Montanha com Vigas de Madeira e Telhado Nevado
  function drawSnowCityWall(e, t, subType = 0, neighbors = null) {
    e.save();
    const nL = !!(neighbors && neighbors.left);
    const nR = !!(neighbors && neighbors.right);
    const nB = !!(neighbors && neighbors.bottom);
    const half = 18 * t;
    const leftX = nL ? -half - 1 * t : -half + 1 * t;
    const rightX = nR ? half + 1 * t : half - 1 * t;
    const w = rightX - leftX;
    const wallH = 26 * t;
    const baseY = 18 * t;
    const topFrontY = baseY - wallH;

    // Sombra projetada no piso ao sul
    if (!nB) {
      e.fillStyle = "rgba(15, 23, 42, 0.65)";
      e.fillRect(leftX - 1 * t, baseY - 2 * t, w + 2 * t, 9 * t);
    }

    // Face frontal da parede: Blocos de pedra de cantaria cinza ardósia
    const wallGrad = e.createLinearGradient(0, topFrontY, 0, baseY);
    wallGrad.addColorStop(0, "#475569");
    wallGrad.addColorStop(0.5, "#334155");
    wallGrad.addColorStop(1, "#1e293b");
    e.fillStyle = wallGrad;
    e.fillRect(leftX, topFrontY, w, wallH);

    // Linhas de assentamento de cantaria
    e.strokeStyle = "rgba(15, 23, 42, 0.75)";
    e.lineWidth = 1.2 * t;
    e.beginPath();
    e.moveTo(leftX, topFrontY + 8 * t);
    e.lineTo(rightX, topFrontY + 8 * t);
    e.moveTo(leftX, topFrontY + 17 * t);
    e.lineTo(rightX, topFrontY + 17 * t);
    // Juntas verticais
    e.moveTo(leftX + w * 0.45, topFrontY);
    e.lineTo(leftX + w * 0.45, topFrontY + 8 * t);
    e.moveTo(leftX + w * 0.75, topFrontY + 8 * t);
    e.lineTo(leftX + w * 0.75, topFrontY + 17 * t);
    e.moveTo(leftX + w * 0.25, topFrontY + 8 * t);
    e.lineTo(leftX + w * 0.25, topFrontY + 17 * t);
    e.moveTo(leftX + w * 0.55, topFrontY + 17 * t);
    e.lineTo(leftX + w * 0.55, baseY);
    e.stroke();

    // Vigas verticais e horizontais de carvalho nórdico (enxaimel alpino)
    e.fillStyle = "#78350f";
    e.fillRect(leftX, topFrontY, 2.5 * t, wallH);
    e.fillRect(rightX - 2.5 * t, topFrontY, 2.5 * t, wallH);
    e.fillRect(leftX, baseY - 3.5 * t, w, 3.5 * t);

    // Beiral superior do telhado: Tábuas de pinheiro
    e.fillStyle = "#451a03";
    e.fillRect(leftX - 1.5 * t, topFrontY - 2 * t, w + 3 * t, 3.5 * t);

    // Camada espessa de NEVE BRANCA acumulada no topo da parede
    e.fillStyle = "#f8fafc";
    e.beginPath();
    e.moveTo(leftX - 2 * t, topFrontY - 2 * t);
    e.lineTo(rightX + 2 * t, topFrontY - 2 * t);
    e.lineTo(rightX + 2 * t, topFrontY + 2.5 * t);
    // Ondulação suave da neve caída
    e.quadraticCurveTo(leftX + w * 0.5, topFrontY + 4 * t, leftX - 2 * t, topFrontY + 2.5 * t);
    e.closePath();
    e.fill();

    // Sombra suave sob a neve
    e.strokeStyle = "rgba(203, 213, 225, 0.85)";
    e.lineWidth = 1 * t;
    e.stroke();

    e.restore();
  }

  // 3. Porta da Casa: Carvalho com Ferragens e Batente de Pedra (Abre e Fecha)
  function drawSnowCityDoor(e, t, opened = false) {
    e.save();
    const half = 18 * t;
    const baseY = 18 * t;
    const doorH = 25 * t;
    const topY = baseY - doorH;

    // Batente de cantaria de pedra cinza
    e.fillStyle = "#334155";
    e.fillRect(-12 * t, topY, 24 * t, doorH);
    e.strokeStyle = "#1e293b";
    e.lineWidth = 1.2 * t;
    e.strokeRect(-12 * t, topY, 24 * t, doorH);

    // Neve no topo do lintel de pedra
    e.fillStyle = "#f8fafc";
    e.fillRect(-13 * t, topY - 2 * t, 26 * t, 3 * t);

    if (opened) {
      // Interior visível escuro/acolhedor com luz âmbar da lareira
      e.fillStyle = "#1e1b4b";
      e.fillRect(-9 * t, topY + 2 * t, 18 * t, doorH - 2 * t);
      e.fillStyle = "rgba(245, 158, 11, 0.4)";
      e.fillRect(-8 * t, topY + 4 * t, 16 * t, doorH - 6 * t);

      // Folha da porta aberta em perspectiva lateral
      e.fillStyle = "#78350f";
      e.beginPath();
      e.moveTo(7 * t, topY + 2 * t);
      e.lineTo(13 * t, topY - 2 * t);
      e.lineTo(13 * t, baseY - 4 * t);
      e.lineTo(7 * t, baseY);
      e.closePath();
      e.fill();
    } else {
      // Porta fechada de carvalho maciço
      const woodGrad = e.createLinearGradient(0, topY, 0, baseY);
      woodGrad.addColorStop(0, "#92400e");
      woodGrad.addColorStop(1, "#78350f");
      e.fillStyle = woodGrad;
      e.fillRect(-9 * t, topY + 2 * t, 18 * t, doorH - 2 * t);

      // Tábuas verticais
      e.strokeStyle = "#451a03";
      e.lineWidth = 1 * t;
      e.beginPath();
      e.moveTo(-3 * t, topY + 2 * t);
      e.lineTo(-3 * t, baseY);
      e.moveTo(3 * t, topY + 2 * t);
      e.lineTo(3 * t, baseY);
      e.stroke();

      // Dobradiças de ferro preto
      e.fillStyle = "#0f172a";
      e.fillRect(-8.5 * t, topY + 6 * t, 15 * t, 2.2 * t);
      e.fillRect(-8.5 * t, baseY - 8 * t, 15 * t, 2.2 * t);

      // Maçaneta de latão dourado
      e.fillStyle = "#fbbf24";
      e.beginPath();
      e.arc(5 * t, baseY - 12 * t, 1.8 * t, 0, Math.PI * 2);
      e.fill();
      e.strokeStyle = "#b45309";
      e.lineWidth = 0.8 * t;
      e.stroke();
    }

    e.restore();
  }

  // 4. Chaminé de Pedra em TODAS as Casas com Fumaça Viva Animada
  function drawSnowCityChimney(e, t, animTimer = 0) {
    e.save();
    const half = 18 * t;
    const baseY = 18 * t;
    const chimneyH = 32 * t;
    const topY = baseY - chimneyH;
    const chimW = 16 * t;
    const leftX = -chimW * 0.5;

    // Sombra na base
    e.fillStyle = "rgba(15, 23, 42, 0.65)";
    e.fillRect(leftX - 1 * t, baseY - 2 * t, chimW + 2 * t, 8 * t);

    // Corpo da chaminé: pedras de cantaria da montanha
    const chimGrad = e.createLinearGradient(0, topY, 0, baseY);
    chimGrad.addColorStop(0, "#475569");
    chimGrad.addColorStop(0.5, "#334155");
    chimGrad.addColorStop(1, "#1e293b");
    e.fillStyle = chimGrad;
    e.fillRect(leftX, topY, chimW, chimneyH);

    // Juntas de argamassa da cantaria
    e.strokeStyle = "rgba(15, 23, 42, 0.75)";
    e.lineWidth = 1 * t;
    e.strokeRect(leftX, topY, chimW, chimneyH);
    e.beginPath();
    for (let yOff = 8; yOff < 30; yOff += 7) {
      e.moveTo(leftX, topY + yOff * t);
      e.lineTo(leftX + chimW, topY + yOff * t);
    }
    e.stroke();

    // Chapéu/coroamento da chaminé
    e.fillStyle = "#1e293b";
    e.fillRect(leftX - 2 * t, topY - 3 * t, chimW + 4 * t, 4 * t);

    // Camada de neve no chapéu da chaminé
    e.fillStyle = "#f8fafc";
    e.fillRect(leftX - 2.5 * t, topY - 4.5 * t, chimW + 5 * t, 2.5 * t);

    // Abertura escura da saída de fumaça com brilho de brasa avermelhado
    e.fillStyle = "#0f172a";
    e.fillRect(leftX + 2 * t, topY - 1 * t, chimW - 4 * t, 2.5 * t);
    e.fillStyle = "rgba(234, 88, 12, 0.65)";
    e.fillRect(leftX + 4 * t, topY, chimW - 8 * t, 1.5 * t);

    // =====================================================================
    // FUMAÇA VIVA E ANIMADA SUBINDO AO AR FRIO DOS PICOS GELADOS
    // =====================================================================
    const puffCount = 5;
    for (let i = 0; i < puffCount; i++) {
      // Ciclo temporal de cada baforada
      const puffTime = ((animTimer * 1.5 + i * 0.75) % 3.5);
      const prog = puffTime / 3.5; // 0 (saindo) até 1 (dissipando no ar)

      // Sobe verticalmente de topY até bem acima da chaminé
      const puffY = topY - 2 * t - prog * 44 * t;
      // Oscila suavemente ao vento lateral para a direita
      const puffX = Math.sin(animTimer * 2 + i * 1.3) * (3 * t) + prog * 16 * t;
      // Expande conforme sobe
      const puffRadius = (3.5 + prog * 8.5) * t;
      // Desvanece a opacidade
      const puffAlpha = Math.max(0, (1 - prog) * 0.58);

      e.fillStyle = `rgba(226, 232, 240, ${puffAlpha})`;
      e.beginPath();
      e.arc(puffX, puffY, puffRadius, 0, Math.PI * 2);
      e.fill();

      // Núcleo um pouco mais denso
      e.fillStyle = `rgba(241, 245, 249, ${puffAlpha * 0.75})`;
      e.beginPath();
      e.arc(puffX - 1 * t, puffY + 1 * t, puffRadius * 0.55, 0, Math.PI * 2);
      e.fill();
    }

    e.restore();
  }

  // 5. Lareira de Pedra da Montanha com Chamas Dançantes e Lenha Crepitante
  function drawSnowCityFireplace(e, t, animTimer = 0) {
    e.save();
    const half = 18 * t;
    const baseY = 18 * t;
    const fireW = 24 * t;
    const fireH = 24 * t;
    const leftX = -fireW * 0.5;
    const topY = baseY - fireH;

    // Estrutura externa de pedra da lareira
    e.fillStyle = "#334155";
    e.fillRect(leftX, topY, fireW, fireH);
    e.strokeStyle = "#1e293b";
    e.lineWidth = 1.2 * t;
    e.strokeRect(leftX, topY, fireW, fireH);

    // Moldura de cantaria no topo (prateleira da lareira)
    e.fillStyle = "#475569";
    e.fillRect(leftX - 2 * t, topY - 2 * t, fireW + 4 * t, 3.5 * t);
    e.fillStyle = "#78350f";
    e.fillRect(leftX - 2 * t, topY - 3.5 * t, fireW + 4 * t, 1.5 * t);

    // Nicho arqueado escuro do fogo
    e.fillStyle = "#0f172a";
    e.beginPath();
    e.moveTo(-8 * t, baseY);
    e.lineTo(-8 * t, topY + 7 * t);
    e.quadraticCurveTo(0, topY + 3 * t, 8 * t, topY + 7 * t);
    e.lineTo(8 * t, baseY);
    e.closePath();
    e.fill();

    // Troncos de lenha cruzados
    e.fillStyle = "#78350f";
    e.save();
    e.translate(0, baseY - 3 * t);
    e.rotate(-0.15);
    e.fillRect(-7 * t, -2 * t, 14 * t, 3.5 * t);
    e.rotate(0.3);
    e.fillStyle = "#92400e";
    e.fillRect(-6 * t, -2 * t, 12 * t, 3 * t);
    e.restore();

    // Brasa incandescente na base
    e.fillStyle = "#ea580c";
    e.fillRect(-6 * t, baseY - 5 * t, 12 * t, 3 * t);

    // CHAMAS DANÇANTES VIVAS (Animadas)
    const f1 = Math.sin(animTimer * 12) * 2 * t;
    const f2 = Math.cos(animTimer * 16) * 2.5 * t;

    // Labareda vermelha externa
    e.fillStyle = "rgba(239, 68, 68, 0.88)";
    e.beginPath();
    e.moveTo(-6 * t, baseY - 3 * t);
    e.quadraticCurveTo(-4 * t + f1, baseY - 12 * t, 0, baseY - 16 * t + f2);
    e.quadraticCurveTo(4 * t - f1, baseY - 12 * t, 6 * t, baseY - 3 * t);
    e.closePath();
    e.fill();

    // Labareda alaranjada média
    e.fillStyle = "rgba(245, 158, 11, 0.95)";
    e.beginPath();
    e.moveTo(-4 * t, baseY - 3 * t);
    e.quadraticCurveTo(-2 * t + f2, baseY - 10 * t, 0, baseY - 13 * t + f1);
    e.quadraticCurveTo(2 * t - f2, baseY - 10 * t, 4 * t, baseY - 3 * t);
    e.closePath();
    e.fill();

    // Núcleo amarelo vibrante
    e.fillStyle = "#fef08a";
    e.beginPath();
    e.moveTo(-2.5 * t, baseY - 3 * t);
    e.lineTo(0, baseY - 8 * t + f1);
    e.lineTo(2.5 * t, baseY - 3 * t);
    e.closePath();
    e.fill();

    // Grade protetora de ferro forjado na frente da lareira
    e.strokeStyle = "#0f172a";
    e.lineWidth = 1 * t;
    e.beginPath();
    for (let gx = -7; gx <= 7; gx += 3.5) {
      e.moveTo(gx * t, baseY - 5 * t);
      e.lineTo(gx * t, baseY);
    }
    e.moveTo(-7 * t, baseY - 4.5 * t);
    e.lineTo(7 * t, baseY - 4.5 * t);
    e.stroke();

    e.restore();
  }

  // 6. Fogão a Lenha e Forno com Vapor Animado na Cozinha
  function drawSnowCityStove(e, t, animTimer = 0) {
    e.save();
    const baseY = 18 * t;
    const stoveH = 20 * t;
    const stoveW = 20 * t;
    const topY = baseY - stoveH;

    // Corpo de ferro fundido escuro do fogão
    e.fillStyle = "#1e293b";
    e.fillRect(-10 * t, topY, stoveW, stoveH);
    e.strokeStyle = "#0f172a";
    e.lineWidth = 1.2 * t;
    e.strokeRect(-10 * t, topY, stoveW, stoveH);

    // Chapa superior de ferro com bocas circulares
    e.fillStyle = "#334155";
    e.fillRect(-11 * t, topY - 2 * t, 22 * t, 3.5 * t);
    e.fillStyle = "#0f172a";
    e.beginPath();
    e.arc(-5 * t, topY, 2.5 * t, 0, Math.PI * 2);
    e.arc(5 * t, topY, 2.5 * t, 0, Math.PI * 2);
    e.fill();

    // Panela de cobre com ensopado e vapor
    e.fillStyle = "#b45309";
    e.fillRect(-8 * t, topY - 7 * t, 6 * t, 5 * t);
    e.fillStyle = "#d97706";
    e.fillRect(-9 * t, topY - 8 * t, 8 * t, 1.5 * t);

    // Chaleira com bico
    e.fillStyle = "#475569";
    e.beginPath();
    e.arc(5 * t, topY - 4 * t, 3.5 * t, 0, Math.PI * 2);
    e.fill();

    // Baforadas de vapor suave da panela
    const steam1 = Math.sin(animTimer * 5) * 2 * t;
    const steamProg = (animTimer * 2) % 2;
    e.fillStyle = "rgba(241, 245, 249, 0.6)";
    e.beginPath();
    e.arc(-5 * t + steam1, topY - 11 * t - steamProg * 6 * t, 2 * t + steamProg * 1.5 * t, 0, Math.PI * 2);
    e.fill();

    // Porta do forno de ferro com puxador
    e.fillStyle = "#0f172a";
    e.fillRect(-7 * t, topY + 7 * t, 14 * t, 10 * t);
    e.fillStyle = "#ea580c";
    e.fillRect(-5 * t, topY + 11 * t, 10 * t, 2 * t);
    e.fillStyle = "#94a3b8";
    e.fillRect(4 * t, topY + 11 * t, 1.5 * t, 4 * t);

    e.restore();
  }

  // 7. Tina / Banheira de Imersão Aquecida no Banheiro
  function drawSnowCityBathtub(e, t, animTimer = 0) {
    e.save();
    const baseY = 18 * t;
    const tubW = 26 * t;
    const tubH = 16 * t;
    const topY = baseY - tubH;

    // Corpo de madeira nobre com aros de ferro
    e.fillStyle = "#78350f";
    e.beginPath();
    e.ellipse(0, baseY - 8 * t, tubW * 0.5, tubH * 0.5, 0, 0, Math.PI * 2);
    e.fill();
    e.strokeStyle = "#451a03";
    e.lineWidth = 1.2 * t;
    e.stroke();

    // Aros de ferro escuro
    e.strokeStyle = "#0f172a";
    e.lineWidth = 1.5 * t;
    e.beginPath();
    e.ellipse(0, baseY - 6 * t, tubW * 0.48, tubH * 0.42, 0, 0, Math.PI * 2);
    e.stroke();

    // Água aquecida cristalina com ondulações sutis
    e.fillStyle = "#0284c7";
    e.beginPath();
    e.ellipse(0, baseY - 9 * t, tubW * 0.42, tubH * 0.36, 0, 0, Math.PI * 2);
    e.fill();

    // Brilho da água
    e.fillStyle = "rgba(186, 230, 253, 0.45)";
    e.beginPath();
    e.ellipse(-3 * t, baseY - 10 * t, tubW * 0.25, tubH * 0.18, -0.2, 0, Math.PI * 2);
    e.fill();

    // Vapor quente subindo suavemente
    const steamY = ((animTimer * 1.5) % 3);
    e.fillStyle = "rgba(241, 245, 249, 0.4)";
    e.beginPath();
    e.arc(Math.sin(animTimer * 3) * 3 * t, topY - steamY * 4 * t, 2.5 * t, 0, Math.PI * 2);
    e.fill();

    e.restore();
  }

  // 8. Cama Nórdica com Peles de Inverno no Quarto
  function drawSnowCityBed(e, t) {
    e.save();
    const baseY = 18 * t;
    const bedW = 24 * t;
    const bedH = 26 * t;
    const topY = baseY - bedH;

    // Estrutura de madeira de pinheiro escuro
    e.fillStyle = "#78350f";
    e.fillRect(-bedW * 0.5, topY, bedW, bedH);
    e.strokeStyle = "#451a03";
    e.lineWidth = 1.2 * t;
    e.strokeRect(-bedW * 0.5, topY, bedW, bedH);

    // Cabeceira da cama torneada
    e.fillStyle = "#92400e";
    e.fillRect(-bedW * 0.5 - 1 * t, topY - 3 * t, bedW + 2 * t, 4 * t);

    // Dois travesseiros macios brancos
    e.fillStyle = "#f8fafc";
    e.fillRect(-10 * t, topY + 2 * t, 9 * t, 5.5 * t);
    e.fillRect(1 * t, topY + 2 * t, 9 * t, 5.5 * t);
    e.strokeStyle = "#cbd5e1";
    e.lineWidth = 0.8 * t;
    e.strokeRect(-10 * t, topY + 2 * t, 9 * t, 5.5 * t);
    e.strokeRect(1 * t, topY + 2 * t, 9 * t, 5.5 * t);

    // Cobertor grosso vermelho xadrez nórdico
    e.fillStyle = "#991b1b";
    e.fillRect(-11 * t, topY + 8 * t, 22 * t, bedH - 9 * t);

    // Pelerine / faixa de pele de carneiro felpuda branca no pé da cama
    e.fillStyle = "#f1f5f9";
    e.fillRect(-11 * t, baseY - 8 * t, 22 * t, 6.5 * t);
    e.strokeStyle = "#e2e8f0";
    e.lineWidth = 0.8 * t;
    e.strokeRect(-11 * t, baseY - 8 * t, 22 * t, 6.5 * t);

    e.restore();
  }

  // 9. Móveis Decorativos e Utilitários das Casas
  function drawSnowCityFurniture(e, t, kind) {
    e.save();
    const baseY = 18 * t;

    switch (kind) {
      case "snow_city_sofa": {
        // Sofá / poltrona acolchoada na sala
        e.fillStyle = "#1e3a5f";
        e.fillRect(-11 * t, baseY - 16 * t, 22 * t, 15 * t);
        e.fillStyle = "#2563eb";
        e.fillRect(-9 * t, baseY - 13 * t, 18 * t, 10 * t);
        // Almofadas de lã
        e.fillStyle = "#fef08a";
        e.fillRect(-8 * t, baseY - 12 * t, 7 * t, 7 * t);
        e.fillRect(1 * t, baseY - 12 * t, 7 * t, 7 * t);
        break;
      }
      case "snow_city_table": {
        // Mesinha de centro redonda com caneca quente
        e.fillStyle = "#92400e";
        e.beginPath();
        e.ellipse(0, baseY - 6 * t, 9 * t, 5 * t, 0, 0, Math.PI * 2);
        e.fill();
        e.strokeStyle = "#78350f";
        e.lineWidth = 1 * t;
        e.stroke();
        // Caneca de chá
        e.fillStyle = "#f8fafc";
        e.fillRect(-2 * t, baseY - 10 * t, 3.5 * t, 4 * t);
        e.fillStyle = "#b45309";
        e.fillRect(-1.5 * t, baseY - 9 * t, 2.5 * t, 1.5 * t);
        break;
      }
      case "snow_city_nightstand": {
        // Criado-mudo com vela
        e.fillStyle = "#78350f";
        e.fillRect(-7 * t, baseY - 13 * t, 14 * t, 12 * t);
        e.strokeStyle = "#451a03";
        e.lineWidth = 1 * t;
        e.strokeRect(-7 * t, baseY - 13 * t, 14 * t, 12 * t);
        // Castiçal e chama de vela
        e.fillStyle = "#fbbf24";
        e.fillRect(-2 * t, baseY - 15 * t, 4 * t, 2 * t);
        e.fillStyle = "#f8fafc";
        e.fillRect(-1 * t, baseY - 18 * t, 2 * t, 3 * t);
        e.fillStyle = "#f59e0b";
        e.beginPath();
        e.arc(0, baseY - 20 * t, 1.5 * t, 0, Math.PI * 2);
        e.fill();
        break;
      }
      case "snow_city_wardrobe": {
        // Armário guarda-roupa de madeira de pinheiro
        e.fillStyle = "#78350f";
        e.fillRect(-10 * t, baseY - 24 * t, 20 * t, 23 * t);
        e.strokeStyle = "#451a03";
        e.lineWidth = 1.2 * t;
        e.strokeRect(-10 * t, baseY - 24 * t, 20 * t, 23 * t);
        // Divisão das duas portas
        e.beginPath();
        e.moveTo(0, baseY - 24 * t);
        e.lineTo(0, baseY - 1 * t);
        e.stroke();
        // Puxadores de latão
        e.fillStyle = "#fbbf24";
        e.fillRect(-2.5 * t, baseY - 12 * t, 1.5 * t, 2.5 * t);
        e.fillRect(1 * t, baseY - 12 * t, 1.5 * t, 2.5 * t);
        break;
      }
      case "snow_city_sink": {
        // Lavatório de pedra com espelho no banheiro
        e.fillStyle = "#475569";
        e.fillRect(-8 * t, baseY - 13 * t, 16 * t, 12 * t);
        e.fillStyle = "#cbd5e1";
        e.fillRect(-6 * t, baseY - 12 * t, 12 * t, 4 * t);
        // Espelho oval
        e.fillStyle = "#38bdf8";
        e.beginPath();
        e.ellipse(0, baseY - 18 * t, 5 * t, 6 * t, 0, 0, Math.PI * 2);
        e.fill();
        e.strokeStyle = "#94a3b8";
        e.lineWidth = 0.8 * t;
        e.stroke();
        break;
      }
      case "snow_city_toilet": {
        // Sanitário de madeira tratada
        e.fillStyle = "#78350f";
        e.fillRect(-6 * t, baseY - 14 * t, 12 * t, 13 * t);
        e.fillStyle = "#92400e";
        e.beginPath();
        e.ellipse(0, baseY - 8 * t, 5 * t, 4 * t, 0, 0, Math.PI * 2);
        e.fill();
        break;
      }
      case "snow_city_counter": {
        // Bancada de preparo de alimentos na cozinha
        e.fillStyle = "#78350f";
        e.fillRect(-10 * t, baseY - 15 * t, 20 * t, 14 * t);
        e.fillStyle = "#f8fafc";
        e.fillRect(-11 * t, baseY - 16 * t, 22 * t, 2.5 * t);
        // Tábua de corte e faca
        e.fillStyle = "#b45309";
        e.fillRect(-5 * t, baseY - 17.5 * t, 5 * t, 2 * t);
        e.fillStyle = "#94a3b8";
        e.fillRect(2 * t, baseY - 17.5 * t, 4 * t, 1 * t);
        break;
      }
      case "snow_city_pantry": {
        // Prateleiras de despensa com mantimentos
        e.fillStyle = "#78350f";
        e.fillRect(-9 * t, baseY - 22 * t, 18 * t, 21 * t);
        e.fillStyle = "#451a03";
        e.fillRect(-9 * t, baseY - 15 * t, 18 * t, 2 * t);
        e.fillRect(-9 * t, baseY - 8 * t, 18 * t, 2 * t);
        // Potes de cerâmica
        e.fillStyle = "#dc2626";
        e.fillRect(-7 * t, baseY - 14 * t, 3 * t, 4 * t);
        e.fillStyle = "#16a34a";
        e.fillRect(-2 * t, baseY - 14 * t, 3 * t, 4 * t);
        e.fillStyle = "#f59e0b";
        e.fillRect(3 * t, baseY - 14 * t, 3 * t, 4 * t);
        break;
      }
    }

    e.restore();
  }

  // 10. Monumento / Fogueira da Praça dos Picos Gelados (metade do tamanho colossal anterior, com colisor)
  function drawSnowCityMonument(e, t, animTimer = 0) {
    e.save();
    // Metade do tamanho anterior: raio de base ~18*s (cabe perfeitamente no tile central sem cobrir os bancos)
    const s = t * 0.65;
    const baseY = 6 * s;

    // Halo de calor alaranjado pulsante no chão de pedra ao redor da pira
    const pulse = (Math.sin(animTimer * 5) + 1) * 0.5;
    const glowGrad = e.createRadialGradient(0, 0, 5 * s, 0, 0, 36 * s);
    glowGrad.addColorStop(0, `rgba(251, 146, 60, ${0.42 + pulse * 0.12})`);
    glowGrad.addColorStop(0.55, `rgba(234, 88, 12, ${0.18 + pulse * 0.08})`);
    glowGrad.addColorStop(1, "rgba(234, 88, 12, 0)");
    e.fillStyle = glowGrad;
    e.beginPath();
    e.ellipse(0, 2 * s, 36 * s, 28 * s, 0, 0, Math.PI * 2);
    e.fill();

    // Base escalonada circular de granito da montanha
    e.fillStyle = "#1e293b";
    e.beginPath();
    e.ellipse(0, baseY + 3 * s, 26 * s, 19 * s, 0, 0, Math.PI * 2);
    e.fill();
    e.strokeStyle = "#0f172a";
    e.lineWidth = 1.5 * s;
    e.stroke();

    // Segundo degrau de blocos de pedra
    e.fillStyle = "#334155";
    e.beginPath();
    e.ellipse(0, baseY, 22 * s, 15 * s, 0, 0, Math.PI * 2);
    e.fill();
    e.strokeStyle = "#475569";
    e.lineWidth = 1.3 * s;
    e.stroke();

    // Anel de pedras brutas ao redor da fogueira
    const stoneCount = 10;
    for (let i = 0; i < stoneCount; i++) {
      const ang = (i / stoneCount) * Math.PI * 2;
      const rx = Math.cos(ang) * 18 * s;
      const ry = baseY - 1.5 * s + Math.sin(ang) * 11.5 * s;
      e.fillStyle = i % 2 === 0 ? "#475569" : "#334155";
      e.beginPath();
      e.ellipse(rx, ry, 5 * s, 3.8 * s, ang * 0.3, 0, Math.PI * 2);
      e.fill();
      e.strokeStyle = "#0f172a";
      e.lineWidth = 0.9 * s;
      e.stroke();
    }

    // Leito de brasas ardentes e carvão incandescente
    e.fillStyle = "#451a03";
    e.beginPath();
    e.ellipse(0, baseY - 2 * s, 15 * s, 9.5 * s, 0, 0, Math.PI * 2);
    e.fill();

    e.fillStyle = `rgba(234, 88, 12, ${0.82 + pulse * 0.18})`;
    e.beginPath();
    e.ellipse(0, baseY - 2.5 * s, 12.5 * s, 7.5 * s, 0, 0, Math.PI * 2);
    e.fill();

    // Toras de pinheiro empilhadas na fogueira
    const logs = [
      { ang: -0.35, len: 24, w: 4.2, col: "#451a03" },
      { ang: 0.35, len: 24, w: 4.2, col: "#78350f" },
      { ang: 1.15, len: 20, w: 3.8, col: "#5c2808" },
      { ang: -1.15, len: 20, w: 3.8, col: "#78350f" },
      { ang: 0.05, len: 21, w: 3.6, col: "#92400e" },
    ];
    for (const lg of logs) {
      e.save();
      e.translate(0, baseY - 4 * s);
      e.rotate(lg.ang);
      e.fillStyle = lg.col;
      e.fillRect((-lg.len * 0.5) * s, (-lg.w * 0.5) * s, lg.len * s, lg.w * s);
      e.strokeStyle = "#271206";
      e.lineWidth = 0.8 * s;
      e.strokeRect((-lg.len * 0.5) * s, (-lg.w * 0.5) * s, lg.len * s, lg.w * s);
      e.restore();
    }

    // Chamas da Fogueira da Praça
    const f1 = Math.sin(animTimer * 10) * 3.5 * s;
    const f2 = Math.cos(animTimer * 14) * 4 * s;
    const f3 = Math.sin(animTimer * 8 + 1.4) * 2.5 * s;

    e.save();
    e.shadowColor = "#ea580c";
    e.shadowBlur = 16;

    // Língua de fogo externa vermelha/laranja escura
    e.fillStyle = "rgba(220, 38, 38, 0.92)";
    e.beginPath();
    e.moveTo(-13 * s, baseY - 3 * s);
    e.quadraticCurveTo(-11 * s + f1, baseY - 19 * s, -4 * s + f3, baseY - 28 * s);
    e.quadraticCurveTo(0, baseY - 38 * s + f2, 4 * s - f3, baseY - 28 * s);
    e.quadraticCurveTo(11 * s - f1, baseY - 19 * s, 13 * s, baseY - 3 * s);
    e.closePath();
    e.fill();

    // Língua de fogo intermediária laranja-ouro
    e.fillStyle = "rgba(249, 115, 22, 0.96)";
    e.beginPath();
    e.moveTo(-9.5 * s, baseY - 3 * s);
    e.quadraticCurveTo(-6.5 * s + f2, baseY - 18 * s, f1 * 0.6, baseY - 31 * s + f1);
    e.quadraticCurveTo(6.5 * s - f2, baseY - 18 * s, 9.5 * s, baseY - 3 * s);
    e.closePath();
    e.fill();

    // Chama interna amarela brilhante
    e.fillStyle = "rgba(250, 204, 21, 0.98)";
    e.beginPath();
    e.moveTo(-6 * s, baseY - 3 * s);
    e.quadraticCurveTo(-3 * s - f3, baseY - 14 * s, f2 * 0.4, baseY - 22 * s + f2 * 0.5);
    e.quadraticCurveTo(3 * s + f3, baseY - 14 * s, 6 * s, baseY - 3 * s);
    e.closePath();
    e.fill();

    // Núcleo branco-amarelado incandescente
    e.fillStyle = "#fef9c3";
    e.beginPath();
    e.ellipse(0, baseY - 7 * s, 4 * s, 5.5 * s, 0, 0, Math.PI * 2);
    e.fill();
    e.restore();

    // Fagulhas subindo ao céu gelado
    for (let sp = 0; sp < 6; sp++) {
      const cyc = (animTimer * 2.4 + sp * 0.45) % 2.2;
      const prog = cyc / 2.2;
      const sx = Math.sin(animTimer * 4 + sp * 1.9) * (9 * s) * (1 - prog * 0.3);
      const sy = baseY - 10 * s - prog * 34 * s;
      const alpha = Math.max(0, 1 - prog);
      e.fillStyle = `rgba(254, 240, 138, ${alpha * 0.9})`;
      e.beginPath();
      e.arc(sx, sy, (1.5 - prog * 0.7) * s, 0, Math.PI * 2);
      e.fill();
    }

    e.restore();
  }

  // 10b. Bancos da Praça Central ao redor da Grande Fogueira
  function drawSnowCityBench(e, t, subType = 0, facing = "south") {
    e.save();
    const isVert = subType === 1 || facing === "east" || facing === "west";

    // Sombra projetada no chão de paralelepípedo
    e.fillStyle = "rgba(15, 23, 42, 0.55)";
    if (isVert) {
      e.fillRect(-7 * t, -15 * t, 14 * t, 30 * t);
    } else {
      e.fillRect(-16 * t, -6 * t, 32 * t, 14 * t);
    }

    if (isVert) {
      // Banco vertical (Leste / Oeste da fogueira)
      const backX = facing === "east" ? -5.5 * t : 2.5 * t;
      const seatX = facing === "east" ? -2.5 * t : -5.5 * t;

      // Pés de ferro forjado preto
      e.fillStyle = "#0f172a";
      e.fillRect(-6 * t, -14 * t, 12 * t, 2.5 * t);
      e.fillRect(-6 * t, 11.5 * t, 12 * t, 2.5 * t);

      // Assento de tábuas de carvalho aquecido
      e.fillStyle = "#92400e";
      e.fillRect(seatX, -13.5 * t, 8 * t, 27 * t);
      e.strokeStyle = "#451a03";
      e.lineWidth = 0.9 * t;
      e.strokeRect(seatX, -13.5 * t, 8 * t, 27 * t);

      // Divisão das ripas de madeira do assento
      e.beginPath();
      e.moveTo(seatX + 4 * t, -13.5 * t);
      e.lineTo(seatX + 4 * t, 13.5 * t);
      e.stroke();

      // Encosto de madeira reforçada com neve fina nas pontas
      e.fillStyle = "#78350f";
      e.fillRect(backX, -14 * t, 3.2 * t, 28 * t);
      e.strokeRect(backX, -14 * t, 3.2 * t, 28 * t);

      // Apoios de braço de ferro forjado
      e.fillStyle = "#1e293b";
      e.fillRect(-6 * t, -14 * t, 12 * t, 2 * t);
      e.fillRect(-6 * t, 12 * t, 12 * t, 2 * t);
    } else {
      // Banco horizontal (Norte / Sul da fogueira)
      const backY = facing === "north" ? 1 * t : -9 * t;
      const seatY = facing === "north" ? -5 * t : -4 * t;

      // Pés laterais de ferro forjado
      e.fillStyle = "#0f172a";
      e.fillRect(-14 * t, -5 * t, 3 * t, 11 * t);
      e.fillRect(11 * t, -5 * t, 3 * t, 11 * t);

      // Assento de tábuas de carvalho
      e.fillStyle = "#92400e";
      e.fillRect(-15 * t, seatY, 30 * t, 7.5 * t);
      e.strokeStyle = "#451a03";
      e.lineWidth = 0.9 * t;
      e.strokeRect(-15 * t, seatY, 30 * t, 7.5 * t);

      // Linhas das ripas horizontais
      e.beginPath();
      e.moveTo(-15 * t, seatY + 3.8 * t);
      e.lineTo(15 * t, seatY + 3.8 * t);
      e.stroke();

      // Encosto do banco
      e.fillStyle = "#78350f";
      e.fillRect(-15 * t, backY, 30 * t, 4.2 * t);
      e.strokeRect(-15 * t, backY, 30 * t, 4.2 * t);

      // Detalhe de neve acumulada nas pontas do encosto
      e.fillStyle = "#f8fafc";
      e.fillRect(-14.5 * t, backY, 5 * t, 1.6 * t);
      e.fillRect(9.5 * t, backY, 5 * t, 1.6 * t);
    }

    e.restore();
  }

  // 11. Poste de Lampião de Ferro Forjado nas Ruas de Paralelepípedo
  function drawSnowCityLamppost(e, t, animTimer = 0) {
    e.save();
    const baseY = 18 * t;

    // Pedestal de pedra
    e.fillStyle = "#334155";
    e.fillRect(-3 * t, baseY - 4 * t, 6 * t, 4 * t);

    // Haste de ferro preto
    e.fillStyle = "#0f172a";
    e.fillRect(-1.2 * t, baseY - 24 * t, 2.4 * t, 20 * t);

    // Braço curvado e lanterna
    e.fillRect(-4 * t, baseY - 25 * t, 8 * t, 2 * t);

    // Caixa de vidro com topo cônico coberto de neve
    e.fillStyle = "rgba(254, 240, 138, 0.85)";
    e.fillRect(-3.5 * t, baseY - 30 * t, 7 * t, 6 * t);
    e.strokeStyle = "#0f172a";
    e.lineWidth = 1 * t;
    e.strokeRect(-3.5 * t, baseY - 30 * t, 7 * t, 6 * t);

    // Topo de ferro com camada de neve
    e.fillStyle = "#0f172a";
    e.beginPath();
    e.moveTo(-4.5 * t, baseY - 30 * t);
    e.lineTo(0, baseY - 34 * t);
    e.lineTo(4.5 * t, baseY - 30 * t);
    e.closePath();
    e.fill();
    e.fillStyle = "#f8fafc";
    e.beginPath();
    e.moveTo(-5 * t, baseY - 30 * t);
    e.lineTo(0, baseY - 35 * t);
    e.lineTo(5 * t, baseY - 30 * t);
    e.closePath();
    e.fill();

    // Chama dançante no interior
    const flameFlicker = Math.sin(animTimer * 15) * 0.8 * t;
    e.fillStyle = "#f59e0b";
    e.beginPath();
    e.arc(flameFlicker, baseY - 27 * t, 1.8 * t, 0, Math.PI * 2);
    e.fill();

    e.restore();
  }

  // 12. Telhados Alpinos Inclinados (Típicos de Neve) para cada Casa da Vila Glacial:
  // - Cada casa tem o seu próprio telhado individual de duas águas íngremes (chalé alpino).
  // - Possui grossa camada de neve branca acumulada no topo, cumeeira de madeira, ripas e pingentes de gelo.
  // - NUNCA cobre a porta da casa (recuo frontal e pórtico em V sobre a porta deixando a entrada 100% visível).
  // - Sistema clássico de RPG: quando o jogador entra na casa, o telhado daquela casa fica invisível;
  //   ao sair da casa, o telhado volta imediatamente!
  function drawSnowCityHouseRoofs(ctx, tileSize, playerX, playerY, viewLeft, viewRight, viewTop, viewBottom, animTimer = 0) {
    if (typeof window === "undefined" || !window.SnowPeakCity || !window.SnowPeakCity.houses) return;

    const city = window.SnowPeakCity;
    const houses = city.houses;
    const activeHouseId = city.getActiveHouseForPlayer
      ? city.getActiveHouseForPlayer(playerX, playerY, tileSize)
      : null;

    // Inicializa mapa de opacidade suave por casa para transição fluida ao entrar/sair
    if (!window.__snowRoofAlphaMap) {
      window.__snowRoofAlphaMap = {};
    }
    const alphaMap = window.__snowRoofAlphaMap;

    for (let i = 0; i < houses.length; i++) {
      const h = houses[i];

      // Coordenadas em pixels do retângulo das paredes da casa
      const minTileX = h.cx - h.halfW;
      const maxTileX = h.cx + h.halfW;
      const minTileY = h.cy - h.halfH;
      const maxTileY = h.cy + h.halfH;

      const houseLeftPx = minTileX * tileSize;
      const houseRightPx = (maxTileX + 1) * tileSize;
      const houseTopPx = minTileY * tileSize;
      const houseBottomPx = (maxTileY + 1) * tileSize;

      // Descarte rápido (frustum culling) se a casa estiver fora da câmera
      if (
        houseRightPx + tileSize < viewLeft ||
        houseLeftPx - tileSize > viewRight ||
        houseBottomPx + tileSize < viewTop ||
        houseTopPx - tileSize > viewBottom
      ) {
        continue;
      }

      // Atualiza opacidade (0 quando o jogador está dentro desta casa, 1 quando está fora)
      const isPlayerInsideThisHouse = activeHouseId === h.id;
      const targetAlpha = isPlayerInsideThisHouse ? 0 : 1;
      const prevAlpha = alphaMap[h.id] !== undefined ? alphaMap[h.id] : targetAlpha;
      const nextAlpha =
        Math.abs(prevAlpha - targetAlpha) < 0.08
          ? targetAlpha
          : prevAlpha + (targetAlpha - prevAlpha) * 0.28;
      alphaMap[h.id] = nextAlpha;

      // Se totalmente invisível (jogador dentro da casa), não desenha o telhado
      if (nextAlpha <= 0.02) continue;

      ctx.save();
      ctx.globalAlpha = nextAlpha;

      // =====================================================================
      // GEOMETRIA DO TELHADO ALPINO (SEM COBRIR A PORTA DA CASA!)
      // - As paredes 2.5D sobem ~26px acima da base de cada tile.
      // - Para NUNCA cobrir a fachada/porta da casa:
      //   * Nas casas com porta no SUL (doorOnSouth = true): a borda sul do telhado
      //     termina na linha do topo da parede sul (houseBottomPx - tileSize * 0.72),
      //     e ainda tem um recorte/frontão alto sobre o tile da porta (h.cx), deixando
      //     a porta de carvalho e o batente de pedra 100% visíveis!
      //   * Nas casas com porta no NORTE (doorOnSouth = false): a borda norte do telhado
      //     começa após a porta norte (houseTopPx + tileSize * 0.42) com recorte trapezoidal
      //     ao redor da porta norte, deixando a porta norte 100% livre e visível!
      // =====================================================================
      const overhangX = 4; // Pequeno beiral lateral (sem invadir becos)
      const roofLeft = houseLeftPx - overhangX;
      const roofRight = houseRightPx + overhangX;
      const roofW = roofRight - roofLeft;

      const roofTop = h.doorOnSouth
        ? houseTopPx - tileSize * 0.68
        : houseTopPx + tileSize * 0.36;
      const roofBottom = h.doorOnSouth
        ? houseBottomPx - tileSize * 0.78
        : houseBottomPx - tileSize * 0.22;
      const roofH = roofBottom - roofTop;
      const ridgeY = roofTop + roofH * 0.46; // Cumeeira central horizontal Leste-Oeste

      // Coordenadas da porta para abrir o frontão/recorte sem cobrir a porta
      const doorCenterX = (h.cx + 0.5) * tileSize;
      const doorCutHalfW = tileSize * 0.68;
      const doorNotchDepth = tileSize * 0.42;

      // 1. Sombra projetada pelo beiral do telhado sobre as paredes
      ctx.fillStyle = "rgba(15, 23, 42, 0.42)";
      ctx.beginPath();
      if (h.doorOnSouth) {
        ctx.moveTo(roofLeft + 2, roofTop + 5);
        ctx.lineTo(roofRight + 2, roofTop + 5);
        ctx.lineTo(roofRight + 2, roofBottom + 6);
        ctx.lineTo(doorCenterX + doorCutHalfW, roofBottom + 6);
        ctx.lineTo(doorCenterX, roofBottom - doorNotchDepth + 6);
        ctx.lineTo(doorCenterX - doorCutHalfW, roofBottom + 6);
        ctx.lineTo(roofLeft + 2, roofBottom + 6);
      } else {
        ctx.moveTo(roofLeft + 2, roofTop + 4);
        ctx.lineTo(doorCenterX - doorCutHalfW, roofTop + 4);
        ctx.lineTo(doorCenterX, roofTop + doorNotchDepth + 4);
        ctx.lineTo(doorCenterX + doorCutHalfW, roofTop + 4);
        ctx.lineTo(roofRight + 2, roofTop + 4);
        ctx.lineTo(roofRight + 2, roofBottom + 6);
        ctx.lineTo(roofLeft + 2, roofBottom + 6);
      }
      ctx.closePath();
      ctx.fill();

      // Paleta de telhado alpino por casa (madeira de pinheiro escuro, ardósia azulada ou cedro)
      const roofStyle = h.id % 3;
      const northSlopeTopCol = roofStyle === 0 ? "#1e293b" : roofStyle === 1 ? "#3b1d0a" : "#1e3a5f";
      const northSlopeBotCol = roofStyle === 0 ? "#334155" : roofStyle === 1 ? "#5c2d12" : "#254edb";
      const southSlopeTopCol = roofStyle === 0 ? "#475569" : roofStyle === 1 ? "#78350f" : "#3b5998";
      const southSlopeBotCol = roofStyle === 0 ? "#1e293b" : roofStyle === 1 ? "#451a03" : "#1e293b";

      // 2. ÁGUA NORTE DO TELHADO (inclinada da cumeeira para o norte)
      const northGrad = ctx.createLinearGradient(0, roofTop, 0, ridgeY);
      northGrad.addColorStop(0, northSlopeTopCol);
      northGrad.addColorStop(1, northSlopeBotCol);
      ctx.fillStyle = northGrad;
      ctx.beginPath();
      if (!h.doorOnSouth) {
        // Recorte em V invertido na borda norte para NÃO cobrir a porta norte!
        ctx.moveTo(roofLeft, roofTop);
        ctx.lineTo(doorCenterX - doorCutHalfW, roofTop);
        ctx.lineTo(doorCenterX, roofTop + doorNotchDepth);
        ctx.lineTo(doorCenterX + doorCutHalfW, roofTop);
        ctx.lineTo(roofRight, roofTop);
      } else {
        ctx.moveTo(roofLeft, roofTop);
        ctx.lineTo(roofRight, roofTop);
      }
      ctx.lineTo(roofRight, ridgeY);
      ctx.lineTo(roofLeft, ridgeY);
      ctx.closePath();
      ctx.fill();

      // 3. ÁGUA SUL DO TELHADO (inclinada da cumeeira para o sul)
      const southGrad = ctx.createLinearGradient(0, ridgeY, 0, roofBottom);
      southGrad.addColorStop(0, southSlopeTopCol);
      southGrad.addColorStop(1, southSlopeBotCol);
      ctx.fillStyle = southGrad;
      ctx.beginPath();
      ctx.moveTo(roofLeft, ridgeY);
      ctx.lineTo(roofRight, ridgeY);
      if (h.doorOnSouth) {
        // Frontão alpino em V sobre a porta sul para NUNCA cobrir a porta!
        ctx.lineTo(roofRight, roofBottom);
        ctx.lineTo(doorCenterX + doorCutHalfW, roofBottom);
        ctx.lineTo(doorCenterX, roofBottom - doorNotchDepth);
        ctx.lineTo(doorCenterX - doorCutHalfW, roofBottom);
        ctx.lineTo(roofLeft, roofBottom);
      } else {
        ctx.lineTo(roofRight, roofBottom);
        ctx.lineTo(roofLeft, roofBottom);
      }
      ctx.closePath();
      ctx.fill();

      // 4. Ripas e Telhas Escalonadas (textura de chalé alpino)
      ctx.strokeStyle = "rgba(15, 23, 42, 0.36)";
      ctx.lineWidth = 1;
      const shingleStepX = 14;
      ctx.beginPath();
      for (let sx = roofLeft + shingleStepX; sx < roofRight - 4; sx += shingleStepX) {
        // Evita desenhar linha dentro do recorte da porta
        const inDoorCut = Math.abs(sx - doorCenterX) < doorCutHalfW * 0.85;
        const topYAtX = !h.doorOnSouth && inDoorCut ? roofTop + doorNotchDepth : roofTop;
        const botYAtX = h.doorOnSouth && inDoorCut ? roofBottom - doorNotchDepth : roofBottom;
        ctx.moveTo(sx, topYAtX + 2);
        ctx.lineTo(sx, botYAtX - 2);
      }
      // Linhas horizontais das telhas
      for (let sy = roofTop + 12; sy < roofBottom - 8; sy += 12) {
        ctx.moveTo(roofLeft + 3, sy);
        ctx.lineTo(roofRight - 3, sy);
      }
      ctx.stroke();

      // 5. CAMADA ESPESSA DE NEVE ACUMULADA EM CIMA DO TELHADO
      // - Mais espessa perto da cumeeira e nas duas águas, com bordas onduladas orgânicas
      const snowPad = 5;
      // Neve na água norte
      const snowNorthGrad = ctx.createLinearGradient(0, roofTop, 0, ridgeY);
      snowNorthGrad.addColorStop(0, "#e2e8f0");
      snowNorthGrad.addColorStop(0.45, "#f8fafc");
      snowNorthGrad.addColorStop(1, "#ffffff");
      ctx.fillStyle = snowNorthGrad;
      ctx.beginPath();
      if (!h.doorOnSouth) {
        ctx.moveTo(roofLeft + snowPad, roofTop + 3);
        ctx.lineTo(doorCenterX - doorCutHalfW - 2, roofTop + 3);
        ctx.lineTo(doorCenterX, roofTop + doorNotchDepth + 4);
        ctx.lineTo(doorCenterX + doorCutHalfW + 2, roofTop + 3);
        ctx.lineTo(roofRight - snowPad, roofTop + 3);
      } else {
        ctx.moveTo(roofLeft + snowPad, roofTop + 3);
        ctx.lineTo(roofRight - snowPad, roofTop + 3);
      }
      ctx.lineTo(roofRight - snowPad, ridgeY - 2);
      ctx.lineTo(roofLeft + snowPad, ridgeY - 2);
      ctx.closePath();
      ctx.fill();

      // Neve na água sul (com ondas de neve acumulada no beiral)
      const snowSouthGrad = ctx.createLinearGradient(0, ridgeY, 0, roofBottom);
      snowSouthGrad.addColorStop(0, "#ffffff");
      snowSouthGrad.addColorStop(0.65, "#f1f5f9");
      snowSouthGrad.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = snowSouthGrad;
      ctx.beginPath();
      ctx.moveTo(roofLeft + snowPad, ridgeY + 2);
      ctx.lineTo(roofRight - snowPad, ridgeY + 2);
      if (h.doorOnSouth) {
        ctx.lineTo(roofRight - snowPad, roofBottom - 4);
        ctx.lineTo(doorCenterX + doorCutHalfW + 2, roofBottom - 4);
        ctx.lineTo(doorCenterX, roofBottom - doorNotchDepth - 4);
        ctx.lineTo(doorCenterX - doorCutHalfW - 2, roofBottom - 4);
        ctx.lineTo(roofLeft + snowPad, roofBottom - 4);
      } else {
        ctx.lineTo(roofRight - snowPad, roofBottom - 4);
        ctx.lineTo(roofLeft + snowPad, roofBottom - 4);
      }
      ctx.closePath();
      ctx.fill();

      // Brilho de gelo cristalino sobre a neve do telhado
      ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
      ctx.beginPath();
      ctx.ellipse(
        roofLeft + roofW * 0.32,
        ridgeY - roofH * 0.18,
        roofW * 0.18,
        Math.max(4, roofH * 0.08),
        0,
        0,
        Math.PI * 2
      );
      ctx.ellipse(
        roofLeft + roofW * 0.68,
        ridgeY + roofH * 0.16,
        roofW * 0.16,
        Math.max(4, roofH * 0.07),
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // 6. VIGA DE CUMEEIRA CENTRAL DE CARVALHO E MOLDURA DAS EMPENAS (BORDAS DO TELHADO)
      ctx.fillStyle = "#451a03";
      ctx.fillRect(roofLeft - 1, ridgeY - 3.5, roofW + 2, 7);
      // Neve sobre a viga da cumeeira
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(roofLeft + 4, ridgeY - 2, roofW - 8, 3);

      // Moldura de madeira pesada ao redor do telhado e do frontão da porta
      ctx.strokeStyle = "#451a03";
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      if (h.doorOnSouth) {
        ctx.moveTo(roofLeft, roofTop);
        ctx.lineTo(roofRight, roofTop);
        ctx.lineTo(roofRight, roofBottom);
        ctx.lineTo(doorCenterX + doorCutHalfW, roofBottom);
        ctx.lineTo(doorCenterX, roofBottom - doorNotchDepth);
        ctx.lineTo(doorCenterX - doorCutHalfW, roofBottom);
        ctx.lineTo(roofLeft, roofBottom);
      } else {
        ctx.moveTo(roofLeft, roofTop);
        ctx.lineTo(doorCenterX - doorCutHalfW, roofTop);
        ctx.lineTo(doorCenterX, roofTop + doorNotchDepth);
        ctx.lineTo(doorCenterX + doorCutHalfW, roofTop);
        ctx.lineTo(roofRight, roofTop);
        ctx.lineTo(roofRight, roofBottom);
        ctx.lineTo(roofLeft, roofBottom);
      }
      ctx.closePath();
      ctx.stroke();

      // 7. PINGENTES DE GELO (Icicles) pendurados no beiral sul do telhado
      ctx.fillStyle = "rgba(186, 230, 253, 0.88)";
      for (let ix = roofLeft + 8; ix < roofRight - 8; ix += 11) {
        if (h.doorOnSouth && Math.abs(ix - doorCenterX) < doorCutHalfW + 4) continue;
        const icicleLen = 4 + ((Math.abs(ix * 7 + h.id * 13) % 5));
        ctx.beginPath();
        ctx.moveTo(ix - 2, roofBottom);
        ctx.lineTo(ix, roofBottom + icicleLen);
        ctx.lineTo(ix + 2, roofBottom);
        ctx.closePath();
        ctx.fill();
      }

      // 8. CHAMINÉ FUMEGANTE ACIMA DO TELHADO (para continuar visível sobre a neve do telhado!)
      const chimTileX = h.cx + 3;
      const chimTileY = h.cy + (h.doorOnSouth ? -h.halfH : h.halfH);
      const chimPxX = chimTileX * tileSize + tileSize * 0.5;
      const chimPxY = chimTileY * tileSize + tileSize * 0.5;
      ctx.save();
      ctx.translate(chimPxX, chimPxY);
      drawSnowCityChimney(ctx, tileSize / 36, animTimer);
      ctx.restore();

      ctx.restore();
    }
  }
