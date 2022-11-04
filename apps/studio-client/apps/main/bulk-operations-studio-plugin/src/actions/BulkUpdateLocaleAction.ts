import Config from "@jangaroo/runtime/Config";
import BulkOperationAction from "./BulkOperationAction";

interface BulkUpdateLocaleActionConfig extends Config<BulkOperationAction>, Partial<Pick<BulkUpdateLocaleAction,
        "locale">> {
}

class BulkUpdateLocaleAction extends BulkOperationAction {

  declare Config: BulkUpdateLocaleActionConfig;

  locale: string = null;

  constructor(config: Config<BulkUpdateLocaleAction> = null) {
    super(config);
    this.locale = config.locale;
  }

  protected override execBulkOperation(): void {
    const params: any = BulkUpdateLocaleAction.#makeRequestParameters(this.selection, this.locale);
    this.execRemoteAction("updatelocale", params);
  }

  static #makeRequestParameters(selection: Array<any>, languageTag: string): any {
    return {
      selection: selection,
      languageTag: languageTag,
    };
  }

}

export default BulkUpdateLocaleAction;
