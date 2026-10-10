/* js/ui/main.js
 * Componente raiz (App) e montagem do React. DEVE ser o ultimo script.
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";

window.Game = window.Game || {};

function App() {
  const [inGame, setInGame] = J.useState(false);
  const [devMode, setDevMode] = J.useState(() => {
    try {
      return localStorage.getItem("rpg2d_dev_mode") === "1";
    } catch (e) {
      return false;
    }
  });

  // Atualiza flags globais e sincroniza exatamente com a área visível real (visualViewport / innerHeight)
  J.useEffect(() => {
    window.__inGame = inGame;
    window.__devMode = devMode;
  }, [inGame, devMode]);

  J.useEffect(() => {
    const syncVisibleViewport = () => {
      const vv = window.visualViewport;
      const w = vv ? vv.width : window.innerWidth;
      const h = vv ? vv.height : window.innerHeight;
      const offsetTop = vv ? vv.offsetTop : 0;
      const rootEl = document.documentElement;
      if (rootEl && w > 0 && h > 0) {
        rootEl.style.setProperty("--vvw", `${Math.floor(w)}px`);
        rootEl.style.setProperty("--vvh", `${Math.floor(h)}px`);
        rootEl.style.setProperty("--vv-top", `${Math.floor(offsetTop)}px`);
      }
    };
    syncVisibleViewport();
    window.addEventListener("resize", syncVisibleViewport);
    window.addEventListener("orientationchange", syncVisibleViewport);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", syncVisibleViewport);
      window.visualViewport.addEventListener("scroll", syncVisibleViewport);
    }
    return () => {
      window.removeEventListener("resize", syncVisibleViewport);
      window.removeEventListener("orientationchange", syncVisibleViewport);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", syncVisibleViewport);
        window.visualViewport.removeEventListener("scroll", syncVisibleViewport);
      }
    };
  }, []);

  const handleStartGame = J.useCallback(() => {
    setInGame(true);
  }, []);

  const handleReturnToMenu = J.useCallback(() => {
    setInGame(false);
  }, []);

  const handleToggleDevMode = J.useCallback((active) => {
    setDevMode(active);
  }, []);

  const MenuComponent = window.MenuScreen || (window.Game && window.Game.MenuScreen);

  return h.jsx("main", {
    className:
      "w-full h-full overflow-hidden bg-slate-950 font-sans select-none text-slate-100 relative",
    children: inGame
      ? h.jsxs("div", {
          className: "relative w-full h-full",
          children: [
            h.jsx(GameMain, {
              onReturnToMenu: handleReturnToMenu,
              devMode: devMode,
            }),
            h.jsx("button", {
              type: "button",
              onClick: handleReturnToMenu,
              title: "Voltar ao Menu Principal (Esc)",
              className:
                "fixed top-[calc(112px+var(--sat,0px))] left-[calc(10px+var(--sal,0px))] z-40 px-3 py-1.5 bg-slate-900/85 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-xs font-bold rounded-xl border border-amber-500/40 backdrop-blur shadow-lg transition-all flex items-center gap-1.5 cursor-pointer pointer-events-auto active:scale-95",
              children: [
                h.jsx("span", { children: "🏰" }),
                h.jsx("span", { children: "Menu" }),
              ],
            }),
          ],
        })
      : h.jsx(MenuComponent, {
          onStartGame: handleStartGame,
          devMode: devMode,
          onToggleDevMode: handleToggleDevMode,
        }),
  });
}

pp.createRoot(document.getElementById("root")).render(
  h.jsx(J.StrictMode, { children: h.jsx(App, {}) }),
);
