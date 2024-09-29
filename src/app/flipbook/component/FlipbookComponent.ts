import { Page } from "../../../library/observer/Page.js";
import { RouterEvent } from "../../../library/router/RouterEvent.js";
import { FlipbookController } from "./controller/FlipbookController.js";
import { FlipbookModel } from "./model/FlipbookModel.js";
import { FlipbookView } from "./view/FlipbookView.js";

export class FlipbookComponent implements Page {
  private model;
  private view;
  constructor() {
    this.model = new FlipbookModel();
    let gameController = new FlipbookController(this.model);
    this.view = new FlipbookView(gameController);
    this.model.subscribe(this.view);
  }
  get component(): HTMLElement {
    return this.view.component;
  }
  get stylesheet(): string[] {
    return ["flipbook.css"];
  }
  onInit(): void {}
  onDestroy(): void {
    this.view.stop();
  }
  onChange(event: RouterEvent): void {}
}
