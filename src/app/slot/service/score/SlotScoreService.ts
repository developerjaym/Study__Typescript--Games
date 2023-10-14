import { SlotCombo, SlotWheel } from "../../component/event/SlotEvent.js";
import { SlotConfiguration } from "../configuration/SlotConfiguration.js";
import slotConfiguration from "../configuration/SlotConfigurationLoader.js";

export class SlotScoreService {
  constructor(private configuration: SlotConfiguration = slotConfiguration) {}
  test(wheels: SlotWheel[]): SlotCombo {
    const faces = wheels.map((wheel) => wheel.faces[wheel.position]);
    if (faces.every((face) => face.type === faces[0].type)) {
      return {
        name: "ALL MATCH!",
        faces: [],
        multiplier: wheels.length * 12,
      };
    }
    else if(this.checkIfXMatch(wheels, 2)) {
        return {
            name: "PAIR!",
            faces: [],
            multiplier: Math.ceil(12 / wheels.length)
        }
    }
    return this.failCombo();
  }
  /**
   *
   * @param wheels
   * @param x number of matches we are testing for
   */
  private checkIfXMatch(wheels: SlotWheel[], x: number): boolean {
    const wheelValues = wheels.map((wheel) => wheel.faces[wheel.position].type);
    // for each wheel value, see how many times it appears
    const countMap = new Map<number, number>()
    wheelValues.forEach(wheelValue => {
        countMap.set(wheelValue, wheelValues.filter(innerWheelValue => innerWheelValue === wheelValue).length)
    })
    return Array.from(countMap.values()).some(value => value >= x)
  }
  private failCombo(): SlotCombo {
    return {
      name: "FAIL",
      faces: [],
      multiplier: 0,
    };
  }
}
