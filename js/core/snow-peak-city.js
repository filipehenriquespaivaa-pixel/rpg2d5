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

    // Estrada militar externa ligando o Portão Principal do Quartel (relX = 0, relY = 26..27) até a Trilha da Mina a Leste (relX = 41..43)
    if (relX >= 0 && relX <= 43 && (relY === 26 || relY === 27)) {
      return {
        isSnowCity: true,
        role: "road",
        roomName: "Estrada Militar do Quartel para a Mina",
      };
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
        // Verifica se este ponto do túnel tem uma tocha acesa presa na parede de terra:
        // 1. No vestíbulo de entrada (mx === -3 ou +3, my === -2 ou +2)
        // 2. Ao longo do túnel central da espinha (nas bordas laterais a cada 7 blocos, fora do cruzamento das costelas)
        // 3. Ao longo dos túneis laterais das costelas (na borda norte do túnel a cada 7 blocos)
        let hasTorch = false;
        if (inEntryChamber && (mx === -3 || mx === 3) && (my === -2 || my === 2)) {
          hasTorch = true;
        } else if (
          inMainSpine &&
          !inRibTunnel &&
          Math.abs(mx - spineShift) === 2 &&
          my >= 6 &&
          my <= 148 &&
          my % 7 === 0
        ) {
          hasTorch = true;
        } else if (inRibTunnel && !inMainSpine && Math.abs(mx) >= 6 && Math.abs(mx) % 7 === 0) {
          for (let i = 0; i < ribCenters.length; i++) {
            const ry = ribCenters[i];
            const ribYOffset = Math.abs(mx) <= 4 ? 0 : Math.round(Math.sin(mx * 0.11 + i) * 0.8);
            if (my === ry + ribYOffset - 1) {
              hasTorch = true;
              break;
            }
          }
        }

        return {
          role: "earth_mine_floor",
          hasTorch,
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

  // =========================================================================
  // POPULAÇÃO DA VILA GLACIAL DAS ALTURAS (MORADORAS DAS 24 CASAS):
  // - 1 ou 2 mulheres em cada uma das 24 casas (total: 38 moradoras).
  // - Cores variadas (tons de pele variados: clara, rosada, oliva, morena, parda, negra;
  //   cabelos variados: preto, castanho, ruivo acobreado, loiro, grisalho; 5 penteados).
  // - Todos usando trajes alpinos com variedade (6 estilos e cores base diferentes)
  //   e DETALHES VERMELHOS EM TODOS (xale/cachecol vermelho, faixa/cinto vermelho,
  //   barra da saia e punhos bordados em vermelho, fitas/laços vermelhos).
  // - Rotina viva de RPG:
  //   * Entram e saem de suas casas (abrindo a porta ao passar);
  //   * Passeiam pelas ruas de paralelepípedo, becos e Praça Central;
  //   * Interagem e conversam entre si quando se encontram nas ruas/praça;
  //   * Ao anoitecer, todas voltam para suas respectivas casas para passar a noite!
  // =========================================================================
  const SKIN_TONES = [
    "#fde68a", // Clara dourada
    "#fbcfe8", // Clara rosada
    "#f3d5b5", // Pêssego suave
    "#e6b89c", // Morena clara
    "#d4a373", // Trigueira / Bronzeada
    "#b07d62", // Parda / Morena média
    "#8d5524", // Morena escura
    "#582f0e", // Negra retinta
  ];

  const HAIR_COLORS = [
    "#1c1917", // Preto azeviche
    "#3b1d0a", // Castanho café
    "#78350f", // Castanho amendoado
    "#b45309", // Ruivo acobreado
    "#9a3412", // Ruivo intenso
    "#eab308", // Loiro dourado
    "#cbd5e1", // Grisalho trançado
  ];

  // Trajes alpinos variados — TODOS combinados com detalhes vermelhos (#dc2626, #ef4444, #b91c1c)
  const OUTFIT_PALETTES = [
    { name: "Casaco Azul-Noite com Xale e Barra Vermelha", coat: "#1e3a8a", skirt: "#172554", apron: "#f8fafc", redMain: "#dc2626", redLight: "#ef4444", redDark: "#991b1b" },
    { name: "Traje Verde-Pinheiro com Corpete e Faixa Vermelha", coat: "#14532d", skirt: "#052e16", apron: "#e2e8f0", redMain: "#dc2626", redLight: "#f87171", redDark: "#b91c1c" },
    { name: "Túnica de Camurça Marrom com Manto e Punhos Vermelhos", coat: "#5c2808", skirt: "#3b1d0a", apron: "#fef3c7", redMain: "#ef4444", redLight: "#f87171", redDark: "#991b1b" },
    { name: "Vestido de Lã Cinza-Ardósia com Cachecol e Bordado Vermelho", coat: "#334155", skirt: "#1e293b", apron: "#f1f5f9", redMain: "#dc2626", redLight: "#ef4444", redDark: "#991b1b" },
    { name: "Traje de Lã Creme da Montanha com Colete e Saia Debruada em Vermelho", coat: "#78716c", skirt: "#44403c", apron: "#fafaf9", redMain: "#b91c1c", redLight: "#ef4444", redDark: "#7f1d1d" },
    { name: "Casaco Ameixa Escuro com Capuz e Faixa Carmesim", coat: "#3b0764", skirt: "#2e1065", apron: "#f5f3ff", redMain: "#ef4444", redLight: "#f87171", redDark: "#b91c1c" },
    { name: "Traje Carvão Alpino com Xale Vermelho Vivo", coat: "#27272a", skirt: "#18181b", apron: "#e4e4e7", redMain: "#dc2626", redLight: "#ef4444", redDark: "#991b1b" },
  ];

  const FEMALE_NAMES = [
    "Helena", "Clara", "Lívia", "Aurora", "Freya", "Beatriz", "Astrid", "Mirela",
    "Sofia", "Ingrid", "Elisa", "Valéria", "Camila", "Bianca", "Aline", "Diana",
    "Lorena", "Nádia", "Olívia", "Cecília", "Marina", "Celeste", "Íris", "Érica",
    "Lara", "Greta", "Marta", "Sílvia", "Regina", "Tânia", "Luciana", "Estela",
    "Alba", "Noêmia", "Catarina", "Rosa", "Violeta", "Ágata", "Bárbara", "Dora"
  ];

  const CHAT_PHRASES = [
    "Bom dia, vizinha! O fogo da praça está ótimo!",
    "Que vento gelado hoje nos picos!",
    "Gostei dos detalhes vermelhos do seu traje!",
    "Acabei de colocar mais lenha na lareira.",
    "O ensopado no fogão a lenha ficou uma delícia!",
    "Vou passear até a praça antes de anoitecer.",
    "Como está sua irmã lá em casa?",
    "Precisamos nos recolher cedo quando a noite cair.",
    "Ouviu os morcegos perto da mina ontem?",
    "Esse xale vermelho esquenta bastante no inverno!",
    "As ruas de pedra estão tranquilas hoje.",
    "Vou buscar temperos e já volto para casa!"
  ];

  let _citizensInitialized = false;
  const CITIZENS = [];
  const PRISONERS = [];
  const SOLDIERS = [];
  const _activeDoorwayTimers = new Map(); // key: "tx,ty" -> timestamp/remaining frames

  // Polilinha oficial da marcha entre o Corredor das Celas da Prisão e a Entrada da Mina Profunda (em coordenadas relativas à cidade)
  const PRISON_TO_MINE_ROUTE = [
    { rx: 0.0,  ry: 68.0 }, // 0: Fundo do Corredor Central das Celas
    { rx: -1.4, ry: 54.0 }, // 1: Corredor das Celas (desviando da escadaria em 0,51)
    { rx: 0.0,  ry: 46.0 }, // 2: Portão de Grades do Campo de Concentração
    { rx: -6.0, ry: 43.0 }, // 3: Pátio de Execução (contornando a forca pelo lado oeste)
    { rx: -6.0, ry: 30.5 }, // 4: Norte do Pátio de Execução
    { rx: 0.0,  ry: 28.0 }, // 5: Portão Principal do Quartel
    { rx: 0.0,  ry: 26.5 }, // 6: Estrada Militar Externa
    { rx: 41.5, ry: 26.5 }, // 7: Esquina Leste da Estrada Militar
    { rx: 41.5, ry: 56.5 }, // 8: Trilha da Mina ao lado da Prisão
    { rx: 46.0, ry: 56.5 }, // 9: Boca da Grande Mina Profunda das Neves
  ];

  // Calcula comprimento acumulado da polilinha para posicionar a fila de presos e os 6 tenentes (2 frente, 2 meio, 2 fim)
  const _ROUTE_SEGMENTS = [];
  let _ROUTE_TOTAL_LEN = 0;
  for (let i = 0; i < PRISON_TO_MINE_ROUTE.length - 1; i++) {
    const a = PRISON_TO_MINE_ROUTE[i];
    const b = PRISON_TO_MINE_ROUTE[i + 1];
    const len = Math.hypot(b.rx - a.rx, b.ry - a.ry);
    _ROUTE_SEGMENTS.push({ a, b, len, startDist: _ROUTE_TOTAL_LEN });
    _ROUTE_TOTAL_LEN += len;
  }

  function _sampleRouteAtDist(distTiles, lateralOffsetTiles, ts, reverse) {
    const clamped = Math.max(0, Math.min(_ROUTE_TOTAL_LEN, distTiles));
    const targetD = reverse ? _ROUTE_TOTAL_LEN - clamped : clamped;
    let seg = _ROUTE_SEGMENTS[0];
    for (let i = 0; i < _ROUTE_SEGMENTS.length; i++) {
      if (targetD >= _ROUTE_SEGMENTS[i].startDist && targetD <= _ROUTE_SEGMENTS[i].startDist + _ROUTE_SEGMENTS[i].len + 0.001) {
        seg = _ROUTE_SEGMENTS[i];
        break;
      }
    }
    const t = seg.len > 0 ? (targetD - seg.startDist) / seg.len : 0;
    const rx = seg.a.rx + (seg.b.rx - seg.a.rx) * t;
    const ry = seg.a.ry + (seg.b.ry - seg.a.ry) * t;
    let dx = seg.b.rx - seg.a.rx;
    let dy = seg.b.ry - seg.a.ry;
    if (reverse) {
      dx = -dx;
      dy = -dy;
    }
    const norm = Math.hypot(dx, dy) || 1;
    const ux = dx / norm;
    const uy = dy / norm;
    // Vetor perpendicular para colocar pares lado a lado na fila
    const px = -uy * lateralOffsetTiles;
    const py = ux * lateralOffsetTiles;
    const facing = Math.abs(ux) > Math.abs(uy) ? (ux < 0 ? "left" : "right") : (uy < 0 ? "up" : "down");
    return {
      x: (CITY_CX + rx + px + 0.5) * ts,
      y: (CITY_CY + ry + py + 0.5) * ts,
      facing,
      reachedStart: distTiles <= 0,
      reachedEnd: distTiles >= _ROUTE_TOTAL_LEN,
    };
  }

  // Definições das 4 Grandes Celas Coletivas para os 32 Prisioneiros (8 por cela)
  const CELL_ZONES = [
    { id: 0, roofId: "barracks_cell_nw", minRx: -31, maxRx: -7, aislesRy: [50.8, 51.4, 54.8, 55.4], gateRx: -4, gateRy: 53, clusterRx: -18, clusterRy: 51.2 },
    { id: 1, roofId: "barracks_cell_ne", minRx: 7,   maxRx: 31, aislesRy: [50.8, 51.4, 54.8, 55.4], gateRx: 4,  gateRy: 53, clusterRx: 18,  clusterRy: 51.2 },
    { id: 2, roofId: "barracks_cell_sw", minRx: -31, maxRx: -7, aislesRy: [64.8, 65.4, 68.8, 69.4], gateRx: -4, gateRy: 66, clusterRx: -18, clusterRy: 65.2 },
    { id: 3, roofId: "barracks_cell_se", minRx: 7,   maxRx: 31, aislesRy: [64.8, 65.4, 68.8, 69.4], gateRx: 4,  gateRy: 66, clusterRx: 18,  clusterRy: 65.2 },
  ];

  const PRISONER_PHRASES = [
    "Minhas mãos estão feridas de tanto cavar terra...",
    "Aquele monte de terra lá fora não para de crescer.",
    "Fiquem juntos aqui no canto, faz menos frio...",
    "Os 6 tenentes já vão abrir as grades para a fila da mina.",
    "Cuidado com o Capitão, ele fiscaliza cada túnel.",
    "Só tem terra e morcegos naquela mina profunda...",
    "Mais um dia carregando terra para fora...",
  ];

  const MILITARY_PHRASES = {
    coronel: [
      "Capitão, quero o relatório completo da escavação na mina!",
      "Mantenha os 6 tenentes firmes na escolta dos 32 prisioneiros.",
      "Vou inspecionar as ruas da cidade e retorno ao quartel antes do anoitecer.",
      "A disciplina no quartel e na mina deve ser absoluta!",
    ],
    capitao: [
      "Sim, Coronel! Os prisioneiros estão escavando os túneis e retirando a terra!",
      "A escolta dos tenentes levou todos os presos em fila sem incidentes.",
      "Vou retornar à mina agora mesmo para supervisionar os túneis, Coronel!",
      "Acelerem essa retirada de terra, prisioneiros!",
    ],
    tenente: [
      "Mantenham a fila alinhada até a entrada da mina! Sem parar!",
      "Dois tenentes na frente, dois no meio e dois na retaguarda — avancem!",
      "Levem esses sacos de terra para o monte ao lado da mina!",
      "De volta para as celas, prisioneiros! Rápido!",
    ],
    carcereiro: [
      "Ninguém se aproxima das grades! Silêncio nas celas!",
      "Corredor da prisão sob controle.",
    ],
    soldado: [
      "Em guarda! Perímetro seguro.",
      "Ronda em andamento sem alterações.",
      "Continuem escavando os túneis de terra, presos!",
    ],
  };

  function _initCitizens(tileSize) {
    if (_citizensInitialized) return;
    _citizensInitialized = true;
    const ts = tileSize || 36;
    let nameIdx = 0;

    // 1. INICIALIZA AS 38 MORADORAS DAS 24 CASAS
    for (let i = 0; i < HOUSES.length; i++) {
      const h = HOUSES[i];
      const count = h.twoBedrooms || h.id % 2 === 0 ? 2 : 1;

      for (let r = 0; r < count; r++) {
        const id = CITIZENS.length + 1;
        const name = FEMALE_NAMES[nameIdx % FEMALE_NAMES.length];
        nameIdx++;

        const doorTx = h.cx;
        const doorTy = h.cy + (h.doorOnSouth ? h.halfH : -h.halfH);
        const streetRelY = h.relY < 0 ? -11.15 : 11.15;
        const streetTy = CITY_CY + streetRelY;

        const northSide = h.doorOnSouth;
        const bedTx = r === 0 ? h.cx - 2.1 : h.twoBedrooms ? h.cx + 2.1 : h.cx - 2.1;
        const bedTy = r === 0
          ? h.cy + (northSide ? -2.2 : 2.2)
          : h.twoBedrooms
            ? h.cy + (northSide ? -2.2 : 2.2)
            : h.cy + (northSide ? -1.2 : 1.2);
        const livingTx = h.cx + (r === 0 ? 1.1 : 2.1);
        const livingTy = h.cy + (northSide ? 1.8 : -1.8);
        const kitchenTx = h.cx + 1.5;
        const kitchenTy = h.cy + (northSide ? -1.8 : 1.8);
        const hallTx = h.cx + 0.2;
        const hallTy = h.cy + (northSide ? h.halfH - 1.2 : -h.halfH + 1.2);

        const skinColor = SKIN_TONES[(id * 3 + r * 5 + i) % SKIN_TONES.length];
        const hairColor = HAIR_COLORS[(id * 5 + r * 2 + i) % HAIR_COLORS.length];
        const hairStyle = (id + r * 2 + i) % 5;
        const outfitStyle = (id + r + i * 2) % 6;
        const palette = OUTFIT_PALETTES[(id * 2 + r + i) % OUTFIT_PALETTES.length];
        const propInHand = (id + i) % 4 === 0 ? "basket" : (id + i) % 7 === 0 ? "pot" : null;

        const startOutside = (id + r) % 3 !== 0;
        const startX = startOutside
          ? (h.cx + ((r === 0 ? -1 : 1) * 1.5) + 0.5) * ts
          : (livingTx + 0.5) * ts;
        const startY = startOutside
          ? (streetTy + 0.5) * ts
          : (livingTy + 0.5) * ts;

        const cit = {
          id,
          name: `${name} (Casa #${h.id})`,
          shortName: name,
          houseId: h.id,
          house: h,
          residentIndex: r,
          skinColor,
          hairColor,
          hairStyle,
          outfitStyle,
          palette,
          propInHand,
          x: startX,
          y: startY,
          facing: h.doorOnSouth ? "down" : "up",
          isMoving: false,
          walkPhase: id * 1.7,
          speed: 0.92 + ((id * 7) % 5) * 0.04,
          doorTx,
          doorTy,
          streetTy,
          streetRelY,
          bedTx,
          bedTy,
          livingTx,
          livingTy,
          kitchenTx,
          kitchenTy,
          hallTx,
          hallTy,
          isInsideHouse: !startOutside,
          state: startOutside ? "strolling" : "inside_home",
          stateTimer: startOutside ? 12 + (id % 20) : 2 + (id % 6),
          pauseTimer: 0,
          chatCooldown: 2 + (id % 5),
          chatPartnerId: null,
          chatText: "",
          waypoints: [],
        };

        if (startOutside) {
          _assignStrollDestination(cit, ts);
        }
        CITIZENS.push(cit);
      }
    }

    // 2. INICIALIZA OS 32 PRISIONEIROS (8 em cada uma das 4 Grandes Celas Coletivas, cores variadas, roupas brancas rasgadas)
    const ribCenters = [14, 29, 44, 59, 74, 89, 104, 119, 134, 146];
    for (let pIdx = 0; pIdx < 32; pIdx++) {
      const id = pIdx + 1;
      const cellIdx = pIdx % 4;
      const cz = CELL_ZONES[cellIdx];
      const slotInCell = Math.floor(pIdx / 4); // 0..7
      const skinColor = SKIN_TONES[(pIdx * 3 + cellIdx * 2) % SKIN_TONES.length];
      const hairColor = HAIR_COLORS[(pIdx * 5 + 1) % HAIR_COLORS.length];

      // Posição inicial dentro da sua grande cela
      const startRx = cz.minRx + 3 + (slotInCell * 3) % (cz.maxRx - cz.minRx - 4);
      const startRy = cz.aislesRy[slotInCell % cz.aislesRy.length];

      // Atribuição de trabalho na mina durante o dia:
      // - 20 prisioneiros (pIdx < 20) escavam dentro dos túneis subterrâneos de terra da mina e levam terra até a saída;
      // - 12 prisioneiros (pIdx >= 20) carregam os sacos de terra da boca da mina até o Grande Monte de Terra externo!
      const worksUndergroundInMine = pIdx < 20;
      const ribY = ribCenters[pIdx % ribCenters.length];
      const ribDir = pIdx % 2 === 0 ? -1 : 1;
      const digOffsetMx = ribDir * (6 + ((pIdx * 3) % 16));
      const digTargetMx = pIdx % 5 === 0 ? (pIdx % 2 === 0 ? -1.8 : 1.8) : digOffsetMx;
      const digTargetMy = pIdx % 5 === 0 ? 10 + ((pIdx * 11) % 120) : ribY;

      PRISONERS.push({
        id,
        name: `Prisioneiro #${id}`,
        cellIdx,
        cellZone: cz,
        slotInCell,
        skinColor,
        hairColor,
        hasBeard: pIdx % 3 === 0,
        tatterSeed: (pIdx * 7) % 5,
        x: (CITY_CX + startRx + 0.5) * ts,
        y: (CITY_CY + startRy + 0.5) * ts,
        facing: "down",
        isMoving: false,
        walkPhase: id * 1.3,
        speed: 0.95 + (pIdx % 4) * 0.03,
        isUnderground: false,
        carryingDirt: false,
        isDigging: false,
        digTimer: 0,
        mode: "cell_explore", // "cell_explore", "cell_cluster", "marching_to_mine", "mine_work", "marching_to_cell"
        modeTimer: 4 + (pIdx % 9),
        pauseTimer: 0,
        chatText: "",
        worksUndergroundInMine,
        digTargetMx,
        digTargetMy,
        haulPhase: pIdx % 2 === 0 ? "to_mound" : "to_mine",
        waypoints: [],
      });
    }

    // 3. INICIALIZA O CORONEL, CAPITÃO, 6 TENENTES, CARCEREIROS E SOLDADOS (Todos com tons de pele variados e uniforme preto com detalhes vermelhos idênticos!)
    let solId = 1;
    const makeSoldier = (rank, title, role, homeHouseIdx, startRx, startRy, isUnderground = false, goesHomeAtNight = false) => {
      const h = HOUSES[homeHouseIdx % HOUSES.length];
      const id = solId++;
      const skinColor = SKIN_TONES[(id * 3 + homeHouseIdx) % SKIN_TONES.length];
      const hairColor = HAIR_COLORS[(id * 4 + 2) % HAIR_COLORS.length];
      const baseX = isUnderground ? (PRISON_MINE_TX + startRx + 0.5) * ts : (CITY_CX + startRx + 0.5) * ts;
      const baseY = isUnderground ? (PRISON_MINE_TY + startRy + 0.5) * ts : (CITY_CY + startRy + 0.5) * ts;

      return {
        id,
        rank, // "Coronel", "Capitão", "Tenente", "Carcereiro", "Soldado"
        name: title,
        role,
        skinColor,
        hairColor,
        homeHouse: h,
        homeHouseId: h.id,
        goesHomeAtNight,
        isInsideHouse: false,
        isUnderground,
        defaultUnderground: isUnderground,
        postRx: startRx,
        postRy: startRy,
        x: baseX,
        y: baseY,
        facing: "down",
        isMoving: false,
        walkPhase: id * 2.1,
        speed: rank === "Capitão" ? 1.18 : rank === "Coronel" ? 1.0 : 1.04,
        state: "duty",
        stateTimer: 5 + (id % 8),
        pauseTimer: 0,
        chatText: "",
        waypoints: [],
        // Específicos de patrulha/trajeto
        patrolStep: 0,
        captainPhase: "at_colonel", // "at_colonel" -> "to_mine" -> "at_mine" -> "to_colonel"
        captainTimer: 6.0,
      };
    };

    // 3.1 CORONEL (1 — Chefe de todos: fica na Sala de Administração conversando com o Capitão, depois anda pela cidade todo dia, volta para o quartel e à noite vai para casa!)
    SOLDIERS.push(makeSoldier("Coronel", "Coronel Valerius (Comandante Chefe)", "colonel", 0, -22.0, 40.0, false, true));

    // 3.2 CAPITÃO (1 — Vai e volta da Mina Profunda de tempos em tempos até a Sala do Coronel!)
    SOLDIERS.push(makeSoldier("Capitão", "Capitão Rodrigo (Supervisor Geral)", "captain", 1, -20.0, 40.0, false, true));

    // 3.3 6 TENENTES (2 na frente da fila, 2 no meio da fila, 2 no final da fila para transportar os presos das celas para a mina; metade dorme em casa à noite)
    for (let lt = 0; lt < 6; lt++) {
      const posDesc = lt < 2 ? "Vanguarda da Fila" : lt < 4 ? "Meio da Fila" : "Retaguarda da Fila";
      const goesHome = lt % 2 === 0; // Metade (3 tenentes) vai para casa dormir à noite e retorna de dia!
      const postRx = 44.0 + (lt % 3) * 3.2;
      const postRy = 54.5 + Math.floor(lt / 3) * 4.2;
      const s = makeSoldier("Tenente", `Tenente #${lt + 1} (${posDesc})`, "lieutenant", 2 + lt, postRx, postRy, false, goesHome);
      s.ltIndex = lt; // 0,1 = frente; 2,3 = meio; 4,5 = fim
      SOLDIERS.push(s);
    }

    // 3.4 2 SOLDADOS / CARCEREIROS COMO VIGIA NOS CORREDORES DA PRISÃO (metade = 1 vai para casa dormir à noite e retorna de dia)
    SOLDIERS.push(makeSoldier("Carcereiro", "Carcereiro-Vigia #1 (Corredor da Prisão)", "prison_corridor_guard", 8, -1.6, 52.0, false, false));
    SOLDIERS.push(makeSoldier("Carcereiro", "Carcereiro-Vigia #2 (Corredor da Prisão)", "prison_corridor_guard", 9, 1.6, 64.0, false, true));

    // 3.5 2 SOLDADOS NA PORTA PRINCIPAL DO QUARTEL
    SOLDIERS.push(makeSoldier("Soldado", "Soldado Sentinela #1 (Porta Principal)", "main_gate_guard", 10, -2.4, 27.2, false, false));
    SOLDIERS.push(makeSoldier("Soldado", "Soldado Sentinela #2 (Porta Principal)", "main_gate_guard", 11, 2.4, 27.2, false, false));

    // 3.6 2 SOLDADOS NA ENTRADA DA MINA (metade = 1 vai para casa dormir à noite e retorna de dia)
    SOLDIERS.push(makeSoldier("Soldado", "Soldado da Mina #1 (Entrada da Mina)", "mine_entrance_guard", 12, 43.0, 56.8, false, false));
    SOLDIERS.push(makeSoldier("Soldado", "Soldado da Mina #2 (Entrada da Mina)", "mine_entrance_guard", 13, 49.0, 56.8, false, true));

    // 3.7 4 SOLDADOS DENTRO DA MINA FAZENDO RONDA (metade = 2 vão para casas dormir à noite e retornam de dia)
    const minePatrolStartMy = [14, 44, 74, 104];
    for (let mp = 0; mp < 4; mp++) {
      const goesHome = mp >= 2; // Metade (2 soldados) vai para casa dormir à noite e retorna de dia!
      const s = makeSoldier("Soldado", `Soldado de Ronda da Mina #${mp + 1}`, "mine_inside_patrol", 14 + mp, 0, minePatrolStartMy[mp], true, goesHome);
      s.minePatrolIndex = mp;
      SOLDIERS.push(s);
    }

    // 3.8 8 SOLDADOS FAZENDO RONDA NA CIDADE (4 soldados fazendo ronda de dia e 8 soldados fazendo ronda à noite!)
    const cityPatrolStartRx = [-28, -10, 12, 30, -35, -18, 18, 35];
    for (let cp = 0; cp < 8; cp++) {
      const isNightOnly = cp >= 4; // Os 4 primeiros patrulham de dia e noite; os outros 4 saem à noite totalizando 8 à noite!
      const startRy = cp % 2 === 0 ? -11.15 : 11.15;
      const s = makeSoldier(
        "Soldado",
        `Soldado da Ronda Urbana #${cp + 1}`,
        isNightOnly ? "city_patrol_night_extra" : "city_patrol_day_night",
        16 + cp,
        cityPatrolStartRx[cp],
        startRy,
        false,
        false
      );
      if (isNightOnly) {
        // De dia fica descansando em sua casa na cidade e sai ao anoitecer!
        const h = s.homeHouse;
        s.x = (h.cx + 1.0 + 0.5) * ts;
        s.y = (h.cy + (h.doorOnSouth ? 1.5 : -1.5) + 0.5) * ts;
        s.isInsideHouse = true;
        s.state = "resting_day_at_home";
      }
      SOLDIERS.push(s);
    }
  }

  // Constrói uma rota limpa pelas ruas de paralelepípedo e Praça Central (evitando paredes, casas e a fogueira central)
  function _buildStreetRoute(fromX, fromY, targetRelX, targetRelY, ts) {
    const curRelX = fromX / ts - 0.5 - CITY_CX;
    const curRelY = fromY / ts - 0.5 - CITY_CY;
    const pts = [];
    const pushTile = (rx, ry) => {
      pts.push({ x: (CITY_CX + rx + 0.5) * ts, y: (CITY_CY + ry + 0.5) * ts });
    };

    const curStreetY = curRelY < 0 ? -11.15 : 11.15;
    const targetStreetY = targetRelY < -5 ? -11.15 : targetRelY > 5 ? 11.15 : 0;

    // 1. Se não estiver alinhada na rua nem na praça, vai primeiro para a rua mais próxima
    if (Math.abs(curRelX) > 3.9 && Math.abs(curRelY - curStreetY) > 0.8) {
      pushTile(curRelX, curStreetY);
    }

    // 2. Se o destino for na Praça Central (targetStreetY === 0)
    if (targetStreetY === 0) {
      if (Math.abs(curRelX) > 3.9) {
        pushTile(0, curStreetY);
      }
      const entryY = curRelY < 0 ? -4.1 : 4.1;
      pushTile(0, entryY);
      pushTile(targetRelX, targetRelY);
      return pts;
    }

    // 3. Se estiver na Praça Central e quiser ir para uma das ruas
    if (Math.abs(curRelX) <= 3.9 && Math.abs(curRelY) < 9.5) {
      const exitX = Math.abs(curRelX) > 1.5 ? (curRelX < 0 ? -3.6 : 3.6) : 0;
      pushTile(exitX, targetStreetY < 0 ? -4.1 : 4.1);
      pushTile(0, targetStreetY);
      pushTile(targetRelX, targetStreetY);
      if (Math.abs(targetRelY - targetStreetY) > 0.3) {
        pushTile(targetRelX, targetRelY);
      }
      return pts;
    }

    // 4. Se precisar trocar entre a Rua Norte (-11.15) e a Rua Sul (+11.15), atravessa pela Praça Central
    if (Math.sign(curStreetY) !== Math.sign(targetStreetY)) {
      pushTile(0, curStreetY);
      pushTile(0, curStreetY < 0 ? -4.2 : 4.2);
      // Contorna a fogueira e os bancos da praça por X = -3.6 ou +3.6
      const sideX = (Math.round(Math.abs(fromX + fromY)) % 2 === 0) ? -3.6 : 3.6;
      pushTile(sideX, curStreetY < 0 ? -4.2 : 4.2);
      pushTile(sideX, targetStreetY < 0 ? -4.2 : 4.2);
      pushTile(0, targetStreetY);
    }

    // 5. Caminha pela rua alvo até o X de destino
    pushTile(targetRelX, targetStreetY);
    if (Math.abs(targetRelY - targetStreetY) > 0.25) {
      pushTile(targetRelX, targetRelY);
    }
    return pts;
  }

  // Escolhe um novo destino de passeio pela cidade (Rua Norte, Rua Sul, Praça Central, Becos ou frente de casas vizinhas)
  function _assignStrollDestination(cit, ts) {
    const roll = Math.random();
    if (roll < 0.32) {
      // Passear até a Praça Central (ao redor da Grande Fogueira e bancos)
      const plazaSpots = [
        { rx: -3.5, ry: -3.8 },
        { rx: 3.5, ry: -3.8 },
        { rx: -3.5, ry: 3.8 },
        { rx: 3.5, ry: 3.8 },
        { rx: -1.4, ry: -3.1 },
        { rx: 1.4, ry: -3.1 },
        { rx: -1.4, ry: 3.1 },
        { rx: 1.4, ry: 3.1 },
        { rx: -3.2, ry: 0 },
        { rx: 3.2, ry: 0 },
      ];
      const sp = plazaSpots[Math.floor(Math.random() * plazaSpots.length)];
      cit.waypoints = _buildStreetRoute(cit.x, cit.y, sp.rx, sp.ry, ts);
    } else if (roll < 0.52) {
      // Passear por um dos becos (com ou sem saída)
      const alleySpots = [
        { rx: -30.5, ry: -16.5 },
        { rx: -8.0, ry: -17.5 },
        { rx: 29.0, ry: -16.5 },
        { rx: -32.5, ry: -4.5 },
        { rx: 16.5, ry: -7.5 },
        { rx: 27.5, ry: 4.5 },
        { rx: -28.5, ry: 17.0 },
        { rx: 16.5, ry: 18.0 },
      ];
      const sp = alleySpots[Math.floor(Math.random() * alleySpots.length)];
      cit.waypoints = _buildStreetRoute(cit.x, cit.y, sp.rx, sp.ry, ts);
    } else {
      // Passear ao longo da Rua Norte ou Rua Sul visitando a calçada de outras casas
      const targetHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
      const rx = targetHouse.relX + (Math.random() * 4 - 2);
      const ry = targetHouse.relY < 0 ? -11.15 + (Math.random() * 0.7 - 0.35) : 11.15 + (Math.random() * 0.7 - 0.35);
      cit.waypoints = _buildStreetRoute(cit.x, cit.y, rx, ry, ts);
    }
  }

  // Envia a moradora de volta para entrar na casa dela (para passar a noite ou descansar um pouco durante o dia)
  function _sendCitizenHome(cit, ts, forNight) {
    cit.state = forNight ? "returning_home_night" : "entering_house";
    cit.chatPartnerId = null;
    cit.chatText = "";
    cit.pauseTimer = 0;

    if (cit.isInsideHouse) {
      // Já está dentro de casa: vai para a cama (à noite) ou para a sala/cozinha
      const destTx = forNight ? cit.bedTx : cit.livingTx;
      const destTy = forNight ? cit.bedTy : cit.livingTy;
      cit.waypoints = [
        { x: (cit.hallTx + 0.5) * ts, y: (cit.hallTy + 0.5) * ts },
        { x: (destTx + 0.5) * ts, y: (destTy + 0.5) * ts },
      ];
      return;
    }

    // Constrói rota pelas ruas até a calçada da própria casa, depois atravessa a porta e entra!
    const streetPts = _buildStreetRoute(cit.x, cit.y, cit.house.relX, cit.streetRelY, ts);
    const doorStepY = cit.doorTy + (cit.house.doorOnSouth ? 1.1 : -1.1);
    streetPts.push({ x: (cit.doorTx + 0.5) * ts, y: (doorStepY + 0.5) * ts });
    streetPts.push({ x: (cit.doorTx + 0.5) * ts, y: (cit.doorTy + 0.5) * ts, isDoorCrossing: true, EnterHouse: true });
    streetPts.push({ x: (cit.hallTx + 0.5) * ts, y: (cit.hallTy + 0.5) * ts, markInside: true });
    if (forNight) {
      streetPts.push({ x: (cit.bedTx + 0.5) * ts, y: (cit.bedTy + 0.5) * ts });
    } else {
      const goKitchen = Math.random() < 0.5;
      streetPts.push({
        x: ((goKitchen ? cit.kitchenTx : cit.livingTx) + 0.5) * ts,
        y: ((goKitchen ? cit.kitchenTy : cit.livingTy) + 0.5) * ts,
      });
    }
    cit.waypoints = streetPts;
  }

  // Faz a moradora sair de dentro de casa pela porta para passear na cidade
  function _sendCitizenOutside(cit, ts) {
    cit.state = "exiting_house";
    cit.chatPartnerId = null;
    cit.chatText = "";
    cit.pauseTimer = 0;
    const doorStepY = cit.doorTy + (cit.house.doorOnSouth ? 1.15 : -1.15);
    cit.waypoints = [
      { x: (cit.hallTx + 0.5) * ts, y: (cit.hallTy + 0.5) * ts },
      { x: (cit.doorTx + 0.5) * ts, y: (cit.doorTy + 0.5) * ts, isDoorCrossing: true },
      { x: (cit.doorTx + 0.5) * ts, y: (doorStepY + 0.5) * ts, markOutside: true },
      { x: (cit.doorTx + 0.5) * ts, y: (cit.streetTy + 0.5) * ts, markOutside: true },
    ];
  }

  // Verifica se uma moradora está atravessando a porta de uma casa neste instante (para abrir a porta visualmente!)
  function isDoorwayUsedByCitizen(tx, ty) {
    const exp = _activeDoorwayTimers.get(`${tx},${ty}`);
    return exp !== undefined && exp > 0;
  }

  // Interação do jogador [F] com uma moradora, prisioneiro ou militar próximo
  function interactWithNearbyCitizen(playerX, playerY, isUnderground = false) {
    let best = null;
    let bestType = null;
    let bestDist = 52;

    if (!isUnderground) {
      for (let i = 0; i < CITIZENS.length; i++) {
        const c = CITIZENS[i];
        const d = Math.hypot(playerX - c.x, playerY - c.y);
        if (d < bestDist) {
          bestDist = d;
          best = c;
          bestType = "citizen";
        }
      }
    }

    for (let i = 0; i < SOLDIERS.length; i++) {
      const s = SOLDIERS[i];
      if (!!s.isUnderground !== !!isUnderground) continue;
      const d = Math.hypot(playerX - s.x, playerY - s.y);
      if (d < bestDist) {
        bestDist = d;
        best = s;
        bestType = "soldier";
      }
    }

    for (let i = 0; i < PRISONERS.length; i++) {
      const p = PRISONERS[i];
      if (!!p.isUnderground !== !!isUnderground) continue;
      const d = Math.hypot(playerX - p.x, playerY - p.y);
      if (d < bestDist) {
        bestDist = d;
        best = p;
        bestType = "prisoner";
      }
    }

    if (!best) return null;

    const dx = playerX - best.x;
    const dy = playerY - best.y;
    best.facing = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : (dy < 0 ? "up" : "down");
    best.pauseTimer = 3.0;

    if (bestType === "citizen") {
      const greetings = [
        `Olá, viajante! Sou ${best.shortName}, moro na Casa #${best.houseId}.`,
        `Que bom ver você nos Picos Gelados! A fogueira da praça está bem quentinha.`,
        `Todas nós usamos detalhes vermelhos nos trajes — é a tradição da nossa vila na neve!`,
        `Durante o dia passeamos e conversamos pela vila, mas à noite sempre voltamos para casa.`,
      ];
      const line = greetings[Math.floor(Math.random() * greetings.length)];
      best.chatText = line;
      best.state = best.isInsideHouse ? best.state : "interacting";
      best.stateTimer = 4.0;
      return {
        success: true,
        citizen: best,
        message: `💬 ${best.name}: "${line}"`,
      };
    }

    if (bestType === "soldier") {
      const rKey = best.rank === "Coronel"
        ? "coronel"
        : best.rank === "Capitão"
          ? "capitao"
          : best.rank === "Tenente"
            ? "tenente"
            : best.rank === "Carcereiro"
              ? "carcereiro"
              : "soldado";
      const pool = MILITARY_PHRASES[rKey] || MILITARY_PHRASES.soldado;
      const line = pool[Math.floor(Math.random() * pool.length)];
      best.chatText = line;
      best.stateTimer = 4.0;
      return {
        success: true,
        citizen: best,
        message: `⚔️ ${best.name}: "${line}"`,
      };
    }

    const line = PRISONER_PHRASES[Math.floor(Math.random() * PRISONER_PHRASES.length)];
    best.chatText = line;
    return {
      success: true,
      citizen: best,
      message: `⛓️ ${best.name}: "${line}"`,
    };
  }

  // Move uma entidade suavemente ao longo de sua lista de waypoints
  function _stepWaypoints(ent, ts, speedMul = 1.0) {
    if (!ent.waypoints || ent.waypoints.length === 0) {
      ent.isMoving = false;
      return false;
    }
    const wp = ent.waypoints[0];
    const dx = wp.x - ent.x;
    const dy = wp.y - ent.y;
    const dist = Math.hypot(dx, dy);
    const spd = (ent.speed || 1.0) * speedMul;

    if (wp.doorTileTx !== undefined && wp.doorTileTy !== undefined) {
      const dwX = (wp.doorTileTx + 0.5) * ts;
      const dwY = (wp.doorTileTy + 0.5) * ts;
      if (Math.hypot(ent.x - dwX, ent.y - dwY) < ts * 1.4) {
        _activeDoorwayTimers.set(`${wp.doorTileTx},${wp.doorTileTy}`, 14);
      }
    }

    if (dist <= spd * 1.45) {
      ent.x = wp.x;
      ent.y = wp.y;
      if (wp.markInside !== undefined) ent.isInsideHouse = !!wp.markInside;
      if (wp.setUnderground !== undefined) ent.isUnderground = !!wp.setUnderground;
      if (wp.teleportX !== undefined && wp.teleportY !== undefined) {
        ent.x = wp.teleportX;
        ent.y = wp.teleportY;
      }
      ent.waypoints.shift();
      if (ent.waypoints.length === 0) {
        ent.isMoving = false;
      }
      return true;
    }

    ent.x += (dx / dist) * spd;
    ent.y += (dy / dist) * spd;
    ent.isMoving = true;
    ent.walkPhase += 0.17 * speedMul;
    if (Math.abs(dx) > Math.abs(dy)) {
      ent.facing = dx < 0 ? "left" : "right";
    } else {
      ent.facing = dy < 0 ? "up" : "down";
    }
    return true;
  }

  // Constrói rota de qualquer ponto externo até entrar na casa `h` para dormir à noite (usado por Coronel, Capitão, Tenentes e Soldados)
  function _sendSoldierToHouseForNight(sol, ts) {
    const h = sol.homeHouse;
    const doorTx = h.cx;
    const doorTy = h.cy + (h.doorOnSouth ? h.halfH : -h.halfH);
    const streetRelY = h.relY < 0 ? -11.15 : 11.15;
    const doorStepY = doorTy + (h.doorOnSouth ? 1.1 : -1.1);
    const insideX = (h.cx + (sol.id % 2 === 0 ? -1.8 : 1.5) + 0.5) * ts;
    const insideY = (h.cy + (h.doorOnSouth ? -1.8 : 1.8) + 0.5) * ts;

    // Se o soldado estava dentro da mina subterrânea, primeiro sai da mina para a superfície!
    if (sol.isUnderground) {
      sol.isUnderground = false;
      sol.x = (PRISON_MINE_TX + 0.5) * ts;
      sol.y = (PRISON_MINE_TY + 1.2) * ts;
    }

    const pts = [];
    const curRx = sol.x / ts - 0.5 - CITY_CX;
    const curRy = sol.y / ts - 0.5 - CITY_CY;

    // Se estiver dentro do Quartel/Prisão (curRy >= 28 e |curRx| <= 36), sai pelo Portão Principal (0, 28)
    if (curRy >= 28 && Math.abs(curRx) <= 36) {
      if (curRy > 46) {
        pts.push({ x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 46.5) * ts, doorTileTx: CITY_CX, doorTileTy: CITY_CY + 46 });
      }
      pts.push({ x: (CITY_CX - 5.5) * ts, y: (CITY_CY + 32.5) * ts });
      pts.push({ x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 28.5) * ts, doorTileTx: CITY_CX, doorTileTy: CITY_CY + 28 });
      pts.push({ x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 11.65) * ts });
    } else if (curRx > 36 || curRy > 24) {
      // Se estiver na área externa da Mina Profunda, sobe pela trilha leste até a Rua Sul
      pts.push({ x: (CITY_CX + 41.5 + 0.5) * ts, y: (CITY_CY + 26.5 + 0.5) * ts });
      pts.push({ x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 26.5 + 0.5) * ts });
      pts.push({ x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 11.65) * ts });
    }

    const fromX = pts.length > 0 ? pts[pts.length - 1].x : sol.x;
    const fromY = pts.length > 0 ? pts[pts.length - 1].y : sol.y;
    const streetRoute = _buildStreetRoute(fromX, fromY, h.relX, streetRelY, ts);
    for (let k = 0; k < streetRoute.length; k++) pts.push(streetRoute[k]);

    pts.push({ x: (doorTx + 0.5) * ts, y: (doorStepY + 0.5) * ts, doorTileTx: doorTx, doorTileTy: doorTy });
    pts.push({ x: (doorTx + 0.5) * ts, y: (doorTy + 0.5) * ts, doorTileTx: doorTx, doorTileTy: doorTy, markInside: true });
    pts.push({ x: insideX, y: insideY, markInside: true });
    sol.waypoints = pts;
    sol.state = "going_home_night";
  }

  // Faz o soldado/oficial sair de casa de manhã cedo para retornar ao seu posto
  function _wakeSoldierFromHouse(sol, ts) {
    const h = sol.homeHouse;
    const doorTx = h.cx;
    const doorTy = h.cy + (h.doorOnSouth ? h.halfH : -h.halfH);
    const streetRelY = h.relY < 0 ? -11.15 : 11.15;
    const doorStepY = doorTy + (h.doorOnSouth ? 1.15 : -1.15);

    const pts = [
      { x: (doorTx + 0.5) * ts, y: (doorTy + 0.5) * ts, doorTileTx: doorTx, doorTileTy: doorTy, markInside: false },
      { x: (doorTx + 0.5) * ts, y: (doorStepY + 0.5) * ts, doorTileTx: doorTx, doorTileTy: doorTy, markInside: false },
      { x: (doorTx + 0.5) * ts, y: (CITY_CY + streetRelY + 0.5) * ts, markInside: false },
    ];

    // Vai pelas ruas até a saída Sul da Praça (0, 11.15 -> 0, 26.5)
    const toSouth = _buildStreetRoute(pts[2].x, pts[2].y, 0, 11.15, ts);
    for (let k = 0; k < toSouth.length; k++) pts.push(toSouth[k]);
    pts.push({ x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 26.8) * ts });

    if (sol.defaultUnderground) {
      // Soldado de ronda interna da mina: caminha até a entrada da mina e entra no subsolo!
      pts.push({ x: (CITY_CX + 41.5 + 0.5) * ts, y: (CITY_CY + 26.8) * ts });
      pts.push({ x: (CITY_CX + 41.5 + 0.5) * ts, y: (CITY_CY + 56.8) * ts });
      pts.push({
        x: (PRISON_MINE_TX + 0.5) * ts,
        y: (PRISON_MINE_TY + 0.5) * ts,
        setUnderground: true,
        teleportX: (PRISON_MINE_TX + 0.5) * ts,
        teleportY: (PRISON_MINE_TY + sol.postRy + 0.5) * ts,
      });
    } else if (sol.postRy >= 28 && Math.abs(sol.postRx) <= 35) {
      // Posto dentro do Quartel / Prisão / Sala do Coronel
      pts.push({ x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 28.5) * ts, doorTileTx: CITY_CX, doorTileTy: CITY_CY + 28 });
      pts.push({ x: (CITY_CX - 6.0 + 0.5) * ts, y: (CITY_CY + 33.5) * ts });
      if (sol.role === "colonel" || sol.role === "captain") {
        pts.push({ x: (CITY_CX - 14.0 + 0.5) * ts, y: (CITY_CY + 41.5) * ts, doorTileTx: CITY_CX - 14, doorTileTy: CITY_CY + 41 });
      } else if (sol.postRy > 46) {
        pts.push({ x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 46.5) * ts, doorTileTx: CITY_CX, doorTileTy: CITY_CY + 46 });
      }
      pts.push({ x: (CITY_CX + sol.postRx + 0.5) * ts, y: (CITY_CY + sol.postRy + 0.5) * ts });
    } else {
      // Posto externo na Entrada da Mina
      pts.push({ x: (CITY_CX + 41.5 + 0.5) * ts, y: (CITY_CY + 26.8) * ts });
      pts.push({ x: (CITY_CX + 41.5 + 0.5) * ts, y: (CITY_CY + 56.8) * ts });
      pts.push({ x: (CITY_CX + sol.postRx + 0.5) * ts, y: (CITY_CY + sol.postRy + 0.5) * ts });
    }

    sol.waypoints = pts;
    sol.state = "returning_to_duty";
  }

  // Atualiza os 32 Prisioneiros e todos os Soldados/Oficiais
  function _updatePrisonersAndSoldiers(ts, dt, timeOfDay, animTimer) {
    // Fases do dia para a Prisão e o Quartel:
    // - isMarchToMine (0.24 <= timeOfDay < 0.34): Fila de 32 prisioneiros levados das celas para a Mina por 6 Tenentes (2 frente, 2 meio, 2 fim)
    // - isMineWorkTime (0.34 <= timeOfDay <= 0.66): Prisioneiros escavando os túneis de terra da mina e retirando a terra para o monte externo
    // - isMarchToCells (0.66 < timeOfDay <= 0.75): Fila de 32 prisioneiros trazidos de volta da Mina para as celas pelos 6 Tenentes
    // - isPrisonNight (timeOfDay < 0.24 || timeOfDay > 0.75): Prisioneiros dentro das 4 Grandes Celas explorando e se aglomerando; metade dos soldados da mina/prisão e o Coronel em casa dormindo; 8 soldados na ronda da cidade!
    const isMarchToMine = timeOfDay >= 0.24 && timeOfDay < 0.34;
    const isMineWorkTime = timeOfDay >= 0.34 && timeOfDay <= 0.66;
    const isMarchToCells = timeOfDay > 0.66 && timeOfDay <= 0.75;
    const isNightShift = timeOfDay < 0.24 || timeOfDay > 0.75;

    // Progresso da marcha (0.0 a 1.0)
    const marchFrac = isMarchToMine
      ? (timeOfDay - 0.24) / 0.10
      : isMarchToCells
        ? (timeOfDay - 0.66) / 0.09
        : 0;
    // Distância percorrida pelo líder da fila ao longo da polilinha (_ROUTE_TOTAL_LEN ~ 125 blocos)
    const marchLeadDist = marchFrac * (_ROUTE_TOTAL_LEN + 30);

    // Mantém os portões da prisão e do quartel abertos durante a passagem da fila
    if (isMarchToMine || isMarchToCells) {
      _activeDoorwayTimers.set(`${CITY_CX},${CITY_CY + 28}`, 10);
      _activeDoorwayTimers.set(`${CITY_CX},${CITY_CY + 46}`, 10);
      _activeDoorwayTimers.set(`${CITY_CX - 4},${CITY_CY + 53}`, 10);
      _activeDoorwayTimers.set(`${CITY_CX + 4},${CITY_CY + 53}`, 10);
      _activeDoorwayTimers.set(`${CITY_CX - 4},${CITY_CY + 66}`, 10);
      _activeDoorwayTimers.set(`${CITY_CX + 4},${CITY_CY + 66}`, 10);
    }

    // =========================================================================
    // A. ATUALIZA OS 32 PRISIONEIROS
    // =========================================================================
    // Ponto de aglomeração dinâmico em cada uma das 4 grandes celas (muda a cada ~18s)
    const clusterCycle = Math.floor(animTimer * 0.08);
    const isClusterPhase = (Math.floor(animTimer * 0.12) % 3) !== 0; // 2/3 do tempo há grupos se aglomerando nas celas

    for (let i = 0; i < PRISONERS.length; i++) {
      const p = PRISONERS[i];
      if (p.pauseTimer > 0) p.pauseTimer = Math.max(0, p.pauseTimer - dt);

      // 1. MARCHA MATINAL (Celas -> Mina) ou MARCHA VESPERTINA (Mina -> Celas) EM FILA
      if (isMarchToMine || isMarchToCells) {
        p.isDigging = false;
        p.carryingDirt = false;
        p.waypoints = [];
        // Posição de cada prisioneiro na fila entre os 6 Tenentes:
        // - Prisioneiros 0..15 ficam entre os 2 Tenentes da Frente (offset 0) e os 2 Tenentes do Meio (offset 14.5)
        // - Prisioneiros 16..31 ficam entre os 2 Tenentes do Meio (offset 14.5) e os 2 Tenentes do Final (offset 29.0)
        const halfGroup = i < 16 ? 0 : 1;
        const rowInHalf = Math.floor((i % 16) / 2); // 0..7
        const sideSign = i % 2 === 0 ? -0.42 : 0.42;
        const distBehindLead = halfGroup === 0
          ? 2.2 + rowInHalf * 1.45
          : 16.5 + rowInHalf * 1.45;
        const myDist = marchLeadDist - distBehindLead;

        if (isMarchToMine && myDist >= _ROUTE_TOTAL_LEN) {
          // Já chegou na boca da Mina Profunda: inicia o trabalho na mina!
          if (p.worksUndergroundInMine) {
            p.isUnderground = true;
            p.x = (PRISON_MINE_TX + 0.5) * ts;
            p.y = (PRISON_MINE_TY + 2.5 + (i % 6)) * ts;
          } else {
            p.isUnderground = false;
            p.x = (CITY_CX + 46.5 + (i % 3)) * ts;
            p.y = (CITY_CY + 56.8) * ts;
          }
          p.isMoving = false;
        } else {
          p.isUnderground = false;
          const pos = _sampleRouteAtDist(myDist, sideSign, ts, isMarchToCells);
          p.x = pos.x;
          p.y = pos.y;
          p.facing = pos.facing;
          p.isMoving = myDist > 0 && myDist < _ROUTE_TOTAL_LEN;
          if (p.isMoving) p.walkPhase += 0.18;
          p.chatText = (i === 0 && Math.floor(animTimer) % 9 === 0)
            ? "Marchando em fila para a mina..."
            : "";
        }
        continue;
      }

      // 2. HORÁRIO DE TRABALHO NA MINA PROFUNDA (Escavar os túneis de terra e retirar a terra para fora)
      if (isMineWorkTime) {
        if (p.worksUndergroundInMine) {
          // Trabalha DENTRO dos túneis de terra da Mina Profunda (isUnderground = true)
          if (!p.isUnderground || p.mode !== "mine_work") {
            p.isUnderground = true;
            p.mode = "mine_work";
            p.carryingDirt = false;
            p.isDigging = false;
            p.x = (PRISON_MINE_TX + (i % 2 === 0 ? -1 : 1) + 0.5) * ts;
            p.y = (PRISON_MINE_TY + 8 + (i * 5) % 95 + 0.5) * ts;
            p.waypoints = [];
          }

          if (p.isDigging) {
            p.isMoving = false;
            p.digTimer -= dt;
            p.walkPhase += 0.22; // Anima os braços escavando a parede de terra!
            p.facing = p.digTargetMx < 0 ? "left" : p.digTargetMx > 0 ? "right" : "down";
            p.chatText = (i % 6 === 0 && Math.floor(animTimer + i) % 8 === 0)
              ? "Escavando o túnel de terra..."
              : "";
            if (p.digTimer <= 0) {
              // Terminou de encher o saco de terra: leva pelo túnel até a saída da mina!
              p.isDigging = false;
              p.carryingDirt = true;
              const spineX = (PRISON_MINE_TX + (i % 2 === 0 ? -0.8 : 0.8) + 0.5) * ts;
              const ribEntryY = (PRISON_MINE_TY + p.digTargetMy + 0.5) * ts;
              const exitX = (PRISON_MINE_TX + (i % 2 === 0 ? -1.2 : 1.2) + 0.5) * ts;
              const exitY = (PRISON_MINE_TY + 2.2 + 0.5) * ts;
              p.waypoints = [
                { x: spineX, y: ribEntryY },
                { x: exitX, y: exitY },
              ];
            }
          } else if (!_stepWaypoints(p, ts, p.carryingDirt ? 0.88 : 1.0)) {
            if (p.carryingDirt) {
              // Chegou perto da saída da mina e entregou o saco de terra para a turma externa: volta para escavar!
              p.carryingDirt = false;
              const spineX = (PRISON_MINE_TX + (i % 2 === 0 ? -0.8 : 0.8) + 0.5) * ts;
              const ribEntryY = (PRISON_MINE_TY + p.digTargetMy + 0.5) * ts;
              const digX = (PRISON_MINE_TX + p.digTargetMx + 0.5) * ts;
              const digY = (PRISON_MINE_TY + p.digTargetMy + 0.5) * ts;
              p.waypoints = [
                { x: spineX, y: ribEntryY },
                { x: digX, y: digY },
              ];
            } else {
              // Chegou na parede de terra do túnel: começa a escavar!
              p.isDigging = true;
              p.digTimer = 5.0 + (i % 5) * 1.2;
            }
          }
        } else {
          // Trabalha FORA da mina (isUnderground = false) retirando a terra da boca da mina até o Grande Monte de Terra!
          if (p.isUnderground || p.mode !== "mine_work") {
            p.isUnderground = false;
            p.mode = "mine_work";
            const lane = i - 20; // 0..11
            const startAtMine = lane % 2 === 0;
            p.carryingDirt = startAtMine;
            p.isDigging = false;
            p.x = (CITY_CX + (startAtMine ? 46.2 : 52.8) + (lane % 3) * 0.6 + 0.5) * ts;
            p.y = (CITY_CY + 55.8 + (lane % 4) * 0.7 + 0.5) * ts;
            p.waypoints = [];
          }

          if (p.pauseTimer <= 0 && !_stepWaypoints(p, ts, p.carryingDirt ? 0.86 : 1.0)) {
            const lane = i - 20;
            const rowOff = (lane % 4) * 0.75 - 1.1;
            if (p.carryingDirt) {
              // Estava indo com saco de terra para o Monte de Terra (ou acabou de chegar lá)
              const distToMound = Math.hypot(p.x - (CITY_CX + 53.2) * ts, p.y - (CITY_CY + 57.0) * ts);
              if (distToMound < ts * 2.5) {
                // Despeja a terra no grande monte de terra e volta vazio para a boca da mina!
                p.carryingDirt = false;
                p.pauseTimer = 1.2;
                p.facing = "right";
                p.chatText = (lane === 0 && Math.floor(animTimer) % 7 === 0) ? "Despejando a terra escavada..." : "";
                p.waypoints = [
                  { x: (CITY_CX + 46.2 + (lane % 2) * 0.6 + 0.5) * ts, y: (CITY_CY + 56.5 + rowOff * 0.5 + 0.5) * ts },
                ];
              } else {
                p.waypoints = [
                  { x: (CITY_CX + 52.8 + (lane % 2) * 0.7 + 0.5) * ts, y: (CITY_CY + 56.8 + rowOff + 0.5) * ts },
                ];
              }
            } else {
              // Chegou na boca da mina: pega outro saco cheio de terra dos túneis e leva até o Monte de Terra!
              p.carryingDirt = true;
              p.pauseTimer = 1.0;
              p.facing = "left";
              p.chatText = "";
              p.waypoints = [
                { x: (CITY_CX + 52.8 + (lane % 2) * 0.7 + 0.5) * ts, y: (CITY_CY + 56.8 + rowOff + 0.5) * ts },
              ];
            }
          }
        }
        continue;
      }

      // 3. DENTRO DAS 4 GRANDES CELAS COLETIVAS (Exploram o ambiente e às vezes se aglomeram!)
      const cz = p.cellZone;
      p.isUnderground = false;
      p.carryingDirt = false;
      p.isDigging = false;

      // Garante que está dentro dos limites da própria grande cela coletiva
      const curRx = p.x / ts - 0.5 - CITY_CX;
      const curRy = p.y / ts - 0.5 - CITY_CY;
      if (
        curRx < cz.minRx - 1 ||
        curRx > cz.maxRx + 1 ||
        curRy < cz.aislesRy[0] - 3 ||
        curRy > cz.aislesRy[cz.aislesRy.length - 1] + 3
      ) {
        const snapRx = cz.minRx + 3 + (p.slotInCell * 3) % (cz.maxRx - cz.minRx - 4);
        const snapRy = cz.aislesRy[p.slotInCell % cz.aislesRy.length];
        p.x = (CITY_CX + snapRx + 0.5) * ts;
        p.y = (CITY_CY + snapRy + 0.5) * ts;
        p.waypoints = [];
      }

      // Define se este prisioneiro participa da aglomeração atual da cela (6 dos 8 presos da cela se aglomeram)
      const shouldCluster = isClusterPhase && (p.slotInCell + clusterCycle) % 4 !== 0;
      p.mode = shouldCluster ? "cell_cluster" : "cell_explore";

      if (p.pauseTimer <= 0 && !_stepWaypoints(p, ts, 0.85)) {
        if (shouldCluster) {
          // Ponto de aglomeração (rodinha de prisioneiros conversando dentro da grande cela)
          const cSpotOffsets = [-8, 0, 7];
          const hubRx = cz.clusterRx + cSpotOffsets[(p.cellIdx + clusterCycle) % cSpotOffsets.length];
          const hubRy = cz.aislesRy[(p.cellIdx + clusterCycle) % cz.aislesRy.length];
          const angle = (p.slotInCell / 6) * Math.PI * 2;
          const targetRx = hubRx + Math.cos(angle) * 1.15;
          const targetRy = hubRy + Math.sin(angle) * 0.48;
          const dToHub = Math.hypot(curRx - targetRx, curRy - targetRy);

          if (dToHub > 0.6) {
            p.waypoints = [
              { x: (CITY_CX + targetRx + 0.5) * ts, y: (CITY_CY + targetRy + 0.5) * ts },
            ];
          } else {
            // Já está aglomerado na roda: olha para o centro da roda!
            p.facing = Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))
              ? (Math.cos(angle) > 0 ? "left" : "right")
              : (Math.sin(angle) > 0 ? "up" : "down");
            p.pauseTimer = 2.0 + Math.random() * 2.0;
            p.chatText = (p.slotInCell === 0 && Math.floor(animTimer + p.cellIdx) % 6 === 0)
              ? PRISONER_PHRASES[(p.id + clusterCycle) % PRISONER_PHRASES.length]
              : "";
          }
        } else {
          // Explora o ambiente da grande cela caminhando pelos corredores entre os beliches e grades
          p.chatText = "";
          const nextAisleRy = cz.aislesRy[Math.floor(Math.random() * cz.aislesRy.length)];
          const nextRx = cz.minRx + 2 + Math.random() * (cz.maxRx - cz.minRx - 4);
          p.waypoints = [
            { x: (CITY_CX + curRx + 0.5) * ts, y: (CITY_CY + nextAisleRy + 0.5) * ts },
            { x: (CITY_CX + nextRx + 0.5) * ts, y: (CITY_CY + nextAisleRy + 0.5) * ts },
          ];
          p.pauseTimer = 1.2 + Math.random() * 2.2;
        }
      }
    }

    // =========================================================================
    // B. ATUALIZA O CORONEL, CAPITÃO, 6 TENENTES, CARCEREIROS E SOLDADOS
    // =========================================================================
    const colonel = SOLDIERS[0];
    const captain = SOLDIERS[1];

    for (let i = 0; i < SOLDIERS.length; i++) {
      const s = SOLDIERS[i];
      if (s.pauseTimer > 0) s.pauseTimer = Math.max(0, s.pauseTimer - dt);

      // -----------------------------------------------------------------------
      // 1. ROTINA DO CORONEL (Chefe de todos):
      //    - Manhã (0.24..0.44): Sala de Administração (Sala do Coronel) conversando com o Capitão
      //    - Tarde (0.44..0.65): Anda pela cidade todo dia (Praça Central e Ruas)
      //    - Fim de tarde (0.65..0.75): Volta para o Quartel (Sala do Coronel / Pátio)
      //    - Noite (< 0.24 ou > 0.75): Vai para casa dormir!
      // -----------------------------------------------------------------------
      if (s.role === "colonel") {
        if (isNightShift) {
          if (s.state !== "going_home_night" && s.state !== "sleeping_at_home") {
            _sendSoldierToHouseForNight(s, ts);
          } else if (!_stepWaypoints(s, ts, 1.0)) {
            s.state = "sleeping_at_home";
            s.isInsideHouse = true;
            s.facing = "down";
            s.chatText = "";
          }
        } else if (timeOfDay >= 0.24 && timeOfDay < 0.44) {
          // Manhã na Sala de Administração (Sala do Coronel: rx = -22, ry = 40) esperando/conversando com o Capitão
          if (s.isInsideHouse || s.state === "sleeping_at_home" || s.state === "going_home_night") {
            _wakeSoldierFromHouse(s, ts);
            s.state = "going_to_office";
          } else if (!_stepWaypoints(s, ts, 1.0)) {
            const officeX = (CITY_CX - 22.0 + 0.5) * ts;
            const officeY = (CITY_CY + 40.0 + 0.5) * ts;
            if (Math.hypot(s.x - officeX, s.y - officeY) > ts * 1.2) {
              s.waypoints = [
                { x: (CITY_CX - 14.0 + 0.5) * ts, y: (CITY_CY + 41.0 + 0.5) * ts, doorTileTx: CITY_CX - 14, doorTileTy: CITY_CY + 41 },
                { x: officeX, y: officeY },
              ];
            } else {
              s.state = "in_office_waiting_captain";
              s.facing = "right";
              const capDist = captain ? Math.hypot(captain.x - s.x, captain.y - s.y) : 999;
              s.chatText = capDist < ts * 3.5
                ? "Capitão, mantenha os presos escavando a mina sem descanso!"
                : "";
            }
          }
        } else if (timeOfDay >= 0.44 && timeOfDay < 0.65) {
          // Depois de conversar com o Capitão, o Coronel sai do Quartel e anda pela cidade todo dia!
          s.chatText = "";
          if (s.state !== "strolling_city") {
            s.state = "strolling_city";
            s.waypoints = [
              { x: (CITY_CX - 14.0 + 0.5) * ts, y: (CITY_CY + 41.0 + 0.5) * ts, doorTileTx: CITY_CX - 14, doorTileTy: CITY_CY + 41 },
              { x: (CITY_CX - 6.0 + 0.5) * ts, y: (CITY_CY + 32.0 + 0.5) * ts },
              { x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 28.0 + 0.5) * ts, doorTileTx: CITY_CX, doorTileTy: CITY_CY + 28 },
              { x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 11.15 + 0.5) * ts },
            ];
          } else if (s.pauseTimer <= 0 && !_stepWaypoints(s, ts, 0.95)) {
            _assignStrollDestination(s, ts);
            s.pauseTimer = 1.5;
          }
        } else {
          // Fim de tarde (0.65..0.75): Volta da cidade para o Quartel antes de ir para casa à noite!
          if (s.state !== "returning_to_barracks") {
            s.state = "returning_to_barracks";
            const toGate = _buildStreetRoute(s.x, s.y, 0, 11.15, ts);
            toGate.push({ x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 28.0 + 0.5) * ts, doorTileTx: CITY_CX, doorTileTy: CITY_CY + 28 });
            toGate.push({ x: (CITY_CX - 6.0 + 0.5) * ts, y: (CITY_CY + 33.0 + 0.5) * ts });
            toGate.push({ x: (CITY_CX - 14.0 + 0.5) * ts, y: (CITY_CY + 41.0 + 0.5) * ts, doorTileTx: CITY_CX - 14, doorTileTy: CITY_CY + 41 });
            toGate.push({ x: (CITY_CX - 22.0 + 0.5) * ts, y: (CITY_CY + 40.0 + 0.5) * ts });
            s.waypoints = toGate;
          } else {
            _stepWaypoints(s, ts, 1.0);
          }
        }
        continue;
      }

      // -----------------------------------------------------------------------
      // 2. ROTINA DO CAPITÃO:
      //    - Vai e volta da Mina Profunda de tempos em tempos até a Sala do Coronel!
      // -----------------------------------------------------------------------
      if (s.role === "captain") {
        if (isNightShift) {
          if (s.state !== "going_home_night" && s.state !== "sleeping_at_home") {
            _sendSoldierToHouseForNight(s, ts);
          } else if (!_stepWaypoints(s, ts, 1.0)) {
            s.state = "sleeping_at_home";
            s.isInsideHouse = true;
            s.facing = "down";
            s.chatText = "";
          }
        } else {
          if (s.isInsideHouse || s.state === "sleeping_at_home" || s.state === "going_home_night") {
            _wakeSoldierFromHouse(s, ts);
            s.state = "duty";
            s.captainPhase = "at_colonel";
            s.captainTimer = 5.0;
          } else if (!_stepWaypoints(s, ts, 1.15)) {
            s.captainTimer -= dt;
            if (s.captainPhase === "at_colonel") {
              s.facing = "left";
              const colDist = colonel ? Math.hypot(colonel.x - s.x, colonel.y - s.y) : 999;
              s.chatText = colDist < ts * 3.5
                ? "Coronel, a escavação nos túneis da mina segue em ritmo total!"
                : "Verificando ordens na Sala do Coronel...";
              if (s.captainTimer <= 0) {
                // Sai da Sala do Coronel e caminha até a Entrada da Mina Profunda!
                s.captainPhase = "to_mine";
                s.chatText = "";
                s.waypoints = [
                  { x: (CITY_CX - 14.0 + 0.5) * ts, y: (CITY_CY + 41.0 + 0.5) * ts, doorTileTx: CITY_CX - 14, doorTileTy: CITY_CY + 41 },
                  { x: (CITY_CX - 6.0 + 0.5) * ts, y: (CITY_CY + 31.0 + 0.5) * ts },
                  { x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 28.0 + 0.5) * ts, doorTileTx: CITY_CX, doorTileTy: CITY_CY + 28 },
                  { x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 26.5 + 0.5) * ts },
                  { x: (CITY_CX + 41.5 + 0.5) * ts, y: (CITY_CY + 26.5 + 0.5) * ts },
                  { x: (CITY_CX + 41.5 + 0.5) * ts, y: (CITY_CY + 56.5 + 0.5) * ts },
                  { x: (CITY_CX + 45.0 + 0.5) * ts, y: (CITY_CY + 57.5 + 0.5) * ts },
                ];
              }
            } else if (s.captainPhase === "to_mine") {
              s.captainPhase = "at_mine";
              s.captainTimer = 6.0;
            } else if (s.captainPhase === "at_mine") {
              s.facing = "right";
              s.chatText = "Mais rápido com essa terra, prisioneiros! Tenentes, vigiem a fila!";
              if (s.captainTimer <= 0) {
                // Volta da Mina Profunda até a Sala do Coronel!
                s.captainPhase = "to_colonel";
                s.chatText = "";
                s.waypoints = [
                  { x: (CITY_CX + 41.5 + 0.5) * ts, y: (CITY_CY + 56.5 + 0.5) * ts },
                  { x: (CITY_CX + 41.5 + 0.5) * ts, y: (CITY_CY + 26.5 + 0.5) * ts },
                  { x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 26.5 + 0.5) * ts },
                  { x: (CITY_CX + 0.5) * ts, y: (CITY_CY + 28.0 + 0.5) * ts, doorTileTx: CITY_CX, doorTileTy: CITY_CY + 28 },
                  { x: (CITY_CX - 6.0 + 0.5) * ts, y: (CITY_CY + 31.0 + 0.5) * ts },
                  { x: (CITY_CX - 14.0 + 0.5) * ts, y: (CITY_CY + 41.0 + 0.5) * ts, doorTileTx: CITY_CX - 14, doorTileTy: CITY_CY + 41 },
                  { x: (CITY_CX - 19.8 + 0.5) * ts, y: (CITY_CY + 40.0 + 0.5) * ts },
                ];
              }
            } else if (s.captainPhase === "to_colonel") {
              s.captainPhase = "at_colonel";
              s.captainTimer = 6.5;
            }
          }
        }
        continue;
      }

      // -----------------------------------------------------------------------
      // 3. ROTINA DOS 6 TENENTES:
      //    - De manhã cedo (isMarchToMine) e ao entardecer (isMarchToCells):
      //      2 na frente da fila, 2 no meio da fila e 2 no final da fila escoltando os 32 prisioneiros!
      //    - Durante o dia (isMineWorkTime): supervisionam a retirada de terra na Mina Profunda!
      //    - À noite (isNightShift): metade (3 tenentes) vai para casa dormir e retorna de dia!
      // -----------------------------------------------------------------------
      if (s.role === "lieutenant") {
        const lt = s.ltIndex; // 0,1 = frente; 2,3 = meio; 4,5 = final
        if (isMarchToMine || isMarchToCells) {
          s.isInsideHouse = false;
          s.isUnderground = false;
          s.waypoints = [];
          const sideSign = lt % 2 === 0 ? -0.58 : 0.58;
          // Posição exata na fila: 0,1 na frente (dist = 0); 2,3 no meio (dist = 14.4); 4,5 no final (dist = 29.0)
          const distBehindLead = lt < 2 ? 0 : lt < 4 ? 14.4 : 29.0;
          const myDist = marchLeadDist - distBehindLead;
          const pos = _sampleRouteAtDist(myDist, sideSign, ts, isMarchToCells);
          s.x = pos.x;
          s.y = pos.y;
          s.facing = pos.facing;
          s.isMoving = myDist > 0 && myDist < _ROUTE_TOTAL_LEN;
          if (s.isMoving) s.walkPhase += 0.18;
          s.chatText = (lt === 0 && Math.floor(animTimer) % 8 === 0)
            ? "Mantenham a fila dos prisioneiros andando!"
            : "";
          continue;
        }

        if (isMineWorkTime) {
          s.isInsideHouse = false;
          s.isUnderground = false;
          if (s.pauseTimer <= 0 && !_stepWaypoints(s, ts, 0.95)) {
            // Ronda de supervisão ao redor da boca da mina e do grande monte de terra
            const spots = [
              { rx: 44.0, ry: 54.5 },
              { rx: 49.5, ry: 54.5 },
              { rx: 52.0, ry: 59.8 },
              { rx: 44.5, ry: 59.8 },
            ];
            const pick = spots[(lt + Math.floor(animTimer * 0.2)) % spots.length];
            s.waypoints = [
              { x: (CITY_CX + pick.rx + (lt % 2) * 1.2 + 0.5) * ts, y: (CITY_CY + pick.ry + 0.5) * ts },
            ];
            s.pauseTimer = 2.0 + (lt % 3);
            s.facing = pick.ry < 56 ? "down" : "up";
          }
          continue;
        }

        // Horário noturno para os Tenentes: metade vai para casa dormir, metade vigia o Quartel
        if (s.goesHomeAtNight) {
          if (s.state !== "going_home_night" && s.state !== "sleeping_at_home") {
            _sendSoldierToHouseForNight(s, ts);
          } else if (!_stepWaypoints(s, ts, 1.0)) {
            s.state = "sleeping_at_home";
            s.isInsideHouse = true;
            s.facing = "down";
          }
        } else {
          if (s.pauseTimer <= 0 && !_stepWaypoints(s, ts, 0.9)) {
            const pSpots = [
              { rx: -6.0, ry: 33.0 },
              { rx: 6.0,  ry: 33.0 },
              { rx: -6.0, ry: 43.0 },
              { rx: 6.0,  ry: 43.0 },
            ];
            const sp = pSpots[(lt + Math.floor(animTimer * 0.15)) % pSpots.length];
            s.waypoints = [{ x: (CITY_CX + sp.rx + 0.5) * ts, y: (CITY_CY + sp.ry + 0.5) * ts }];
            s.pauseTimer = 2.5;
          }
        }
        continue;
      }

      // -----------------------------------------------------------------------
      // 4. ROTINA DOS SOLDADOS E CARCEREIROS DA MINA E PRISÃO
      //    (Metade vai para as casas dormir à noite e retorna de dia!)
      // -----------------------------------------------------------------------
      if (
        s.role === "prison_corridor_guard" ||
        s.role === "main_gate_guard" ||
        s.role === "mine_entrance_guard" ||
        s.role === "mine_inside_patrol"
      ) {
        if (isNightShift && s.goesHomeAtNight) {
          if (s.state !== "going_home_night" && s.state !== "sleeping_at_home") {
            _sendSoldierToHouseForNight(s, ts);
          } else if (!_stepWaypoints(s, ts, 1.0)) {
            s.state = "sleeping_at_home";
            s.isInsideHouse = true;
            s.facing = "down";
          }
          continue;
        }

        // Se amanheceu e estava dormindo em casa, retorna ao seu posto!
        if (!isNightShift && (s.isInsideHouse || s.state === "sleeping_at_home" || s.state === "going_home_night")) {
          _wakeSoldierFromHouse(s, ts);
          continue;
        }
        if (s.state === "returning_to_duty") {
          if (!_stepWaypoints(s, ts, 1.05)) {
            s.state = "duty";
          }
          continue;
        }

        // Comportamento no posto durante o turno:
        if (s.role === "prison_corridor_guard") {
          // 2 soldados como vigia nos corredores da prisão (patrulham relY de 48 a 72 ao longo das grades das celas)
          if (s.pauseTimer <= 0 && !_stepWaypoints(s, ts, 0.85)) {
            const targetRy = s.patrolStep % 2 === 0 ? 71.5 : 48.5;
            s.patrolStep++;
            s.waypoints = [{ x: (CITY_CX + s.postRx + 0.5) * ts, y: (CITY_CY + targetRy + 0.5) * ts }];
            s.pauseTimer = 1.8;
          }
        } else if (s.role === "main_gate_guard") {
          // 2 soldados na porta principal do quartel
          if (s.pauseTimer <= 0 && !_stepWaypoints(s, ts, 0.75)) {
            const offsetRx = (s.patrolStep % 2 === 0) ? 0 : (s.postRx < 0 ? -1.4 : 1.4);
            s.patrolStep++;
            s.waypoints = [{ x: (CITY_CX + s.postRx + offsetRx + 0.5) * ts, y: (CITY_CY + s.postRy + 0.5) * ts }];
            s.pauseTimer = 3.2;
            s.facing = "up";
          }
        } else if (s.role === "mine_entrance_guard") {
          // 2 soldados na entrada da mina
          if (s.pauseTimer <= 0 && !_stepWaypoints(s, ts, 0.78)) {
            const offsetRy = (s.patrolStep % 2 === 0) ? -1.2 : 1.2;
            s.patrolStep++;
            s.waypoints = [{ x: (CITY_CX + s.postRx + 0.5) * ts, y: (CITY_CY + s.postRy + offsetRy + 0.5) * ts }];
            s.pauseTimer = 2.8;
            s.facing = "down";
          }
        } else if (s.role === "mine_inside_patrol") {
          // 4 soldados dentro da mina fazendo ronda pelos túneis longos de terra (espinha e costelas)!
          s.isUnderground = true;
          if (s.pauseTimer <= 0 && !_stepWaypoints(s, ts, 0.92)) {
            const ribList = [14, 29, 44, 59, 74, 89, 104, 119, 134];
            const myRib = ribList[(s.minePatrolIndex * 2 + s.patrolStep) % ribList.length];
            const dir = (s.patrolStep % 2 === 0) ? -1 : 1;
            const ribTargetX = dir * (14 + (s.minePatrolIndex * 3) % 10);
            s.patrolStep++;
            s.waypoints = [
              { x: (PRISON_MINE_TX + 0.5) * ts, y: (PRISON_MINE_TY + myRib + 0.5) * ts },
              { x: (PRISON_MINE_TX + ribTargetX + 0.5) * ts, y: (PRISON_MINE_TY + myRib + 0.5) * ts },
              { x: (PRISON_MINE_TX + 0.5) * ts, y: (PRISON_MINE_TY + myRib + 0.5) * ts },
            ];
            s.pauseTimer = 1.4;
          }
        }
        continue;
      }

      // -----------------------------------------------------------------------
      // 5. SOLDADOS FAZENDO RONDA NA CIDADE (4 soldados de dia e 8 soldados à noite!)
      // -----------------------------------------------------------------------
      if (s.role === "city_patrol_day_night") {
        // Os 4 primeiros fazem ronda nas ruas da cidade de dia e de noite
        s.isInsideHouse = false;
        s.isUnderground = false;
        if (s.pauseTimer <= 0 && !_stepWaypoints(s, ts, 0.95)) {
          _assignStrollDestination(s, ts);
          s.pauseTimer = 1.0;
        }
      } else if (s.role === "city_patrol_night_extra") {
        // Os 4 soldados extras da noite: descansam em casa de dia e saem para fazer ronda à noite (totalizando 8 à noite!)
        if (isNightShift) {
          if (s.isInsideHouse || s.state === "resting_day_at_home" || s.state === "going_home_day") {
            const h = s.homeHouse;
            const doorTx = h.cx;
            const doorTy = h.cy + (h.doorOnSouth ? h.halfH : -h.halfH);
            const streetRelY = h.relY < 0 ? -11.15 : 11.15;
            s.waypoints = [
              { x: (doorTx + 0.5) * ts, y: (doorTy + 0.5) * ts, doorTileTx: doorTx, doorTileTy: doorTy, markInside: false },
              { x: (doorTx + 0.5) * ts, y: (CITY_CY + streetRelY + 0.5) * ts, markInside: false },
            ];
            s.state = "night_patrol";
          } else if (s.pauseTimer <= 0 && !_stepWaypoints(s, ts, 0.98)) {
            _assignStrollDestination(s, ts);
            s.pauseTimer = 1.0;
          }
        } else {
          // Durante o dia recolhem-se para casa para que fiquem exatamente 4 soldados em ronda de dia!
          if (!s.isInsideHouse && s.state !== "going_home_day") {
            _sendSoldierToHouseForNight(s, ts);
            s.state = "going_home_day";
          } else if (!_stepWaypoints(s, ts, 1.0)) {
            s.state = "resting_day_at_home";
            s.isInsideHouse = true;
          }
        }
      }
    }
  }

  // Atualiza a rotina de todas as moradoras, prisioneiros e soldados e retorna os itens de renderização ordenados por Y
  function updateAndGetCitizenRenderItems(ctx, tileSize, player, timeOfDay, animTimer, viewLeft, viewRight, viewTop, viewBottom, isUnderground = false) {
    const ts = tileSize || 36;
    _initCitizens(ts);

    // Só processa se o jogador estiver próximo do território da Vila Glacial ou dentro da Mina Profunda
    if (player) {
      const distToCity = Math.hypot(player.x - CITY_CX * ts, player.y - CITY_CY * ts);
      const distToMine = Math.hypot(player.x - PRISON_MINE_TX * ts, player.y - PRISON_MINE_TY * ts);
      if (distToCity > (CITY_RADIUS + 95) * ts && distToMine > 190 * ts) return [];
    }

    // Decrementa timers de portas abertas pelas moradoras / soldados / prisioneiros
    for (const [k, v] of _activeDoorwayTimers.entries()) {
      if (v <= 1) _activeDoorwayTimers.delete(k);
      else _activeDoorwayTimers.set(k, v - 1);
    }

    const dt = 0.016;
    const isNight = timeOfDay < 0.24 || timeOfDay > 0.76;
    const activePlayerHouseId = (!isUnderground && player) ? getActiveHouseForPlayer(player.x, player.y, ts) : null;

    // Atualiza os 32 Prisioneiros e todos os Soldados/Oficiais (tanto na superfície quanto na mina subterrânea!)
    _updatePrisonersAndSoldiers(ts, dt, timeOfDay, animTimer);

    for (let i = 0; i < CITIZENS.length; i++) {
      const c = CITIZENS[i];
      if (c.chatCooldown > 0) c.chatCooldown = Math.max(0, c.chatCooldown - dt);

      // 1. REGRA DA NOITE: Ao anoitecer, todas voltam para passar a noite em sua casa!
      if (isNight) {
        if (c.state !== "returning_home_night" && c.state !== "night_at_home") {
          _sendCitizenHome(c, ts, true);
        }
      } else {
        if (c.state === "night_at_home" || c.state === "returning_home_night") {
          c.state = c.isInsideHouse ? "inside_home" : "strolling";
          c.stateTimer = 1.5 + (c.id % 6) * 0.8;
          if (!c.isInsideHouse) _assignStrollDestination(c, ts);
        }
      }

      if (c.state === "interacting") {
        c.isMoving = false;
        c.stateTimer -= dt;
        if (c.stateTimer <= 0) {
          c.state = "strolling";
          c.chatPartnerId = null;
          c.chatText = "";
          c.chatCooldown = 10 + Math.random() * 10;
          if (!c.waypoints || c.waypoints.length === 0) {
            _assignStrollDestination(c, ts);
          }
        }
        continue;
      }

      if (c.pauseTimer > 0) {
        c.pauseTimer -= dt;
        c.isMoving = false;
        continue;
      }

      if (c.waypoints && c.waypoints.length > 0) {
        const wp = c.waypoints[0];
        const dx = wp.x - c.x;
        const dy = wp.y - c.y;
        const dist = Math.hypot(dx, dy);

        const doorWorldX = (c.doorTx + 0.5) * ts;
        const doorWorldY = (c.doorTy + 0.5) * ts;
        if (Math.hypot(c.x - doorWorldX, c.y - doorWorldY) < ts * 1.15) {
          _activeDoorwayTimers.set(`${c.doorTx},${c.doorTy}`, 12);
        }

        if (dist <= c.speed * 1.4) {
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
              c.stateTimer = 8 + Math.random() * 10;
              c.pauseTimer = 1.5;
            } else if (c.state === "exiting_house") {
              c.isInsideHouse = false;
              c.state = "strolling";
              c.stateTimer = 25 + Math.random() * 30;
              _assignStrollDestination(c, ts);
            } else if (c.state === "strolling") {
              c.pauseTimer = 1.2 + Math.random() * 2.5;
            } else if (c.state === "inside_home") {
              c.pauseTimer = 1.8 + Math.random() * 2.2;
            }
          }
        } else {
          const step = c.speed;
          c.x += (dx / dist) * step;
          c.y += (dy / dist) * step;
          c.isMoving = true;
          c.walkPhase += 0.16;
          if (Math.abs(dx) > Math.abs(dy)) {
            c.facing = dx < 0 ? "left" : "right";
          } else {
            c.facing = dy < 0 ? "up" : "down";
          }
        }
      } else {
        c.isMoving = false;
      }

      if (!isNight) {
        if (c.state === "inside_home") {
          c.stateTimer -= dt;
          if (c.stateTimer <= 0) {
            _sendCitizenOutside(c, ts);
          } else if (!c.waypoints || c.waypoints.length === 0) {
            const spots = [
              { tx: c.livingTx, ty: c.livingTy },
              { tx: c.kitchenTx, ty: c.kitchenTy },
              { tx: c.bedTx, ty: c.bedTy },
            ];
            const pick = spots[Math.floor(Math.random() * spots.length)];
            c.waypoints = [
              { x: (c.hallTx + 0.5) * ts, y: (c.hallTy + 0.5) * ts },
              { x: (pick.tx + 0.5) * ts, y: (pick.ty + 0.5) * ts },
            ];
          }
        } else if (c.state === "strolling") {
          c.stateTimer -= dt;
          if (c.stateTimer <= 0) {
            _sendCitizenHome(c, ts, false);
          } else if (!c.waypoints || c.waypoints.length === 0) {
            _assignStrollDestination(c, ts);
          }

          if (c.chatCooldown <= 0 && !c.isInsideHouse) {
            for (let j = i + 1; j < CITIZENS.length; j++) {
              const other = CITIZENS[j];
              if (
                !other.isInsideHouse &&
                other.state === "strolling" &&
                other.chatCooldown <= 0
              ) {
                const d = Math.hypot(c.x - other.x, c.y - other.y);
                if (d >= 16 && d <= 42) {
                  const chatDur = 4.5 + Math.random() * 2.5;
                  c.state = "interacting";
                  other.state = "interacting";
                  c.stateTimer = chatDur;
                  other.stateTimer = chatDur;
                  c.chatPartnerId = other.id;
                  other.chatPartnerId = c.id;
                  c.isMoving = false;
                  other.isMoving = false;

                  const cdx = other.x - c.x;
                  const cdy = other.y - c.y;
                  if (Math.abs(cdx) >= Math.abs(cdy)) {
                    c.facing = cdx >= 0 ? "right" : "left";
                    other.facing = cdx >= 0 ? "left" : "right";
                  } else {
                    c.facing = cdy >= 0 ? "down" : "up";
                    other.facing = cdy >= 0 ? "up" : "down";
                  }

                  c.chatText = CHAT_PHRASES[(c.id + other.id + Math.floor(animTimer)) % CHAT_PHRASES.length];
                  other.chatText = "";
                  break;
                }
              }
            }
          }
        }
      }
    }

    const items = [];

    // 1. Renderiza as moradoras (apenas na superfície)
    if (!isUnderground) {
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
          draw: () => _renderCitizen(ctx, c, timeOfDay, animTimer, player),
        });
      }
    }

    // 2. Renderiza os 32 Prisioneiros (na superfície ou dentro da Mina Profunda, conforme p.isUnderground)
    for (let i = 0; i < PRISONERS.length; i++) {
      const p = PRISONERS[i];
      if (!!p.isUnderground !== !!isUnderground) continue;
      if (
        p.x < viewLeft - 48 ||
        p.x > viewRight + 48 ||
        p.y < viewTop - 48 ||
        p.y > viewBottom + 48
      ) {
        continue;
      }
      // [PERF] Se o prisioneiro está dentro da sua cela coletiva coberta pelo telhado e o jogador não está na mesma cela,
      // pula o desenho (o telhado cobre toda a cela!)
      if (
        !isUnderground &&
        (p.mode === "cell_explore" || p.mode === "cell_cluster") &&
        p.cellZone &&
        activePlayerHouseId !== p.cellZone.roofId
      ) {
        continue;
      }
      items.push({
        y: p.y,
        draw: () => _renderPrisoner(ctx, p, timeOfDay, animTimer, player),
      });
    }

    // 3. Renderiza todos os Soldados, Carcereiros, Tenentes, Capitão e Coronel
    for (let i = 0; i < SOLDIERS.length; i++) {
      const s = SOLDIERS[i];
      if (!!s.isUnderground !== !!isUnderground) continue;
      if (
        s.x < viewLeft - 48 ||
        s.x > viewRight + 48 ||
        s.y < viewTop - 48 ||
        s.y > viewBottom + 48
      ) {
        continue;
      }
      if (!isUnderground && s.isInsideHouse && activePlayerHouseId !== s.homeHouseId) {
        continue;
      }
      // [PERF] Se o Coronel ou Capitão está dentro da Sala de Administração (barracks_west) e o telhado dessa ala está fechado, pula o desenho
      if (
        !isUnderground &&
        (s.role === "colonel" || s.role === "captain") &&
        activePlayerHouseId !== "barracks_west"
      ) {
        const srx = s.x / ts - 0.5 - CITY_CX;
        const sry = s.y / ts - 0.5 - CITY_CY;
        if (srx > -34 && srx < -14 && sry > 29 && sry < 45) {
          continue;
        }
      }
      items.push({
        y: s.y,
        draw: () => _renderSoldier(ctx, s, timeOfDay, animTimer, player),
      });
    }

    return items;
  }

  // Renderiza um Prisioneiro (tons de pele variados, TODOS com roupas brancas rasgadas, animação de escavar terra ou carregar saco de terra)
  function _renderPrisoner(c, p, timeOfDay, animTimer, player) {
    c.save();
    c.translate(p.x, p.y);

    const w = p.facing || "down";
    const isMoving = !!p.isMoving;
    const isDigging = !!p.isDigging;
    const carryingDirt = !!p.carryingDirt;
    const walkSin = (isMoving || isDigging) ? Math.sin(p.walkPhase) : 0;
    const bob = isMoving
      ? Math.abs(Math.sin(p.walkPhase)) * 1.6
      : isDigging
        ? Math.abs(Math.sin(p.walkPhase * 1.4)) * 2.1
        : Math.sin(animTimer * 2 + p.id) * 0.3;

    // 1. Sombra no chão
    c.fillStyle = "rgba(15, 23, 42, 0.36)";
    c.beginPath();
    c.ellipse(0, 2.5, 7.5, 4.0, 0, 0, Math.PI * 2);
    c.fill();

    // 2. Pernas com calças brancas rasgadas na canela e pés descalços/enfaixados
    const legL = isMoving ? walkSin * 3.0 : 0;
    const legR = isMoving ? -walkSin * 3.0 : 0;
    // Pés (tom de pele variado + atadura suja)
    c.fillStyle = p.skinColor;
    if (w === "up" || w === "down") {
      c.fillRect(-5, 1 + legL, 3.5, 4.2);
      c.fillRect(1.5, 1 + legR, 3.5, 4.2);
      // Calça branca rasgada acima do tornozelo
      c.fillStyle = "#e2e8f0";
      c.fillRect(-5.2, -3 + legL * 0.6, 3.9, 4.6);
      c.fillRect(1.3, -3 + legR * 0.6, 3.9, 4.6);
    } else {
      c.fillRect(-2.4 + legL, 1, 3.6, 4.2);
      c.fillRect(-0.8 + legR, 1, 3.6, 4.2);
      c.fillStyle = "#e2e8f0";
      c.fillRect(-2.6 + legL * 0.6, -3, 3.9, 4.6);
      c.fillRect(-1.0 + legR * 0.6, -3, 3.9, 4.6);
    }

    // 3. Túnica/Camisa Branca Rasgada (com pontas desfiadas, rasgos e manchas de terra da escavação)
    c.fillStyle = "#f1f5f9";
    c.fillRect(-6.5, -15.5 - bob, 13, 12.2);

    // Barra inferior rasgada em zigue-zague (farrapos brancos pendurados)
    c.fillStyle = "#f1f5f9";
    for (let tx = -6; tx <= 4; tx += 3.2) {
      c.beginPath();
      c.moveTo(tx, -3.5 - bob);
      c.lineTo(tx + 1.6, -1.0 - bob + ((Math.abs(tx + p.id) % 2) * 1.1));
      c.lineTo(tx + 3.0, -3.5 - bob);
      c.closePath();
      c.fill();
    }

    // Rasgos nas roupas brancas mostrando a pele por baixo e manchas de terra marrom
    c.fillStyle = p.skinColor;
    c.fillRect(-4.2, -12.5 - bob, 2.6, 1.8); // Rasgo no peito/ombro
    c.fillRect(1.8, -8.5 - bob, 2.8, 1.6);   // Rasgo na costela
    // Manchas de barro/terra na roupa branca
    c.fillStyle = "rgba(120, 53, 15, 0.35)";
    c.fillRect(-5.5, -6.5 - bob, 4.2, 2.5);
    c.fillRect(1.5, -14.0 - bob, 3.5, 2.2);
    // Corda rústica amarrada na cintura
    c.fillStyle = "#78350f";
    c.fillRect(-6.6, -6.8 - bob, 13.2, 1.4);

    // 4. Braços com mangas brancas rasgadas + Animação de Escavar ou Carregar Saco de Terra
    const armSwing = isDigging ? Math.sin(p.walkPhase * 1.6) * 5.2 : walkSin * 2.8;
    if (carryingDirt) {
      // Braços segurando um grande saco/cesto de terra escavada na frente do corpo!
      c.fillStyle = "#f1f5f9";
      c.fillRect(-8.5, -14.5 - bob, 2.5, 4.5);
      c.fillRect(6.0, -14.5 - bob, 2.5, 4.5);
      c.fillStyle = p.skinColor;
      c.fillRect(-8.2, -10.2 - bob, 2.2, 3.5);
      c.fillRect(6.0, -10.2 - bob, 2.2, 3.5);

      // Saco/Cesto cheio de TERRA MARROM ESCAVADA (sem neve!)
      const bagX = w === "left" ? -3.5 : w === "right" ? 3.5 : 0;
      const bagY = -9.5 - bob;
      c.fillStyle = "#451a03";
      c.beginPath();
      c.ellipse(bagX, bagY, 6.2, 4.5, 0, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#78350f";
      c.beginPath();
      c.ellipse(bagX, bagY - 1.2, 5.2, 3.2, 0, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#92400e";
      c.fillRect(bagX - 2.5, bagY - 2.5, 2.2, 1.6);
      c.fillRect(bagX + 0.8, bagY - 1.8, 1.8, 1.4);
    } else {
      // Braços normais ou golpeando a terra na escavação
      c.fillStyle = "#f1f5f9";
      c.fillRect(-8.6, -15.0 - bob + armSwing * 0.3, 2.4, 4.0); // Manga branca curta/rasgada
      c.fillRect(6.2, -15.0 - bob - armSwing * 0.3, 2.4, 4.0);
      c.fillStyle = p.skinColor;
      c.fillRect(-8.4, -11.0 - bob + armSwing * 0.5, 2.1, 4.8);
      c.fillRect(6.3, -11.0 - bob - armSwing * 0.5, 2.1, 4.8);

      // Se estiver escavando dentro do túnel da mina, desenha a pá/picareta e torrões de terra voando!
      if (isDigging) {
        const dirX = w === "left" ? -1 : 1;
        c.save();
        c.translate(dirX * 6, -10 - bob);
        c.rotate(dirX * (0.4 + Math.sin(p.walkPhase * 1.6) * 0.65));
        // Cabo de madeira da pá/picareta de escavação
        c.fillStyle = "#78350f";
        c.fillRect(-1, -8, 2, 13);
        // Lâmina de ferro suja de terra
        c.fillStyle = "#475569";
        c.fillRect(-3.5, -10, 7, 3.2);
        c.restore();

        // Partículas de terra marrom soltando da parede do túnel!
        c.fillStyle = "#78350f";
        for (let k = 0; k < 3; k++) {
          const prog = ((animTimer * 3.5 + k * 0.33 + p.id) % 1);
          const px = dirX * (9 + prog * 5);
          const py = -12 + prog * 10;
          c.fillRect(px, py, 2.2, 2.2);
        }
      }
    }

    // 5. Cabeça (tom de pele variado, cabelo desalinhado)
    const headY = -21.5 - bob;
    c.fillStyle = p.skinColor;
    c.beginPath();
    c.arc(0, headY, 6.0, 0, Math.PI * 2);
    c.fill();

    // Cabelo desalinhado
    c.fillStyle = p.hairColor;
    c.beginPath();
    c.arc(0, headY - 1.8, 6.2, Math.PI * 0.9, Math.PI * 0.1);
    c.fill();

    if (w !== "up") {
      // Barba por fazer em alguns prisioneiros
      if (p.hasBeard) {
        c.fillStyle = "rgba(28, 25, 23, 0.45)";
        c.fillRect(-3.5, headY + 2.2, 7.0, 2.4);
      }
      // Olhos cansados
      c.fillStyle = "#1e293b";
      if (w === "down") {
        c.fillRect(-3.0, headY - 0.5, 1.8, 1.8);
        c.fillRect(1.2, headY - 0.5, 1.8, 1.8);
      } else if (w === "left") {
        c.fillRect(-4.0, headY - 0.5, 1.8, 1.8);
      } else if (w === "right") {
        c.fillRect(2.2, headY - 0.5, 1.8, 1.8);
      }
    } else {
      c.fillStyle = p.hairColor;
      c.beginPath();
      c.arc(0, headY - 0.5, 6.1, 0, Math.PI * 2);
      c.fill();
    }

    // Balão de fala se estiver conversando na aglomeração ou interagindo perto do jogador
    if (p.chatText && player && Math.hypot(player.x - p.x, player.y - p.y) < 220) {
      c.font = "bold 7px sans-serif";
      const tw = Math.min(185, Math.max(54, c.measureText(p.chatText).width + 12));
      const bx = -tw / 2;
      const by = headY - 21;
      c.fillStyle = "rgba(15, 23, 42, 0.88)";
      c.strokeStyle = "#94a3b8";
      c.lineWidth = 1.0;
      c.beginPath();
      c.roundRect(bx, by, tw, 12.5, 3.5);
      c.fill();
      c.stroke();
      c.fillStyle = "#e2e8f0";
      c.textAlign = "center";
      c.fillText(p.chatText, 0, by + 9);
    }

    c.restore();
  }

  // Renderiza Soldados, Carcereiros, Tenentes, Capitão e Coronel:
  // - Tons de pele variados (sol.skinColor)
  // - TODOS com UNIFORME PRETO E DETALHES VERMELHOS IDÊNTICOS!
  function _renderSoldier(c, sol, timeOfDay, animTimer, player) {
    c.save();
    c.translate(sol.x, sol.y);

    const w = sol.facing || "down";
    const isMoving = !!sol.isMoving;
    const walkSin = isMoving ? Math.sin(sol.walkPhase) : 0;
    const bob = isMoving
      ? Math.abs(Math.sin(sol.walkPhase)) * 1.7
      : Math.sin(animTimer * 2.2 + sol.id) * 0.3;

    // Cores padronizadas do Uniforme Militar Preto com Detalhes Vermelhos Idênticos
    const uniBlack = "#0f172a";
    const uniDark = "#09090b";
    const uniRed = "#dc2626";
    const uniRedBright = "#ef4444";
    const isOfficer = sol.rank === "Coronel" || sol.rank === "Capitão" || sol.rank === "Tenente";

    // 1. Sombra no chão
    c.fillStyle = "rgba(15, 23, 42, 0.4)";
    c.beginPath();
    c.ellipse(0, 2.5, 8.0, 4.3, 0, 0, Math.PI * 2);
    c.fill();

    // 2. Capa Militar Preta com Forro/Borda Vermelha para o Coronel e Capitão
    if (sol.rank === "Coronel" || sol.rank === "Capitão") {
      const sway = isMoving ? Math.cos(sol.walkPhase) * 1.8 : 0;
      c.fillStyle = uniDark;
      c.fillRect(-7.8 + sway * 0.3, -15.5 - bob, 15.6, 15.5);
      c.fillStyle = uniRed;
      c.fillRect(-7.8 + sway * 0.3, -1.5 - bob, 15.6, 1.8);
    }

    // 3. Calças Pretas com Listra Vermelha e Botas Pretas com Debruado Vermelho Idêntico
    const legL = walkSin * 3.3;
    const legR = -walkSin * 3.3;
    if (w === "up" || w === "down") {
      // Calça preta
      c.fillStyle = uniDark;
      c.fillRect(-5.2, -3.5 + legL * 0.5, 3.8, 5.0);
      c.fillRect(1.4, -3.5 + legR * 0.5, 3.8, 5.0);
      // Botas pretas com borda vermelha idêntica
      c.fillStyle = "#18181b";
      c.fillRect(-5.2, 1.0 + legL, 3.8, 4.5);
      c.fillRect(1.4, 1.0 + legR, 3.8, 4.5);
      c.fillStyle = uniRed;
      c.fillRect(-5.2, 1.0 + legL, 3.8, 1.3);
      c.fillRect(1.4, 1.0 + legR, 3.8, 1.3);
    } else {
      c.fillStyle = uniDark;
      c.fillRect(-2.6 + legL * 0.5, -3.5, 4.0, 5.0);
      c.fillRect(-1.0 + legR * 0.5, -3.5, 4.0, 5.0);
      // Listra lateral vermelha na calça preta
      c.fillStyle = uniRed;
      c.fillRect(-1.0 + legL * 0.5, -3.5, 1.1, 5.0);
      c.fillStyle = "#18181b";
      c.fillRect(-2.6 + legL, 1.0, 4.0, 4.5);
      c.fillRect(-1.0 + legR, 1.0, 4.0, 4.5);
      c.fillStyle = uniRed;
      c.fillRect(-2.6 + legL, 1.0, 4.0, 1.3);
      c.fillRect(-1.0 + legR, 1.0, 4.0, 1.3);
    }

    // 4. Casaco / Túnica Militar Preta Padronizada + Detalhes Vermelhos Idênticos
    c.fillStyle = uniBlack;
    c.fillRect(-6.8, -16.2 - bob, 13.6, 13.2);

    // Ombreiras (Dragonas) Vermelhas Idênticas em todos os uniformes
    c.fillStyle = uniRed;
    c.fillRect(-8.4, -16.5 - bob, 3.4, 2.2);
    c.fillRect(5.0, -16.5 - bob, 3.4, 2.2);
    if (sol.rank === "Coronel") {
      // Friso dourado extra na ombreira vermelha do Coronel (Chefe de todos)
      c.fillStyle = "#facc15";
      c.fillRect(-8.4, -16.5 - bob, 1.2, 2.2);
      c.fillRect(7.2, -16.5 - bob, 1.2, 2.2);
    }

    // Gola Alta Vermelha + Lapelas/Faixas Peitorais Vermelhas Idênticas
    c.fillStyle = uniRed;
    c.fillRect(-5.5, -17.2 - bob, 11.0, 2.0);
    if (w !== "up") {
      const fOffX = w === "left" ? -1.5 : w === "right" ? 1.5 : 0;
      // Faixa vertical central e lapelas vermelhas idênticas no peito do uniforme preto
      c.fillStyle = uniRed;
      c.fillRect(-1.3 + fOffX, -15.5 - bob, 2.6, 11.5);
      // Costuras horizontais vermelhas no peito (estilo hussardo/guarda imperial)
      c.fillStyle = uniRedBright;
      c.fillRect(-4.8 + fOffX, -14.2 - bob, 9.6, 1.2);
      c.fillRect(-4.4 + fOffX, -11.6 - bob, 8.8, 1.2);
      c.fillRect(-4.0 + fOffX, -9.0 - bob, 8.0, 1.2);
    } else {
      // Costas do uniforme preto com costura central e barra vermelha idêntica
      c.fillStyle = uniRed;
      c.fillRect(-1.0, -15.5 - bob, 2.0, 11.5);
    }

    // Barra inferior vermelha do casaco preto + Cinto Militar Vermelho com Fivela
    c.fillStyle = uniRed;
    c.fillRect(-6.8, -4.2 - bob, 13.6, 1.3);
    c.fillStyle = uniRedBright;
    c.fillRect(-7.0, -7.0 - bob, 14.0, 2.2);
    if (w !== "up") {
      c.fillStyle = isOfficer ? "#facc15" : "#e2e8f0";
      c.fillRect(-1.6, -7.2 - bob, 3.2, 2.6);
    }

    // Se for Carcereiro, exibe o molho de chaves pendurado no cinto
    if (sol.rank === "Carcereiro" && w !== "up") {
      c.strokeStyle = "#eab308";
      c.lineWidth = 1.1;
      c.beginPath();
      c.arc(4.8, -4.2 - bob, 1.8, 0, Math.PI * 2);
      c.stroke();
    }

    // 5. Braços com Mangas Pretas e Punhos Vermelhos Idênticos + Arma Militar
    const armSwing = walkSin * 2.8;
    if (w === "down" || w === "up") {
      c.fillStyle = uniBlack;
      c.fillRect(-8.8, -15.0 - bob + armSwing * 0.4, 2.5, 7.5);
      c.fillRect(6.3, -15.0 - bob - armSwing * 0.4, 2.5, 7.5);
      c.fillStyle = uniRed;
      c.fillRect(-8.8, -9.0 - bob + armSwing * 0.4, 2.5, 1.8);
      c.fillRect(6.3, -9.0 - bob - armSwing * 0.4, 2.5, 1.8);
      c.fillStyle = sol.skinColor;
      c.fillRect(-8.6, -7.2 - bob + armSwing * 0.4, 2.1, 2.0);
      c.fillRect(6.5, -7.2 - bob - armSwing * 0.4, 2.1, 2.0);
    } else {
      const sideX = w === "left" ? -1.4 : -1.0;
      c.fillStyle = uniBlack;
      c.fillRect(sideX + armSwing * 0.35, -14.8 - bob, 2.7, 7.5);
      c.fillStyle = uniRed;
      c.fillRect(sideX + armSwing * 0.35, -8.8 - bob, 2.7, 1.8);
      c.fillStyle = sol.skinColor;
      c.fillRect(sideX + armSwing * 0.35, -7.0 - bob, 2.3, 2.0);
    }

    // Lança / Alabarda Militar (para Soldados e Tenentes) ou Espada no Cinto (para Coronel e Capitão)
    if (sol.rank === "Soldado" || sol.rank === "Tenente") {
      const spX = w === "left" ? -6.5 : 7.8;
      c.fillStyle = "#451a03";
      c.fillRect(spX, -26 - bob, 1.6, 28);
      // Flâmula vermelha abaixo da ponta da lança
      c.fillStyle = uniRedBright;
      c.beginPath();
      c.moveTo(spX + 1.6, -24 - bob);
      c.lineTo(spX + 6.2, -22.5 - bob);
      c.lineTo(spX + 1.6, -20.5 - bob);
      c.closePath();
      c.fill();
      // Ponta de aço da lança
      c.fillStyle = "#cbd5e1";
      c.beginPath();
      c.moveTo(spX - 1.2, -25.5 - bob);
      c.lineTo(spX + 0.8, -31.5 - bob);
      c.lineTo(spX + 2.8, -25.5 - bob);
      c.closePath();
      c.fill();
    } else {
      // Bainha preta e vermelha de espada na cintura do Oficial / Carcereiro
      c.fillStyle = "#18181b";
      c.fillRect(-8.5, -6.0 - bob, 2.0, 9.5);
      c.fillStyle = uniRedBright;
      c.fillRect(-9.2, -7.2 - bob, 3.4, 1.6);
    }

    // 6. Cabeça (Tom de Pele Variado!) + Quepe/Capacete Militar Preto com Faixa Vermelha Idêntica
    const headY = -22.0 - bob;
    c.fillStyle = sol.skinColor;
    c.beginPath();
    c.arc(0, headY, 6.1, 0, Math.PI * 2);
    c.fill();

    if (w !== "up") {
      c.fillStyle = "#0f172a";
      if (w === "down") {
        c.fillRect(-3.2, headY - 0.4, 1.9, 1.9);
        c.fillRect(1.3, headY - 0.4, 1.9, 1.9);
      } else if (w === "left") {
        c.fillRect(-4.2, headY - 0.4, 1.9, 1.9);
      } else if (w === "right") {
        c.fillRect(2.3, headY - 0.4, 1.9, 1.9);
      }
    }

    // Quepe / Capacete Militar Preto com Faixa e Insígnia Vermelha Idêntica em todos
    c.fillStyle = uniDark;
    c.fillRect(-6.6, headY - 6.8, 13.2, 4.6);
    c.beginPath();
    c.arc(0, headY - 6.5, 6.6, Math.PI, 0);
    c.fill();
    // Faixa vermelha idêntica no quepe/capacete
    c.fillStyle = uniRedBright;
    c.fillRect(-6.6, headY - 3.6, 13.2, 1.8);
    // Topete/insígnia frontal vermelha (com estrela dourada para Coronel/Capitão)
    c.fillStyle = sol.rank === "Coronel" ? "#facc15" : uniRedBright;
    c.fillRect(-1.4, headY - 7.8, 2.8, 2.8);

    // 7. Etiqueta discreta da Patente (para Coronel, Capitão, Tenente e Carcereiro quando perto do jogador) + Balão de fala
    if (player && Math.hypot(player.x - sol.x, player.y - sol.y) < 175) {
      c.font = "bold 6.5px sans-serif";
      c.textAlign = "center";
      c.fillStyle = sol.rank === "Coronel" ? "#facc15" : "#f87171";
      c.fillText(`[${sol.rank.toUpperCase()}]`, 0, headY - 10.5);
    }

    if (sol.chatText && player && Math.hypot(player.x - sol.x, player.y - sol.y) < 250) {
      c.font = "bold 7.2px sans-serif";
      const tw = Math.min(210, Math.max(60, c.measureText(sol.chatText).width + 12));
      const bx = -tw / 2;
      const by = headY - 25;
      c.fillStyle = "rgba(9, 9, 11, 0.92)";
      c.strokeStyle = "#dc2626";
      c.lineWidth = 1.2;
      c.beginPath();
      c.roundRect(bx, by, tw, 13, 4);
      c.fill();
      c.stroke();
      c.fillStyle = "#f8fafc";
      c.textAlign = "center";
      c.fillText(sol.chatText, 0, by + 9.2);
    }

    c.restore();
  }

  // Renderiza uma moradora da Vila Glacial com cores variadas e trajes alpinos com DETALHES VERMELHOS obrigatórios
  function _renderCitizen(c, npc, timeOfDay, animTimer, player) {
    c.save();
    c.translate(npc.x, npc.y);

    const w = npc.facing || "down";
    const isMoving = !!npc.isMoving;
    const isSleeping = npc.state === "night_at_home" && npc.isInsideHouse;
    const isInteracting = npc.state === "interacting";
    const walkSin = isMoving ? Math.sin(npc.walkPhase) : 0;
    const bob = isMoving
      ? Math.abs(Math.sin(npc.walkPhase)) * 1.8
      : isInteracting
        ? Math.sin(animTimer * 4 + npc.id) * 0.7
        : Math.sin(animTimer * 2 + npc.id) * 0.35;

    const pal = npc.palette;
    const redMain = pal.redMain;   // #dc2626 / #ef4444 / #b91c1c
    const redLight = pal.redLight; // #ef4444 / #f87171
    const redDark = pal.redDark;   // #991b1b / #7f1d1d

    // 1. Sombra no chão
    c.fillStyle = "rgba(15, 23, 42, 0.35)";
    c.beginPath();
    c.ellipse(0, 2.5, 7.8, 4.2, 0, 0, Math.PI * 2);
    c.fill();

    // 2. Manto / Xale Vermelho nas costas (quando olhando para baixo/lados)
    const capeSway = isMoving ? Math.cos(npc.walkPhase) * 1.8 : 0;
    if (w !== "up") {
      c.fillStyle = redDark;
      c.fillRect(-7.5 + capeSway * 0.3, -15 - bob, 15, 14);
      c.fillStyle = redMain;
      c.fillRect(-6.5 + capeSway * 0.3, -15 - bob, 13, 6);
    }

    // 3. Botas de Inverno com cadarço/borda vermelha
    const legL = walkSin * 3.2;
    const legR = -walkSin * 3.2;
    c.fillStyle = "#292524";
    if (w === "up" || w === "down") {
      c.fillRect(-5, 1 + legL, 3.6, 4.5);
      c.fillRect(1.4, 1 + legR, 3.6, 4.5);
      // Detalhe vermelho nas botas
      c.fillStyle = redMain;
      c.fillRect(-5, 1 + legL, 3.6, 1.3);
      c.fillRect(1.4, 1 + legR, 3.6, 1.3);
    } else {
      c.fillRect(-2.5 + legL, 1, 3.8, 4.5);
      c.fillRect(-1 + legR, 1, 3.8, 4.5);
      c.fillStyle = redMain;
      c.fillRect(-2.5 + legL, 1, 3.8, 1.3);
      c.fillRect(-1 + legR, 1, 3.8, 1.3);
    }

    // 4. Saia Longa de Inverno Acinturada + BARRA VERMELHA BORDADA EM TODAS
    const skirtSway = walkSin * 1.1;
    c.fillStyle = pal.skirt;
    c.beginPath();
    c.moveTo(-6.5, -6 - bob);
    c.lineTo(6.5, -6 - bob);
    c.lineTo(8.2 + skirtSway, 2.2 - bob * 0.3);
    c.lineTo(-8.2 + skirtSway, 2.2 - bob * 0.3);
    c.closePath();
    c.fill();

    // Faixa Vermelha Dupla na Barra da Saia (Detalhe Vermelho Obrigatório #1)
    c.fillStyle = redMain;
    c.fillRect(-7.8 + skirtSway * 0.8, -0.5 - bob * 0.3, 15.6, 2.2);
    c.fillStyle = redLight;
    c.fillRect(-7.5 + skirtSway * 0.8, 0.2 - bob * 0.3, 15.0, 0.8);

    // Avental / Sobressaia frontal com friso vermelho (em alguns modelos de traje para dar variedade)
    if (npc.outfitStyle % 2 === 0 && w !== "up") {
      const apOffX = w === "left" ? -1.8 : w === "right" ? 1.8 : 0;
      c.fillStyle = pal.apron;
      c.fillRect(-4.2 + apOffX, -5.5 - bob, 8.4, 6.2);
      // Bordado vermelho no avental
      c.fillStyle = redMain;
      c.fillRect(-4.2 + apOffX, -0.6 - bob, 8.4, 1.3);
    }

    // 5. Casaco / Corpete de Inverno Variado + FAIXA E DETALHES VERMELHOS
    c.fillStyle = pal.coat;
    c.fillRect(-6.5, -16 - bob, 13, 10.5);

    // Detalhe Vermelho no Corpete / Peito (varia conforme outfitStyle, mas sempre vermelho!)
    if (w !== "up") {
      const fOffX = w === "left" ? -1.5 : w === "right" ? 1.5 : 0;
      if (npc.outfitStyle === 0 || npc.outfitStyle === 3) {
        // Lapelas e frente vermelha no casaco
        c.fillStyle = redMain;
        c.fillRect(-2.5 + fOffX, -15.5 - bob, 5, 9.5);
        c.fillStyle = "#fde047";
        c.fillRect(-0.6 + fOffX, -13.5 - bob, 1.2, 1.2);
        c.fillRect(-0.6 + fOffX, -10.5 - bob, 1.2, 1.2);
      } else if (npc.outfitStyle === 1 || npc.outfitStyle === 4) {
        // Corpete trançado com fitas vermelhas
        c.fillStyle = redDark;
        c.fillRect(-3.5 + fOffX, -15 - bob, 7, 8.5);
        c.strokeStyle = redLight;
        c.lineWidth = 1.1;
        c.beginPath();
        c.moveTo(-2.5 + fOffX, -14.5 - bob);
        c.lineTo(2.5 + fOffX, -11.5 - bob);
        c.moveTo(2.5 + fOffX, -14.5 - bob);
        c.lineTo(-2.5 + fOffX, -11.5 - bob);
        c.stroke();
      } else {
        // Xale em V vermelho sobre o peito
        c.fillStyle = redMain;
        c.beginPath();
        c.moveTo(-6 + fOffX, -16 - bob);
        c.lineTo(6 + fOffX, -16 - bob);
        c.lineTo(0 + fOffX, -8 - bob);
        c.closePath();
        c.fill();
      }
    }

    // Cinto / Faixa Vermelha na Cintura (Detalhe Vermelho Obrigatório #2)
    c.fillStyle = redMain;
    c.fillRect(-6.8, -7.2 - bob, 13.6, 2.4);
    if (w !== "up") {
      // Laço/faixa caída vermelha na cintura
      c.fillStyle = redLight;
      c.fillRect(1.5, -6.5 - bob, 2.2, 4.8);
    }

    // Cachecol / Gola Vermelha Quente no Pescoço (Detalhe Vermelho Obrigatório #3)
    c.fillStyle = redMain;
    c.fillRect(-6.2, -17.2 - bob, 12.4, 2.8);
    c.fillStyle = redLight;
    c.fillRect(-5.5, -16.8 - bob, 11.0, 1.1);
    if (w !== "up") {
      // Ponta do cachecol vermelho no peito
      c.fillStyle = redMain;
      c.fillRect(2.2, -15.2 - bob, 2.6, 5.5);
      c.fillStyle = redLight;
      c.fillRect(2.2, -10.5 - bob, 2.6, 1.0);
    } else {
      // Quando vista de costas (w === "up"), mostra o Xale/Manto Vermelho nas costas
      c.fillStyle = redMain;
      c.fillRect(-7, -16 - bob, 14, 12);
      c.fillStyle = redDark;
      c.fillRect(-5, -15 - bob, 10, 9);
      c.fillStyle = redLight;
      c.fillRect(-7, -5.2 - bob, 14, 1.5);
    }

    // 6. Braços com Mangas e PUNHOS VERMELHOS + Mãos com tom de pele variado
    const armSwing = isMoving
      ? walkSin * 3.0
      : isInteracting
        ? Math.sin(animTimer * 6 + npc.id) * 1.8
        : 0;
    if (w === "down" || w === "up") {
      // Braço esquerdo
      c.fillStyle = pal.coat;
      c.fillRect(-8.8, -15 - bob + armSwing * 0.5, 2.6, 7.5);
      c.fillStyle = redMain; // Punho vermelho
      c.fillRect(-8.8, -9 - bob + armSwing * 0.5, 2.6, 1.8);
      c.fillStyle = npc.skinColor;
      c.fillRect(-8.6, -7.2 - bob + armSwing * 0.5, 2.2, 2.0);

      // Braço direito
      c.fillStyle = pal.coat;
      c.fillRect(6.2, -15 - bob - armSwing * 0.5, 2.6, 7.5);
      c.fillStyle = redMain; // Punho vermelho
      c.fillRect(6.2, -9 - bob - armSwing * 0.5, 2.6, 1.8);
      c.fillStyle = npc.skinColor;
      c.fillRect(6.4, -7.2 - bob - armSwing * 0.5, 2.2, 2.0);
    } else {
      const sideArmX = w === "left" ? -1.5 : -1.0;
      c.fillStyle = pal.coat;
      c.fillRect(sideArmX + armSwing * 0.4, -14.5 - bob, 2.8, 7.5);
      c.fillStyle = redMain; // Punho vermelho
      c.fillRect(sideArmX + armSwing * 0.4, -8.5 - bob, 2.8, 1.8);
      c.fillStyle = npc.skinColor;
      c.fillRect(sideArmX + armSwing * 0.4, -6.7 - bob, 2.4, 2.0);
    }

    // Cesto ou pote rústico na mão durante o passeio (para algumas moradoras)
    if (npc.propInHand === "basket" && !isSleeping && w !== "up") {
      const bx = w === "left" ? -8.5 : 7.5;
      const by = -6.5 - bob;
      c.fillStyle = "#b45309";
      c.fillRect(bx - 3, by, 6, 4.5);
      c.fillStyle = redMain; // Pano vermelho cobrindo o cesto!
      c.fillRect(bx - 3.2, by - 1, 6.4, 1.6);
    }

    // 7. Cabeça, Cabelos Variados e Fitas/Adornos Vermelhos
    const headY = -22 - bob;

    // Cabelo atrás da cabeça (para cabelos longos/soltos)
    if (npc.hairStyle === 0 || npc.hairStyle === 1 || npc.hairStyle === 3) {
      c.fillStyle = npc.hairColor;
      c.fillRect(-6.8, headY - 2, 13.6, 9.5);
    }

    // Rosto (com tom de pele variado!)
    c.fillStyle = npc.skinColor;
    c.beginPath();
    c.arc(0, headY, 6.2, 0, Math.PI * 2);
    c.fill();

    // Topo do Cabelo / Franja Feminina
    c.fillStyle = npc.hairColor;
    c.beginPath();
    c.arc(0, headY - 1.8, 6.4, Math.PI * 0.92, Math.PI * 0.08);
    c.fill();

    // Penteados específicos com DETALHES VERMELHOS na cabeça:
    if (npc.hairStyle === 1) {
      // Duas tranças compridas com laços vermelhos nas pontas
      c.fillStyle = npc.hairColor;
      c.fillRect(-6.8, headY + 1, 2.3, 8.5);
      c.fillRect(4.5, headY + 1, 2.3, 8.5);
      c.fillStyle = redLight;
      c.fillRect(-7.1, headY + 7.5, 2.9, 1.8);
      c.fillRect(4.2, headY + 7.5, 2.9, 1.8);
    } else if (npc.hairStyle === 2) {
      // Coque alto elegante com fita vermelha ao redor
      c.fillStyle = npc.hairColor;
      c.beginPath();
      c.arc(0, headY - 7.2, 3.6, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = redMain;
      c.fillRect(-3.8, headY - 6.2, 7.6, 1.8);
    } else if (npc.hairStyle === 4) {
      // Capuz de inverno com borda vermelha e pele clara
      c.strokeStyle = redMain;
      c.lineWidth = 2.2;
      c.beginPath();
      c.arc(0, headY - 0.5, 6.6, Math.PI * 0.85, Math.PI * 0.15);
      c.stroke();
    } else {
      // Tiara / Fita Vermelha no cabelo (para hairStyle 0 e 3)
      c.fillStyle = redMain;
      c.fillRect(-6.0, headY - 4.8, 12.0, 1.7);
      c.fillStyle = redLight;
      c.fillRect(3.5, headY - 5.4, 2.6, 2.6);
    }

    // Se vista de costas (w === "up"), preenche a parte de trás do cabelo + laço vermelho
    if (w === "up") {
      c.fillStyle = npc.hairColor;
      c.beginPath();
      c.arc(0, headY - 0.5, 6.3, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = redMain;
      c.fillRect(-4.5, headY - 2, 9, 1.8);
      c.fillStyle = redLight;
      c.fillRect(-1.5, headY - 2.5, 3, 4);
    } else {
      // Olhos e expressão facial
      c.fillStyle = "#1e293b";
      if (isSleeping) {
        // Olhos fechados descansando em casa à noite
        c.fillRect(-3.2, headY + 0.2, 2.2, 0.9);
        c.fillRect(1.0, headY + 0.2, 2.2, 0.9);
      } else if (w === "down") {
        c.fillRect(-3.2, headY - 0.4, 1.9, 2.0);
        c.fillRect(1.3, headY - 0.4, 1.9, 2.0);
        // Leve rubor nas bochechas pelo frio
        c.fillStyle = "rgba(244, 63, 94, 0.32)";
        c.fillRect(-4.4, headY + 1.4, 1.8, 1.1);
        c.fillRect(2.6, headY + 1.4, 1.8, 1.1);
      } else if (w === "left") {
        c.fillRect(-4.2, headY - 0.4, 1.9, 2.0);
        c.fillStyle = "rgba(244, 63, 94, 0.32)";
        c.fillRect(-3.2, headY + 1.4, 1.8, 1.1);
      } else if (w === "right") {
        c.fillRect(2.3, headY - 0.4, 1.9, 2.0);
        c.fillStyle = "rgba(244, 63, 94, 0.32)";
        c.fillRect(1.4, headY + 1.4, 1.8, 1.1);
      }
    }

    // 8. Indicador de sono ("Zzz") quando estão passando a noite em casa, ou Balão de Conversa quando interagem!
    if (isSleeping) {
      const zFloat = (animTimer * 1.5 + npc.id) % 1;
      c.fillStyle = `rgba(226, 232, 240, ${0.85 - zFloat * 0.6})`;
      c.font = "bold 7.5px sans-serif";
      c.textAlign = "center";
      c.fillText("Zzz", 6 + zFloat * 4, headY - 8 - zFloat * 6);
    } else if (isInteracting && npc.chatText && player && Math.hypot(player.x - npc.x, player.y - npc.y) < 260) {
      c.font = "bold 7.5px sans-serif";
      const text = npc.chatText;
      const tw = Math.min(180, Math.max(54, c.measureText(text).width + 12));
      const bx = -tw / 2;
      const by = headY - 22;

      c.fillStyle = "rgba(15, 23, 42, 0.88)";
      c.strokeStyle = "#ef4444";
      c.lineWidth = 1.1;
      c.beginPath();
      c.roundRect(bx, by, tw, 13, 4);
      c.fill();
      c.stroke();

      c.fillStyle = "#f8fafc";
      c.textAlign = "center";
      c.fillText(text, 0, by + 9.2);
    }

    c.restore();
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
    citizens: CITIZENS,
    isCityTerritory,
    isCityBiomeArea,
    isPrisonMineArea,
    getHouseAt,
    getActiveHouseForPlayer,
    getCellAt,
    getUndergroundCellAt,
    isDoorwayUsedByCitizen,
    interactWithNearbyCitizen,
    updateAndGetCitizenRenderItems,
  };

  G.SnowPeakCity = SnowPeakCity;
  window.SnowPeakCity = SnowPeakCity;
})(window.Game);
