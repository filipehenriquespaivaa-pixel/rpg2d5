/* js/core/desert-city.js
 * Aldeia das Areias Douradas — Cidade / Povoado no Bioma de Deserto.
 *
 * Características arquitetônicas:
 * - Localizada no bioma de Deserto (BiomeId.DESERT).
 * - Sem ruas pavimentadas (as casas ficam diretamente sobre o solo e dunas do deserto).
 * - Casas de cômodo único e pequeno (feitas de adobe, barro cozido e madeira de deserto).
 * - Casas espalhadas pelo mapa a uma distância mínima de 4 a 8 quadrados umas das outras.
 * - 17 casas no total, numeradas de #1 a #17.
 * - Interior de cada casa contém esteira de palha para dormir e potes de cerâmica com mantimentos.
 * - Telhados de adobe 2.5D com fade ao entrar/sair.
 *
 * População da Aldeia (Moradores do Deserto):
 * - Moradores esguios / magros, de silhueta esbelta típica de nômades das areias.
 * - Cores variadas (tons de pele variados: âmbar dourada, pêssego suave, canela quente,
 *   bronzeada, trigueira, morena profunda, café e negra retinta luminosa).
 * - Roupas temáticas de deserto autênticas:
 *   * Túnicas fluidas e ajustadas (dishdasha / jalabiya / caftã) em linho branco do Saara, azul tuaregue,
 *     areia dourada/ocre, verde oásis, carmesim de caravana, terracota e açafrão solar.
 *   * Coberturas de cabeça temáticas: Turbantes bem moldados, Shemagh/Keffiyeh com agal preto,
 *     turbantes de caravaneiro, diademas solares, capuzes abertos e tiaras de couro com turquesa (rosto 100% livre e visível, sem nenhum véu tampando o rosto).
 *   * Acessórios: odres de água a tiracolo, ânforas de cerâmica, cestos de tâmaras, cajados de pastor e leques de palha.
 * - Linguagem Rúnica Ancestral (Referência ao Pergaminho Rúnico):
 *   * Os moradores NÃO conversam em português; comunicam-se exclusivamente em RUNAS SAGRADAS do Futhark Antigo,
 *     com glifos de poder (᚛ ᛋ ᛟ ᛚ ᛫ ᚨ ᚱ ᛖ ᚾ ᚨ ᛫ ᛏ ᛖ ᛏ ᚱ ᚨ ᛫ ᚲ ᛟ ᛋ ᛗ ᛟ ᛋ ᚜)!
 *   * Balões de diálogo sobre a cabeça e mensagens de interação exibem escrituras rúnicas arcanas.
 * - Rotina viva de RPG:
 *   * De dia passeiam pelas dunas e espaços entre as casas, conversam entre si em runas e abrem portas ao passar.
 *   * À noite retornam para suas respectivas casas para descansar sobre as esteiras de junco com efeito zZz!
 *   * Interação com o jogador através da tecla [F].
 */
"use strict";

window.Game = window.Game || {};

