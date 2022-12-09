import Calendar from "@coremedia/studio-client.client-core/data/Calendar";
import DateUtil from "@jangaroo/ext-ts/Date";
import Config from "@jangaroo/runtime/Config";
import BulkOperationAction from "./BulkOperationAction";

interface BulkUpdateValidityActionConfig extends Config<BulkOperationAction>, Partial<Pick<BulkUpdateValidityAction,
        "validFrom" | "validTo">> {
}

const DATE_FORMAT: string = "d.m.Y-H:i";

class BulkUpdateValidityAction extends BulkOperationAction {

  declare Config: BulkUpdateValidityActionConfig;

  validFrom: Calendar = null;

  validTo: Calendar = null;

  constructor(config: Config<BulkUpdateValidityAction> = null) {
    super(config);
    this.validFrom = config.validFrom;
    this.validTo = config.validTo;
  }

  protected override execBulkOperation(): void {
    const params: any = BulkUpdateValidityAction.#makeRequestParameters(this.selection, this.validFrom, this.validTo);
    this.execRemoteAction("updateValidity", params);
  }

  static #makeRequestParameters(selection: Array<any>, validFrom: Calendar, validTo: Calendar): any {
    function getDateRequestString(calender: Calendar): string {
      return calender != null ? DateUtil.format(calender.getDate(), DATE_FORMAT) : "";
    }
    return {
      selection: selection,
      validFrom: getDateRequestString(validFrom),
      validTo: getDateRequestString(validTo),
    };
  }

}

export default BulkUpdateValidityAction;
