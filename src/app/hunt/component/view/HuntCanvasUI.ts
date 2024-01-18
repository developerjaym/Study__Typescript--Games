import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { HuntController } from "../controller/HuntController.js";
import { HuntEntity, HuntEntityStatus, HuntEvent } from "../model/HuntEvent.js";

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
    // let's pretend our canvas is 6 units across and 9 units tall
    const clientCoordinateConverter = (
      clientX: number,
      clientY: number,
      screenWidth: number,
      screenHeight: number
    ) => ({
      x: clientX / (screenWidth / 600),
      y: clientY / (screenHeight / 900),
    });
    const canvasShotListener = (e: MouseEvent) => {
      const coordinates = clientCoordinateConverter(
        e.offsetX,
        e.offsetY,
        this.container.clientWidth,
        this.container.clientHeight
      );
      
      this.controller.onShot(coordinates);
    };
    this.skyCanvas.addEventListener("click", (e) => canvasShotListener(e));
    this.horizonCanvas = this.htmlService.create("canvas", [
      "hunt-canvas",
      "horizon__canvas",
    ]);
    this.horizonCanvas.height = 100
    this.horizonCanvas.width = 600
    this.horizonCanvas.addEventListener("click", (e) => canvasShotListener(e));
    this.groundCanvas = this.htmlService.create("canvas", [
      "hunt-canvas",
      "ground__canvas",
    ]);
    this.groundCanvas.addEventListener("click", (e) => canvasShotListener(e));
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
    this.drawCanvas(this.horizonCanvas, event.horizon, "skyblue")
    this.drawCanvas(this.skyCanvas, event.sky, "skyblue")
    this.drawCanvas(this.groundCanvas, event.ground, "darkolivegreen")
  }
  private drawCanvas(canvas: HTMLCanvasElement, entities: HuntEntity[], fillStyle: string): void {
    const logicalCoordinateConverter = (logicalX: number, logicalY: number, canvas: HTMLCanvasElement) => [
        (logicalX * (this.container.clientWidth / 600))   * canvas.height / canvas.clientHeight,
        logicalY * (this.container.clientHeight / 900)   * canvas.height / canvas.clientHeight,
      ];
  
      const context = canvas.getContext("2d")!;
      
  
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = fillStyle;
      context.lineWidth = 0;
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      for (const entity of entities) {
        const [x, y] = logicalCoordinateConverter(
          entity.position.x,
          entity.position.y,
          canvas
        );
        const [width, height] = logicalCoordinateConverter(
          entity.size.width,
          entity.size.height,
          canvas
        );
        
        context.fillStyle =
          entity.status === HuntEntityStatus.ALIVE ? "green" : "red";
        context.strokeStyle = "black";
        context.lineWidth = 0
        context.fillRect(x , y, width, height);
        context.font = `${height}px sans-serif`
        context.fillText(entity.image, x, y+height)
      }
  }
}