import { Observer } from "../../../../library/observer/observer.js";
import { StorageService } from "../../../../library/service/storage/StorageService.js";
import { GameState } from "../../component/model/GameState.js";

export interface WuziqiStorageService extends StorageService<GameState>, Observer<GameState>{
    
}
