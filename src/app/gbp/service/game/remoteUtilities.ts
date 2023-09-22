import injector from "../../../injector/Injector.js";
import { GameEvent } from "../../component/model/GameEvent.js";

const isRemoteGame = (event: GameEvent, urlService = injector.getURLService()) => {
  return Boolean(urlService.getSearchParam("hostId")?.length)
}

const isRemoteTurnNext = async (
  event: GameEvent,
  userService = injector.getUserService(),
  urlService = injector.getURLService()
) => {
    const isRemote = isRemoteGame(event)
    const isHost = urlService.getSearchParam("hostId") !== await userService.getUserId()
   
    const thisMachineIsNotActivePlayer = (isHost && event.activePlayer.id) || (!isHost && !event.activePlayer.id) // id is true if GREEN, player is HOST if they are first, GREEN goes first, ergo this should work
    
    return isRemote && thisMachineIsNotActivePlayer
};


export {isRemoteTurnNext, isRemoteGame}
