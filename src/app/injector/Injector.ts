import { GameState } from "../component/model/GameState.js";
import { SquareDrawer } from "../component/view/drawer/square/SquareDrawer.js";
import { TextSquareDrawer } from "../component/view/drawer/square/TextSquareDrawer.js";
import { BaseInjector } from "../../service/BaseInjector.js";

import env from "../../service/environment/EnvironmentLoader.js";
import { StorageService } from "../../service/storage/StorageService.js";
import { AppEnvironment } from "../environment/AppEnvironment.js";
import { RandomPieceService } from "./service/game/RandomPieceService.js";
import { RandomRollAnimationService } from "./service/game/RandomRollAnimationService.js";
import { SequenceService } from "./service/game/SequenceService.js";
import { UserService } from "./service/game/UserService.js";
import { LocalStorageService } from "./service/storage/LocalStorageService.js";

class Injector extends BaseInjector<AppEnvironment> {
  private squareDrawer: SquareDrawer;
  private storageService: StorageService<GameState>;
  private userService: UserService;
  private randomPieceService: RandomPieceService;
  private sequenceService: SequenceService;
  private randomRollAnimationService: RandomRollAnimationService
  constructor(env: AppEnvironment) {
    super(env);
    this.squareDrawer = new TextSquareDrawer();
    this.storageService = new LocalStorageService(this.env);
    this.userService = new UserService(this.storageService);
    this.randomPieceService = new RandomPieceService();
    this.sequenceService = new SequenceService();
    this.randomRollAnimationService = new RandomRollAnimationService(this.randomPieceService, this.squareDrawer)
  }
  async initialize(): Promise<void> {}
  getEnvironment(): AppEnvironment {
    return this.env;
  }
  getSquareDrawer(): SquareDrawer {
    return this.squareDrawer;
  }
  getStorageService(): StorageService<GameState> {
    return this.storageService;
  }
  getUserService(): UserService {
    return this.userService;
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
