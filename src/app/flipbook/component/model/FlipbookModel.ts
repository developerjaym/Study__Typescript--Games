import { Observable } from "../../../../library/observer/observer.js";
import {
  FlipbookEvent,
  FlipbookPage
} from "./FlipbookEvent.js";

export class FlipbookModel extends Observable<FlipbookEvent> {
  private state: FlipbookPage[];

  constructor() {
    super();
    this.state = [{
      background: "white",
      entities: [{
        name: "Pig",
        image: "🐖",
        size: {height: 25, width: 30},
        position: {x: 0, y: 25}
      }],
    }];
  }

}
