/* js/engine/draw-personagem-e-efeitos.js
 * Desenho de personagens/criaturas animadas e efeitos (Ag, Eg, Ng...Ig).
 * Trecho de legacy/app.original.js (linhas 24031-26091); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  function Ag(e, t, l) {
    (e.save(), e.translate(t.x, t.y));
    const o = t.scale,
      u = t.lifetime < 4 ? Math.max(0.04, t.lifetime / 4) : 1;
    if (t.isSlime) {
      ((e.fillStyle = `rgba(15, 23, 42, ${0.35 * u})`),
        e.beginPath(),
        e.ellipse(0, 2.5 * o, 14 * o, 5.5 * o, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = t.color),
        (e.globalAlpha = 0.85 * u),
        e.beginPath(),
        e.arc(-11 * o, 1.8 * o, 2.2 * o, 0, Math.PI * 2),
        e.arc(11 * o, 2.2 * o, 1.8 * o, 0, Math.PI * 2),
        e.arc(4.5 * o, -3.8 * o, 1.6 * o, 0, Math.PI * 2),
        e.arc(-6 * o, 4.2 * o, 1.4 * o, 0, Math.PI * 2),
        e.fill());
      const m = e.createRadialGradient(-2.5 * o, -1 * o, 1 * o, 0, 0, 13 * o);
      (m.addColorStop(0, t.accentColor || "#86efac"),
        m.addColorStop(0.65, t.color || "#22c55e"),
        m.addColorStop(1, "rgba(21, 128, 61, 0.92)"),
        (e.fillStyle = m),
        (e.globalAlpha = u),
        e.beginPath(),
        e.ellipse(0, 0.5 * o, 13.5 * o, 5.2 * o, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = `rgba(20, 83, 45, ${0.45 * u})`),
        (e.lineWidth = 1 * o),
        e.stroke(),
        (e.fillStyle = `rgba(255, 255, 255, ${0.55 * u})`),
        e.beginPath(),
        e.ellipse(-3.5 * o, -1.5 * o, 4.5 * o, 1.4 * o, -0.2, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = `rgba(2, 44, 34, ${u})`),
        (e.lineWidth = 1.6 * o),
        (e.lineCap = "round"));
      const c = -4.5 * o,
        f = -0.5 * o,
        g = 2.2 * o;
      (e.beginPath(),
        e.moveTo(c - g, f - g),
        e.lineTo(c + g, f + g),
        e.moveTo(c + g, f - g),
        e.lineTo(c - g, f + g),
        e.stroke());
      const y = 4.2 * o,
        w = -0.5 * o;
      (e.beginPath(),
        e.moveTo(y - g, w - g),
        e.lineTo(y + g, w + g),
        e.moveTo(y + g, w - g),
        e.lineTo(y - g, w + g),
        e.stroke());
      const v = Math.sin(l * 4.5) * 0.15 + 0.85;
      ((e.strokeStyle = t.accentColor || "#4ade80"),
        (e.lineWidth = 1.2),
        (e.globalAlpha = 0.45 * v * u),
        e.beginPath(),
        e.ellipse(0, 1 * o, 16 * o * v, 7.5 * o * v, 0, 0, Math.PI * 2),
        e.stroke(),
        (e.fillStyle = "#ffffff"),
        (e.globalAlpha = 0.85 * v * u),
        e.beginPath(),
        e.arc(8 * o, -6 * o - Math.sin(l * 5) * 2, 1.8, 0, Math.PI * 2),
        e.fill());
    } else {
      if (
        ((e.fillStyle = `rgba(15, 23, 42, ${0.35 * u})`),
        e.beginPath(),
        e.ellipse(0, 3 * o, 13 * o, 6 * o, 0, 0, Math.PI * 2),
        e.fill(),
        e.save(),
        (e.globalAlpha = 0.85 * u),
        creatureDraw(t.type, "carcass"))
      ) {
        creatureDraw(t.type, "carcass")(e, t, o, u);
      } else if (t.type === "spider") {
        ((e.fillStyle = t.color),
          e.beginPath(),
          e.ellipse(0, 0, 8 * o, 6.5 * o, 0, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = "#1e1b4b"),
          (e.lineWidth = 1.3 * o));
        for (const m of [-1, 1])
          for (let c = 0; c < 4; c++) {
            const f = -3 * o + c * 2 * o;
            (e.beginPath(),
              e.moveTo(m * 4 * o, f),
              e.lineTo(m * 8 * o, f - 3 * o),
              e.lineTo(m * 5 * o, f - 5 * o),
              e.stroke());
          }
        ((e.strokeStyle = `rgba(239, 68, 68, ${u})`),
          (e.lineWidth = 1.2 * o),
          e.beginPath(),
          e.moveTo(-2 * o, -1 * o),
          e.lineTo(0, 1 * o),
          e.moveTo(0, -1 * o),
          e.lineTo(-2 * o, 1 * o),
          e.moveTo(1 * o, -1 * o),
          e.lineTo(3 * o, 1 * o),
          e.moveTo(3 * o, -1 * o),
          e.lineTo(1 * o, 1 * o),
          e.stroke());
      } else if (t.type === "scorpion") {
        const m = t.color || "#d97706",
          c = "#78350f",
          f = "#451a03";
        ((e.strokeStyle = c), (e.lineWidth = 1.2 * o), (e.lineCap = "round"));
        for (const g of [-1, 1])
          for (let y = 0; y < 4; y++) {
            const w = -4 * o + y * 2.6 * o;
            (e.beginPath(),
              e.moveTo(w, g * 2.2 * o),
              e.quadraticCurveTo(
                w + g * 3.5 * o,
                g * 4.5 * o,
                w + g * 1.5 * o,
                g * 6 * o,
              ),
              e.stroke());
          }
        ((e.fillStyle = m),
          e.beginPath(),
          e.ellipse(0, 0, 7.5 * o, 4.8 * o, 0, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = c),
          (e.lineWidth = 0.9 * o));
        for (let g = -4.5; g <= 4.5; g += 2.2)
          (e.beginPath(),
            e.moveTo(g * o, -3.5 * o),
            e.lineTo(g * o, 3.5 * o),
            e.stroke());
        for (const g of [-1, 1])
          ((e.fillStyle = "#b45309"),
            e.fillRect(4 * o, g * 2.5 * o, 4 * o, 2 * o),
            e.beginPath(),
            e.ellipse(
              8.5 * o,
              g * 4 * o,
              3 * o,
              2 * o,
              g * 0.4,
              0,
              Math.PI * 2,
            ),
            e.fill(),
            (e.strokeStyle = f),
            (e.lineWidth = 1.3 * o),
            e.beginPath(),
            e.moveTo(10.5 * o, g * 3.5 * o),
            e.lineTo(13 * o, g * 2.5 * o),
            e.moveTo(10.5 * o, g * 4.5 * o),
            e.lineTo(13 * o, g * 5.5 * o),
            e.stroke());
        ((e.strokeStyle = m),
          (e.lineWidth = 2.4 * o),
          (e.lineCap = "round"),
          e.beginPath(),
          e.moveTo(-7 * o, 0),
          e.quadraticCurveTo(-11 * o, 4 * o, -9 * o, 8 * o),
          e.stroke(),
          (e.fillStyle = t.accentColor || "#ef4444"),
          e.beginPath(),
          e.arc(-9 * o, 8 * o, 1.8 * o, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = f),
          (e.lineWidth = 1.2 * o),
          e.beginPath(),
          e.moveTo(-9 * o, 8 * o),
          e.lineTo(-7.5 * o, 10 * o),
          e.stroke(),
          (e.strokeStyle = `rgba(15, 23, 42, ${u})`),
          (e.lineWidth = 1.3 * o),
          e.beginPath(),
          e.moveTo(4 * o, -1.5 * o),
          e.lineTo(6 * o, 0.5 * o),
          e.moveTo(6 * o, -1.5 * o),
          e.lineTo(4 * o, 0.5 * o),
          e.stroke());
      } else if (t.type === "dragon") {
        const m = t.color || "#dc2626";
        ((e.fillStyle = m),
          e.beginPath(),
          e.ellipse(0, 2 * o, 16 * o, 8 * o, 0, 0, Math.PI * 2),
          e.fill(),
          e.beginPath(),
          e.ellipse(13 * o, -1 * o, 8 * o, 5.5 * o, 0.1, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = "#ea580c"),
          (e.lineWidth = 2.4 * o),
          e.beginPath(),
          e.moveTo(11 * o, -3 * o),
          e.quadraticCurveTo(8 * o, -11 * o, 3 * o, -13 * o),
          e.stroke(),
          (e.fillStyle = "#991b1b"),
          e.beginPath(),
          e.moveTo(-4 * o, 0),
          e.lineTo(-12 * o, -10 * o),
          e.lineTo(-7 * o, -4 * o),
          e.lineTo(-2 * o, 3 * o),
          e.closePath(),
          e.fill(),
          (e.fillStyle = "#7f1d1d"));
        for (let c = -10; c <= 6; c += 4)
          (e.beginPath(),
            e.moveTo((c - 1.5) * o, -4 * o),
            e.lineTo(c * o, -7.5 * o),
            e.lineTo((c + 1.5) * o, -4 * o),
            e.closePath(),
            e.fill());
        ((e.strokeStyle = "#fbbf24"),
          (e.lineWidth = 1.6 * o),
          e.beginPath(),
          e.moveTo(13 * o, -3 * o),
          e.lineTo(16 * o, 0),
          e.moveTo(16 * o, -3 * o),
          e.lineTo(13 * o, 0),
          e.stroke());
      } else {
        ((e.fillStyle = "#1e293b"),
          e.fillRect(-7 * o, -3 * o, 6 * o, 6 * o),
          e.fillRect(1 * o, -4 * o, 7 * o, 5 * o),
          e.fillRect(-2 * o, 1 * o, 5 * o, 4 * o),
          (e.strokeStyle = `rgba(249, 115, 22, ${0.4 * u})`),
          (e.lineWidth = 1.2 * o),
          e.strokeRect(-7 * o, -3 * o, 6 * o, 6 * o),
          e.strokeRect(1 * o, -4 * o, 7 * o, 5 * o));
      }
      e.restore();
    }
    e.restore();
  }
  function Eg(e, t) {
    (e.save(), e.translate(t.x, t.y));
    const l = t.hitFlashTimer > 0,
      o = t.scale;
    if (
      ((window.__rpgQuality?.beings ?? 1) >= 0.75 &&
        ((e.fillStyle = "rgba(15, 23, 42, 0.4)"),
        e.beginPath(),
        e.ellipse(0, 3 * o, 10 * o, 5 * o, 0, 0, Math.PI * 2),
        e.fill()),
      l && ((e.fillStyle = "#ffffff"), (e.strokeStyle = "#ef4444")),
      t.type === "slime")
    ) {
      const u = !!t.attached,
        m = !!t.isLeaping,
        c = !!t.emerging,
        f = c ? Math.max(0.1, Math.min(1, 1 - (t.emergeTimer || 0) / 0.55)) : 1;
      if (c)
        ((e.fillStyle = "#78350f"),
          e.beginPath(),
          e.ellipse(
            0,
            3 * o,
            11 * o * (1.1 - f * 0.2),
            4.5 * o * (1.1 - f * 0.2),
            0,
            0,
            Math.PI * 2,
          ),
          e.fill());
      else if (!u && t.inWater) {
        const A = (t.animTimer * 2.6) % Math.PI;
        ((e.strokeStyle = "rgba(56, 189, 248, 0.45)"),
          (e.lineWidth = 1.3 * o),
          e.beginPath(),
          e.ellipse(
            0,
            3 * o,
            (13 + Math.sin(A) * 3) * o,
            (6 + Math.sin(A) * 1.5) * o,
            0,
            0,
            Math.PI * 2,
          ),
          e.stroke());
      }
      const g = 2.4;
      let y = 0,
        w = 1,
        v = 1;
      if (u) {
        const A = Math.sin(t.animTimer * 8) * 0.1;
        ((w = 0.78 + A), (v = 1.28 - A), (y = 0));
      } else if (m) {
        const A = Math.min(1, Math.max(0, t.leapProgress || 0));
        ((y = Math.sin(A * Math.PI) * 16 * o), (w = 1.42), (v = 0.74));
      } else if (c) ((w = f), (v = 0.5 + f * 0.5), (y = 0));
      else {
        const A = (t.animTimer * g) % Math.PI,
          x = Math.sin(A),
          M = x > 0.28;
        if (((y = M ? (x - 0.28) * 5.5 * o : 0), M)) {
          const z = (x - 0.28) / 0.72;
          ((w = 1 + z * 0.38), (v = 1 - z * 0.22));
        } else {
          const z = (0.28 - x) / 0.28;
          ((w = 1 - z * 0.35), (v = 1 + z * 0.42));
        }
        const $ = Math.sin(t.animTimer * 6.2) * 0.05;
        ((v += $), (w -= $ * 0.8));
      }
      (u ||
        ((e.fillStyle = "rgba(15, 23, 42, 0.32)"),
        e.beginPath(),
        e.ellipse(
          0,
          3 * o,
          11 * v * o * (y > 2 ? 0.82 : 1),
          5 * v * o * (y > 2 ? 0.75 : 1),
          0,
          0,
          Math.PI * 2,
        ),
        e.fill()),
        e.save(),
        e.translate(0, -y));
      const T = u
        ? 0
        : Math.max(-0.22, Math.min(0.22, (t.vx / (t.speed || 1)) * 0.16));
      e.rotate(T);
      const S = 11.5 * o * v,
        p = 13.5 * o * w,
        j = 0,
        P = -p;
      if (
        (e.beginPath(),
        e.moveTo(0, j),
        e.bezierCurveTo(S * 0.65, j + 1.2 * o, S, j - 0.6 * o, S, j - p * 0.32),
        e.bezierCurveTo(S * 0.98, j - p * 0.75, S * 0.45, P, 0, P),
        e.bezierCurveTo(
          -S * 0.45,
          P,
          -S * 0.98,
          j - p * 0.75,
          -S,
          j - p * 0.32,
        ),
        e.bezierCurveTo(-S, j - 0.6 * o, -S * 0.65, j + 1.2 * o, 0, j),
        e.closePath(),
        l)
      )
        ((e.fillStyle = "#ffffff"), e.fill());
      else {
        const A = e.createRadialGradient(
          -S * 0.25,
          P + p * 0.38,
          2 * o,
          0,
          P + p * 0.55,
          S * 1.15,
        );
        (A.addColorStop(0, t.accentColor),
          A.addColorStop(0.55, t.color),
          A.addColorStop(1, t.color),
          e.save(),
          (e.globalAlpha = 0.88),
          (e.fillStyle = A),
          e.fill(),
          e.restore(),
          e.save(),
          (e.globalAlpha = 0.32),
          (e.strokeStyle = t.accentColor),
          (e.lineWidth = 1.3 * o),
          e.stroke(),
          e.restore());
        const x = Math.sin(t.animTimer * g - 0.4) * 1.2 * o;
        (e.save(),
          (e.globalAlpha = 0.45),
          (e.fillStyle = t.color),
          e.beginPath(),
          e.ellipse(0, P + p * 0.58 + x, S * 0.48, p * 0.36, 0, 0, Math.PI * 2),
          e.fill(),
          e.restore(),
          e.save(),
          (e.fillStyle = "rgba(255, 255, 255, 0.42)"),
          e.beginPath(),
          e.arc(-S * 0.32, P + p * 0.68 + x * 0.8, 1.3 * o, 0, Math.PI * 2),
          e.fill(),
          e.beginPath(),
          e.arc(S * 0.35, P + p * 0.46 - x * 0.5, 0.9 * o, 0, Math.PI * 2),
          e.fill(),
          e.restore(),
          e.save(),
          (e.fillStyle = "rgba(255, 255, 255, 0.65)"),
          e.beginPath(),
          e.ellipse(
            -S * 0.32,
            P + p * 0.25,
            S * 0.35,
            p * 0.15,
            -0.32,
            0,
            Math.PI * 2,
          ),
          e.fill(),
          (e.fillStyle = "rgba(255, 255, 255, 0.85)"),
          e.beginPath(),
          e.arc(-S * 0.42, P + p * 0.2, 1.1 * o, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = "rgba(255, 255, 255, 0.22)"),
          e.beginPath(),
          e.ellipse(
            S * 0.28,
            j - p * 0.22,
            S * 0.28,
            p * 0.1,
            0.25,
            0,
            Math.PI * 2,
          ),
          e.fill(),
          e.restore());
        let M = 0,
          $ = 0;
        t.facing === "right"
          ? (M = 1.6 * o)
          : t.facing === "left"
            ? (M = -1.6 * o)
            : t.facing === "down"
              ? ($ = 1.2 * o)
              : t.facing === "up" && ($ = -1.5 * o);
        const z = P + p * 0.54 + $,
          K = t.facing === "up" ? 3.4 * o : 4.2 * o;
        if (
          ((e.fillStyle = "#090d16"),
          e.beginPath(),
          e.arc(-K / 2 + M, z, 1.8 * o, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = "#ffffff"),
          e.beginPath(),
          e.arc(-K / 2 + M - 0.5 * o, z - 0.5 * o, 0.65 * o, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = "#090d16"),
          e.beginPath(),
          e.arc(K / 2 + M, z, 1.8 * o, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = "#ffffff"),
          e.beginPath(),
          e.arc(K / 2 + M - 0.5 * o, z - 0.5 * o, 0.65 * o, 0, Math.PI * 2),
          e.fill(),
          u)
        ) {
          const V = (t.animTimer * 3.2) % 1;
          ((e.fillStyle = "#4ade80"),
            e.beginPath(),
            e.arc(0, j + V * 8 * o, 1.4 * o, 0, Math.PI * 2),
            e.fill());
        }
      }
      e.restore();
    } else if (t.type === "scorpion") {
      const isEmergingScorpion = !!(t.emerging && (t.emergeTimer || 0) > 0),
        isBurrowingScorpion = !!(t.burrowing && (t.burrowTimer || 0) > 0);
      if (isEmergingScorpion || isBurrowingScorpion) {
        const totalDur = isEmergingScorpion ? (t.emergeDuration || 1.15) : (t.burrowDuration || 0.9),
          remTimer = isEmergingScorpion ? (t.emergeTimer || 0) : (t.burrowTimer || 0),
          rawProg = Math.max(0, Math.min(1, 1 - remTimer / totalDur)),
          visFrac = isEmergingScorpion ? rawProg : (1 - rawProg),
          holePulse = Math.sin(rawProg * Math.PI);

        // Cratera/monte de areia se abrindo ou fechando sob o escorpião
        e.save();
        e.fillStyle = "rgba(69, 26, 3, 0.72)";
        e.beginPath();
        e.ellipse(0, 4 * o, (11 + holePulse * 4) * o, (4.8 + holePulse * 2) * o, 0, 0, Math.PI * 2);
        e.fill();

        e.strokeStyle = "rgba(217, 119, 6, 0.85)";
        e.lineWidth = 2.0 * o;
        e.beginPath();
        e.ellipse(0, 4 * o, (12.5 + holePulse * 4.5) * o, (5.5 + holePulse * 2.2) * o, 0, 0, Math.PI * 2);
        e.stroke();

        // Grãos e torrões de areia saltando ao redor da borda da cratera
        for (let si = 0; si < 6; si++) {
          const sAng = (si / 6) * Math.PI * 2 + rawProg * 4,
            sDist = (9 + holePulse * 6) * o,
            sx = Math.cos(sAng) * sDist,
            sy = 3 * o + Math.sin(sAng) * (sDist * 0.42) - holePulse * 4 * o;
          e.fillStyle = si % 2 === 0 ? "#f59e0b" : "#92400e";
          e.beginPath();
          e.arc(sx, sy, 1.5 * o, 0, Math.PI * 2);
          e.fill();
        }

        // Recorte vertical na linha da cratera para o corpo emergir/afundar de dentro do chão
        e.beginPath();
        e.rect(-36 * o, -48 * o, 72 * o, 53 * o);
        e.clip();

        const sinkY = (1 - visFrac) * 20 * o,
          scaleMod = 0.55 + visFrac * 0.45;
        e.translate(0, sinkY);
        e.scale(scaleMod, scaleMod);
        xg(e, t, o, l);
        e.restore();
      } else {
        xg(e, t, o, l);
      }
    } else if (t.type === "spider") {
      e.fillStyle = l ? "#ffffff" : t.color;
      let u = 0,
        m = -5 * o,
        c = 0,
        f = -7 * o;
      (t.facing === "right"
        ? ((u = 6 * o), (m = -5 * o), (c = -2 * o), (f = -7 * o))
        : t.facing === "left"
          ? ((u = -6 * o), (m = -5 * o), (c = 2 * o), (f = -7 * o))
          : t.facing === "down"
            ? ((u = 0), (m = -2 * o), (c = 0), (f = -9 * o))
            : ((u = 0), (m = -11 * o), (c = 0), (f = -4 * o)),
        e.beginPath(),
        e.ellipse(c, f, 7 * o, 6 * o, 0, 0, Math.PI * 2),
        e.fill(),
        e.beginPath(),
        e.ellipse(u, m, 4 * o, 3.5 * o, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = l ? "#ffffff" : t.color),
        (e.lineWidth = 1.4 * o));
      for (let g = -2; g <= 2; g++) {
        if (g === 0) continue;
        const y = Math.sin(t.animTimer * 4 + g) * 3;
        (e.beginPath(),
          e.moveTo(0, -6 * o),
          e.lineTo(g * 4 * o, -10 * o + y),
          e.lineTo(g * 7 * o, 0 * o + y),
          e.stroke());
      }
      if (((e.fillStyle = t.accentColor), t.facing === "down"))
        (e.fillRect(-2 * o, m + 1 * o, 1.5 * o, 1.5 * o),
          e.fillRect(1 * o, m + 1 * o, 1.5 * o, 1.5 * o));
      else if (t.facing === "up")
        (e.fillRect(-2 * o, m - 2 * o, 1.5 * o, 1.5 * o),
          e.fillRect(1 * o, m - 2 * o, 1.5 * o, 1.5 * o));
      else {
        const g = t.facing === "right" ? 7 * o : -7 * o;
        (e.fillRect(g, -6 * o, 1.5 * o, 1.5 * o),
          e.fillRect(g, -4 * o, 1.5 * o, 1.5 * o));
      }
    } else if (creatureDraw(t.type, "body")) creatureDraw(t.type, "body")(e, t, o, l);
    else if (t.type === "dragon") jg(e, t, o, l);
    // Tipos sem desenho proprio caem no corpo do lobo (comportamento do codigo antigo)
    else CREATURES.wolf.draw.body(e, t, o, l);
    if (t.hp < t.maxHp && !t.attached) {
      const u = 24 * o,
        m = 3 * o,
        c = Math.max(0, t.hp / t.maxHp);
      ((e.fillStyle = "rgba(0, 0, 0, 0.7)"),
        e.fillRect(-u / 2 - 1, -25 * o - 1, u + 2, m + 2),
        (e.fillStyle = c > 0.4 ? "#22c55e" : "#ef4444"),
        e.fillRect(-u / 2, -25 * o, u * c, m));
    }
    e.restore();
  }
  function jg(e, t, l, o) {
    e.save();

    const facing = t.facing || "down";
    const isLeft = facing === "left";
    const isRight = facing === "right";
    const isUp = facing === "up";
    const isDown = facing === "down";

    // Orientação horizontal
    if (isLeft) {
      e.scale(-1, 1);
    }

    const anim = t.animTimer || 0;
    const speedSq = (t.vx || 0) * (t.vx || 0) + (t.vy || 0) * (t.vy || 0);
    const isMoving = (t.isMoving !== undefined) ? !!t.isMoving : (speedSq > 0.005);
    const isAttacking = (t.attackCooldown || 0) > 0.8;

    // Escala proporcional da criatura
    const s = l;

    // Paleta de Cores Míticas do Dragão Ancião (suporte completo ao hitFlash)
    const isHit = !!o;
    const colBase = isHit ? "#ffffff" : (t.color || "#dc2626"); // Escamas vermelhas carmesim vivas
    const colDark = isHit ? "#f1f5f9" : "#991b1b";             // Escamas sombreadas
    const colDeep = isHit ? "#e2e8f0" : "#450a0a";             // Sombreamento profundo / contornos
    const colBelly = isHit ? "#ffffff" : (t.accentColor || "#fbbf24"); // Placas ventrais douradas incandescentes
    const colOrange = isHit ? "#ffffff" : "#f97316";            // Magma alaranjado / fogo
    const colYellow = isHit ? "#ffffff" : "#fef08a";            // Brilho dourado luminoso
    const colHorn = isHit ? "#ffffff" : "#d97706";              // Chifres dourados / âmbar nobre
    const colHornDark = isHit ? "#ffffff" : "#78350f";          // Nervuras e sulcos do chifre
    const colWingMem = isHit ? "#ffffff" : "#7f1d1d";           // Membrana alar coriácea
    const colWingMemDark = isHit ? "#ffffff" : "#500724";       // Sombra da asa traseira
    const colClaw = isHit ? "#ffffff" : "#1c1917";              // Garras afiadas de obsidiana

    // Ciclo de voo / batimento de asas e flutuação
    const flapFreq = isMoving ? 5.5 : 3.8;
    const wingFlap = Math.sin(anim * flapFreq);
    const hoverY = Math.sin(anim * 3.2) * (2.8 * s);
    const bodyTilt = isMoving ? (Math.sin(anim * flapFreq) * 0.06) : (Math.sin(anim * 2.2) * 0.03);

    // 1. Sombra projetada no solo e aura de calor vulcânico
    if (!isHit) {
      // Aura de brasas e calor no chão
      const groundHeat = e.createRadialGradient(0, 16 * s, 3 * s, 0, 16 * s, 26 * s);
      groundHeat.addColorStop(0, "rgba(249, 115, 22, 0.28)");
      groundHeat.addColorStop(0.6, "rgba(220, 38, 38, 0.1)");
      groundHeat.addColorStop(1, "rgba(0, 0, 0, 0)");
      e.fillStyle = groundHeat;
      e.beginPath();
      e.ellipse(0, 16 * s, 26 * s, 10 * s, 0, 0, Math.PI * 2);
      e.fill();

      // Sombra corporal dinâmica que reage ao bater das asas
      const shadowScale = 1 - (wingFlap * 0.12);
      e.fillStyle = "rgba(15, 23, 42, 0.42)";
      e.beginPath();
      e.ellipse(0, 16 * s, 18 * s * shadowScale, 6.5 * s * shadowScale, 0, 0, Math.PI * 2);
      e.fill();
    }

    // 2. Cauda Serpentina Longa com Espigões Dorsais e Lâmina Terminal
    e.save();
    {
      const tailBaseX = -10 * s;
      const tailBaseY = hoverY - 1 * s;
      const tWave1 = Math.sin(anim * 3.5) * 4 * s;
      const tWave2 = Math.sin(anim * 3.5 + 1.2) * 7 * s;
      const tWave3 = Math.sin(anim * 3.5 + 2.4) * 9 * s;

      // Corpo carnoso da cauda sinuosa
      e.fillStyle = colDark;
      e.beginPath();
      e.moveTo(tailBaseX, tailBaseY - 5 * s);
      e.quadraticCurveTo(tailBaseX - 12 * s, tailBaseY - 4 * s + tWave1, tailBaseX - 22 * s, tailBaseY + tWave2);
      e.quadraticCurveTo(tailBaseX - 30 * s, tailBaseY + 2 * s + tWave3, tailBaseX - 36 * s, tailBaseY + tWave3);
      e.lineTo(tailBaseX - 35 * s, tailBaseY + 3 * s + tWave3);
      e.quadraticCurveTo(tailBaseX - 22 * s, tailBaseY + 5 * s + tWave2, tailBaseX - 12 * s, tailBaseY + 4 * s + tWave1);
      e.lineTo(tailBaseX, tailBaseY + 4 * s);
      e.closePath();
      e.fill();
      e.strokeStyle = colDeep;
      e.lineWidth = 1 * s;
      e.stroke();

      // Espinhos dorsais na cauda
      e.fillStyle = colHorn;
      for (let i = 1; i <= 4; i++) {
        const prog = i / 4.5;
        const spkX = tailBaseX - (i * 7.5 * s);
        const spkY = tailBaseY - (2.5 * s) + (Math.sin(anim * 3.5 + i * 0.6) * (5 * s) * prog);
        e.beginPath();
        e.moveTo(spkX + 1.5 * s, spkY);
        e.lineTo(spkX, spkY - (5 - i * 0.8) * s);
        e.lineTo(spkX - 1.5 * s, spkY);
        e.closePath();
        e.fill();
      }

      // Ponta da Cauda: Lâmina de Fogo / Arpão em Espada
      const tipX = tailBaseX - 36 * s;
      const tipY = tailBaseY + tWave3;
      e.fillStyle = colBelly;
      e.strokeStyle = colOrange;
      e.lineWidth = 1.2 * s;
      e.beginPath();
      e.moveTo(tipX, tipY);
      e.lineTo(tipX - 7 * s, tipY - 4.5 * s);
      e.lineTo(tipX - 5 * s, tipY);
      e.lineTo(tipX - 10 * s, tipY + 0.5 * s);
      e.lineTo(tipX - 5 * s, tipY + 1 * s);
      e.lineTo(tipX - 7 * s, tipY + 5.5 * s);
      e.closePath();
      e.fill();
      e.stroke();
    }
    e.restore();

    // 3. Asa Traseira (Far Wing) - Batendo em perspectiva atrás do corpo com curvatura para trás
    e.save();
    {
      const wingRootX = -1 * s;
      const wingRootY = hoverY - 7 * s;
      const farFlap = Math.sin(anim * flapFreq + 0.35);
      const farFlapAngle = farFlap * 0.35;

      e.translate(wingRootX, wingRootY);
      e.rotate(farFlapAngle);

      // Pulso alar traseiro (borda frontal superior da asa)
      const fWristX = 5 * s;
      const fWristY = -19 * s;

      // Falanges traseiras curvando para trás
      const fTip1X = -5 * s;
      const fTip1Y = -31 * s;
      const fTip2X = -16 * s;
      const fTip2Y = -25 * s;
      const fTip3X = -22 * s;
      const fTip3Y = -14 * s;

      // Membrana escura em perspectiva
      e.fillStyle = colWingMemDark;
      e.beginPath();
      e.moveTo(0, 0);
      e.lineTo(fWristX, fWristY);
      e.lineTo(fTip1X, fTip1Y);
      e.quadraticCurveTo(-11 * s, -29 * s, fTip2X, fTip2Y);
      e.quadraticCurveTo(-20 * s, -20 * s, fTip3X, fTip3Y);
      e.quadraticCurveTo(-12 * s, -7 * s, -2 * s, 0);
      e.closePath();
      e.fill();

      // Ossos da asa traseira
      e.strokeStyle = colDark;
      e.lineWidth = 2 * s;
      e.beginPath();
      e.moveTo(0, 0);
      e.lineTo(fWristX, fWristY);
      e.lineTo(fTip1X, fTip1Y);
      e.moveTo(fWristX, fWristY);
      e.lineTo(fTip2X, fTip2Y);
      e.moveTo(fWristX, fWristY);
      e.lineTo(fTip3X, fTip3Y);
      e.stroke();
    }
    e.restore();

    // 4. Pernas Traseiras e Garras Posteriores (Far Legs)
    e.save();
    {
      // Perna traseira posterior
      e.fillStyle = colDeep;
      e.beginPath();
      e.moveTo(-7 * s, hoverY + 3 * s);
      e.lineTo(-10 * s, hoverY + 12 * s);
      e.lineTo(-6 * s, hoverY + 13.5 * s);
      e.lineTo(-4 * s, hoverY + 3 * s);
      e.closePath();
      e.fill();
      // Garras da pata traseira posterior
      e.fillStyle = colClaw;
      e.fillRect(-11 * s, hoverY + 12.5 * s, 6 * s, 1.8 * s);

      // Perna dianteira posterior
      e.fillStyle = colDeep;
      e.beginPath();
      e.moveTo(7 * s, hoverY + 4 * s);
      e.lineTo(8 * s, hoverY + 12.5 * s);
      e.lineTo(11 * s, hoverY + 12.5 * s);
      e.lineTo(10 * s, hoverY + 4 * s);
      e.closePath();
      e.fill();
      e.fillStyle = colClaw;
      e.fillRect(7.5 * s, hoverY + 12 * s, 5 * s, 1.6 * s);
    }
    e.restore();

    // 5. Tronco Musculoso e Placas Ventrais Incandescentes (Torso & Belly Scutes)
    e.save();
    e.translate(0, hoverY);
    if (bodyTilt !== 0) e.rotate(bodyTilt);
    {
      // Silhueta do torso forte
      e.fillStyle = colBase;
      e.beginPath();
      e.moveTo(-13 * s, -4 * s);
      e.quadraticCurveTo(-4 * s, -9 * s, 10 * s, -7 * s);  // Costas arqueadas
      e.lineTo(14 * s, 1 * s);                             // Base do pescoço
      e.quadraticCurveTo(11 * s, 8 * s, 2 * s, 7 * s);     // Peitoral forte
      e.quadraticCurveTo(-7 * s, 7 * s, -13 * s, 2 * s);   // Abdômen
      e.closePath();
      e.fill();
      e.strokeStyle = colDark;
      e.lineWidth = 1.3 * s;
      e.stroke();

      // Placas ventrais incandescentes (Belly Plates)
      e.fillStyle = colBelly;
      e.beginPath();
      e.moveTo(-6 * s, 2 * s);
      e.quadraticCurveTo(2 * s, 1 * s, 11 * s, -2 * s);
      e.lineTo(12.5 * s, 3.5 * s);
      e.quadraticCurveTo(5 * s, 6.5 * s, -4 * s, 5.5 * s);
      e.closePath();
      e.fill();

      // Nervuras de magma entre as placas ventrais
      e.strokeStyle = colOrange;
      e.lineWidth = 1.2 * s;
      for (let bx = -3; bx <= 9; bx += 3.2) {
        e.beginPath();
        e.moveTo(bx * s, 1.5 * s);
        e.lineTo((bx + 1.2) * s, 6 * s);
        e.stroke();
      }

      // Cristas espinhosas dorsais ao longo do dorso
      e.fillStyle = colHorn;
      e.strokeStyle = colHornDark;
      e.lineWidth = 0.8 * s;
      for (let sx = -11; sx <= 8; sx += 3.8) {
        const spkHeight = (sx > -2 && sx < 6) ? 5.5 : 4;
        e.beginPath();
        e.moveTo((sx - 1.4) * s, -7.5 * s);
        e.lineTo(sx * s, -(7.5 + spkHeight) * s);
        e.lineTo((sx + 1.4) * s, -7.5 * s);
        e.closePath();
        e.fill();
        e.stroke();
      }
    }
    e.restore();

    // 6. Pernas Dianteiras e Traseiras Próximas (Near Legs) com Articulação e Garras
    e.save();
    {
      const legBob = isMoving ? Math.sin(anim * flapFreq) * 1.5 * s : 0;

      // Perna Traseira Próxima (Coxa musculosa de réptil + Jarrete)
      e.fillStyle = colBase;
      e.beginPath();
      e.moveTo(-2 * s, hoverY);
      e.quadraticCurveTo(-8 * s, hoverY + 4 * s, -6 * s, hoverY + 9 * s);
      e.lineTo(-4 * s, hoverY + 14 * s + legBob);
      e.lineTo(-1 * s, hoverY + 14 * s + legBob);
      e.lineTo(1 * s, hoverY + 7 * s);
      e.closePath();
      e.fill();
      e.strokeStyle = colDark;
      e.lineWidth = 1 * s;
      e.stroke();

      // Pata e Garras Traseiras Afiadas
      e.fillStyle = colClaw;
      e.beginPath();
      e.moveTo(-5.5 * s, hoverY + 13.5 * s + legBob);
      e.lineTo(-7 * s, hoverY + 16 * s + legBob);
      e.lineTo(-3.5 * s, hoverY + 15 * s + legBob);
      e.lineTo(-2 * s, hoverY + 16.5 * s + legBob);
      e.lineTo(-0.5 * s, hoverY + 14 * s + legBob);
      e.closePath();
      e.fill();

      // Perna Dianteira Próxima
      e.fillStyle = colBase;
      e.beginPath();
      e.moveTo(5 * s, hoverY + 1 * s);
      e.lineTo(4 * s, hoverY + 8 * s);
      e.lineTo(7 * s, hoverY + 14 * s - legBob);
      e.lineTo(9.5 * s, hoverY + 14 * s - legBob);
      e.lineTo(9 * s, hoverY + 4 * s);
      e.closePath();
      e.fill();
      e.strokeStyle = colDark;
      e.lineWidth = 1 * s;
      e.stroke();

      // Garras Dianteiras
      e.fillStyle = colClaw;
      e.beginPath();
      e.moveTo(5.5 * s, hoverY + 13.5 * s - legBob);
      e.lineTo(5 * s, hoverY + 16.5 * s - legBob);
      e.lineTo(8 * s, hoverY + 15 * s - legBob);
      e.lineTo(10.5 * s, hoverY + 16.5 * s - legBob);
      e.lineTo(10 * s, hoverY + 13.5 * s - legBob);
      e.closePath();
      e.fill();
    }
    e.restore();

    // 7. Pescoço e Cabeça Régia Dracônica
    e.save();
    {
      const neckBaseX = 9 * s;
      const neckBaseY = hoverY - 4 * s;
      const headX = 22 * s;
      const headY = hoverY - 14 * s + (Math.sin(anim * 2.8) * 1.2 * s);

      // Garganta com Brilho de Fogo Interno (Glowing Gullet)
      if (!isHit) {
        const throatGlow = e.createRadialGradient(neckBaseX + 6 * s, neckBaseY - 4 * s, 1 * s, neckBaseX + 6 * s, neckBaseY - 4 * s, 8 * s);
        throatGlow.addColorStop(0, "rgba(254, 240, 138, 0.75)");
        throatGlow.addColorStop(0.4, "rgba(249, 115, 22, 0.45)");
        throatGlow.addColorStop(1, "rgba(220, 38, 38, 0)");
        e.fillStyle = throatGlow;
        e.beginPath();
        e.arc(neckBaseX + 6 * s, neckBaseY - 4 * s, 8 * s, 0, Math.PI * 2);
        e.fill();
      }

      // Pescoço Sinuoso Musculoso
      e.fillStyle = colBase;
      e.beginPath();
      e.moveTo(neckBaseX, neckBaseY - 3 * s);
      e.quadraticCurveTo(neckBaseX + 4 * s, neckBaseY - 11 * s, headX - 2 * s, headY - 1 * s);
      e.lineTo(headX, headY + 5 * s);
      e.quadraticCurveTo(neckBaseX + 8 * s, neckBaseY + 3 * s, neckBaseX + 3 * s, neckBaseY + 5 * s);
      e.closePath();
      e.fill();
      e.strokeStyle = colDark;
      e.lineWidth = 1.3 * s;
      e.stroke();

      // Placas douradas na parte inferior do pescoço
      e.fillStyle = colBelly;
      e.beginPath();
      e.moveTo(neckBaseX + 4 * s, neckBaseY + 3 * s);
      e.quadraticCurveTo(neckBaseX + 9 * s, neckBaseY - 1 * s, headX - 1 * s, headY + 4 * s);
      e.lineTo(headX - 3 * s, headY + 5.5 * s);
      e.quadraticCurveTo(neckBaseX + 6 * s, neckBaseY + 4 * s, neckBaseX + 2 * s, neckBaseY + 4.5 * s);
      e.closePath();
      e.fill();

      // Espinhos na nuca
      e.fillStyle = colHorn;
      for (let ni = 0; ni < 3; ni++) {
        const nx = neckBaseX + (ni * 4 * s) + 2 * s;
        const ny = neckBaseY - (ni * 3.5 * s) - 5 * s;
        e.beginPath();
        e.moveTo(nx - 1 * s, ny + 1 * s);
        e.lineTo(nx - 3.5 * s, ny - 4.5 * s);
        e.lineTo(nx + 1 * s, ny);
        e.closePath();
        e.fill();
      }

      // Crânio do Dragão
      e.fillStyle = colBase;
      e.beginPath();
      e.moveTo(headX - 4 * s, headY - 4 * s);
      e.lineTo(headX + 4 * s, headY - 6 * s);   // Topo da cabeça
      e.lineTo(headX + 11 * s, headY - 2 * s);  // Focinho superior
      e.lineTo(headX + 12 * s, headY + 1 * s);  // Narina
      e.lineTo(headX + 6 * s, headY + 2 * s);   // Mandíbula
      e.lineTo(headX + 10 * s, headY + 5 * s);  // Queixo inferior
      e.lineTo(headX + 1 * s, headY + 5 * s);   // Garganta
      e.lineTo(headX - 4 * s, headY);
      e.closePath();
      e.fill();
      e.strokeStyle = colDark;
      e.lineWidth = 1.3 * s;
      e.stroke();

      // Dentes / Presas de Marfim
      e.fillStyle = "#ffffff";
      e.beginPath();
      e.moveTo(headX + 7 * s, headY + 2 * s);
      e.lineTo(headX + 8 * s, headY + 4.2 * s);
      e.lineTo(headX + 9 * s, headY + 2 * s);
      e.lineTo(headX + 10 * s, headY + 3.8 * s);
      e.lineTo(headX + 11 * s, headY + 1.8 * s);
      e.closePath();
      e.fill();

      // Chifres Ancestrais Magníficos (Par Superior Imponente + Esporão Inferior)
      // Chifre Principal Curvado
      e.fillStyle = colHorn;
      e.strokeStyle = colHornDark;
      e.lineWidth = 1 * s;
      e.beginPath();
      e.moveTo(headX - 1 * s, headY - 5 * s);
      e.quadraticCurveTo(headX - 8 * s, headY - 14 * s, headX - 16 * s, headY - 15 * s);
      e.quadraticCurveTo(headX - 7 * s, headY - 11 * s, headX - 3 * s, headY - 3 * s);
      e.closePath();
      e.fill();
      e.stroke();

      // Anéis de crescimento e ranhuras no chifre
      if (!isHit) {
        e.strokeStyle = colYellow;
        e.lineWidth = 0.8 * s;
        e.beginPath();
        e.moveTo(headX - 5 * s, headY - 8 * s);
        e.lineTo(headX - 7 * s, headY - 6 * s);
        e.moveTo(headX - 9 * s, headY - 12 * s);
        e.lineTo(headX - 11 * s, headY - 10 * s);
        e.stroke();
      }

      // Chifre Secundário da Bochecha / Tempora
      e.fillStyle = colHornDark;
      e.beginPath();
      e.moveTo(headX - 2 * s, headY - 1 * s);
      e.lineTo(headX - 9 * s, headY - 5 * s);
      e.lineTo(headX - 3 * s, headY + 1 * s);
      e.closePath();
      e.fill();

      // Olho de Réptil Dourado Incandescente com Pupila em Fenda
      e.fillStyle = colYellow;
      e.beginPath();
      e.ellipse(headX + 3 * s, headY - 1.8 * s, 2.2 * s, 1.6 * s, -0.15, 0, Math.PI * 2);
      e.fill();
      // Pupila vertical felina/réptil
      e.fillStyle = "#0f172a";
      e.beginPath();
      e.ellipse(headX + 3.2 * s, headY - 1.8 * s, 0.7 * s, 1.5 * s, 0, 0, Math.PI * 2);
      e.fill();
      // Brilho especular branco no olho
      e.fillStyle = "#ffffff";
      e.beginPath();
      e.arc(headX + 2.4 * s, headY - 2.4 * s, 0.6 * s, 0, Math.PI * 2);
      e.fill();

      // Narina com fumaça e faísca
      e.fillStyle = colDeep;
      e.beginPath();
      e.ellipse(headX + 10.5 * s, headY - 0.5 * s, 0.9 * s, 0.6 * s, 0.2, 0, Math.PI * 2);
      e.fill();

      // 8. Bafo de Fogo / Labaredas e Brasas
      if (isAttacking) {
        // Labareda estrondosa de fogo em jato cônico
        const flameProg = ((t.animTimer * 12) % 3) / 3;
        const breathReach = 28 * s + (flameProg * 14 * s);

        // Cone externo de magma
        const flameGrad = e.createRadialGradient(headX + 10 * s, headY + 2 * s, 2 * s, headX + 18 * s + breathReach * 0.5, headY + 3 * s, breathReach);
        flameGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        flameGrad.addColorStop(0.2, "rgba(254, 240, 138, 0.9)");
        flameGrad.addColorStop(0.55, "rgba(249, 115, 22, 0.75)");
        flameGrad.addColorStop(0.85, "rgba(220, 38, 38, 0.5)");
        flameGrad.addColorStop(1, "rgba(127, 29, 29, 0)");

        e.fillStyle = flameGrad;
        e.beginPath();
        e.moveTo(headX + 11 * s, headY);
        e.lineTo(headX + 12 * s + breathReach, headY - 10 * s);
        e.lineTo(headX + 16 * s + breathReach * 1.1, headY + 4 * s);
        e.lineTo(headX + 12 * s + breathReach, headY + 16 * s);
        e.lineTo(headX + 11 * s, headY + 4 * s);
        e.closePath();
        e.fill();

        // Núcleo branco incandescente
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.arc(headX + 13 * s, headY + 2 * s, 3.5 * s, 0, Math.PI * 2);
        e.fill();
      } else if (!isHit) {
        // Fagulhas e brasas saindo da respiração em repouso
        for (let fi = 0; fi < 3; fi++) {
          const spkProg = (anim * 2.5 + fi * 0.33) % 1;
          const spkX = headX + 12 * s + (spkProg * 14 * s);
          const spkY = headY - 1 * s - (spkProg * 7 * s) + Math.sin(anim * 6 + fi) * (2 * s);
          e.fillStyle = fi % 2 === 0 ? colYellow : colOrange;
          e.globalAlpha = (1 - spkProg) * 0.85;
          e.beginPath();
          e.arc(spkX, spkY, (1 - spkProg * 0.5) * 1.3 * s, 0, Math.PI * 2);
          e.fill();
          e.globalAlpha = 1;
        }
      }
    }
    e.restore();

    // 9. Asa Frontal Próxima Majestosa (Near Forewing) com Curvatura Natural para Trás
    e.save();
    {
      const wingRootX = 1 * s;
      const wingRootY = hoverY - 7 * s;
      const flapAngle = wingFlap * 0.42;

      e.translate(wingRootX, wingRootY);
      e.rotate(flapAngle);

      // Pulso / Carpo da asa na borda frontal superior (borda de ataque da asa)
      const wristX = 7 * s;
      const wristY = -23 * s;

      // Dedos longos da asa curvando graciosamente PARA TRÁS sobre o dorso
      const tip1X = -6 * s;   // Dedo 1 (topo, arqueado para trás)
      const tip1Y = -37 * s;
      const tip2X = -20 * s;  // Dedo 2 (central, varrendo para trás)
      const tip2Y = -30 * s;
      const tip3X = -28 * s;  // Dedo 3 (inferior, estendendo-se em direção aos flancos)
      const tip3Y = -18 * s;

      // Membrana Alar com Gradiente de Couro de Dragão
      const wingGrad = e.createLinearGradient(0, 0, -18 * s, -35 * s);
      wingGrad.addColorStop(0, colBase);
      wingGrad.addColorStop(0.45, colWingMem);
      wingGrad.addColorStop(0.85, colOrange);
      wingGrad.addColorStop(1, colYellow);

      e.fillStyle = isHit ? "#ffffff" : wingGrad;
      e.beginPath();
      e.moveTo(0, 0);
      e.lineTo(wristX, wristY); // Braço frontal (borda de ataque)
      e.lineTo(tip1X, tip1Y);   // Borda do dedo 1
      // Curvaturas recortadas clássicas entre os dedos (scalloped edges)
      e.quadraticCurveTo(-14 * s, -34 * s, tip2X, tip2Y);
      e.quadraticCurveTo(-25 * s, -25 * s, tip3X, tip3Y);
      e.quadraticCurveTo(-16 * s, -9 * s, -2 * s, 2 * s);
      e.closePath();
      e.fill();
      e.strokeStyle = colDark;
      e.lineWidth = 1.3 * s;
      e.stroke();

      // Veias translúcidas de fogo na membrana
      if (!isHit) {
        e.strokeStyle = "rgba(254, 240, 138, 0.4)";
        e.lineWidth = 0.9 * s;
        e.beginPath();
        e.moveTo(wristX - 2 * s, wristY + 2 * s);
        e.quadraticCurveTo(-4 * s, -26 * s, -11 * s, -33 * s);
        e.moveTo(wristX - 2 * s, wristY + 4 * s);
        e.quadraticCurveTo(-10 * s, -20 * s, -21 * s, -26 * s);
        e.stroke();
      }

      // Ossos e Falanges Fortes da Asa
      e.strokeStyle = colBase;
      e.lineWidth = 2.6 * s;
      e.lineCap = "round";
      e.beginPath();
      e.moveTo(0, 0);
      e.lineTo(wristX, wristY); // Braço da asa
      e.lineTo(tip1X, tip1Y);   // Falange 1
      e.moveTo(wristX, wristY);
      e.lineTo(tip2X, tip2Y);   // Falange 2
      e.moveTo(wristX, wristY);
      e.lineTo(tip3X, tip3Y);   // Falange 3
      e.stroke();

      // Espigão / Garra Afiada do Polegar no Pulso da Asa (apontando para cima/frente)
      e.fillStyle = colHorn;
      e.strokeStyle = colHornDark;
      e.lineWidth = 0.8 * s;
      e.beginPath();
      e.moveTo(wristX - 1 * s, wristY + 1 * s);
      e.lineTo(wristX + 3.5 * s, wristY - 3.5 * s);
      e.lineTo(wristX + 0.5 * s, wristY - 1 * s);
      e.closePath();
      e.fill();
      e.stroke();
    }
    e.restore();

    // 10. Brasas Vulcânicas Flutuando ao Redor do Dragão
    if (!isHit) {
      for (let bi = 0; bi < 4; bi++) {
        const floatProg = (anim * 1.8 + bi * 0.25) % 1;
        const bX = Math.sin(anim * 4 + bi * 2.5) * (14 * s) + (bi % 2 === 0 ? -12 * s : 8 * s);
        const bY = hoverY - (floatProg * 28 * s) + 4 * s;
        const bAlpha = Math.sin(floatProg * Math.PI) * 0.8;
        e.fillStyle = bi % 2 === 0 ? colYellow : colOrange;
        e.globalAlpha = bAlpha;
        e.beginPath();
        e.arc(bX, bY, (1 - floatProg * 0.5) * 1.4 * s, 0, Math.PI * 2);
        e.fill();
        e.globalAlpha = 1;
      }
    }

    e.restore();
  }
  function xg(e, t, l, o) {
    t.facing === "down"
      ? Dg(e, t, l, o)
      : t.facing === "up"
        ? Ig(e, t, l, o)
        : t.facing === "left"
          ? Ju(e, t, l, o, -1)
          : Ju(e, t, l, o, 1);
  }
  function Ju(e, t, l, o, u) {
    (e.save(), e.scale(u, 1));
    const spd = Math.hypot(t.vx || 0, t.vy || 0),
      c = spd > 0.04,
      stepRate = Math.max(1.8, Math.min(4.2, (spd / Math.max(0.5, (t.scale || 1) * 0.65)) * 4.5)),
      f = c ? t.animTimer * stepRate : t.animTimer * 1.2,
      g = c ? Math.sin(f * 2) * 0.5 * l : Math.sin(t.animTimer * 1.5) * 0.3 * l,
      y = o ? "#ffffff" : t.color || "#d97706",
      w = o ? "#e2e8f0" : "#78350f",
      v = o ? "#cbd5e1" : "#451a03",
      T = o ? "#ffffff" : "#fef08a",
      S = o ? "#fee2e2" : "#b45309",
      p = o ? "#ffffff" : t.accentColor || "#ef4444";
    ((e.fillStyle = "rgba(15, 23, 42, 0.42)"),
      e.beginPath(),
      e.ellipse(0, 2 * l, 12 * l, 6.5 * l, 0, 0, Math.PI * 2),
      e.fill(),
      e.beginPath(),
      e.ellipse(11 * l, 2.5 * l, 5 * l, 2.6 * l, 0.2, 0, Math.PI * 2),
      e.ellipse(8 * l, -3.2 * l, 4.2 * l, 2.2 * l, -0.25, 0, Math.PI * 2),
      e.fill());
    for (let Ne = 0; Ne < 4; Ne++) {
      const X = f + Ne * 1.5,
        C = c
          ? Math.sin(X) * 2.1 * l
          : Math.sin(t.animTimer * 1.2 + Ne) * 0.35 * l,
        I = c ? Math.max(0, -Math.cos(X)) * 1.6 * l : 0,
        be = -5 * l + Ne * 3.4 * l,
        Me = -5 * l + g;
      ((e.strokeStyle = w),
        (e.lineWidth = 1.3 * l),
        (e.lineCap = "round"),
        (e.lineJoin = "round"),
        e.beginPath(),
        e.moveTo(be, Me));
      const Te = be - 2 * l + C * 0.7,
        Fe = Me - 6.5 * l - I;
      e.lineTo(Te, Fe);
      const _e = Te - 3.5 * l + C,
        xe = Me - 3 * l;
      (e.lineTo(_e, xe),
        e.stroke(),
        (e.strokeStyle = v),
        (e.lineWidth = 0.9 * l),
        e.beginPath(),
        e.moveTo(_e, xe),
        e.lineTo(_e - 1.2 * l, xe + 1 * l),
        e.stroke());
    }
    const isStingerAtk = t.isGiantScorpion
      ? !!(t.stingerAttackTimer && t.stingerAttackTimer > 0)
      : (t.attackType === "stinger" && t.attackTimer > 0);
    const stingerProg = isStingerAtk
      ? Math.max(0, Math.min(1, 1 - (t.isGiantScorpion ? t.stingerAttackTimer / (t.stingerAttackDuration || 0.44) : t.attackTimer / (t.attackDuration || 0.38))))
      : 0;
    const stingerTgtX = t.isGiantScorpion && t.stingerTargetX !== void 0 ? t.stingerTargetX : t.attackTargetX;
    const stingerTgtY = t.isGiantScorpion && t.stingerTargetY !== void 0 ? t.stingerTargetY : t.attackTargetY;
    let stingerThrust = 0;
    let stingerDown = 0;
    let stingerStrikePower = 0;
    if (isStingerAtk) {
      if (stingerProg < 0.25) {
        const prep = Math.sin((stingerProg / 0.25) * Math.PI * 0.5);
        stingerThrust = -prep * 3 * l;
        stingerDown = -prep * 1.5 * l;
      } else if (stingerProg < 0.65) {
        const snap = Math.sin(((stingerProg - 0.25) / 0.4) * Math.PI);
        stingerStrikePower = snap;
        stingerThrust = -3 * l * (1 - (stingerProg - 0.25) / 0.4) + snap * 13 * l;
        stingerDown = snap * 5.5 * l;
      } else {
        const ret = Math.sin(((1 - stingerProg) / 0.35) * Math.PI * 0.5);
        stingerThrust = ret * 5 * l;
        stingerDown = ret * 1.5 * l;
      }
    }

    const j = Math.sin(t.animTimer * 2.8) * 1.8 * l,
      P = -7 * l,
      A = -5 * l + g;
    const restTipLocalX = P + 3.8 * l + j + 6.6 * l,
      restTipLocalY = A - 18.2 * l + 4.7 * l;
    let aimDeltaX = stingerThrust,
      aimDeltaY = stingerDown * 0.6;
    if (isStingerAtk && stingerStrikePower > 0 && stingerTgtX !== void 0 && stingerTgtY !== void 0) {
      const targetLocalX = (stingerTgtX - t.x) * u,
        targetLocalY = stingerTgtY - t.y;
      aimDeltaX = (targetLocalX - restTipLocalX) * stingerStrikePower;
      aimDeltaY = (targetLocalY - restTipLocalY) * stingerStrikePower;
    }
    const x = P - 3.2 * l,
      M = A - 2.8 * l,
      $ = P - 5.8 * l,
      z = A - 7.5 * l,
      K = P - 4.8 * l + j * 0.3 + aimDeltaX * 0.25,
      V = A - 13 * l + aimDeltaY * 0.2,
      O = P - 1.2 * l + j * 0.6 + aimDeltaX * 0.6,
      _ = A - 17 * l + aimDeltaY * 0.5,
      se = P + 3.8 * l + j + aimDeltaX,
      ue = A - 18.2 * l + aimDeltaY,
      N = [
        { x1: P, y1: A, x2: x, y2: M, width: 3.8 * l },
        { x1: x, y1: M, x2: $, y2: z, width: 3.4 * l },
        { x1: $, y1: z, x2: K, y2: V, width: 3 * l },
        { x1: K, y1: V, x2: O, y2: _, width: 2.6 * l },
        { x1: O, y1: _, x2: se, y2: ue, width: 2.3 * l },
      ];
    for (let Ne = 0; Ne < N.length; Ne++) {
      const X = N[Ne];
      ((e.fillStyle = v),
        e.beginPath(),
        e.arc(X.x1, X.y1, X.width * 0.52, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = y),
        (e.lineWidth = X.width),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(X.x1, X.y1),
        e.lineTo(X.x2, X.y2),
        e.stroke(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.beginPath(),
        e.moveTo(X.x1, X.y1),
        e.lineTo(X.x2, X.y2),
        e.stroke(),
        !o &&
          Ne >= 2 &&
          ((e.strokeStyle = T),
          (e.lineWidth = 0.7 * l),
          e.beginPath(),
          e.moveTo(X.x1 + 0.3 * l, X.y1 - 0.7 * l),
          e.lineTo(X.x2 + 0.3 * l, X.y2 - 0.7 * l),
          e.stroke()));
    }
    const Ee = se + 2.8 * l,
      ne = ue + 0.5 * l;
    if (
      ((e.fillStyle = p),
      e.beginPath(),
      e.ellipse(Ee, ne, 2.8 * l, 2.2 * l, 0.3, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = y),
      e.beginPath(),
      e.ellipse(
        Ee - 0.8 * l,
        ne + 0.3 * l,
        2 * l,
        1.8 * l,
        0.3,
        0,
        Math.PI * 2,
      ),
      e.fill(),
      (e.strokeStyle = v),
      (e.lineWidth = 1.4 * l),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(Ee + 1.8 * l, ne),
      e.quadraticCurveTo(
        Ee + 4.6 * l,
        ne + 1.2 * l,
        Ee + 3.8 * l,
        ne + 4.2 * l,
      ),
      e.stroke(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.arc(Ee + 3.8 * l, ne + 4.2 * l, 0.7 * l, 0, Math.PI * 2),
      e.fill(),
      !o)
    ) {
      const Ne = Math.sin(t.animTimer * 4) * 0.3 + 0.7;
      ((e.fillStyle = p),
        (e.shadowColor = p),
        (e.shadowBlur = 6 * l * Ne),
        e.beginPath(),
        e.arc(Ee + 3.8 * l, ne + 4.4 * l, 1.2 * l * Ne, 0, Math.PI * 2),
        e.fill(),
        (e.shadowBlur = 0));
      const X = (t.animTimer * 1.6) % 1;
      X < 0.45 &&
        ((e.fillStyle = p),
        e.beginPath(),
        e.arc(
          Ee + 3.8 * l,
          ne + 4.4 * l + X * 7 * l,
          0.8 * l * (1 - X),
          0,
          Math.PI * 2,
        ),
        e.fill());
    }
    const ke = 0,
      G = -4.5 * l + g;
    ((e.fillStyle = y),
      e.beginPath(),
      e.ellipse(ke, G, 7.8 * l, 5 * l, 0, 0, Math.PI * 2),
      e.fill());
    const de = 6;
    for (let Ne = 0; Ne < de; Ne++) {
      const X = -6.2 * l + Ne * 2.3 * l,
        C = 2.4 * l,
        I = (4.8 - Math.abs(Ne - 2.5) * 0.4) * l;
      ((e.fillStyle = Ne % 2 === 0 ? y : w),
        e.beginPath(),
        e.roundRect(X - C / 2, G - I / 2, C, I, 1.2 * l),
        e.fill(),
        (e.strokeStyle = v),
        (e.lineWidth = 0.8 * l),
        e.beginPath(),
        e.moveTo(X + C / 2, G - I / 2),
        e.lineTo(X + C / 2, G + I / 2),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(X, G, 0.8 * l, 0.5 * l, 0, 0, Math.PI * 2),
          e.fill()));
    }
    ((e.strokeStyle = w),
      (e.lineWidth = 1 * l),
      e.beginPath(),
      e.ellipse(ke, G, 7.8 * l, 5 * l, 0, 0, Math.PI * 2),
      e.stroke());
    const W = 6.2 * l,
      le = -4.5 * l + g;
    ((e.fillStyle = y),
      e.beginPath(),
      e.moveTo(W - 2.5 * l, le - 4.2 * l),
      e.lineTo(W + 3.2 * l, le - 3.2 * l),
      e.lineTo(W + 4.2 * l, le - 1.2 * l),
      e.lineTo(W + 3.8 * l, le),
      e.lineTo(W + 4.2 * l, le + 1.2 * l),
      e.lineTo(W + 3.2 * l, le + 3.2 * l),
      e.lineTo(W - 2.5 * l, le + 4.2 * l),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = w),
      (e.lineWidth = 1.1 * l),
      e.stroke());
    const te = t.isCapturingPlayer
      ? Math.abs(Math.sin(t.animTimer * 18)) * 1.4 * l
      : Math.sin(t.animTimer * 6) * 0.4 * l;
    ((e.fillStyle = v),
      e.beginPath(),
      e.moveTo(W + 3.8 * l, le - 1.2 * l),
      e.lineTo(W + 5.5 * l, le - 1.8 * l + te),
      e.lineTo(W + 4.8 * l, le - 0.4 * l),
      e.closePath(),
      e.fill(),
      e.beginPath(),
      e.moveTo(W + 3.8 * l, le + 1.2 * l),
      e.lineTo(W + 5.5 * l, le + 1.8 * l - te),
      e.lineTo(W + 4.8 * l, le + 0.4 * l),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#090d16"),
      e.beginPath(),
      e.arc(W + 1.2 * l, le - 0.9 * l, 1 * l, 0, Math.PI * 2),
      e.arc(W + 1.2 * l, le + 0.9 * l, 1 * l, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(W + 1.4 * l, le - 1.1 * l, 0.4 * l, 0, Math.PI * 2),
      e.arc(W + 1.4 * l, le + 0.7 * l, 0.4 * l, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = p));
    for (const Ne of [-2.6 * l, -2.1 * l, 2.1 * l, 2.6 * l])
      (e.beginPath(),
        e.arc(W + 2.5 * l, le + Ne, 0.5 * l, 0, Math.PI * 2),
        e.fill());
    for (let Ne = 0; Ne < 4; Ne++) {
      const X = f + Ne * 1.5 + Math.PI,
        C = c
          ? Math.sin(X) * 2.2 * l
          : Math.sin(t.animTimer * 1.2 + Ne + 2) * 0.35 * l,
        I = c ? Math.max(0, -Math.cos(X)) * 1.8 * l : 0,
        be = -5 * l + Ne * 3.4 * l,
        Me = -4 * l + g;
      ((e.strokeStyle = y),
        (e.lineWidth = 1.4 * l),
        (e.lineCap = "round"),
        (e.lineJoin = "round"),
        e.beginPath(),
        e.moveTo(be, Me));
      const Te = be - 1.5 * l + C * 0.7,
        Fe = Me + 5.5 * l - I;
      e.lineTo(Te, Fe);
      const _e = Te - 2.5 * l + C,
        xe = Me + 9.5 * l;
      (e.lineTo(_e, xe),
        e.stroke(),
        (e.fillStyle = w),
        e.beginPath(),
        e.arc(Te, Fe, 1.1 * l, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = v),
        (e.lineWidth = 1 * l),
        e.beginPath(),
        e.moveTo(_e, xe),
        e.lineTo(_e - 1.2 * l, xe + 1.2 * l),
        e.stroke());
    }
    const isAtk = t.isGiantScorpion
      ? !!(t.clawAttackTimer && t.clawAttackTimer > 0)
      : !!(t.attackTimer && t.attackTimer > 0 && t.attackType !== "stinger");
    const atkProg = isAtk
      ? Math.max(0, Math.min(1, 1 - (t.isGiantScorpion ? t.clawAttackTimer / (t.clawAttackDuration || 0.36) : t.attackTimer / (t.attackDuration || 0.32))))
      : 0;
    const clawTgtX = t.isGiantScorpion && t.clawTargetX !== void 0 ? t.clawTargetX : t.attackTargetX;
    const clawTgtY = t.isGiantScorpion && t.clawTargetY !== void 0 ? t.clawTargetY : t.attackTargetY;
    const activeSide = t.attackClawSide || -1;
    const baseOe = isStingerAtk && !isAtk ? 0.55 : Math.sin(t.animTimer * 4) * 0.35 + 0.35;
    for (const clawSide of [1, -1]) {
      const isThisClaw = (isAtk && activeSide === clawSide) || (t.isCapturingPlayer && activeSide === clawSide);
      let thrustX = 0;
      let thrustY = 0;
      let clawOpen = baseOe;
      if (t.isCapturingPlayer && activeSide === clawSide) {
        const capProg = Math.max(0, Math.min(1, t.captureProgress || 0));
        const restClawTipX = W + 19.5 * l,
          restClawTipY = le + clawSide * 9.5 * l,
          mouthLocalX = W + 4.8 * l,
          mouthLocalY = le;
        const startLocalX = t.captureStartLocalX !== void 0 ? t.captureStartLocalX : restClawTipX;
        const startLocalY = t.captureStartLocalY !== void 0 ? t.captureStartLocalY : restClawTipY;
        const curLocalX = startLocalX + (mouthLocalX - startLocalX) * capProg;
        const curLocalY = startLocalY + (mouthLocalY - startLocalY) * capProg;
        thrustX = curLocalX - restClawTipX;
        thrustY = curLocalY - restClawTipY;
        clawOpen = 0.02;
      } else if (isThisClaw) {
        const strikePower = Math.sin(atkProg * Math.PI);
        if (clawTgtX !== void 0 && clawTgtY !== void 0) {
          const restClawTipX = W + 19.5 * l,
            restClawTipY = le + clawSide * 9.5 * l,
            targetLocalX = (clawTgtX - t.x) * u,
            targetLocalY = clawTgtY - t.y;
          thrustX = (targetLocalX - restClawTipX) * strikePower;
          thrustY = (targetLocalY - restClawTipY) * strikePower;
        } else {
          thrustX = strikePower * 5.5 * l;
          thrustY = -clawSide * strikePower * 1.2 * l;
        }
        if (atkProg < 0.35) {
          clawOpen = 0.35 + (0.75 - 0.35) * (atkProg / 0.35);
        } else if (atkProg < 0.65) {
          clawOpen = 0.04;
        } else {
          clawOpen = 0.04 + (baseOe - 0.04) * ((atkProg - 0.65) / 0.35);
        }
      } else if (isAtk) {
        const strikePower = Math.sin(atkProg * Math.PI);
        thrustX = -strikePower * 0.8 * l;
      }
      e0(e, l, W, le, clawSide, clawOpen, y, w, v, T, S, o, thrustX, thrustY);
    }
    e.restore();
  }
  function e0(e, t, l, o, u, m, c, f, g, y, w, v, thrustX = 0, thrustY = 0) {
    const T = u === 1 ? 0.35 : -0.35,
      S = l + 1.5 * t,
      p = o + u * 2.2 * t,
      j = S + 4.5 * t + thrustX * 0.4,
      P = p + u * 4.5 * t + thrustY * 0.4;
    ((e.strokeStyle = c),
      (e.lineWidth = 2.4 * t),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(S, p),
      e.lineTo(j, P),
      e.stroke(),
      (e.fillStyle = f),
      e.beginPath(),
      e.arc(j, P, 1.8 * t, 0, Math.PI * 2),
      e.fill());
    const A = j + 5.5 * t + thrustX * 0.6,
      x = P + u * 1.5 * t + thrustY * 0.6;
    ((e.strokeStyle = c),
      (e.lineWidth = 2.8 * t),
      e.beginPath(),
      e.moveTo(j, P),
      e.lineTo(A, x),
      e.stroke(),
      e.save(),
      e.translate(A, x),
      e.rotate(T),
      (e.fillStyle = w),
      e.beginPath(),
      e.ellipse(3.2 * t, 0, 3.8 * t, 2.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = f),
      (e.lineWidth = 1 * t),
      e.stroke(),
      v ||
        ((e.fillStyle = y),
        e.beginPath(),
        e.ellipse(2.5 * t, -0.8 * t, 2 * t, 0.7 * t, 0.15, 0, Math.PI * 2),
        e.fill()),
      (e.fillStyle = f),
      e.beginPath(),
      e.moveTo(5.8 * t, -1.2 * t),
      e.quadraticCurveTo(9.5 * t, -2.5 * t, 11.5 * t, 0.2 * t),
      e.quadraticCurveTo(8.5 * t, -0.5 * t, 5.8 * t, 0.5 * t),
      e.closePath(),
      e.fill());
    const M = u === 1 ? -m : m;
    (e.save(),
      e.translate(5.5 * t, 1 * t),
      e.rotate(M),
      (e.fillStyle = g),
      e.beginPath(),
      e.moveTo(0, 0),
      e.quadraticCurveTo(3.5 * t, 2.2 * t, 6 * t, 0.2 * t),
      e.quadraticCurveTo(3 * t, 0.6 * t, 0, -1 * t),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = y),
      (e.lineWidth = 0.8 * t));
    for (let $ = 1; $ <= 3; $++)
      (e.beginPath(),
        e.moveTo($ * 1.3 * t, 0),
        e.lineTo($ * 1.3 * t, 0.7 * t),
        e.stroke());
    (e.restore(), e.restore());
  }
  function Dg(e, t, l, o) {
    e.save();
    const spd = Math.hypot(t.vx || 0, t.vy || 0),
      m = spd > 0.04,
      stepRate = Math.max(1.8, Math.min(4.2, (spd / Math.max(0.5, (t.scale || 1) * 0.65)) * 4.5)),
      c = m ? t.animTimer * stepRate : t.animTimer * 1.2,
      f = m ? Math.sin(c * 2) * 0.5 * l : Math.sin(t.animTimer * 1.5) * 0.3 * l,
      g = Math.max(-0.2, Math.min(0.2, (t.vx / (t.speed || 1)) * 0.18));
    e.rotate(g);
    const y = o ? "#ffffff" : t.color || "#d97706",
      w = o ? "#e2e8f0" : "#78350f",
      v = o ? "#cbd5e1" : "#451a03",
      T = o ? "#ffffff" : "#fef08a",
      S = o ? "#fee2e2" : "#b45309",
      p = o ? "#ffffff" : t.accentColor || "#ef4444";
    ((e.fillStyle = "rgba(15, 23, 42, 0.42)"),
      e.beginPath(),
      e.ellipse(0, 3 * l, 10 * l, 13 * l, 0, 0, Math.PI * 2),
      e.ellipse(-10 * l, 8 * l, 5 * l, 2.8 * l, -0.3, 0, Math.PI * 2),
      e.ellipse(10 * l, 8 * l, 5 * l, 2.8 * l, 0.3, 0, Math.PI * 2),
      e.fill());
    for (const te of [-1, 1])
      for (let oe = 0; oe < 4; oe++) {
        const Ne = c + oe * 1.5 + (te === 1 ? Math.PI : 0),
          X = m
            ? Math.sin(Ne) * 2.1 * l
            : Math.sin(t.animTimer * 1.2 + oe) * 0.35 * l,
          C = m ? Math.max(0, -Math.cos(Ne)) * 1.6 * l : 0,
          I = te * 4.2 * l,
          be = -5 * l + oe * 2.4 * l + f,
          Me = te * (9.5 * l + Math.abs(X) * 0.3),
          Te = be - 3.2 * l - C + (oe - 1.5) * 1.2 * l,
          Fe = te * 13.5 * l,
          _e = be + 3 * l + X;
        ((e.strokeStyle = te === -1 ? y : w),
          (e.lineWidth = 1.3 * l),
          (e.lineCap = "round"),
          (e.lineJoin = "round"),
          e.beginPath(),
          e.moveTo(I, be),
          e.lineTo(Me, Te),
          e.lineTo(Fe, _e),
          e.stroke(),
          (e.fillStyle = w),
          e.beginPath(),
          e.arc(Me, Te, 1 * l, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = v),
          (e.lineWidth = 0.9 * l),
          e.beginPath(),
          e.moveTo(Fe, _e),
          e.lineTo(Fe + te * 1.2 * l, _e + 1.2 * l),
          e.stroke());
      }
    const j = -2.5 * l + f;
    ((e.fillStyle = y),
      e.beginPath(),
      e.ellipse(0, j, 6.2 * l, 8.5 * l, 0, 0, Math.PI * 2),
      e.fill());
    const P = 6;
    for (let te = 0; te < P; te++) {
      const oe = j - 6 * l + te * 2.1 * l,
        Ne = (6 - Math.abs(te - 2.5) * 0.4) * 2 * l,
        X = 2.2 * l;
      ((e.fillStyle = te % 2 === 0 ? y : w),
        e.beginPath(),
        e.roundRect(-Ne / 2, oe - X / 2, Ne, X, 1.2 * l),
        e.fill(),
        (e.strokeStyle = v),
        (e.lineWidth = 0.8 * l),
        e.beginPath(),
        e.moveTo(-Ne / 2, oe + X / 2),
        e.lineTo(Ne / 2, oe + X / 2),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(0, oe, 0.7 * l, 0.5 * l, 0, 0, Math.PI * 2),
          e.fill()));
    }
    ((e.strokeStyle = w),
      (e.lineWidth = 1 * l),
      e.beginPath(),
      e.ellipse(0, j, 6.2 * l, 8.5 * l, 0, 0, Math.PI * 2),
      e.stroke());
    const A = 4.2 * l + f;
    ((e.fillStyle = y),
      e.beginPath(),
      e.moveTo(-4.5 * l, A - 3.5 * l),
      e.lineTo(4.5 * l, A - 3.5 * l),
      e.lineTo(3.4 * l, A + 2.5 * l),
      e.lineTo(1.8 * l, A + 3.8 * l),
      e.lineTo(-1.8 * l, A + 3.8 * l),
      e.lineTo(-3.4 * l, A + 2.5 * l),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = w),
      (e.lineWidth = 1.1 * l),
      e.stroke());
    const x = t.isCapturingPlayer
      ? Math.abs(Math.sin(t.animTimer * 18)) * 1.4 * l
      : Math.sin(t.animTimer * 6) * 0.4 * l;
    ((e.fillStyle = v),
      e.beginPath(),
      e.moveTo(-1.8 * l, A + 3.2 * l),
      e.lineTo(-0.8 * l - x, A + 5.5 * l),
      e.lineTo(-0.2 * l, A + 3.8 * l),
      e.closePath(),
      e.fill(),
      e.beginPath(),
      e.moveTo(1.8 * l, A + 3.2 * l),
      e.lineTo(0.8 * l + x, A + 5.5 * l),
      e.lineTo(0.2 * l, A + 3.8 * l),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#090d16"),
      e.beginPath(),
      e.arc(-1.5 * l, A + 0.5 * l, 1.1 * l, 0, Math.PI * 2),
      e.arc(1.5 * l, A + 0.5 * l, 1.1 * l, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(-1.3 * l, A + 0.3 * l, 0.45 * l, 0, Math.PI * 2),
      e.arc(1.7 * l, A + 0.3 * l, 0.45 * l, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = p),
      e.beginPath(),
      e.arc(-3 * l, A + 1.2 * l, 0.55 * l, 0, Math.PI * 2),
      e.arc(3 * l, A + 1.2 * l, 0.55 * l, 0, Math.PI * 2),
      e.fill());
    const isStingerAtk = t.isGiantScorpion
      ? !!(t.stingerAttackTimer && t.stingerAttackTimer > 0)
      : (t.attackType === "stinger" && t.attackTimer > 0);
    const stingerProg = isStingerAtk
      ? Math.max(0, Math.min(1, 1 - (t.isGiantScorpion ? t.stingerAttackTimer / (t.stingerAttackDuration || 0.44) : t.attackTimer / (t.attackDuration || 0.38))))
      : 0;
    const stingerTgtX = t.isGiantScorpion && t.stingerTargetX !== void 0 ? t.stingerTargetX : t.attackTargetX;
    const stingerTgtY = t.isGiantScorpion && t.stingerTargetY !== void 0 ? t.stingerTargetY : t.attackTargetY;
    let stingerThrustY = 0;
    let stingerStrikePower = 0;
    if (isStingerAtk) {
      if (stingerProg < 0.25) {
        const prep = Math.sin((stingerProg / 0.25) * Math.PI * 0.5);
        stingerThrustY = -prep * 3 * l;
      } else if (stingerProg < 0.65) {
        const snap = Math.sin(((stingerProg - 0.25) / 0.4) * Math.PI);
        stingerStrikePower = snap;
        stingerThrustY = -3 * l * (1 - (stingerProg - 0.25) / 0.4) + snap * 14 * l;
      } else {
        const ret = Math.sin(((1 - stingerProg) / 0.35) * Math.PI * 0.5);
        stingerThrustY = ret * 5 * l;
      }
    }

    const isAtk = t.isGiantScorpion
      ? !!(t.clawAttackTimer && t.clawAttackTimer > 0)
      : !!(t.attackTimer && t.attackTimer > 0 && t.attackType !== "stinger");
    const atkProg = isAtk
      ? Math.max(0, Math.min(1, 1 - (t.isGiantScorpion ? t.clawAttackTimer / (t.clawAttackDuration || 0.36) : t.attackTimer / (t.attackDuration || 0.32))))
      : 0;
    const clawTgtX = t.isGiantScorpion && t.clawTargetX !== void 0 ? t.clawTargetX : t.attackTargetX;
    const clawTgtY = t.isGiantScorpion && t.clawTargetY !== void 0 ? t.clawTargetY : t.attackTargetY;
    const activeSide = t.attackClawSide || -1;
    const baseM = isStingerAtk && !isAtk ? 0.55 : Math.sin(t.animTimer * 4) * 0.35 + 0.35;
    for (const te of [-1, 1]) {
      const isThisClaw = (isAtk && activeSide === te) || (t.isCapturingPlayer && activeSide === te);
      let thrustY = 0;
      let thrustX = 0;
      let clawOpen = baseM;
      if (t.isCapturingPlayer && activeSide === te) {
        const capProg = Math.max(0, Math.min(1, t.captureProgress || 0));
        const restClawTipX = te * 6.5 * l,
          restClawTipY = A + 14.5 * l,
          mouthLocalX = 0,
          mouthLocalY = A + 4.8 * l;
        const startLocalX = t.captureStartLocalX !== void 0 ? t.captureStartLocalX : restClawTipX;
        const startLocalY = t.captureStartLocalY !== void 0 ? t.captureStartLocalY : restClawTipY;
        const curLocalX = startLocalX + (mouthLocalX - startLocalX) * capProg;
        const curLocalY = startLocalY + (mouthLocalY - startLocalY) * capProg;
        thrustX = curLocalX - restClawTipX;
        thrustY = curLocalY - restClawTipY;
        clawOpen = 0.02;
      } else if (isThisClaw) {
        const strikePower = Math.sin(atkProg * Math.PI);
        if (clawTgtX !== void 0 && clawTgtY !== void 0) {
          const restClawTipX = te * 6.5 * l,
            restClawTipY = A + 14.5 * l,
            targetLocalX = clawTgtX - t.x,
            targetLocalY = clawTgtY - t.y;
          thrustX = (targetLocalX - restClawTipX) * strikePower;
          thrustY = (targetLocalY - restClawTipY) * strikePower;
        } else {
          thrustY = strikePower * 6.5 * l;
          thrustX = -te * strikePower * 1.5 * l;
        }
        if (atkProg < 0.35) {
          clawOpen = 0.35 + (0.75 - 0.35) * (atkProg / 0.35);
        } else if (atkProg < 0.65) {
          clawOpen = 0.04;
        } else {
          clawOpen = 0.04 + (baseM - 0.04) * ((atkProg - 0.65) / 0.35);
        }
      } else if (isAtk) {
        const strikePower = Math.sin(atkProg * Math.PI);
        thrustY = -strikePower * 0.8 * l;
      }
      const oe = te * 3.8 * l,
        Ne = A - 1.5 * l,
        X = te * 8.5 * l + thrustX * 0.4,
        C = A + 1.5 * l + thrustY * 0.4;
      ((e.strokeStyle = y),
        (e.lineWidth = 2.4 * l),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(oe, Ne),
        e.lineTo(X, C),
        e.stroke(),
        (e.fillStyle = w),
        e.beginPath(),
        e.arc(X, C, 1.7 * l, 0, Math.PI * 2),
        e.fill());
      const I = te * 9.8 * l + thrustX,
        be = A + 6.5 * l + thrustY;
      ((e.strokeStyle = y),
        (e.lineWidth = 2.8 * l),
        (e.beginPath(),
        e.moveTo(X, C),
        e.lineTo(I, be),
        e.stroke()),
        e.save(),
        e.translate(I, be),
        e.rotate(te * 0.35),
        (e.fillStyle = S),
        e.beginPath(),
        e.ellipse(0, 3.2 * l, 2.5 * l, 3.8 * l, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(-te * 0.8 * l, 2.5 * l, 0.7 * l, 2 * l, 0, 0, Math.PI * 2),
          e.fill()),
        (e.fillStyle = w),
        e.beginPath(),
        e.moveTo(-te * 1.2 * l, 5.8 * l),
        e.quadraticCurveTo(-te * 2.2 * l, 9.5 * l, 0, 11.5 * l),
        e.quadraticCurveTo(-te * 0.5 * l, 8.5 * l, te * 0.5 * l, 5.8 * l),
        e.closePath(),
        e.fill());
      const Me = te * -clawOpen;
      (e.save(),
        e.translate(te * 1 * l, 5.5 * l),
        e.rotate(Me),
        (e.fillStyle = v),
        e.beginPath(),
        e.moveTo(0, 0),
        e.quadraticCurveTo(te * 2 * l, 3.5 * l, 0, 6 * l),
        e.quadraticCurveTo(te * 0.6 * l, 3 * l, -te * 0.8 * l, 0),
        e.closePath(),
        e.fill(),
        (e.strokeStyle = T),
        (e.lineWidth = 0.8 * l));
      for (let Te = 1; Te <= 3; Te++)
        (e.beginPath(),
          e.moveTo(0, Te * 1.3 * l),
          e.lineTo(te * 0.7 * l, Te * 1.3 * l),
          e.stroke());
      (e.restore(), e.restore());
    }
    const $ = Math.sin(t.animTimer * 2.8) * 2 * l,
      z = 0,
      K = j - 7.5 * l;
    let aimStingerX = 0,
      aimStingerY = stingerThrustY;
    if (isStingerAtk && stingerStrikePower > 0 && stingerTgtX !== void 0 && stingerTgtY !== void 0) {
      const restTipX = z + $,
        restTipY = K - 2.5 * l + 7.2 * l,
        targetLocalX = stingerTgtX - t.x,
        targetLocalY = stingerTgtY - t.y;
      aimStingerX = (targetLocalX - restTipX) * stingerStrikePower;
      aimStingerY = (targetLocalY - restTipY) * stingerStrikePower;
    }
    const V = z + $ * 0.2 + aimStingerX * 0.15,
      O = K - 4.2 * l,
      _ = z + $ * 0.45 + aimStingerX * 0.35,
      se = K - 8 * l - aimStingerY * 0.15,
      ue = z + $ * 0.7 + aimStingerX * 0.6,
      N = K - 10.5 * l - aimStingerY * 0.1,
      Ee = z + $ * 0.85 + aimStingerX * 0.8,
      ne = K - 7 * l + aimStingerY * 0.45,
      ke = z + $ + aimStingerX,
      G = K - 2.5 * l + aimStingerY,
      de = [
        { x1: z, y1: K, x2: V, y2: O, w: 4 * l },
        { x1: V, y1: O, x2: _, y2: se, w: 3.6 * l },
        { x1: _, y1: se, x2: ue, y2: N, w: 3.2 * l },
        { x1: ue, y1: N, x2: Ee, y2: ne, w: 2.8 * l },
        { x1: Ee, y1: ne, x2: ke, y2: G, w: 2.4 * l },
      ];
    for (let te = 0; te < de.length; te++) {
      const oe = de[te];
      ((e.fillStyle = v),
        e.beginPath(),
        e.arc(oe.x1, oe.y1, oe.w * 0.52, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = y),
        (e.lineWidth = oe.w),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(oe.x1, oe.y1),
        e.lineTo(oe.x2, oe.y2),
        e.stroke(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.beginPath(),
        e.moveTo(oe.x1, oe.y1),
        e.lineTo(oe.x2, oe.y2),
        e.stroke(),
        !o &&
          te >= 2 &&
          ((e.strokeStyle = T),
          (e.lineWidth = 0.7 * l),
          e.beginPath(),
          e.moveTo(oe.x1 - 0.5 * l, oe.y1),
          e.lineTo(oe.x2 - 0.5 * l, oe.y2),
          e.stroke()));
    }
    const W = ke,
      le = G + 1.2 * l;
    if (
      ((e.fillStyle = p),
      e.beginPath(),
      e.ellipse(W, le, 2.5 * l, 2.8 * l, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = y),
      e.beginPath(),
      e.ellipse(W, le - 0.8 * l, 2 * l, 1.8 * l, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = v),
      (e.lineWidth = 1.4 * l),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(W, le + 2 * l),
      e.quadraticCurveTo(W + 1.5 * l, le + 4.5 * l, W, le + 6 * l),
      e.stroke(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.arc(W, le + 6 * l, 0.7 * l, 0, Math.PI * 2),
      e.fill(),
      !o)
    ) {
      const te = Math.sin(t.animTimer * 4) * 0.3 + 0.7;
      ((e.fillStyle = p),
        (e.shadowColor = p),
        (e.shadowBlur = 6 * l * te),
        e.beginPath(),
        e.arc(W, le + 6.2 * l, 1.2 * l * te, 0, Math.PI * 2),
        e.fill(),
        (e.shadowBlur = 0));
      const oe = (t.animTimer * 1.6) % 1;
      oe < 0.45 &&
        ((e.fillStyle = p),
        e.beginPath(),
        e.arc(W, le + 6.2 * l + oe * 7 * l, 0.8 * l * (1 - oe), 0, Math.PI * 2),
        e.fill());
    }
    e.restore();
  }
  function Ig(e, t, l, o) {
    e.save();
    const spd = Math.hypot(t.vx || 0, t.vy || 0),
      m = spd > 0.04,
      stepRate = Math.max(1.8, Math.min(4.2, (spd / Math.max(0.5, (t.scale || 1) * 0.65)) * 4.5)),
      c = m ? t.animTimer * stepRate : t.animTimer * 1.2,
      f = m ? Math.sin(c * 2) * 0.5 * l : Math.sin(t.animTimer * 1.5) * 0.3 * l,
      g = Math.max(-0.2, Math.min(0.2, (t.vx / (t.speed || 1)) * 0.18));
    e.rotate(g);
    const y = o ? "#ffffff" : t.color || "#d97706",
      w = o ? "#e2e8f0" : "#78350f",
      v = o ? "#cbd5e1" : "#451a03",
      T = o ? "#ffffff" : "#fef08a",
      S = o ? "#fee2e2" : "#b45309",
      p = o ? "#ffffff" : t.accentColor || "#ef4444";
    ((e.fillStyle = "rgba(15, 23, 42, 0.42)"),
      e.beginPath(),
      e.ellipse(0, 1 * l, 10 * l, 13 * l, 0, 0, Math.PI * 2),
      e.ellipse(-10 * l, -8 * l, 5 * l, 2.8 * l, 0.3, 0, Math.PI * 2),
      e.ellipse(10 * l, -8 * l, 5 * l, 2.8 * l, -0.3, 0, Math.PI * 2),
      e.fill());
    for (const te of [-1, 1])
      for (let oe = 0; oe < 4; oe++) {
        const Ne = c + oe * 1.5 + (te === 1 ? Math.PI : 0),
          X = m
            ? Math.sin(Ne) * 2.1 * l
            : Math.sin(t.animTimer * 1.2 + oe) * 0.35 * l,
          C = m ? Math.max(0, -Math.cos(Ne)) * 1.6 * l : 0,
          I = te * 4.2 * l,
          be = 5 * l - oe * 2.4 * l + f,
          Me = te * (9.5 * l + Math.abs(X) * 0.3),
          Te = be - 3.2 * l - C - (oe - 1.5) * 1.2 * l,
          Fe = te * 13.5 * l,
          _e = be - 3 * l - X;
        ((e.strokeStyle = te === -1 ? y : w),
          (e.lineWidth = 1.3 * l),
          (e.lineCap = "round"),
          (e.lineJoin = "round"),
          e.beginPath(),
          e.moveTo(I, be),
          e.lineTo(Me, Te),
          e.lineTo(Fe, _e),
          e.stroke(),
          (e.fillStyle = w),
          e.beginPath(),
          e.arc(Me, Te, 1 * l, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = v),
          (e.lineWidth = 0.9 * l),
          e.beginPath(),
          e.moveTo(Fe, _e),
          e.lineTo(Fe + te * 1.2 * l, _e - 1.2 * l),
          e.stroke());
      }
    const j = 2.5 * l + f;
    ((e.fillStyle = y),
      e.beginPath(),
      e.ellipse(0, j, 6.2 * l, 8.5 * l, 0, 0, Math.PI * 2),
      e.fill());
    const P = 6;
    for (let te = 0; te < P; te++) {
      const oe = j + 6 * l - te * 2.1 * l,
        Ne = (6 - Math.abs(te - 2.5) * 0.4) * 2 * l,
        X = 2.2 * l;
      ((e.fillStyle = te % 2 === 0 ? y : w),
        e.beginPath(),
        e.roundRect(-Ne / 2, oe - X / 2, Ne, X, 1.2 * l),
        e.fill(),
        (e.strokeStyle = v),
        (e.lineWidth = 0.8 * l),
        e.beginPath(),
        e.moveTo(-Ne / 2, oe - X / 2),
        e.lineTo(Ne / 2, oe - X / 2),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(0, oe, 0.7 * l, 0.5 * l, 0, 0, Math.PI * 2),
          e.fill()));
    }
    ((e.strokeStyle = w),
      (e.lineWidth = 1 * l),
      e.beginPath(),
      e.ellipse(0, j, 6.2 * l, 8.5 * l, 0, 0, Math.PI * 2),
      e.stroke());
    const A = -4.2 * l + f;
    ((e.fillStyle = y),
      e.beginPath(),
      e.moveTo(-4.5 * l, A + 3.5 * l),
      e.lineTo(4.5 * l, A + 3.5 * l),
      e.lineTo(3.4 * l, A - 2.5 * l),
      e.lineTo(1.8 * l, A - 3.8 * l),
      e.lineTo(-1.8 * l, A - 3.8 * l),
      e.lineTo(-3.4 * l, A - 2.5 * l),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = w),
      (e.lineWidth = 1.1 * l),
      e.stroke());
    const x = t.isCapturingPlayer
      ? Math.abs(Math.sin(t.animTimer * 18)) * 1.4 * l
      : Math.sin(t.animTimer * 6) * 0.4 * l;
    ((e.fillStyle = v),
      e.beginPath(),
      e.moveTo(-1.8 * l, A - 3.2 * l),
      e.lineTo(-0.8 * l - x, A - 5.5 * l),
      e.lineTo(-0.2 * l, A - 3.8 * l),
      e.closePath(),
      e.fill(),
      e.beginPath(),
      e.moveTo(1.8 * l, A - 3.2 * l),
      e.lineTo(0.8 * l + x, A - 5.5 * l),
      e.lineTo(0.2 * l, A - 3.8 * l),
      e.closePath(),
      e.fill());
    const isStingerAtk = t.isGiantScorpion
      ? !!(t.stingerAttackTimer && t.stingerAttackTimer > 0)
      : (t.attackType === "stinger" && t.attackTimer > 0);
    const stingerProg = isStingerAtk
      ? Math.max(0, Math.min(1, 1 - (t.isGiantScorpion ? t.stingerAttackTimer / (t.stingerAttackDuration || 0.44) : t.attackTimer / (t.attackDuration || 0.38))))
      : 0;
    const stingerTgtX = t.isGiantScorpion && t.stingerTargetX !== void 0 ? t.stingerTargetX : t.attackTargetX;
    const stingerTgtY = t.isGiantScorpion && t.stingerTargetY !== void 0 ? t.stingerTargetY : t.attackTargetY;
    let stingerThrustY = 0;
    let stingerStrikePower = 0;
    if (isStingerAtk) {
      if (stingerProg < 0.25) {
        const prep = Math.sin((stingerProg / 0.25) * Math.PI * 0.5);
        stingerThrustY = prep * 3 * l;
      } else if (stingerProg < 0.65) {
        const snap = Math.sin(((stingerProg - 0.25) / 0.4) * Math.PI);
        stingerStrikePower = snap;
        stingerThrustY = 3 * l * (1 - (stingerProg - 0.25) / 0.4) - snap * 14 * l;
      } else {
        const ret = Math.sin(((1 - stingerProg) / 0.35) * Math.PI * 0.5);
        stingerThrustY = -ret * 5 * l;
      }
    }

    const isAtk = t.isGiantScorpion
      ? !!(t.clawAttackTimer && t.clawAttackTimer > 0)
      : !!(t.attackTimer && t.attackTimer > 0 && t.attackType !== "stinger");
    const atkProg = isAtk
      ? Math.max(0, Math.min(1, 1 - (t.isGiantScorpion ? t.clawAttackTimer / (t.clawAttackDuration || 0.36) : t.attackTimer / (t.attackDuration || 0.32))))
      : 0;
    const clawTgtX = t.isGiantScorpion && t.clawTargetX !== void 0 ? t.clawTargetX : t.attackTargetX;
    const clawTgtY = t.isGiantScorpion && t.clawTargetY !== void 0 ? t.clawTargetY : t.attackTargetY;
    const activeSide = t.attackClawSide || -1;
    const baseM = isStingerAtk && !isAtk ? 0.55 : Math.sin(t.animTimer * 4) * 0.35 + 0.35;
    for (const te of [-1, 1]) {
      const isThisClaw = (isAtk && activeSide === te) || (t.isCapturingPlayer && activeSide === te);
      let thrustY = 0;
      let thrustX = 0;
      let clawOpen = baseM;
      if (t.isCapturingPlayer && activeSide === te) {
        const capProg = Math.max(0, Math.min(1, t.captureProgress || 0));
        const restClawTipX = te * 6.5 * l,
          restClawTipY = A - 14.5 * l,
          mouthLocalX = 0,
          mouthLocalY = A - 4.8 * l;
        const startLocalX = t.captureStartLocalX !== void 0 ? t.captureStartLocalX : restClawTipX;
        const startLocalY = t.captureStartLocalY !== void 0 ? t.captureStartLocalY : restClawTipY;
        const curLocalX = startLocalX + (mouthLocalX - startLocalX) * capProg;
        const curLocalY = startLocalY + (mouthLocalY - startLocalY) * capProg;
        thrustX = curLocalX - restClawTipX;
        thrustY = curLocalY - restClawTipY;
        clawOpen = 0.02;
      } else if (isThisClaw) {
        const strikePower = Math.sin(atkProg * Math.PI);
        if (clawTgtX !== void 0 && clawTgtY !== void 0) {
          const restClawTipX = te * 6.5 * l,
            restClawTipY = A - 14.5 * l,
            targetLocalX = clawTgtX - t.x,
            targetLocalY = clawTgtY - t.y;
          thrustX = (targetLocalX - restClawTipX) * strikePower;
          thrustY = (targetLocalY - restClawTipY) * strikePower;
        } else {
          thrustY = -strikePower * 6.5 * l;
          thrustX = -te * strikePower * 1.5 * l;
        }
        if (atkProg < 0.35) {
          clawOpen = 0.35 + (0.75 - 0.35) * (atkProg / 0.35);
        } else if (atkProg < 0.65) {
          clawOpen = 0.04;
        } else {
          clawOpen = 0.04 + (baseM - 0.04) * ((atkProg - 0.65) / 0.35);
        }
      } else if (isAtk) {
        const strikePower = Math.sin(atkProg * Math.PI);
        thrustY = strikePower * 0.8 * l;
      }
      const oe = te * 3.8 * l,
        Ne = A + 1.5 * l,
        X = te * 8.5 * l + thrustX * 0.4,
        C = A - 1.5 * l + thrustY * 0.4;
      ((e.strokeStyle = y),
        (e.lineWidth = 2.4 * l),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(oe, Ne),
        e.lineTo(X, C),
        e.stroke(),
        (e.fillStyle = w),
        e.beginPath(),
        e.arc(X, C, 1.7 * l, 0, Math.PI * 2),
        e.fill());
      const I = te * 9.8 * l + thrustX,
        be = A - 6.5 * l + thrustY;
      ((e.strokeStyle = y),
        (e.lineWidth = 2.8 * l),
        e.beginPath(),
        e.moveTo(X, C),
        e.lineTo(I, be),
        e.stroke(),
        e.save(),
        e.translate(I, be),
        e.rotate(-te * 0.35),
        (e.fillStyle = S),
        e.beginPath(),
        e.ellipse(0, -3.2 * l, 2.5 * l, 3.8 * l, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(-te * 0.8 * l, -2.5 * l, 0.7 * l, 2 * l, 0, 0, Math.PI * 2),
          e.fill()),
        (e.fillStyle = w),
        e.beginPath(),
        e.moveTo(-te * 1.2 * l, -5.8 * l),
        e.quadraticCurveTo(-te * 2.2 * l, -9.5 * l, 0, -11.5 * l),
        e.quadraticCurveTo(-te * 0.5 * l, -8.5 * l, te * 0.5 * l, -5.8 * l),
        e.closePath(),
        e.fill());
      const Me = te * clawOpen;
      (e.save(),
        e.translate(te * 1 * l, -5.5 * l),
        e.rotate(Me),
        (e.fillStyle = v),
        e.beginPath(),
        e.moveTo(0, 0),
        e.quadraticCurveTo(te * 2 * l, -3.5 * l, 0, -6 * l),
        e.quadraticCurveTo(te * 0.6 * l, -3 * l, -te * 0.8 * l, 0),
        e.closePath(),
        e.fill(),
        (e.strokeStyle = T),
        (e.lineWidth = 0.8 * l));
      for (let Te = 1; Te <= 3; Te++)
        (e.beginPath(),
          e.moveTo(0, -Te * 1.3 * l),
          e.lineTo(te * 0.7 * l, -Te * 1.3 * l),
          e.stroke());
      (e.restore(), e.restore());
    }
    const $ = Math.sin(t.animTimer * 2.8) * 2 * l,
      z = 0,
      K = j + 7.5 * l;
    let aimStingerX = 0,
      aimStingerY = stingerThrustY;
    if (isStingerAtk && stingerStrikePower > 0 && stingerTgtX !== void 0 && stingerTgtY !== void 0) {
      const restTipX = z + $,
        restTipY = K + 2.5 * l - 7.2 * l,
        targetLocalX = stingerTgtX - t.x,
        targetLocalY = stingerTgtY - t.y;
      aimStingerX = (targetLocalX - restTipX) * stingerStrikePower;
      aimStingerY = (targetLocalY - restTipY) * stingerStrikePower;
    }
    const V = z + $ * 0.2 + aimStingerX * 0.15,
      O = K + 4.2 * l,
      _ = z + $ * 0.45 + aimStingerX * 0.35,
      se = K + 8 * l - aimStingerY * 0.15,
      ue = z + $ * 0.7 + aimStingerX * 0.6,
      N = K + 10.5 * l - aimStingerY * 0.1,
      Ee = z + $ * 0.85 + aimStingerX * 0.8,
      ne = K + 7 * l + aimStingerY * 0.45,
      ke = z + $ + aimStingerX,
      G = K + 2.5 * l + aimStingerY,
      de = [
        { x1: z, y1: K, x2: V, y2: O, w: 4 * l },
        { x1: V, y1: O, x2: _, y2: se, w: 3.6 * l },
        { x1: _, y1: se, x2: ue, y2: N, w: 3.2 * l },
        { x1: ue, y1: N, x2: Ee, y2: ne, w: 2.8 * l },
        { x1: Ee, y1: ne, x2: ke, y2: G, w: 2.4 * l },
      ];
    for (let te = 0; te < de.length; te++) {
      const oe = de[te];
      ((e.fillStyle = v),
        e.beginPath(),
        e.arc(oe.x1, oe.y1, oe.w * 0.52, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = y),
        (e.lineWidth = oe.w),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(oe.x1, oe.y1),
        e.lineTo(oe.x2, oe.y2),
        e.stroke(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.beginPath(),
        e.moveTo(oe.x1, oe.y1),
        e.lineTo(oe.x2, oe.y2),
        e.stroke(),
        !o &&
          te >= 2 &&
          ((e.strokeStyle = T),
          (e.lineWidth = 0.7 * l),
          e.beginPath(),
          e.moveTo(oe.x1 - 0.5 * l, oe.y1),
          e.lineTo(oe.x2 - 0.5 * l, oe.y2),
          e.stroke()));
    }
    const W = ke,
      le = G - 1.2 * l;
    if (
      ((e.fillStyle = p),
      e.beginPath(),
      e.ellipse(W, le, 2.5 * l, 2.8 * l, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = y),
      e.beginPath(),
      e.ellipse(W, le + 0.8 * l, 2 * l, 1.8 * l, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = v),
      (e.lineWidth = 1.4 * l),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(W, le - 2 * l),
      e.quadraticCurveTo(W + 1.5 * l, le - 4.5 * l, W, le - 6 * l),
      e.stroke(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.arc(W, le - 6 * l, 0.7 * l, 0, Math.PI * 2),
      e.fill(),
      !o)
    ) {
      const te = Math.sin(t.animTimer * 4) * 0.3 + 0.7;
      ((e.fillStyle = p),
        (e.shadowColor = p),
        (e.shadowBlur = 6 * l * te),
        e.beginPath(),
        e.arc(W, le - 6.2 * l, 1.2 * l * te, 0, Math.PI * 2),
        e.fill(),
        (e.shadowBlur = 0));
      const oe = (t.animTimer * 1.6) % 1;
      oe < 0.45 &&
        ((e.fillStyle = p),
        e.beginPath(),
        e.arc(W, le - 6.2 * l - oe * 7 * l, 0.8 * l * (1 - oe), 0, Math.PI * 2),
        e.fill());
    }
    e.restore();
  }
  function getScorpionHitColliders(t) {
    const l = t.scale || 1;
    const spd = Math.hypot(t.vx || 0, t.vy || 0),
      m = spd > 0.04,
      stepRate = Math.max(1.8, Math.min(4.2, (spd / Math.max(0.5, l * 0.65)) * 4.5)),
      c = m ? t.animTimer * stepRate : t.animTimer * 1.2,
      f = m ? Math.sin(c * 2) * 0.5 * l : Math.sin(t.animTimer * 1.5) * 0.3 * l;
    const isStingerAtk = t.isGiantScorpion
      ? !!(t.stingerAttackTimer && t.stingerAttackTimer > 0)
      : (t.attackType === "stinger" && t.attackTimer > 0);
    const stingerProg = isStingerAtk
      ? Math.max(0, Math.min(1, 1 - (t.isGiantScorpion ? t.stingerAttackTimer / (t.stingerAttackDuration || 0.44) : t.attackTimer / (t.attackDuration || 0.38))))
      : 0;
    const stingerTgtX = t.isGiantScorpion && t.stingerTargetX !== void 0 ? t.stingerTargetX : t.attackTargetX;
    const stingerTgtY = t.isGiantScorpion && t.stingerTargetY !== void 0 ? t.stingerTargetY : t.attackTargetY;
    const isAtk = t.isGiantScorpion
      ? !!(t.clawAttackTimer && t.clawAttackTimer > 0)
      : !!(t.attackTimer && t.attackTimer > 0 && t.attackType !== "stinger");
    const atkProg = isAtk
      ? Math.max(0, Math.min(1, 1 - (t.isGiantScorpion ? t.clawAttackTimer / (t.clawAttackDuration || 0.36) : t.attackTimer / (t.attackDuration || 0.32))))
      : 0;
    const clawTgtX = t.isGiantScorpion && t.clawTargetX !== void 0 ? t.clawTargetX : t.attackTargetX;
    const clawTgtY = t.isGiantScorpion && t.clawTargetY !== void 0 ? t.clawTargetY : t.attackTargetY;
    const activeSide = t.attackClawSide || -1;
    const clawRadius = Math.max(3.5, 3.6 * l);
    const stingerRadius = Math.max(3.2, 3.2 * l);
    const colliders = [];

    if (t.facing === "down" || t.facing === "up") {
      const dirY = t.facing === "down" ? 1 : -1;
      const g = Math.max(-0.2, Math.min(0.2, (t.vx / (t.speed || 1)) * 0.18));
      const cosG = Math.cos(g),
        sinG = Math.sin(g);
      const toWorld = (lx, ly) => ({
        x: t.x + lx * cosG - ly * sinG,
        y: t.y + lx * sinG + ly * cosG,
      });
      const j = -dirY * 2.5 * l + f;
      const A = dirY * 4.2 * l + f;
      const mouthWp = toWorld(0, A + dirY * 4.8 * l);
      t._mouthWorldX = mouthWp.x;
      t._mouthWorldY = mouthWp.y;

      for (const te of [-1, 1]) {
        const isThisClaw = isAtk && activeSide === te;
        let thrustX = 0,
          thrustY = 0;
        const restClawTipX = te * 6.5 * l,
          restClawTipY = A + dirY * 14.5 * l;
        if (t.isCapturingPlayer && activeSide === te) {
          const capProg = Math.max(0, Math.min(1, t.captureProgress || 0));
          const mouthLocalX = 0,
            mouthLocalY = A + dirY * 4.8 * l;
          const startLocalX = t.captureStartLocalX !== void 0 ? t.captureStartLocalX : restClawTipX;
          const startLocalY = t.captureStartLocalY !== void 0 ? t.captureStartLocalY : restClawTipY;
          const curLocalX = startLocalX + (mouthLocalX - startLocalX) * capProg;
          const curLocalY = startLocalY + (mouthLocalY - startLocalY) * capProg;
          thrustX = curLocalX - restClawTipX;
          thrustY = curLocalY - restClawTipY;
        } else if (isThisClaw) {
          const strikePower = Math.sin(atkProg * Math.PI);
          if (clawTgtX !== void 0 && clawTgtY !== void 0) {
            const targetLocalX = clawTgtX - t.x,
              targetLocalY = clawTgtY - t.y;
            thrustX = (targetLocalX - restClawTipX) * strikePower;
            thrustY = (targetLocalY - restClawTipY) * strikePower;
          } else {
            thrustY = dirY * strikePower * 6.5 * l;
            thrustX = -te * strikePower * 1.5 * l;
          }
        } else if (isAtk) {
          const strikePower = Math.sin(atkProg * Math.PI);
          thrustY = -dirY * strikePower * 0.8 * l;
        }
        const wp = toWorld(restClawTipX + thrustX, restClawTipY + thrustY);
        colliders.push({
          part: te === -1 ? "claw_left" : "claw_right",
          side: te,
          x: wp.x,
          y: wp.y,
          radius: clawRadius,
          active: isThisClaw && atkProg >= 0.2 && atkProg <= 0.8,
        });
      }

      let stingerThrustY = 0,
        stingerStrikePower = 0;
      if (isStingerAtk) {
        if (stingerProg < 0.25) {
          const prep = Math.sin((stingerProg / 0.25) * Math.PI * 0.5);
          stingerThrustY = -dirY * prep * 3 * l;
        } else if (stingerProg < 0.65) {
          const snap = Math.sin(((stingerProg - 0.25) / 0.4) * Math.PI);
          stingerStrikePower = snap;
          stingerThrustY = -dirY * 3 * l * (1 - (stingerProg - 0.25) / 0.4) + dirY * snap * 14 * l;
        } else {
          const ret = Math.sin(((1 - stingerProg) / 0.35) * Math.PI * 0.5);
          stingerThrustY = dirY * ret * 5 * l;
        }
      }
      const $ = Math.sin(t.animTimer * 2.8) * 2 * l,
        z = 0,
        K = j - dirY * 7.5 * l;
      const restTipX = z + $,
        restTipY = K - dirY * 2.5 * l + dirY * 7.2 * l;
      let aimStingerX = 0,
        aimStingerY = stingerThrustY;
      if (isStingerAtk && stingerStrikePower > 0 && stingerTgtX !== void 0 && stingerTgtY !== void 0) {
        const targetLocalX = stingerTgtX - t.x,
          targetLocalY = stingerTgtY - t.y;
        aimStingerX = (targetLocalX - restTipX) * stingerStrikePower;
        aimStingerY = (targetLocalY - restTipY) * stingerStrikePower;
      }
      const wpStinger = toWorld(restTipX + aimStingerX, K - dirY * 2.5 * l + aimStingerY + dirY * 7.2 * l);
      colliders.push({
        part: "stinger",
        x: wpStinger.x,
        y: wpStinger.y,
        radius: stingerRadius,
        active: isStingerAtk && stingerProg >= 0.25 && stingerProg <= 0.75,
      });

      // Pernas do escorpião (4 de cada lado = 8 pernas)
      for (const te of [-1, 1]) {
        for (let oe = 0; oe < 4; oe++) {
          const Ne = c + oe * 1.5 + (te === 1 ? Math.PI : 0);
          const X = m
            ? Math.sin(Ne) * 2.1 * l
            : Math.sin(t.animTimer * 1.2 + oe) * 0.35 * l;
          const be = dirY === 1 ? (-5 * l + oe * 2.4 * l + f) : (5 * l - oe * 2.4 * l + f);
          const Fe = te * 13.5 * l;
          const _e = dirY === 1 ? (be + 3 * l + X) : (be - 3 * l - X);
          const wpLeg = toWorld(Fe, _e);
          colliders.push({
            part: `leg_${te === -1 ? "left" : "right"}_${oe}`,
            side: te,
            index: oe,
            x: wpLeg.x,
            y: wpLeg.y,
            radius: Math.max(7, 2.5 * l),
            active: !1,
            isLeg: !0,
          });
        }
      }
    } else {
      const u = t.facing === "left" ? -1 : 1;
      const W = 6.2 * l,
        le = -4.5 * l + f;
      t._mouthWorldX = t.x + (W + 4.8 * l) * u;
      t._mouthWorldY = t.y + le;
      for (const clawSide of [1, -1]) {
        const isThisClaw = isAtk && activeSide === clawSide;
        let thrustX = 0,
          thrustY = 0;
        const restClawTipX = W + 19.5 * l,
          restClawTipY = le + clawSide * 9.5 * l;
        if (t.isCapturingPlayer && activeSide === clawSide) {
          const capProg = Math.max(0, Math.min(1, t.captureProgress || 0));
          const mouthLocalX = W + 4.8 * l,
            mouthLocalY = le;
          const startLocalX = t.captureStartLocalX !== void 0 ? t.captureStartLocalX : restClawTipX;
          const startLocalY = t.captureStartLocalY !== void 0 ? t.captureStartLocalY : restClawTipY;
          const curLocalX = startLocalX + (mouthLocalX - startLocalX) * capProg;
          const curLocalY = startLocalY + (mouthLocalY - startLocalY) * capProg;
          thrustX = curLocalX - restClawTipX;
          thrustY = curLocalY - restClawTipY;
        } else if (isThisClaw) {
          const strikePower = Math.sin(atkProg * Math.PI);
          if (clawTgtX !== void 0 && clawTgtY !== void 0) {
            const targetLocalX = (clawTgtX - t.x) * u,
              targetLocalY = clawTgtY - t.y;
            thrustX = (targetLocalX - restClawTipX) * strikePower;
            thrustY = (targetLocalY - restClawTipY) * strikePower;
          } else {
            thrustX = strikePower * 5.5 * l;
            thrustY = -clawSide * strikePower * 1.2 * l;
          }
        } else if (isAtk) {
          const strikePower = Math.sin(atkProg * Math.PI);
          thrustX = -strikePower * 0.8 * l;
        }
        colliders.push({
          part: clawSide === -1 ? "claw_left" : "claw_right",
          side: clawSide,
          x: t.x + (restClawTipX + thrustX) * u,
          y: t.y + restClawTipY + thrustY,
          radius: clawRadius,
          active: isThisClaw && atkProg >= 0.2 && atkProg <= 0.8,
        });
      }

      let stingerThrust = 0,
        stingerDown = 0,
        stingerStrikePower = 0;
      if (isStingerAtk) {
        if (stingerProg < 0.25) {
          const prep = Math.sin((stingerProg / 0.25) * Math.PI * 0.5);
          stingerThrust = -prep * 3 * l;
          stingerDown = -prep * 1.5 * l;
        } else if (stingerProg < 0.65) {
          const snap = Math.sin(((stingerProg - 0.25) / 0.4) * Math.PI);
          stingerStrikePower = snap;
          stingerThrust = -3 * l * (1 - (stingerProg - 0.25) / 0.4) + snap * 13 * l;
          stingerDown = snap * 5.5 * l;
        } else {
          const ret = Math.sin(((1 - stingerProg) / 0.35) * Math.PI * 0.5);
          stingerThrust = ret * 5 * l;
          stingerDown = ret * 1.5 * l;
        }
      }
      const j = Math.sin(t.animTimer * 2.8) * 1.8 * l,
        P = -7 * l,
        A = -5 * l + f;
      const restTipLocalX = P + 3.8 * l + j + 6.6 * l,
        restTipLocalY = A - 18.2 * l + 4.7 * l;
      let aimDeltaX = stingerThrust,
        aimDeltaY = stingerDown * 0.6;
      if (isStingerAtk && stingerStrikePower > 0 && stingerTgtX !== void 0 && stingerTgtY !== void 0) {
        const targetLocalX = (stingerTgtX - t.x) * u,
          targetLocalY = stingerTgtY - t.y;
        aimDeltaX = (targetLocalX - restTipLocalX) * stingerStrikePower;
        aimDeltaY = (targetLocalY - restTipLocalY) * stingerStrikePower;
      }
      colliders.push({
        part: "stinger",
        x: t.x + (restTipLocalX + aimDeltaX) * u,
        y: t.y + restTipLocalY + aimDeltaY,
        radius: stingerRadius,
        active: isStingerAtk && stingerProg >= 0.25 && stingerProg <= 0.75,
      });

      // Pernas superiores e inferiores na visão lateral (4 no topo, 4 na base)
      for (let Ne = 0; Ne < 4; Ne++) {
        const X = f + Ne * 1.5;
        const C = m ? Math.sin(X) * 2.1 * l : Math.sin(t.animTimer * 1.2 + Ne) * 0.35 * l;
        const be = -5 * l + Ne * 3.4 * l;
        const Te = be - 2 * l + C * 0.7;
        const _e = Te - 3.5 * l + C;
        const xe = -5 * l + f - 3 * l;
        colliders.push({
          part: `leg_top_${Ne}`,
          side: -1,
          index: Ne,
          x: t.x + _e * u,
          y: t.y + xe,
          radius: Math.max(7, 2.5 * l),
          active: !1,
          isLeg: !0,
        });
      }
      for (let Ne = 0; Ne < 4; Ne++) {
        const X = f + Ne * 1.5 + Math.PI;
        const C = m ? Math.sin(X) * 2.2 * l : Math.sin(t.animTimer * 1.2 + Ne + 2) * 0.35 * l;
        const be = -5 * l + Ne * 3.4 * l;
        const Te = be - 1.5 * l + C * 0.7;
        const _e = Te - 2.5 * l + C;
        const xe = -4 * l + f + 9.5 * l;
        colliders.push({
          part: `leg_bottom_${Ne}`,
          side: 1,
          index: Ne,
          x: t.x + _e * u,
          y: t.y + xe,
          radius: Math.max(7, 2.5 * l),
          active: !1,
          isLeg: !0,
        });
      }
    }
    return colliders;
  }
  if (typeof window !== "undefined") {
    window.getScorpionHitColliders = getScorpionHitColliders;
  }
  function drawGiantScorpionCaveReachClaw(e, t) {
    const l = t.scale || 3.4;
    const baseX = t.caveDoorX ?? t.x;
    const baseY = t.caveDoorY ?? t.y;
    const reachProg = t.caveReachProg || 0;
    const isPulling = !!t.isPullingFromCave;
    const pullProg = Math.max(0, Math.min(1, t.cavePullProgress || 0));
    if (reachProg <= 0 && !isPulling) return;

    const tgtX = t.caveReachTargetX ?? baseX;
    const tgtY = t.caveReachTargetY ?? (baseY + 26);
    let tipX = baseX;
    let tipY = baseY + 6;
    if (isPulling) {
      const startX = t.cavePullStartX ?? tgtX;
      const startY = t.cavePullStartY ?? tgtY;
      tipX = startX + (baseX - startX) * pullProg;
      tipY = startY + (baseY + 2 - startY) * pullProg;
    } else {
      const ext = Math.sin(reachProg * Math.PI);
      tipX = baseX + (tgtX - baseX) * ext;
      tipY = baseY + 4 + (tgtY - (baseY + 4)) * ext;
    }

    t._caveClawTipX = tipX;
    t._caveClawTipY = tipY;
    t._caveClawRadius = Math.max(8, 3.8 * l);

    const dx = tipX - baseX;
    const dy = tipY - baseY;
    const ang = Math.atan2(dy, dx) - Math.PI / 2;
    const elbowX = baseX + dx * 0.48 + (t.attackClawSide || 1) * 5.5 * l * 0.45;
    const elbowY = baseY + dy * 0.48;

    const y = t.color || "#b45309",
      w = t.accentColor || "#451a03",
      v = "#140b05",
      S = "#92400e",
      T = "#f59e0b";

    e.save();
    // Sombra da garra projetada no piso da caverna
    e.fillStyle = "rgba(0, 0, 0, 0.48)";
    e.beginPath();
    e.ellipse(tipX, tipY + 5, 4.5 * l, 2.2 * l, 0, 0, Math.PI * 2);
    e.fill();

    // Segmento 1 do braço saindo da entrada da caverna
    e.strokeStyle = v;
    e.lineWidth = 3.8 * l;
    e.lineCap = "round";
    e.lineJoin = "round";
    e.beginPath();
    e.moveTo(baseX, baseY);
    e.lineTo(elbowX, elbowY);
    e.stroke();
    e.strokeStyle = y;
    e.lineWidth = 2.8 * l;
    e.stroke();

    // Articulação do cotovelo
    e.fillStyle = w;
    e.beginPath();
    e.arc(elbowX, elbowY, 1.8 * l, 0, Math.PI * 2);
    e.fill();

    // Segmento 2 do braço até a pinça
    e.strokeStyle = v;
    e.lineWidth = 3.5 * l;
    e.beginPath();
    e.moveTo(elbowX, elbowY);
    e.lineTo(tipX, tipY);
    e.stroke();
    e.strokeStyle = S;
    e.lineWidth = 2.5 * l;
    e.stroke();

    // Pinça / Garra gigante na ponta
    const te = t.attackClawSide || 1;
    e.translate(tipX, tipY);
    e.rotate(ang);
    e.fillStyle = S;
    e.beginPath();
    e.ellipse(0, -1.8 * l, 2.6 * l, 4 * l, 0, 0, Math.PI * 2);
    e.fill();
    e.strokeStyle = w;
    e.lineWidth = 1 * l;
    e.stroke();
    e.fillStyle = T;
    e.beginPath();
    e.ellipse(-te * 0.8 * l, -1.5 * l, 0.7 * l, 2.1 * l, 0, 0, Math.PI * 2);
    e.fill();

    // Dedo fixo da garra
    e.fillStyle = w;
    e.beginPath();
    e.moveTo(-te * 1.2 * l, 1.2 * l);
    e.quadraticCurveTo(-te * 2.3 * l, 5.2 * l, 0, 7.6 * l);
    e.quadraticCurveTo(-te * 0.5 * l, 4.4 * l, te * 0.5 * l, 1.2 * l);
    e.closePath();
    e.fill();

    // Dedo móvel da garra (abre no bote e fecha ao agarrar o player)
    const clawOpen = isPulling
      ? 0.04
      : reachProg < 0.55
        ? 0.75
        : 0.08;
    e.save();
    e.translate(te * 1.1 * l, 1 * l);
    e.rotate(-te * clawOpen);
    e.fillStyle = v;
    e.beginPath();
    e.moveTo(0, 0);
    e.quadraticCurveTo(te * 2.1 * l, 3.8 * l, 0, 6.4 * l);
    e.quadraticCurveTo(te * 0.6 * l, 3.2 * l, -te * 0.8 * l, 0);
    e.closePath();
    e.fill();
    e.strokeStyle = T;
    e.lineWidth = 0.8 * l;
    for (let Te = 1; Te <= 3; Te++) {
      e.beginPath();
      e.moveTo(0, Te * 1.3 * l);
      e.lineTo(te * 0.7 * l, Te * 1.3 * l);
      e.stroke();
    }
    e.restore();
    e.restore();
  }
