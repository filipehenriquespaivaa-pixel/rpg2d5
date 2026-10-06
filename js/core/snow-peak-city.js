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
  const CITY_RADIUS = 64;

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

  // Verifica se o tile está dentro do território da cidade
  function isCityTerritory(tx, ty) {
    const dx = tx - CITY_CX;
    const dy = ty - CITY_CY;
    return dx * dx + dy * dy <= CITY_RADIUS * CITY_RADIUS;
  }

  // Zona alpina ao redor da cidade (garante neve pura em todo o entorno visual)
  function isCityBiomeArea(tx, ty) {
    const dx = tx - CITY_CX;
    const dy = ty - CITY_CY;
    const bufferRadius = CITY_RADIUS + 35;
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

  // Retorna o ID da casa se o jogador estiver dentro dela (ou atravessando a soleira da porta)
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

    //   * Ao Sul da Praça: passagem em X = -1..+2 que atravessa desde a Praça até o final Sul (Y = +5..+24)!
    const isSouthPlazaConnector =
      (relY >= 5 && relY <= 12 && relX >= -4 && relX <= 4) ||
      (relY >= 11 && relY <= 24 && relX >= -1 && relX <= 2);

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

  // Exporta a definição
  const SnowPeakCity = {
    centerX: CITY_CX,
    centerY: CITY_CY,
    radius: CITY_RADIUS,
    houses: HOUSES,
    isCityTerritory,
    isCityBiomeArea,
    getHouseAt,
    getActiveHouseForPlayer,
    getCellAt,
  };

  G.SnowPeakCity = SnowPeakCity;
  window.SnowPeakCity = SnowPeakCity;
})(window.Game);
