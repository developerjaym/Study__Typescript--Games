import { Observable } from "../../../../library/observer/observer.js";
import {
  HuntCoordinates,
  HuntEntity,
  HuntEntityStatus,
  HuntEvent,
  HuntEventType,
} from "./HuntEvent.js";

export class HuntModel extends Observable<HuntEvent> {
  private state: {
    sky: HuntEntity[];
    horizon: HuntEntity[];
    ground: HuntEntity[];
    crosshairs: HuntCoordinates;
  };

  constructor() {
    super();
    this.state = {
      horizon: [{
        name: "Cow",
        image: "🐄",
        size: {height: 20, width: 25},
        position: {x: 0, y: 80},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 10, y: 0}
      }],
      sky: [
        {
        name: "Eagle",
        image: "🦅",
        size: {height: 12, width: 15},
        position: {x: 0, y: 45},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 10, y: 1}
      },
        {
        name: "Bat",
        image: "🦇",
        size: {height: 8, width: 16},
        position: {x: 0, y: 35},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 13, y: 4}
      }
    ],
      ground: [{
        name: "Pig",
        image: "🐖",
        size: {height: 25, width: 30},
        position: {x: 0, y: 25},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 3, y: 0}
      },
      {
        name: "Deer",
        image: "🦌",
        size: {height: 25, width: 30},
        position: {x: 0, y: 55},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 7, y: 0}
      },
      {
        name: "Mammoth",
        image: "🦣",
        size: {height: 45, width: 60},
        position: {x: 0, y: 55},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 2, y: 0}
      },
      {
        name: "Rat",
        image: "🐀",
        size: {height: 5, width: 8},
        position: {x: 0, y: 80},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 12, y: 0}
      },
      {
        name: "Bison",
        image: "🦬",
        size: {height: 30, width: 36},
        position: {x: 0, y: 85},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 5, y: 0}
      }],
      crosshairs: {x: 0, y: 0}
    };
  }

  tick(): void {
    // update positions of each entity
    for(const entity of [...this.state.sky, ...this.state.horizon, ...this.state.ground]) {
        entity.position = {x: entity.position.x + entity.speed.x, y: entity.position.y + entity.speed.y}
        // if entity is off the map reverse it
        // TODO each section of the map (sky, horizon, ground) can be a different size. Adjust model to accomodate this.
        if(entity.position.x >= 600 || entity.position.x <= 0 ){
            entity.speed.x = -1 * entity.speed.x
        }
        if(entity.position.y >= 900 || entity.position.y <= 0 ){
            entity.speed.y = -1 * entity.speed.y
        }
    }


    this.notifyAll({...this.state, type: HuntEventType.MOVEMENT})
  }

  shoot(coordinates: HuntCoordinates): void {
    for(const entity of [...this.state.sky, ...this.state.horizon, ...this.state.ground]) {
        const isHit = this.isHit(entity, coordinates);
        if(isHit) {
            entity.status = HuntEntityStatus.DEAD
            entity.speed = {x: 0, y: 0}
            // TODO entities in sky should fall down
        }
    }
    // check for entities in the vicinity
    //  for each entity in the vicinity of the shot
    //      update it on the state object to dead
    this.notifyAll({...this.state, type: HuntEventType.SHOT_FIRED})
  }
  private isHit(entity: HuntEntity, coordinates: HuntCoordinates): boolean {
    const xGood = coordinates.x >= entity.position.x && coordinates.x <= entity.position.x + entity.size.width;
    const yGood = coordinates.y >= entity.position.y && coordinates.y <= entity.position.y + entity.size.height;
    return xGood && yGood;
  }
}
