import { MenuModel } from "../model/MenuModel.js";
import { MenuFilterSubmission } from "./MenuFilterSubmission.js";

export class MenuController {
    constructor(private model: MenuModel) {
    }
    onFilterChange(formData: MenuFilterSubmission): void {
        this.model.changeFilters(formData);
    }
}