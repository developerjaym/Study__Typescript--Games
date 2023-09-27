import { GBPComponent } from "./gbp/component/GBPGameComponent.js";
import injector from "./injector/Injector.js";
import { JayrrowsComponent } from "./jayrrows/component/JayrrowsComponent.js";
import { MenuComponent } from "./menu/component/MenuComponent.js";
import { SlotComponent } from "./slot/component/SlotComponent.js";

(async () => {
  await injector.initialize();
  const router = injector.getRouterService();
  router.add(/^\/menu$/, async () => new MenuComponent(), true);
  router.add(/^\/jayrrows$/, async () => {
    const initialGameState = await injector.getJayrrowsStorageService().read();
    const component = new JayrrowsComponent(initialGameState);
    return component;
  });
  router.add(/^\/gbp$/, async () => {
    const initialGameState = await injector.getGBPStorageService().read();
    const component = new GBPComponent(initialGameState);
    return component;
  });
  router.add(/^\/slot$/, async () => new SlotComponent());
  router.start();
})();
