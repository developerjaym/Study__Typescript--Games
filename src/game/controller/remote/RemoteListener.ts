import injector from "../../../service/Injector.js";
import { IController } from "../IController.js";
import { UserEvent } from "../UserEvent.js";

export class RemoteListener {
  private eventIds: Set<string | undefined> = new Set<string | undefined>();
  id: number = 0;
  constructor(
    private controller: IController,
    private env = injector.getEnvironment(),
    private urlService = injector.getURLService(),
    private userService = injector.getUserService()
  ) {}
  start() {
    this.id = window.setInterval(() => {
      this.poll();
    }, this.env.pollPeriod);
  }
  cancel() {
    window.clearInterval(this.id);
  }
  private async poll() {
    const hostId = this.urlService.getSearchParam("hostId");
    const response = await fetch(`${this.env.remoteUrl}/${hostId}/event`);
    const listOfEvents = await response.json();
    const myId = await this.userService.getUserId();

    // only look at events that haven't been seen AND didn't originate on this machine
    // and then send them to the controller
    listOfEvents
      .filter(
         (event: UserEvent) =>
          !this.eventIds.has(event?.id) && event.origin !== myId
      )
      .forEach((neverBeforeSeenEvent: UserEvent) => 
        this.controller.onEvent(neverBeforeSeenEvent)
      );
      listOfEvents.forEach((event: UserEvent) => this.eventIds.add(event?.id))
  }
}
