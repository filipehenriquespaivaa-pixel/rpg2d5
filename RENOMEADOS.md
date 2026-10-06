# Nomes renomeados

O código veio compilado, com nomes curtos. Estes foram renomeados (só a variável e todos os seus usos, com análise de escopo). Use a tabela para ler commits antigos e `legacy/app.original.js`. Os demais nomes curtos continuam como estavam.

| Antigo | Novo | O que é | Arquivo |
|---|---|---|---|
| `eg` | `World` | Mundo procedural (tiles, cavernas, fogueiras, panela) | `js/core/world.js` |
| `Vt` | `SimplexNoise` | Gerador de ruído Simplex | `js/core/noise-e-biomas.js` |
| `ye` | `BiomeId` | Enum dos IDs de bioma | `js/core/noise-e-biomas.js` |
| `ya` | `BIOMES` | Tabela de biomas | `js/core/noise-e-biomas.js` |
| `Kt` | `RESOURCE_DIFFICULTY` | Dificuldade dos recursos coletáveis | `js/core/noise-e-biomas.js` |
| `fo` | `WorldRenderer` | Renderizador do mundo (Canvas) | `js/engine/renderer.js` |
| `Qu` | `AudioManager` | Gerenciador de áudio sintético | `js/engine/audio.js` |
| `qb` | `CreatureManager` | Gerenciador de criaturas/entidades | `js/engine/creatures-manager.js` |
| `Vb` | `EQUIPMENT_SLOTS` | Definição dos slots de equipamento | `js/data/itens.js` |
| `un` | `RARITIES` | Estilos por raridade | `js/data/itens.js` |
| `Ub` | `createEmptyEquipment` | Cria equipamento vazio (todos os slots null) | `js/data/itens.js` |
| `Ja` | `ItemIcon` | Componente que desenha o ícone de um item | `js/ui/item-icon.js` |
| `a0` | `drawItemIcon` | Função de canvas que desenha o ícone do item | `js/engine/draw-itens-e-armas.js` |
| `Yb` | `Hud` | HUD (minimapa, botões de toque, barras) | `js/ui/hud.js` |
| `Xb` | `FUSION_RECIPES` | Lista de receitas de fusão | `js/data/receitas-fusao.js` |
| `a1` | `ItemDetailPanel` | Painel de detalhe do item | `js/ui/inventory.js` |
| `t1` | `InventoryModal` | Modal do inventário | `js/ui/inventory.js` |
| `s1` | `GameMain` | Componente principal do jogo | `js/ui/game-main.js` |
| `c1` | `App` | Componente raiz (monta o React) | `js/ui/main.js` |
| `l1` | `saveGameState` | Salvar o jogo | `js/core/save.js` |
| `i1` | `loadGameState` | Carregar o jogo | `js/core/save.js` |
| `n1` | `clearGameState` | Apagar o save | `js/core/save.js` |
| `tc` | `SAVE_KEY` | Chave do save no localStorage | `js/ui/inventory.js` |
