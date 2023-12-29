import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { HuntController } from "../controller/HuntController.js";
import { HuntEntityStatus, HuntEvent } from "../model/HuntEvent.js";

export class HuntCanvasUI implements Viewable<HuntEvent> {
  private container: HTMLElement;
  private backgroundCanvas: HTMLCanvasElement;
  private skyCanvas: HTMLCanvasElement;
  private horizonCanvas: HTMLCanvasElement;
  private groundCanvas: HTMLCanvasElement;

  constructor(
    private controller: HuntController,
    private htmlService = injector.getHtmlService()
  ) {
    this.container = this.htmlService.create("div", ["hunt__canvases"]);
    this.backgroundCanvas = this.htmlService.create("canvas", [
      "hunt-canvas",
      "background__canvas",
    ]);
    this.backgroundCanvas.height = 900
    this.backgroundCanvas.width = 600
    this.skyCanvas = this.htmlService.create("canvas", [
      "hunt-canvas",
      "sky__canvas",
    ]);
    this.skyCanvas.height = 400
    this.skyCanvas.width = 600
    // let's pretend our canvas is 144 units across and 216 units tall
    const clientCoordinateConverter = (
      clientX: number,
      clientY: number,
      screenWidth: number,
      screenHeight: number
    ) => ({
      x: clientX / (screenWidth / 144),
      y: clientY / (screenHeight / 216),
    });
    const canvasShotListener = (e: MouseEvent) => {
      const coordinates = clientCoordinateConverter(
        e.offsetX,
        e.offsetY,
        this.container.clientWidth,
        this.container.clientHeight
      );
      console.log(e.offsetX, e.offsetY, coordinates.x, coordinates.y);
      
      this.controller.onShot(coordinates);
    };
    this.skyCanvas.addEventListener("click", canvasShotListener);
    this.horizonCanvas = this.htmlService.create("canvas", [
      "hunt-canvas",
      "horizon__canvas",
    ]);
    this.horizonCanvas.height = 100
    this.horizonCanvas.width = 600
    this.horizonCanvas.addEventListener("click", canvasShotListener);
    this.groundCanvas = this.htmlService.create("canvas", [
      "hunt-canvas",
      "ground__canvas",
    ]);
    this.groundCanvas.addEventListener("click", canvasShotListener);
    this.groundCanvas.height = 400
    this.groundCanvas.width = 600
    this.container.append(
      this.backgroundCanvas,
      this.skyCanvas,
      this.horizonCanvas,
      this.groundCanvas
    );
  }

  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: HuntEvent): void {
    // convert event's coordinates back from logical units to pixel units
    // the logical grid is 144 units across and 216 units high
    console.log("hunt event (canvas ui)", event.type);
    const logicalCoordinateConverter = (logicalX: number, logicalY: number) => [
      logicalX * (this.container.clientWidth / 144),
      logicalY * (this.container.clientHeight / 216),
    ];

    const skyContext = this.skyCanvas.getContext("2d")!;

    skyContext.clearRect(0, 0, this.skyCanvas.width, this.skyCanvas.height);
    skyContext.fillStyle = "skyblue";
    skyContext.strokeStyle = "skyblue";
    skyContext.fillRect(0, 0, this.skyCanvas.width, this.skyCanvas.height);

    for (const entity of event.horizon) {
      const [x, y] = logicalCoordinateConverter(
        entity.position.x,
        entity.position.y
      );
      const [width, height] = logicalCoordinateConverter(
        entity.size.width,
        entity.size.height
      );
      console.log('entity', x, y, width, height);
      
      skyContext.fillStyle =
        entity.status === HuntEntityStatus.ALIVE ? "green" : "red";
      skyContext.strokeStyle = "black";
      skyContext.fillRect(x, y, width, height);
      console.log("filling", entity.name);
    }
  }
}
