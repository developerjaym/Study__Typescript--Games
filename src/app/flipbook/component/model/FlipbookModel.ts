import { Observable } from "../../../../library/observer/observer.js";
import {
  FlipbookEvent,
  FlipbookEventType,
  FlipbookPage,
} from "./FlipbookEvent.js";

export class FlipbookModel extends Observable<FlipbookEvent> {
  private state: {
    focused: string;
    pages: FlipbookPage[];
  };

  constructor() {
    super();
    const randomFirstPage = crypto.randomUUID();
    this.state = {
      focused: randomFirstPage,
      pages: [
        {
          id: randomFirstPage,
          name: "page0",
          background: "white",
          entities: [
            {
              name: "Pig",
              image: "🐖",
              size: { height: 25, width: 30 },
              position: { x: 0, y: 25 },
            },
          ],
        },
      ],
    };
  }
  start(): void {
    this.notifyAll(
      structuredClone({ type: FlipbookEventType.START, ...this.state })
    );
  }
  addPage(index: number = this.state.pages.length): void {
    const randomUUID = crypto.randomUUID();
    this.state.focused = randomUUID;
    this.state.pages.splice(index, 0, {
      id: randomUUID,
      name: `page${index}`,
      background: "white",
      entities: [], // TODO, should start with the same entities as the previous page
    });
    this.notifyAll(structuredClone({type: FlipbookEventType.PAGE_CREATED, ...this.state}))
  }
}
