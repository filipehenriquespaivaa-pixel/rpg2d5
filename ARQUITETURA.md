# Arquitetura do projeto

HTML + JS puro, sem npm e sem build. Abre com duplo clique no `index.html` (`file://`).

> Para continuar a organização (criaturas, itens, verificação), veja `PROXIMOS-PASSOS-IA.md`.

## Como carrega

O jogo era um bundle único (`assets/app.js`, 48 mil linhas). Foi dividido em arquivos **só movendo o código, sem alterar nenhuma linha** (o original está em `legacy/app.original.js`). Todos os `<script defer>` do `index.html` compartilham o **mesmo escopo global**, então:

- **A ordem dos `<script>` importa.** Um arquivo usa nomes definidos nos anteriores. Não reordene.
- `js/ui/main.js` monta o React e **deve ser o último** do jogo.
- Os nomes continuam curtos (`World`, `CreatureManager`, `GameMain`...), vindos do bundle. O mapa está abaixo e em `REGRAS-PARA-IA.md`.

## Mapa de arquivos (na ordem de carregamento)

### Terceiros (não editar)

- `assets/vendor/tailwind-css.js` (59 linhas): CSS do Tailwind (injetado via <style>). Terceiros: nao editar.
- `assets/vendor/react.js` (14496 linhas): React 19 + ReactDOM + scheduler. Terceiros: nao editar.
- `assets/vendor/lucide-icons.js` (995 linhas): Icones lucide-react + gerador de ruido Simplex (vt), que o bundler colou na mesma declaracao. Terceiros: nao editar.

### Núcleo: regras e mundo, sem desenho

- `js/core/noise-e-biomas.js` (669 linhas): Ruido (SimplexNoise), enum de biomas (BiomeId), tabela de biomas (BIOMES), funcoes de bioma (Jp, Fs) e dificuldade (RESOURCE_DIFFICULTY).
- `js/core/snow-peak-city.js`: Vila Glacial dos Picos Gelados (24 casas com quarto, banheiro, sala, cozinha, chaminés com fumaça e ruas de paralelepípedo).
- `js/core/world.js` (1827 linhas): Mundo procedural: classe World (tiles, cavernas, fogueiras, panela) + item de argila (Gu).
- `js/core/world-helpers.js` (78 linhas): Auxiliares de mundo/colheita (Zu, tg, Hs, og).
- `js/core/item-rules.js` (195 linhas): Regras de equipar item (To, fn, Qs).
- `js/core/save.js` (36 linhas): Salvar/carregar/apagar save no localStorage (saveGameState, loadGameState, clearGameState). A chave SAVE_KEY fica em ui/inventory.js.

### Dados: itens, receitas, recursos

- `js/creatures/registry.js`: núcleo do registro de criaturas (`CREATURES` e funções de consulta).
- `js/creatures/rabbit.js`: o coelho, **criatura completa** num arquivo só (modelo para as próximas).
- `js/creatures/wolf.js`: o lobo (predador), criatura completa, com dois nascimentos (bosques e neve). Carrega **entre** `rabbit.js` e `deer.js`.
- `js/creatures/deer.js`: o cervo (presa), criatura completa.
- `js/creatures/golem.js`: o golem (monstro hostil, **não destrinchável**: sem `carcass`/`sheet`/`loot`/`detect`), com dois nascimentos (vulcânico e `MOUNTAIN_25D`). Carrega depois de `deer.js`.
- `js/creatures/bat.js`: o morcego das profundezas (monstro aéreo hostil), criatura completa. Carrega depois de `golem.js`.
- `js/creatures/tardigrade.js`: o tardígrado cavernoso (invertebrado criptobiótico predador das fendas da caverna do deserto com 8 patas, micro-garras, tamanhos variados até 3x maiores e caçador/devorador de escorpiões). Carrega depois de `bat.js`.
- `js/data/recursos-coletaveis.js` (278 linhas): Definicoes de recursos coletaveis do mundo (Xu, Fu, Hu, Wu, Ku, ag).
- `js/data/itens.js` (558 linhas): Slots de equipamento (EQUIPMENT_SLOTS), raridades (RARITIES), fabrica de item (pi) e utilitarios de mochila (Ks, createEmptyEquipment, Zs, ot, t0).
- `js/data/receitas-fusao.js` (1850 linhas): Detectores de ingrediente (et, mn, o0, gi...), Ua e lista de receitas de fusao (FUSION_RECIPES...bl).
- `js/data/fusao-e-loot.js` (943 linhas): Auxiliares de fusao (s0), configs de slots (c0...), deteccao de criatura (ac, f0) e loot (e1).

