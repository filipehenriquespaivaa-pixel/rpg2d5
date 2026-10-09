/* js/creatures/tardigrade.js
 * Criatura COMPLETA: Tardígrado Cavernoso (Urso-d'Água das Profundezas).
 * Inspirado no tardígrado: corpo rechonchudo segmentado, 8 patas com micro-garras,
 * disco bucal com estilete mineral, extrema resistência e estado de criptobiose.
 * Vive especificamente nas cavernas estreitas do deserto.
 * Depende de registry.js (carregar depois dele).
 */
"use strict";

CREATURES.tardigrade = {
  id: "tardigrade",
  // Nascimento no mundo (valores do spawn)
  spawn: {
    name: "Tardígrado Cavernoso",
    color: "#d97706",
    accentColor: "#fef08a",
    hp: 42,
    attack: 5,
    speed: 0.82,
    scale: 0.95,
    defense: 6,
  },
  // Comportamento: criatura neutra contra o jogador, predadora voraz de escorpiões da caverna!
  behavior: {
    neutral: true,
    prey: false,
    predator: true, // Predador de escorpiões da caverna
    threatName: "tardígrado",
    fearsFire: false, // Tardígrados resistem a extremos de calor, frio e dessecação!
    deathParticles: 14,
    attackCooldown: 1.25,
    hunter: {
      huntRadius: 260,
      meleeRange: 28,
      huntSpeedMult: 1.45,
      attackCooldownPrey: 1.1,
      wanderWait: [1.8, 2.8],
      idleChance: 0.3,
      wanderSpeedMult: 0.65,
    },
  },
  // Carcaça deixada ao morrer (entra em estado "tun" de criptobiose)
  carcass: {
    name: "Carcaça de Tardígrado",
    bodyName: "Corpo de Tardígrado",
    description:
      "Corpo compacto e ultra resistente de tardígrado cavernoso em estado criptobiótico. Pode ser destrinchado com uma faca para extrair membrana celular indestrutível, micro-garras e gel hidratado.",
  },
  // Ficha mostrada ao destrinchar
  sheet: {
    name: "Tardígrado Cavernoso",
    species: "Invertebrado Criptobiótico Predador",
    icon: "🔬",
    badgeColor: "text-amber-300 border-amber-500/40 bg-amber-950/60",
    description:
      "Invertebrado arcaico adaptado às cavernas do deserto. Varia em portes colossais de até 3 vezes o tamanho comum, devora escorpiões com seu disco bucal circular e possui 8 patas com micro-garras e extrema resistência.",
    exclusiveNote:
      "Item Exclusivo: Membrana Criptobiótica de Tardígrado (resiste a dessecação, vácuo e altas pressões; nobre para forja e alquimia).",
  },
  // Como reconhecer um item/carcaça desta criatura (t = nome, l = id, o = ícone, tudo minúsculo)
  detect: (t, l, o) =>
    t.includes("tardigrad") ||
    t.includes("tardígrad") ||
    l.includes("tardigrade") ||
    l.includes("tardigrad") ||
    o === "creature_tardigrade",
  // Despojos ao destrinchar (t = timestamp, l = gerador de sufixo aleatório)
  loot: (t, l) => [
    {
      id: `butcher_tardigrade_membrane_${t}_${l()}`,
      isExclusive: true,
      exclusiveLabel: "⭐ Exclusivo de Tardígrado",
      status: "pending",
      item: {
        isCreaturePart: true,
        id: `item_membrana_tardigrado_${t}_${l()}`,
        name: "Membrana Criptobiótica de Tardígrado",
        categoryType: "material",
        rarity: "raro",
        stackCount: 2,
        isEquippable: false,
        icon: "sparkles",
        color: "#f59e0b",
        value: 75,
        description:
          "Cutícula celular translúcida ultra resistente de tardígrado. Imune ao vácuo e à dessecação, material lendário para armaduras e elixires protetores.",
      },
    },
    {
      id: `butcher_tardigrade_claws_${t}_${l()}`,
      isExclusive: false,
      status: "pending",
      item: {
        isCreaturePart: true,
        id: `item_garras_tardigrado_${t}_${l()}`,
        name: "Micro-Garras Quitinosas de Tardígrado",
        categoryType: "material",
        rarity: "incomum",
        stackCount: 4,
        isEquippable: false,
        icon: "sparkles",
        color: "#fde047",
        value: 28,
        description:
          "Conjunto de garras diminutas e hiper afiadas das 8 patas do tardígrado. Ideais para agulhas de precisão e pontas perfurantes.",
      },
    },
    {
      id: `butcher_tardigrade_gel_${t}_${l()}`,
      isExclusive: false,
      status: "pending",
      item: {
        isCreaturePart: true,
        id: `item_gel_tardigrado_${t}_${l()}`,
        name: "Gel Criptobiótico Hidratado",
        categoryType: "consumable",
        rarity: "incomum",
        stackCount: 2,
        isEquippable: false,
        icon: "droplet",
        color: "#38bdf8",
        value: 36,
        description:
          "Fluido biológico concentrado com trealose e proteínas protetoras (+40 Vida, +40 Stamina ao consumir). Aumenta resistência celular a venenos e calor.",
      },
    },
    {
      id: `butcher_tardigrade_meat_${t}_${l()}`,
      isExclusive: false,
      status: "pending",
      item: {
        isCreaturePart: true,
        id: `item_carne_tardigrado_${t}_${l()}`,
        name: "Carne Mineralizada de Tardígrado",
        categoryType: "consumable",
        rarity: "comum",
        stackCount: 1,
        isEquippable: false,
        icon: "utensils",
        color: "#d97706",
        value: 18,
        description:
          "Carne densa e gelatinosa rica em minerais cavernosos (+30 Vida ao consumir).",
      },
    },
  ],
  // Reconhecer por nome/id/ícone para escolher o DESENHO do ícone
  detectIcon: (t, l, o) =>
    o === "creature_tardigrade" ||
    o === "tardigrade" ||
    t.includes("tardigrad") ||
    t.includes("tardígrad") ||
    l.includes("tardigrade"),
  // Desenho no Canvas
  draw: {
    // Corpo vivo no mundo (8 patas, corpo rechonchudo com 4 segmentos e disco bucal)
    body: function (e, t, o, l) {
      e.save();
      const isMoving = Math.hypot(t.vx || 0, t.vy || 0) > 0.05;
      const walkAnim = isMoving ? t.animTimer * 6.0 : t.animTimer * 1.8;
      const bobY = Math.sin(walkAnim) * 0.7 * o;
      const facing = t.facing || "down";
      const mainCol = l ? "#ffffff" : (t.color || "#d97706");
      const darkCol = l ? "#e2e8f0" : "#92400e";
      const lightCol = l ? "#ffffff" : (t.accentColor || "#fef08a");
      const deepCol = l ? "#94a3b8" : "#78350f";

      // Sombra suave sob o tardígrado
      e.fillStyle = "rgba(15, 23, 42, 0.42)";
      e.beginPath();
      e.ellipse(0, 4.5 * o, 13 * o, 7 * o, 0, 0, Math.PI * 2);
      e.fill();

      // Desenho de uma pata rechonchuda com 3 micro-garras
      function drawStubbyLeg(lx, ly, angle, scaleLeg = 1) {
        e.save();
        e.translate(lx, ly);
        e.rotate(angle);
        // Coxa/perna rechonchuda
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(0, 0, 3.2 * o * scaleLeg, 2.2 * o * scaleLeg, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(0, -0.4 * o, 2.7 * o * scaleLeg, 1.8 * o * scaleLeg, 0, 0, Math.PI * 2);
        e.fill();
        // Extremidade com garras
        e.strokeStyle = lightCol;
        e.lineWidth = 1.0 * o;
        e.lineCap = "round";
        for (const clawOff of [-1.3, 0, 1.3]) {
          e.beginPath();
          e.moveTo(clawOff * o * scaleLeg, 1.2 * o * scaleLeg);
          e.lineTo((clawOff * 1.3) * o * scaleLeg, 2.8 * o * scaleLeg);
          e.stroke();
        }
        e.restore();
      }

      if (facing === "down") {
        // Visto de frente / diagonal superior
        // 8 PATAS (4 pares: 3 pares laterais + 1 par traseiro)
        const legOffsetsY = [-5 * o, -0.5 * o, 4.2 * o, 8.5 * o];
        for (let i = 0; i < 4; i++) {
          const legPhase = walkAnim + i * 1.35;
          const swingL = Math.sin(legPhase) * 0.42;
          const swingR = Math.sin(legPhase + Math.PI) * 0.42;
          const ly = legOffsetsY[i] + bobY;
          // Pata esquerda
          drawStubbyLeg(-8.5 * o, ly, -0.6 + swingL, i === 3 ? 0.9 : 1);
          // Pata direita
          drawStubbyLeg(8.5 * o, ly, 0.6 + swingR, i === 3 ? 0.9 : 1);
        }

        // CORPO: 4 segmentos arredondados e rechonchudos sobrepostos de trás para frente
        // Segmento 4 (Traseiro)
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(0, -6.5 * o + bobY, 8.5 * o, 5.0 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(0, -7.0 * o + bobY, 7.5 * o, 4.2 * o, 0, 0, Math.PI * 2);
        e.fill();

        // Segmento 3
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(0, -2.5 * o + bobY, 9.8 * o, 5.6 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(0, -2.9 * o + bobY, 8.8 * o, 4.8 * o, 0, 0, Math.PI * 2);
        e.fill();

        // Segmento 2
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(0, 1.8 * o + bobY, 9.2 * o, 5.4 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(0, 1.4 * o + bobY, 8.2 * o, 4.6 * o, 0, 0, Math.PI * 2);
        e.fill();

        // Segmento 1 (Cabeça)
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(0, 6.2 * o + bobY, 7.8 * o, 5.0 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(0, 5.8 * o + bobY, 7.0 * o, 4.2 * o, 0, 0, Math.PI * 2);
        e.fill();

        // Linhas de cutícula/rugas de flexão nos segmentos
        e.strokeStyle = lightCol;
        e.lineWidth = 1.1 * o;
        e.beginPath();
        e.arc(0, -4.5 * o + bobY, 6.5 * o, 0.2, Math.PI - 0.2);
        e.arc(0, 0.0 * o + bobY, 7.0 * o, 0.2, Math.PI - 0.2);
        e.arc(0, 4.2 * o + bobY, 5.8 * o, 0.2, Math.PI - 0.2);
        e.stroke();

        // Disco Bucal característico do Tardígrado (focinho redondo com estilete mineral)
        const mouthY = 9.4 * o + bobY;
        e.fillStyle = deepCol;
        e.beginPath();
        e.arc(0, mouthY, 2.8 * o, 0, Math.PI * 2);
        e.fill();
        e.strokeStyle = lightCol;
        e.lineWidth = 1.0 * o;
        e.beginPath();
        e.arc(0, mouthY, 2.0 * o, 0, Math.PI * 2);
        e.stroke();
        e.fillStyle = "#1e1b4b";
        e.beginPath();
        e.arc(0, mouthY, 1.0 * o, 0, Math.PI * 2);
        e.fill();

        // Olhos/ocelos pequeninos e curiosos
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.arc(-3.2 * o, 6.2 * o + bobY, 1.1 * o, 0, Math.PI * 2);
        e.arc(3.2 * o, 6.2 * o + bobY, 1.1 * o, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.arc(-3.5 * o, 5.9 * o + bobY, 0.45 * o, 0, Math.PI * 2);
        e.arc(2.9 * o, 5.9 * o + bobY, 0.45 * o, 0, Math.PI * 2);
        e.fill();

      } else if (facing === "up") {
        // Visto de costas
        const legOffsetsY = [-8 * o, -3.5 * o, 1.5 * o, 6.5 * o];
        for (let i = 0; i < 4; i++) {
          const legPhase = walkAnim + i * 1.35;
          const swingL = Math.sin(legPhase) * 0.42;
          const swingR = Math.sin(legPhase + Math.PI) * 0.42;
          const ly = legOffsetsY[i] + bobY;
          drawStubbyLeg(-8.5 * o, ly, -2.4 + swingL, i === 0 ? 0.9 : 1);
          drawStubbyLeg(8.5 * o, ly, 2.4 + swingR, i === 0 ? 0.9 : 1);
        }

        // Segmento 1 (Cabeça ao fundo)
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(0, -6.5 * o + bobY, 7.5 * o, 4.5 * o, 0, 0, Math.PI * 2);
        e.fill();
        // Segmento 2
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(0, -2.5 * o + bobY, 8.8 * o, 5.2 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(0, -2.8 * o + bobY, 8.0 * o, 4.4 * o, 0, 0, Math.PI * 2);
        e.fill();
        // Segmento 3
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(0, 1.8 * o + bobY, 9.6 * o, 5.6 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(0, 1.4 * o + bobY, 8.6 * o, 4.8 * o, 0, 0, Math.PI * 2);
        e.fill();
        // Segmento 4 (Traseiro rechonchudo no topo)
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(0, 6.5 * o + bobY, 8.8 * o, 5.4 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(0, 6.0 * o + bobY, 7.8 * o, 4.6 * o, 0, 0, Math.PI * 2);
        e.fill();

        // Dobras da cutícula
        e.strokeStyle = lightCol;
        e.lineWidth = 1.1 * o;
        e.beginPath();
        e.arc(0, -0.5 * o + bobY, 7.0 * o, 0.2, Math.PI - 0.2);
        e.arc(0, 3.8 * o + bobY, 6.5 * o, 0.2, Math.PI - 0.2);
        e.stroke();

      } else {
        // Perfil Lateral (facing === "left" ou "right")
        if (facing === "left") {
          e.scale(-1, 1);
        }

        // 4 Patas visíveis do lado em primeiro plano + 4 patas ao fundo
        const legOffsetsX = [7.5 * o, 2.5 * o, -2.8 * o, -8.2 * o];
        // Patas do fundo (mais escuras e ligeiramente menores)
        for (let i = 0; i < 4; i++) {
          const legPhase = walkAnim + i * 1.35 + Math.PI;
          const swing = Math.sin(legPhase) * 0.45;
          const lx = legOffsetsX[i];
          const ly = -1.2 * o + bobY;
          drawStubbyLeg(lx, ly, -0.2 + swing, 0.82);
        }

        // CORPO LATERAL RECHONCHUDO (4 segmentos em perfil horizontal)
        // Segmento 4 (Traseiro)
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(-8.0 * o, 1.0 * o + bobY, 5.2 * o, 6.4 * o, 0.1, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(-8.2 * o, 0.6 * o + bobY, 4.4 * o, 5.6 * o, 0.1, 0, Math.PI * 2);
        e.fill();

        // Segmento 3
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(-2.5 * o, 0.5 * o + bobY, 5.6 * o, 7.2 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(-2.7 * o, 0.0 * o + bobY, 4.8 * o, 6.4 * o, 0, 0, Math.PI * 2);
        e.fill();

        // Segmento 2
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(3.0 * o, 0.5 * o + bobY, 5.4 * o, 7.0 * o, -0.05, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(2.8 * o, 0.0 * o + bobY, 4.6 * o, 6.2 * o, -0.05, 0, Math.PI * 2);
        e.fill();

        // Segmento 1 (Cabeça)
        e.fillStyle = darkCol;
        e.beginPath();
        e.ellipse(8.0 * o, 1.5 * o + bobY, 4.6 * o, 5.5 * o, -0.15, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = mainCol;
        e.beginPath();
        e.ellipse(7.8 * o, 1.0 * o + bobY, 3.8 * o, 4.8 * o, -0.15, 0, Math.PI * 2);
        e.fill();

        // Focinho e disco bucal voltado para a frente
        const mouthX = 12.0 * o;
        const mouthY = 2.8 * o + bobY;
        e.fillStyle = deepCol;
        e.beginPath();
        e.ellipse(mouthX, mouthY, 2.0 * o, 2.6 * o, 0.2, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = lightCol;
        e.beginPath();
        e.arc(mouthX + 0.5 * o, mouthY, 1.2 * o, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#1e1b4b";
        e.beginPath();
        e.arc(mouthX + 0.8 * o, mouthY, 0.65 * o, 0, Math.PI * 2);
        e.fill();

        // Olho lateral
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.arc(8.2 * o, -0.8 * o + bobY, 1.1 * o, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.arc(8.5 * o, -1.1 * o + bobY, 0.45 * o, 0, Math.PI * 2);
        e.fill();

        // Dobras dorsais entre os gomos
        e.strokeStyle = lightCol;
        e.lineWidth = 1.0 * o;
        e.beginPath();
        e.moveTo(-5.5 * o, -5.5 * o + bobY);
        e.quadraticCurveTo(-4.8 * o, 0, -5.5 * o, 5.5 * o + bobY);
        e.moveTo(0.5 * o, -6.0 * o + bobY);
        e.quadraticCurveTo(1.2 * o, 0, 0.5 * o, 5.8 * o + bobY);
        e.moveTo(5.8 * o, -4.8 * o + bobY);
        e.quadraticCurveTo(6.4 * o, 0, 5.8 * o, 4.5 * o + bobY);
        e.stroke();

        // Patas do primeiro plano
        for (let i = 0; i < 4; i++) {
          const legPhase = walkAnim + i * 1.35;
          const swing = Math.sin(legPhase) * 0.45;
          const lx = legOffsetsX[i];
          const ly = 3.6 * o + bobY;
          drawStubbyLeg(lx, ly, 0.35 + swing, 1.05);
        }
      }

      // Auréola mineral de Criptobiose (ao levar dano ou quando provocado)
      if (l || (t.aggroTimer && t.aggroTimer > 0)) {
        const pulse = 0.5 + Math.sin(t.animTimer * 8) * 0.3;
        e.strokeStyle = `rgba(254, 240, 138, ${pulse * 0.75})`;
        e.lineWidth = 1.6 * o;
        e.beginPath();
        e.ellipse(0, 1.5 * o + bobY, 14.5 * o, 9.5 * o, 0, 0, Math.PI * 2);
        e.stroke();

        // Micro-cristais flutuando
        for (let s = 0; s < 4; s++) {
          const sAng = s * (Math.PI / 2) + t.animTimer * 3;
          const sDist = 14 * o;
          const sx = Math.cos(sAng) * sDist;
          const sy = Math.sin(sAng) * (sDist * 0.65) + bobY;
          e.fillStyle = s % 2 === 0 ? "#fef08a" : "#f59e0b";
          e.beginPath();
          e.arc(sx, sy, 1.2 * o, 0, Math.PI * 2);
          e.fill();
        }
      }

      e.restore();
    },

    // Carcaça no chão: estado clássico de "Tun" (barril criptobiótico encolhido e resistente)
    carcass: function (e, t, o, u) {
      e.save();
      const mainCol = t.color || "#d97706";
      const darkCol = "#78350f";
      const lightCol = t.accentColor || "#fef08a";

      // Sombra
      e.fillStyle = `rgba(15, 23, 42, ${0.45 * u})`;
      e.beginPath();
      e.ellipse(0, 2.5 * o, 11 * o, 6 * o, 0, 0, Math.PI * 2);
      e.fill();

      // Barril Criptobiótico ("Tun") - corpo compacto e encolhido
      e.fillStyle = darkCol;
      e.beginPath();
      e.ellipse(0, 0, 9.5 * o, 7.5 * o, 0, 0, Math.PI * 2);
      e.fill();

      e.fillStyle = mainCol;
      e.beginPath();
      e.ellipse(0, -0.6 * o, 8.2 * o, 6.2 * o, 0, 0, Math.PI * 2);
      e.fill();

      // Patas recolhidas ao redor do corpo
      for (const side of [-1, 1]) {
        for (let i = 0; i < 3; i++) {
          const px = side * (7.0 * o);
          const py = (-3.0 + i * 3.0) * o;
          e.fillStyle = darkCol;
          e.beginPath();
          e.ellipse(px, py, 2.0 * o, 1.5 * o, side * 0.4, 0, Math.PI * 2);
          e.fill();
          e.strokeStyle = lightCol;
          e.lineWidth = 0.9 * o;
          e.beginPath();
          e.moveTo(px, py);
          e.lineTo(px + side * 1.5 * o, py + 1.2 * o);
          e.stroke();
        }
      }

      // Fendas/rugas de dessecação na cutícula
      e.strokeStyle = `rgba(254, 240, 138, ${0.85 * u})`;
      e.lineWidth = 1.2 * o;
      e.beginPath();
      e.arc(0, -2.5 * o, 5.5 * o, 0.3, Math.PI - 0.3);
      e.arc(0, 1.5 * o, 5.5 * o, 0.3, Math.PI - 0.3);
      e.stroke();

      // Disco bucal retraído
      e.fillStyle = darkCol;
      e.beginPath();
      e.arc(0, 4.5 * o, 1.8 * o, 0, Math.PI * 2);
      e.fill();
      e.strokeStyle = lightCol;
      e.lineWidth = 0.8 * o;
      e.beginPath();
      e.arc(0, 4.5 * o, 1.1 * o, 0, Math.PI * 2);
      e.stroke();

      // Partículas minerais de sono criptobiótico
      const shimmer = Math.sin(t.animTimer * 3) * 0.2 + 0.8;
      e.strokeStyle = `rgba(251, 191, 36, ${0.5 * u * shimmer})`;
      e.lineWidth = 1.0 * o;
      e.beginPath();
      e.ellipse(0, 0, 12 * o, 9 * o, 0, 0, Math.PI * 2);
      e.stroke();

      e.restore();
    },

    // Ícone desenhado no canvas / inventário / slots
    icon: function (e, t, l) {
      e.save();
      const o = (t || 32) / 32;
      const mainCol = l.color || "#d97706";
      const darkCol = "#78350f";
      const lightCol = "#fef08a";

      // Sombra
      e.fillStyle = "rgba(15, 23, 42, 0.35)";
      e.beginPath();
      e.ellipse(0, 4 * o, 11 * o, 5.5 * o, 0, 0, Math.PI * 2);
      e.fill();

      // Patas do tardígrado (4 pares)
      for (const side of [-1, 1]) {
        for (let i = 0; i < 4; i++) {
          const py = (-6 + i * 4.2) * o;
          const px = side * 8 * o;
          e.fillStyle = darkCol;
          e.beginPath();
          e.ellipse(px, py, 2.8 * o, 1.8 * o, side * 0.35, 0, Math.PI * 2);
          e.fill();
          e.strokeStyle = lightCol;
          e.lineWidth = 0.8 * o;
          e.beginPath();
          e.moveTo(px, py);
          e.lineTo(px + side * 2.2 * o, py + 1.2 * o);
          e.stroke();
        }
      }

      // Corpo segmentado rechonchudo
      // Segmento posterior
      e.fillStyle = darkCol;
      e.beginPath();
      e.ellipse(0, -6 * o, 7.5 * o, 4.5 * o, 0, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = mainCol;
      e.beginPath();
      e.ellipse(0, -6.3 * o, 6.5 * o, 3.8 * o, 0, 0, Math.PI * 2);
      e.fill();

      // Segmento médio 1
      e.fillStyle = darkCol;
      e.beginPath();
      e.ellipse(0, -2 * o, 8.8 * o, 4.8 * o, 0, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = mainCol;
      e.beginPath();
      e.ellipse(0, -2.3 * o, 7.8 * o, 4.0 * o, 0, 0, Math.PI * 2);
      e.fill();

      // Segmento médio 2
      e.fillStyle = darkCol;
      e.beginPath();
      e.ellipse(0, 2 * o, 8.4 * o, 4.6 * o, 0, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = mainCol;
      e.beginPath();
      e.ellipse(0, 1.7 * o, 7.4 * o, 3.8 * o, 0, 0, Math.PI * 2);
      e.fill();

      // Cabeça
      e.fillStyle = darkCol;
      e.beginPath();
      e.ellipse(0, 5.8 * o, 6.8 * o, 4.2 * o, 0, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = mainCol;
      e.beginPath();
      e.ellipse(0, 5.5 * o, 5.8 * o, 3.4 * o, 0, 0, Math.PI * 2);
      e.fill();

      // Linhas da cutícula
      e.strokeStyle = lightCol;
      e.lineWidth = 0.9 * o;
      e.beginPath();
      e.arc(0, -3.8 * o, 5.5 * o, 0.2, Math.PI - 0.2);
      e.arc(0, 0.2 * o, 6.0 * o, 0.2, Math.PI - 0.2);
      e.arc(0, 4.0 * o, 5.0 * o, 0.2, Math.PI - 0.2);
      e.stroke();

      // Disco bucal
      e.fillStyle = darkCol;
      e.beginPath();
      e.arc(0, 8.5 * o, 2.2 * o, 0, Math.PI * 2);
      e.fill();
      e.strokeStyle = lightCol;
      e.lineWidth = 0.8 * o;
      e.beginPath();
      e.arc(0, 8.5 * o, 1.4 * o, 0, Math.PI * 2);
      e.stroke();

      // Olhos diminutos
      e.fillStyle = "#0f172a";
      e.beginPath();
      e.arc(-2.6 * o, 5.6 * o, 0.9 * o, 0, Math.PI * 2);
      e.arc(2.6 * o, 5.6 * o, 0.9 * o, 0, Math.PI * 2);
      e.fill();
      e.fillStyle = "#ffffff";
      e.beginPath();
      e.arc(-2.8 * o, 5.3 * o, 0.4 * o, 0, Math.PI * 2);
      e.arc(2.4 * o, 5.3 * o, 0.4 * o, 0, Math.PI * 2);
      e.fill();

      e.restore();
    },
  },
};
