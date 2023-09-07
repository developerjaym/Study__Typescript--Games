import injector from "../../../service/Injector.js";
import { UserEvent } from "../UserEvent.js";

export class RemoteSender {
  constructor(private env = injector.getEnvironment(), private urlService = injector.getURLService(), private userService = injector.getUserService()) {}
  async post(uiEvent: UserEvent): Promise<void> {
    uiEvent.origin = await this.userService.getUserId()
    uiEvent.id = crypto.randomUUID()
    fetch(`${this.env.remoteUrl}/${this.urlService.getSearchParam("hostId")}/event`, {
      method: "POST",
      body: JSON.stringify(uiEvent),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
