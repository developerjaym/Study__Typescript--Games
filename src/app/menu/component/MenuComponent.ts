import { Page } from "../../../library/observer/Page.js";
import { RouterEvent } from "../../../library/router/RouterEvent.js";
import { HTMLService } from "../../../library/service/HTMLService.js";
import injector from "../../injector/Injector.js";
import { MenuController } from "./controller/MenuController.js";
import { MenuModel } from "./model/MenuModel.js";
import { MenuDisplayUI } from "./view/MenuDisplayUI.js";
import { MenuFilterFormUI } from "./view/MenuFilterFormUI.js";


export class MenuComponent implements Page {
  private menuElement: HTMLElement;
  private menuDisplayUI: MenuDisplayUI;
  private menuFilterForm: MenuFilterFormUI;
  
  
  constructor(private htmlService: HTMLService = injector.getHtmlService()) {
    this.menuElement = this.htmlService.create(
      "main",
      ["main-menu"],
      "mainMenu"
    );
    const menuHeader = this.htmlService.create("header", ["main-menu__header"]);
    menuHeader.append(
      this.htmlService.create(
        "h1",
        ["main-menu__title"],
        "mainMenuHeaderTitle",
        "Games"
      )
    );
    const menuModel = new MenuModel();
    const menuController = new MenuController(menuModel);

    this.menuFilterForm = new MenuFilterFormUI(menuController)
    
    menuHeader.append(this.menuFilterForm.component);
    this.menuElement.append(menuHeader);
    this.menuDisplayUI = new MenuDisplayUI()
    this.menuElement.append(this.menuDisplayUI.component)
    menuModel.subscribe(this.menuDisplayUI);
    menuModel.subscribe(this.menuFilterForm);
    menuModel.start()
  }
  get stylesheet(): string[] {
    return ["menu.css"];
  }
  get component(): HTMLElement {
    return this.menuElement;
  }
  onDestroy(): void {
      
  }
  onChange(event: RouterEvent): void {
    
    
  }
}
