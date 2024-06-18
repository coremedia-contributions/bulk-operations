import Config from "@jangaroo/runtime/Config";
import BulkOperationAction from "./BulkOperationAction";

interface AddProductOrCategoryReferenceActionConfig
  extends Config<BulkOperationAction>,
    Partial<Pick<AddProductOrCategoryReferenceAction, "references" | "overrideValue">> {}

class AddProductOrCategoryReferenceAction extends BulkOperationAction {
  declare Config: AddProductOrCategoryReferenceActionConfig;

  references: Array<any> = null;

  overrideValue: boolean = false;

  constructor(config?: Config<AddProductOrCategoryReferenceAction>) {
    super(config);
    this.references = config.references;
    this.overrideValue = config.overrideValue;
  }

  protected override execBulkOperation(): void {
    const params: any = AddProductOrCategoryReferenceAction.#makeRequestParameters(
      this.selection,
      this.references,
      this.overrideValue,
    );
    this.execRemoteAction("addorupdatereferences", params);
  }

  static #makeRequestParameters(selection: Array<any>, references: Array<any>, overrideValue: boolean): any {
    return {
      selection: selection,
      references: references,
      overrideValue: overrideValue,
    };
  }
}

export default AddProductOrCategoryReferenceAction;
