import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { FlipbookController } from "../controller/FlipbookController.js";
import { FlipbookEntity, FlipbookEvent } from "../model/FlipbookEvent.js";

export class FlipbookCanvasUI implements Viewable<FlipbookEvent> {
  private container: HTMLElement;
  private backgroundCanvas: HTMLCanvasElement;

  constructor(
    private controller: FlipbookController,
    private htmlService = injector.getHtmlService()
  ) {
    this.container = this.htmlService.create("div", ["flipbook__canvases"]);
    this.backgroundCanvas = this.htmlService.create("canvas", [
      "flipbook-canvas",
      "background__canvas",
    ]);
    this.backgroundCanvas.height = 600
    this.backgroundCanvas.width = 900
    
    // let's pretend our canvas is 6 units across and 9 units tall
    const clientCoordinateConverter = (
      clientX: number,
      clientY: number,
      screenWidth: number,
      screenHeight: number
    ) => ({
      x: clientX / (screenWidth / 900),
      y: clientY / (screenHeight / 600),
    });
    const canvasShotListener = (e: MouseEvent) => {
      // const coordinates = clientCoordinateConverter(
      //   e.offsetX,
      //   e.offsetY,
      //   this.container.clientWidth,
      //   this.container.clientHeight
      // );
      
      // this.controller.onShot(coordinates);
    };
    this.container.appendChild(this.backgroundCanvas);
    
  }

  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: FlipbookEvent): void {
    const activePage = event.pages.find(page => page.id === event.focused)!;
    this.drawCanvas(this.backgroundCanvas, activePage.entities, activePage.background);
  }
  private drawCanvas(canvas: HTMLCanvasElement, entities: FlipbookEntity[], fillStyle: string): void {
    const logicalCoordinateConverter = (logicalX: number, logicalY: number, canvas: HTMLCanvasElement) => [
        (logicalX * (this.container.clientWidth / 900))   * canvas.height / canvas.clientHeight,
        logicalY * (this.container.clientHeight / 600)   * canvas.height / canvas.clientHeight,
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
        
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.lineWidth = 0
        context.fillRect(x , y, width, height);
        context.font = `${height}px sans-serif`
        context.fillText(entity.image, x, y+height)
      }
  }
}