import { BaseInjector } from "../../library/service/BaseInjector.js";
import env from "../../library/service/environment/EnvironmentLoader.js";
import { GBPSquareDrawer } from "../gbp/component/view/drawer/square/GBPSquareDrawer.js";
import { GBPTextSquareDrawer } from "../gbp/component/view/drawer/square/TextSquareDrawer.js";

import { AppEnvironment } from "../environment/AppEnvironment.js";
import { RandomPieceService } from "../gbp/service/game/RandomPieceService.js";
import { RandomRollAnimationService } from "../gbp/service/game/RandomRollAnimationService.js";
import { GBPSequenceService } from "../gbp/service/game/GBPSequenceService.js";
import { GBPLocalStorageService } from "../gbp/service/storage/GBPLocalStorageService.js";
import { GBPStorageService } from "../gbp/service/storage/GBPStorageService.js";
import { JayrrowsSquareDrawer } from "../jayrrows/component/view/drawer/square/JayrrowsSquareDrawer.js";
import { JayrrowsTextSquareDrawer } from "../jayrrows/component/view/drawer/square/JayrrowsTextSquareDrawer.js";
import { JayrrowsLocalStorageService } from "../jayrrows/service/storage/JayrrowsLocalStorageService.js";
import { JayrrowsStorageService } from "../jayrrows/service/storage/JayrrowsStorageService.js";
import slotConfiguration from "../slot/service/configuration/SlotConfigurationLoader.js";
import { IconOnlyWheelFaceDrawer } from "../slot/service/drawer/WheelFaceDrawer/IconOnlyWheelFaceDrawer.js";
import { ImageOnlyWheelFaceDrawer } from "../slot/service/drawer/WheelFaceDrawer/ImageOnlyWheelFaceDrawer.js";
import { WheelFaceDrawerFactory } from "../slot/service/drawer/WheelFaceDrawer/WheelFaceDrawerFactory.js";
import { SlotScoreService } from "../slot/service/score/SlotScoreService.js";
import { LocalUserStorageService } from "./service/LocalUserStorageService.js";
import { UserStorageService } from "./service/UserStorageService.js";
import { WuziqiStorageService } from "../wuziqi/service/storage/WuziqiStorageService.js";
import { WuziqiLocalStorageService } from "../wuziqi/service/storage/WuziqiLocalStorageService.js";
import { WuziqiSquareDrawer } from "../wuziqi/component/view/drawer/square/WuziqiSquareDrawer.js";
import { WuziqiTextSquareDrawer } from "../wuziqi/component/view/drawer/square/TextSquareDrawer.js";
import { WuziqiSequenceService } from "../wuziqi/service/game/WuziqiSequenceService.js";

class Injector extends BaseInjector<AppEnvironment> {
  private gbpSquareDrawer: GBPSquareDrawer;
  private wuziqiSquareDrawer: WuziqiSquareDrawer;
  private jayrrowsSquareDrawer: JayrrowsSquareDrawer;
  private gbpStorageService: GBPStorageService;
  private wuziqiStorageService: WuziqiStorageService;
  private jayrrowsStorageService: JayrrowsStorageService;
  private userStorageService: UserStorageService;
  private randomPieceService: RandomPieceService;
  private gbpSequenceService: GBPSequenceService;
  private wuziqiSequenceService: WuziqiSequenceService;
  private randomRollAnimationService: RandomRollAnimationService;
  private slotScoreService: SlotScoreService;
  private wheelFacerDrawerFactory: WheelFaceDrawerFactory;
  constructor(env: AppEnvironment) {
    super(env);
    this.gbpSquareDrawer = new GBPTextSquareDrawer();
    this.wuziqiSquareDrawer = new WuziqiTextSquareDrawer();
    this.gbpStorageService = new GBPLocalStorageService();
    this.wuziqiStorageService = new WuziqiLocalStorageService();
    this.randomPieceService = new RandomPieceService();
    this.gbpSequenceService = new GBPSequenceService();
    this.wuziqiSequenceService = new WuziqiSequenceService();
    this.jayrrowsSquareDrawer = new JayrrowsTextSquareDrawer();
    this.jayrrowsStorageService = new JayrrowsLocalStorageService();
    this.userStorageService = new LocalUserStorageService();
    this.slotScoreService = new SlotScoreService(slotConfiguration);
    this.randomRollAnimationService = new RandomRollAnimationService(
      this.randomPieceService,
      this.gbpSquareDrawer,
      this.soundEffectService
    );
    this.wheelFacerDrawerFactory = new WheelFaceDrawerFactory(new IconOnlyWheelFaceDrawer(), new ImageOnlyWheelFaceDrawer(this.htmlService))
  }
  async initialize(): Promise<void> {}
  getEnvironment(): AppEnvironment {
    return this.env;
  }
  getGBPSquareDrawer(): GBPSquareDrawer {
    return this.gbpSquareDrawer;
  }
  getWuziqiSquareDrawer(): WuziqiSquareDrawer {
    return this.wuziqiSquareDrawer;
  }
  getGBPStorageService(): GBPStorageService {
    return this.gbpStorageService;
  }
  getWuziqiStorageService(): WuziqiStorageService {
    return this.wuziqiStorageService;
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
  getGBPSequenceService(): GBPSequenceService {
    return this.gbpSequenceService;
  }
  getWuziqiSequenceService(): WuziqiSequenceService {
    return this.wuziqiSequenceService;
  }
  getRandomRollAnimationService(): RandomRollAnimationService {
    return this.randomRollAnimationService;
  }
  getUserStorageService(): UserStorageService {
    return this.userStorageService;
  }
  getSlotScoreService(): SlotScoreService {
    return this.slotScoreService;
  }
  getWheelFaceDrawerFactory(): WheelFaceDrawerFactory {
    return this.wheelFacerDrawerFactory;
  }
}

const injector = new Injector(env);
export default injector;
