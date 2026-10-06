/* js/core/snow-peak-city.js
 * Vila Glacial das Alturas — Pequena Cidade no Bioma de Picos Gelados.
 *
 * Características obrigatórias:
 * - Localizada no bioma de Picos Gelados (BiomeId.SNOW_PEAK / Picos Glaciais).
 * - Ruas e praça pavimentadas com pedras de paralelepípedo (cobblestone).
 * - No mínimo 20 casas (possui 24 casas no total, numeradas de #1 a #24).
 * - Cada casa possui:
 *     1. Quarto (cama nórdica com peles quentes, criado-mudo e armário de roupas).
 *     2. Banheiro (tina de banho quente de madeira, lavatório e sanitário).
 *     3. Sala (lareira de pedra aconchegante com fogo ardente, poltrona e mesinha).
 *     4. Cozinha (fogão a lenha de ferro e pedra, bancada de preparo e despensa).
 *     5. Algumas casas possuem Sala e Cozinha integradas juntas (conceito aberto),
 *        enquanto outras possuem divisória interna separando-as.
 *     6. TODAS as casas possuem chaminé (com fumaça animada subindo ao ar frio da montanha).
 */
"use strict";

window.Game = window.Game || {};

(function (G) {
  // Centro e raio territorial da Cidade dos Picos Gelados (no coração do Bioma Gelado e Taiga Nevada)
  const CITY_CX = -380;
  const CITY_CY = -1220;
  const CITY_RADIUS = 96;

  // Coordenadas da Escadaria do Subsolo do Quartel Militar (liga a Ala da Prisão na superfície ao Subsolo de Tortura e Solitárias!)
  const BARRACKS_STAIR_TX = CITY_CX;      // relX === 0
  const BARRACKS_STAIR_TY = CITY_CY + 51; // relY === 51

  // Coordenadas da Grande Mina Profunda de Escavação ao lado de fora da Prisão (Leste do Quartel/Prisão)
  // Entrada em relX === 46, relY === 56 -> (CITY_CX + 46, CITY_CY + 56) = (-334, -1164)
  const PRISON_MINE_TX = CITY_CX + 46;
  const PRISON_MINE_TY = CITY_CY + 56;

  // =========================================================================
  // URBANISMO ORGÂNICO E ASSIMÉTRICO DA VILA GLACIAL (24 CASAS):
  // - Mistura casas geminadas (coladas umas nas outras) com casas separadas por
  //   BECOS ESTREITOS (alguns com saída para o norte/sul, outros becos sem saída!).
  // - As casas NÃO são todas alinhadas nem do mesmo tamanho:
  //   * Tamanhos variados: Chalés Compactos (halfW: 5, halfH: 5), Chalés Largos (halfW: 6, halfH: 5),
  //     Chalés Compridos (halfW: 5, halfH: 6) e Casarões Familiares de 2 Quartos (halfW: 7, halfH: 5 ou 6).
  //   * Alinhamento orgânico: recuos e avanços variados em Y, mas todas conectadas às
  //     Ruas Norte (relY = -12..-11) e Sul (relY = +11..+12) e à Praça Central!
  //   * Algumas casas possuem DOIS QUARTOS mobiliados (Quarto Principal + 2º Quarto de Hóspedes/Filhos).
  // =========================================================================
  const HOUSE_SPECS = [
    // --- QUARTEIRÃO NOROESTE (Lado Norte da Rua Norte, portas para o Sul) ---
    // Casa #1 (Casarão de 2 Quartos) -> Beco sem saída em X = -31..-30 -> Casas #2 e #3 geminadas -> Beco com saída em X = -8 -> Casa #4 (recuada)
    { relX: -39, relY: -18, halfW: 7, halfH: 5, doorOnSouth: true,  twoBedrooms: true,  openConcept: true  }, // [-46..-32], sul em -13
    { relX: -24, relY: -19, halfW: 5, halfH: 6, doorOnSouth: true,  twoBedrooms: false, openConcept: false }, // [-29..-19], sul em -13 (mais comprida!)
    { relX: -14, relY: -18, halfW: 5, halfH: 5, doorOnSouth: true,  twoBedrooms: false, openConcept: true  }, // [-19..-9],  sul em -13 (geminada na #2)
    // Beco com saída em X = -8
    { relX: -2,  relY: -19, halfW: 5, halfH: 5, doorOnSouth: true,  twoBedrooms: false, openConcept: false }, // [-7..+3],   sul em -14 (recuada 1 bloco!)

    // --- QUARTEIRÃO NORDESTE (Lado Norte da Rua Norte, portas para o Sul) ---
    // Passagem Norte da Praça em X = +4..+5 -> Casas #5 e #6 geminadas -> Beco sem saída em X = +28..+29 -> Casa #7 (2 Quartos)
    { relX: 11,  relY: -18, halfW: 5, halfH: 5, doorOnSouth: true,  twoBedrooms: false, openConcept: true  }, // [+6..+16],  sul em -13
    { relX: 21,  relY: -19, halfW: 6, halfH: 6, doorOnSouth: true,  twoBedrooms: true,  openConcept: false }, // [+15..+27 -> ajustado +16..+28: relX: 22, halfW: 6], geminada na #5!
    { relX: 37,  relY: -18, halfW: 7, halfH: 5, doorOnSouth: true,  twoBedrooms: true,  openConcept: true  }, // [+30..+44], sul em -13 (separada por beco sem saída em +29!)

    // --- QUARTEIRÃO CENTRO-OESTE (Lado Sul da Rua Norte, portas para o Norte + Coladas na Praça) ---
    // Casa #8 -> Beco com saída em X = -33..-32 -> Casas #9 (2 Quartos) e #10 geminadas coladas na Praça!
    { relX: -39, relY: -5,  halfW: 5, halfH: 5, doorOnSouth: false, twoBedrooms: false, openConcept: false }, // [-44..-34], norte em -10
    // Beco em X = -33..-32
    { relX: -24, relY: -4,  halfW: 7, halfH: 6, doorOnSouth: false, twoBedrooms: true,  openConcept: true  }, // [-31..-17], norte em -10 (Casarão 2 Quartos!)
    { relX: -11, relY: -5,  halfW: 6, halfH: 5, doorOnSouth: false, twoBedrooms: false, openConcept: false }, // [-17..-5],  norte em -10 (geminada na #9 e colada na Praça em X = -5!)

    // --- QUARTEIRÃO CENTRO-LESTE (Lado Sul da Rua Norte, portas para o Norte + Coladas na Praça) ---
    // Casa #11 colada na Praça -> Beco sem saída em X = +16..+17 -> Casas #12 e #13 (2 Quartos) geminadas!
    { relX: 10,  relY: -5,  halfW: 5, halfH: 5, doorOnSouth: false, twoBedrooms: false, openConcept: true  }, // [+5..+15],  norte em -10 (colada na Praça em X = +5!)
    // Beco sem saída em X = +16..+17
    { relX: 23,  relY: -4,  halfW: 5, halfH: 5, doorOnSouth: false, twoBedrooms: false, openConcept: false }, // [+18..+28], norte em -9 (recuada 1 bloco!)
    { relX: 35,  relY: -5,  halfW: 7, halfH: 5, doorOnSouth: false, twoBedrooms: true,  openConcept: true  }, // [+28..+42], norte em -10 (geminada na #12, 2 Quartos!)

    // --- QUARTEIRÃO CENTRO-SUL OESTE (Lado Norte da Rua Sul, portas para o Sul + Coladas na Praça) ---
    // Casas #14 e #15 geminadas -> Beco sem saída em X = -18..-17 -> Casa #16 (2 Quartos) colada na Praça!
    { relX: -38, relY: 5,   halfW: 5, halfH: 5, doorOnSouth: true,  twoBedrooms: false, openConcept: true  }, // [-43..-33], sul em +10
    { relX: -26, relY: 4,   halfW: 7, halfH: 6, doorOnSouth: true,  twoBedrooms: true,  openConcept: false }, // [-33..-19], sul em +10 (geminada na #14, 2 Quartos!)
    // Beco sem saída em X = -18..-17
    { relX: -11, relY: 5,   halfW: 6, halfH: 5, doorOnSouth: true,  twoBedrooms: true,  openConcept: true  }, // [-17..-5],  sul em +10 (colada na Praça em X = -5!)

    // --- QUARTEIRÃO CENTRO-SUL LESTE (Lado Norte da Rua Sul, portas para o Sul + Coladas na Praça) ---
    // Casas #17 e #18 geminadas coladas na Praça -> Beco com saída em X = +27..+28 -> Casa #19
    { relX: 10,  relY: 5,   halfW: 5, halfH: 5, doorOnSouth: true,  twoBedrooms: false, openConcept: false }, // [+5..+15],  sul em +10 (colada na Praça em X = +5!)
    { relX: 21,  relY: 6,   halfW: 5, halfH: 5, doorOnSouth: true,  twoBedrooms: false, openConcept: true  }, // [+16..+26], sul em +11 (avançada 1 bloco na rua, geminada na #17!)
    // Beco em X = +27..+28
    { relX: 36,  relY: 5,   halfW: 7, halfH: 5, doorOnSouth: true,  twoBedrooms: true,  openConcept: false }, // [+29..+43], sul em +10 (Casarão 2 Quartos!)

    // --- QUARTEIRÃO SUDOESTE (Lado Sul da Rua Sul, portas para o Norte) ---
    // Casa #20 -> Beco sem saída em X = -29..-28 -> Casas #21 (2 Quartos) e #22 geminadas!
    { relX: -36, relY: 18,  halfW: 6, halfH: 5, doorOnSouth: false, twoBedrooms: false, openConcept: true  }, // [-42..-30], norte em +13
    // Beco sem saída em X = -29..-28
    { relX: -20, relY: 19,  halfW: 7, halfH: 6, doorOnSouth: false, twoBedrooms: true,  openConcept: false }, // [-27..-13], norte em +13 (2 Quartos, mais funda!)
    { relX: -7,  relY: 18,  halfW: 5, halfH: 5, doorOnSouth: false, twoBedrooms: false, openConcept: true  }, // [-12..-2],  norte em +13 (geminada na #21!)

    // --- QUARTEIRÃO SUDESTE (Lado Sul da Rua Sul, portas para o Norte) ---
    // Passagem Sul da Praça em X = -1..+2 -> Casa #23 (recuada) -> Beco com saída em X = +16..+17 -> Casas #24 (2 Quartos) e #25 geminadas!
    { relX: 9,   relY: 19,  halfW: 6, halfH: 5, doorOnSouth: false, twoBedrooms: false, openConcept: false }, // [+3..+15],  norte em +14 (recuada 1 bloco!)
    // Beco com saída em X = +16..+17
    { relX: 25,  relY: 18,  halfW: 7, halfH: 5, doorOnSouth: false, twoBedrooms: true,  openConcept: true  }, // [+18..+32], norte em +13 (Casarão 2 Quartos!)
    { relX: 38,  relY: 19,  halfW: 5, halfH: 6, doorOnSouth: false, twoBedrooms: false, openConcept: false }, // [+33..+43], norte em +13 (geminada na #24!)
  ];

  // Corrige sobreposição exata da Casa #6 para compartilhar parede em X = +16 com a Casa #5
  HOUSE_SPECS[5].relX = 22;

  const HOUSES = HOUSE_SPECS.map((spec, idx) => {
    const id = idx + 1;
    const layoutDesc = spec.twoBedrooms
      ? `2 Quartos • ${spec.openConcept ? "Sala/Cozinha Integradas" : "Cômodos Separados"}`
      : spec.openConcept
        ? "Sala e Cozinha Integradas"
        : "Cômodos Separados";
    return {
      id,
      name: `Casa Glacial #${id} (${layoutDesc})`,
      cx: CITY_CX + spec.relX,
      cy: CITY_CY + spec.relY,
      relX: spec.relX,
      relY: spec.relY,
      halfW: spec.halfW,
      halfH: spec.halfH,
      openConcept: spec.openConcept,
      twoBedrooms: !!spec.twoBedrooms,
      doorOnSouth: spec.doorOnSouth,
    };
  });

  // =========================================================================
  // TELHADOS ALPINOS MILITARES 2.5D DO QUARTEL E PRISÃO (COBERTOS DE NEVE):
  // - Cada pavilhão coberto do Quartel Militar e da Prisão tem seu próprio telhado 2.5D
  //   (deixando apenas o Pátio de Execução com Forca a céu aberto!).
  // - Quando o jogador entra na Ala de Oficiais, na Ala de Descanso ou em qualquer um dos
  //   4 Pavilhões de Celas de Concentração (ou no Corredor da Prisão), o telhado daquele
  //   pavilhão fica invisível e volta ao sair!
  // =========================================================================
  const BARRACKS_ROOFS = [
    // 1. Ala Noroeste: Salas para Oficiais (relX: -36..-14, relY: 28..45) — portas para o Pátio Leste (relX = -14, relY = 33 e 41)
    {
      id: "barracks_officers_wing",
      isBarracksRoof: true,
      minTileX: CITY_CX - 36,
      maxTileX: CITY_CX - 14,
      minTileY: CITY_CY + 28,
      maxTileY: CITY_CY + 45,
      doorSide: "east",
      doorTilesY: [CITY_CY + 33, CITY_CY + 41],
      chimneyTileX: CITY_CX - 28,
      chimneyTileY: CITY_CY + 28,
      roofStyle: 0,
    },
    // 2. Ala Nordeste: Salas de Descanso para Oficiais (relX: 14..36, relY: 28..45) — portas para o Pátio Oeste (relX = 14, relY = 33 e 41)
    {
      id: "barracks_rest_wing",
      isBarracksRoof: true,
      minTileX: CITY_CX + 14,
      maxTileX: CITY_CX + 36,
      minTileY: CITY_CY + 28,
      maxTileY: CITY_CY + 45,
      doorSide: "west",
      doorTilesY: [CITY_CY + 33, CITY_CY + 41],
      chimneyTileX: CITY_CX + 28,
      chimneyTileY: CITY_CY + 28,
      roofStyle: 1,
    },
    // 3. Corredor Central Coberto da Prisão e Acesso à Escadaria do Subsolo (relX: -4..+4, relY: 46..74) — portão ao Norte (relY = 46, relX = 0)
    {
      id: "barracks_prison_corridor",
      isBarracksRoof: true,
      minTileX: CITY_CX - 4,
      maxTileX: CITY_CX + 4,
      minTileY: CITY_CY + 46,
      maxTileY: CITY_CY + 74,
      doorSide: "north",
      doorTileX: CITY_CX,
      roofStyle: 0,
    },
    // 4. Grande Cela Coletiva — Bloco I Noroeste (relX: -36..-4, relY: 46..60) — portão a Leste (relX = -4, relY = 53)
    {
      id: "barracks_cell_nw",
      isBarracksRoof: true,
      minTileX: CITY_CX - 36,
      maxTileX: CITY_CX - 4,
      minTileY: CITY_CY + 46,
      maxTileY: CITY_CY + 60,
      doorSide: "east",
      doorTilesY: [CITY_CY + 53],
      roofStyle: 2,
    },
    // 5. Grande Cela Coletiva — Bloco II Nordeste (relX: 4..36, relY: 46..60) — portão a Oeste (relX = 4, relY = 53)
    {
      id: "barracks_cell_ne",
      isBarracksRoof: true,
      minTileX: CITY_CX + 4,
      maxTileX: CITY_CX + 36,
      minTileY: CITY_CY + 46,
      maxTileY: CITY_CY + 60,
      doorSide: "west",
      doorTilesY: [CITY_CY + 53],
      roofStyle: 2,
    },
    // 6. Grande Cela Coletiva — Bloco III Sudoeste (relX: -36..-4, relY: 60..74) — portão a Leste (relX = -4, relY = 66)
    {
      id: "barracks_cell_sw",
      isBarracksRoof: true,
      minTileX: CITY_CX - 36,
      maxTileX: CITY_CX - 4,
      minTileY: CITY_CY + 60,
      maxTileY: CITY_CY + 74,
      doorSide: "east",
      doorTilesY: [CITY_CY + 66],
      roofStyle: 2,
    },
    // 7. Grande Cela Coletiva — Bloco IV Sudeste (relX: 4..36, relY: 60..74) — portão a Oeste (relX = 4, relY = 66)
    {
      id: "barracks_cell_se",
      isBarracksRoof: true,
      minTileX: CITY_CX + 4,
      maxTileX: CITY_CX + 36,
      minTileY: CITY_CY + 60,
      maxTileY: CITY_CY + 74,
      doorSide: "west",
      doorTilesY: [CITY_CY + 66],
      roofStyle: 2,
    },
  ];

  // Verifica se o tile está dentro do território da cidade
  function isCityTerritory(tx, ty) {
    const dx = tx - CITY_CX;
    const dy = ty - CITY_CY;
    return dx * dx + dy * dy <= CITY_RADIUS * CITY_RADIUS;
  }

  // Zona alpina ao redor da cidade: garante que o bioma de Picos Glaciais tenha no mínimo 2.100 blocos de diâmetro
  // (raio de 1.050 blocos ao redor do centro da cidade, totalizando 2.100 x 2.100 blocos contínuos!)
  function isCityBiomeArea(tx, ty) {
    const dx = tx - CITY_CX;
    const dy = ty - CITY_CY;
    const bufferRadius = 1050;
    return dx * dx + dy * dy <= bufferRadius * bufferRadius;
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

  // Retorna o ID da casa ou do pavilhão do Quartel/Prisão se o jogador estiver dentro dele
  function getActiveHouseForPlayer(px, py, tileSize) {
    const ts = tileSize || 36;
    const ptx = px / ts - 0.5;
    const pty = py / ts - 0.5;
    for (let i = 0; i < HOUSES.length; i++) {
      const h = HOUSES[i];
      const dx = Math.abs(ptx - h.cx);
      const dy = Math.abs(pty - h.cy);
      // Considera o interior da casa (incluindo a linha da porta quando o jogador pisa nela)
      if (dx <= h.halfW - 0.15 && dy <= h.halfH - 0.15) {
        return h.id;
      }
      // Se estiver exatamente no vão da porta entrando/saindo
      const doorY = h.cy + (h.doorOnSouth ? h.halfH : -h.halfH);
      if (Math.abs(ptx - h.cx) <= 0.65 && Math.abs(pty - doorY) <= 0.55) {
        return h.id;
      }
    }
    // Verifica se o jogador está dentro de um dos pavilhões cobertos do Quartel Militar e Prisão
    for (let j = 0; j < BARRACKS_ROOFS.length; j++) {
      const br = BARRACKS_ROOFS[j];
      if (
        ptx >= br.minTileX + 0.1 &&
        ptx <= br.maxTileX - 0.1 &&
        pty >= br.minTileY + 0.1 &&
        pty <= br.maxTileY - 0.1
      ) {
        return br.id;
      }
      // Verifica se está atravessando a porta/portão de entrada do pavilhão
      if (br.doorSide === "north" && Math.abs(ptx - br.doorTileX) <= 1.2 && Math.abs(pty - br.minTileY) <= 0.75) {
        return br.id;
      }
      if (br.doorSide === "east" && Math.abs(ptx - br.maxTileX) <= 0.75 && br.doorTilesY) {
        for (let k = 0; k < br.doorTilesY.length; k++) {
          if (Math.abs(pty - br.doorTilesY[k]) <= 0.85) return br.id;
        }
      }
      if (br.doorSide === "west" && Math.abs(ptx - br.minTileX) <= 0.75 && br.doorTilesY) {
        for (let k = 0; k < br.doorTilesY.length; k++) {
          if (Math.abs(pty - br.doorTilesY[k]) <= 0.85) return br.id;
        }
      }
    }
    return null;
  }

  // Retorna os dados arquitetônicos completos do bloco
  function getCellAt(tx, ty, interactedProps) {
    if (!isCityTerritory(tx, ty)) return null;

    const house = getHouseAt(tx, ty);
    const tileKey = `${tx},${ty}`;
    const intState =
      interactedProps && interactedProps.get
        ? interactedProps.get(tileKey) || {}
        : {};

    // 1. DENTRO DE UMA DAS 24 CASAS
    if (house) {
      const rx = tx - house.cx;
      const ry = ty - house.cy;
      const W = house.halfW;
      const H = house.halfH;
      const isSouthDoor = house.doorOnSouth;
      const doorY = isSouthDoor ? H : -H;
      const doorX = 0;
      const openConcept = house.openConcept;
      const houseId = house.id;

      // Parede externa oposta à porta (onde fica a chaminé exterior no telhado)
      const chimneyWallY = isSouthDoor ? -H : H;
      const chimneyWallX = 3;

      // 1.1 Porta frontal da casa (interativa com E / clique)
      if (ry === doorY && rx === doorX) {
        const isDoorOpen = !!intState.opened;
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "door",
          roomName: `Porta da Casa Glacial #${houseId}`,
          isDoor: true,
          isDoorOpen: isDoorOpen,
          isWall: false,
          openConcept,
          prop: {
            kind: "snow_city_door",
            houseIndex: houseId,
            opened: isDoorOpen,
            interactive: true,
            namePt: isDoorOpen
              ? `Porta Aberta (Casa Glacial #${houseId})`
              : `Porta de Carvalho e Ferro (Casa Glacial #${houseId})`,
            descriptionPt: isDoorOpen
              ? "Porta de madeira com batente de pedra aberta. Pressione [E] para fechar."
              : "Porta reforçada com ferragens de ferro e isolamento contra o vento dos picos. Pressione [E] para abrir ou fechar!",
          },
        };
      }

      // 1.2 Chaminé Exterior (em TODAS as 24 casas!)
      if (ry === chimneyWallY && rx === chimneyWallX) {
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "chimney",
          roomName: `Chaminé de Pedra da Casa Glacial #${houseId}`,
          isWall: true,
          isChimney: true,
          openConcept,
          prop: {
            kind: "snow_city_chimney",
            houseIndex: houseId,
            interactive: true,
            namePt: `Chaminé Fumegante da Casa #${houseId}`,
            descriptionPt:
              "Chaminé robusta de pedras da montanha elevando-se acima do telhado nevado, expelindo fumaça aquecida que mantém o chalé aquecido.",
          },
        };
      }

      // 1.3 Paredes externas da casa
      if (Math.abs(rx) === W || Math.abs(ry) === H) {
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "wall",
          roomName: `Parede Externa da Casa #${houseId}`,
          isWall: true,
          openConcept,
          prop: {
            kind: "snow_city_wall",
            subType: 0,
            wallHeightState: 0,
            namePt: `Parede de Pedra da Casa #${houseId}`,
            descriptionPt:
              "Paredes maciças de pedra da montanha com vigas de carvalho e telhado com beiral nevado 2.5D.",
          },
        };
      }

      // =====================================================================
      // 1.4 INTERIOR DA CASA (9x9 blocos):
      // - Quarto (cama, criado-mudo, cômoda)
      // - Banheiro (tina/banheira quente, lavatório, sanitário)
      // - Sala (lareira com fogo crepitante, poltrona, mesinha)
      // - Cozinha (fogão a lenha, bancada de preparo, armário de despensa)
      // - Sala e Cozinha juntas (conceito aberto) ou com divisória interna
      // =====================================================================

      // Orientação conforme a porta de entrada
      const northSide = isSouthDoor;

      // Divisória Oeste-Leste (separa ala íntima: quarto/banheiro da ala social: sala/cozinha)
      if (rx === -1) {
        // Vão de porta do Quarto (norte) e do Banheiro (sul)
        const isBedroomDoorway = northSide ? ry === -2 : ry === 2;
        const isBathroomDoorway = northSide ? ry === 2 : ry === -2;
        if (!isBedroomDoorway && !isBathroomDoorway) {
          return {
            isSnowCity: true,
            houseIndex: houseId,
            role: "wall",
            roomName: `Divisória Interna da Casa #${houseId}`,
            isWall: true,
            openConcept,
            prop: {
              kind: "snow_city_wall",
              subType: 1,
              wallHeightState: 0,
              namePt: "Parede Divisória de Madeira e Pedra",
            },
          };
        }
      }

      // Divisória entre Quarto e Banheiro no lado Oeste (rx <= -1, ry === 0)
      if (rx <= -1 && ry === 0) {
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "wall",
          roomName: `Parede do Quarto / Banheiro #${houseId}`,
          isWall: true,
          openConcept,
          prop: {
            kind: "snow_city_wall",
            subType: 1,
            wallHeightState: 0,
            namePt: "Divisória Acústica de Madeira Nobre",
          },
        };
      }

      // Divisória entre Sala e Cozinha (apenas nas casas NÃO integradas, ry === 0, rx >= 0)
      if (!openConcept && rx >= 0 && ry === 0) {
        // Vão de passagem entre Sala e Cozinha em rx === 1
        if (rx !== 1) {
          return {
            isSnowCity: true,
            houseIndex: houseId,
            role: "wall",
            roomName: `Divisória da Sala e Cozinha #${houseId}`,
            isWall: true,
            openConcept,
            prop: {
              kind: "snow_city_wall",
              subType: 1,
              wallHeightState: 0,
              namePt: "Parede Divisória da Sala e Cozinha",
            },
          };
        }
      }

      // --- 1.4.1 CÔMODO: QUARTO (Oeste-Norte se northSide, Oeste-Sul se southSide) ---
      const inBedroom = northSide
        ? rx <= -2 && ry <= -1
        : rx <= -2 && ry >= 1;

      if (inBedroom) {
        const roomName = `Quarto Aconchegante da Casa #${houseId}`;
        const bedCoord = northSide ? (rx === -3 && ry === -3) : (rx === -3 && ry === 3);
        const nightstandCoord = northSide ? (rx === -2 && ry === -4) : (rx === -2 && ry === 4);
        const wardrobeCoord = northSide ? (rx === -4 && ry === -2) : (rx === -4 && ry === 2);

        if (bedCoord) {
          return {
            isSnowCity: true,
            houseIndex: houseId,
            role: "house_floor",
            roomName,
            openConcept,
            prop: {
              kind: "snow_city_bed",
              interactive: true,
              namePt: "Cama Nórdica de Casal com Peles de Inverno",
              descriptionPt:
                "Cama macia de madeira esculpida com cobertores grossos de lã e forro de pele de carneiro para descansar e se proteger do frio.",
            },
          };
        }
        if (nightstandCoord) {
          return {
            isSnowCity: true,
            houseIndex: houseId,
            role: "house_floor",
            roomName,
            openConcept,
            prop: {
              kind: "snow_city_nightstand",
              interactive: true,
              namePt: "Criado-Mudo com Vela de Cera de Abelha",
              descriptionPt: "Mesa de cabeceira com castiçal aceso e gavetas de madeira.",
            },
          };
        }
        if (wardrobeCoord) {
          return {
            isSnowCity: true,
            houseIndex: houseId,
            role: "house_floor",
            roomName,
            openConcept,
            prop: {
              kind: "snow_city_wardrobe",
              interactive: true,
              namePt: "Armário de Carvalho para Roupas de Lã",
              descriptionPt: "Cômoda espaçosa guardando casacos quentes, botas forradas e mantas.",
            },
          };
        }
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "house_floor",
          roomName,
          openConcept,
        };
      }

      // --- 1.4.2 CÔMODO: BANHEIRO (Oeste-Sul se northSide, Oeste-Norte se southSide) ---
      const inBathroom = northSide
        ? rx <= -2 && ry >= 1
        : rx <= -2 && ry <= -1;

      if (inBathroom) {
        const roomName = `Banheiro Aquecido da Casa #${houseId}`;
        const tubCoord = northSide ? (rx === -3 && ry === 3) : (rx === -3 && ry === -3);
        const sinkCoord = northSide ? (rx === -4 && ry === 2) : (rx === -4 && ry === -2);
        const toiletCoord = northSide ? (rx === -2 && ry === 4) : (rx === -2 && ry === -4);

        if (tubCoord) {
          return {
            isSnowCity: true,
            houseIndex: houseId,
            role: "house_floor",
            roomName,
            openConcept,
            prop: {
              kind: "snow_city_bathtub",
              interactive: true,
              namePt: "Tina de Imersão Aquecida de Madeira",
              descriptionPt:
                "Banheira rústica de cedro com aros de ferro cheia de água quente perfumada com folhas de pinheiro para um banho relaxante nos picos gelados.",
            },
          };
        }
        if (sinkCoord) {
          return {
            isSnowCity: true,
            houseIndex: houseId,
            role: "house_floor",
            roomName,
            openConcept,
            prop: {
              kind: "snow_city_sink",
              interactive: true,
              namePt: "Lavatório de Pedra Polida com Espelho",
              descriptionPt: "Pia de pedra esculpida com jarro d'água de cobre e toalha limpa.",
            },
          };
        }
        if (toiletCoord) {
          return {
            isSnowCity: true,
            houseIndex: houseId,
            role: "house_floor",
            roomName,
            openConcept,
            prop: {
              kind: "snow_city_toilet",
              interactive: true,
              namePt: "Sanitário com Assento Aquecido de Madeira",
              descriptionPt: "Lavabo discreto de madeira tratada com fechamento higiênico.",
            },
          };
        }
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "house_floor",
          roomName,
          openConcept,
        };
      }

      // --- 1.4.3 CÔMODO: SALA E COZINHA (Lado Leste, rx >= 0) ---
      const inLivingArea = northSide ? ry <= -1 : ry >= 1;
      const roomBaseName = openConcept
        ? `Sala de Estar e Cozinha Integradas da Casa #${houseId}`
        : inLivingArea
          ? `Sala de Estar Aconchegante da Casa #${houseId}`
          : `Cozinha com Fogão a Lenha da Casa #${houseId}`;

      // Lareira na Sala (conectada à Chaminé na parede externa!)
      const fireplaceCoord = northSide ? (rx === 3 && ry === -4) : (rx === 3 && ry === 4);
      // Sofá / poltrona da sala
      const sofaCoord = northSide ? (rx === 2 && ry === -2) : (rx === 2 && ry === 2);
      // Mesinha de centro da sala
      const tableCoord = northSide ? (rx === 1 && ry === -2) : (rx === 1 && ry === 2);

      // Fogão a lenha na Cozinha
      const stoveCoord = northSide ? (rx === 3 && ry === 3) : (rx === 3 && ry === -3);
      // Bancada de preparo de alimentos
      const counterCoord = northSide ? (rx === 2 && ry === 4) : (rx === 2 && ry === -4);
      // Armário de despensa / prateleiras
      const pantryCoord = northSide ? (rx === 4 && ry === 2) : (rx === 4 && ry === -2);

      if (fireplaceCoord) {
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "house_floor",
          roomName: roomBaseName,
          openConcept,
          prop: {
            kind: "snow_city_fireplace",
            interactive: true,
            namePt: "Lareira de Pedra da Montanha com Fogo Ardente",
            descriptionPt:
              "Lareira rústica de pedras assentadas crepitando com lenha de pinheiro, aquecendo todo o chalé. A fumaça sobe diretamente pela chaminé!",
          },
        };
      }

      if (sofaCoord) {
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "house_floor",
          roomName: roomBaseName,
          openConcept,
          prop: {
            kind: "snow_city_sofa",
            interactive: true,
            namePt: "Sofá Acolchoado com Mantas de Lã",
            descriptionPt: "Assento confortável em frente à lareira para relaxar após longas caminhadas na neve.",
          },
        };
      }

      if (tableCoord) {
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "house_floor",
          roomName: roomBaseName,
          openConcept,
          prop: {
            kind: "snow_city_table",
            interactive: true,
            namePt: "Mesa de Centro com Caneca de Chá Quente",
            descriptionPt: "Pequena mesa de pinheiro polido com bebidas quentes e livro de crônicas.",
          },
        };
      }

      if (stoveCoord) {
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "house_floor",
          roomName: roomBaseName,
          openConcept,
          prop: {
            kind: "snow_city_stove",
            interactive: true,
            namePt: "Fogão a Lenha e Forno de Pedra",
            descriptionPt:
              "Fogão de ferro fundido com chapa quente e chaleira de cobre soltando vapor aromático de ensopado.",
          },
        };
      }

      if (counterCoord) {
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "house_floor",
          roomName: roomBaseName,
          openConcept,
          prop: {
            kind: "snow_city_counter",
            interactive: true,
            namePt: "Bancada Culinária com Facas e Temperos",
            descriptionPt: "Mesa de preparo com tábua de cortar pão, faca de caça e ervas alpinas secas.",
          },
        };
      }

      if (pantryCoord) {
        return {
          isSnowCity: true,
          houseIndex: houseId,
          role: "house_floor",
          roomName: roomBaseName,
          openConcept,
          prop: {
            kind: "snow_city_pantry",
            interactive: true,
            namePt: "Prateleiras de Despensa com Mantimentos de Inverno",
            descriptionPt: "Potes de cerâmica com geleias, carnes curadas, farinha e nozes armazenadas.",
          },
        };
      }

      // Piso livre da sala / cozinha / corredor interno
      return {
        isSnowCity: true,
        houseIndex: houseId,
        role: "house_floor",
        roomName: roomBaseName,
        openConcept,
      };
    }

    // =====================================================================
    // 2. FORA DAS CASAS: PRAÇA CENTRAL COMPACTA E REDE DE RUAS CONECTADAS
    // =====================================================================
    const relX = tx - CITY_CX;
    const relY = ty - CITY_CY;
    const absX = Math.abs(relX);
    const absY = Math.abs(relY);

    // 2.1 Praça Central da Cidade dos Picos Gelados (9x9 blocos: |relX| <= 4 e |relY| <= 4,
    //     com as casas internas coladas exatamente ao lado da praça em |relX| = 5!)
    const inCentralPlaza = absX <= 4 && absY <= 4;
    if (inCentralPlaza) {
      // Fogueira da Praça (no centro exato, metade do tamanho colossal anterior, com colisor!)
      if (relX === 0 && relY === 0) {
        return {
          isSnowCity: true,
          role: "plaza",
          roomName: "Fogueira da Praça dos Picos Gelados",
          isMonument: true,
          isCollider: true,
          isWall: false,
          prop: {
            kind: "snow_city_monument",
            scale: 1.2,
            interactive: true,
            namePt: "Fogueira da Praça dos Picos Gelados",
            descriptionPt:
              "Fogueira central de pedras da montanha e toras de pinheiro ardendo no coração da praça, aquecendo os bancos ao redor.",
          },
        };
      }

      // Bancos de madeira e ferro ao redor da Fogueira (Norte, Sul, Leste, Oeste em distância 2)
      const isNorthBench = relY === -2 && absX <= 1;
      const isSouthBench = relY === 2 && absX <= 1;
      const isWestBench = relX === -2 && absY <= 1;
      const isEastBench = relX === 2 && absY <= 1;

      if (isNorthBench || isSouthBench || isWestBench || isEastBench) {
        const isVerticalBench = isWestBench || isEastBench;
        return {
          isSnowCity: true,
          role: "plaza",
          roomName: "Banco da Praça dos Picos Gelados",
          isCollider: true,
          isWall: false,
          prop: {
            kind: "snow_city_bench",
            subType: isVerticalBench ? 1 : 0,
            benchFacing: isNorthBench
              ? "south"
              : isSouthBench
                ? "north"
                : isWestBench
                  ? "east"
                  : "west",
            interactive: true,
            namePt: "Banco da Praça Aquecido pela Fogueira",
            descriptionPt:
              "Banco robusto de tábuas de carvalho e braços de ferro forjado, posicionado de frente para a fogueira da praça. Pressione [F] para sentar e descansar!",
          },
        };
      }

      // Postes de lampião nos quatro cantos da praça (|relX| === 3 e |relY| === 3)
      if (absX === 3 && absY === 3) {
        return {
          isSnowCity: true,
          role: "plaza",
          roomName: "Lampião da Praça Central",
          isCollider: true,
          isWall: false,
          prop: {
            kind: "snow_city_lamppost",
            interactive: true,
            namePt: "Poste de Ferro Forjado com Lampião Âmbar",
            descriptionPt: "Lampião com queima de óleo alpino e vidro bisotado que dissipa a neblina gelada.",
          },
        };
      }

      return {
        isSnowCity: true,
        role: "plaza",
        roomName: "Praça Central dos Picos Gelados",
      };
    }

    // 2.2 RUAS COM CASAS DOS DOIS LADOS, BECOS COM SAÍDA E BECOS SEM SAÍDA:
    // - Rua Norte (relY = -12 e -11) e Rua Sul (relY = +11 e +12), percorrendo toda a vila (X = -45 até +44)
    const isMainDualSidedStreet = (absY === 11 || absY === 12) && relX >= -45 && relX <= 44;

    // - Passagens da Praça para as Ruas Norte e Sul:
    //   * Ao Norte da Praça: passagem deslocada em X = 4..5 (entre a Casa #4 em X = -7..+3 e a Casa #5 em X = +6..+16)
    //     e também acesso direto pelo vão central da Praça (X = -4..+4, Y = -10..-5)!
    const isNorthPlazaConnector =
      (relY >= -12 && relY <= -5 && relX >= -4 && relX <= 4) ||
      (relY >= -24 && relY <= -11 && (relX === 4 || relX === 5));

    //   * Ao Sul da Praça: passagem em X = -1..+2 que atravessa desde a Praça até o Portão do Quartel Militar (Y = +5..+28)!
    const isSouthPlazaConnector =
      (relY >= 5 && relY <= 12 && relX >= -4 && relX <= 4) ||
      (relY >= 11 && relY <= 28 && relX >= -2 && relX <= 2);

    // =====================================================================
    // 3. GRANDE QUARTEL MILITAR E PRISÃO DE CONCENTRAÇÃO (relX in [-36..+36], relY in [28..74])
    // Inclui:
    //   - Entrada Fortificada e Portão do Quartel (relY === 28)
    //   - Salas para Oficiais (Ala Noroeste: Gabinete do Comandante, Sala de Estratégia e Interrogatório)
    //   - Salas de Descanso para Oficiais (Ala Nordeste: Dormitório Oficial, Salão de Jogos/Lareira e Refeitório)
    //   - Pátio Central de Execução com Forca (relX in [-13..+13], relY in [30..45], Palanque + Forca no centro)
    //   - Ala de Prisão com 4 Grandes Celas Coletivas tipo Campo de Concentração (relY in [46..74])
    //   - Escadaria para o Subsolo da Prisão em (relX === 0, relY === 51) levando à Sala de Tortura e Solitárias!
    // =====================================================================
    if (relX >= -36 && relX <= 36 && relY >= 28 && relY <= 74) {
      // 3.1 MURALHA EXTERNA PERIMETRAL DO QUARTEL E PRISÃO
      const isOuterPerimeter =
        relX === -36 || relX === 36 || relY === 28 || relY === 74;

      if (isOuterPerimeter) {
        // Portão Principal do Quartel ao Norte (relY === 28, relX in [-1, 0, 1])
        if (relY === 28 && Math.abs(relX) <= 1) {
          if (relX === 0) {
            const isGateOpen = intState.opened !== undefined ? !!intState.opened : true;
            return {
              isSnowCity: true,
              role: "door",
              roomName: "Portão Principal do Quartel e Prisão Glacial",
              isDoor: true,
              isDoorOpen: isGateOpen,
              isWall: false,
              prop: {
                kind: "snow_city_door",
                opened: isGateOpen,
                interactive: true,
                namePt: isGateOpen
                  ? "Portão Fortificado do Quartel (Aberto)"
                  : "Portão Fortificado do Quartel (Fechado)",
                descriptionPt:
                  "Portão monumental de carvalho e barras de aço que dá acesso ao Grande Quartel Militar, Pátio da Forca e Prisão. Pressione [F] para abrir ou fechar.",
              },
            };
          }
          // Guaritas laterais da entrada com alabardas
          return {
            isSnowCity: true,
            role: "plaza",
            roomName: "Entrada do Quartel Militar",
          };
        }

        // Chaminés nas paredes externas das Salas dos Oficiais
        if (relY === 28 && (relX === -28 || relX === 28)) {
          return {
            isSnowCity: true,
            role: "chimney",
            roomName: "Chaminé do Quartel dos Oficiais",
            isWall: true,
            isChimney: true,
            prop: {
              kind: "snow_city_chimney",
              interactive: true,
              namePt: "Chaminé da Ala de Oficiais do Quartel",
              descriptionPt: "Chaminé militar aquecendo os gabinetes e salas de descanso dos oficiais.",
            },
          };
        }

        return {
          isSnowCity: true,
          role: "wall",
          roomName: "Muralha Fortificada do Quartel e Prisão",
          isWall: true,
          prop: {
            kind: "snow_city_wall",
            subType: 0,
            wallHeightState: 0,
            namePt: "Muralha Militar de Cantaria e Ferro",
            descriptionPt:
              "Muralha espessa de granito glacial reforçada com vigas e sentinelas que cerca o complexo do Quartel e Prisão.",
          },
        };
      }

      // 3.2 ALA NOROESTE: SALAS PARA OFICIAIS (relX in [-35..-14], relY in [29..45])
      if (relX >= -35 && relX <= -14 && relY >= 29 && relY <= 45) {
        // Parede Leste da Ala de Oficiais (separa do Pátio de Execução em relX === -14)
        if (relX === -14) {
          // Portas para o Pátio em relY === 33 e relY === 41
          if (relY === 33 || relY === 41) {
            const isDoorOpen = intState.opened !== undefined ? !!intState.opened : true;
            return {
              isSnowCity: true,
              role: "door",
              roomName: "Porta da Ala de Comando dos Oficiais",
              isDoor: true,
              isDoorOpen: isDoorOpen,
              isWall: false,
              prop: {
                kind: "snow_city_door",
                doorVertical: true,
                opened: isDoorOpen,
                interactive: true,
                namePt: isDoorOpen
                  ? "Porta da Ala de Oficiais (Aberta)"
                  : "Porta da Ala de Oficiais (Fechada)",
                descriptionPt: "Porta militar reforçada de carvalho e ferro que conecta o Pátio de Execução às Salas de Comando dos Oficiais.",
              },
            };
          }
          return {
            isSnowCity: true,
            role: "wall",
            roomName: "Parede da Ala de Oficiais",
            isWall: true,
            prop: { kind: "snow_city_wall", subType: 0, namePt: "Parede da Ala de Comando" },
          };
        }

        // Parede Sul da Ala de Oficiais (relY === 45)
        if (relY === 45) {
          return {
            isSnowCity: true,
            role: "wall",
            roomName: "Parede Divisória da Ala de Oficiais",
            isWall: true,
            prop: { kind: "snow_city_wall", subType: 0, namePt: "Parede da Ala de Comando" },
          };
        }

        // Divisórias internas da Ala de Oficiais:
        // - Parede horizontal em relY === 37 (com vãos de porta em relX === -30 e relX === -19)
        // - Parede vertical em relX === -25 de relY 29..37 (com vão em relY === 33)
        if (relY === 37 && relX !== -30 && relX !== -19) {
          return {
            isSnowCity: true,
            role: "wall",
            roomName: "Divisória das Salas de Oficiais",
            isWall: true,
            prop: { kind: "snow_city_wall", subType: 1, namePt: "Divisória Militar de Carvalho" },
          };
        }
        if (relX === -25 && relY >= 29 && relY <= 37 && relY !== 33) {
          return {
            isSnowCity: true,
            role: "wall",
            roomName: "Divisória do Gabinete do Comandante",
            isWall: true,
            prop: { kind: "snow_city_wall", subType: 1, namePt: "Divisória do Gabinete do Comandante" },
          };
        }

        // SALA 1 (Noroeste Superior): Gabinete do Comandante Supremo (relX in [-35..-26], relY in [29..36])
        if (relX <= -26 && relY <= 36) {
          const roomName = "Sala de Oficiais: Gabinete do Comandante do Quartel";
          if (relX === -28 && relY === 29) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "snow_city_fireplace",
                interactive: true,
                namePt: "Lareira Oficial do Comandante",
                descriptionPt: "Lareira imponente de pedra aquecendo o gabinete de comando.",
              },
            };
          }
          if (relX === -31 && relY === 32) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              isCollider: true,
              prop: {
                kind: "barracks_officer_desk",
                subType: 0,
                interactive: true,
                namePt: "Mesa de Comando e Mapas Táticos do General",
                descriptionPt:
                  "Mesa de carvalho maciço com mapas de guerra dos Picos Glaciais, selos imperiais de cera vermelha, ordens de execução e candelabro dourado.",
              },
            };
          }
          if ((relX === -34 || relX === -32) && relY === 29) {
            const bKey = `${tx},${ty}`;
            const bState = interactedProps && interactedProps.get ? interactedProps.get(bKey) || {} : {};
            const taken = typeof bState.booksTaken === "number" ? bState.booksTaken : (bState.collected ? 4 : 0);
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "greek_bookshelf",
                subType: relX === -34 ? 1 : 3,
                scale: 1.15,
                interactive: true,
                collected: taken >= 4,
                booksTaken: taken,
                maxBooks: 4,
                namePt: "Estante de Registros Militares e Códigos de Guerra",
                descriptionPt: "Tomos encadernados em couro contendo relatórios de campanha e sentenças do tribunal militar. Pressione [F] para coletar!",
              },
            };
          }
          if (relX === -34 && relY === 35) {
            const opened = !!intState.opened;
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "chest",
                subType: 0,
                scale: 1.1,
                interactive: !opened,
                opened,
                namePt: opened ? "Cofre Militar do Comandante (Aberto)" : "Cofre de Ouro do Comandante",
                descriptionPt: "Arca encouraçada do comandante do quartel. Pressione [F] para abrir!",
              },
            };
          }
          if (relX === -27 && relY === 35) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "weapon_rack",
                scale: 1.15,
                interactive: true,
                namePt: "Suporte de Espadas e Alabardas Oficiais",
                descriptionPt: "Armas cerimoniais e de combate dos oficiais superiores.",
              },
            };
          }
          return { isSnowCity: true, role: "house_floor", roomName };
        }

        // SALA 2 (Nordeste da Ala Oeste): Sala de Estratégia e Guerra dos Oficiais (relX in [-24..-15], relY in [29..36])
        if (relX >= -24 && relY <= 36) {
          const roomName = "Sala de Oficiais: Salão de Estratégia e Conselho Militar";
          if (relX === -20 && relY === 32) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              isCollider: true,
              prop: {
                kind: "barracks_officer_desk",
                subType: 1,
                scale: 1.25,
                interactive: true,
                namePt: "Grande Mesa Tática de Operações Militares",
                descriptionPt: "Mesa de comando cercada por cadeiras de oficiais com miniaturas de tropas, mapas das fronteiras de gelo e planos de defesa.",
              },
            };
          }
          if ((relX === -23 || relX === -17) && relY === 29) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "weapon_rack",
                scale: 1.15,
                interactive: true,
                namePt: "Arsenal da Sala de Estratégia",
                descriptionPt: "Lanças, escudos e espadas de aço temperado da guarda de elite.",
              },
            };
          }
          if (relX === -23 && relY === 35) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "snow_city_wardrobe",
                interactive: true,
                namePt: "Armário de Fardas e Insígnias de Oficiais",
                descriptionPt: "Guarda-roupa militar com sobretudos de lã pesada, dragonas douradas e medalhas.",
              },
            };
          }
          return { isSnowCity: true, role: "house_floor", roomName };
        }

        // SALA 3 (Sul da Ala Oeste): Sala de Administração Prisional e Interrogatório de Oficiais (relX in [-35..-15], relY in [38..44])
        const roomName = "Sala de Oficiais: Administração da Prisão e Tribunal";
        if (relX === -28 && relY === 41) {
          const hasKey = !!intState.collectedKey;
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            prop: {
              kind: "jailer_table",
              hasKey: !hasKey,
              scale: 1.2,
              interactive: true,
              namePt: "Mesa do Oficial Carcereiro-Chefe (Chaves da Prisão)",
              descriptionPt: hasKey
                ? "Mesa de registros de prisioneiros e sentenças de forca."
                : "Mesa do Oficial Carcereiro-Chefe com o Molho de Chaves Mestre da Prisão! Pressione [F] para pegar a Chave do Carcereiro.",
            },
          };
        }
        if (relX === -20 && relY === 41) {
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            isCollider: true,
            prop: {
              kind: "barracks_officer_desk",
              subType: 0,
              interactive: true,
              namePt: "Bancada do Tribunal Militar e Sentenças",
              descriptionPt: "Mesa onde os oficiais assinam os mandados para o Pátio da Forca e para a Solitária do Subsolo.",
            },
          };
        }
        if ((relX === -34 || relX === -16) && relY === 39) {
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            prop: {
              kind: "weapon_rack",
              scale: 1.15,
              interactive: true,
              namePt: "Armas da Guarda Prisional",
              descriptionPt: "Alabardas e correntes utilizadas pelos guardas do campo de prisioneiros.",
            },
          };
        }
        if (relX === -34 && relY === 43) {
          const opened = !!intState.opened;
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            prop: {
              kind: "chest",
              subType: 0,
              scale: 1.05,
              interactive: !opened,
              opened,
              namePt: opened ? "Baú de Pertences Confiscados (Aberto)" : "Baú de Pertences Confiscados",
              descriptionPt: "Baú contendo ouro e relíquias confiscadas dos prisioneiros ao chegarem ao quartel.",
            },
          };
        }
        return { isSnowCity: true, role: "house_floor", roomName };
      }

      // 3.3 ALA NORDESTE: SALAS DE DESCANSO PARA OFICIAIS (relX in [14..35], relY in [29..45])
      if (relX >= 14 && relX <= 35 && relY >= 29 && relY <= 45) {
        // Parede Oeste da Ala de Descanso (separa do Pátio de Execução em relX === 14)
        if (relX === 14) {
          if (relY === 33 || relY === 41) {
            const isDoorOpen = intState.opened !== undefined ? !!intState.opened : true;
            return {
              isSnowCity: true,
              role: "door",
              roomName: "Porta das Salas de Descanso dos Oficiais",
              isDoor: true,
              isDoorOpen: isDoorOpen,
              isWall: false,
              prop: {
                kind: "snow_city_door",
                doorVertical: true,
                opened: isDoorOpen,
                interactive: true,
                namePt: isDoorOpen
                  ? "Porta da Ala de Descanso dos Oficiais (Aberta)"
                  : "Porta da Ala de Descanso dos Oficiais (Fechada)",
                descriptionPt: "Porta de carvalho e ferro que conduz aos alojamentos aquecidos, salão de lazer e refeitório exclusivo dos oficiais.",
              },
            };
          }
          return {
            isSnowCity: true,
            role: "wall",
            roomName: "Parede da Ala de Descanso dos Oficiais",
            isWall: true,
            prop: { kind: "snow_city_wall", subType: 0, namePt: "Parede da Ala de Descanso" },
          };
        }

        // Parede Sul da Ala de Descanso (relY === 45)
        if (relY === 45) {
          return {
            isSnowCity: true,
            role: "wall",
            roomName: "Parede Sul da Ala de Descanso",
            isWall: true,
            prop: { kind: "snow_city_wall", subType: 0, namePt: "Parede da Ala de Descanso" },
          };
        }

        // Divisórias internas das Salas de Descanso de Oficiais:
        // - Parede horizontal em relY === 37 (com vãos em relX === 19 e relX === 30)
        // - Parede vertical em relX === 25 de relY 29..37 (com vão em relY === 33)
        if (relY === 37 && relX !== 19 && relX !== 30) {
          return {
            isSnowCity: true,
            role: "wall",
            roomName: "Divisória das Salas de Descanso",
            isWall: true,
            prop: { kind: "snow_city_wall", subType: 1, namePt: "Divisória de Madeira Nobre" },
          };
        }
        if (relX === 25 && relY >= 29 && relY <= 37 && relY !== 33) {
          return {
            isSnowCity: true,
            role: "wall",
            roomName: "Divisória do Dormitório de Oficiais",
            isWall: true,
            prop: { kind: "snow_city_wall", subType: 1, namePt: "Divisória do Dormitório" },
          };
        }

        // SALA DE DESCANSO 1 (Noroeste da Ala Leste): Salão de Convivência, Jogos e Lareira dos Oficiais (relX in [15..24], relY in [29..36])
        if (relX <= 24 && relY <= 36) {
          const roomName = "Sala de Descanso dos Oficiais: Salão de Lareira e Lazer";
          if (relX === 20 && relY === 29) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "snow_city_fireplace",
                interactive: true,
                namePt: "Lareira da Sala de Descanso dos Oficiais",
                descriptionPt: "Lareira crepitante onde os oficiais descansam e bebem vinho quente após os turnos na neve.",
              },
            };
          }
          if ((relX === 18 || relX === 22) && relY === 32) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "snow_city_sofa",
                interactive: true,
                namePt: "Poltrona de Couro e Peles dos Oficiais",
                descriptionPt: "Sofá macio de couro estofado exclusivo para o descanso da oficialidade.",
              },
            };
          }
          if (relX === 20 && relY === 32) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "snow_city_table",
                interactive: true,
                namePt: "Mesa de Jogos, Xadrez e Hidromel dos Oficiais",
                descriptionPt: "Mesa de centro com tabuleiro de estratégia, taças de prata e garrafas de hidromel.",
              },
            };
          }
          if (relX === 16 && relY === 35) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "snow_city_pantry",
                interactive: true,
                namePt: "Adega Particular e Reserva dos Oficiais",
                descriptionPt: "Estante abastecida com bebidas quentes, queijos curados e charutos.",
              },
            };
          }
          return { isSnowCity: true, role: "house_floor", roomName };
        }

        // SALA DE DESCANSO 2 (Nordeste da Ala Leste): Dormitório Nobre dos Oficiais (relX in [26..35], relY in [29..36])
        if (relX >= 26 && relY <= 36) {
          const roomName = "Sala de Descanso dos Oficiais: Dormitório Aquecido";
          if ((relX === 28 || relX === 33) && (relY === 30 || relY === 34)) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "snow_city_bed",
                interactive: true,
                namePt: "Cama de Carvalho dos Oficiais com Peles de Urso",
                descriptionPt: "Leito confortável e aquecido reservado ao descanso dos capitães e tenentes do quartel.",
              },
            };
          }
          if ((relX === 27 || relX === 34) && relY === 32) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "snow_city_nightstand",
                interactive: true,
                namePt: "Criado-Mudo de Oficial com Castiçal",
                descriptionPt: "Mesa de cabeceira com vela acesa e pertences pessoais.",
              },
            };
          }
          if (relX === 30 && relY === 29) {
            return {
              isSnowCity: true,
              role: "house_floor",
              roomName,
              prop: {
                kind: "snow_city_wardrobe",
                interactive: true,
                namePt: "Guarda-Roupa de Casacos e Mantas dos Oficiais",
                descriptionPt: "Armário de carvalho com uniformes de gala e capas térmicas.",
              },
            };
          }
          return { isSnowCity: true, role: "house_floor", roomName };
        }

        // SALA DE DESCANSO 3 (Sul da Ala Leste): Refeitório, Cozinha Quente e Banhos dos Oficiais (relX in [15..35], relY in [38..44])
        const roomName = "Sala de Descanso dos Oficiais: Refeitório, Cozinha e Banhos";
        if ((relX === 19 || relX === 24) && relY === 41) {
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            prop: {
              kind: "snow_city_table",
              interactive: true,
              namePt: "Mesa de Banquete do Refeitório de Oficiais",
              descriptionPt: "Mesa farta com assados, pães quentes e caldos para os oficiais do quartel.",
            },
          };
        }
        if ((relX === 19 || relX === 24) && (relY === 40 || relY === 42)) {
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            prop: {
              kind: "snow_city_sofa",
              interactive: true,
              namePt: "Banco Estofado do Refeitório Oficial",
              descriptionPt: "Assento acolchoado ao redor das mesas de refeição dos oficiais.",
            },
          };
        }
        if (relX === 29 && relY === 39) {
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            prop: {
              kind: "snow_city_stove",
              interactive: true,
              namePt: "Fogão Industrial a Lenha dos Oficiais",
              descriptionPt: "Fogão de ferro fundido preparando refeições quentes para a oficialidade.",
            },
          };
        }
        if (relX === 31 && relY === 39) {
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            prop: {
              kind: "snow_city_counter",
              interactive: true,
              namePt: "Bancada de Carnes e Mantimentos do Quartel",
              descriptionPt: "Bancada culinária abastecida com carnes de caça e especiarias.",
            },
          };
        }
        if (relX === 34 && relY === 40) {
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            prop: {
              kind: "snow_city_pantry",
              interactive: true,
              namePt: "Despensa de Provisões dos Oficiais",
              descriptionPt: "Prateleiras cheias de suprimentos nobres do quartel.",
            },
          };
        }
        if (relX === 33 && relY === 43) {
          return {
            isSnowCity: true,
            role: "house_floor",
            roomName,
            prop: {
              kind: "snow_city_bathtub",
              interactive: true,
              namePt: "Tina de Banho Quente dos Oficiais",
              descriptionPt: "Banheira térmica de cedro com água fumegante para relaxamento dos oficiais.",
            },
          };
        }
        return { isSnowCity: true, role: "house_floor", roomName };
      }

      // 3.4 PÁTIO CENTRAL DE EXECUÇÃO COM FORCA (relX in [-13..+13], relY in [29..45])
      if (relX >= -13 && relX <= 13 && relY >= 29 && relY <= 45) {
        const roomName = "Pátio de Execução com Forca (Quartel Militar)";

        // No centro do Pátio (relX in [-2..+2], relY in [35..39]): Palanque de Madeira e Forca!
        if (Math.abs(relX) <= 2 && relY >= 35 && relY <= 39) {
          if (relX === 0 && relY === 37) {
            return {
              isSnowCity: true,
              role: "gallows_platform",
              roomName: "Cadafalso e Forca do Pátio de Execução",
              isCollider: true,
              prop: {
                kind: "barracks_gallows",
                scale: 1.35,
                interactive: true,
                namePt: "Forca de Execução do Quartel Militar",
                descriptionPt:
                  "Palanque elevado de madeira escura com alçapão de ferro, trave dupla maciça e laços de corda de cânhamo balançando ao vento gelado no centro do Pátio de Execução.",
              },
            };
          }
          // Piso do palanque de madeira ao redor da trave da forca
          return {
            isSnowCity: true,
            role: "gallows_platform",
            roomName: "Palanque de Madeira da Forca",
          };
        }

        // Bancos de observação e armas de guarda nas bordas do Pátio de Execução
        if ((relX === -6 || relX === 6) && (relY === 34 || relY === 40)) {
          return {
            isSnowCity: true,
            role: "plaza",
            roomName,
            isCollider: true,
            prop: {
              kind: "snow_city_lamppost",
              interactive: true,
              namePt: "Poste de Ferro do Pátio de Execução",
              descriptionPt: "Lampião militar iluminando o cadafalso e a forca durante as execuções noturnas.",
            },
          };
        }
        if ((relX === -10 || relX === 10) && relY === 37) {
          return {
            isSnowCity: true,
            role: "plaza",
            roomName,
            prop: {
              kind: "hanging_cage",
              scale: 1.2,
              interactive: true,
              namePt: "Gaiola de Ferro Suspensa no Pátio de Execução",
              descriptionPt: "Gaiola pendurada como aviso sombrio aos insurgentes e prisioneiros do quartel.",
            },
          };
        }

        return {
          isSnowCity: true,
          role: "plaza",
          roomName,
        };
      }

      // 3.5 ALA DE PRISÃO: GRANDES CELAS COLETIVAS TIPO CAMPO DE CONCENTRAÇÃO (relY in [46..73])
      // Parede divisória entre o Pátio de Execução e o Pavilhão de Concentração em relY === 46
      if (relY === 46) {
        if (Math.abs(relX) <= 1) {
          if (relX === 0) {
            const isOpen = intState.opened !== undefined ? !!intState.opened : true;
            return {
              isSnowCity: true,
              role: "door",
              roomName: "Portão de Grades do Campo de Concentração",
              isDoor: true,
              isDoorOpen: isOpen,
              isWall: false,
              prop: {
                kind: "iron_bars_gate",
                doorVertical: false,
                defaultOpened: true,
                unlocked: true,
                opened: isOpen,
                interactive: true,
                namePt: isOpen
                  ? "Portão de Ferro do Pavilhão de Prisioneiros (Aberto)"
                  : "Portão de Ferro do Pavilhão de Prisioneiros (Fechado)",
                descriptionPt: "Grades pesadas de ferro separando o Pátio da Forca dos grandes blocos de celas coletivas.",
              },
            };
          }
          return {
            isSnowCity: true,
            role: "road",
            roomName: "Passagem para as Grandes Celas de Concentração",
          };
        }
        return {
          isSnowCity: true,
          role: "wall",
          roomName: "Muralha Interna da Prisão",
          isWall: true,
          prop: { kind: "snow_city_wall", subType: 0, namePt: "Muralha da Ala de Prisão" },
        };
      }

      // Corredor Central de Vigilância da Prisão (relX in [-3..+3], relY in [47..73])
      if (relX >= -3 && relX <= 3 && relY >= 47 && relY <= 73) {
        // ESCADARIA PARA O SUBSOLO (SALA DE TORTURA E SOLITÁRIA) em (relX === 0, relY === 51)!
        if (relX === 0 && relY === 51) {
          return {
            isSnowCity: true,
            role: "plaza",
            roomName: "Escadaria para o Subsolo da Prisão (Sala de Tortura e Solitárias)",
            prop: {
              kind: "cave_entrance",
              subType: 2,
              isStaircase: true,
              isBarracksStaircase: true,
              offsetX: 0,
              offsetY: -4,
              scale: 1.4,
              interactive: true,
              namePt: "Escadaria para o Subsolo (Sala de Tortura e Solitárias)",
              descriptionPt:
                "Escadaria sombria de pedra e ferro que desce para o Subsolo do Quartel: Câmara de Tortura, Interrogatório e Celas Solitárias! Pressione [F] para descer.",
            },
          };
        }

        // Postos de guarda e tochas no corredor central das celas
        if ((relX === -2 || relX === 2) && (relY === 49 || relY === 59 || relY === 69)) {
          return {
            isSnowCity: true,
            role: "road",
            roomName: "Corredor de Vigilância do Campo de Prisioneiros",
            prop: {
              kind: "corridor_torch",
              lit: true,
              interactive: false,
              namePt: "Tocha de Vigilância da Prisão",
              descriptionPt: "Tocha acesa iluminando o corredor entre as grandes celas coletivas.",
            },
          };
        }

        return {
          isSnowCity: true,
          role: "road",
          roomName: "Corredor Central da Prisão (Acesso às Grandes Celas e ao Subsolo)",
        };
      }

      // Paredes de Grades e Portões das 4 Grandes Celas Coletivas (em relX === -4 e relX === +4)
      if (relX === -4 || relX === 4) {
        // Portões das 4 grandes celas coletivas em relY === 53 (Bloco I e II) e relY === 66 (Bloco III e IV)
        if (relY === 53 || relY === 66) {
          const isOpen = intState.opened !== undefined ? !!intState.opened : false;
          const blockNum = relY === 53 ? (relX < 0 ? "I (Noroeste)" : "II (Nordeste)") : (relX < 0 ? "III (Sudoeste)" : "IV (Sudeste)");
          return {
            isSnowCity: true,
            role: "door",
            roomName: `Portão da Grande Cela Coletiva — Bloco ${blockNum}`,
            isDoor: true,
            isDoorOpen: isOpen,
            isWall: false,
            prop: {
              kind: "iron_bars_gate",
              doorVertical: true,
              defaultOpened: true,
              unlocked: true,
              opened: isOpen,
              interactive: true,
              namePt: isOpen
                ? `Portão da Grande Cela Coletiva ${blockNum} (Aberto)`
                : `Portão da Grande Cela Coletiva ${blockNum} (Fechado)`,
              descriptionPt:
                "Pesado portão de grades de ferro do pavilhão de concentração de prisioneiros. Pressione [F] para abrir ou fechar!",
            },
          };
        }

        // Demais blocos em relX === -4 ou +4: Grades de ferro fechadas para dar visão de toda a cela gigante!
        if (relY === 60) {
          return {
            isSnowCity: true,
            role: "wall",
            roomName: "Pilar de Contenção da Cela",
            isWall: true,
            prop: { kind: "snow_city_wall", subType: 0, namePt: "Pilar de Pedra da Prisão" },
          };
        }
        return {
          isSnowCity: true,
          role: "prison_floor",
          roomName: "Gradeamento de Ferro da Grande Cela Coletiva",
          isCollider: true,
          prop: {
            kind: "iron_bars_gate",
            doorVertical: true,
            opened: false,
            interactive: false,
            namePt: "Grades de Ferro do Campo de Prisioneiros",
            descriptionPt: "Grades maciças de ferro que confinam as dezenas de prisioneiros nas grandes celas coletivas.",
          },
        };
      }

      // Parede divisória horizontal entre os Blocos Superiores (I/II) e Inferiores (III/IV) em relY === 60
      if (relY === 60) {
        return {
          isSnowCity: true,
          role: "wall",
          roomName: "Muralha Divisória dos Pavilhões de Concentração",
          isWall: true,
          prop: { kind: "snow_city_wall", subType: 0, namePt: "Muralha Divisória das Grandes Celas" },
        };
      }

      // INTERIOR DAS 4 GRANDES CELAS COLETIVAS TIPO CAMPO DE CONCENTRAÇÃO:
      // Cada cela tem 31 x 12 blocos (relX in [-35..-5] ou [5..35], relY in [47..59] ou [61..73])!
      const isWestCell = relX < 0;
      const isNorthCell = relY < 60;
      const cellBlockName = isNorthCell
        ? (isWestCell ? "Grande Cela Coletiva — Pavilhão I (Campo de Concentração Oeste)" : "Grande Cela Coletiva — Pavilhão II (Campo de Concentração Leste)")
        : (isWestCell ? "Grande Cela Coletiva — Pavilhão III (Campo de Concentração Sudoeste)" : "Grande Cela Coletiva — Pavilhão IV (Campo de Concentração Sudeste)");

      // Fileiras de beliches triplos de madeira bruta (tipo barraca de campo de concentração!)
      const bunkCols = isWestCell ? [-32, -26, -20, -14, -9] : [9, 14, 20, 26, 32];
      const bunkRows = isNorthCell ? [49, 53, 57] : [63, 67, 71];

      if (bunkCols.includes(relX) && bunkRows.includes(relY)) {
        return {
          isSnowCity: true,
          role: "prison_floor",
          roomName: cellBlockName,
          isCollider: true,
          prop: {
            kind: "prison_bunk_bed",
            interactive: true,
            namePt: "Beliche Coletivo de Madeira Bruta (Campo de Prisioneiros)",
            descriptionPt:
              "Beliche triplo de tábuas ásperas e palha fria onde dezenas de prisioneiros dormem amontoados nas grandes celas do quartel.",
          },
        };
      }

      // Montes de palha úmida, ossadas acorrentadas e latrinas coletivas nos cantos das grandes celas
      if ((relX === -34 || relX === 34) && (relY === 48 || relY === 62)) {
        return {
          isSnowCity: true,
          role: "prison_floor",
          roomName: cellBlockName,
          prop: {
            kind: "dungeon_latrine_bench",
            interactive: true,
            namePt: "Latrina Coletiva do Pavilhão de Prisioneiros",
            descriptionPt: "Vala sanitária rústica de pedra no canto da grande cela coletiva.",
          },
        };
      }
      if ((relX === -34 || relX === 34) && (relY === 58 || relY === 72)) {
        return {
          isSnowCity: true,
          role: "prison_floor",
          roomName: cellBlockName,
          prop: {
            kind: "dungeon_skeleton",
            interactive: true,
            namePt: "Prisioneiro Acorrentado nas Grades",
            descriptionPt: "Restos mortais de um prisioneiro que não resistiu ao inverno rigoroso na grande cela.",
          },
        };
      }
      if ((relX === -11 || relX === 11) && (relY === 51 || relY === 69)) {
        return {
          isSnowCity: true,
          role: "prison_floor",
          roomName: cellBlockName,
          prop: {
            kind: "dungeon_straw",
            interactive: true,
            namePt: "Palha Suja de Prisioneiros",
            descriptionPt: "Forragem úmida espalhada pelo chão de concreto frio da grande cela.",
          },
        };
      }

      return {
        isSnowCity: true,
        role: "prison_floor",
        roomName: cellBlockName,
      };
    }

    // =====================================================================
    // 4. EXTERIOR AO LADO DA PRISÃO (LESTE DO QUARTEL, relX >= 37):
    //    - Grande Entrada da Mina Profunda das Neves em (relX === 46, relY === 56)
    //    - Grande Monte de Terra da Escavação (SEM NEVE) ao lado da entrada da mina
    //      (centrado em relX === 58, relY === 57, cobrindo ~11x9 blocos de terra escavada!)
    //    - Caminho de acesso ligando a rua/quartel até a boca da mina
    // =====================================================================
    if (relX >= 37 && relX <= 68 && relY >= 12 && relY <= 68) {
      // 4.1 Grande Entrada da Mina Profunda das Neves (relX === 46, relY === 56)
      if (relX === 46 && relY === 56) {
        return {
          isSnowCity: true,
          role: "excavated_dirt",
          roomName: "Mina Profunda da Prisão",
          prop: {
            kind: "cave_entrance",
            subType: 0,
            isMerged: true,
            mergedCount: 4,
            isPrisonDeepMine: true,
            offsetX: 0,
            offsetY: -4,
            scale: 1.95,
            interactive: true,
            namePt: "Mina Profunda das Neves",
            descriptionPt:
              "Uma colossal entrada de mina escavada na rocha nevada ao lado da prisão, descendo para longos túneis subterrâneos de terra. Pressione [F] para entrar!",
          },
        };
      }

      // 4.2 Clarea a área imediata ao redor da boca gigante da mina (terra batida sem árvores/obstáculos)
      const distToMine = Math.hypot(relX - 46, (relY - 56) * 1.15);
      if (distToMine <= 4.6) {
        return {
          isSnowCity: true,
          role: "excavated_dirt",
          roomName: "Mina Profunda da Prisão",
        };
      }

      // 4.3 Grande Monte de Terra ao lado da mina (terra pura de escavação, SEM NEVE e sem título!)
      // Centrado em (relX = 57, relY = 57), espalhando-se de relX 51..63 e relY 52..62
      const moundDx = (relX - 57) / 6.2;
      const moundDy = (relY - 57) / 4.8;
      const moundDist = Math.hypot(moundDx, moundDy);
      if (moundDist <= 1.05) {
        // Centro do monte de terra: grande elevação 2.5D de terra escavada (com colisor nos blocos centrais do monte)
        if (relX === 57 && relY === 57) {
          return {
            isSnowCity: true,
            role: "excavated_dirt",
            roomName: "",
            isCollider: true,
            prop: {
              kind: "excavated_dirt_mound",
              subType: 0,
              scale: 1.5,
              interactive: false,
            },
          };
        }
        // Dunas secundárias do mesmo monte de terra para deixá-lo largo, volumoso e orgânico
        if ((relX === 54 && relY === 56) || (relX === 60 && relY === 58) || (relX === 56 && relY === 59)) {
          return {
            isSnowCity: true,
            role: "excavated_dirt",
            roomName: "",
            isCollider: true,
            prop: {
              kind: "excavated_dirt_mound",
              subType: relX === 54 ? 1 : 2,
              scale: 1.15,
              interactive: false,
            },
          };
        }
        const isCoreCollider = Math.abs(relX - 57) <= 3 && Math.abs(relY - 57) <= 2;
        return {
          isSnowCity: true,
          role: "excavated_dirt",
          roomName: "",
          isCollider: isCoreCollider,
        };
      }

      // Trilha de terra/pedra que contorna a muralha leste do quartel/prisão até a entrada da mina
      const isMineTrail =
        (relX >= 40 && relX <= 43 && relY >= 12 && relY <= 59) ||
        (relX >= 40 && relX <= 51 && relY >= 57 && relY <= 60);
      if (isMineTrail) {
        return {
          isSnowCity: true,
          role: relY <= 28 ? "road" : "excavated_dirt",
          roomName: "Acesso Externo da Mina Profunda",
        };
      }
    }

    // - BECOS COM SAÍDA (vielas estreitas que atravessam o quarteirão de um lado ao outro):
    //   1. Beco do Norte-Oeste (X = -8, Y de -24 até -12): passa entre a Casa #3 e a Casa #4 até a borda norte!
    //   2. Beco Central-Oeste (X = -33..-32, Y de -12 até +4): liga a Rua Norte ao pátio lateral entre as Casas #8 e #9!
    //   3. Beco Centro-Leste (X = 27..28, Y de +4 até +12): atravessa entre as Casas #18 e #19 até a Rua Sul!
    //   4. Beco Sul-Leste (X = 16..17, Y de +12 até +24): atravessa entre as Casas #23 e #24 até a saída sul!
    const isThroughAlley =
      (relX === -8 && relY >= -24 && relY <= -11) ||
      ((relX === -33 || relX === -32) && relY >= -12 && relY <= -1) ||
      ((relX === 27 || relX === 28) && relY >= 0 && relY <= 12) ||
      ((relX === 16 || relX === 17) && relY >= 11 && relY <= 24);

    // - BECOS SEM SAÍDA (vielas estreitas fechadas no fundo entre duas casas!):
    //   1. Beco sem saída Noroeste (X = -31..-30, Y de -19 até -12, fechado ao norte em Y = -20): entre Casa #1 e Casa #2!
    //   2. Beco sem saída Nordeste (X = 29, Y de -19 até -12, fechado ao norte): entre Casa #6 e Casa #7!
    //   3. Beco sem saída Centro-Leste (X = 16..17, Y de -12 até -5, fechado ao sul pela parede/fundo): entre Casa #11 e Casa #12!
    //   4. Beco sem saída Centro-Oeste (X = -18, Y de +5 até +12, fechado ao norte): entre Casa #15 e Casa #16!
    //   5. Beco sem saída Sudoeste (X = -29..-28, Y de +12 até +20, fechado ao sul): entre Casa #20 e Casa #21!
    const isDeadEndAlley =
      ((relX === -31 || relX === -30) && relY >= -19 && relY <= -11) ||
      (relX === 29 && relY >= -19 && relY <= -11) ||
      ((relX === 16 || relX === 17) && relY >= -12 && relY <= -5) ||
      (relX === -18 && relY >= 5 && relY <= 12) ||
      ((relX === -29 || relX === -28) && relY >= 11 && relY <= 20);

    // - Entradas de calçada automáticas ligando a porta de cada casa (mesmo as recuadas/desalinhadas) até a rua principal!
    let isHouseDoorStep = false;
    for (let i = 0; i < HOUSES.length; i++) {
      const h = HOUSES[i];
      const doorY = h.cy + (h.doorOnSouth ? h.halfH : -h.halfH);
      const dirY = h.doorOnSouth ? 1 : -1;
      const stepDist = (ty - doorY) * dirY;
      if (Math.abs(tx - h.cx) <= 1 && stepDist >= 1 && stepDist <= 4) {
        isHouseDoorStep = true;
        break;
      }
    }

    if (
      isMainDualSidedStreet ||
      isNorthPlazaConnector ||
      isSouthPlazaConnector ||
      isThroughAlley ||
      isDeadEndAlley ||
      isHouseDoorStep
    ) {
      // No fundo dos becos sem saída, adiciona pequenos detalhes ou mantém o piso de paralelepípedo
      const isCornerLamp =
        (relX === -4 && relY === -10) ||
        (relX === 4 && relY === -10) ||
        (relX === -4 && relY === 10) ||
        (relX === 4 && relY === 10) ||
        (relX === -32 && relY === -12) ||
        (relX === 28 && relY === 12);

      if (isCornerLamp) {
        return {
          isSnowCity: true,
          role: "road",
          roomName: "Esquina da Rua de Paralelepípedos",
          isCollider: true,
          prop: {
            kind: "snow_city_lamppost",
            interactive: true,
            namePt: "Lampião de Esquina em Paralelepípedo",
            descriptionPt: "Lanterna de ferro fundido iluminando as ruas e entradas de becos da vila.",
          },
        };
      }

      return {
        isSnowCity: true,
        role: (isNorthPlazaConnector || isSouthPlazaConnector) && absX <= 2 && absY <= 10 ? "plaza" : "road",
        roomName: isDeadEndAlley
          ? "Beco Sem Saída de Paralelepípedos"
          : isThroughAlley
            ? "Beco Estreito de Passagem"
            : "Rua de Paralelepípedos da Vila Glacial",
      };
    }

    return null;
  }

  // =========================================================================
  // SUBSOLO DO QUARTEL E PRISÃO (SALA DE TORTURA E CELAS SOLITÁRIAS)
  // Centrado na escadaria em (BARRACKS_STAIR_TX, BARRACKS_STAIR_TY) = (CITY_CX, CITY_CY + 51).
  // Contém:
  //   1. Vestíbulo da Escadaria de Retorno ao Quartel (dx in [-3..+3], dy in [-3..+3])
  //   2. Grande Sala de Tortura e Interrogatório no Subsolo (dx in [-14..+14], dy in [4..18])
  //      - Cavaletes de Estiramento (torture_rack), Donzelas de Ferro (iron_maiden),
  //        Braseiros com Ferros em Brasa (torture_brazier), Mesas de Instrumentos (torture_tools),
  //        Gaiolas Suspensas (hanging_cage), Esqueletos Acorrentados e Baú do Carrasco.
  //   3. Ala das Celas Solitárias no Subsolo (dy in [19..38]):
  //      - Corredor Escuro de Isolamento (dx in [-2..+2], dy in [19..38])
  //      - 8 Celas Solitárias Individuais (4 à esquerda e 4 à direita, minúsculas e escuras,
  //        fechadas com portas de ferro/grades, cama de pedra/palha e grilhões)
  //      - 1 Solitária de Segurança Máxima ("O Fosso Gelado") no fundo sul (dy in [39..45])
  // =========================================================================
  function getUndergroundCellAt(tx, ty, interactedProps) {
    // =====================================================================
    // A. GRANDE MINA PROFUNDA EM ESPINHA DE PEIXE (Ao lado de fora da Prisão)
    //    - Entrada na superfície em (PRISON_MINE_TX, PRISON_MINE_TY) = (CITY_CX + 46, CITY_CY + 56)
    //    - Apenas túneis longos de terra (espinha dorsal central + várias costelas laterais longas)
    //    - Sem trilhos, sem água, sem minerais, sem cristais, sem cogumelos!
    // =====================================================================
    const mx = tx - PRISON_MINE_TX;
    const my = ty - PRISON_MINE_TY;
    if (mx >= -34 && mx <= 34 && my >= -6 && my <= 156) {
      // Ponto exato da Saída da Mina Profunda de volta para a superfície ao lado da Prisão
      if (mx === 0 && my === 0) {
        return {
          role: "prison_mine_exit",
          targetTx: PRISON_MINE_TX,
          targetTy: PRISON_MINE_TY,
          roomName: "Mina Profunda de Terra",
        };
      }

      // 1. VESTÍBULO DE ENTRADA DA MINA (mx in [-3..+3], my in [-3..+3])
      const inEntryChamber = Math.abs(mx) <= 3 && my >= -3 && my <= 3;

      // 2. TÚNEL CENTRAL PRINCIPAL ("A ESPINHA DORSAL" — longo túnel vertical de terra: my de -3 até +150, largura 3..5 blocos)
      // Leve sinuosidade natural de escavação em terra (oscila -1, 0 ou +1)
      const spineShift = my <= 4 ? 0 : Math.round(Math.sin(my * 0.08) * 1.0);
      const inMainSpine = my >= -3 && my <= 150 && Math.abs(mx - spineShift) <= 2;

      // 3. TÚNEIS LATERAIS LONGOS ("COSTELAS DA ESPINHA" — 9 pares de longas galerias horizontais de terra escavadas a cada 15 blocos!)
      // Costelas em my = 14, 29, 44, 59, 74, 89, 104, 119, 134, 146
      const ribCenters = [14, 29, 44, 59, 74, 89, 104, 119, 134, 146];
      let inRibTunnel = false;
      let inSubBranch = false;
      for (let i = 0; i < ribCenters.length; i++) {
        const ry = ribCenters[i];
        // Comprimento variável porém sempre longo de cada túnel lateral (entre 24 e 31 blocos para cada lado!)
        const leftLen = 25 + ((i * 3) % 7);  // -25 a -31
        const rightLen = 26 + ((i * 5) % 6); // +26 a +31
        // Leve inclinação orgânica ao longo da costela
        const ribYOffset = Math.abs(mx) <= 4 ? 0 : Math.round(Math.sin(mx * 0.11 + i) * 0.8);
        if (mx >= -leftLen && mx <= rightLen && Math.abs(my - (ry + ribYOffset)) <= 1) {
          inRibTunnel = true;
          break;
        }
        // Pequenos sub-ramos verticais curtos nas pontas de algumas costelas para acentuar o formato de espinha
        const tipLeftX = -leftLen + 5;
        const tipRightX = rightLen - 5;
        if (
          (Math.abs(mx - tipLeftX) <= 1 || Math.abs(mx - tipRightX) <= 1) &&
          Math.abs(my - ry) <= 4
        ) {
          inSubBranch = true;
        }
      }

      if (inEntryChamber || inMainSpine || inRibTunnel || inSubBranch) {
        return {
          role: "earth_mine_floor",
          roomName: "Túnel de Terra da Mina Profunda",
        };
      }

      // Tudo ao redor dos túneis da espinha é parede maciça de terra escavada!
      return {
        role: "earth_mine_wall",
        roomName: "Parede de Terra da Mina Profunda",
      };
    }

    const dx = tx - BARRACKS_STAIR_TX;
    const dy = ty - BARRACKS_STAIR_TY;

    if (dx < -15 || dx > 15 || dy < -4 || dy > 46) return null;

    const pKey = `underground_${tx},${ty}`;
    const intState =
      interactedProps && interactedProps.get
        ? interactedProps.get(pKey) || interactedProps.get(`dungeon_${tx},${ty}`) || interactedProps.get(`${tx},${ty}`) || {}
        : {};

    // 1. VESTÍBULO DA ESCADARIA DO QUARTEL (dx in [-4..+4], dy in [-4..+3])
    if (dy >= -4 && dy <= 3) {
      if (dx < -4 || dx > 4) return null;
      if (dy === -4 || dx === -4 || dx === 4 || (dy === 3 && Math.abs(dx) > 1)) {
        return { role: "dungeon_wall", roomName: "Muralha do Subsolo do Quartel" };
      }
      if (dx === 0 && dy === 0) {
        return {
          role: "barracks_stair_exit",
          targetTx: BARRACKS_STAIR_TX,
          targetTy: BARRACKS_STAIR_TY,
          roomName: "Escadaria de Subida para o Quartel e Prisão",
        };
      }
      if ((dx === -2 || dx === 2) && dy === -2) {
        return { role: "corridor_torch", lit: true, roomName: "Vestíbulo Subterrâneo do Quartel" };
      }
      return { role: "dungeon_floor", roomName: "Vestíbulo Subterrâneo do Quartel" };
    }

    // 2. GRANDE SALA DE TORTURA DO SUBSOLO (dx in [-14..+14], dy in [4..18])
    if (dy >= 4 && dy <= 18) {
      if (dx < -14 || dx > 14) return null;

      // Paredes externas da Sala de Tortura
      if (dx === -14 || dx === 14 || (dy === 4 && Math.abs(dx) > 1) || (dy === 18 && Math.abs(dx) > 1)) {
        return { role: "dungeon_wall", roomName: "Muralha da Grande Sala de Tortura" };
      }

      // Porta de entrada da Sala de Tortura (dy === 4, dx === 0) e saída para a Ala das Solitárias (dy === 18, dx === 0)
      if ((dy === 4 || dy === 18) && dx === 0) {
        const isOpen = intState.opened !== undefined ? !!intState.opened : true;
        return {
          role: "dungeon_door",
          doorVertical: false,
          defaultOpened: true,
          opened: isOpen,
          roomName: dy === 4 ? "Porta da Sala de Tortura do Subsolo" : "Porta para o Corredor das Solitárias",
        };
      }

      const roomName = "Sala de Tortura do Subsolo (Quartel Militar)";

      // Equipamentos de Tortura distribuídos na grande câmara:
      // - 2 Cavaletes de Estiramento (torture_rack)
      if ((dx === -7 || dx === 7) && dy === 8) {
        return { role: "torture_rack", roomName };
      }
      // - 2 Donzelas de Ferro (iron_maiden)
      if ((dx === -11 || dx === 11) && dy === 6) {
        return { role: "iron_maiden", roomName };
      }
      // - 2 Braseiros de Tortura com Ferros em Brasa (torture_brazier)
      if ((dx === -4 || dx === 4) && dy === 11) {
        return { role: "torture_brazier", roomName };
      }
      // - 2 Mesas de Instrumentos de Suplício (torture_tools)
      if ((dx === -7 || dx === 7) && dy === 14) {
        return { role: "torture_tools", roomName };
      }
      // - 4 Gaiolas de Ferro Suspensas (hanging_cage)
      if ((dx === -11 || dx === 11) && (dy === 11 || dy === 15)) {
        return { role: "hanging_cage", roomName };
      }
      // - Ossadas acorrentadas nas paredes e baú do inquisidor
      if ((dx === -12 || dx === 12) && dy === 17) {
        return { role: "dungeon_skeleton", roomName };
      }
      if (dx === -12 && dy === 9) {
        return { role: "weapon_rack", roomName };
      }
      if (dx === 12 && dy === 9) {
        return { role: "chest", opened: !!intState.opened, roomName };
      }
      if ((dx === -3 || dx === 3) && (dy === 6 || dy === 16)) {
        return { role: "corridor_torch", lit: true, roomName };
      }

      return { role: "torture_floor", roomName };
    }

    // 3. ALA DAS CELAS SOLITÁRIAS NO SUBSOLO (dx in [-9..+9], dy in [19..45])
    if (dy >= 19 && dy <= 45) {
      if (dx < -9 || dx > 9) return null;

      // Muralhas externas laterais e final sul
      if (dx === -9 || dx === 9 || dy === 45) {
        return { role: "dungeon_wall", roomName: "Muralha das Celas Solitárias" };
      }

      // 3.1 SOLITÁRIA DE SEGURANÇA MÁXIMA AO FUNDO SUL ("O Fosso Solitário", dy in [39..44], dx in [-8..+8])
      if (dy >= 39) {
        if (dy === 39) {
          if (dx === 0) {
            const isOpen = intState.opened !== undefined ? !!intState.opened : false;
            return {
              role: "iron_bars_gate",
              doorVertical: false,
              defaultOpened: true,
              unlocked: true,
              opened: isOpen,
              roomName: "Portão Blindado da Solitária Máxima (O Fosso)",
            };
          }
          return { role: "dungeon_wall", roomName: "Parede da Solitária Máxima" };
        }
        // Paredes laterais para deixar a solitária central estreita e claustrofóbica (dx in [-4..+4])
        if (Math.abs(dx) >= 5) {
          return { role: "dungeon_wall", roomName: "Rocha Maciça de Isolamento" };
        }
        const roomName = "Solitária de Segurança Máxima (Subsolo da Prisão)";
        if (dx === 0 && dy === 42) return { role: "hanging_cage", roomName };
        if (dx === -3 && dy === 43) return { role: "dungeon_skeleton", roomName };
        if (dx === 3 && dy === 43) return { role: "dungeon_straw", roomName };
        if (dx === 0 && dy === 44) return { role: "chest", opened: !!intState.opened, roomName };
        return { role: "cell_floor", roomName };
      }

      // 3.2 CORREDOR CENTRAL DAS SOLITÁRIAS (dx in [-2..+2], dy in [19..38])
      if (dx >= -2 && dx <= 2) {
        if ((dx === -1 || dx === 1) && (dy === 21 || dy === 29 || dy === 37)) {
          return {
            role: "corridor_torch",
            lit: true,
            roomName: "Corredor das Celas Solitárias (Subsolo)",
          };
        }
        return {
          role: "dungeon_floor",
          roomName: "Corredor das Celas Solitárias (Subsolo)",
        };
      }

      // 3.3 8 CELAS SOLITÁRIAS INDIVIDUAIS (4 a Oeste: dx in [-8..-3], 4 a Leste: dx in [3..8])
      // Divididas por paredes horizontais em dy === 19, 24, 29, 34, 39 (cada solitária tem 4 blocos de altura interna!)
      if (dy === 19 || dy === 24 || dy === 29 || dy === 34) {
        return { role: "dungeon_wall", roomName: "Parede de Isolamento da Solitária" };
      }

      const cellRow = Math.floor((dy - 19) / 5); // 0, 1, 2, 3
      const isLeft = dx < 0;
      const solitaryNumber = cellRow * 2 + (isLeft ? 1 : 2);
      const roomName = `Cela Solitária #${solitaryNumber} (Isolamento Total no Subsolo)`;
      const doorDy = 19 + cellRow * 5 + 2; // centro de cada solitária (21, 26, 31, 36)

      // Parede frontal de cada Solitária (dx === -3 ou dx === +3)
      if (dx === -3 || dx === 3) {
        if (dy === doorDy) {
          const isOpen = intState.opened !== undefined ? !!intState.opened : false;
          return {
            role: "iron_bars_gate",
            doorVertical: true,
            defaultOpened: true,
            unlocked: true,
            opened: isOpen,
            roomName: `Porta de Ferro da Cela Solitária #${solitaryNumber}`,
          };
        }
        return { role: "dungeon_wall", roomName: `Parede da Cela Solitária #${solitaryNumber}` };
      }

      // Interior claustrofóbico de cada Cela Solitária (dx in [-8..-4] ou [4..8])
      const farX = isLeft ? -7 : 7;
      const cornerX = isLeft ? -8 : 8;
      if (dx === farX && dy === doorDy - 1) {
        return { role: "dungeon_straw", roomName };
      }
      if (dx === cornerX && dy === doorDy + 1) {
        return {
          role: solitaryNumber % 2 === 0 ? "dungeon_skeleton" : "dungeon_latrine_bench",
          roomName,
        };
      }

      return { role: "cell_floor", roomName };
    }

    return null;
  }

  // Verifica se o ponto subterrâneo pertence à região da Grande Mina Profunda de Terra (ao leste da Prisão)
  // Usado também para garantir que na mina nasçam SOMENTE morcegos (zero slimes, zero aranhas!)
  function isPrisonMineArea(tx, ty) {
    const mx = tx - PRISON_MINE_TX;
    const my = ty - PRISON_MINE_TY;
    return mx >= -36 && mx <= 36 && my >= -8 && my <= 165;
  }

  // Exporta a definição
  const SnowPeakCity = {
    centerX: CITY_CX,
    centerY: CITY_CY,
    radius: CITY_RADIUS,
    barracksStairTx: BARRACKS_STAIR_TX,
    barracksStairTy: BARRACKS_STAIR_TY,
    prisonMineTx: PRISON_MINE_TX,
    prisonMineTy: PRISON_MINE_TY,
    houses: HOUSES,
    barracksRoofs: BARRACKS_ROOFS,
    isCityTerritory,
    isCityBiomeArea,
    isPrisonMineArea,
    getHouseAt,
    getActiveHouseForPlayer,
    getCellAt,
    getUndergroundCellAt,
  };

  G.SnowPeakCity = SnowPeakCity;
  window.SnowPeakCity = SnowPeakCity;
})(window.Game);
