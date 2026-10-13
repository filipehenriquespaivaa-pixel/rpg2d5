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
      // 1. LOBO ABRAÇA O PERSONAGEM E MIRA A BOCA NO PESCOÇO DO PLAYER
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

        // Tronco empinado verticalmente abraçando o jogador
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-7 * o, 0 * o);
        e.quadraticCurveTo(-6 * o, -8 * o, -1 * o, -16 * o);
        e.lineTo(4 * o, -16 * o);
        e.quadraticCurveTo(7 * o, -8 * o, 1 * o, 3 * o);
        e.lineTo(-4 * o, 3 * o);
        e.closePath();
        e.fill();

        if (!l) {
          e.fillStyle = g;
          e.beginPath();
          e.moveTo(-1 * o, -15 * o);
          e.quadraticCurveTo(5 * o, -11 * o, 4 * o, -3 * o);
          e.quadraticCurveTo(0 * o, -4 * o, -2 * o, -8 * o);
          e.closePath();
          e.fill();
        }

        // Patas dianteiras estendidas para frente ABRAÇANDO o player (faz o abraço)
        // Pata dianteira inferior (envolve a cintura/tronco do jogador)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(1 * o, -5 * o);
        e.lineTo(8 * o, -4 * o);
        e.lineTo(10.2 * o, -1.8 * o);
        e.lineTo(8.2 * o, -0.8 * o);
        e.lineTo(0.5 * o, -3 * o);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(8.5 * o, -2.5 * o, 2.5 * o, 1.4 * o);

        // Pata dianteira superior (envolve o ombro/peito do jogador abraçando firme)
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(1 * o, -12 * o);
        e.lineTo(8.5 * o, -11 * o);
        e.lineTo(10.5 * o, -8.5 * o);
        e.lineTo(8.5 * o, -7.0 * o);
        e.lineTo(0.5 * o, -9.5 * o);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(8.8 * o, -9.0 * o, 2.4 * o, 1.4 * o);

        // Cabeça e boca miradas diretamente no pescoço do player (pescoço do player fica em Y ~ -16.2 * o, X ~ 9.5-10 * o)
        const neckTargetX = 9.8 * o;
        const neckTargetY = -16.2 * o;
        const headBaseX = 3.8 * o + thrash;
        const headBaseY = -15.4 * o + gnaw;

        // Pescoço do lobo esticado para cima e para frente conectando ao pescoço do jogador
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(0 * o, -13 * o);
        e.lineTo(headBaseX - 0.5 * o, headBaseY - 1.5 * o);
        e.lineTo(headBaseX + 3.2 * o, headBaseY + 2.5 * o);
        e.lineTo(2.5 * o, -10 * o);
        e.closePath();
        e.fill();

        // Crânio do lobo elevado em direção à garganta
        e.beginPath();
        e.ellipse(headBaseX + 0.8 * o, headBaseY - 1.0 * o, 4.4 * o, 3.8 * o, 0.15, 0, Math.PI * 2);
        e.fill();

        // Focinho e Mandíbula Superior apontados diretamente para o pescoço do jogador (morde por cima do pescoço)
        e.beginPath();
        e.moveTo(headBaseX + 1.5 * o, headBaseY - 2.5 * o);
        e.lineTo(neckTargetX + 0.8 * o, neckTargetY - 1.4 * o);
        e.lineTo(neckTargetX + 0.3 * o, neckTargetY - 0.2 * o);
        e.lineTo(headBaseX + 2.4 * o, headBaseY + 0.8 * o);
        e.closePath();
        e.fill();

        // Nariz na ponta do focinho encostado no pescoço
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.roundRect(neckTargetX - 0.2 * o, neckTargetY - 2.2 * o, 1.7 * o, 1.6 * o, 0.35 * o);
        e.fill();

        // Mandíbula Inferior aberta cravando por baixo no pescoço do jogador
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headBaseX + 1.8 * o, headBaseY + 1.4 * o);
        e.lineTo(neckTargetX - 0.2 * o, neckTargetY + 0.5 * o);
        e.lineTo(neckTargetX - 0.6 * o, neckTargetY + 2.0 * o);
        e.lineTo(headBaseX + 1.2 * o, headBaseY + 3.0 * o);
        e.closePath();
        e.fill();

        // Presas / Dentes afiados cravados diretamente no pescoço do player
        e.fillStyle = "#ffffff";
        // Presas superiores mordendo de cima para baixo no pescoço
        e.beginPath();
        e.moveTo(neckTargetX - 1.2 * o, neckTargetY - 0.5 * o);
        e.lineTo(neckTargetX - 0.6 * o, neckTargetY + 1.1 * o);
        e.lineTo(neckTargetX + 0.0 * o, neckTargetY - 0.5 * o);
        e.closePath();
        e.fill();
        // Presas inferiores cravando de baixo para cima no pescoço
        e.beginPath();
        e.moveTo(neckTargetX - 2.0 * o, neckTargetY + 1.0 * o);
        e.lineTo(neckTargetX - 1.4 * o, neckTargetY - 0.6 * o);
        e.lineTo(neckTargetX - 0.8 * o, neckTargetY + 1.0 * o);
        e.closePath();
        e.fill();

        // Gotas de sangue no ponto exato da mordida no pescoço
        if (!l) {
          e.fillStyle = "#ef4444";
          e.beginPath();
          e.arc(neckTargetX - 0.6 * o, neckTargetY + 0.3 * o, 1.2 * o, 0, Math.PI * 2);
          e.arc(neckTargetX + 0.2 * o, neckTargetY + 1.6 * o, 0.8 * o, 0, Math.PI * 2);
          e.arc(neckTargetX - 1.5 * o, neckTargetY + 1.2 * o, 0.7 * o, 0, Math.PI * 2);
          e.fill();
        }

        // Orelhas para trás em fúria predatória
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headBaseX - 2 * o, headBaseY - 2.2 * o);
        e.lineTo(headBaseX - 6.2 * o, headBaseY - 5.5 * o);
        e.lineTo(headBaseX - 1 * o, headBaseY - 4.2 * o);
        e.closePath();
        e.fill();
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(headBaseX - 1 * o, headBaseY - 3.2 * o);
        e.lineTo(headBaseX - 5.2 * o, headBaseY - 6.8 * o);
        e.lineTo(headBaseX + 1 * o, headBaseY - 4.2 * o);
        e.closePath();
        e.fill();

        // Olhos brilhando agressivos mirando o pescoço
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headBaseX + 3.4 * o, headBaseY - 1.6 * o, 1.8 * o, 1.2 * o, 0.15, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = l ? "#ef4444" : t.accentColor;
        e.beginPath();
        e.arc(headBaseX + 3.6 * o, headBaseY - 1.6 * o, 1.2 * o, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headBaseX + 3.8 * o, headBaseY - 1.6 * o, 0.45 * o, 0.9 * o, 0, 0, Math.PI * 2);
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
        // Bote frontal rápido cravando mordida com as 4 patas e anatomia completa do lobo
        e.save();
        const u = t.facing === "left" ? -1 : 1;
        e.scale(u, 1);
        const m = l ? "#ffffff" : t.color,
          c = l ? "#e2e8f0" : "#475569",
          f = l ? "#ffffff" : "#cbd5e1",
          g = l ? "#ffffff" : "#e2e8f0";

        const lungeProg = 1 - (t.wolfAttackTimer || 0) / (t.wolfAttackDuration || 0.35);
        const lungeHop = Math.sin(lungeProg * Math.PI) * 2.8 * o;
        const snap = Math.sin(lungeProg * Math.PI);

        // 1. Pata traseira de trás (sombreada, apoiando o impulso do salto)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(-6 * o, -6 * o - lungeHop);
        e.lineTo(-10 * o, 0 * o - lungeHop * 0.4);
        e.lineTo(-9 * o, 2 * o);
        e.lineTo(-6 * o, 2 * o);
        e.lineTo(-4 * o, -6 * o - lungeHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-9 * o, 1.5 * o, 3.2 * o, 0.9 * o);

        // 2. Pata dianteira de trás (sombreada, esticada no salto)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(5 * o, -7 * o - lungeHop);
        e.lineTo(7 * o, -1 * o - lungeHop * 0.4);
        e.lineTo(8 * o, 2 * o);
        e.lineTo(5 * o, 2 * o);
        e.lineTo(3 * o, -7 * o - lungeHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(5 * o, 1.5 * o, 3.2 * o, 0.9 * o);

        // 3. Rabo peludo clássico de lobo esticado com ponta clara
        e.strokeStyle = m;
        e.lineWidth = 3.6 * o;
        e.lineCap = "round";
        e.beginPath();
        e.moveTo(-9 * o, -8 * o - lungeHop);
        e.quadraticCurveTo(-14 * o, -12 * o - lungeHop, -14 * o, -5 * o - lungeHop);
        e.stroke();
        e.strokeStyle = f;
        e.lineWidth = 2.2 * o;
        e.beginPath();
        e.moveTo(-14 * o, -8 * o - lungeHop);
        e.lineTo(-13.5 * o, -5 * o - lungeHop);
        e.stroke();

        // 4. Tronco ágil e musculoso no bote
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-9 * o, -10 * o - lungeHop);
        e.quadraticCurveTo(-2 * o, -13 * o - lungeHop, 4 * o, -12 * o - lungeHop);
        e.lineTo(7 * o, -10 * o - lungeHop);
        e.quadraticCurveTo(8 * o, -4 * o - lungeHop, 4 * o, -2 * o - lungeHop);
        e.quadraticCurveTo(-3 * o, -4 * o - lungeHop, -8 * o, -6 * o - lungeHop);
        e.closePath();
        e.fill();

        // 5. Barriga clara e juba do peito tradicional de lobo
        if (!l) {
          e.fillStyle = g;
          e.beginPath();
          e.moveTo(2 * o, -9 * o - lungeHop);
          e.quadraticCurveTo(7 * o, -5 * o - lungeHop, 5 * o, -2 * o - lungeHop);
          e.quadraticCurveTo(1 * o, -3 * o - lungeHop, -2 * o, -5 * o - lungeHop);
          e.closePath();
          e.fill();

          // Pelagem pontiaguda no peito
          e.fillStyle = f;
          e.beginPath();
          e.moveTo(6 * o, -9 * o - lungeHop);
          e.lineTo(9.2 * o, -6 * o - lungeHop);
          e.lineTo(7.2 * o, -4 * o - lungeHop);
          e.lineTo(9.8 * o, -2 * o - lungeHop);
          e.lineTo(6.2 * o, -1 * o - lungeHop);
          e.closePath();
          e.fill();
        }

        // 6. Pata traseira da frente (primeiro plano, musculosa)
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-5 * o, -10 * o - lungeHop);
        e.quadraticCurveTo(-9 * o, -5 * o - lungeHop, -8 * o, 0 * o - lungeHop * 0.4);
        e.lineTo(-7 * o, 3 * o);
        e.lineTo(-4 * o, 3 * o);
        e.lineTo(-4.5 * o, 0 * o - lungeHop * 0.4);
        e.quadraticCurveTo(-3 * o, -6 * o - lungeHop, -3 * o, -8 * o - lungeHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-7 * o, 2.5 * o, 3.2 * o, 0.9 * o);

        // 7. Pata dianteira da frente (estendida para frente)
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(4 * o, -10 * o - lungeHop);
        e.lineTo(8 * o, 0 * o - lungeHop * 0.4);
        e.lineTo(8.5 * o, 3 * o);
        e.lineTo(5.5 * o, 3 * o);
        e.lineTo(5 * o, 0 * o - lungeHop * 0.4);
        e.lineTo(1.5 * o, -8 * o - lungeHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(5.5 * o, 2.5 * o, 3.2 * o, 0.9 * o);

        // 8. Cabeça e focinho projetados para a dentada rápida
        const headX = (7 + snap * 3.5) * o;
        const headY = (-12 - lungeHop) * o;

        // Pescoço ligando tronco à cabeça
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(3 * o, -12 * o - lungeHop);
        e.lineTo(headX + 2 * o, headY - 4 * o);
        e.lineTo(headX + 5 * o, headY);
        e.lineTo(5 * o, -7 * o - lungeHop);
        e.closePath();
        e.fill();

        // Crânio proporcional do lobo
        e.beginPath();
        e.ellipse(headX + 1.5 * o, headY - 1 * o, 4.2 * o, 3.8 * o, 0.15, 0, Math.PI * 2);
        e.fill();

        // Orelhas empinadas de lobo em ataque (com interior rosado)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headX - 0.5 * o, headY - 3.5 * o);
        e.lineTo(headX + 0.5 * o, headY - 8.5 * o);
        e.lineTo(headX + 2.8 * o, headY - 3.8 * o);
        e.closePath();
        e.fill();
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(headX + 1.2 * o, headY - 3.8 * o);
        e.lineTo(headX + 2.8 * o, headY - 9.2 * o);
        e.lineTo(headX + 5 * o, headY - 4 * o);
        e.closePath();
        e.fill();
        e.fillStyle = l ? "#ffffff" : "#f43f5e";
        e.beginPath();
        e.moveTo(headX + 2.1 * o, headY - 4.4 * o);
        e.lineTo(headX + 3.1 * o, headY - 8.2 * o);
        e.lineTo(headX + 4.2 * o, headY - 4.6 * o);
        e.closePath();
        e.fill();

        // Boca abrindo e estalando em mordida
        const mouthGap = (1 - snap) * 2.8 * o;
        // Mandíbula superior
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(headX + 3 * o, headY - 2.5 * o);
        e.lineTo(headX + 8.5 * o, headY - 1 * o - mouthGap * 0.3);
        e.lineTo(headX + 8.5 * o, headY + 1.2 * o - mouthGap * 0.3);
        e.lineTo(headX + 4 * o, headY + 2.5 * o);
        e.closePath();
        e.fill();

        // Nariz preto de lobo
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.roundRect(headX + 8 * o, headY - 1.5 * o - mouthGap * 0.3, 1.6 * o, 1.8 * o, 0.4 * o);
        e.fill();

        // Mandíbula inferior com queixo claro
        e.fillStyle = l ? "#ffffff" : g;
        e.beginPath();
        e.moveTo(headX + 4 * o, headY + 1.5 * o);
        e.lineTo(headX + 7.8 * o, headY + 1.2 * o + mouthGap * 0.7);
        e.lineTo(headX + 7 * o, headY + 2.5 * o + mouthGap * 0.7);
        e.lineTo(headX + 3.5 * o, headY + 2.8 * o);
        e.closePath();
        e.fill();

        // Presas superiores e inferiores
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.moveTo(headX + 6.8 * o, headY + 1.2 * o - mouthGap * 0.3);
        e.lineTo(headX + 7.4 * o, headY + 2.7 * o);
        e.lineTo(headX + 7.9 * o, headY + 1.2 * o - mouthGap * 0.3);
        e.closePath();
        e.fill();
        e.beginPath();
        e.moveTo(headX + 6.0 * o, headY + 1.5 * o + mouthGap * 0.7);
        e.lineTo(headX + 6.6 * o, headY + 0.3 * o);
        e.lineTo(headX + 7.2 * o, headY + 1.5 * o + mouthGap * 0.7);
        e.closePath();
        e.fill();

        // Olho predador idêntico ao lobo autêntico
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headX + 4.2 * o, headY - 1.6 * o, 1.8 * o, 1.2 * o, 0.1, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = l ? "#ef4444" : t.accentColor;
        e.beginPath();
        e.arc(headX + 4.4 * o, headY - 1.6 * o, 1.1 * o, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headX + 4.6 * o, headY - 1.6 * o, 0.45 * o, 0.9 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.arc(headX + 4.2 * o, headY - 2 * o, 0.4 * o, 0, Math.PI * 2);
        e.fill();

        if (!l && t.accentColor === "#38bdf8") {
          const z = (t.animTimer * 2.8) % Math.PI;
          e.fillStyle = "rgba(224, 242, 254, 0.35)";
          e.beginPath();
          e.arc(headX + 10 * o + Math.cos(z) * 2 * o, headY - 0.5 * o - Math.sin(z) * 1.5 * o, (1.2 + z * 0.8) * o, 0, Math.PI * 2);
          e.fill();
        }

        e.restore();
        return;
      }

      if (t.wolfAttackState === "quick_retreat") {
        // Solta e afasta em postura defensiva alerta, olhando fixamente para o jogador com as 4 patas autênticas
        e.save();
        const u = t.facing === "left" ? -1 : 1;
        e.scale(u, 1);
        const m = l ? "#ffffff" : t.color,
          c = l ? "#e2e8f0" : "#475569",
          f = l ? "#ffffff" : "#cbd5e1",
          g = l ? "#ffffff" : "#e2e8f0";

        const lowStance = 1.6 * o;

        // 1. Pata traseira de trás (sombreada, amortecendo o recuo)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(-6 * o, -6 * o + lowStance);
        e.lineTo(-9 * o, -1 * o + lowStance);
        e.lineTo(-8 * o, 2 * o);
        e.lineTo(-5 * o, 2 * o);
        e.lineTo(-4 * o, -6 * o + lowStance);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-8 * o, 1.5 * o, 3.2 * o, 0.9 * o);

        // 2. Pata dianteira de trás (sombreada, apoiada no solo)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(5 * o, -7 * o + lowStance);
        e.lineTo(4 * o, -1 * o + lowStance);
        e.lineTo(5 * o, 2 * o);
        e.lineTo(2 * o, 2 * o);
        e.lineTo(3 * o, -7 * o + lowStance);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(2 * o, 1.5 * o, 3.2 * o, 0.9 * o);

        // 3. Rabo de lobo tenso acompanhando o recuo
        e.strokeStyle = m;
        e.lineWidth = 3.6 * o;
        e.lineCap = "round";
        e.beginPath();
        e.moveTo(-9 * o, -8 * o + lowStance);
        e.quadraticCurveTo(-14 * o, -9 * o + lowStance, -13 * o, -2 * o + lowStance);
        e.stroke();
        e.strokeStyle = f;
        e.lineWidth = 2.2 * o;
        e.beginPath();
        e.moveTo(-14 * o, -5 * o + lowStance);
        e.lineTo(-13 * o, -2 * o + lowStance);
        e.stroke();

        // 4. Corpo abaixado e recuando firme com anatomia correta
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-9 * o, -10 * o + lowStance);
        e.quadraticCurveTo(-2 * o, -13 * o + lowStance, 4 * o, -12 * o + lowStance);
        e.lineTo(7 * o, -10 * o + lowStance);
        e.quadraticCurveTo(8 * o, -4 * o + lowStance, 4 * o, -2 * o + lowStance);
        e.quadraticCurveTo(-3 * o, -4 * o + lowStance, -8 * o, -6 * o + lowStance);
        e.closePath();
        e.fill();

        // 5. Pelagem ventral clara e juba do peito eriçada em alerta
        if (!l) {
          e.fillStyle = g;
          e.beginPath();
          e.moveTo(2 * o, -9 * o + lowStance);
          e.quadraticCurveTo(7 * o, -5 * o + lowStance, 5 * o, -2 * o + lowStance);
          e.quadraticCurveTo(1 * o, -3 * o + lowStance, -2 * o, -5 * o + lowStance);
          e.closePath();
          e.fill();

          e.fillStyle = f;
          e.beginPath();
          e.moveTo(6 * o, -9 * o + lowStance);
          e.lineTo(9.2 * o, -6 * o + lowStance);
          e.lineTo(7.2 * o, -4 * o + lowStance);
          e.lineTo(9.8 * o, -2 * o + lowStance);
          e.lineTo(6.2 * o, -1 * o + lowStance);
          e.closePath();
          e.fill();
        }

        // 6. Pata traseira da frente (primeiro plano, flexionada)
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-5 * o, -10 * o + lowStance);
        e.quadraticCurveTo(-9 * o, -5 * o + lowStance, -7 * o, 0 * o + lowStance);
        e.lineTo(-6 * o, 3 * o);
        e.lineTo(-3 * o, 3 * o);
        e.lineTo(-3.5 * o, 0 * o + lowStance);
        e.quadraticCurveTo(-3 * o, -6 * o + lowStance, -3 * o, -8 * o + lowStance);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-6 * o, 2.5 * o, 3.2 * o, 0.9 * o);

        // 7. Pata dianteira da frente (primeiro plano, fincada no chão derrapando)
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(4 * o, -10 * o + lowStance);
        e.lineTo(5 * o, 0 * o + lowStance);
        e.lineTo(5.5 * o, 3 * o);
        e.lineTo(2.5 * o, 3 * o);
        e.lineTo(2 * o, 0 * o + lowStance);
        e.lineTo(1.5 * o, -8 * o + lowStance);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(2.5 * o, 2.5 * o, 3.2 * o, 0.9 * o);

        // 8. Cabeça baixa com rosnado fixo no jogador
        const headX = 6.8 * o;
        const headY = -12 * o + lowStance;

        e.fillStyle = m;
        e.beginPath();
        e.moveTo(3 * o, -12 * o + lowStance);
        e.lineTo(headX + 2 * o, headY - 4 * o);
        e.lineTo(headX + 5 * o, headY);
        e.lineTo(5 * o, -7 * o + lowStance);
        e.closePath();
        e.fill();

        e.beginPath();
        e.ellipse(headX + 1.5 * o, headY - 1 * o, 4.2 * o, 3.8 * o, 0.15, 0, Math.PI * 2);
        e.fill();

        // Orelhas empinadas e agressivas voltadas para a ameaça (autênticas de lobo)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headX - 0.5 * o, headY - 3.5 * o);
        e.lineTo(headX + 0.2 * o, headY - 8.2 * o);
        e.lineTo(headX + 2.5 * o, headY - 3.8 * o);
        e.closePath();
        e.fill();
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(headX + 1.0 * o, headY - 3.8 * o);
        e.lineTo(headX + 2.2 * o, headY - 8.8 * o);
        e.lineTo(headX + 4.6 * o, headY - 4 * o);
        e.closePath();
        e.fill();
        e.fillStyle = l ? "#ffffff" : "#f43f5e";
        e.beginPath();
        e.moveTo(headX + 1.8 * o, headY - 4.4 * o);
        e.lineTo(headX + 2.5 * o, headY - 7.8 * o);
        e.lineTo(headX + 3.8 * o, headY - 4.6 * o);
        e.closePath();
        e.fill();

        // Focinho cerrado e rosnando com dentes aparentes
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(headX + 3 * o, headY - 2.5 * o);
        e.lineTo(headX + 8.5 * o, headY - 1 * o);
        e.lineTo(headX + 8.5 * o, headY + 1.2 * o);
        e.lineTo(headX + 4 * o, headY + 2.5 * o);
        e.closePath();
        e.fill();

        e.fillStyle = "#0f172a";
        e.beginPath();
        e.roundRect(headX + 8 * o, headY - 1.5 * o, 1.6 * o, 1.8 * o, 0.4 * o);
        e.fill();

        e.fillStyle = l ? "#ffffff" : g;
        e.beginPath();
        e.moveTo(headX + 4 * o, headY + 1.5 * o);
        e.lineTo(headX + 7.8 * o, headY + 1.2 * o);
        e.lineTo(headX + 7 * o, headY + 2.5 * o);
        e.lineTo(headX + 3.5 * o, headY + 2.8 * o);
        e.closePath();
        e.fill();

        // Presas afiadas à mostra no rosnado
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.moveTo(headX + 6.8 * o, headY + 1.2 * o);
        e.lineTo(headX + 7.4 * o, headY + 2.7 * o);
        e.lineTo(headX + 7.9 * o, headY + 1.2 * o);
        e.closePath();
        e.fill();

        // Olhos fulminantes e expressivos com brilho
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headX + 4.2 * o, headY - 1.6 * o, 1.8 * o, 1.2 * o, 0.1, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = l ? "#ef4444" : t.accentColor;
        e.beginPath();
        e.arc(headX + 4.4 * o, headY - 1.6 * o, 1.1 * o, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headX + 4.6 * o, headY - 1.6 * o, 0.45 * o, 0.9 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.arc(headX + 4.2 * o, headY - 2 * o, 0.4 * o, 0, Math.PI * 2);
        e.fill();

        if (!l && t.accentColor === "#38bdf8") {
          const z = (t.animTimer * 2.8) % Math.PI;
          e.fillStyle = "rgba(224, 242, 254, 0.35)";
          e.beginPath();
          e.arc(headX + 10 * o + Math.cos(z) * 2 * o, headY - 0.5 * o - Math.sin(z) * 1.5 * o, (1.2 + z * 0.8) * o, 0, Math.PI * 2);
          e.fill();
        }

        e.restore();
        return;
      }

      if (t.wolfAttackState === "advance_again") {
        // Avanço rápido com galope predatório, todas as 4 patas e anatomia autêntica
        e.save();
        const u = t.facing === "left" ? -1 : 1;
        e.scale(u, 1);
        const m = l ? "#ffffff" : t.color,
          c = l ? "#e2e8f0" : "#475569",
          f = l ? "#ffffff" : "#cbd5e1",
          g = l ? "#ffffff" : "#e2e8f0";

        const advProg = 1 - (t.wolfAttackTimer || 0) / (t.wolfAttackDuration || 0.45);
        const sprintHop = Math.sin(advProg * Math.PI * 2) * 1.8 * o;
        const legSwing = Math.sin(advProg * Math.PI * 2) * 3.5 * o;

        // 1. Pata traseira de trás (galope)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(-6 * o, -6 * o + sprintHop);
        e.lineTo(-8 * o - legSwing, -1 * o + sprintHop);
        e.lineTo(-7 * o - legSwing, 2 * o);
        e.lineTo(-4 * o - legSwing, 2 * o);
        e.lineTo(-4 * o, -6 * o + sprintHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-7 * o - legSwing, 1.5 * o, 3.2 * o, 0.9 * o);

        // 2. Pata dianteira de trás (galope)
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(5 * o, -7 * o + sprintHop);
        e.lineTo(6 * o + legSwing, -1 * o + sprintHop);
        e.lineTo(7 * o + legSwing, 2 * o);
        e.lineTo(4 * o + legSwing, 2 * o);
        e.lineTo(3 * o, -7 * o + sprintHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(4 * o + legSwing, 1.5 * o, 3.2 * o, 0.9 * o);

        // 3. Rabo empinado voando na corrida com ponta branca
        e.strokeStyle = m;
        e.lineWidth = 3.6 * o;
        e.lineCap = "round";
        e.beginPath();
        e.moveTo(-9 * o, -8 * o + sprintHop);
        e.quadraticCurveTo(-14 * o, -12 * o + sprintHop, -14 * o, -5 * o + sprintHop);
        e.stroke();
        e.strokeStyle = f;
        e.lineWidth = 2.2 * o;
        e.beginPath();
        e.moveTo(-14 * o, -8 * o + sprintHop);
        e.lineTo(-13.5 * o, -5 * o + sprintHop);
        e.stroke();

        // 4. Tronco em arrancada veloz
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-9 * o, -10 * o + sprintHop);
        e.quadraticCurveTo(-2 * o, -13 * o + sprintHop, 4 * o, -12 * o + sprintHop);
        e.lineTo(7 * o, -10 * o + sprintHop);
        e.quadraticCurveTo(8 * o, -4 * o + sprintHop, 4 * o, -2 * o + sprintHop);
        e.quadraticCurveTo(-3 * o, -4 * o + sprintHop, -8 * o, -6 * o + sprintHop);
        e.closePath();
        e.fill();

        // 5. Pelagem ventral e do peito
        if (!l) {
          e.fillStyle = g;
          e.beginPath();
          e.moveTo(2 * o, -9 * o + sprintHop);
          e.quadraticCurveTo(7 * o, -5 * o + sprintHop, 5 * o, -2 * o + sprintHop);
          e.quadraticCurveTo(1 * o, -3 * o + sprintHop, -2 * o, -5 * o + sprintHop);
          e.closePath();
          e.fill();

          e.fillStyle = f;
          e.beginPath();
          e.moveTo(6 * o, -9 * o + sprintHop);
          e.lineTo(9.2 * o, -6 * o + sprintHop);
          e.lineTo(7.2 * o, -4 * o + sprintHop);
          e.lineTo(9.8 * o, -2 * o + sprintHop);
          e.lineTo(6.2 * o, -1 * o + sprintHop);
          e.closePath();
          e.fill();
        }

        // 6. Pata traseira da frente (primeiro plano)
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(-5 * o, -10 * o + sprintHop);
        e.quadraticCurveTo(-9 * o, -5 * o + sprintHop, -7 * o - legSwing * 0.7, 0 * o + sprintHop);
        e.lineTo(-6 * o - legSwing * 0.7, 3 * o);
        e.lineTo(-3 * o - legSwing * 0.7, 3 * o);
        e.lineTo(-3.5 * o - legSwing * 0.7, 0 * o + sprintHop);
        e.quadraticCurveTo(-3 * o, -6 * o + sprintHop, -3 * o, -8 * o + sprintHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(-6 * o - legSwing * 0.7, 2.5 * o, 3.2 * o, 0.9 * o);

        // 7. Pata dianteira da frente (primeiro plano)
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(4 * o, -10 * o + sprintHop);
        e.lineTo(6 * o + legSwing * 0.7, 0 * o + sprintHop);
        e.lineTo(6.5 * o + legSwing * 0.7, 3 * o);
        e.lineTo(3.5 * o + legSwing * 0.7, 3 * o);
        e.lineTo(3 * o + legSwing * 0.7, 0 * o + sprintHop);
        e.lineTo(1.5 * o, -8 * o + sprintHop);
        e.closePath();
        e.fill();
        e.fillStyle = "#0f172a";
        e.fillRect(3.5 * o + legSwing * 0.7, 2.5 * o, 3.2 * o, 0.9 * o);

        // 8. Cabeça e focinho projetados para frente
        const headX = (7.5 + Math.sin(advProg * Math.PI) * 1.5) * o;
        const headY = -12 * o + sprintHop;

        e.fillStyle = m;
        e.beginPath();
        e.moveTo(3 * o, -12 * o + sprintHop);
        e.lineTo(headX + 2 * o, headY - 4 * o);
        e.lineTo(headX + 5 * o, headY);
        e.lineTo(5 * o, -7 * o + sprintHop);
        e.closePath();
        e.fill();

        e.beginPath();
        e.ellipse(headX + 1.5 * o, headY - 1 * o, 4.2 * o, 3.8 * o, 0.15, 0, Math.PI * 2);
        e.fill();

        // Orelhas de lobo alertas apontadas para frente
        e.fillStyle = c;
        e.beginPath();
        e.moveTo(headX - 0.5 * o, headY - 3.5 * o);
        e.lineTo(headX + 0.5 * o, headY - 8.5 * o);
        e.lineTo(headX + 2.8 * o, headY - 3.8 * o);
        e.closePath();
        e.fill();
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(headX + 1.2 * o, headY - 3.8 * o);
        e.lineTo(headX + 2.8 * o, headY - 9.2 * o);
        e.lineTo(headX + 5 * o, headY - 4 * o);
        e.closePath();
        e.fill();
        e.fillStyle = l ? "#ffffff" : "#f43f5e";
        e.beginPath();
        e.moveTo(headX + 2.1 * o, headY - 4.4 * o);
        e.lineTo(headX + 3.1 * o, headY - 8.2 * o);
        e.lineTo(headX + 4.2 * o, headY - 4.6 * o);
        e.closePath();
        e.fill();

        // Focinho com boca entreaberta
        e.fillStyle = m;
        e.beginPath();
        e.moveTo(headX + 3 * o, headY - 2.5 * o);
        e.lineTo(headX + 8.5 * o, headY - 1 * o);
        e.lineTo(headX + 8.5 * o, headY + 1.2 * o);
        e.lineTo(headX + 4 * o, headY + 2.5 * o);
        e.closePath();
        e.fill();

        e.fillStyle = "#0f172a";
        e.beginPath();
        e.roundRect(headX + 8 * o, headY - 1.5 * o, 1.6 * o, 1.8 * o, 0.4 * o);
        e.fill();

        e.fillStyle = l ? "#ffffff" : g;
        e.beginPath();
        e.moveTo(headX + 4 * o, headY + 1.5 * o);
        e.lineTo(headX + 7.8 * o, headY + 1.2 * o);
        e.lineTo(headX + 7 * o, headY + 2.5 * o);
        e.lineTo(headX + 3.5 * o, headY + 2.8 * o);
        e.closePath();
        e.fill();

        // Presas
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.moveTo(headX + 6.8 * o, headY + 1.2 * o);
        e.lineTo(headX + 7.4 * o, headY + 2.6 * o);
        e.lineTo(headX + 7.9 * o, headY + 1.2 * o);
        e.closePath();
        e.fill();

        // Olho
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headX + 4.2 * o, headY - 1.6 * o, 1.8 * o, 1.2 * o, 0.1, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = l ? "#ef4444" : t.accentColor;
        e.beginPath();
        e.arc(headX + 4.4 * o, headY - 1.6 * o, 1.1 * o, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#0f172a";
        e.beginPath();
        e.ellipse(headX + 4.6 * o, headY - 1.6 * o, 0.45 * o, 0.9 * o, 0, 0, Math.PI * 2);
        e.fill();
        e.fillStyle = "#ffffff";
        e.beginPath();
        e.arc(headX + 4.2 * o, headY - 2 * o, 0.4 * o, 0, Math.PI * 2);
        e.fill();

        if (!l && t.accentColor === "#38bdf8") {
          const z = (t.animTimer * 2.8) % Math.PI;
          e.fillStyle = "rgba(224, 242, 254, 0.35)";
          e.beginPath();
          e.arc(headX + 10 * o + Math.cos(z) * 2 * o, headY - 0.5 * o - Math.sin(z) * 1.5 * o, (1.2 + z * 0.8) * o, 0, Math.PI * 2);
          e.fill();
        }

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
// Partícula de poeira sutil (redução de 95% na quantidade e tamanho de poeira do lobo)
function spawnSubtleWolfDust(manager, x, y) {
  if (!manager || !manager.slimeParticles) return;
  manager.slimeParticles.push({
    x: x + (Math.random() - 0.5) * 4,
    y: y,
    vx: (Math.random() - 0.5) * 0.9,
    vy: -0.3 - Math.random() * 0.5,
    life: 0.25,
    maxLife: 0.25,
    type: "dust",
    color: "rgba(148, 163, 184, 0.28)",
    size: 1.0,
  });
}

CREATURES.wolf.onAttackPlayer = function (manager, wolf, player, playerDef) {
  if (player.isDead || (player.invulnerableTimer && player.invulnerableTimer > 0)) return;
  const det = manager.getAnimalFireDeterrence(wolf, player);
  if (!det.canAttack) return;

  if (wolf.leavingCombatTimer && wolf.leavingCombatTimer > 0) return;
  // Hierarquia de predadores: se houver criatura mais forte atacando o jogador (ex: Dragão), o lobo não entra na luta e vai embora
  if (manager && typeof manager.getSuperiorPlayerAttacker === "function") {
    const superior = manager.getSuperiorPlayerAttacker(wolf, player);
    if (superior) {
      wolf.attackCooldown = 4.0;
      wolf.aggroTimer = 0;
      wolf.giveUpPursuitTimer = 14.0;
      wolf.leavingCombatTimer = 10.0;
      wolf.fleeFromCombatX = player.x;
      wolf.fleeFromCombatY = player.y;
      const fleeAng = (manager.pickFleeAngle ? manager.pickFleeAngle(wolf, player.x, player.y, 0.016, wolf.speed * 1.45) : Math.atan2(wolf.y - player.y, wolf.x - player.x)) || Math.random() * Math.PI * 2;
      wolf.vx = Math.cos(fleeAng) * (wolf.speed * 1.45);
      wolf.vy = Math.sin(fleeAng) * (wolf.speed * 1.45);
      wolf.facing = manager.getMonsterFacing(wolf.vx, wolf.vy, wolf.facing);
      if (manager.engine && typeof manager.engine.moveWithSlide === "function") {
        const _m = manager.engine.moveWithSlide(wolf.x, wolf.y, wolf.vx * 0.016 * 60, wolf.vy * 0.016 * 60, false);
        wolf.x = _m.x;
        wolf.y = _m.y;
        wolf.isMoving = true;
      }
      return;
    }
  }

  // Alterna dinamicamente entre os 3 ataques:
  // 1 = arm_hold (abraça o player e mira a boca no pescoço)
  // 2 = leg_pull (morde perna e puxa para trás)
  // 3 = quick_bite_retreat (morde, solta e afasta para avançar novamente)
  wolf.inCombatTimer = 4.0;
  if (manager && typeof manager.dismissInferiorAttackers === "function") {
    manager.dismissInferiorAttackers(wolf, player);
  }
  wolf.wolfAttackCombo = ((wolf.wolfAttackCombo || 0) % 3) + 1;
  const attackChoice = wolf.wolfAttackCombo;

  if (attackChoice === 1) {
    // 1. Lobo abraça o player e crava a boca com presas no pescoço
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

    manager.applyMonsterHitToPlayer(wolf, player, playerDef, false, player.x, player.y - 18);
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
    spawnSubtleWolfDust(manager, wolf.x, wolf.y + 4);
  } else {
    // 3. Morde e solta e afasta para avançar novamente
    wolf.wolfAttackState = "quick_bite";
    wolf.wolfAttackDuration = 0.35;
    wolf.wolfAttackTimer = wolf.wolfAttackDuration;
    wolf.attackCooldown = 1.6;

    // O lobo sempre encara diretamente o jogador no ataque
    wolf.facing = player.x < wolf.x ? "left" : "right";
    const ang = Math.atan2(player.y - wolf.y, player.x - wolf.x);
    wolf.vx = Math.cos(ang) * (wolf.speed * 2.2);
    wolf.vy = Math.sin(ang) * (wolf.speed * 2.2);

    manager.applyMonsterHitToPlayer(wolf, player, playerDef, false, player.x, player.y);
  }
};

CREATURES.wolf.updateAttack = function (manager, wolf, player, dt, playerDef) {
  if (!wolf.wolfAttackState) return false;
  wolf.inCombatTimer = 4.0;
  if (manager && typeof manager.dismissInferiorAttackers === "function") {
    manager.dismissInferiorAttackers(wolf, player);
  }

  // Se o lobo ou player estiverem mortos, encerra o ataque
  if (wolf.hp <= 0 || player.isDead) {
    wolf.wolfAttackState = null;
    return false;
  }

  // Hierarquia de predadores: se um predador mais forte (ex: Dragão) chegar atacando o player, o lobo desiste do ataque e vai embora!
  if (manager && typeof manager.getSuperiorPlayerAttacker === "function") {
    const superior = manager.getSuperiorPlayerAttacker(wolf, player);
    if (superior) {
      wolf.wolfAttackState = null;
      wolf.attackCooldown = 4.0;
      wolf.aggroTimer = 0;
      wolf.giveUpPursuitTimer = 14.0;
      wolf.leavingCombatTimer = 10.0;
      wolf.fleeFromCombatX = player.x;
      wolf.fleeFromCombatY = player.y;
      const fleeAng = (manager.pickFleeAngle ? manager.pickFleeAngle(wolf, player.x, player.y, dt, wolf.speed * 1.45) : Math.atan2(wolf.y - player.y, wolf.x - player.x)) || Math.random() * Math.PI * 2;
      wolf.vx = Math.cos(fleeAng) * (wolf.speed * 1.45);
      wolf.vy = Math.sin(fleeAng) * (wolf.speed * 1.45);
      wolf.facing = manager.getMonsterFacing(wolf.vx, wolf.vy, wolf.facing);
      if (manager.engine && typeof manager.engine.moveWithSlide === "function") {
        const _m = manager.engine.moveWithSlide(wolf.x, wolf.y, wolf.vx * dt * 60, wolf.vy * dt * 60, false);
        wolf.x = _m.x;
        wolf.y = _m.y;
        wolf.isMoving = true;
      }
      return false;
    }
  }

  // Fogo e tocha intimidam o lobo
  const det = manager.getAnimalFireDeterrence(wolf, player);
  if (det.isDeterred) {
    wolf.wolfAttackState = null;
    wolf.attackCooldown = 2.5;
    return false;
  }

  wolf.wolfAttackTimer = Math.max(0, (wolf.wolfAttackTimer || 0) - dt);

  // 1. Lobo abraça o player e crava a boca no pescoço
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

    // Dentadas periódicas enquanto crava as presas no pescoço do jogador
    wolf.wolfDamageTick = (wolf.wolfDamageTick || 0) - dt;
    if (wolf.wolfDamageTick <= 0) {
      wolf.wolfDamageTick = 0.5;
      manager.applyMonsterHitToPlayer(wolf, player, playerDef, false, player.x, player.y - 18);
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

    // Poeira reduzida em 95%: apenas 1 partícula sutil ocasionalmente
    if (Math.random() < dt * 0.35) {
      spawnSubtleWolfDust(manager, wolf.x, wolf.y + 4);
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
    wolf.facing = player.x < wolf.x ? "left" : "right";
    if (manager.engine && typeof manager.engine.moveWithSlide === "function") {
      const _m = manager.engine.moveWithSlide(wolf.x, wolf.y, (wolf.vx || 0) * dt * 45, (wolf.vy || 0) * dt * 45, false);
      wolf.x = _m.x;
      wolf.y = _m.y;
      wolf.isMoving = true;
    }
    if (wolf.wolfAttackTimer <= 0) {
      // Afasta rapidamente para trás mantendo olhar fixo no jogador
      wolf.wolfAttackState = "quick_retreat";
      wolf.wolfAttackDuration = 0.48;
      wolf.wolfAttackTimer = wolf.wolfAttackDuration;
      const retreatAng = Math.atan2(wolf.y - player.y, wolf.x - player.x) || (player.x < wolf.x ? 0 : Math.PI);
      wolf.retreatVx = Math.cos(retreatAng) * (wolf.speed * 2.5);
      wolf.retreatVy = Math.sin(retreatAng) * (wolf.speed * 2.5);
      wolf.facing = player.x < wolf.x ? "left" : "right";
    }
    return true;
  }

  // 3b. Afasta-se rapidamente mantendo postura defensiva focada no player
  if (wolf.wolfAttackState === "quick_retreat") {
    wolf.vx = wolf.retreatVx || 0;
    wolf.vy = wolf.retreatVy || 0;
    // Sempre encarar o jogador no recuo para não inverter o sprite
    wolf.facing = player.x < wolf.x ? "left" : "right";

    if (manager.engine && typeof manager.engine.moveWithSlide === "function") {
      const _m = manager.engine.moveWithSlide(wolf.x, wolf.y, wolf.vx * dt * 50, wolf.vy * dt * 50, false);
      wolf.x = _m.x;
      wolf.y = _m.y;
      wolf.isMoving = true;
    } else {
      wolf.x += wolf.vx * dt * 50;
      wolf.y += wolf.vy * dt * 50;
    }

    // Poeira sutil de frenagem
    if (Math.random() < dt * 0.3) {
      spawnSubtleWolfDust(manager, wolf.x, wolf.y + 3);
    }

    if (wolf.wolfAttackTimer <= 0) {
      // Avança novamente para o segundo bote!
      wolf.wolfAttackState = "advance_again";
      wolf.wolfAttackDuration = 0.45;
      wolf.wolfAttackTimer = wolf.wolfAttackDuration;
    }
    return true;
  }

  // 3c. Avança novamente com bote
  if (wolf.wolfAttackState === "advance_again") {
    const advanceAng = Math.atan2(player.y - wolf.y, player.x - wolf.x);
    const advSpeed = wolf.speed * 2.2;
    wolf.vx = Math.cos(advanceAng) * advSpeed;
    wolf.vy = Math.sin(advanceAng) * advSpeed;
    wolf.facing = player.x < wolf.x ? "left" : "right";

    if (manager.engine && typeof manager.engine.moveWithSlide === "function") {
      const _m = manager.engine.moveWithSlide(wolf.x, wolf.y, wolf.vx * dt * 50, wolf.vy * dt * 50, false);
      wolf.x = _m.x;
      wolf.y = _m.y;
      wolf.isMoving = true;
    } else {
      wolf.x += wolf.vx * dt * 50;
      wolf.y += wolf.vy * dt * 50;
    }

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