(function (G) {
  // Centro e raio territorial do Povoado do Deserto
  const CITY_CX = 520;
  const CITY_CY = 360;
  const CITY_RADIUS = 90;
  const CITY_BIOME_RADIUS = 180;

  // =========================================================================
  // SISTEMA DE RUNAS ANCESTRAIS (REFERÊNCIA AO PERGAMINHO DE RUNAS)
  // - Transliteração direta e frases arcanas de Futhark Antigo
  // =========================================================================
  const RUNE_MAP = {
    a: "ᚨ", b: "ᛒ", c: "ᚲ", d: "ᛞ", e: "ᛖ", f: "ᚠ", g: "ᚷ", h: "ᚺ",
    i: "ᛁ", j: "ᛃ", k: "ᚲ", l: "ᛚ", m: "ᛗ", n: "ᚾ", o: "ᛟ", p: "ᛈ",
    q: "ᚲ", r: "ᚱ", s: "ᛋ", t: "ᛏ", u: "ᚢ", v: "ᚹ", w: "ᚹ", x: "ᛉ",
    y: "ᛇ", z: "ᛉ"
  };

  function toRunes(str) {
    if (!str) return "";
    const clean = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const words = clean.split(/\s+/).filter(Boolean);
    const runicWords = words.map(w => {
      let rw = "";
      for (const char of w) {
        if (RUNE_MAP[char]) {
          rw += (rw ? " " : "") + RUNE_MAP[char];
        }
      }
      return rw;
    }).filter(Boolean);
    return "᚛ " + runicWords.join(" ᛫ ") + " ᚜";
  }

  // Falas e saudações rúnicas místicas para interação com o jogador [F]
  const RUNIC_GREETINGS = [
    "᚛ ᛋ ᛟ ᛚ ᛫ ᚨ ᚱ ᛖ ᚾ ᚨ ᛫ ᛏ ᛖ ᛏ ᚱ ᚨ ᛫ ᚲ ᛟ ᛋ ᛗ ᛟ ᛋ ᚜",
    "᚛ ᚨ ᚲ ᚢ ᚨ ᛫ ᛈ ᚢ ᚱ ᚨ ᛫ ᛟ ᚨ ᛋ ᛁ ᛋ ᛫ ᚹ ᛁ ᛏ ᚨ ᚜",
    "᚛ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᛫ ᚨ ᚱ ᚲ ᚨ ᚾ ᚢ ᛗ ᛫ ᛋ ᚨ ᚲ ᚱ ᚢ ᛗ ᚜",
    "᚛ ᛟ ᛫ ᛏ ᚱ ᛁ ᚨ ᚾ ᚷ ᚢ ᛚ ᛟ ᛫ ᛞ ᛟ ᛫ ᚠ ᛟ ᚷ ᛟ ᛫ ᛖ ᛫ ᛞ ᚨ ᛫ ᚨ ᚷ ᚢ ᚨ ᚜",
    "᚛ ᛚ ᚢ ᚾ ᚨ ᛫ ᚨ ᛋ ᛏ ᚱ ᚢ ᛗ ᛫ ᛈ ᚢ ᛚ ᛋ ᚨ ᛫ ᚾ ᚨ ᛫ ᛖ ᛋ ᚲ ᚢ ᚱ ᛁ ᛞ ᚨ ᛟ ᚜",
    "᚛ ᛈ ᛖ ᚱ ᚷ ᚨ ᛗ ᛁ ᚾ ᚺ ᛟ ᛫ ᚨ ᚱ ᚲ ᚨ ᚾ ᛟ ᛫ ᛞ ᛟ ᛫ ᛞ ᛖ ᛋ ᛏ ᛁ ᚾ ᛟ ᚜",
    "᚛ 🜂 ᚠ ᛟ ᚷ ᛟ ᛫ 🜄 ᚨ ᚷ ᚢ ᚨ ᛫ 🜁 ᚨ ᛖ ᚱ ᛫ 🜃 ᛏ ᛖ ᚱ ᚱ ᚨ ᚜",
    "᚛ ᚲ ᚢ ᚨ ᛏ ᚱ ᛟ ᛫ ᛈ ᛟ ᛞ ᛖ ᚱ ᛖ ᛋ ᛫ ᚢ ᛗ ᛫ ᛋ ᛟ ᛫ ᛞ ᛖ ᛋ ᛏ ᛁ ᚾ ᛟ ᚜",
    "᚛ ᛏ ᚱ ᛖ ᛋ ᛫ ᚲ ᚺ ᚨ ᚹ ᛖ ᛋ ᛫ ᛋ ᛟ ᛒ ᛫ ᚨ ᛋ ᛫ ᚱ ᚢ ᛁ ᚾ ᚨ ᛋ ᚜",
    "᚛ ᚹ ᛁ ᛏ ᚨ ᛫ ᛖ ᛏ ᛖ ᚱ ᚾ ᚨ ᛫ ᛈ ᛟ ᛞ ᛖ ᚱ ᛫ ᛟ ᚲ ᚢ ᛚ ᛏ ᛟ ᚜",
    "᚛ ᛟ ᛫ ᛟ ᛚ ᚺ ᛟ ᛫ ᛞ ᛟ ᛫ ᛖ ᛏ ᛖ ᚱ ᛫ ᛈ ᚢ ᛚ ᛋ ᚨ ᚜",
    "᚛ ᚱ ᚢ ᚾ ᚨ ᛋ ᛫ ᛁ ᚾ ᛞ ᛖ ᚲ ᛁ ᚠ ᚱ ᚨ ᚹ ᛖ ᛁ ᛋ ᛫ ᚨ ᛟ ᛫ ᛟ ᛚ ᚺ ᚨ ᚱ ᛫ ᛗ ᛟ ᚱ ᛏ ᚨ ᛚ ᚜"
  ];

  // Conversas cotidianas em runas entre os moradores ao se cruzarem
  const RUNIC_CHATTER = [
    "᚛ ᛋ ᚨ ᛚ ᚨ ᛗ ᛫ ᛋ ᛟ ᛚ ᛫ ᚨ ᚱ ᛖ ᚾ ᚨ ᚜",
    "᚛ ᚨ ᚲ ᚢ ᚨ ᛫ ᛟ ᚨ ᛋ ᛁ ᛋ ᛫ ᛈ ᚢ ᚱ ᚨ ᚜",
    "᚛ ᛚ ᚢ ᚾ ᚨ ᛫ ᚲ ᛟ ᛋ ᛗ ᛟ ᛋ ᛫ ᚨ ᛋ ᛏ ᚱ ᚢ ᛗ ᚜",
    "᚛ ᚹ ᛁ ᛏ ᚨ ᛫ ᛖ ᛏ ᛖ ᚱ ᚾ ᚨ ᛫ ᛋ ᚨ ᚲ ᚱ ᚨ ᚜",
    "᚛ ᛏ ᛖ ᛏ ᚱ ᚨ ᛫ ᚲ ᛟ ᛋ ᛗ ᛟ ᛋ ᛫ ᛟ ᛚ ᚺ ᛟ ᚜",
    "᚛ ᚱ ᚢ ᚾ ᚨ ᛫ ᚨ ᚾ ᚲ ᛖ ᛋ ᛏ ᚱ ᚨ ᛚ ᛁ ᛋ ᚜",
    "᚛ ᛞ ᛖ ᛋ ᛖ ᚱ ᛏ ᚢ ᛗ ᛫ ᛋ ᚨ ᚲ ᚱ ᚢ ᛗ ᚜",
    "᚛ ✦ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᛫ ᚨ ᚱ ᚲ ᚨ ᚾ ᚢ ᛗ ✦ ᚜"
  ];

  // =========================================================================
  // DISPOSIÇÃO ORGÂNICA DAS 17 CASAS DE CÔMODO ÚNICO DO DESERTO:
  // =========================================================================
  const HOUSE_SPECS = [
    // Fileira Norte / Noroeste
    { relX: -26, relY: -22, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #1
    { relX: -16, relY: -28, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #2
    { relX:  -7, relY: -20, halfW: 3, halfH: 2, doorSide: "south" }, // Casa #3
    { relX:   4, relY: -27, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #4
    { relX:  15, relY: -20, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #5
    { relX:  26, relY: -26, halfW: 3, halfH: 2, doorSide: "south" }, // Casa #6

    // Meio Oeste e Leste
    { relX: -34, relY:  -9, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #7
    { relX: -21, relY:  -8, halfW: 3, halfH: 2, doorSide: "south" }, // Casa #8
    { relX:  20, relY:  -7, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #9
    { relX:  32, relY:  -9, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #10

    // Meio-Sul Oeste e Leste
    { relX: -27, relY:   6, halfW: 2, halfH: 2, doorSide: "north" }, // Casa #11
    { relX: -14, relY:   7, halfW: 3, halfH: 2, doorSide: "north" }, // Casa #12
    { relX:  12, relY:   7, halfW: 2, halfH: 2, doorSide: "north" }, // Casa #13
    { relX:  24, relY:   8, halfW: 3, halfH: 2, doorSide: "north" }, // Casa #14

    // Extremo Sul
    { relX: -20, relY:  21, halfW: 2, halfH: 2, doorSide: "north" }, // Casa #15
    { relX:  -6, relY:  22, halfW: 2, halfH: 2, doorSide: "north" }, // Casa #16
    { relX:   8, relY:  20, halfW: 3, halfH: 2, doorSide: "north" }  // Casa #17
  ];

  const HOUSES = HOUSE_SPECS.map((spec, idx) => {
    const id = idx + 1;
    return {
      id,
      name: `Casa de Adobe #${id} (Cômodo Único)`,
      cx: CITY_CX + spec.relX,
      cy: CITY_CY + spec.relY,
      relX: spec.relX,
      relY: spec.relY,
      halfW: spec.halfW,
      halfH: spec.halfH,
      doorSide: spec.doorSide || "south",
    };
  });

  // Verifica se o tile está dentro do território da aldeia do deserto
  function isCityTerritory(tx, ty) {
    const dx = tx - CITY_CX;
    const dy = ty - CITY_CY;
    return dx * dx + dy * dy <= CITY_RADIUS * CITY_RADIUS;
  }

  // Garante que o bioma ao redor da aldeia seja sempre DESERT (Deserto Dourado contínuo)
  function isCityBiomeArea(tx, ty) {
    const dx = tx - CITY_CX;
    const dy = ty - CITY_CY;
    return dx * dx + dy * dy <= CITY_BIOME_RADIUS * CITY_BIOME_RADIUS;
  }

  // Encontra a casa correspondente ao tile, se houver
  function getHouseAt(tx, ty) {
    for (let i = 0; i < HOUSES.length; i++) {
      const h = HOUSES[i];
      if (Math.abs(tx - h.cx) <= h.halfW && Math.abs(ty - h.cy) <= h.halfH) {
        return h;
      }
    }
    return null;
  }

  // Retorna o ID da casa em que o jogador está atualmente dentro (para fade do telhado)
  function getActiveHouseForPlayer(playerX, playerY, tileSize) {
    const ptx = Math.floor(playerX / tileSize);
    const pty = Math.floor(playerY / tileSize);
    for (let i = 0; i < HOUSES.length; i++) {
      const h = HOUSES[i];
      if (Math.abs(ptx - h.cx) < h.halfW && Math.abs(pty - h.cy) < h.halfH) {
        return h.id;
      }
    }
    return null;
  }

  // Retorna os dados arquitetônicos completos do bloco na aldeia do deserto
  function getCellAt(tx, ty, interactedProps) {
    if (!isCityTerritory(tx, ty)) return null;

    const house = getHouseAt(tx, ty);
    if (!house) {
      return null;
    }

    const rx = tx - house.cx;
    const ry = ty - house.cy;
    const W = house.halfW;
    const H = house.halfH;
    const isSouthDoor = house.doorSide === "south";
    const doorY = isSouthDoor ? H : -H;
    const doorX = 0;
    const houseId = house.id;

    const tileKey = `${tx},${ty}`;
    const intState =
      interactedProps && interactedProps.get
        ? interactedProps.get(tileKey) || {}
        : {};

    // 1. Porta de entrada da casa (sul ou norte)
    if (ry === doorY && rx === doorX) {
      const isDoorOpen = !!intState.opened;
      return {
        isDesertCity: true,
        houseIndex: houseId,
        role: "door",
        roomName: `Entrada da Casa de Adobe #${houseId}`,
        isDoor: true,
        isDoorOpen: isDoorOpen,
        isWall: false,
        prop: {
          kind: "desert_city_door",
          houseIndex: houseId,
          opened: isDoorOpen,
          interactive: true,
          namePt: isDoorOpen
            ? `Porta de Madeira Aberta (Casa #${houseId})`
            : `Porta Rústica de Madeira (Casa #${houseId})`,
          descriptionPt: isDoorOpen
            ? "Porta rústica de ripas de madeira aberta. Pressione [E] para fechar contra o vento do deserto."
            : "Porta simples de tábuas de madeira com batente de argila. Pressione [E] para abrir!",
        },
      };
    }

    // 2. Paredes externas da casa (feitas de adobe e tijolos de argila cozida)
    if (Math.abs(rx) === W || Math.abs(ry) === H) {
      return {
        isDesertCity: true,
        houseIndex: houseId,
        role: "wall",
        roomName: `Parede de Adobe da Casa #${houseId}`,
        isWall: true,
        prop: {
          kind: "desert_city_wall",
          subType: 0,
          houseIndex: houseId,
          namePt: `Parede de Adobe (Casa #${houseId})`,
          descriptionPt:
            "Parede espessa de tijolos de adobe e argila seca ao sol, mantendo o interior fresco durante o dia abrasador.",
        },
      };
    }

    // 3. Interior: esteira rústica de dormir no canto oposto à porta
    const matX = -W + 1;
    const matY = isSouthDoor ? -H + 1 : H - 1;
    if (rx === matX && ry === matY) {
      return {
        isDesertCity: true,
        houseIndex: houseId,
        role: "mat",
        roomName: `Esteira de Dormir da Casa #${houseId}`,
        isWall: false,
        prop: {
          kind: "desert_city_mat",
          houseIndex: houseId,
          interactive: true,
          namePt: "Esteira de Dormir de Palha Trançada",
          descriptionPt:
            "Esteira tradicional de fibras vegetais e junco com cobertor enrolado. Lugar fresco e acolhedor para repousar e recuperar as forças.",
        },
      };
    }

    // 4. Interior: potes de mantimentos no canto oposto à porta
    const potsX = W - 1;
    const potsY = isSouthDoor ? -H + 1 : H - 1;
    if (rx === potsX && ry === potsY) {
      return {
        isDesertCity: true,
        houseIndex: houseId,
        role: "pots",
        roomName: `Potes de Mantimentos da Casa #${houseId}`,
        isWall: false,
        isCollider: true,
        prop: {
          kind: "desert_city_pots",
          houseIndex: houseId,
          interactive: true,
          namePt: "Potes de Mantimentos de Cerâmica",
          descriptionPt:
            "Grandes jarros de barro cozido armazenando grãos, tâmaras secas do deserto e água fresca protegida do calor. Pressione [E] para verificar as provisões!",
        },
      };
    }

    // 5. Piso interno de barro batido da casa de adobe
    return {
      isDesertCity: true,
      houseIndex: houseId,
      role: "floor",
      roomName: `Chão da Casa de Adobe #${houseId}`,
      isWall: false,
      prop: {
        kind: "desert_city_floor",
        houseIndex: houseId,
        namePt: "Piso de Barro Compactado",
      },
    };
  }

  // =========================================================================
  // POPULAÇÃO DA ALDEIA DAS AREIAS DOURADAS (MORADORES DO DESERTO)
  // - Silhueta esguia / magra, elegante e adaptada ao calor abrasador.
  // - Tons de pele variados de povos do deserto e caravaneiros.
  // - Roupas temáticas de deserto autênticas com túnicas fluidas ajustadas.
  // =========================================================================

  const SKIN_TONES = [
    "#fcd34d", // Âmbar dourada / bronze sol radiante
    "#f6cfb2", // Pêssego suave do oásis
    "#e5af80", // Bronzeada ensolarada
    "#d4976a", // Canela quente do deserto
    "#ba7c4e", // Trigueira / terracota
    "#9a5b2d", // Morena profunda
    "#78421b", // Castanho escuro / café
    "#4d2911", // Negra retinta luminosa
  ];

  const HAIR_COLORS = [
    "#151311", // Preto azeviche profundo
    "#2a170e", // Castanho café torrado
    "#452313", // Castanho cacau
    "#693218", // Castanho henna avermelhado
    "#593c1d", // Castanho âmbar
    "#94a3b8", // Grisalho experiente
    "#cbd5e1", // Prateado sábio ancião
  ];

  // Paletas temáticas de trajes do deserto
  const OUTFIT_PALETTES = [
    {
      name: "Linho Branco do Saara com Faixa Terracota e Ouro",
      robe: "#f8fafc",
      cloak: "#f1f5f9",
      belt: "#c2410c",
      trim: "#d97706",
      headwear: "#f8fafc",
      headwearTrim: "#c2410c",
      sandals: "#78350f"
    },
    {
      name: "Azul-Índigo Real Tuaregue com Ouro e Turquesa",
      robe: "#1e3a8a",
      cloak: "#172554",
      belt: "#d97706",
      trim: "#38bdf8",
      headwear: "#1e3a8a",
      headwearTrim: "#fbbf24",
      sandals: "#451a03"
    },
    {
      name: "Areia Dourada e Ocre com Xale de Canela",
      robe: "#d97706",
      cloak: "#9a3412",
      belt: "#78350f",
      trim: "#fef3c7",
      headwear: "#b45309",
      headwearTrim: "#fef08a",
      sandals: "#581c87"
    },
    {
      name: "Verde Esmeralda do Oásis com Fitas de Linho",
      robe: "#15803d",
      cloak: "#14532d",
      belt: "#ca8a04",
      trim: "#86efac",
      headwear: "#166534",
      headwearTrim: "#ca8a04",
      sandals: "#27272a"
    },
    {
      name: "Manto Carmesim das Caravanas com Lã de Camelo",
      robe: "#991b1b",
      cloak: "#78350f",
      belt: "#b45309",
      trim: "#fecaca",
      headwear: "#7f1d1d",
      headwearTrim: "#fef08a",
      sandals: "#451a03"
    },
    {
      name: "Terracota Ardente com Lenço Azul-Cobalto",
      robe: "#c2410c",
      cloak: "#0369a1",
      belt: "#431407",
      trim: "#38bdf8",
      headwear: "#0284c7",
      headwearTrim: "#fdba74",
      sandals: "#3f200c"
    },
    {
      name: "Açafrão Solar com Manto Púrpura de Mercador",
      robe: "#eab308",
      cloak: "#581c87",
      belt: "#6b21a8",
      trim: "#fef08a",
      headwear: "#ca8a04",
      headwearTrim: "#7e22ce",
      sandals: "#18181b"
    },
    {
      name: "Linho Cru com Colete de Couro Rústico e Faixa Azul",
      robe: "#e2e8f0",
      cloak: "#5c2c16",
      belt: "#1d4ed8",
      trim: "#94a3b8",
      headwear: "#e2e8f0",
      headwearTrim: "#1e3a8a",
      sandals: "#374151"
    }
  ];

  // Perfis individuais dos moradores
  const CITIZEN_PROFILES = [
    { name: "Tariq", title: "Guardião do Poço Central", gender: "m", head: 0, prop: "amphora", waterSkin: true },
    { name: "Yasmin", title: "Tecelã de Esteiras de Junco", gender: "f", head: 3, prop: "fan", waterSkin: false },
    { name: "Malik", title: "Mercador de Especiarias e Sal", gender: "m", head: 1, prop: "staff", waterSkin: true },
    { name: "Samira", title: "Apanhadora de Tâmaras do Oásis", gender: "f", head: 3, prop: "basket", waterSkin: true },
    { name: "Farid", title: "Mestre de Caravana das Areias", gender: "m", head: 2, prop: "staff", waterSkin: true },
    { name: "Amina", title: "Oleira das Ânforas de Argila", gender: "f", head: 5, prop: "amphora", waterSkin: false },
    { name: "Zayd", title: "Guia das Dunas Silenciosas", gender: "m", head: 1, prop: "staff", waterSkin: true },
    { name: "Layla", title: "Astrônoma do Céu do Deserto", gender: "f", head: 3, prop: null, waterSkin: true },
    { name: "Rashid", title: "Curtidor de Couro de Camelo", gender: "m", head: 0, prop: null, waterSkin: true },
    { name: "Soraya", title: "Ourives de Latão e Turquesa", gender: "f", head: 5, prop: "fan", waterSkin: false },
    { name: "Karim", title: "Cultivador de Ervas do Oásis", gender: "m", head: 4, prop: "basket", waterSkin: true },
    { name: "Fatima", title: "Sábia Anciã das Areias", gender: "f", head: 3, prop: "staff", waterSkin: false },
    { name: "Omar", title: "Pastor de Cabras do Deserto", gender: "m", head: 1, prop: "staff", waterSkin: true },
    { name: "Nadia", title: "Tecelã de Linho Alvo", gender: "f", head: 3, prop: "fan", waterSkin: false },
    { name: "Jalil", title: "Coletor de Resina Aromática", gender: "m", head: 0, prop: "basket", waterSkin: true },
    { name: "Zahra", title: "Bordadeira das Túnicas Reais", gender: "f", head: 5, prop: null, waterSkin: false },
    { name: "Nassir", title: "Vigia das Tempestades de Areia", gender: "m", head: 2, prop: "staff", waterSkin: true },
    { name: "Amira", title: "Curandeira dos Ventos Quentes", gender: "f", head: 3, prop: "amphora", waterSkin: true },
    { name: "Bashir", title: "Contador de Histórias das Dunas", gender: "m", head: 0, prop: null, waterSkin: true },
    { name: "Salma", title: "Guardiã dos Mantimentos", gender: "f", head: 5, prop: "basket", waterSkin: false },
    { name: "Hakim", title: "Ancião Guardião das Tradições", gender: "m", head: 1, prop: "staff", waterSkin: true },
    { name: "Rania", title: "Nômade das Areias Douradas", gender: "f", head: 3, prop: "amphora", waterSkin: true },
    { name: "Qasim", title: "Sapateiro de Sandálias Leves", gender: "m", head: 6, prop: null, waterSkin: true },
    { name: "Maya", title: "Moça das Ânforas de Água Fresca", gender: "f", head: 3, prop: "amphora", waterSkin: false },
    { name: "Idris", title: "Viajante dos Oásis Perdidos", gender: "m", head: 2, prop: "staff", waterSkin: true },
    { name: "Dalal", title: "Tecelã de Turbantes e Xales", gender: "f", head: 5, prop: "fan", waterSkin: false },
    { name: "Samir", title: "Ferreiro das Lâminas de Bronze", gender: "m", head: 6, prop: null, waterSkin: true },
    { name: "Jamila", title: "Perfumista das Flores do Deserto", gender: "f", head: 3, prop: "basket", waterSkin: true }
  ];

  // Pontos de passeio orgânicos ao ar livre na aldeia do deserto
  const STROLL_DESTINATIONS = [
    { relX:  -4, relY:  -4 },
    { relX:   4, relY:  -4 },
    { relX:  -4, relY:   3 },
    { relX:   4, relY:   3 },
    { relX:   0, relY:  -2 },
    { relX:   0, relY:   2 },
    { relX:  -8, relY:   0 },
    { relX:   8, relY:   0 },
    { relX: -26, relY: -15 },
    { relX: -30, relY:  -2 },
    { relX: -27, relY:  14 },
    { relX:  20, relY: -15 },
    { relX:  26, relY:  -2 },
    { relX:  18, relY:  14 },
    { relX: -10, relY: -26 },
    { relX:  10, relY: -26 },
    { relX: -12, relY:  15 },
    { relX:   2, relY:  15 },
    { relX: -14, relY:  21 },
    { relX:   0, relY:  24 }
  ];

  let _citizensInitialized = false;
  const CITIZENS = [];
  const _activeDoorwayTimers = new Map();

  // Inicializa os 29 moradores distribuídos nas 17 casas
  function _initCitizens(tileSize) {
    if (_citizensInitialized) return;
    _citizensInitialized = true;
    const ts = tileSize || 36;
    let profileIdx = 0;

    for (let i = 0; i < HOUSES.length; i++) {
      const h = HOUSES[i];
      const isTwoResidents = h.halfW === 3 || [2, 4, 7, 10, 13, 16].includes(h.id);
      const count = isTwoResidents ? 2 : 1;

      for (let r = 0; r < count; r++) {
        const id = CITIZENS.length + 1;
        const prof = CITIZEN_PROFILES[profileIdx % CITIZEN_PROFILES.length];
        profileIdx++;

        const isSouthDoor = h.doorSide === "south";
        const doorTx = h.cx;
        const doorTy = h.cy + (isSouthDoor ? h.halfH : -h.halfH);
        const outsideTy = doorTy + (isSouthDoor ? 1.25 : -1.25);

        // Pontos internos da casa
        const matTx = h.cx - h.halfW + 1;
        const matTy = h.cy + (isSouthDoor ? -h.halfH + 1 : h.halfH - 1);
        const potsTx = h.cx + h.halfW - 1;
        const potsTy = h.cy + (isSouthDoor ? -h.halfH + 1 : h.halfH - 1);
        const hallTx = h.cx;
        const hallTy = h.cy + (isSouthDoor ? h.halfH - 0.9 : -h.halfH + 0.9);
        const centerTx = h.cx + (r === 0 ? -0.35 : 0.35);
        const centerTy = h.cy;

        // Variação de tons de pele e cabelo
        const skinColor = SKIN_TONES[(id * 3 + r * 5 + i) % SKIN_TONES.length];
        const hairColor = HAIR_COLORS[(id * 5 + r * 2 + i) % HAIR_COLORS.length];
        const outfit = OUTFIT_PALETTES[(id * 2 + r + i) % OUTFIT_PALETTES.length];
        const headwearStyle = prof.head !== undefined ? prof.head : ((id + i) % 7);
        const propInHand = prof.prop !== undefined ? prof.prop : ((id + i) % 4 === 0 ? "amphora" : null);
        const hasWaterSkin = prof.waterSkin !== undefined ? prof.waterSkin : ((id + r) % 2 === 0);

        const startOutside = (id + r) % 3 !== 0;
        const startX = startOutside
          ? (h.cx + (r === 0 ? -1.4 : 1.4) + (Math.random() * 1.6 - 0.8) + 0.5) * ts
          : ((r === 0 ? matTx : centerTx) + 0.5) * ts;
        const startY = startOutside
          ? (outsideTy + (Math.random() * 1.2 - 0.6) + 0.5) * ts
          : ((r === 0 ? matTy : centerTy) + 0.5) * ts;

        const cit = {
          id,
          name: `${prof.name}, ${prof.title}`,
          shortName: prof.name,
          runicName: toRunes(prof.name),
          title: prof.title,
          gender: prof.gender || "m",
          houseId: h.id,
          house: h,
          residentIndex: r,
          skinColor,
          hairColor,
          outfit,
          headwearStyle,
          propInHand,
          hasWaterSkin,
          x: startX,
          y: startY,
          facing: isSouthDoor ? "down" : "up",
          isMoving: false,
          walkPhase: id * 1.6,
          speed: 0.88 + ((id * 7) % 5) * 0.04,
          doorTx,
          doorTy,
          outsideTy,
          matTx,
          matTy,
          potsTx,
          potsTy,
          hallTx,
          hallTy,
          centerTx,
          centerTy,
          isInsideHouse: !startOutside,
          state: startOutside ? "strolling" : "inside_home",
          stateTimer: startOutside ? 10 + (id % 15) : 3 + (id % 6),
          pauseTimer: 0,
          chatCooldown: 3 + (id % 5),
          chatPartnerId: null,
          chatText: "",
          waypoints: []
        };

        if (startOutside) {
          _assignDesertStrollDestination(cit, ts);
        }

        CITIZENS.push(cit);
      }
    }
  }

  // Atribui novo destino de passeio nas areias ao ar livre
  function _assignDesertStrollDestination(cit, ts) {
    const roll = Math.random();
    let targetX, targetY;

    if (roll < 0.45) {
      const pt = STROLL_DESTINATIONS[Math.floor(Math.random() * STROLL_DESTINATIONS.length)];
      targetX = (CITY_CX + pt.relX + (Math.random() * 1.4 - 0.7) + 0.5) * ts;
      targetY = (CITY_CY + pt.relY + (Math.random() * 1.4 - 0.7) + 0.5) * ts;
    } else if (roll < 0.75) {
      const targetHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
      const isSouth = targetHouse.doorSide === "south";
      const outY = targetHouse.cy + (isSouth ? targetHouse.halfH + 1.8 : -targetHouse.halfH - 1.8);
      targetX = (targetHouse.cx + (Math.random() * 2.6 - 1.3) + 0.5) * ts;
      targetY = (outY + (Math.random() * 0.8 - 0.4) + 0.5) * ts;
    } else {
      const angle = Math.random() * Math.PI * 2;
      const distTiles = 8 + Math.random() * 20;
      targetX = (CITY_CX + Math.cos(angle) * distTiles + 0.5) * ts;
      targetY = (CITY_CY + Math.sin(angle) * distTiles + 0.5) * ts;
    }

    cit.waypoints = [
      {
        x: (cit.x + targetX) * 0.5 + (Math.random() * 14 - 7),
        y: (cit.y + targetY) * 0.5 + (Math.random() * 14 - 7)
      },
      { x: targetX, y: targetY }
    ];
    cit.isMoving = true;
  }

  // Envia o morador de volta para sua casa de adobe
  function _sendDesertCitizenHome(cit, ts, forNight) {
    cit.state = forNight ? "returning_home_night" : "entering_house";
    cit.chatPartnerId = null;
    cit.chatText = "";
    cit.pauseTimer = 0;

    if (cit.isInsideHouse) {
      const destTx = forNight ? cit.matTx : (Math.random() < 0.5 ? cit.potsTx : cit.centerTx);
      const destTy = forNight ? cit.matTy : (Math.random() < 0.5 ? cit.potsTy : cit.centerTy);
      cit.waypoints = [
        { x: (cit.hallTx + 0.5) * ts, y: (cit.hallTy + 0.5) * ts },
        { x: (destTx + 0.5) * ts, y: (destTy + 0.5) * ts }
      ];
      cit.isMoving = true;
      return;
    }

    const isSouth = cit.house.doorSide === "south";
    const doorStepY = cit.doorTy + (isSouth ? 1.4 : -1.4);
    const destTx = forNight ? cit.matTx : (Math.random() < 0.5 ? cit.potsTx : cit.centerTx);
    const destTy = forNight ? cit.matTy : (Math.random() < 0.5 ? cit.potsTy : cit.centerTy);

    cit.waypoints = [
      { x: (cit.doorTx + 0.5) * ts, y: (doorStepY + 0.5) * ts },
      { x: (cit.doorTx + 0.5) * ts, y: (cit.doorTy + 0.5) * ts, isDoorCrossing: true },
      { x: (cit.hallTx + 0.5) * ts, y: (cit.hallTy + 0.5) * ts, markInside: true },
      { x: (destTx + 0.5) * ts, y: (destTy + 0.5) * ts }
    ];
    cit.isMoving = true;
  }

  // Faz o morador sair de casa para passear nas areias
  function _sendDesertCitizenOutside(cit, ts) {
    cit.state = "exiting_house";
    cit.chatPartnerId = null;
    cit.chatText = "";
    cit.pauseTimer = 0;
    const isSouth = cit.house.doorSide === "south";
    const doorStepY = cit.doorTy + (isSouth ? 1.4 : -1.4);
    const outsideStrollY = cit.doorTy + (isSouth ? 2.8 : -2.8);

    cit.waypoints = [
      { x: (cit.hallTx + 0.5) * ts, y: (cit.hallTy + 0.5) * ts },
      { x: (cit.doorTx + 0.5) * ts, y: (cit.doorTy + 0.5) * ts, isDoorCrossing: true },
      { x: (cit.doorTx + 0.5) * ts, y: (doorStepY + 0.5) * ts, markOutside: true },
      { x: (cit.doorTx + 0.5) * ts, y: (outsideStrollY + 0.5) * ts, markOutside: true }
    ];
    cit.isMoving = true;
  }

  // Verifica se um morador está passando pela porta neste instante
  function isDoorwayUsedByCitizen(tx, ty) {
    const exp = _activeDoorwayTimers.get(`${tx},${ty}`);
    return exp !== undefined && exp > 0;
  }

  // Interação do jogador com tecla [F] — fala exclusivamente em runas antigas!
  function interactWithNearbyCitizen(playerX, playerY, isUnderground = false) {
    if (isUnderground) return null;
    let best = null;
    let bestDist = 56;

    for (let i = 0; i < CITIZENS.length; i++) {
      const c = CITIZENS[i];
      const d = Math.hypot(playerX - c.x, playerY - c.y);
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    }

    if (!best) return null;

    const dx = playerX - best.x;
    const dy = playerY - best.y;
    best.facing = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : (dy < 0 ? "up" : "down");
    best.pauseTimer = 4.0;
    best.isMoving = false;

    // Fala 100% em runas antigas como no Pergaminho de Runas!
    const runicPhrase = RUNIC_GREETINGS[Math.floor(Math.random() * RUNIC_GREETINGS.length)];
    best.chatText = runicPhrase;
    best.state = best.isInsideHouse ? best.state : "interacting";
    best.stateTimer = 5.0;

    return {
      success: true,
      citizen: best,
      message: `💬 ${best.runicName}: "${runicPhrase}"`,
    };
  }

  // Atualiza rotinas dos moradores e retorna itens prontos para renderização ordenados por Y
  function updateAndGetCitizenRenderItems(ctx, tileSize, player, timeOfDay, animTimer, viewLeft, viewRight, viewTop, viewBottom, isUnderground = false) {
    const ts = tileSize || 36;
    _initCitizens(ts);

    if (player) {
      const distToCity = Math.hypot(player.x - CITY_CX * ts, player.y - CITY_CY * ts);
      if (distToCity > (CITY_RADIUS + 90) * ts) return [];
    }
    if (isUnderground) return [];

    for (const [k, v] of _activeDoorwayTimers.entries()) {
      if (v <= 1) _activeDoorwayTimers.delete(k);
      else _activeDoorwayTimers.set(k, v - 1);
    }

    const dt = 0.016;
    const isNight = timeOfDay < 0.24 || timeOfDay > 0.76;
    const activePlayerHouseId = player ? getActiveHouseForPlayer(player.x, player.y, ts) : null;

    for (let i = 0; i < CITIZENS.length; i++) {
      const c = CITIZENS[i];
      if (c.chatCooldown > 0) c.chatCooldown = Math.max(0, c.chatCooldown - dt);

      // REGRA DA NOITE NO DESERTO: Todos voltam para casa descansar na esteira
      if (isNight) {
        if (c.state !== "returning_home_night" && c.state !== "night_at_home") {
          _sendDesertCitizenHome(c, ts, true);
        }
      } else {
        if (c.state === "night_at_home" || c.state === "returning_home_night") {
          c.state = c.isInsideHouse ? "inside_home" : "strolling";
          c.stateTimer = 2.0 + (c.id % 6) * 0.8;
          if (!c.isInsideHouse) _assignDesertStrollDestination(c, ts);
        }
      }

      if (c.state === "interacting") {
        c.isMoving = false;
        c.stateTimer -= dt;
        if (c.stateTimer <= 0) {
          c.state = "strolling";
          c.chatText = "";
          c.chatCooldown = 8 + Math.random() * 8;
          if (!c.waypoints || c.waypoints.length === 0) {
            _assignDesertStrollDestination(c, ts);
          }
        }
        continue;
      }

      if (c.pauseTimer > 0) {
        c.pauseTimer -= dt;
        c.isMoving = false;
        continue;
      }

      // Conversa entre moradores nas areias exclusivamente em runas!
      if (!isNight && !c.isInsideHouse && c.chatCooldown <= 0 && c.state === "strolling") {
        for (let j = i + 1; j < CITIZENS.length; j++) {
          const other = CITIZENS[j];
          if (!other.isInsideHouse && other.chatCooldown <= 0 && other.state === "strolling") {
            const d = Math.hypot(c.x - other.x, c.y - other.y);
            if (d < 44) {
              c.state = "chatting";
              other.state = "chatting";
              c.chatPartnerId = other.id;
              other.chatPartnerId = c.id;
              c.isMoving = false;
              other.isMoving = false;
              c.stateTimer = 4.5;
              other.stateTimer = 4.5;
              c.chatCooldown = 18 + Math.random() * 10;
              other.chatCooldown = 18 + Math.random() * 10;
              c.facing = c.x < other.x ? "right" : "left";
              other.facing = other.x < c.x ? "right" : "left";
              c.chatText = RUNIC_CHATTER[Math.floor(Math.random() * RUNIC_CHATTER.length)];
              break;
            }
          }
        }
      }

      if (c.state === "chatting") {
        c.isMoving = false;
        c.stateTimer -= dt;
        if (c.stateTimer <= 0) {
          c.state = "strolling";
          c.chatPartnerId = null;
          c.chatText = "";
          _assignDesertStrollDestination(c, ts);
        }
        continue;
      }

      if (c.waypoints && c.waypoints.length > 0) {
        const wp = c.waypoints[0];
        const dx = wp.x - c.x;
        const dy = wp.y - c.y;
        const dist = Math.hypot(dx, dy);

        const doorWorldX = (c.doorTx + 0.5) * ts;
        const doorWorldY = (c.doorTy + 0.5) * ts;
        if (Math.hypot(c.x - doorWorldX, c.y - doorWorldY) < ts * 1.25) {
          _activeDoorwayTimers.set(`${c.doorTx},${c.doorTy}`, 12);
        }

        if (dist <= c.speed * 1.5) {
          c.x = wp.x;
          c.y = wp.y;
          if (wp.markInside) c.isInsideHouse = true;
          if (wp.markOutside) c.isInsideHouse = false;
          c.waypoints.shift();

          if (c.waypoints.length === 0) {
            c.isMoving = false;
            if (c.state === "returning_home_night") {
              c.isInsideHouse = true;
              c.state = "night_at_home";
              c.facing = "down";
            } else if (c.state === "entering_house") {
              c.isInsideHouse = true;
              c.state = "inside_home";
              c.stateTimer = 5 + Math.random() * 8;
            } else if (c.state === "exiting_house") {
              c.isInsideHouse = false;
              c.state = "strolling";
              c.stateTimer = 12 + Math.random() * 15;
              _assignDesertStrollDestination(c, ts);
            } else if (c.state === "strolling") {
              c.pauseTimer = 1.5 + Math.random() * 3.0;
              c.stateTimer = 10 + Math.random() * 15;
            }
          }
        } else {
          c.isMoving = true;
          c.walkPhase += 0.16;
          const step = Math.min(dist, c.speed);
          c.x += (dx / dist) * step;
          c.y += (dy / dist) * step;
          c.facing = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : (dy < 0 ? "up" : "down");
        }
      } else {
        c.isMoving = false;
        c.stateTimer -= dt;

        if (c.stateTimer <= 0) {
          if (c.state === "inside_home") {
            if (!isNight && Math.random() < 0.65) {
              _sendDesertCitizenOutside(c, ts);
            } else {
              const destTx = Math.random() < 0.5 ? c.matTx : c.potsTx;
              const destTy = Math.random() < 0.5 ? c.matTy : c.potsTy;
              c.waypoints = [{ x: (destTx + 0.5) * ts, y: (destTy + 0.5) * ts }];
              c.isMoving = true;
              c.stateTimer = 4 + Math.random() * 6;
            }
          } else if (c.state === "strolling") {
            if (!isNight && Math.random() < 0.25) {
              _sendDesertCitizenHome(c, ts, false);
            } else {
              _assignDesertStrollDestination(c, ts);
              c.stateTimer = 12 + Math.random() * 16;
            }
          }
        }
      }
    }

    const items = [];
    for (let i = 0; i < CITIZENS.length; i++) {
      const c = CITIZENS[i];
      if (
        c.x < viewLeft - 48 ||
        c.x > viewRight + 48 ||
        c.y < viewTop - 48 ||
        c.y > viewBottom + 48
      ) {
        continue;
      }

      if (c.isInsideHouse && activePlayerHouseId !== c.houseId) {
        const doorWorldY = (c.doorTy + 0.5) * ts;
        if (Math.abs(c.y - doorWorldY) > ts * 0.85) {
          continue;
        }
      }

      items.push({
        y: c.y,
        draw: () => _renderDesertCitizen(ctx, c, timeOfDay, animTimer, player)
      });
    }

    return items;
  }

  // =========================================================================
  // RENDERIZAÇÃO DO MORADOR DO DESERTO NO CANVAS
  // - Proporções humanas normais idênticas ao jogador e moradores de SnowPeakCity.
  // - Altura normal padrão, pescoço anatômico, pernas com pivô pendular no quadril.
  // - Vista anatômica nas 4 direções (down, up, left, right) com perfil estreito lateral.
  // - Cores variadas de pele e cabelo com roupas temáticas de deserto.
  // - Túnica longa, cinto com faixa, manto/xale, odre e sandálias.
  // - Turbantes e coberturas proporcionais à cabeça.
  // - Balão de diálogo exclusivamente em RUNAS!
  // =========================================================================

  function _renderDesertCitizen(c, npc, timeOfDay, animTimer, player) {
    c.save();
    c.translate(npc.x, npc.y);

    const w = npc.facing || "down";
    const isMoving = !!npc.isMoving;
    const isSleeping = npc.state === "night_at_home" && npc.isInsideHouse;
    const isInteracting = npc.state === "interacting";
    const isChatting = npc.state === "chatting";

    const walkSin = isMoving ? Math.sin(npc.walkPhase) : 0;
    const bob = isMoving
      ? Math.abs(Math.sin(npc.walkPhase)) * 1.8
      : isInteracting || isChatting
        ? Math.sin(animTimer * 4 + npc.id) * 0.7
        : Math.sin(animTimer * 2 + npc.id) * 0.35;

    const pal = npc.outfit;
    const robeColor = pal.robe;
    const cloakColor = pal.cloak;
    const beltColor = pal.belt;
    const trimColor = pal.trim;
    const headwearColor = pal.headwear;
    const headwearTrim = pal.headwearTrim || trimColor;
    const sandalsColor = pal.sandals || "#5c2c16";

    // 1. Sombra padrão no solo de areia
    c.fillStyle = "rgba(15, 23, 42, 0.35)";
    c.beginPath();
    c.ellipse(0, 2.5, 7.8, 4.2, 0, 0, Math.PI * 2);
    c.fill();

    // 2. Manto / Xale do Deserto nas costas (visível nas costas ou levemente de lado/frente)
    const capeSway = isMoving ? Math.cos(npc.walkPhase) * 1.8 : 0;
    if (w === "up") {
      // Vista Traseira: Manto desce pelas costas
      c.fillStyle = cloakColor;
      c.fillRect(-7, -16 - bob, 14, 13);
      c.fillStyle = trimColor;
      c.fillRect(-7, -4 - bob, 14, 1.5);
    } else if (!isSleeping) {
      if (w === "down") {
        c.fillStyle = cloakColor;
        c.fillRect(-7.2 + capeSway * 0.25, -15.5 - bob, 14.4, 13);
        c.fillStyle = trimColor;
        c.fillRect(-7.2 + capeSway * 0.25, -3.5 - bob, 14.4, 1.2);
      } else {
        // Lateral
        const capeX = w === "left" ? 0.5 : -4.5;
        c.fillStyle = cloakColor;
        c.fillRect(capeX + capeSway * 0.2, -15.5 - bob, 4.2, 13);
      }
    }

    // 3. Pernas e Sandálias Anatômicas com Balanço Pendular Normal (Pivô no quadril y = -3.5)
    const legMult = 2.8;
    const legSwingL = isMoving ? -walkSin * legMult : 0;
    const legSwingR = isMoving ? walkSin * legMult : 0;

    if (w === "up") {
      // VISTA TRASEIRA (COSTAS)
      // Perna Esquerda
      c.fillStyle = "#e2e8f0";
      c.fillRect(-5.2, -3.5 + legSwingL, 3.8, 4.6);
      c.fillStyle = "rgba(0, 0, 0, 0.22)";
      c.fillRect(-3.2, -3.5 + legSwingL, 0.9, 4.6);
      c.fillStyle = sandalsColor;
      c.fillRect(-5.2, 0.5 + legSwingL, 3.8, 3.8);
      c.fillStyle = trimColor;
      c.fillRect(-5.2, 0.5 + legSwingL, 3.8, 1.2);
      c.fillStyle = "#1c1917";
      c.fillRect(-5.2, 3.7 + legSwingL, 3.8, 1.2);

      // Perna Direita
      c.fillStyle = "#e2e8f0";
      c.fillRect(1.4, -3.5 + legSwingR, 3.8, 4.6);
      c.fillStyle = "rgba(0, 0, 0, 0.22)";
      c.fillRect(3.4, -3.5 + legSwingR, 0.9, 4.6);
      c.fillStyle = sandalsColor;
      c.fillRect(1.4, 0.5 + legSwingR, 3.8, 3.8);
      c.fillStyle = trimColor;
      c.fillRect(1.4, 0.5 + legSwingR, 3.8, 1.2);
      c.fillStyle = "#1c1917";
      c.fillRect(1.4, 3.7 + legSwingR, 3.8, 1.2);
    } else if (w === "down") {
      // VISTA FRONTAL
      // Perna Esquerda
      c.fillStyle = "#e2e8f0";
      c.fillRect(-5.2, -3.5 + legSwingL, 3.8, 4.6);
      c.fillStyle = npc.skinColor;
      c.fillRect(-4.5, -1.2 + legSwingL, 2.4, 2.2);
      c.fillStyle = sandalsColor;
      c.fillRect(-5.2, 0.5 + legSwingL, 3.8, 3.8);
      c.fillStyle = trimColor;
      c.fillRect(-5.2, 0.5 + legSwingL, 3.8, 1.2);
      c.fillStyle = "#1c1917";
      c.fillRect(-5.2, 3.7 + legSwingL, 3.8, 1.2);

      // Perna Direita
      c.fillStyle = "#e2e8f0";
      c.fillRect(1.4, -3.5 + legSwingR, 3.8, 4.6);
      c.fillStyle = npc.skinColor;
      c.fillRect(2.1, -1.2 + legSwingR, 2.4, 2.2);
      c.fillStyle = sandalsColor;
      c.fillRect(1.4, 0.5 + legSwingR, 3.8, 3.8);
      c.fillStyle = trimColor;
      c.fillRect(1.4, 0.5 + legSwingR, 3.8, 1.2);
      c.fillStyle = "#1c1917";
      c.fillRect(1.4, 3.7 + legSwingR, 3.8, 1.2);
    } else if (w === "left") {
      // VISTA LATERAL ESQUERDA: Pêndulo anatômico com pivô em y = -3.5
      const strideRange = 0.48;
      const frontAngle = -walkSin * strideRange;
      const backAngle = walkSin * strideRange;

      // Perna de trás (direita, pivô em 1.6, -3.5)
      c.save();
      c.translate(1.6, -3.5);
      c.rotate(backAngle);
      c.fillStyle = "#e2e8f0";
      c.fillRect(-1.8, 0, 3.6, 4.6);
      c.fillStyle = sandalsColor;
      c.fillRect(-1.8, 4.0, 3.6, 3.2);
      c.fillStyle = trimColor;
      c.fillRect(-1.8, 4.0, 3.6, 1.2);
      c.fillStyle = "#1c1917";
      c.fillRect(-3.0, 6.8, 4.8, 1.2);
      c.restore();

      // Perna da frente (esquerda, pivô em -1.6, -3.5)
      c.save();
      c.translate(-1.6, -3.5);
      c.rotate(frontAngle);
      c.fillStyle = "#e2e8f0";
      c.fillRect(-1.9, 0, 3.8, 4.6);
      c.fillStyle = sandalsColor;
      c.fillRect(-1.9, 4.0, 3.8, 3.2);
      c.fillStyle = trimColor;
      c.fillRect(-1.9, 4.0, 3.8, 1.2);
      c.fillStyle = "#1c1917";
      c.fillRect(-3.3, 6.8, 5.2, 1.2);
      c.restore();
    } else {
      // VISTA LATERAL DIREITA: Pêndulo anatômico com pivô em y = -3.5
      const strideRange = 0.48;
      const frontAngle = walkSin * strideRange;
      const backAngle = -walkSin * strideRange;

      // Perna de trás (esquerda, pivô em -1.6, -3.5)
      c.save();
      c.translate(-1.6, -3.5);
      c.rotate(backAngle);
      c.fillStyle = "#e2e8f0";
      c.fillRect(-1.8, 0, 3.6, 4.6);
      c.fillStyle = sandalsColor;
      c.fillRect(-1.8, 4.0, 3.6, 3.2);
      c.fillStyle = trimColor;
      c.fillRect(-1.8, 4.0, 3.6, 1.2);
      c.fillStyle = "#1c1917";
      c.fillRect(-1.8, 6.8, 4.8, 1.2);
      c.restore();

      // Perna da frente (direita, pivô em 1.6, -3.5)
      c.save();
      c.translate(1.6, -3.5);
      c.rotate(frontAngle);
      c.fillStyle = "#e2e8f0";
      c.fillRect(-1.9, 0, 3.8, 4.6);
      c.fillStyle = sandalsColor;
      c.fillRect(-1.9, 4.0, 3.8, 3.2);
      c.fillStyle = trimColor;
      c.fillRect(-1.9, 4.0, 3.8, 1.2);
      c.fillStyle = "#1c1917";
      c.fillRect(-1.9, 6.8, 5.2, 1.2);
      c.restore();
    }

    // 4. Túnica Longa de Deserto (Dishdasha / Caftã) com proporções normais
    const skirtSway = walkSin * 1.1;

    if (w === "left" || w === "right") {
      // Perfil lateral: túnica fluida estreita anatômica
      const isLeft = w === "left";
      const profX = isLeft ? -4.8 : -4.2;
      c.fillStyle = robeColor;
      c.beginPath();
      c.moveTo(profX, -16 - bob);
      c.lineTo(profX + 9.2, -16 - bob);
      c.lineTo(profX + 9.8 + (isLeft ? -skirtSway * 0.5 : skirtSway * 0.5), 2.0 - bob * 0.3);
      c.lineTo(profX - 0.4 + (isLeft ? -skirtSway * 0.5 : skirtSway * 0.5), 2.0 - bob * 0.3);
      c.closePath();
      c.fill();

      // Barra bordada
      c.fillStyle = trimColor;
      c.fillRect(profX - 0.4, 0.4 - bob * 0.3, 10.2, 1.8);
    } else {
      // Vista frontal / traseira: túnica fluida normal
      c.fillStyle = robeColor;
      // Tronco superior
      c.fillRect(-6.5, -16 - bob, 13, 10.5);

      // Saia da túnica fluida
      c.beginPath();
      c.moveTo(-6.5, -6 - bob);
      c.lineTo(6.5, -6 - bob);
      c.lineTo(8.2 + skirtSway, 2.0 - bob * 0.3);
      c.lineTo(-8.2 + skirtSway, 2.0 - bob * 0.3);
      c.closePath();
      c.fill();

      // Barra bordada decorativa na túnica
      c.fillStyle = trimColor;
      c.fillRect(-7.8 + skirtSway * 0.8, -0.2 - bob * 0.3, 15.6, 2.0);
      c.fillStyle = "rgba(0, 0, 0, 0.12)";
      c.fillRect(-7.5 + skirtSway * 0.8, 1.2 - bob * 0.3, 15.0, 0.8);
    }

    // 5. Cinto / Faixa de Cintura Normal
    c.fillStyle = beltColor;
    c.fillRect(-6.8, -7.2 - bob, 13.6, 2.6);
    if (w !== "up") {
      // Fivela dourada ou nó decorativo caído
      c.fillStyle = "#fbbf24";
      c.fillRect(-1.0, -7.0 - bob, 2.0, 2.2);
      c.fillStyle = beltColor;
      c.fillRect(1.5, -6.5 - bob, 2.0, 4.8);
      c.fillStyle = trimColor;
      c.fillRect(1.5, -2.5 - bob, 2.0, 1.0);
    }

    // 6. Detalhes do Peito / Gola da Túnica
    if (w !== "up") {
      const fOffX = w === "left" ? -1.5 : w === "right" ? 1.5 : 0;
      // Colarinho / decote em V tradicional
      c.fillStyle = trimColor;
      c.beginPath();
      c.moveTo(-3.5 + fOffX, -16 - bob);
      c.lineTo(3.5 + fOffX, -16 - bob);
      c.lineTo(0 + fOffX, -10 - bob);
      c.closePath();
      c.fill();
      c.fillStyle = npc.skinColor;
      c.beginPath();
      c.moveTo(-2.2 + fOffX, -16 - bob);
      c.lineTo(2.2 + fOffX, -16 - bob);
      c.lineTo(0 + fOffX, -11.5 - bob);
      c.closePath();
      c.fill();

      // Botões ou bordados centrais
      c.fillStyle = "#fbbf24";
      c.fillRect(-0.6 + fOffX, -10.0 - bob, 1.2, 1.2);
      c.fillRect(-0.6 + fOffX, -8.2 - bob, 1.2, 1.2);
    }

    // 7. Odre de Água a Tiracolo Normal
    if (npc.hasWaterSkin && !isSleeping && w !== "up") {
      c.fillStyle = "#451a03";
      c.beginPath();
      c.moveTo(-6.5, -15 - bob);
      c.lineTo(5.5, -6.0 - bob);
      c.lineTo(4.2, -5.0 - bob);
      c.lineTo(-7.5, -14 - bob);
      c.closePath();
      c.fill();
      c.fillStyle = "#78350f";
      c.beginPath();
      c.ellipse(6.2, -5.0 - bob, 3.0, 4.2, Math.PI / 6, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#b45309";
      c.fillRect(5.5, -9.0 - bob, 1.8, 1.8);
    }

    // 8. Braços com Mangas e Punhos + Mãos com tom de pele (Proporções normais)
    const walkSwing = isMoving
      ? walkSin
      : isInteracting || isChatting
        ? Math.sin(animTimer * 5 + npc.id) * 0.4
        : 0;

    const swingL = walkSwing * 0.75;
    const swingR = -walkSwing * 0.75;
    const shoulderTopY = -15.2 - bob;

    if (w === "down" || w === "up") {
      // Braço esquerdo (topo fixo no ombro)
      const wristYL = shoulderTopY + 5.0 + swingL;
      c.fillStyle = robeColor;
      c.fillRect(-8.4, shoulderTopY, 2.6, 6.2 + swingL);
      c.fillStyle = trimColor;
      c.fillRect(-8.4, wristYL, 2.6, 1.6);
      c.fillStyle = npc.skinColor;
      c.fillRect(-8.3, wristYL + 1.5, 2.4, 2.0);

      // Braço direito (topo fixo no ombro)
      const wristYR = shoulderTopY + 5.0 + swingR;
      c.fillStyle = robeColor;
      c.fillRect(5.8, shoulderTopY, 2.6, 6.2 + swingR);
      c.fillStyle = trimColor;
      c.fillRect(5.8, wristYR, 2.6, 1.6);
      c.fillStyle = npc.skinColor;
      c.fillRect(5.9, wristYR + 1.5, 2.4, 2.0);
    } else {
      const isLeft = w === "left";
      const shoulderPivotX = isLeft ? -1.0 : 0.8;
      const armAngle = (isLeft ? 1 : -1) * walkSwing * 0.45;
      c.save();
      c.translate(shoulderPivotX, shoulderTopY);
      c.rotate(armAngle);
      c.fillStyle = robeColor;
      c.fillRect(-1.3, 0, 2.6, 6.2);
      c.fillStyle = trimColor;
      c.fillRect(-1.3, 4.8, 2.6, 1.6);
      c.fillStyle = npc.skinColor;
      c.fillRect(-1.2, 6.4, 2.4, 2.0);
      c.restore();
    }

    // 9. Acessórios na Mão
    if (npc.propInHand && !isSleeping && w !== "up") {
      const propX = w === "left" ? -7.8 : 7.6;
      const propY = -5.0 - bob;

      if (npc.propInHand === "amphora") {
        c.fillStyle = "#c2410c";
        c.beginPath();
        c.ellipse(propX, propY, 3.2, 4.4, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = "#9a3412";
        c.fillRect(propX - 1.5, propY - 6.0, 3.0, 2.0);
        c.strokeStyle = "#7c2d12";
        c.lineWidth = 1.0;
        c.beginPath();
        c.arc(propX + 2.2, propY - 2.0, 2.0, 0, Math.PI * 2);
        c.stroke();
      } else if (npc.propInHand === "basket") {
        c.fillStyle = "#b45309";
        c.beginPath();
        c.ellipse(propX, propY, 4.2, 3.0, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = "#451a03";
        c.fillRect(propX - 2.6, propY - 3.6, 1.8, 1.8);
        c.fillRect(propX, propY - 3.8, 2.0, 1.8);
      } else if (npc.propInHand === "staff") {
        c.fillStyle = "#78350f";
        c.fillRect(propX, propY - 16, 1.6, 24);
        c.fillStyle = "#d97706";
        c.fillRect(propX - 1.4, propY - 18, 3.8, 2.4);
      } else if (npc.propInHand === "fan") {
        c.fillStyle = "#ca8a04";
        c.beginPath();
        c.moveTo(propX, propY);
        c.arc(propX, propY, 5.0, -Math.PI * 0.8, -Math.PI * 0.2);
        c.closePath();
        c.fill();
      }
    }

    // 10. Cabeça, Pescoço Anatômico e Rosto 100% Descoberto e Visível (headY = -22 - bob, raio 6.1px)
    const headX = 0;
    const headY = -22 - bob;

    // Pescoço de ligação anatômica normal
    c.fillStyle = npc.skinColor;
    c.fillRect(-2.2, headY + 3.2, 4.4, 3.0);

    // Cabelo traseiro (somente nas vistas de costas ou laterais para não sangrar atrás dos olhos no perfil frontal)
    if (w === "up") {
      c.fillStyle = npc.hairColor;
      c.beginPath();
      c.arc(headX, headY, 6.2, 0, Math.PI * 2);
      c.fill();
    } else if (w === "left") {
      // Lateral esquerda: nuca e cabelo atrás da cabeça
      c.fillStyle = npc.hairColor;
      c.fillRect(headX + 1.2, headY - 3.2, 4.6, 7.5);
    } else if (w === "right") {
      // Lateral direita: nuca e cabelo atrás da cabeça
      c.fillStyle = npc.hairColor;
      c.fillRect(headX - 5.8, headY - 3.2, 4.6, 7.5);
    }

    // Rosto com o tom de pele do morador (totalmente limpo e descoberto, sem cabelo escuro de fundo sob os olhos)
    c.fillStyle = npc.skinColor;
    c.beginPath();
    c.arc(headX, headY, 6.1, 0, Math.PI * 2);
    c.fill();

    // Topo do cabelo / franja natural (na coroa da cabeça e mechas laterais nas têmporas, acima dos olhos)
    c.fillStyle = npc.hairColor;
    c.beginPath();
    c.arc(headX, headY - 1.2, 6.2, Math.PI, 0);
    c.fill();

    if (w === "down") {
      // Mechas laterais nas têmporas e franja alta bem acima dos olhos (olhar 100% limpo)
      c.fillRect(headX - 6.2, headY - 4.0, 2.0, 5.0);
      c.fillRect(headX + 4.2, headY - 4.0, 2.0, 5.0);
      c.fillRect(headX - 2.8, headY - 4.8, 3.2, 1.8);
    } else if (w === "left") {
      c.fillRect(headX - 5.6, headY - 4.6, 2.8, 2.2);
    } else if (w === "right") {
      c.fillRect(headX + 2.8, headY - 4.6, 2.8, 2.2);
    }

    // 11. Coberturas de Cabeça Temáticas (sempre no topo da cabeça ou testa, NUNCA tampando o rosto)
    const hStyle = npc.headwearStyle;

    if (hStyle === 0) {
      // Turbante enrolado clássico no topo da cabeça (rosto 100% aberto)
      c.fillStyle = headwearColor;
      c.beginPath();
      c.ellipse(headX, headY - 2.6, 6.6, 4.6, 0, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = headwearTrim;
      c.fillRect(headX - 6.2, headY - 2.2, 12.4, 1.4);
      c.fillStyle = "#fbbf24";
      c.fillRect(headX - 1.0, headY - 3.8, 2.0, 2.2);
      c.fillStyle = headwearColor;
      c.fillRect(headX + (w === "left" ? 3.0 : -4.5), headY - 1.0, 2.2, 5.5);
    } else if (hStyle === 1) {
      // Shemagh / Keffiyeh com agal preto na coroa da cabeça (rosto 100% aberto)
      c.fillStyle = headwearColor;
      c.beginPath();
      c.moveTo(headX - 6.4, headY - 4.5);
      c.lineTo(headX + 6.4, headY - 4.5);
      c.lineTo(headX + 7.0, headY + 2.0);
      c.lineTo(headX - 7.0, headY + 2.0);
      c.closePath();
      c.fill();
      c.fillStyle = "#18181b";
      c.fillRect(headX - 5.8, headY - 3.2, 11.6, 1.4);
      c.fillRect(headX - 5.4, headY - 1.6, 10.8, 1.2);
      c.fillStyle = headwearColor;
      c.fillRect(headX - 7.0, headY, 2.0, 6.5);
      c.fillRect(headX + 5.0, headY, 2.0, 6.5);
    } else if (hStyle === 2) {
      // Turbante de Caravaneiro com broche de bronze (rosto 100% aberto, sem máscara nem véu)
      c.fillStyle = headwearColor;
      c.beginPath();
      c.ellipse(headX, headY - 2.5, 6.5, 4.4, 0, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = headwearTrim;
      c.fillRect(headX - 6.0, headY - 2.2, 12.0, 1.4);
      c.fillStyle = "#d97706";
      c.fillRect(headX - 1.2, headY - 3.6, 2.4, 2.2);
    } else if (hStyle === 3) {
      // Diadema solar dourada com xale nos ombros por trás (rosto 100% aberto)
      c.fillStyle = headwearColor;
      c.fillRect(headX - 6.0, headY - 2.4, 12.0, 1.4);
      c.fillStyle = headwearTrim;
      c.fillRect(headX - 1.0, headY - 2.8, 2.0, 2.0);
      c.fillStyle = headwearColor;
      c.fillRect(headX - 6.5, headY - 0.5, 1.8, 7.0);
      c.fillRect(headX + 4.7, headY - 0.5, 1.8, 7.0);
    } else if (hStyle === 4) {
      // Capuz aberto de viajante emoldurando o rosto (rosto 100% aberto)
      c.fillStyle = headwearColor;
      c.beginPath();
      c.arc(headX, headY - 1.0, 6.6, Math.PI * 0.9, Math.PI * 0.1);
      c.fill();
      c.fillStyle = headwearTrim;
      c.fillRect(headX - 5.6, headY - 2.4, 11.2, 1.4);
    } else if (hStyle === 5) {
      // Tiara de couro nobre com turquesa e tranças (rosto 100% aberto)
      c.fillStyle = "#78350f";
      c.fillRect(headX - 5.8, headY - 2.2, 11.6, 1.6);
      c.fillStyle = "#06b6d4";
      c.fillRect(headX - 3.0, headY - 2.0, 1.6, 1.2);
      c.fillRect(headX + 1.4, headY - 2.0, 1.6, 1.2);
      c.fillStyle = npc.hairColor;
      c.fillRect(headX - 6.2, headY, 1.8, 7.0);
      c.fillRect(headX + 4.4, headY, 1.8, 7.0);
      c.fillStyle = "#fbbf24";
      c.fillRect(headX - 6.2, headY + 6.0, 1.8, 1.2);
      c.fillRect(headX + 4.4, headY + 6.0, 1.8, 1.2);
    } else {
      // Bandana / faixa de linho do deserto na testa (rosto 100% aberto)
      c.fillStyle = headwearColor;
      c.fillRect(headX - 5.6, headY - 2.2, 11.2, 1.8);
      c.fillStyle = headwearTrim;
      c.fillRect(headX - 5.6, headY - 0.8, 11.2, 0.8);
    }

    // 12. Traços Faciais Nítidos e Expressivos (desenhados por cima, NUNCA cobertos)
    if (w !== "up") {
      if (isSleeping) {
        c.strokeStyle = "#171412";
        c.lineWidth = 1.0;
        c.beginPath();
        c.moveTo(headX - 3.2, headY + 0.4);
        c.lineTo(headX - 1.2, headY + 0.4);
        c.moveTo(headX + 1.2, headY + 0.4);
        c.lineTo(headX + 3.2, headY + 0.4);
        c.stroke();
      } else {
        const eyeOffset = w === "left" ? -1.2 : w === "right" ? 1.2 : 0;
        // Todos os habitantes do deserto possuem impressionantes olhos azuis (azul-celeste / especiaria do deserto)
        const eyeIrisColor = "#0284c7"; // Azul celeste vibrante
        const eyePupilColor = "#0369a1"; // Centro azul profundo
        const eyeHighlight = "#38bdf8"; // Brilho luminoso azul

        // Olho esquerdo (esclera branca, íris azul e brilho azul)
        c.fillStyle = "#ffffff";
        c.fillRect(headX - 3.2 + eyeOffset, headY - 0.2, 2.2, 1.8);
        c.fillStyle = eyeIrisColor;
        c.fillRect(headX - 2.6 + eyeOffset, headY + 0.1, 1.2, 1.2);
        c.fillStyle = eyePupilColor;
        c.fillRect(headX - 2.4 + eyeOffset, headY + 0.3, 0.8, 0.8);
        c.fillStyle = eyeHighlight;
        c.fillRect(headX - 2.6 + eyeOffset, headY + 0.1, 0.5, 0.5);

        // Olho direito (esclera branca, íris azul e brilho azul)
        c.fillStyle = "#ffffff";
        c.fillRect(headX + 1.0 + eyeOffset, headY - 0.2, 2.2, 1.8);
        c.fillStyle = eyeIrisColor;
        c.fillRect(headX + 1.4 + eyeOffset, headY + 0.1, 1.2, 1.2);
        c.fillStyle = eyePupilColor;
        c.fillRect(headX + 1.6 + eyeOffset, headY + 0.3, 0.8, 0.8);
        c.fillStyle = eyeHighlight;
        c.fillRect(headX + 1.4 + eyeOffset, headY + 0.1, 0.5, 0.5);

        // Sobrancelhas expressivas
        c.fillStyle = npc.hairColor;
        c.fillRect(headX - 3.4 + eyeOffset, headY - 1.2, 2.4, 0.7);
        c.fillRect(headX + 0.8 + eyeOffset, headY - 1.2, 2.4, 0.7);

        // Boca nítida e visível (sem nada tampando o rosto)
        c.fillStyle = "#78350f";
        c.fillRect(headX - 1.2 + eyeOffset * 0.5, headY + 2.4, 2.4, 0.8);

        // Leve rubor facial natural para vivacidade
        c.fillStyle = "rgba(225, 29, 72, 0.22)";
        c.fillRect(headX - 3.8 + eyeOffset, headY + 1.2, 1.8, 1.0);
        c.fillRect(headX + 2.0 + eyeOffset, headY + 1.2, 1.8, 1.0);

        // Barba aparada para alguns homens (sob o queixo, deixando a boca e rosto limpos)
        if (npc.gender === "m" && npc.headwearStyle % 2 === 1) {
          c.fillStyle = npc.hairColor;
          c.beginPath();
          c.arc(headX, headY + 4.2, 2.5, 0, Math.PI);
          c.fill();
        }
      }
    } else {
      // Vista traseira da cabeça (cabelo e nuca)
      c.fillStyle = npc.hairColor;
      c.beginPath();
      c.arc(headX, headY - 0.5, 6.2, 0, Math.PI * 2);
      c.fill();
    }

    // 12. Efeito zZz quando descansando na esteira à noite
    if (isSleeping) {
      const zFloat = (animTimer * 1.5 + npc.id) % 1;
      c.fillStyle = "#fde68a";
      c.font = "bold 9px sans-serif";
      c.textAlign = "center";
      c.fillText("z", 6, headY - 8 - zFloat * 12);
      c.font = "bold 11px sans-serif";
      c.fillText("Z", 12, headY - 14 - zFloat * 12);
    }

    // 13. Balão de fala idêntico aos soldados da neve (compacto, discreto e proporcional)
    if (npc.chatText && player && Math.hypot(player.x - npc.x, player.y - npc.y) < 250) {
      c.font = "bold 7.2px sans-serif";
      const text = npc.chatText;
      const tw = Math.min(210, Math.max(60, c.measureText(text).width + 12));
      const bx = -tw / 2;
      const by = headY - 25;

      // Caixa idêntica aos soldados da neve (fundo escuro militar, borda fina, 13px de altura)
      c.fillStyle = "rgba(9, 9, 11, 0.92)";
      c.strokeStyle = "#d97706";
      c.lineWidth = 1.2;
      c.beginPath();
      c.roundRect(bx, by, tw, 13, 4);
      c.fill();
      c.stroke();

      // Texto de fala limpo e centralizado (idêntico ao dos soldados da neve)
      c.fillStyle = "#f8fafc";
      c.textAlign = "center";
      c.fillText(text, 0, by + 9.2);
    }

    c.restore();
  }

  // Exporta a definição completa do módulo
  const DesertCity = {
    centerX: CITY_CX,
    centerY: CITY_CY,
    radius: CITY_RADIUS,
    biomeRadius: CITY_BIOME_RADIUS,
    houses: HOUSES,
    citizens: CITIZENS,
    toRunes,
    isCityTerritory,
    isCityBiomeArea,
    getHouseAt,
    getActiveHouseForPlayer,
    getCellAt,
    isDoorwayUsedByCitizen,
    interactWithNearbyCitizen,
    updateAndGetCitizenRenderItems,
  };

  G.DesertCity = DesertCity;
  window.DesertCity = DesertCity;
})(window.Game);