### Motor: desenho no Canvas e áudio

- `js/engine/render-props.js` (1768 linhas): Desenho dos props do cenario no canvas (rg...Pg), incluindo a fogueira (hg).
- `js/engine/renderer.js` (3073 linhas): Renderizador do mundo (WorldRenderer): cache de chunks, luz, particulas, agua.
- `js/engine/audio.js` (845 linhas): Audio sintetico (classe AudioManager) e instancia hi.
- `js/engine/draw-personagem-e-efeitos.js` (2067 linhas): Desenho de personagens/criaturas animadas e efeitos (Ag, Eg, Ng...Ig).
- `js/engine/weapon-whip.js` (274 linhas): Chicote de Gosma: icone, golpe, estalo, pose na mao (isWhipItemX, drawWhip*).
- `js/engine/draw-itens-e-armas.js` (1316 linhas): Icone de item no canvas (drawItemIcon) e armas/itens desenhados na mao (zg...rb).
- `js/engine/draw-criaturas.js` (2423 linhas): Desenho de criaturas/monstros (lb, ib, nb...zb) e predicado gl.
- `js/engine/creatures-manager.js` (2376 linhas): Gerenciador de criaturas/entidades (CreatureManager): monstros, carcacas, itens no chao, projeteis.

### Interface React e componente principal

- `js/ui/item-icon.js` (47 linhas): Componente ItemIcon: desenha o icone de um item (usa drawItemIcon). Use SEMPRE este para icones.
- `js/ui/hud.js` (1866 linhas): HUD (Hud): minimapa, botoes de toque, barras de vida/stamina.
- `js/ui/inventory.js` (3694 linhas): Detalhe do item (ItemDetailPanel), modal do inventario (InventoryModal...) e chave do save (SAVE_KEY).
- `js/ui/game-main.js` (3895 linhas): Componente principal do jogo (GameMain): estado, loop, atalhos, modais.
- `js/ui/menu.js`: Tela de menu inicial (MenuScreen) com botão Modo Desenvolvedor antes de iniciar o jogo, opções de teste e barra flutuante in-game.
- `js/ui/main.js`: Componente raiz (App) e montagem do React. DEVE ser o ultimo script.

### Extras de debug

- `js/extras/colisores-debug.js` (48 linhas): Botao "Colisores: ON/OFF" (debug). Movido SEM alteracoes de legacy/app.original.js.

## Registro de criaturas (`js/creatures/`)

`registry.js` define `CREATURES` e as funções de consulta (`getCreature`, `creatureDraw`, `creatureBehavior`, `creatureCarcass`, `isPreyType`, `creatureDeathParticles`, `detectMigratedCreature`, `detectCreatureForIcon`). Cada criatura migrada tem **um arquivo** `js/creatures/<nome>.js` que faz `CREATURES.<tipo> = {...}` com:

- `spawn` (nome, cores, vida, ataque, velocidade, escala) e `behavior` (`prey`, `deathParticles`, e para presas `wolfHitFleeTimer`, `playerHitFleeTimer` e `preyAI` com os números usados por `updatePreyAI`; para predadores `predator` (as presas fogem dele), `threatName`, `attackCooldown` e `hunter` com os números da IA de caça: raio, velocidade, alcance do bote, recarga, espera e velocidade ao vagar). Uma criatura com mais de um nascimento usa `spawnVariants` (o lobo tem `spawnVariants.snow`; o golem tem `spawnVariants.mountain`); `behavior.fearsFire: false` faz a criatura **ignorar fogueira e tocha** (toda criatura do registro foge delas por padrão; o golem não);
- `carcass` (textos), `sheet` (ficha ao destrinchar) e `loot` (despojos);
- `detect` (reconhecer por nome/id/ícone na ficha e no loot) e `detectIcon` (idem, para escolher o desenho do ícone);
- `draw.body` (corpo vivo), `draw.carcass` (carcaça no chão) e `draw.icon` (ícone).

