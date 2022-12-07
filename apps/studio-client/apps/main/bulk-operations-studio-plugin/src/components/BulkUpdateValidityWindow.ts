import Bean from "@coremedia/studio-client.client-core/data/Bean";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import NameColumn from "@coremedia/studio-client.ext.cap-base-components/columns/NameColumn";
import StatusColumn from "@coremedia/studio-client.ext.cap-base-components/columns/StatusColumn";
import TypeIconColumn from "@coremedia/studio-client.ext.cap-base-components/columns/TypeIconColumn";
import LinkListThumbnailColumn
  from "@coremedia/studio-client.ext.content-link-list-components/columns/LinkListThumbnailColumn";

import DateTimePropertyField
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/DateTimePropertyField";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkUpdateValidityAction from "../actions/BulkUpdateValidityAction";
import BulkOperationsWindow from "./BulkOperationsWindow";
import ItemsList from "./ItemsList";

interface BulkUpdateValidityWindowConfig extends Config<BulkOperationsWindow> {
}

class BulkUpdateValidityWindow extends BulkOperationsWindow {
  declare Config: BulkUpdateValidityWindowConfig;

  static readonly VALID_FROM: string = "validFrom";

  static readonly VALID_TO: string = "validTo";

  constructor(config: Config<BulkUpdateValidityWindow> = null) {
    super((() => ConfigUtils.apply(Config(BulkUpdateValidityWindow, {
      title: BulkOperations_properties.bulk_edit_dialog_updateValidity_title,
      items: [
        Config(DisplayField, {
          itemId: "infoBox",
          value: BulkOperations_properties.bulk_edit_dialog_updateValidity_info,
        }),
        Config(DateTimePropertyField, {
          bindTo: ValueExpressionFactory.createFromValue(this.getModel()),
          itemId: "validFromChooser",
          propertyName: BulkUpdateValidityWindow.VALID_FROM,
        }),
        Config(DateTimePropertyField, {
          bindTo: ValueExpressionFactory.createFromValue(this.getModel()),
          itemId: "validToChooser",
          propertyName: BulkUpdateValidityWindow.VALID_TO,
        }),
        Config(ItemsList, {
          bindTo: ValueExpressionFactory.create(BulkUpdateValidityWindow.ITEMS, this.getModel()),
          selectedVE: ValueExpressionFactory.create(BulkUpdateValidityWindow.SELECTION, this.getModel()),
          columns: [
            Config(LinkListThumbnailColumn),
            Config(TypeIconColumn),
            Config(NameColumn, { flex: 2 }),
            Config(StatusColumn),
          ],
        }),

      ],
    }), config))());
  }

  override handleOk(): void {
    const action = new BulkUpdateValidityAction(Config(BulkUpdateValidityAction, {
      selection: this.getModel().get(BulkOperationsWindow.ITEMS),
      validFrom: this.getModel().get("properties").get(BulkUpdateValidityWindow.VALID_FROM),
      validTo: this.getModel().get("properties").get(BulkUpdateValidityWindow.VALID_TO),
      callback: bind(this, this.updateCallback),
    }));
    action.execute();
  }

  override getModel(): Bean {
    if (!this.model) {
      super.getModel();
      this.model.set("properties", beanFactory._.createLocalBean({}));
    }
    return this.model;
  }

}

export default BulkUpdateValidityWindow;
