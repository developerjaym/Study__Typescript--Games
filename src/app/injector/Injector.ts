import { BaseInjector } from "../../library/service/BaseInjector.js";
import env from "../../library/service/environment/EnvironmentLoader.js";
import { GBPSquareDrawer } from "../gbp/component/view/drawer/square/GBPSquareDrawer.js";
import { TextSquareDrawer } from "../gbp/component/view/drawer/square/TextSquareDrawer.js";

import { AppEnvironment } from "../environment/AppEnvironment.js";
import { RandomPieceService } from "../gbp/service/game/RandomPieceService.js";
import { RandomRollAnimationService } from "../gbp/service/game/RandomRollAnimationService.js";
import { SequenceService } from "../gbp/service/game/SequenceService.js";
import { GBPLocalStorageService } from "../gbp/service/storage/GBPLocalStorageService.js";
import { GBPStorageService } from "../gbp/service/storage/GBPStorageService.js";

class Injector extends BaseInjector<AppEnvironment> {
  private squareDrawer: GBPSquareDrawer;
  private storageService: GBPStorageService;
  private randomPieceService: RandomPieceService;
  private sequenceService: SequenceService;
  private randomRollAnimationService: RandomRollAnimationService
  constructor(env: AppEnvironment) {
    super(env);
    this.squareDrawer = new TextSquareDrawer();
    this.storageService = new GBPLocalStorageService();
    this.randomPieceService = new RandomPieceService();
    this.sequenceService = new SequenceService();
    this.randomRollAnimationService = new RandomRollAnimationService(this.randomPieceService, this.squareDrawer)
  }
  async initialize(): Promise<void> {}
  getEnvironment(): AppEnvironment {
    return this.env;
  }
  getGBPSquareDrawer(): GBPSquareDrawer {
    return this.squareDrawer;
  }
  getGBPStorageService(): GBPStorageService {
    return this.storageService;
  }
  getRandomPieceService(): RandomPieceService {
    return this.randomPieceService;
  }
  getSequenceService(): SequenceService {
    return this.sequenceService;
  }
  getRandomRollAnimationService(): RandomRollAnimationService {
    return this.randomRollAnimationService
  }
}

const injector = new Injector(env);
export default injector;
