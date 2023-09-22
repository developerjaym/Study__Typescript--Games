import { GameComponent } from "./component/GameComponent.js";
import injector from "./injector/Injector.js";

// Bootstrap injector (including environment loader)
(async () => {
  await injector.initialize();
  const initialGameState = await injector.getStorageService().read();
  const component = new GameComponent(initialGameState);
  injector.getHtmlService().append(component.component);
})();
