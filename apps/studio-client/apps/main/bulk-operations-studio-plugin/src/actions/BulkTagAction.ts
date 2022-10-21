import Config from "@jangaroo/runtime/Config";
import BulkOperationAction from "./BulkOperationAction";

interface BulkTagActionConfig extends Config<BulkOperationAction>, Partial<Pick<BulkTagAction,
  "taxonomyItems" |
  "taxonomyCheckBoxValue" |
  "taxonomyPropertyName"
>> {
}

/**
 * Bulk operation to apply tags to the selected items.
 */
class BulkTagAction extends BulkOperationAction {
  declare Config: BulkTagActionConfig;

  taxonomyItems: Array<any> = null;

  taxonomyCheckBoxValue: boolean = false;

  taxonomyPropertyName: string = null;

  constructor(config?: Config<BulkTagAction>) {
    super(config);
    this.taxonomyItems = config.taxonomyItems;
    this.taxonomyCheckBoxValue = config.taxonomyCheckBoxValue;
    this.taxonomyPropertyName = config.taxonomyPropertyName;
  }

  protected execBulkOperation(): void {
    const params: any = BulkTagAction.#makeRequestParameters(this.selection, this.taxonomyItems, this.taxonomyCheckBoxValue, this.taxonomyPropertyName);
    this.execRemoteAction("tag", params);
  }

  static #makeRequestParameters(selection: Array<any>, taxonomyItems: Array<any>, taxonomyCheckBoxValue: boolean, taxonomyPropertyName: string): any {
    return {
      selection: selection,
      taxonomyItems: taxonomyItems,
      taxonomyCheckBoxValue: taxonomyCheckBoxValue,
      taxonomyPropertyName: taxonomyPropertyName,
    };
  }

}

export default BulkTagAction;
