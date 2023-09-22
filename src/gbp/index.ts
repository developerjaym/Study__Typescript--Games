import { GameComponent } from "./component/GameComponent.js";
import injector from "./injector/Injector.js";

(async () => {
  await injector.initialize();
  const router = injector.getRouterService();
  router.add(
    /^\/menu$/,
    async () =>
      injector
        .getHtmlService()
        .create("h1", [], "gameMenu", "UNDER CONSTRUCTION"),
    false
  );
  router.add(/^\/jayrrows$/, async () =>
    injector
      .getHtmlService()
      .create("h1", [], "jayrrowsMain", "UNDER CONSTRUCTION")
  );
  router.add(
    /^\/gbp$/,
    async () => {
      const initialGameState = await injector.getStorageService().read();
      const component = new GameComponent(initialGameState);
      return component.component;
    },
    
  );
  router.start();
})();
