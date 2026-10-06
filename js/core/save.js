/* js/core/save.js
 * Salvar/carregar/apagar save no localStorage (saveGameState, loadGameState, clearGameState). A chave SAVE_KEY fica em ui/inventory.js.
 * Trecho de legacy/app.original.js (linhas 44889-44918); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  function saveGameState(e) {
    try {
      const t = JSON.stringify(e);
      return (localStorage.setItem(SAVE_KEY, t), !0);
    } catch (t) {
      return (console.warn("[SaveManager] Failed to save game state:", t), !1);
    }
  }
  function loadGameState() {
    try {
      const e = localStorage.getItem(SAVE_KEY);
      if (!e) return null;
      const t = JSON.parse(e);
      return !t || !t.checkpoint || typeof t.checkpoint.tx != "number"
        ? null
        : t;
    } catch (e) {
      return (
        console.warn("[SaveManager] Failed to parse save state:", e),
        null
      );
    }
  }
  function clearGameState() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {
      console.warn("[SaveManager] Failed to clear save state:", e);
    }
  }
