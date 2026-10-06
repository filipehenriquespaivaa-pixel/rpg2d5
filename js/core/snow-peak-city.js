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
  const CITY_RADIUS = 76;

  // Grade de 24 casas organizadas ao longo das ruas de paralelepípedo
  // 6 colunas x 4 linhas = 24 casas (halfW: 5, halfH: 5 -> 11x11 blocos por casa)
  const COLS = [-38, -23, -8, 8, 23, 38];
  const ROWS = [-30, -15, 15, 30];

  const HOUSES = [];
  let counter = 1;
  for (let rIdx = 0; rIdx < ROWS.length; rIdx++) {
    const rowY = CITY_CY + ROWS[rIdx];
    for (let cIdx = 0; cIdx < COLS.length; cIdx++) {
      const colX = CITY_CX + COLS[cIdx];
      const id = counter++;
      // Metade das casas (ímpares) tem Sala e Cozinha juntas (conceito aberto);
      // a outra metade (pares) tem divisória com passagem separando Sala e Cozinha!
      const openConcept = (id % 2 === 1);
      const doorOnSouth = rIdx < 2; // As duas primeiras fileiras têm porta voltada ao Sul (para a praça)

      HOUSES.push({
        id,
        name: `Casa Glacial #${id} (${openConcept ? "Sala e Cozinha Integradas" : "Cômodos Separados"})`,
        cx: colX,
        cy: rowY,
        halfW: 5,
        halfH: 5,
        openConcept,
        doorOnSouth,
      });
    }
  }

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
    // 2. FORA DAS CASAS: PRAÇA CENTRAL COMPACTA E RUAS DE PARALELEPÍPEDO
    // =====================================================================
    const relX = tx - CITY_CX;
    const relY = ty - CITY_CY;

    // 2.1 Praça Central compacta da Cidade dos Picos Gelados (bem menor: 9x9 blocos, |relX| <= 4 e |relY| <= 4)
    const inCentralPlaza = Math.abs(relX) <= 4 && Math.abs(relY) <= 4;
    if (inCentralPlaza) {
      // Grande Fogueira / Pira Monumental dos Picos Gelados (ocupa 3x3 blocos no centro com colisor!)
      if (Math.abs(relX) <= 1 && Math.abs(relY) <= 1) {
        const isCenterTile = relX === 0 && relY === 0;
        return {
          isSnowCity: true,
          role: "plaza",
          roomName: "Grande Fogueira da Praça dos Picos Gelados",
          isMonument: true,
          isCollider: true,
          isWall: false,
          prop: isCenterTile
            ? {
                kind: "snow_city_monument",
                scale: 2.35,
                interactive: true,
                namePt: "Grande Fogueira Monumental da Praça",
                descriptionPt:
                  "Pira colossal esculpida em granito da montanha e aros de ferro forjado, queimando toras inteiras de pinheiro com chamas altas que aquecem toda a praça.",
              }
            : {
                kind: "snow_city_monument_collider",
                interactive: true,
                namePt: "Borda de Pedra da Grande Fogueira",
                descriptionPt:
                  "Mureta circular de granito e brasas ardentes da grande fogueira central da praça.",
              },
        };
      }

      // Bancos de madeira e ferro ao redor da Grande Fogueira (Norte, Sul, Leste, Oeste)
      const isNorthBench = relY === -3 && Math.abs(relX) <= 1;
      const isSouthBench = relY === 3 && Math.abs(relX) <= 1;
      const isWestBench = relX === -3 && Math.abs(relY) <= 1;
      const isEastBench = relX === 3 && Math.abs(relY) <= 1;

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
              "Banco robusto de tábuas de carvalho e braços de ferro forjado, posicionado de frente para a grande fogueira da praça. Pressione [F] para sentar e descansar!",
          },
        };
      }

      // Postes de lampião nos quatro cantos da praça compacta
      const isPlazaCorner = Math.abs(relX) === 4 && Math.abs(relY) === 4;
      if (isPlazaCorner) {
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

    // 2.2 Malha de Ruas e Avenidas de Paralelepípedo conectando todas as casas (1 bloco de largura)
    const isHorizStreet =
      relY === -37 ||
      relY === -22 ||
      relY === 0 ||
      relY === 22 ||
      relY === 37;

    const isVertStreet =
      relX === -45 ||
      relX === -30 ||
      relX === -15 ||
      relX === 0 ||
      relX === 15 ||
      relX === 30 ||
      relX === 45;

    if (isHorizStreet || isVertStreet) {
      // Postes de iluminação em cruzamentos selecionados
      const isIntersection = isHorizStreet && isVertStreet;
      const isLampIntersection =
        isIntersection &&
        (Math.abs(relX) === 15 || Math.abs(relX) === 30 || Math.abs(relX) === 45) &&
        (Math.abs(relY) === 22 || Math.abs(relY) === 37);

      if (isLampIntersection) {
        return {
          isSnowCity: true,
          role: "road",
          roomName: "Esquina da Rua de Paralelepípedos",
          prop: {
            kind: "snow_city_lamppost",
            interactive: true,
            namePt: "Lampião de Esquina em Paralelepípedo",
            descriptionPt: "Lanterna de ferro fundido iluminando os paralelepípedos e guiando os transeuntes no frio.",
          },
        };
      }

      return {
        isSnowCity: true,
        role: "road",
        roomName: "Rua de Paralelepípedos da Cidade Glacial",
      };
    }

    // Acessos e calçadas estreitas conectando as casas às ruas (largura reduzida pela metade)
    let minDistToHouse = 999;
    let isDoorAccessPath = false;
    for (let i = 0; i < HOUSES.length; i++) {
      const h = HOUSES[i];
      const dxH = Math.abs(tx - h.cx) - h.halfW;
      const dyH = Math.abs(ty - h.cy) - h.halfH;
      const dist = Math.max(dxH, dyH);
      if (dist < minDistToHouse) minDistToHouse = dist;

      // Trilha estreita de 1 bloco ligando a porta frontal da casa até a rua horizontal
      const doorDirY = h.doorOnSouth ? 1 : -1;
      const relDoorY = (ty - h.cy) * doorDirY;
      if (tx === h.cx && relDoorY > h.halfH && relDoorY <= h.halfH + 2) {
        isDoorAccessPath = true;
      }
    }

    if (minDistToHouse <= 1 || isDoorAccessPath) {
      return {
        isSnowCity: true,
        role: "road",
        roomName: "Calçada de Paralelepípedos da Casa",
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
    getCellAt,
  };

  G.SnowPeakCity = SnowPeakCity;
  window.SnowPeakCity = SnowPeakCity;
})(window.Game);
