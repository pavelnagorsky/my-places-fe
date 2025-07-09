import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";
import { ISelect } from "@/shared/interfaces";

export interface IEditExcursionForm extends IExcursionBuilderForm {
  updateTranslations: boolean;
}
