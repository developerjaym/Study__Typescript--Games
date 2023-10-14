import { SlotConfiguration } from "./SlotConfiguration";

const slotConfiguration = fetch("./assets/slot/SlotConfiguration.json")
.then(response => response.json());

export default await slotConfiguration as SlotConfiguration