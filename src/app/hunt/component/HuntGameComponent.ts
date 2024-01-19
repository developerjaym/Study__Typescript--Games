import { Page } from "../../../library/observer/Page.js";
import { RouterEvent } from "../../../library/router/RouterEvent.js";
import { HuntController } from "./controller/HuntController.js";
import { HuntModel } from "./model/HuntModel.js";
import { HuntView } from "./view/HuntView.js";

export class HuntGameComponent implements Page {
  private model;
  private view;
  constructor() {
    this.model = new HuntModel();
    let gameController = new HuntController(this.model);
    this.view = new HuntView(gameController);
    this.model.subscribe(this.view);
  }
  get component(): HTMLElement {
    return this.view.component;
  }
  get stylesheet(): string[] {
    return ["hunt.css"];
  }
  onInit(): void {}
  onDestroy(): void {
    this.view.stop();
  }
  onChange(event: RouterEvent): void {}
}
