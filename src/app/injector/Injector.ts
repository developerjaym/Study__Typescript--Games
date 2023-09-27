import { BaseInjector } from "../../library/service/BaseInjector.js";
import env from "../../library/service/environment/EnvironmentLoader.js";
import { GBPSquareDrawer } from "../gbp/component/view/drawer/square/GBPSquareDrawer.js";
import { GBPTextSquareDrawer } from "../gbp/component/view/drawer/square/TextSquareDrawer.js";

import { AppEnvironment } from "../environment/AppEnvironment.js";
import { RandomPieceService } from "../gbp/service/game/RandomPieceService.js";
import { RandomRollAnimationService } from "../gbp/service/game/RandomRollAnimationService.js";
import { SequenceService } from "../gbp/service/game/SequenceService.js";
import { GBPLocalStorageService } from "../gbp/service/storage/GBPLocalStorageService.js";
import { GBPStorageService } from "../gbp/service/storage/GBPStorageService.js";
import { JayrrowsSquareDrawer } from "../jayrrows/component/view/drawer/square/JayrrowsSquareDrawer.js";
import { JayrrowsTextSquareDrawer } from "../jayrrows/component/view/drawer/square/JayrrowsTextSquareDrawer.js";
import { JayrrowsStorageService } from "../jayrrows/service/storage/JayrrowsStorageService.js";
import { JayrrowsLocalStorageService } from "../jayrrows/service/storage/JayrrowsLocalStorageService.js";
import { UserStorageService } from "./service/UserStorageService.js";
import { LocalUserStorageService } from "./service/LocalUserStorageService.js";

class Injector extends BaseInjector<AppEnvironment> {
  private gbpSquareDrawer: GBPSquareDrawer;
  private jayrrowsSquareDrawer: JayrrowsSquareDrawer;
  private gbpStorageService: GBPStorageService;
  private jayrrowsStorageService: JayrrowsStorageService;
  private userStorageService: UserStorageService;
  private randomPieceService: RandomPieceService;
  private sequenceService: SequenceService;
  private randomRollAnimationService: RandomRollAnimationService
  constructor(env: AppEnvironment) {
    super(env);
    this.gbpSquareDrawer = new GBPTextSquareDrawer();
    this.gbpStorageService = new GBPLocalStorageService();
    this.randomPieceService = new RandomPieceService();
    this.sequenceService = new SequenceService();
    this.randomRollAnimationService = new RandomRollAnimationService(this.randomPieceService, this.gbpSquareDrawer)
    this.jayrrowsSquareDrawer = new JayrrowsTextSquareDrawer();
    this.jayrrowsStorageService = new JayrrowsLocalStorageService();
    this.userStorageService = new LocalUserStorageService();
  }
  async initialize(): Promise<void> {}
  getEnvironment(): AppEnvironment {
    return this.env;
  }
  getGBPSquareDrawer(): GBPSquareDrawer {
    return this.gbpSquareDrawer;
  }
  getGBPStorageService(): GBPStorageService {
    return this.gbpStorageService;
  }
  getJayrrowsSquareDrawer(): JayrrowsSquareDrawer {
    return this.jayrrowsSquareDrawer;
  }
  getJayrrowsStorageService(): JayrrowsStorageService {
    return this.jayrrowsStorageService;
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
  getUserStorageService(): UserStorageService {
    return this.userStorageService;
  }
}

const injector = new Injector(env);
export default injector;
