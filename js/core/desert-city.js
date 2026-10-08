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
 * - Moradores de cores variadas (tons de pele variados: âmbar dourada, pêssego suave, canela,
 *   bronzeada, trigueira, morena profunda, castanho escuro e negra retinta).
 * - Roupas temáticas de deserto autênticas:
 *   * Túnicas fluidas (dishdasha / jalabiya / caftã) em linho branco do Saara, azul tuaregue,
 *     areia dourada/ocre, verde oásis, carmesim de caravana, terracota e açafrão solar.
 *   * Coberturas de cabeça temáticas: Turbantes volumosos enrolados, Shemagh/Keffiyeh com agal preto,
 *     Tagelmust tuaregue cobrindo queixo e boca, lenços fluidos femininos, capuzes de areia e tiaras de couro com turquesa.
 *   * Acessórios: odres de água a tiracolo, ânforas de cerâmica, cestos de tâmaras, cajados de pastor e leques de palha.
 * - Rotina viva de RPG:
 *   * De dia passeiam pelas dunas e espaços entre as casas, conversam entre si e abrem portas ao passar.
 *   * À noite retornam para suas respectivas casas para descansar sobre as esteiras de junco com efeito zZz!
 *   * Interação com o jogador através da tecla [F] com diálogos ricos e temáticos sobre as areias e oásis.
 */
"use strict";

window.Game = window.Game || {};

