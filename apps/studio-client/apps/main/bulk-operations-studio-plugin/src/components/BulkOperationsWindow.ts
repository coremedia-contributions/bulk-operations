import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import StudioDialog from "@coremedia/studio-client.ext.base-components/dialogs/StudioDialog";
import SpacingBEMEntities from "@coremedia/studio-client.ext.ui-components/bem/SpacingBEMEntities";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import WindowSkin from "@coremedia/studio-client.ext.ui-components/skins/WindowSkin";
import Button from "@jangaroo/ext-ts/button/Button";
import Labelable from "@jangaroo/ext-ts/form/Labelable";
import AnchorLayout from "@jangaroo/ext-ts/layout/container/Anchor";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkTagAction from "../actions/BulkTagAction";
import ItemsList from "./ItemsList";

interface BulkOperationsWindowConfig extends Config<StudioDialog>, Partial<Pick<BulkOperationsWindow,
  "forceReadOnlyValueExpression" |
  "selectedItems"
>> {
}

class BulkOperationsWindow extends StudioDialog {
  declare Config: BulkOperationsWindowConfig;

  static readonly ITEMS: string = "items";

  static readonly SELECTION: string = "selection";

  model: Bean = null;

  constructor(config: Config<BulkOperationsWindow> = null) {
    super((()=> ConfigUtils.apply(Config(BulkOperationsWindow, {
      modal: false,
      width: 645,
      resizable: true,
      resizeHandles: "s",
      scrollable: false,
      constrainHeader: true,
      ui: WindowSkin.GRID_200.getSkin(),
      layout: Config(AnchorLayout, { anchor: "100%" }),
      defaultType: Labelable["xtype"],
      defaults: Config<Labelable>({
        labelSeparator: "",
        labelAlign: "top",
      }),
      plugins: [
        Config(VerticalSpacingPlugin, { modifier: SpacingBEMEntities.VERTICAL_SPACING_MODIFIER_200 }),
      ],

      items: [
        Config(ItemsList, {
          bindTo: ValueExpressionFactory.create(BulkOperationsWindow.ITEMS, this.getModel()),
          selectedVE: ValueExpressionFactory.create(BulkOperationsWindow.SELECTION, this.getModel()),
        }),
      ],

      buttons: [
        Config(Button, {
          itemId: "okBtn",
          ui: ButtonSkin.FOOTER_PRIMARY.getSkin(),
          scale: "small",
          text: BulkOperations_properties.bulk_edit_dialog_okButton_title,
          handler: bind(this, this.handleOk),
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: ValueExpressionFactory.create(BulkOperationsWindow.ITEMS, this.getModel()),
              transformer: items => !items || items.length == 0,
              componentProperty: "disabled",
            }),
          ],
        }),
        Config(Button, {
          itemId: "cancelBtn",
          ui: ButtonSkin.FOOTER_SECONDARY.getSkin(),
          scale: "small",
          text: BulkOperations_properties.bulk_edit_dialog_cancelButton_title,
          handler: bind(this, this.close),
        }),
      ],

    }), config))());
  }

  forceReadOnlyValueExpression: ValueExpression = null;

  #selectedItems: Array<any> = null;

  getModel(): Bean {
    if (!this.model) {
      this.model = beanFactory._.createLocalBean({});
      this.model.set(BulkOperationsWindow.ITEMS, []);
      this.model.set(BulkOperationsWindow.SELECTION, []);

    }
    return this.model;
  }

  handleOk(): void {
    const action = new BulkTagAction(Config(BulkTagAction, {
      selection: this.getModel().get(BulkOperationsWindow.ITEMS),
      callback: bind(this, this.updateCallback),
    }));
    action.execute();
  }

  updateCallback(): void {
    this.close();
  }

  get selectedItems(): Array<any> {
    return this.#selectedItems;
  }

  set selectedItems(value: Array<Content>) {
    this.getModel().set(BulkOperationsWindow.ITEMS, value);
  }

}

export default BulkOperationsWindow;