Criaturas **não migradas** continuam nos lugares antigos e funcionam como antes. **Migradas por completo: coelho (`rabbit.js`), lobo (`wolf.js`), cervo (`deer.js`), golem (`golem.js`), morcego (`bat.js`) e tardígrado (`tardigrade.js`).** A IA de fuga das presas (`updatePreyAI`) lê os números de `behavior.preyAI`; uma presa nova só precisa preencher esses campos. A IA de caça do lobo lê `behavior.hunter`; quem tem `hunter` caça presas no raio e não usa a exploração padrão. **Tipos sem desenho próprio caem no corpo do lobo** (era assim no código antigo: o desenho do lobo era o ramo final de `Eg`; agora `Eg` chama `CREATURES.wolf.draw.body`). **Ordem de carga = prioridade de detecção por nome:** coelho > lobo > cervo (o golem não participa de `detect`; o ícone dele é testado na mesma posição da cadeia antiga de `lb`, via `CREATURES.golem.detectIcon`). **Atenção ao registrar uma criatura nova:** `gl(tipo)` (em `draw-criaturas.js`) passa a ser verdadeiro para ela, e `gl` liga o medo de fogueira/tocha e o susto de `scareMonstersNearFire`. Para criaturas que não devem ter esse medo (golem, dragão), use `behavior.fearsFire: false`.

**Ainda fora do registro, mesmo para coelho, lobo, cervo e golem** (são coisas de item ou de sorteio, não da criatura):
- Ícone do coelho segurado na mão e peças de item com cor de coelho, lobo ou cervo (`isRabbit`, `isWolf`, `isDeer`): `renderer.js` e `draw-criaturas.js` (função `Ab`).
- Regra de equipar/cinto por palavra (`includes("coelho")`, `includes("lobo")`) em `core/item-rules.js`.
- Nomes dos métodos `getNearestPreyForWolf` e `wolfAttackPrey` (`creatures-manager.js`) ainda têm "Wolf" no nome, mas agora leem `behavior.hunter`; e o campo `wolfRadius` da IA de presa significa "raio de fuga de predador".
- O sorteio de quem nasce em cada bioma (`creatures-manager.js`) ainda escolhe o tipo no código; só os valores do nascimento vêm do registro.

**Para criar uma criatura nova hoje:** (1) copie `js/creatures/rabbit.js`, ajuste dados e desenhos; (2) inclua o arquivo no `index.html` depois de `registry.js`; (3) adicione o tipo ao sorteio de spawn por bioma em `creatures-manager.js`; (4) se for presa, `behavior.prey: true`. Migrar as demais criaturas (gosma, aranha, morcego, escorpião, dragão...) tira o passo 3 e os pontos antigos. Se a criatura for predadora, preencha `behavior.predator` e `behavior.hunter` como em `wolf.js`.

## Onde mexer para...

- **Item, receita, recurso novo:** `js/data/` (itens, receitas-fusao, recursos-coletaveis).
- **Arma ou mecânica nova:** crie um arquivo em `js/engine/` (modelo: `weapon-whip.js`), ligue em `js/ui/game-main.js` e registre o atalho nos dois objetos `Ga`.
- **Tela ou modal novo:** `js/ui/` (use `ItemIcon` de `item-icon.js` para ícones).
- **Mudar o formato do save:** `js/core/save.js` + `js/ui/game-main.js` (função de salvar); mantenha compatibilidade com saves antigos.

## Como adicionar um arquivo novo

1. Crie `js/<pasta>/nome.js` começando com `"use strict";`.
2. Adicione `<script defer src="./js/<pasta>/nome.js"></script>` no `index.html`, **depois** dos arquivos que ele usa e **antes** de `js/ui/main.js`.
3. Dê um nome descritivo e único: tudo é global, nomes repetidos quebram (`const` duplicado dá erro de carregamento).

## Pontos de atenção conhecidos

- `js/engine/draw-itens-e-armas.js` e `draw-criaturas.js` foram nomeados por amostragem; os nomes de função dentro deles ainda são os curtos.
- Arquivos ainda grandes: `ui/game-main.js` (~3,9 mil linhas), `ui/inventory.js` (~3,7 mil), `engine/renderer.js` (~3 mil).
- `legacy/` guarda o original (`app.original.js`), o antigo exportador "HTML autônomo" (`standalone-html-antigo.js`, removido do jogo junto com o botão HTML) e a pasta antiga `js/game/` (código morto, nunca usado pelo jogo). Ao buscar com `grep -r`, ignore `legacy/`.

## Próximos passos sugeridos (cada um pequeno e reversível)

1. Quebrar `game-main.js` em partes (atalhos, salvar/carregar, loop) mantendo o mesmo comportamento.
2. Renomear os nomes curtos por escopo (`World` → `World`) com ferramenta, nunca por busca e troca de texto.