(function (G) {
  // Centro e raio territorial do Povoado do Deserto
  const CITY_CX = 520;
  const CITY_CY = 360;
  const CITY_RADIUS = 90;
  const CITY_BIOME_RADIUS = 750;

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
  // - Tons de pele variados de povos do deserto e caravaneiros.
  // - Cores de cabelo variadas (preto azeviche, castanho escuro, café, henna, grisalho).
  // - Roupas temáticas de deserto autênticas (túnicas dishdasha, jalabiya, caftãs,
  //   turbantes, shemaghs com agal, tagelmust tuaregue, véus fluidos, faixas e odres).
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

  // Paletas temáticas de trajes do deserto (Túnica longa, manto/xale, faixa/cinto, detalhes e cobertura)
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

  // Nomes e ocupações para os moradores das 17 casas (total: 28 moradores)
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

  // Frases de conversa entre moradores e para o jogador
  const CITIZEN_GREETINGS = [
    "Que a paz do deserto acompanhe os seus passos, viajante!",
    "O sol está ardente hoje, mas sob as paredes de adobe a sombra é sempre fresca e acolhedora.",
    "Nossas ânforas de cerâmica guardam água pura da nascente. Beba um gole antes de cruzar as dunas!",
    "As esteiras de junco dentro de casa são perfeitas para descansar e repor as energias.",
    "À noite, o vento do deserto fica gelado e as estrelas cobrem todo o firmamento em silêncio.",
    "Cuidado com as feras e escorpiões gigantes que rondam além das dunas da nossa aldeia!",
    "As tâmaras que colhemos esta manhã estão doces como mel. Prove quando quiser!",
    "Se sentir a poeira levantar, venha para dentro da casa de adobe e feche a porta de madeira.",
    "Viajantes contam histórias sobre antigas relíquias soterradas sob as areias douradas...",
    "Nossas túnicas largas protegem tanto do sol implacável quanto da areia trazida pelo vento.",
    "Bem-vindo à Aldeia das Areias Douradas! Aqui os forasteiros de bom coração encontram repouso.",
    "O segredo para viver no deserto é respeitar o silêncio da terra e não desperdiçar uma única gota d'água."
  ];

  const CITIZEN_CHATTER = [
    "Salam, vizinho! O vento hoje sopra calmo nas dunas.",
    "Já buscou sua ânfora de água fresca na nascente?",
    "O meio-dia passou, as sombras das casas logo vão se esticar.",
    "Gostei do tecido novo da sua túnica, muito leve e fresco!",
    "Vou verificar os potes de tâmaras em casa e já retorno para conversar.",
    "Que noite límpida teremos para contemplar as estrelas!",
    "Ouvi dizer que uma caravana de mercadores cruzará o oásis amanhã.",
    "Vou me recolher para a esteira assim que a lua despontar no céu."
  ];

  // Pontos de passeio orgânicos ao ar livre na aldeia do deserto (espaços livres entre as casas)
  const STROLL_DESTINATIONS = [
    // Área Central Aberta da Aldeia (praça natural de areia em torno do centro 520, 360)
    { relX:  -4, relY:  -4 },
    { relX:   4, relY:  -4 },
    { relX:  -4, relY:   3 },
    { relX:   4, relY:   3 },
    { relX:   0, relY:  -2 },
    { relX:   0, relY:   2 },
    { relX:  -8, relY:   0 },
    { relX:   8, relY:   0 },
    // Trilha Oeste (entre casas 1, 7, 11)
    { relX: -26, relY: -15 },
    { relX: -30, relY:  -2 },
    { relX: -27, relY:  14 },
    // Trilha Leste (entre casas 5, 9, 13)
    { relX:  20, relY: -15 },
    { relX:  26, relY:  -2 },
    { relX:  18, relY:  14 },
    // Trilha Norte (aberta nas dunas)
    { relX: -10, relY: -26 },
    { relX:  10, relY: -26 },
    // Trilha Sul (ao ar livre nas dunas do sul)
    { relX: -12, relY:  15 },
    { relX:   2, relY:  15 },
    { relX: -14, relY:  21 },
    { relX:   0, relY:  24 }
  ];

  let _citizensInitialized = false;
  const CITIZENS = [];
  const _activeDoorwayTimers = new Map(); // key: "tx,ty" -> remaining frames

  // Inicializa os 28 moradores distribuídos nas 17 casas
  function _initCitizens(tileSize) {
    if (_citizensInitialized) return;
    _citizensInitialized = true;
    const ts = tileSize || 36;
    let profileIdx = 0;

    for (let i = 0; i < HOUSES.length; i++) {
      const h = HOUSES[i];
      // Casas com halfW === 3 (casas 3, 6, 8, 12, 14, 17) e algumas outras têm 2 moradores; demais têm 1 ou 2
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

        // Pontos internos
        const matTx = h.cx - h.halfW + 1;
        const matTy = h.cy + (isSouthDoor ? -h.halfH + 1 : h.halfH - 1);
        const potsTx = h.cx + h.halfW - 1;
        const potsTy = h.cy + (isSouthDoor ? -h.halfH + 1 : h.halfH - 1);
        const hallTx = h.cx;
        const hallTy = h.cy + (isSouthDoor ? h.halfH - 0.9 : -h.halfH + 0.9);
        const centerTx = h.cx + (r === 0 ? -0.4 : 0.4);
        const centerTy = h.cy;

        // Variação rica de tons de pele e cabelo
        const skinColor = SKIN_TONES[(id * 3 + r * 5 + i) % SKIN_TONES.length];
        const hairColor = HAIR_COLORS[(id * 5 + r * 2 + i) % HAIR_COLORS.length];
        const outfit = OUTFIT_PALETTES[(id * 2 + r + i) % OUTFIT_PALETTES.length];
        const headwearStyle = prof.head !== undefined ? prof.head : ((id + i) % 7);
        const propInHand = prof.prop !== undefined ? prof.prop : ((id + i) % 4 === 0 ? "amphora" : null);
        const hasWaterSkin = prof.waterSkin !== undefined ? prof.waterSkin : ((id + r) % 2 === 0);

        // Começam parte fora passeando, parte dentro de casa descansando
        const startOutside = (id + r) % 3 !== 0;
        const startX = startOutside
          ? (h.cx + (r === 0 ? -1.5 : 1.5) + (Math.random() * 2 - 1) + 0.5) * ts
          : ((r === 0 ? matTx : centerTx) + 0.5) * ts;
        const startY = startOutside
          ? (outsideTy + (Math.random() * 1.5 - 0.75) + 0.5) * ts
          : ((r === 0 ? matTy : centerTy) + 0.5) * ts;

        const cit = {
          id,
          name: `${prof.name}, ${prof.title}`,
          shortName: prof.name,
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
      // Passear até um dos pontos de interesse abertos da aldeia
      const pt = STROLL_DESTINATIONS[Math.floor(Math.random() * STROLL_DESTINATIONS.length)];
      targetX = (CITY_CX + pt.relX + (Math.random() * 1.6 - 0.8) + 0.5) * ts;
      targetY = (CITY_CY + pt.relY + (Math.random() * 1.6 - 0.8) + 0.5) * ts;
    } else if (roll < 0.75) {
      // Passear perto de outra casa vizinha (na frente da porta, na sombra)
      const targetHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
      const isSouth = targetHouse.doorSide === "south";
      const outY = targetHouse.cy + (isSouth ? targetHouse.halfH + 1.8 : -targetHouse.halfH - 1.8);
      targetX = (targetHouse.cx + (Math.random() * 3 - 1.5) + 0.5) * ts;
      targetY = (outY + (Math.random() * 1 - 0.5) + 0.5) * ts;
    } else {
      // Pequeno passeio contemplativo nas dunas próximas
      const angle = Math.random() * Math.PI * 2;
      const distTiles = 8 + Math.random() * 22;
      targetX = (CITY_CX + Math.cos(angle) * distTiles + 0.5) * ts;
      targetY = (CITY_CY + Math.sin(angle) * distTiles + 0.5) * ts;
    }

    cit.waypoints = [
      // Ponto intermediário de transição se a rota for longa
      {
        x: (cit.x + targetX) * 0.5 + (Math.random() * 16 - 8),
        y: (cit.y + targetY) * 0.5 + (Math.random() * 16 - 8)
      },
      { x: targetX, y: targetY }
    ];
    cit.isMoving = true;
  }

  // Envia o morador de volta para sua casa de adobe (à noite para dormir na esteira ou de dia para descansar)
  function _sendDesertCitizenHome(cit, ts, forNight) {
    cit.state = forNight ? "returning_home_night" : "entering_house";
    cit.chatPartnerId = null;
    cit.chatText = "";
    cit.pauseTimer = 0;

    if (cit.isInsideHouse) {
      // Já está dentro: caminha para a esteira ou centro/potes
      const destTx = forNight ? cit.matTx : (Math.random() < 0.5 ? cit.potsTx : cit.centerTx);
      const destTy = forNight ? cit.matTy : (Math.random() < 0.5 ? cit.potsTy : cit.centerTy);
      cit.waypoints = [
        { x: (cit.hallTx + 0.5) * ts, y: (cit.hallTy + 0.5) * ts },
        { x: (destTx + 0.5) * ts, y: (destTy + 0.5) * ts }
      ];
      cit.isMoving = true;
      return;
    }

    // Está fora: caminha até em frente à porta, passa pela soleira, entra e vai para a esteira
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

  // Faz o morador sair de dentro de casa para passear nas areias
  function _sendDesertCitizenOutside(cit, ts) {
    cit.state = "exiting_house";
    cit.chatPartnerId = null;
    cit.chatText = "";
    cit.pauseTimer = 0;
    const isSouth = cit.house.doorSide === "south";
    const doorStepY = cit.doorTy + (isSouth ? 1.4 : -1.4);
    const outsideStrollY = cit.doorTy + (isSouth ? 3.0 : -3.0);

    cit.waypoints = [
      { x: (cit.hallTx + 0.5) * ts, y: (cit.hallTy + 0.5) * ts },
      { x: (cit.doorTx + 0.5) * ts, y: (cit.doorTy + 0.5) * ts, isDoorCrossing: true },
      { x: (cit.doorTx + 0.5) * ts, y: (doorStepY + 0.5) * ts, markOutside: true },
      { x: (cit.doorTx + 0.5) * ts, y: (outsideStrollY + 0.5) * ts, markOutside: true }
    ];
    cit.isMoving = true;
  }

  // Verifica se um morador está passando pela porta neste instante (para abrir a porta visualmente)
  function isDoorwayUsedByCitizen(tx, ty) {
    const exp = _activeDoorwayTimers.get(`${tx},${ty}`);
    return exp !== undefined && exp > 0;
  }

  // Interação do jogador com tecla [F] com um morador próximo
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

    const greetingLine = CITIZEN_GREETINGS[Math.floor(Math.random() * CITIZEN_GREETINGS.length)];
    best.chatText = greetingLine;
    best.state = best.isInsideHouse ? best.state : "interacting";
    best.stateTimer = 5.0;

    return {
      success: true,
      citizen: best,
      message: `💬 ${best.name} (Casa #${best.houseId}): "${greetingLine}"`,
    };
  }

  // Atualiza rotinas dos moradores e retorna itens prontos para renderização ordenados por Y
  function updateAndGetCitizenRenderItems(ctx, tileSize, player, timeOfDay, animTimer, viewLeft, viewRight, viewTop, viewBottom, isUnderground = false) {
    const ts = tileSize || 36;
    _initCitizens(ts);

    // Se o jogador estiver muito longe da Aldeia das Areias Douradas, não consome processamento
    if (player) {
      const distToCity = Math.hypot(player.x - CITY_CX * ts, player.y - CITY_CY * ts);
      if (distToCity > (CITY_RADIUS + 90) * ts) return [];
    }
    if (isUnderground) return [];

    // Decrementa timers de portas abertas pelos moradores
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

      // REGRA DA NOITE NO DESERTO: Ao anoitecer, todos voltam para casa descansar na esteira
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

      // Estado interagindo com o jogador
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

      // Pausa temporária
      if (c.pauseTimer > 0) {
        c.pauseTimer -= dt;
        c.isMoving = false;
        continue;
      }

      // Conversa entre moradores quando se cruzam nas areias
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
              // Viram um para o outro
              c.facing = c.x < other.x ? "right" : "left";
              other.facing = other.x < c.x ? "right" : "left";
              c.chatText = CITIZEN_CHATTER[Math.floor(Math.random() * CITIZEN_CHATTER.length)];
              break;
            }
          }
        }
      }

      // Estado de conversa mútua
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

      // Movimentação pelos waypoints
      if (c.waypoints && c.waypoints.length > 0) {
        const wp = c.waypoints[0];
        const dx = wp.x - c.x;
        const dy = wp.y - c.y;
        const dist = Math.hypot(dx, dy);

        // Abre a porta ao se aproximar da soleira
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
          // Passada em direção ao waypoint
          c.isMoving = true;
          c.walkPhase += 0.16;
          const step = Math.min(dist, c.speed);
          c.x += (dx / dist) * step;
          c.y += (dy / dist) * step;
          c.facing = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : (dy < 0 ? "up" : "down");
        }
      } else {
        // Sem waypoints ativos: gerencia transições de estado
        c.isMoving = false;
        c.stateTimer -= dt;

        if (c.stateTimer <= 0) {
          if (c.state === "inside_home") {
            // Se estiver de dia e dentro de casa, sai para passear ou muda de posição
            if (!isNight && Math.random() < 0.65) {
              _sendDesertCitizenOutside(c, ts);
            } else {
              // Anda para a esteira ou potes dentro de casa
              const destTx = Math.random() < 0.5 ? c.matTx : c.potsTx;
              const destTy = Math.random() < 0.5 ? c.matTy : c.potsTy;
              c.waypoints = [{ x: (destTx + 0.5) * ts, y: (destTy + 0.5) * ts }];
              c.isMoving = true;
              c.stateTimer = 4 + Math.random() * 6;
            }
          } else if (c.state === "strolling") {
            // Passeia para outro ponto ou entra em casa para beber água dos potes
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

    // Coleta os moradores visíveis na tela para renderização ordenada por Y
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

      // Se o morador está dentro de casa e o jogador NÃO está na mesma casa, o telhado de adobe esconde o morador
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
  // RENDERIZAÇÃO DETALHADA DO MORADOR DO DESERTO NO CANVAS
  // - Vista em 4 direções (down, up, left, right).
  // - Tons de pele e cabelos variados.
  // - Roupas temáticas de deserto autênticas (túnica longa drapeada, manto/xale,
  //   faixa larga, odre de água a tiracolo, sandálias de couro).
  // - Coberturas de cabeça (Turbante enrolado, Shemagh com agal, Tagelmust tuaregue,
  //   lenço fluido, capuz ou tiara de couro).
  // - Acessórios nas mãos (ânfora de cerâmica, cesto de tâmaras, cajado ou leque).
  // - Animações vivas de caminhada, respiração, gesticulação e sono na esteira.
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
        ? Math.sin(animTimer * 4 + npc.id) * 0.6
        : Math.sin(animTimer * 2 + npc.id) * 0.35;

    const pal = npc.outfit;
    const robeColor = pal.robe;
    const cloakColor = pal.cloak;
    const beltColor = pal.belt;
    const trimColor = pal.trim;
    const headwearColor = pal.headwear;
    const headwearTrim = pal.headwearTrim || trimColor;
    const sandalsColor = pal.sandals || "#5c2c16";

    // 1. Sombra suave oval no solo de areia
    c.fillStyle = "rgba(15, 23, 42, 0.35)";
    c.beginPath();
    c.ellipse(0, 2.5, 8.2, 4.4, 0, 0, Math.PI * 2);
    c.fill();

    // 2. Manto / Xale do Deserto nas costas (visível quando olhando para baixo ou lados)
    const capeSway = isMoving ? Math.cos(npc.walkPhase) * 1.6 : 0;
    if (w !== "up" && !isSleeping) {
      c.fillStyle = cloakColor;
      c.beginPath();
      c.roundRect(-8.5 + capeSway * 0.3, -15 - bob, 17, 15, 3);
      c.fill();
      // Faixa de acabamento inferior do manto
      c.fillStyle = trimColor;
      c.fillRect(-8.5 + capeSway * 0.3, -2 - bob, 17, 2);
    }

    // 3. Pernas e Sandálias de Couro com passada pendular
    const legMult = 2.6;
    const legSwingL = isMoving ? -walkSin * legMult : 0;
    const legSwingR = isMoving ? walkSin * legMult : 0;

    if (w === "up") {
      // Vista Traseira: pernas com calças de linho e sandálias
      c.fillStyle = "#e2e8f0";
      c.fillRect(-5.2, -3.5 + legSwingL, 3.8, 4.6);
      c.fillRect(1.4, -3.5 + legSwingR, 3.8, 4.6);
      // Sandálias de couro com tiras
      c.fillStyle = sandalsColor;
      c.fillRect(-5.2, 0.5 + legSwingL, 3.8, 3.6);
      c.fillRect(1.4, 0.5 + legSwingR, 3.8, 3.6);
      c.fillStyle = "#1c1917";
      c.fillRect(-5.2, 3.6 + legSwingL, 3.8, 1.2);
      c.fillRect(1.4, 3.6 + legSwingR, 3.8, 1.2);
    } else if (w === "down") {
      // Vista Frontal: pés com tiras trançadas de couro nas sandálias
      c.fillStyle = "#e2e8f0";
      c.fillRect(-5.2, -3.5 + legSwingL, 3.8, 4.6);
      c.fillRect(1.4, -3.5 + legSwingR, 3.8, 4.6);
      // Pele do peito do pé visível entre as tiras
      c.fillStyle = npc.skinColor;
      c.fillRect(-5.0, -1.0 + legSwingL, 3.4, 2.2);
      c.fillRect(1.6, -1.0 + legSwingR, 3.4, 2.2);
      // Tiras de couro da sandália
      c.fillStyle = sandalsColor;
      c.fillRect(-5.2, 0.5 + legSwingL, 3.8, 3.6);
      c.fillRect(1.4, 0.5 + legSwingR, 3.8, 3.6);
      c.fillStyle = "#1c1917";
      c.fillRect(-5.2, 3.6 + legSwingL, 3.8, 1.2);
      c.fillRect(1.4, 3.6 + legSwingR, 3.8, 1.2);
    } else {
      // Vista Lateral (left / right)
      const isLeft = w === "left";
      const leadLegSwing = isLeft ? legSwingL : legSwingR;
      const trailLegSwing = isLeft ? legSwingR : legSwingL;
      // Perna de trás
      c.fillStyle = sandalsColor;
      c.fillRect(-2.5 + trailLegSwing * 0.8, 0.5, 4.2, 4.0);
      c.fillStyle = "#1c1917";
      c.fillRect(-3.0 + trailLegSwing * 0.8, 3.8, 5.0, 1.2);
      // Perna da frente
      c.fillStyle = npc.skinColor;
      c.fillRect(-2.0 + leadLegSwing * 0.8, -1.5, 3.6, 2.4);
      c.fillStyle = sandalsColor;
      c.fillRect(-2.5 + leadLegSwing * 0.8, 0.5, 4.5, 3.8);
      c.fillStyle = "#1c1917";
      c.fillRect(-3.2 + leadLegSwing * 0.8, 3.8, 5.4, 1.2);
    }

    // 4. Túnica Longa de Deserto (Dishdasha / Jalabiya / Caftã)
    const skirtSway = isMoving ? walkSin * 1.0 : 0;
    c.fillStyle = robeColor;
    c.beginPath();
    c.moveTo(-7.5, -14 - bob);
    c.lineTo(7.5, -14 - bob);
    c.lineTo(8.5 + skirtSway, -1.5 - bob);
    c.lineTo(-8.5 + skirtSway, -1.5 - bob);
    c.closePath();
    c.fill();

    // Barra bordada decorativa na túnica
    c.fillStyle = trimColor;
    c.fillRect(-8.5 + skirtSway, -2.5 - bob, 17, 1.8);
    c.fillStyle = "rgba(0, 0, 0, 0.12)";
    c.fillRect(-8.5 + skirtSway, -0.7 - bob, 17, 0.9);

    // 5. Faixa de Cintura / Cinto Largo de Couro com fivela
    c.fillStyle = beltColor;
    c.fillRect(-7.2, -8.5 - bob, 14.4, 3.2);
    // Fivela de latão ou fita de tecido caindo
    c.fillStyle = trimColor;
    c.fillRect(-2.0, -8.5 - bob, 4.0, 3.2);
    c.fillStyle = "#fbbf24";
    c.fillRect(-1.0, -7.8 - bob, 2.0, 1.8);
    // Pontas da faixa pendendo na lateral
    c.fillStyle = beltColor;
    c.fillRect(2.8, -5.5 - bob, 2.2, 4.5);

    // 6. Odre de Água a Tiracolo (se o morador possuir)
    if (npc.hasWaterSkin && !isSleeping) {
      // Alça transversal de couro cruzando o peito
      c.fillStyle = "#451a03";
      c.beginPath();
      c.moveTo(-6.5, -14 - bob);
      c.lineTo(5.5, -5.5 - bob);
      c.lineTo(4.2, -4.5 - bob);
      c.lineTo(-7.5, -13 - bob);
      c.closePath();
      c.fill();
      // O odre oval no quadril
      c.fillStyle = "#78350f";
      c.beginPath();
      c.ellipse(6.2, -4.5 - bob, 3.2, 4.2, Math.PI / 6, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#b45309";
      c.fillRect(5.5, -9.0 - bob, 2.0, 2.0);
    }

    // 7. Manto Superior / Xale sobre os ombros
    if (!isSleeping) {
      c.fillStyle = cloakColor;
      if (w === "up") {
        c.beginPath();
        c.roundRect(-8.5, -16 - bob, 17, 12, 3);
        c.fill();
        c.fillStyle = trimColor;
        c.fillRect(-8.5, -5 - bob, 17, 1.5);
      } else {
        // Ombreiras e peitilho drapeado do manto
        c.beginPath();
        c.moveTo(-8.0, -15 - bob);
        c.lineTo(8.0, -15 - bob);
        c.lineTo(6.5, -7 - bob);
        c.lineTo(-6.5, -7 - bob);
        c.closePath();
        c.fill();
        c.fillStyle = trimColor;
        c.fillRect(-6.5, -7.5 - bob, 13, 1.2);
      }
    }

    // 8. Braços, Mangas Largas e Mãos
    const walkSwing = isMoving
      ? walkSin
      : isInteracting || isChatting
        ? Math.sin(animTimer * 5 + npc.id) * 0.4
        : 0;

    if (w === "left") {
      // Braço esquerdo visível à frente
      c.fillStyle = robeColor;
      c.fillRect(-5.5 + walkSwing * 1.5, -13 - bob, 3.8, 8.5);
      c.fillStyle = trimColor;
      c.fillRect(-5.5 + walkSwing * 1.5, -5 - bob, 3.8, 1.2);
      c.fillStyle = npc.skinColor;
      c.fillRect(-5.2 + walkSwing * 1.5, -3.8 - bob, 3.2, 3.0);
    } else if (w === "right") {
      // Braço direito visível à frente
      c.fillStyle = robeColor;
      c.fillRect(1.8 - walkSwing * 1.5, -13 - bob, 3.8, 8.5);
      c.fillStyle = trimColor;
      c.fillRect(1.8 - walkSwing * 1.5, -5 - bob, 3.8, 1.2);
      c.fillStyle = npc.skinColor;
      c.fillRect(2.0 - walkSwing * 1.5, -3.8 - bob, 3.2, 3.0);
    } else {
      // Frontal ou Costas: ambos os braços nas laterais
      // Braço Esquerdo
      c.fillStyle = robeColor;
      c.fillRect(-9.8 - walkSwing * 1.2, -13 - bob, 3.6, 8.5);
      c.fillStyle = trimColor;
      c.fillRect(-9.8 - walkSwing * 1.2, -5.0 - bob, 3.6, 1.2);
      c.fillStyle = npc.skinColor;
      c.fillRect(-9.5 - walkSwing * 1.2, -3.8 - bob, 3.0, 3.0);
      // Braço Direito
      c.fillStyle = robeColor;
      c.fillRect(6.2 + walkSwing * 1.2, -13 - bob, 3.6, 8.5);
      c.fillStyle = trimColor;
      c.fillRect(6.2 + walkSwing * 1.2, -5.0 - bob, 3.6, 1.2);
      c.fillStyle = npc.skinColor;
      c.fillRect(6.5 + walkSwing * 1.2, -3.8 - bob, 3.0, 3.0);
    }

    // 9. Acessórios na Mão (Ânfora, Cesto de Tâmaras, Cajado de Pastor ou Leque)
    if (npc.propInHand && !isSleeping && w !== "up") {
      const propX = w === "left" ? -7.5 : 8.5;
      const propY = -4.0 - bob;

      if (npc.propInHand === "amphora") {
        // Pequena ânfora de cerâmica de barro cozido com alça
        c.fillStyle = "#c2410c";
        c.beginPath();
        c.ellipse(propX, propY, 3.5, 4.5, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = "#9a3412";
        c.fillRect(propX - 1.5, propY - 6.0, 3.0, 2.0);
        // Gargalo e alça
        c.strokeStyle = "#7c2d12";
        c.lineWidth = 1.0;
        c.beginPath();
        c.arc(propX + 2.5, propY - 2.0, 2.2, 0, Math.PI * 2);
        c.stroke();
      } else if (npc.propInHand === "basket") {
        // Cesto de palha trançada com tâmaras escuras no topo
        c.fillStyle = "#b45309";
        c.beginPath();
        c.ellipse(propX, propY, 4.5, 3.2, 0, 0, Math.PI * 2);
        c.fill();
        // Tâmaras secas
        c.fillStyle = "#451a03";
        c.fillRect(propX - 3.0, propY - 3.8, 2.0, 2.0);
        c.fillRect(propX, propY - 4.2, 2.2, 2.0);
        c.fillRect(propX - 1.0, propY - 2.5, 2.0, 1.8);
      } else if (npc.propInHand === "staff") {
        // Cajado longo de madeira de pastor do deserto
        c.fillStyle = "#78350f";
        c.fillRect(propX, propY - 14, 1.6, 22);
        // Curvatura superior
        c.fillStyle = "#d97706";
        c.fillRect(propX - 1.5, propY - 16, 4.0, 2.4);
      } else if (npc.propInHand === "fan") {
        // Leque de palha trançada contra o calor do meio-dia
        c.fillStyle = "#ca8a04";
        c.beginPath();
        c.moveTo(propX, propY);
        c.arc(propX, propY, 5.0, -Math.PI * 0.8, -Math.PI * 0.2);
        c.closePath();
        c.fill();
      }
    }

    // 10. Cabeça, Rosto e Cabelo do Morador
    const headX = 0;
    const headY = -18 - bob;

    // Cabelo base (sob turbante ou à mostra)
    c.fillStyle = npc.hairColor;
    c.beginPath();
    c.arc(headX, headY, 5.8, 0, Math.PI * 2);
    c.fill();

    // Rosto (na cor da pele escolhida)
    c.fillStyle = npc.skinColor;
    c.beginPath();
    c.arc(headX, headY + 1.2, 4.8, 0, Math.PI * 2);
    c.fill();

    // Olhos e Expressão Facial
    if (w !== "up") {
      if (isSleeping) {
        // Olhinhos fechados dormindo
        c.strokeStyle = "#171412";
        c.lineWidth = 1.0;
        c.beginPath();
        c.moveTo(headX - 3.2, headY + 1.0);
        c.lineTo(headX - 1.2, headY + 1.0);
        c.moveTo(headX + 1.2, headY + 1.0);
        c.lineTo(headX + 3.2, headY + 1.0);
        c.stroke();
      } else {
        // Olhos vivos e expressivos
        const eyeOffset = w === "left" ? -1.2 : w === "right" ? 1.2 : 0;
        // Olho esquerdo
        c.fillStyle = "#ffffff";
        c.fillRect(headX - 3.2 + eyeOffset, headY + 0.5, 2.2, 1.8);
        c.fillStyle = "#171412";
        c.fillRect(headX - 2.6 + eyeOffset, headY + 0.8, 1.2, 1.2);
        // Olho direito
        c.fillStyle = "#ffffff";
        c.fillRect(headX + 1.0 + eyeOffset, headY + 0.5, 2.2, 1.8);
        c.fillStyle = "#171412";
        c.fillRect(headX + 1.4 + eyeOffset, headY + 0.8, 1.2, 1.2);

        // Sobrancelhas
        c.fillStyle = npc.hairColor;
        c.fillRect(headX - 3.4 + eyeOffset, headY - 0.5, 2.4, 0.7);
        c.fillRect(headX + 0.8 + eyeOffset, headY - 0.5, 2.4, 0.7);

        // Barba para alguns homens (se headwear for 1, 2 ou 6)
        if (npc.gender === "m" && npc.headwearStyle % 2 === 1) {
          c.fillStyle = npc.hairColor;
          c.beginPath();
          c.arc(headX, headY + 4.2, 2.8, 0, Math.PI);
          c.fill();
        }
      }
    }

    // 11. Cobertura de Cabeça Temática de Deserto
    const hStyle = npc.headwearStyle;

    if (hStyle === 0) {
      // TURBANTE ENROLADO CLÁSSICO: Tecido volumoso no topo com dobras em relevo
      c.fillStyle = headwearColor;
      c.beginPath();
      c.ellipse(headX, headY - 2.5, 6.8, 4.8, 0, 0, Math.PI * 2);
      c.fill();
      // Dobras e nó frontal do turbante
      c.fillStyle = headwearTrim;
      c.fillRect(headX - 6.5, headY - 2.0, 13.0, 1.6);
      c.fillStyle = "#fbbf24";
      c.fillRect(headX - 1.2, headY - 3.8, 2.4, 2.4);
      // Ponta do tecido caindo pelas costas/lado
      c.fillStyle = headwearColor;
      c.fillRect(headX + (w === "left" ? 3.5 : -4.5), headY - 1.0, 2.6, 6.0);
    } else if (hStyle === 1) {
      // SHEMAGH / KEFFIYEH COM AGAL PRETO: Pano drapeado cobrindo a cabeça e ombros
      c.fillStyle = headwearColor;
      c.beginPath();
      c.moveTo(headX - 6.8, headY - 4.5);
      c.lineTo(headX + 6.8, headY - 4.5);
      c.lineTo(headX + 7.5, headY + 4.5);
      c.lineTo(headX - 7.5, headY + 4.5);
      c.closePath();
      c.fill();
      // O Agal: cordão duplo preto tradicional fixando o lenço
      c.fillStyle = "#18181b";
      c.fillRect(headX - 6.0, headY - 3.2, 12.0, 1.4);
      c.fillRect(headX - 5.5, headY - 1.2, 11.0, 1.4);
      // Abas caídas sobre os ombros
      c.fillStyle = headwearColor;
      c.fillRect(headX - 7.5, headY + 1.0, 2.5, 7.5);
      c.fillRect(headX + 5.0, headY + 1.0, 2.5, 7.5);
    } else if (hStyle === 2) {
      // TAGELMUST TUAREGUE (O véu índigo que cobre a face inferior)
      c.fillStyle = headwearColor;
      c.beginPath();
      c.ellipse(headX, headY - 2.2, 6.6, 4.6, 0, 0, Math.PI * 2);
      c.fill();
      // Pano cobrindo queixo, boca e pescoço
      if (w !== "up") {
        c.fillStyle = headwearColor;
        c.fillRect(headX - 5.0, headY + 2.0, 10.0, 4.5);
        c.fillStyle = headwearTrim;
        c.fillRect(headX - 5.0, headY + 1.8, 10.0, 1.0);
      }
    } else if (hStyle === 3) {
      // LENÇO / VÉU FLUIDO DE LINHO FEMININO: Drapeado elegante caindo pelas costas
      c.fillStyle = headwearColor;
      c.beginPath();
      c.arc(headX, headY - 1.5, 6.2, Math.PI, 0);
      c.fill();
      c.fillRect(headX - 6.5, headY - 1.5, 13.0, 10.0);
      c.fillStyle = headwearTrim;
      c.fillRect(headX - 6.5, headY + 7.0, 13.0, 1.5);
    } else if (hStyle === 4) {
      // CAPUZ LEVE DO DESERTO
      c.fillStyle = headwearColor;
      c.beginPath();
      c.arc(headX, headY - 1.0, 6.6, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = headwearTrim;
      c.fillRect(headX - 5.5, headY + 2.0, 11.0, 2.0);
    } else if (hStyle === 5) {
      // TIARA DE COURO COM TURQUESA E TRANÇAS DO DESERTO
      c.fillStyle = "#78350f";
      c.fillRect(headX - 5.8, headY - 2.2, 11.6, 1.8);
      // Pedras de turquesa engastadas
      c.fillStyle = "#06b6d4";
      c.fillRect(headX - 3.0, headY - 2.0, 1.6, 1.4);
      c.fillRect(headX + 1.4, headY - 2.0, 1.6, 1.4);
      // Tranças laterais
      c.fillStyle = npc.hairColor;
      c.fillRect(headX - 6.2, headY, 2.0, 7.0);
      c.fillRect(headX + 4.2, headY, 2.0, 7.0);
      c.fillStyle = "#fbbf24";
      c.fillRect(headX - 6.2, headY + 6.0, 2.0, 1.2);
      c.fillRect(headX + 4.2, headY + 6.0, 2.0, 1.2);
    } else {
      // BANDANA / LENÇO DE TESTA COM CABELOS NATURAIS
      c.fillStyle = headwearColor;
      c.fillRect(headX - 5.5, headY - 2.0, 11.0, 2.0);
      c.fillStyle = headwearTrim;
      c.fillRect(headX - 5.5, headY - 0.5, 11.0, 0.8);
    }

    // 12. Efeito zZz quando descansando na esteira à noite
    if (isSleeping) {
      const zFloat = (animTimer * 1.5 + npc.id) % 1;
      c.fillStyle = "#fde68a";
      c.font = "bold 9px sans-serif";
      c.textAlign = "center";
      c.fillText("z", 6, -26 - zFloat * 12);
      c.font = "bold 11px sans-serif";
      c.fillText("Z", 12, -32 - zFloat * 12);
    }

    // 13. Balão de Diálogo de RPG sobre a cabeça (Interação [F] ou conversa entre moradores)
    if (npc.chatText && ((isInteracting && player && Math.hypot(player.x - npc.x, player.y - npc.y) < 280) || isChatting)) {
      const text = npc.chatText;
      c.font = "bold 10px 'Segoe UI', sans-serif";
      const metrics = c.measureText(text);
      const textWidth = Math.min(metrics.width, 240);
      const bubbleW = textWidth + 18;
      const bubbleH = 22;
      const bx = -bubbleW / 2;
      const by = -34 - bob;

      // Sombra do balão
      c.fillStyle = "rgba(0, 0, 0, 0.35)";
      c.beginPath();
      c.roundRect(bx + 1, by + 1, bubbleW, bubbleH, 6);
      c.fill();

      // Fundo pergaminho/âmbar translúcido temático do deserto
      c.fillStyle = "rgba(15, 23, 42, 0.92)";
      c.beginPath();
      c.roundRect(bx, by, bubbleW, bubbleH, 6);
      c.fill();

      // Borda dourada do deserto
      c.strokeStyle = "#f59e0b";
      c.lineWidth = 1.2;
      c.beginPath();
      c.roundRect(bx, by, bubbleW, bubbleH, 6);
      c.stroke();

      // Triângulo indicador apontando para a cabeça
      c.fillStyle = "rgba(15, 23, 42, 0.92)";
      c.beginPath();
      c.moveTo(-4, by + bubbleH);
      c.lineTo(0, by + bubbleH + 4);
      c.lineTo(4, by + bubbleH);
      c.closePath();
      c.fill();
      c.strokeStyle = "#f59e0b";
      c.beginPath();
      c.moveTo(-4, by + bubbleH);
      c.lineTo(0, by + bubbleH + 4);
      c.lineTo(4, by + bubbleH);
      c.stroke();

      // Texto do diálogo
      c.fillStyle = "#fef3c7";
      c.textAlign = "center";
      c.fillText(text, 0, by + 14.5);
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
