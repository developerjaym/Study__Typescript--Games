import { GBPComponent } from "./gbp/component/GBPGameComponent.js";
import injector from "./injector/Injector.js";
import { JayrrowsComponent } from "./jayrrows/component/JayrrowsComponent.js";
import { MenuComponent } from "./menu/component/MenuComponent.js";

(async () => {
  await injector.initialize();
  const router = injector.getRouterService();
  router.add(
    /^\/menu$/,
    async () =>
      new MenuComponent(),
    true
  );
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
