/* js/core/desert-city.js
 * Aldeia das Areias Douradas — Cidade / Povoado no Bioma de Deserto.
 *
 * Características obrigatórias:
 * - Localizada no bioma de Deserto (BiomeId.DESERT).
 * - Sem ruas pavimentadas (as casas ficam diretamente sobre o solo e dunas do deserto).
 * - Casas de cômodo único e pequeno (feitas de adobe, barro cozido e madeira de deserto).
 * - Casas espalhadas pelo mapa a uma distância mínima de 4 a 8 quadrados umas das outras.
 * - Pelo menos 15 casas (possui 17 casas no total, numeradas de #1 a #17).
 * - Interior de cada casa contém:
 *     1. Uma esteira rústica de palha/junco para dormir (com travesseiro de linho enrolado).
 *     2. Potes e ânforas de cerâmica com mantimentos (água fresca, grãos e tâmaras).
 *     3. Estritamente SEM estantes de livros, escrivaninhas ou tomos.
 * - Telhados de adobe 2.5D com vigas de madeira salientes que desaparecem suavemente
 *   quando o jogador entra na casa e reaparecem ao sair!
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
  // - Cada casa é pequena e compacta (cômodo único).
  // - Dimensões: halfW: 2 (5 blocos de largura total) ou halfW: 3 (7 blocos),
  //   halfH: 2 (5 blocos de altura total).
  // - Espaçadas a uma distância mínima de 4 a 8 blocos entre as paredes de qualquer vizinho!
  // =========================================================================
  const HOUSE_SPECS = [
    // Fileira Norte / Noroeste
    { relX: -26, relY: -22, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #1  [-28..-24, -24..-20]
    { relX: -16, relY: -28, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #2  [-18..-14, -30..-26] (distância ~6.3 blocos)
    { relX:  -7, relY: -20, halfW: 3, halfH: 2, doorSide: "south" }, // Casa #3  [-10.. -4, -22..-18] (distância ~5.7 blocos)
    { relX:   4, relY: -27, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #4  [  2..  6, -29..-25] (distância ~6.7 blocos)
    { relX:  15, relY: -20, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #5  [ 13.. 17, -22..-18] (distância ~7.6 blocos)
    { relX:  26, relY: -26, halfW: 3, halfH: 2, doorSide: "south" }, // Casa #6  [ 23.. 29, -28..-24] (distância ~6.3 blocos)

    // Meio Oeste e Leste
    { relX: -34, relY:  -9, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #7  [-36..-32, -11.. -7]
    { relX: -21, relY:  -8, halfW: 3, halfH: 2, doorSide: "south" }, // Casa #8  [-24..-18, -10.. -6] (distância ~8.0 blocos da #7)
    { relX:  20, relY:  -7, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #9  [ 18.. 22,  -9.. -5]
    { relX:  32, relY:  -9, halfW: 2, halfH: 2, doorSide: "south" }, // Casa #10 [ 30.. 34, -11.. -7] (distância ~8.0 blocos da #9)

    // Meio-Sul Oeste e Leste
    { relX: -27, relY:   6, halfW: 2, halfH: 2, doorSide: "north" }, // Casa #11 [-29..-25,   4..  8]
    { relX: -14, relY:   7, halfW: 3, halfH: 2, doorSide: "north" }, // Casa #12 [-17..-11,   5..  9] (distância ~8.0 blocos da #11)
    { relX:  12, relY:   7, halfW: 2, halfH: 2, doorSide: "north" }, // Casa #13 [ 10.. 14,   5..  9]
    { relX:  24, relY:   8, halfW: 3, halfH: 2, doorSide: "north" }, // Casa #14 [ 21.. 27,   6.. 10] (distância ~7.0 blocos da #13)

    // Extremo Sul
    { relX: -20, relY:  21, halfW: 2, halfH: 2, doorSide: "north" }, // Casa #15 [-22..-18,  19.. 23]
    { relX:  -6, relY:  22, halfW: 2, halfH: 2, doorSide: "north" }, // Casa #16 [ -8.. -4,  20.. 24] (distância ~10.0 blocos da #15)
    { relX:   8, relY:  20, halfW: 3, halfH: 2, doorSide: "north" }  // Casa #17 [  5.. 11,  18.. 22] (distância ~9.0 blocos da #16)
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
      // Dentro das paredes internas da casa
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
      // Fora das casas: SEM RUAS! Solo puramente natural do deserto
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

    // =========================================================================
    // 3. INTERIOR DA CASA (CÔMODO ÚNICO E PEQUENO):
    // - Uma esteira rústica de dormir (palha/junco) com travesseiro de linho enrolado.
    // - Potes e ânforas de cerâmica com mantimentos (água e alimentos secos).
    // - Piso de terra batida/adobe compacto e espaço livre para transitar.
    // - SEM ESTANTES, LIVROS OU MESAS DE ESTUDO!
    // =========================================================================

    // Localização da esteira de dormir: canto oposto à porta
    const matX = -W + 1; // canto oeste
    const matY = isSouthDoor ? -H + 1 : H - 1; // parede norte se porta for ao sul, ou sul se porta for ao norte
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

    // Localização dos potes de mantimentos: canto leste oposto à porta
    const potsX = W - 1; // canto leste
    const potsY = isSouthDoor ? -H + 1 : H - 1;
    if (rx === potsX && ry === potsY) {
      return {
        isDesertCity: true,
        houseIndex: houseId,
        role: "pots",
        roomName: `Potes de Mantimentos da Casa #${houseId}`,
        isWall: false, // permite aproximação
        isCollider: true, // colisor leve para não pisar em cima dos potes
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

    // 4. Piso interno de barro batido da casa de adobe
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

  // Exporta o módulo
  const DesertCity = {
    centerX: CITY_CX,
    centerY: CITY_CY,
    radius: CITY_RADIUS,
    biomeRadius: CITY_BIOME_RADIUS,
    houses: HOUSES,
    isCityTerritory,
    isCityBiomeArea,
    getHouseAt,
    getActiveHouseForPlayer,
    getCellAt,
  };

  G.DesertCity = DesertCity;
  window.DesertCity = DesertCity;
})(window.Game);
