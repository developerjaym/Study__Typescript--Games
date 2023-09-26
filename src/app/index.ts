import { GBPComponent } from "./gbp/component/GBPGameComponent.js";
import injector from "./injector/Injector.js";
import { JayrrowsComponent } from "./jayrrows/component/JayrrowsComponent.js";

(async () => {
  await injector.initialize();
  const router = injector.getRouterService();
  // router.add(
  //   /^\/menu$/,
  //   async () =>
  //     injector
  //       .getHtmlService()
  //       .create("h1", [], "gameMenu", "UNDER CONSTRUCTION"),
  //   false
  // );
  router.add(/^\/jayrrows$/, async () =>
   new JayrrowsComponent()
  );
  router.add(
    /^\/gbp$/,
    async () => {
      const initialGameState = await injector.getGBPStorageService().read();
      const component = new GBPComponent(initialGameState);
      return component;
    },
    
  );
  router.start();
})();
