import CatalogModel from "@coremedia-blueprint/studio-client.main.ec-studio-model/model/CatalogModel";
import ECommerceStudioPlugin_properties from "@coremedia-blueprint/studio-client.main.ec-studio/ECommerceStudioPlugin_properties";
import CatalogLinkPropertyField from "@coremedia-blueprint/studio-client.main.ec-studio/components/link/CatalogLinkPropertyField";
import CatalogHelper from "@coremedia-blueprint/studio-client.main.ec-studio/helper/CatalogHelper";
import LivecontextStudioPlugin_properties from "@coremedia-blueprint/studio-client.main.lc-studio/LivecontextStudioPlugin_properties";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import ConfigBasedValueExpression from "@coremedia/studio-client.ext.ui-components/data/ConfigBasedValueExpression";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import WindowSkin from "@coremedia/studio-client.ext.ui-components/skins/WindowSkin";
import Checkbox from "@jangaroo/ext-ts/form/field/Checkbox";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import AddProductOrCategoryReferenceAction from "../actions/AddProductOrCategoryReferenceAction";
import BulkOperationsWindow from "./BulkOperationsWindow";
import ItemsList from "./ItemsList";

interface AddProductOrCategoryReferenceWindowConfig extends Config<BulkOperationsWindow>{
}

class AddProductOrCategoryReferenceWindow extends BulkOperationsWindow {
  declare Config: AddProductOrCategoryReferenceWindowConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.studio.bulktag.config.AddProductOrCategoryReferenceWindow";

  static readonly OVERRIDE_CHECKER: string = "overrideChecker";

  constructor(config: Config<AddProductOrCategoryReferenceWindow> = null) {
    super((()=> ConfigUtils.apply(Config(AddProductOrCategoryReferenceWindow, {
      title: BulkOperations_properties.bulk_tag_dialog_searchAndReplace_title,
      iconCls: CoreIcons_properties.research,
      modal: false,
      width: 650,
      resizable: true,
      resizeHandles: "s",
      scrollable: true,
      constrainHeader: true,
      ui: WindowSkin.GRID_200.getSkin(),
      cls: "AddProductOrCategoryReferenceWindow",

      items: [
        Config(Panel, {
          title: LivecontextStudioPlugin_properties.CMPicture_propertyGroup_commerce,
          items: [
            Config(CatalogLinkPropertyField, {
              propertyName: CatalogHelper.REFERENCES_LIST_NAME,
              hideCatalog: true,
              linkTypeNames: [CatalogModel.TYPE_CATEGORY, CatalogModel.TYPE_PRODUCT],
              createStructFunction: bind(this, this.createStructs),
              dropAreaText: ECommerceStudioPlugin_properties.Categories_Products_Link_empty_text,
              model: this.getModel(),
            }),
          ],
        }),
        Config(Checkbox, {
          hideLabel: true,
          boxLabel: BulkOperations_properties.bulk_tag_dialog_ecommerceReference_override,
          anchor: "100%",
          plugins: [
            Config(BindPropertyPlugin, {
              bidirectional: true,
              bindTo: new ConfigBasedValueExpression({
                context: this.getModel(),
                expression: AddProductOrCategoryReferenceWindow.OVERRIDE_CHECKER,
              }),
            }),
          ],
        }),

        Config(ItemsList, {
          bindTo: ValueExpressionFactory.create(BulkOperationsWindow.ITEMS, this.getModel()),
          selectedVE: ValueExpressionFactory.create(BulkOperationsWindow.SELECTION, this.getModel()),
        }),
      ],
    }), config))());
  }

  override getModel(): Bean {
    if (!this.model) {
      super.getModel();

      // Set initial checkbox state
      this.model.set(AddProductOrCategoryReferenceWindow.OVERRIDE_CHECKER, false);
    }
    return this.model;
  }

  override handleOk(): void {
    const action = new AddProductOrCategoryReferenceAction(Config(AddProductOrCategoryReferenceAction, {
      selection: this.selectedItems,
      callback: bind(this, this.updateCallback),
      references: this.getModel().get(CatalogHelper.REFERENCES_LIST_NAME),
      overrideValue: this.getModel().get(AddProductOrCategoryReferenceWindow.OVERRIDE_CHECKER),
    }));
    action.execute();
  }

  protected createStructs(): void {
  }

}

export default AddProductOrCategoryReferenceWindow;
