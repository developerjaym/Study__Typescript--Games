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
        name: "Box",
        image: "",
        size: {height: 10, width: 10},
        position: {x: 0, y: 90},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 10, y: 0}
      }],
      sky: [{
        name: "Box",
        image: "",
        size: {height: 5, width: 5},
        position: {x: 0, y: 45},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 10, y: 1}
      }],
      ground: [{
        name: "Box",
        image: "",
        size: {height: 25, width: 25},
        position: {x: 0, y: 25},
        status: HuntEntityStatus.ALIVE,
        speed: {x: 3, y: 0}
      }],
      crosshairs: {x: 0, y: 0}
    };
  }

  tick(): void {
    console.log('tick');
    // update positions of each entity
    for(const entity of [...this.state.sky, ...this.state.horizon, ...this.state.ground]) {
        entity.position = {x: entity.position.x + entity.speed.x, y: entity.position.y + entity.speed.y}
        // if entity is off the map reverse it
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
