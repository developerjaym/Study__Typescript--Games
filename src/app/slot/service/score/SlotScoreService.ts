import {
  MatchConfiguration,
  SlotConfiguration,
  WheelConfiguration,
} from "../configuration/SlotConfiguration.js";
import slotConfiguration from "../configuration/SlotConfigurationLoader.js";

export class SlotScoreService {
  constructor(private configuration: SlotConfiguration = slotConfiguration) {}
  test(positions: number[]): MatchConfiguration {
    const selectedFaces = this.configuration.wheels.map(
      (wheel, i) => wheel[positions[i]].id
    );
    // now go through each match configuration
    return (
      this.configuration.matches.find((matchConfiguration) =>
        this.isMatch(matchConfiguration, selectedFaces)
      ) || this.failCombo()
    );
  }
  private isMatch(
    matchConfiguration: MatchConfiguration,
    selectedFaces: number[]
  ): boolean {
    // look through matchConfiguration's requirements
    // compare each requirement to the selectedFaces
    return matchConfiguration.requirements.some((requirement) =>
      this.meetsRequirement(
        requirement,
        selectedFaces,
        matchConfiguration.orderMatters
      )
    );
  }
  private meetsRequirement(
    requirement: number[],
    selectedFaces: number[],
    orderMatters: boolean
  ): boolean {
    if (orderMatters) {
      return requirement.every(
        (requiredNum, index) => requiredNum === selectedFaces[index]
      );
    } else {
      // count how often each number appears in each array
      const reqCount: Map<number, number> = new Map<number, number>();
      const faceCount: Map<number, number> = new Map<number, number>();
      requirement.forEach((req) => {
        reqCount.set(req, (reqCount.get(req) || 0) + 1);
      });
      selectedFaces.forEach((face) => {
        faceCount.set(face, (faceCount.get(face) || 0) + 1);
      });
      return Array.from(reqCount.entries()).every(
        ([key, value]) => faceCount.get(key) === value
      );
    }
  }
  private failCombo(): MatchConfiguration {
    return {
      requirements: [],
      name: "FAIL!",
      shortName: "F",
      message: "You're not very good at games!",
      orderMatters: false,
      sound: "../assets/sad.mp3",
      multiplier: 0,
      icon: "F",
    };
  }
}
