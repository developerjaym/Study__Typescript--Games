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
      ground: [{
        name: "Box",
        image: "",
        size: {height: 5, width: 5},
        position: {x: 0, y: 0},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 1, y: 0}
      }],
      sky: [],
      horizon: [],
      crosshairs: {x: 0, y: 0}
    };
  }

  tick(): void {
    console.log('tick');
    // update positions of each entity

    this.notifyAll({...this.state, type: HuntEventType.MOVEMENT})
  }

  shoot(coordinates: HuntCoordinates): void {
    for(const entity of [...this.state.sky, ...this.state.horizon, ...this.state.ground]) {
        const isHit = this.isHit(entity, coordinates);
        console.log('isHit', isHit, coordinates, entity.position, entity.size);
        
        if(isHit) {
            entity.status = HuntEntityStatus.DEAD
            entity.speed = {x: 0, y: 0}
            // entities in sky should fall down?
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
