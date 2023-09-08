import { SquareDrawer } from "../game/view/drawer/square/SquareDrawer.js";
import { TextSquareDrawer } from "../game/view/drawer/square/TextSquareDrawer.js";
import { HTMLService } from "./HTMLService.js";
import { RandomPieceService } from "./RandomPieceService.js";
import { SequenceService } from "./SequenceService.js";
import { URLService } from "./URLService.js";
import { UserService } from "./UserService.js";
import { Environment } from "./environment/Environment.js";
import env from "./environment/EnvironmentLoader.js";
import { LocalStorageService } from "./storage/LocalStorageService.js";
import { StorageService } from "./storage/StorageService.js";

class Injector {
  private htmlService: HTMLService;
  private squareDrawer: SquareDrawer;
  private storageService: StorageService;
  private userService: UserService;
  private urlService: URLService;
  private randomPieceService: RandomPieceService;
  private sequenceService: SequenceService;
  constructor(private env: Environment) {
    this.htmlService = new HTMLService(document, this.env);
    this.squareDrawer = new TextSquareDrawer();
    this.storageService = new LocalStorageService(this.env);
    this.userService = new UserService(this.storageService);
    this.urlService = new URLService();
    this.randomPieceService = new RandomPieceService();
    this.sequenceService = new SequenceService();
  }
  async initialize() {}
  static async getInstance() {}
  getEnvironment(): Environment {
    return this.env;
  }
  getHtmlService(): HTMLService {
    return this.htmlService;
  }
  getSquareDrawer(): SquareDrawer {
    return this.squareDrawer;
  }
  getStorageService(): StorageService {
    return this.storageService;
  }
  getUserService(): UserService {
    return this.userService;
  }
  getURLService(): URLService {
    return this.urlService;
  }
  getRandomPieceService(): RandomPieceService {
    return this.randomPieceService;
  }
  getSequenceService(): SequenceService {
    return this.sequenceService;
  }
}

const injector = new Injector(env);
export default injector;
