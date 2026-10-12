/* js/creatures/wolf.js
 * Criatura COMPLETA: Lobo (predador). Tudo que define o lobo fica neste arquivo.
 * Depende de registry.js (carregar depois dele). Ordem de carga: rabbit.js, wolf.js, deer.js
 * (a ordem define a prioridade de deteccao por nome: coelho > lobo > cervo).
 *
 * Dois nascimentos: `spawn` (Lobo dos Bosques, florestas) e `spawnVariants.snow` (Lobo das Neves, biomas de neve/gelo).
 * `behavior.predator`: presas fogem dele (updatePreyAI). `behavior.hunter`: numeros da IA de caca
 * (creatures-manager.js): cacar presas num raio, perseguir, atacar e vagar quando nao ha presa.
 */
"use strict";
CREATURES.wolf = {
  id: "wolf",
  // Nascimento no mundo (valores do spawn)
  spawn: { name: "Lobo dos Bosques", color: "#475569", accentColor: "#f59e0b", hp: 24, attack: 6, speed: 1.05, scale: 0.95 },
  spawnVariants: {
    snow: { name: "Lobo das Neves", color: "#94a3b8", accentColor: "#38bdf8", hp: 25, attack: 6, speed: 1.1, scale: 1 },
  },
  // Comportamento: predador (as presas fogem dele); particulas ao morrer
  behavior: {
    prey: false,
    predator: true,
    deathParticles: 12,
    // Nome da ameaca mostrado/guardado nas presas (threatName)
    threatName: "lobo",
    // Recarga do ataque ao jogador (s)
    attackCooldown: 1,
    // Valores usados pela IA de caca (creatures-manager.js)
    hunter: {
      huntRadius: 185,
      meleeRange: 22,
      huntSpeedMult: 1.35,
      attackCooldownPrey: 1.1,
      wanderWait: [1.8, 2.5],
      idleChance: 0.3,
      wanderSpeedMult: 0.6,
    },
  },
  // Carcaca deixada ao morrer
  carcass: {
    name: "Carcaça de Lobo",
    bodyName: "Corpo de Lobo",
    description: "Corpo de lobo abatido. Pode ser destrinchado com uma faca para extrair ossos, pele, carne, entranhas e dente de lobo.",
  },
  // Ficha mostrada ao destrinchar
  sheet: {
          name: "Lobo Selvagem",
          species: "Canídeo Predador",
          icon: "🐺",
          badgeColor: "text-slate-300 border-slate-500/40 bg-slate-900/60",
          description:
            "Predador canino ágil das estepes e bosques nevados. Rende pele espessa, carne, ossos, entranhas e dentes afiados.",
          exclusiveNote:
            "Item Exclusivo: Dente de Lobo (material para armas perfurantes e talismãs).",
        },
  // Como reconhecer um item/carcaca desta criatura (t = nome, l = id, o = icone, tudo minusculo)
  detect: (t, l, o) => t.includes("lobo") || t.includes("wolf") || l.includes("wolf") || l.includes("lobo") || o === "creature_wolf",
  // Reconhecer por nome/id/icone para escolher o DESENHO do icone (antigo lb). t=nome, l=id, o=icone (minusculos)
  detectIcon: (t, l, o) => o === "creature_wolf" || o === "wolf" || t.includes("lobo") || l.includes("wolf"),
  // Despojos ao destrinchar (t = timestamp, l = gerador de sufixo aleatorio)
  loot: (t, l) => [
          {
            id: `butcher_wolf_bone_${t}_${l()}`,
            isExclusive: !1,
            status: "pending",
            item: {
              isCreaturePart: !0,
              id: `item_osso_lobo_${t}_${l()}`,
              name: "Ossos de Lobo",
              categoryType: "material",
              rarity: "comum",
              stackCount: 3,
              isEquippable: !1,
              icon: "bone",
              color: "#e2e8f0",
              value: 12,
              description:
                "Ossos densos e resistentes de predador canino. Matéria-prima clássica para ferramentas, agulhas e entalhes.",
            },
          },
          {
            id: `butcher_wolf_pelt_${t}_${l()}`,
            isExclusive: !1,
            status: "pending",
            item: {
              isCreaturePart: !0,
              id: `item_pele_lobo_${t}_${l()}`,
              name: "Pele de Lobo",
              categoryType: "material",
              rarity: "incomum",
              stackCount: 1,
              isEquippable: !1,
              icon: "shirt",
              color: "#94a3b8",
              value: 30,
              description:
                "Couro felpudo com espessa camada térmica de lã de lobo. Ideal para confecção de mantos e reforço de armaduras.",
            },
          },
          {
            id: `butcher_wolf_meat_${t}_${l()}`,
            isExclusive: !1,
            status: "pending",
            item: {
              isCreaturePart: !0,
              id: `item_carne_lobo_${t}_${l()}`,
              name: "Carne de Lobo Crua",
              categoryType: "consumable",
              rarity: "comum",
              stackCount: 2,
              isEquippable: !1,
              icon: "utensils",
              color: "#f87171",
              value: 18,
              description:
                "Carne crua de caça. Pode ser consumida (+25 Vida, +30 Stamina) ou levada à fogueira e forno de barro para assar.",
            },
          },
          {
            id: `butcher_wolf_guts_${t}_${l()}`,
            isExclusive: !1,
            status: "pending",
            item: {
              isCreaturePart: !0,
              id: `item_entranhas_lobo_${t}_${l()}`,
              name: "Entranhas de Lobo",
              categoryType: "material",
              rarity: "comum",
              stackCount: 1,
              isEquippable: !1,
              icon: "heart",
              color: "#991b1b",
              value: 14,
              description:
                "Vísceras frescas colhidas durante a evisceração. Essenciais para compostos químicos, iscas e fermentações.",
            },
          },
          {
            id: `butcher_wolf_tooth_${t}_${l()}`,
            isExclusive: !0,
            exclusiveLabel: "⭐ Exclusivo de Lobo",
            status: "pending",
            item: {
              isCreaturePart: !0,
              id: `item_dente_lobo_${t}_${l()}`,
              name: "Dente de Lobo Alfa",
              categoryType: "material",
              rarity: "raro",
              stackCount: 2,
              isEquippable: !1,
              icon: "sparkles",
              color: "#f1f5f9",
              value: 48,
              description:
                "Presa afiada e curva do lobo predador. Item exclusivo valioso, cobiçado para ornamentos cerimoniais e armas perfurantes.",
            },
          },
        ],
  // Desenho no Canvas (codigo movido sem alteracoes dos arquivos de engine)
  draw: {
    body: function (e, t, o, l) {
      // ==========================================
      // 1. LOBO MORDE BRAÇO E SEGURA (ABRAÇA O PLAYER)
      // ==========================================
      if (t.wolfAttackState === "arm_hold") {
        e.save();
        const u = t.facing === "left" ? -1 : 1;
        e.scale(u, 1);
        const m = l ? "#ffffff" : t.color,
          c = l ? "#e2e8f0" : "#475569",
          f = l ? "#ffffff" : "#cbd5e1",
          g = l ? "#ffffff" : "#e2e8f0";

        const thrash = Math.sin((t.wolfAttackTimer || 0) * 26) * 1.8 * o;
        const gnaw = Math.sin((t.wolfAttackTimer || 0) * 32) * 1.2 * o;

        // Patas traseiras plantadas no chão sustentando o peso
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(-8 * o, 1 * o);
        e.lineTo(-5 * o, 7 * o);
        e.lineTo(-1 * o, 7 * o);
        e.lineTo(-3 * o, 1 * o);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-5 * o, 6.2 * o, 4 * o, 1.2 * o);

        // Rabo tenso balançando atrás
        const tailWag = Math.sin((t.wolfAttackTimer || 0) * 16) * 2.5 * o;
        e.strokeStyle = m;
        e.lineWidth = 3.6 * o;
        e.lineCap = "round";
        e.beginPath();
        e.moveTo(-8 * o, 0 * o);
        e.quadraticCurveTo(-14 * o, 4 * o + tailWag, -13 * o, 10 * o + tailWag);
        e.stroke();

        // Tronco empinado verticalmente abraçando o torso/braço do jogador
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-7 * o, 0 * o);
        e.quadraticCurveTo(-6 * o, -8 * o, 0 * o, -14 * o);
        e.lineTo(5 * o, -14 * o);
        e.quadraticCurveTo(7 * o, -6 * o, 1 * o, 3 * o);
        e.lineTo(-4 * o, 3 * o);
        e.closePath();
        e.fill();

        if (!l) {
          e.fillStyle = g;
          e.beginPath();
          e.moveTo(0 * o, -13 * o);
          e.quadraticCurveTo(5 * o, -9 * o, 4 * o, -3 * o);
          e.quadraticCurveTo(0 * o, -4 * o, -2 * o, -8 * o);
          e.closePath();
          e.fill();
        }

        // Patas dianteiras estendidas para frente ABRAÇANDO o player (faz o abraço)
        // Pata dianteira inferior (envolve a cintura/tronco)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(2 * o, -6 * o);
        e.lineTo(10 * o, -5 * o);
        e.lineTo(13 * o, -2 * o);
        e.lineTo(11 * o, -1 * o);
        e.lineTo(1 * o, -3 * o);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(11 * o, -3 * o, 2.8 * o, 1.5 * o);

        // Pata dianteira superior (envolve o ombro/braço do jogador)
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(3 * o, -12 * o);
        e.lineTo(12 * o, -11 * o);
        e.lineTo(15 * o, -7 * o);
        e.lineTo(12.5 * o, -5 * o);
        e.lineTo(2 * o, -9 * o);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(13 * o, -7.5 * o, 2.5 * o, 1.5 * o);

        // Cabeça cravada na altura do braço com sacudidas de mordida
        const headBaseX = 6 * o + thrash;
        const headBaseY = -15 * o + gnaw;

        // Pescoço
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(2 * o, -13 * o);
        e.lineTo(headBaseX, headBaseY);
        e.lineTo(headBaseX + 4 * o, headBaseY + 3 * o);
        e.lineTo(4 * o, -9 * o);
        e.closePath();
        e.fill();

        // Crânio do lobo
        e.beginPath();
        e.ellipse(headBaseX + 1 * o, headBaseY - 1 * o, 4.5 * o, 4 * o, 0.25, 0, Math.PI * 2);
        e.fill();

        // Focinho e Mandíbula Superior
        e.beginPath();
        e.moveTo(headBaseX + 2 * o, headBaseY - 2.5 * o);
        e.lineTo(headBaseX + 9 * o, headBaseY - 1.5 * o);
        e.lineTo(headBaseX + 8.5 * o, headBaseY + 0.5 * o);
        e.lineTo(headBaseX + 3 * o, headBaseY + 1 * o);
        e.closePath();
        e.fill();

        // Nariz
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.roundRect(headBaseX + 8.2 * o, headBaseY - 2 * o, 1.8 * o, 1.8 * o, 0.4 * o);
        e.fill();

        // Mandíbula Inferior (aberta e cravando de baixo para cima no braço)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headBaseX + 3 * o, headBaseY + 2 * o);
        e.lineTo(headBaseX + 8 * o, headBaseY + 2.5 * o);
        e.lineTo(headBaseX + 7.5 * o, headBaseY + 4 * o);
        e.lineTo(headBaseX + 2 * o, headBaseY + 3.5 * o);
        e.closePath();
        e.fill();

        // Dentes / Presas pontiagudas cravadas no braço
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.moveTo(headBaseX + 6.8 * o, headBaseY + 0.3 * o);
        e.lineTo(headBaseX + 7.4 * o, headBaseY + 2.2 * o);
        e.lineTo(headBaseX + 7.9 * o, headBaseY + 0.3 * o);
        e.closePath();
        e.fill();
        e.beginPath();
        e.moveTo(headBaseX + 6.0 * o, headBaseY + 2.6 * o);
        e.lineTo(headBaseX + 6.5 * o, headBaseY + 1.0 * o);
        e.lineTo(headBaseX + 7.1 * o, headBaseY + 2.6 * o);
        e.closePath();
        e.fill();

        // Orelhas para trás em fúria
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headBaseX - 2 * o, headBaseY - 2 * o);
        e.lineTo(headBaseX - 6 * o, headBaseY - 5 * o);
        e.lineTo(headBaseX - 1 * o, headBaseY - 4 * o);
        e.closePath();
        e.fill();
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(headBaseX - 1 * o, headBaseY - 3 * o);
        e.lineTo(headBaseX - 5 * o, headBaseY - 6.5 * o);
        e.lineTo(headBaseX + 1 * o, headBaseY - 4 * o);
        e.closePath();
        e.fill();

        // Olhos brilhando agressivos
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headBaseX + 3.5 * o, headBaseY - 1.5 * o, 1.8 * o, 1.2 * o, 0.1, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = l ? "#ef4444" : t.accentColor;
        e.beginPath();
        e.arc(headBaseX + 3.7 * o, headBaseY - 1.5 * o, 1.2 * o, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headBaseX + 3.9 * o, headBaseY - 1.5 * o, 0.45 * o, 0.9 * o, 0, 0, Math.PI * 2);
        e.fill();

        e.restore();
        return;
      }

      // ==========================================
      // 2. LOBO MORDE PERNA E PUXA PARA TRÁS
      // ==========================================
      if (t.wolfAttackState === "leg_pull") {
        e.save();
        const u = t.facing === "left" ? -1 : 1;
        e.scale(u, 1);
        const m = l ? "#ffffff" : t.color,
          c = l ? "#e2e8f0" : "#475569",
          f = l ? "#ffffff" : "#cbd5e1",
          g = l ? "#ffffff" : "#e2e8f0";

        // Tensão do puxão: sacudidas violentas puxando para trás
        const tugJerks = Math.sin((t.wolfAttackTimer || 0) * 24) * 2.5 * o;

        // Patas traseiras fincadas bem para trás no solo, dobradas sob tensão
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(-10 * o, -1 * o);
        e.lineTo(-14 * o, 4 * o);
        e.lineTo(-10 * o, 4 * o);
        e.lineTo(-7 * o, 0 * o);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-14 * o, 3.2 * o, 4.5 * o, 1.2 * o);

        // Rabo tenso esticado baixo
        e.strokeStyle = m;
        e.lineWidth = 3.6 * o;
        e.lineCap = "round";
        e.beginPath();
        e.moveTo(-10 * o, -2 * o);
        e.quadraticCurveTo(-15 * o, 1 * o, -17 * o, -1 * o);
        e.stroke();

        // Corpo esticado baixo rente ao chão, puxando com toda força para trás
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-11 * o, -4 * o);
        e.quadraticCurveTo(-4 * o, -7 * o, 3 * o, -5 * o);
        e.lineTo(5 * o, -1 * o);
        e.quadraticCurveTo(-2 * o, 2 * o, -8 * o, 1 * o);
        e.closePath();
        e.fill();

        if (!l) {
          e.fillStyle = g;
          e.beginPath();
          e.moveTo(0 * o, -4 * o);
          e.quadraticCurveTo(4 * o, -2 * o, 3 * o, 1 * o);
          e.quadraticCurveTo(-1 * o, 1 * o, -3 * o, -2 * o);
          e.closePath();
          e.fill();
        }

        // Patas dianteiras estendidas para frente cravadas no chão resistindo ao puxão
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(1 * o, -2 * o);
        e.lineTo(5 * o, 3 * o);
        e.lineTo(8 * o, 3.5 * o);
        e.lineTo(4 * o, 0 * o);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(5 * o, 2.8 * o, 3.5 * o, 1.2 * o);

        // Cabeça baixa no nível da perna/tornozelo, puxando para trás
        const headX = (6 - Math.abs(tugJerks)) * o;
        const headY = (0 + tugJerks * 0.2) * o;

        // Pescoço esticado
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(2 * o, -5 * o);
        e.lineTo(headX, headY - 3 * o);
        e.lineTo(headX + 2 * o, headY + 2 * o);
        e.lineTo(4 * o, -1 * o);
        e.closePath();
        e.fill();

        // Cabeça
        e.beginPath();
        e.ellipse(headX + 1 * o, headY - 1 * o, 4.2 * o, 3.6 * o, 0.1, 0, Math.PI * 2);
        e.fill();

        // Focinho superior cravado na perna
        e.beginPath();
        e.moveTo(headX + 2 * o, headY - 2.5 * o);
        e.lineTo(headX + 9 * o, headY - 1.5 * o);
        e.lineTo(headX + 8.5 * o, headY + 0.5 * o);
        e.lineTo(headX + 3 * o, headY + 0.8 * o);
        e.closePath();
        e.fill();

        e.fillStyle = "#0f172a";
        e.beginPath();
        e.roundRect(headX + 8.2 * o, headY - 2 * o, 1.6 * o, 1.7 * o, 0.4 * o);
        e.fill();

        // Mandíbula inferior cravada por baixo da perna
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headX + 2 * o, headY + 1.2 * o);
        e.lineTo(headX + 8 * o, headY + 1.5 * o);
        e.lineTo(headX + 7.5 * o, headY + 3.2 * o);
        e.lineTo(headX + 2 * o, headY + 2.8 * o);
        e.closePath();
        e.fill();

        // Dentes / Presas travadas na perna
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.moveTo(headX + 6.8 * o, headY + 0.3 * o);
        e.lineTo(headX + 7.4 * o, headY + 2.2 * o);
        e.lineTo(headX + 7.9 * o, headY + 0.3 * o);
        e.closePath();
        e.fill();
        e.beginPath();
        e.moveTo(headX + 6.0 * o, headY + 2.4 * o);
        e.lineTo(headX + 6.5 * o, headY + 1.0 * o);
        e.lineTo(headX + 7.1 * o, headY + 2.4 * o);
        e.closePath();
        e.fill();

        // Orelhas coladas nas costas pela força do puxão
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(headX - 1 * o, headY - 2 * o);
        e.lineTo(headX - 5 * o, headY - 3.5 * o);
        e.lineTo(headX, headY - 3.5 * o);
        e.closePath();
        e.fill();

        // Olhos fixos com raiva
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headX + 3.2 * o, headY - 1.5 * o, 1.7 * o, 1.1 * o, 0.1, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = l ? "#ef4444" : t.accentColor;
        e.beginPath();
        e.arc(headX + 3.4 * o, headY - 1.5 * o, 1.1 * o, 0, Math.PI * 2);
        e.fill();

        e.restore();
        return;
      }

      // ==========================================
      // 3. MORDE, SOLTA E AFASTA PARA AVANÇAR NOVAMENTE
      // ==========================================
      if (t.wolfAttackState === "quick_bite") {
        // Bote frontal rápido mordendo
        e.save();
        const u = t.facing === "left" ? -1 : 1;
        e.scale(u, 1);
        const m = l ? "#ffffff" : t.color,
          c = l ? "#e2e8f0" : "#475569",
          g = l ? "#ffffff" : "#e2e8f0";

        const lungeProgress = 1 - (t.wolfAttackTimer || 0) / (t.wolfAttackDuration || 0.25);
        const lungeHop = Math.sin(lungeProgress * Math.PI) * 4 * o;

        // Patas traseiras impulsionando para trás
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(-8 * o, -4 * o - lungeHop);
        e.lineTo(-14 * o, 1 * o);
        e.lineTo(-11 * o, 1 * o);
        e.lineTo(-5 * o, -3 * o - lungeHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-14 * o, 0.5 * o, 3.5 * o, 1 * o);

        // Tronco no ar
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-9 * o, -8 * o - lungeHop);
        e.quadraticCurveTo(-2 * o, -12 * o - lungeHop, 5 * o, -9 * o - lungeHop);
        e.lineTo(7 * o, -6 * o - lungeHop);
        e.quadraticCurveTo(5 * o, -1 * o - lungeHop, -4 * o, -2 * o - lungeHop);
        e.lineTo(-8 * o, -5 * o - lungeHop);
        e.closePath();
        e.fill();

        // Patas dianteiras estendidas no ar para frente
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(3 * o, -6 * o - lungeHop);
        e.lineTo(11 * o, -2 * o - lungeHop);
        e.lineTo(10 * o, 0 * o - lungeHop);
        e.lineTo(1 * o, -4 * o - lungeHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(10 * o, -1.5 * o - lungeHop, 3 * o, 1.2 * o);

        // Cabeça com mandíbula estalando
        const snap = Math.sin(lungeProgress * Math.PI);
        const headX = (9 + lungeProgress * 3) * o;
        const headY = (-10 - lungeHop) * o;

        e.fillStyle = m;
        e.beginPath();
        e.ellipse(headX + 1 * o, headY, 4.2 * o, 3.8 * o, 0.1, 0, Math.PI * 2);
        e.fill();

        const mouthOpen = (1 - snap) * 3 * o;
        e.beginPath();
        e.moveTo(headX + 2 * o, headY - 2 * o - mouthOpen * 0.5);
        e.lineTo(headX + 9 * o, headY - 1 * o - mouthOpen);
        e.lineTo(headX + 8.5 * o, headY + 1 * o - mouthOpen);
        e.lineTo(headX + 3 * o, headY + 1.5 * o);
        e.closePath();
        e.fill();

        e.fillStyle = "#0f172a";
        e.beginPath();
        e.roundRect(headX + 8.2 * o, headY - 1.5 * o - mouthOpen, 1.6 * o, 1.7 * o, 0.4 * o);
        e.fill();

        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headX + 3 * o, headY + 1.5 * o);
        e.lineTo(headX + 8 * o, headY + 2 * o + mouthOpen);
        e.lineTo(headX + 7.5 * o, headY + 3.8 * o + mouthOpen);
        e.lineTo(headX + 2 * o, headY + 3 * o);
        e.closePath();
        e.fill();

        // Presas
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.moveTo(headX + 6.8 * o, headY + 0.8 * o - mouthOpen);
        e.lineTo(headX + 7.4 * o, headY + 2.8 * o - mouthOpen * 0.5);
        e.lineTo(headX + 8.0 * o, headY + 0.8 * o - mouthOpen);
        e.closePath();
        e.fill();
        e.beginPath();
        e.moveTo(headX + 6.0 * o, headY + 2.4 * o + mouthOpen);
        e.lineTo(headX + 6.6 * o, headY + 0.5 * o + mouthOpen * 0.5);
        e.lineTo(headX + 7.2 * o, headY + 2.4 * o + mouthOpen);
        e.closePath();
        e.fill();

        e.fillStyle = l ? "#ef4444" : t.accentColor;
        e.beginPath();
        e.arc(headX + 3.7 * o, headY - 1.2 * o, 1.2 * o, 0, Math.PI * 2);
        e.fill();

        e.restore();
        return;
      }

      if (t.wolfAttackState === "quick_retreat") {
        // Solta e afasta derrapando para trás em alerta defensivo
        e.save();
        const u = t.facing === "left" ? -1 : 1;
        e.scale(u, 1);
        const m = l ? "#ffffff" : t.color,
          c = l ? "#e2e8f0" : "#475569";

        const skidProgress = 1 - (t.wolfAttackTimer || 0) / (t.wolfAttackDuration || 0.45);
        const skidVib = Math.sin(skidProgress * 25) * 1.2 * o;

        // Patas dianteiras deslizando para trás no solo
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(2 * o, -5 * o);
        e.lineTo(6 * o, 2 * o);
        e.lineTo(9 * o, 2.5 * o);
        e.lineTo(4 * o, -4 * o);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(6 * o, 2 * o, 3.8 * o, 1.2 * o);

        // Patas traseiras amortecendo
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-6 * o, -6 * o);
        e.lineTo(-9 * o, 1.5 * o);
        e.lineTo(-6 * o, 1.5 * o);
        e.lineTo(-3 * o, -5 * o);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-9 * o, 1 * o, 3.5 * o, 1.2 * o);

        // Corpo abaixado e recuando
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-9 * o, -9 * o + skidVib);
        e.quadraticCurveTo(-3 * o, -11 * o + skidVib, 4 * o, -10 * o + skidVib);
        e.lineTo(6 * o, -7 * o + skidVib);
        e.quadraticCurveTo(5 * o, -3 * o + skidVib, -5 * o, -4 * o + skidVib);
        e.lineTo(-8 * o, -7 * o + skidVib);
        e.closePath();
        e.fill();

        // Cabeça com rosnado e orelhas coladas
        const headX = 6 * o;
        const headY = -10 * o + skidVib;

        e.beginPath();
        e.ellipse(headX + 1 * o, headY, 4.2 * o, 3.6 * o, 0.1, 0, Math.PI * 2);
        e.fill();

        e.beginPath();
        e.moveTo(headX + 2 * o, headY - 2 * o);
        e.lineTo(headX + 8.5 * o, headY - 1 * o);
        e.lineTo(headX + 8.5 * o, headY + 1 * o);
        e.lineTo(headX + 3 * o, headY + 2 * o);
        e.closePath();
        e.fill();

        e.fillStyle = "#0f172a";
        e.beginPath();
        e.roundRect(headX + 8 * o, headY - 1.5 * o, 1.6 * o, 1.6 * o, 0.4 * o);
        e.fill();

        // Dentes à mostra
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.moveTo(headX + 5.5 * o, headY + 0.8 * o);
        e.lineTo(headX + 6.2 * o, headY + 2.2 * o);
        e.lineTo(headX + 6.9 * o, headY + 0.8 * o);
        e.closePath();
        e.fill();

        // Orelhas coladas para trás
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headX - 1 * o, headY - 2 * o);
        e.lineTo(headX - 6 * o, headY - 4 * o);
        e.lineTo(headX - 1 * o, headY - 4 * o);
        e.closePath();
        e.fill();

        e.fillStyle = l ? "#ef4444" : t.accentColor;
        e.beginPath();
        e.arc(headX + 3.7 * o, headY - 1.4 * o, 1.1 * o, 0, Math.PI * 2);
        e.fill();

        e.restore();
        return;
      }

      if (t.wolfAttackState === "advance_again") {
        // Avanço rápido com bote renovado
        e.save();
        const u = t.facing === "left" ? -1 : 1;
        e.scale(u, 1);
        const m = l ? "#ffffff" : t.color,
          c = l ? "#e2e8f0" : "#475569";

        const advProg = 1 - (t.wolfAttackTimer || 0) / (t.wolfAttackDuration || 0.5);
        const sprintHop = Math.sin(advProg * Math.PI * 2) * 2.5 * o;

        // Pernas galopando com força
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(-6 * o, -5 * o + sprintHop);
        e.lineTo(-11 * o, 2 * o + sprintHop);
        e.lineTo(-8 * o, 2 * o + sprintHop);
        e.lineTo(-3 * o, -4 * o + sprintHop);
        e.closePath();
        e.fill();

        // Patas dianteiras estendendo para frente
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(3 * o, -7 * o + sprintHop);
        e.lineTo(8 * o, 1 * o + sprintHop);
        e.lineTo(10 * o, 1 * o + sprintHop);
        e.lineTo(5 * o, -6 * o + sprintHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(8 * o, 0.5 * o + sprintHop, 3.2 * o, 1.2 * o);

        // Tronco em arrancada
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-8 * o, -9 * o + sprintHop);
        e.quadraticCurveTo(-1 * o, -13 * o + sprintHop, 5 * o, -11 * o + sprintHop);
        e.lineTo(7 * o, -8 * o + sprintHop);
        e.quadraticCurveTo(6 * o, -3 * o + sprintHop, -4 * o, -4 * o + sprintHop);
        e.closePath();
        e.fill();

        const headX = 8 * o;
        const headY = -11 * o + sprintHop;

        e.beginPath();
        e.ellipse(headX + 1 * o, headY, 4.2 * o, 3.6 * o, 0.1, 0, Math.PI * 2);
        e.fill();

        e.beginPath();
        e.moveTo(headX + 2 * o, headY - 2 * o);
        e.lineTo(headX + 9 * o, headY - 1 * o);
        e.lineTo(headX + 8.5 * o, headY + 1 * o);
        e.lineTo(headX + 3 * o, headY + 2 * o);
        e.closePath();
        e.fill();

        e.fillStyle = "#0f172a";
        e.beginPath();
        e.roundRect(headX + 8 * o, headY - 1.5 * o, 1.6 * o, 1.6 * o, 0.4 * o);
        e.fill();

        e.fillStyle = "#ffffff";
        e.beginPath();
        e.moveTo(headX + 6.5 * o, headY + 0.8 * o);
        e.lineTo(headX + 7.2 * o, headY + 2.5 * o);
        e.lineTo(headX + 7.8 * o, headY + 0.8 * o);
        e.closePath();
        e.fill();

        e.fillStyle = l ? "#ef4444" : t.accentColor;
        e.beginPath();
        e.arc(headX + 3.7 * o, headY - 1.2 * o, 1.2 * o, 0, Math.PI * 2);
        e.fill();

        e.restore();
        return;
      }

      // ==========================================
      // ANIMAÇÃO PADRÃO (ANDANDO, CORRENDO OU PARADO)
      // ==========================================
      e.save();
      const u = t.facing === "left" ? -1 : 1;
      e.scale(u, 1);
      const m = l ? "#ffffff" : t.color,
        c = l ? "#e2e8f0" : "#475569",
        f = l ? "#ffffff" : "#cbd5e1",
        g = l ? "#ffffff" : "#e2e8f0",
        w = t.vx * t.vx + t.vy * t.vy > 0.04,
        v = w ? t.animTimer * 9 : t.animTimer * 2.2,
        T = w
          ? Math.sin(v * 2) * 1.5 * o
          : Math.sin(t.animTimer * 2.5) * 0.6 * o,
        S = Math.sin(t.animTimer * 3) * 0.4 * o,
        p = w ? Math.sin(v) * 4.2 * o : 0,
        j = w ? Math.sin(v + Math.PI) * 4.2 * o : 0,
        P = w ? Math.sin(v + Math.PI * 0.7) * 4.2 * o : 0,
        A = w ? Math.sin(v + Math.PI * 1.7) * 4.2 * o : 0;
      ((e.fillStyle = c),
        e.beginPath(),
        e.moveTo(-6 * o, -6 * o + T),
        e.lineTo(-8 * o + A, -1 * o + T),
        e.lineTo(-7 * o + A, 2 * o),
        e.lineTo(-4 * o + A, 2 * o),
        e.lineTo(-4 * o, -6 * o + T),
        e.closePath(),
        e.fill(),
        e.beginPath(),
        e.moveTo(5 * o, -7 * o + T),
        e.lineTo(6 * o + j, -1 * o + T),
        e.lineTo(7 * o + j, 2 * o),
        e.lineTo(4 * o + j, 2 * o),
        e.lineTo(3 * o, -7 * o + T),
        e.closePath(),
        e.fill());
      const x = Math.sin(v * 1.2) * 2.5 * o;
      ((e.strokeStyle = m),
        (e.lineWidth = 3.6 * o),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(-9 * o, -8 * o + T),
        e.quadraticCurveTo(-14 * o, -11 * o + x, -13 * o, -4 * o + x),
        e.stroke(),
        (e.strokeStyle = f),
        (e.lineWidth = 2.2 * o),
        e.beginPath(),
        e.moveTo(-14 * o, -7 * o + x),
        e.lineTo(-13 * o, -4 * o + x),
        e.stroke(),
        (e.fillStyle = m),
        e.beginPath(),
        e.moveTo(-9 * o, -10 * o + T),
        e.quadraticCurveTo(-2 * o, -13 * o + T, 4 * o, -12 * o + T),
        e.lineTo(7 * o, -10 * o + T),
        e.quadraticCurveTo(8 * o, -4 * o + T + S, 4 * o, -2 * o + T + S),
        e.quadraticCurveTo(-3 * o, -4 * o + T, -8 * o, -6 * o + T),
        e.closePath(),
        e.fill(),
        l ||
          ((e.fillStyle = g),
          e.beginPath(),
          e.moveTo(2 * o, -9 * o + T),
          e.quadraticCurveTo(7 * o, -5 * o + T, 5 * o, -2 * o + T + S),
          e.quadraticCurveTo(1 * o, -3 * o + T, -2 * o, -5 * o + T),
          e.closePath(),
          e.fill(),
          (e.fillStyle = f),
          e.beginPath(),
          e.moveTo(6 * o, -9 * o + T),
          e.lineTo(9.2 * o, -6 * o + T),
          e.lineTo(7.2 * o, -4 * o + T),
          e.lineTo(9.8 * o, -2 * o + T),
          e.lineTo(6.2 * o, -1 * o + T),
          e.closePath(),
          e.fill()),
        (e.fillStyle = m),
        e.beginPath(),
        e.moveTo(-5 * o, -10 * o + T),
        e.quadraticCurveTo(-9 * o, -5 * o + T, -7 * o + P, 0 * o + T),
        e.lineTo(-6 * o + P, 3 * o),
        e.lineTo(-3 * o + P, 3 * o),
        e.lineTo(-3.5 * o + P, 0 * o + T),
        e.quadraticCurveTo(-3 * o, -6 * o + T, -3 * o, -8 * o + T),
        e.closePath(),
        e.fill(),
        e.beginPath(),
        e.moveTo(4 * o, -10 * o + T),
        e.lineTo(6 * o + p, 0 * o + T),
        e.lineTo(6.5 * o + p, 3 * o),
        e.lineTo(3.5 * o + p, 3 * o),
        e.lineTo(3 * o + p, 0 * o + T),
        e.lineTo(1.5 * o, -8 * o + T),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#0f172a"),
        e.fillRect(-6 * o + P, 2.5 * o, 3.2 * o, 0.9 * o),
        e.fillRect(3.5 * o + p, 2.5 * o, 3.2 * o, 0.9 * o));
      const M = 7 * o,
        $ = -12 * o + T;
      if (
        ((e.fillStyle = m),
        e.beginPath(),
        e.moveTo(3 * o, -12 * o + T),
        e.lineTo(M + 2 * o, $ - 4 * o),
        e.lineTo(M + 5 * o, $),
        e.lineTo(5 * o, -7 * o + T),
        e.closePath(),
        e.fill(),
        e.beginPath(),
        e.ellipse(
          M + 1.5 * o,
          $ - 1 * o,
          4.2 * o,
          3.8 * o,
          0.15,
          0,
          Math.PI * 2,
        ),
        e.fill(),
        e.beginPath(),
        e.moveTo(M + 3 * o, $ - 2.5 * o),
        e.lineTo(M + 8.5 * o, $ - 1 * o),
        e.lineTo(M + 8.5 * o, $ + 1.2 * o),
        e.lineTo(M + 4 * o, $ + 2.5 * o),
        e.closePath(),
        e.fill(),
        (e.fillStyle = l ? "#ffffff" : g),
        e.beginPath(),
        e.moveTo(M + 4 * o, $ + 1.5 * o),
        e.lineTo(M + 7.8 * o, $ + 1.2 * o),
        e.lineTo(M + 7 * o, $ + 2.5 * o),
        e.lineTo(M + 3.5 * o, $ + 2.8 * o),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#0f172a"),
        e.beginPath(),
        e.roundRect(M + 8 * o, $ - 1.5 * o, 1.6 * o, 1.8 * o, 0.4 * o),
        e.fill(),
        (e.fillStyle = "#ffffff"),
        e.beginPath(),
        e.moveTo(M + 6.8 * o, $ + 1.2 * o),
        e.lineTo(M + 7.4 * o, $ + 2.6 * o),
        e.lineTo(M + 7.9 * o, $ + 1.2 * o),
        e.closePath(),
        e.fill(),
        (e.fillStyle = c),
        e.beginPath(),
        e.moveTo(M - 0.5 * o, $ - 3.5 * o),
        e.lineTo(M + 0.5 * o, $ - 8.5 * o),
        e.lineTo(M + 2.8 * o, $ - 3.8 * o),
        e.closePath(),
        e.fill(),
        (e.fillStyle = m),
        e.beginPath(),
        e.moveTo(M + 1.2 * o, $ - 3.8 * o),
        e.lineTo(M + 2.8 * o, $ - 9.2 * o),
        e.lineTo(M + 5 * o, $ - 4 * o),
        e.closePath(),
        e.fill(),
        (e.fillStyle = l ? "#ffffff" : "#f43f5e"),
        e.beginPath(),
        e.moveTo(M + 2.1 * o, $ - 4.4 * o),
        e.lineTo(M + 3.1 * o, $ - 8.2 * o),
        e.lineTo(M + 4.2 * o, $ - 4.6 * o),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#0f172a"),
        e.beginPath(),
        e.ellipse(
          M + 4.2 * o,
          $ - 1.6 * o,
          1.8 * o,
          1.2 * o,
          0.1,
          0,
          Math.PI * 2,
        ),
        e.fill(),
        (e.fillStyle = l ? "#ef4444" : t.accentColor),
        e.beginPath(),
        e.arc(M + 4.4 * o, $ - 1.6 * o, 1.1 * o, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#0f172a"),
        e.beginPath(),
        e.ellipse(
          M + 4.6 * o,
          $ - 1.6 * o,
          0.45 * o,
          0.9 * o,
          0,
          0,
          Math.PI * 2,
        ),
        e.fill(),
        (e.fillStyle = "#ffffff"),
        e.beginPath(),
        e.arc(M + 4.2 * o, $ - 2 * o, 0.4 * o, 0, Math.PI * 2),
        e.fill(),
        !l && t.accentColor === "#38bdf8")
      ) {
        const z = (t.animTimer * 2.8) % Math.PI;
        ((e.fillStyle = "rgba(224, 242, 254, 0.35)"),
          e.beginPath(),
          e.arc(
            M + 10 * o + Math.cos(z) * 2 * o,
            $ - 0.5 * o - Math.sin(z) * 1.5 * o,
            (1.2 + z * 0.8) * o,
            0,
            Math.PI * 2,
          ),
          e.fill());
      }
      e.restore();
    },
    // Carcaca no chao (antigo ramo wolf de Ag)
    carcass: function (e, t, o, u) {
        const m = t.color,
          c = "#334155",
          f = "#e2e8f0";
        ((e.fillStyle = `rgba(15, 23, 42, ${0.4 * u})`),
          e.beginPath(),
          e.ellipse(2 * o, 4 * o, 14 * o, 5 * o, 0, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = m),
          (e.lineWidth = 3.2 * o),
          (e.lineCap = "round"),
          e.beginPath(),
          e.moveTo(-9 * o, 1 * o),
          e.quadraticCurveTo(-14 * o, 3 * o, -12 * o, 7 * o),
          e.stroke(),
          (e.fillStyle = c),
          e.fillRect(-6 * o, 2 * o, 2.5 * o, 4 * o),
          e.fillRect(3.5 * o, 2 * o, 2.5 * o, 4 * o),
          (e.fillStyle = "#0f172a"),
          e.fillRect(-6 * o, 5.5 * o, 2.5 * o, 0.8 * o),
          e.fillRect(3.5 * o, 5.5 * o, 2.5 * o, 0.8 * o),
          (e.fillStyle = m),
          e.beginPath(),
          e.ellipse(0, 0, 11 * o, 5.5 * o, 0.05, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = f),
          e.beginPath(),
          e.ellipse(2 * o, 1.5 * o, 7 * o, 2.8 * o, 0.05, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = m),
          e.beginPath(),
          e.ellipse(8 * o, 1 * o, 5.5 * o, 4 * o, 0.12, 0, Math.PI * 2),
          e.fill(),
          e.beginPath(),
          e.moveTo(9 * o, -0.5 * o),
          e.lineTo(14 * o, 1.5 * o),
          e.lineTo(13.5 * o, 3.8 * o),
          e.lineTo(8 * o, 3.8 * o),
          e.closePath(),
          e.fill(),
          (e.fillStyle = "#0f172a"),
          e.fillRect(13.2 * o, 1 * o, 1.4 * o, 1.6 * o),
          (e.fillStyle = "#ffffff"),
          e.beginPath(),
          e.moveTo(11.8 * o, 3.6 * o),
          e.lineTo(12.4 * o, 4.6 * o),
          e.lineTo(12.8 * o, 3.6 * o),
          e.closePath(),
          e.fill(),
          (e.fillStyle = m),
          e.beginPath(),
          e.moveTo(6 * o, -2 * o),
          e.lineTo(8.5 * o, -5 * o),
          e.lineTo(10.5 * o, -1 * o),
          e.closePath(),
          e.fill(),
          (e.fillStyle = "#f43f5e"),
          e.beginPath(),
          e.moveTo(7 * o, -2 * o),
          e.lineTo(8.5 * o, -4.2 * o),
          e.lineTo(9.8 * o, -1.2 * o),
          e.closePath(),
          e.fill(),
          (e.strokeStyle = `rgba(15, 23, 42, ${u})`),
          (e.lineWidth = 1.4 * o),
          e.beginPath(),
          e.moveTo(8.2 * o, -0.5 * o),
          e.lineTo(10.2 * o, 1.5 * o),
          e.moveTo(10.2 * o, -0.5 * o),
          e.lineTo(8.2 * o, 1.5 * o),
          e.stroke());
    },
    // Icone (antigo db)
    icon: function (e, t, l) {
    const o = l.color || "#475569",
      u = "#334155",
      m = "#e2e8f0",
      c = "#cbd5e1";
    ((e.fillStyle = "rgba(15, 23, 42, 0.35)"),
      e.beginPath(),
      e.ellipse(0, 4.5 * t, 10 * t, 3.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = o),
      (e.lineWidth = 3.2 * t),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(-5 * t, 0),
      e.quadraticCurveTo(-9 * t, -4 * t, -7.5 * t, -7 * t),
      e.stroke(),
      (e.strokeStyle = c),
      (e.lineWidth = 2 * t),
      e.beginPath(),
      e.moveTo(-8.5 * t, -5 * t),
      e.lineTo(-7.5 * t, -7 * t),
      e.stroke(),
      (e.fillStyle = u),
      e.fillRect(-3.5 * t, 1 * t, 2 * t, 4 * t),
      e.fillRect(4 * t, 1 * t, 2 * t, 4 * t),
      (e.fillStyle = o),
      e.fillRect(-5 * t, 1 * t, 2.2 * t, 4.5 * t),
      e.fillRect(2.2 * t, 1 * t, 2.2 * t, 4.5 * t),
      (e.fillStyle = "#0f172a"),
      e.fillRect(-5 * t, 5 * t, 2.2 * t, 0.8 * t),
      e.fillRect(2.2 * t, 5 * t, 2.2 * t, 0.8 * t),
      (e.fillStyle = o),
      e.beginPath(),
      e.moveTo(-5.5 * t, -1 * t),
      e.quadraticCurveTo(-1 * t, -3.8 * t, 3.5 * t, -3 * t),
      e.quadraticCurveTo(5 * t, 0, 2.5 * t, 2 * t),
      e.quadraticCurveTo(-1 * t, 1 * t, -5 * t, 1.5 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = m),
      e.beginPath(),
      e.ellipse(1 * t, 0.5 * t, 3.5 * t, 1.8 * t, 0.1, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = c),
      e.beginPath(),
      e.moveTo(3 * t, -2.5 * t),
      e.lineTo(5.5 * t, -0.5 * t),
      e.lineTo(4 * t, 0.8 * t),
      e.lineTo(5.8 * t, 1.8 * t),
      e.lineTo(3.2 * t, 2.2 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = o),
      e.beginPath(),
      e.ellipse(4.5 * t, -2.5 * t, 3.8 * t, 3.2 * t, 0.2, 0, Math.PI * 2),
      e.fill(),
      e.beginPath(),
      e.moveTo(4 * t, -3 * t),
      e.lineTo(8.5 * t, -1.8 * t),
      e.lineTo(8 * t, 0.6 * t),
      e.lineTo(4 * t, 0.5 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = m),
      e.beginPath(),
      e.moveTo(4.5 * t, 0),
      e.lineTo(7.5 * t, 0.2 * t),
      e.lineTo(7 * t, 1.1 * t),
      e.lineTo(4.5 * t, 1 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.roundRect(8 * t, -2.2 * t, 1.4 * t, 1.6 * t, 0.3 * t),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.moveTo(6.8 * t, 0.2 * t),
      e.lineTo(7.3 * t, 1.4 * t),
      e.lineTo(7.7 * t, 0.2 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = u),
      e.beginPath(),
      e.moveTo(2 * t, -4.5 * t),
      e.lineTo(2.5 * t, -8.5 * t),
      e.lineTo(4.2 * t, -4.5 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = o),
      e.beginPath(),
      e.moveTo(3.2 * t, -4.5 * t),
      e.lineTo(4.2 * t, -8.8 * t),
      e.lineTo(5.8 * t, -4.5 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#f43f5e"),
      e.beginPath(),
      e.moveTo(3.8 * t, -5 * t),
      e.lineTo(4.3 * t, -7.8 * t),
      e.lineTo(5.2 * t, -5 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.ellipse(4.8 * t, -3.2 * t, 1.4 * t, 1.1 * t, 0.1, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#fbbf24"),
      e.beginPath(),
      e.arc(5 * t, -3.2 * t, 1 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.ellipse(5.2 * t, -3.2 * t, 0.4 * t, 0.8 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(4.8 * t, -3.5 * t, 0.35 * t, 0, Math.PI * 2),
      e.fill());
  
    },
  },
};

// ==========================================
// LÓGICA DE COMBATE DINÂMICO DO LOBO (3 ATAQUES)
// ==========================================
CREATURES.wolf.onAttackPlayer = function (manager, wolf, player, playerDef) {
  if (player.isDead || (player.invulnerableTimer && player.invulnerableTimer > 0)) return;
  const det = manager.getAnimalFireDeterrence(wolf, player);
  if (!det.canAttack) return;

  // Alterna dinamicamente entre os 3 ataques:
  // 1 = arm_hold (morde braço e abraça o player)
  // 2 = leg_pull (morde perna e puxa para trás)
  // 3 = quick_bite_retreat (morde, solta e afasta para avançar novamente)
  wolf.wolfAttackCombo = ((wolf.wolfAttackCombo || 0) % 3) + 1;
  const attackChoice = wolf.wolfAttackCombo;

  if (attackChoice === 1) {
    // 1. Lobo morde braço e segura (abraça o player)
    wolf.wolfAttackState = "arm_hold";
    wolf.wolfAttackDuration = 1.35;
    wolf.wolfAttackTimer = wolf.wolfAttackDuration;
    wolf.wolfDamageTick = 0.45;
    wolf.attackCooldown = 1.6;

    const side = wolf.x < player.x ? -1 : 1;
    wolf.facing = side < 0 ? "right" : "left";
    wolf.x = player.x + side * 10 * (wolf.scale || 1);
    wolf.y = player.y - 2 * (wolf.scale || 1);
    wolf.vx = 0;
    wolf.vy = 0;

    manager.applyMonsterHitToPlayer(wolf, player, playerDef, false, wolf.x, wolf.y - 12);
  } else if (attackChoice === 2) {
    // 2. Lobo morde perna e puxa para trás
    wolf.wolfAttackState = "leg_pull";
    wolf.wolfAttackDuration = 1.25;
    wolf.wolfAttackTimer = wolf.wolfAttackDuration;
    wolf.wolfDamageTick = 0.6;
    wolf.attackCooldown = 1.6;

    const side = wolf.x < player.x ? -1 : 1;
    wolf.facing = side < 0 ? "right" : "left";
    wolf.x = player.x + side * 16 * (wolf.scale || 1);
    wolf.y = player.y + 4 * (wolf.scale || 1);
    wolf.vx = 0;
    wolf.vy = 0;

    manager.applyMonsterHitToPlayer(wolf, player, playerDef, false, wolf.x, wolf.y);
    manager.spawnGroundDust(wolf.x, wolf.y + 4, 0.65);
  } else {
    // 3. Morde e solta e afasta para avançar novamente
    wolf.wolfAttackState = "quick_bite";
    wolf.wolfAttackDuration = 0.25;
    wolf.wolfAttackTimer = wolf.wolfAttackDuration;
    wolf.attackCooldown = 1.5;

    const ang = Math.atan2(player.y - wolf.y, player.x - wolf.x);
    wolf.vx = Math.cos(ang) * (wolf.speed * 2.2);
    wolf.vy = Math.sin(ang) * (wolf.speed * 2.2);
    wolf.facing = manager.getMonsterFacing(wolf.vx, wolf.vy, wolf.facing);

    manager.applyMonsterHitToPlayer(wolf, player, playerDef, false, player.x, player.y);
  }
};

CREATURES.wolf.updateAttack = function (manager, wolf, player, dt, playerDef) {
  if (!wolf.wolfAttackState) return false;

  // Se o lobo ou player estiverem mortos, encerra o ataque
  if (wolf.hp <= 0 || player.isDead) {
    wolf.wolfAttackState = null;
    return false;
  }

  // Fogo e tocha intimidam o lobo
  const det = manager.getAnimalFireDeterrence(wolf, player);
  if (det.isDeterred) {
    wolf.wolfAttackState = null;
    wolf.attackCooldown = 2.5;
    return false;
  }

  wolf.wolfAttackTimer = Math.max(0, (wolf.wolfAttackTimer || 0) - dt);

  // 1. Morde braço e abraça o player
  if (wolf.wolfAttackState === "arm_hold") {
    const side = wolf.facing === "left" ? 10 : -10;
    wolf.x = player.x + side * (wolf.scale || 1);
    wolf.y = player.y - 2 * (wolf.scale || 1);
    wolf.vx = 0;
    wolf.vy = 0;

    // Reduz movimentação do jogador pelo peso do lobo agarrado
    if (player.isMoving) {
      player.x += (Math.random() - 0.5) * 4 * dt;
      player.y += (Math.random() - 0.5) * 4 * dt;
    }

    // Dentadas periódicas enquanto segura
    wolf.wolfDamageTick = (wolf.wolfDamageTick || 0) - dt;
    if (wolf.wolfDamageTick <= 0) {
      wolf.wolfDamageTick = 0.5;
      manager.applyMonsterHitToPlayer(wolf, player, playerDef, false, wolf.x, wolf.y - 12);
    }

    if (wolf.wolfAttackTimer <= 0) {
      wolf.wolfAttackState = null;
      wolf.attackCooldown = 1.0;
      const jumpAng = Math.atan2(wolf.y - player.y, wolf.x - player.x) || (wolf.facing === "right" ? Math.PI : 0);
      wolf.vx = Math.cos(jumpAng) * (wolf.speed * 1.5);
      wolf.vy = Math.sin(jumpAng) * (wolf.speed * 1.5);
    }
    return true;
  }

  // 2. Morde a perna e puxa o player para trás
  if (wolf.wolfAttackState === "leg_pull") {
    const pullDirX = wolf.x - player.x;
    const pullDirY = wolf.y - player.y;
    const pullDist = Math.hypot(pullDirX, pullDirY) || 1;
    const ndx = pullDirX / pullDist;
    const ndy = pullDirY / pullDist;

    // Puxa o jogador fisicamente para trás
    const pullSpeed = 44;
    player.x += ndx * pullSpeed * dt;
    player.y += ndy * pullSpeed * dt;

    // Mantém o lobo travado na perna recuando e puxando
    wolf.x = player.x + ndx * 16 * (wolf.scale || 1);
    wolf.y = player.y + ndy * 16 * (wolf.scale || 1);
    wolf.facing = ndx < 0 ? "right" : "left";

    // Poeira das patas cravadas no chão
    if (Math.random() < dt * 8) {
      manager.spawnGroundDust(wolf.x, wolf.y + 4, 0.45);
      manager.spawnGroundDust(player.x, player.y + 6, 0.35);
    }

    // Mordida secundária durante o puxão
    wolf.wolfDamageTick = (wolf.wolfDamageTick || 0) - dt;
    if (wolf.wolfDamageTick <= 0) {
      wolf.wolfDamageTick = 0.6;
      manager.applyMonsterHitToPlayer(wolf, player, playerDef, false, player.x, player.y + 8);
    }

    if (wolf.wolfAttackTimer <= 0) {
      wolf.wolfAttackState = null;
      wolf.attackCooldown = 0.95;
    }
    return true;
  }

  // 3. Morde e solta
  if (wolf.wolfAttackState === "quick_bite") {
    if (wolf.wolfAttackTimer <= 0) {
      // Afasta rapidamente para trás
      wolf.wolfAttackState = "quick_retreat";
      wolf.wolfAttackDuration = 0.45;
      wolf.wolfAttackTimer = wolf.wolfAttackDuration;
      const retreatAng = Math.atan2(wolf.y - player.y, wolf.x - player.x) || Math.random() * Math.PI * 2;
      wolf.retreatVx = Math.cos(retreatAng) * (wolf.speed * 2.8);
      wolf.retreatVy = Math.sin(retreatAng) * (wolf.speed * 2.8);
    }
    return true;
  }

  // 3b. Afasta-se rapidamente
  if (wolf.wolfAttackState === "quick_retreat") {
    wolf.vx = wolf.retreatVx || 0;
    wolf.vy = wolf.retreatVy || 0;
    wolf.x += wolf.vx * dt * 55;
    wolf.y += wolf.vy * dt * 55;

    // Mantém o olhar fixo no jogador enquanto recua
    wolf.facing = manager.getMonsterFacingToTarget(wolf.x, wolf.y, player.x, player.y, wolf.facing);

    if (Math.random() < dt * 6) {
      manager.spawnGroundDust(wolf.x, wolf.y + 3, 0.3);
    }

    if (wolf.wolfAttackTimer <= 0) {
      // Avança novamente!
      wolf.wolfAttackState = "advance_again";
      wolf.wolfAttackDuration = 0.5;
      wolf.wolfAttackTimer = wolf.wolfAttackDuration;
    }
    return true;
  }

  // 3c. Avança novamente com bote
  if (wolf.wolfAttackState === "advance_again") {
    const advanceAng = Math.atan2(player.y - wolf.y, player.x - wolf.x);
    const advSpeed = wolf.speed * 2.3;
    wolf.vx = Math.cos(advanceAng) * advSpeed;
    wolf.vy = Math.sin(advanceAng) * advSpeed;
    wolf.facing = manager.getMonsterFacing(wolf.vx, wolf.vy, wolf.facing);
    wolf.x += wolf.vx * dt * 50;
    wolf.y += wolf.vy * dt * 50;

    const distToPlayer = Math.hypot(player.x - wolf.x, player.y - wolf.y);
    if (distToPlayer <= 26) {
      manager.applyMonsterHitToPlayer(wolf, player, playerDef, false, player.x, player.y);
      wolf.wolfAttackState = null;
      wolf.attackCooldown = 0.9;
    } else if (wolf.wolfAttackTimer <= 0) {
      wolf.wolfAttackState = null;
      wolf.attackCooldown = 0.8;
    }
    return true;
  }

  return false;
};
