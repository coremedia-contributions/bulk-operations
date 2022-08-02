import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import Locale from "@coremedia/studio-client.client-core/data/Locale";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import NameColumn from "@coremedia/studio-client.ext.cap-base-components/columns/NameColumn";
import StatusColumn from "@coremedia/studio-client.ext.cap-base-components/columns/StatusColumn";
import TypeIconColumn from "@coremedia/studio-client.ext.cap-base-components/columns/TypeIconColumn";
import LinkListThumbnailColumn
  from "@coremedia/studio-client.ext.content-link-list-components/columns/LinkListThumbnailColumn";
import DataField from "@coremedia/studio-client.ext.ui-components/store/DataField";
import EditorContextImpl from "@coremedia/studio-client.main.editor-components/sdk/EditorContextImpl";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import AvailableLocalesComboBox
  from "@coremedia/studio-client.main.editor-components/sdk/translate/AvailableLocalesComboBox";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import Column from "@jangaroo/ext-ts/grid/column/Column";
import { as, bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkUpdateLocaleAction from "../actions/BulkUpdateLocaleAction";
import BulkOperationsWindow from "./BulkOperationsWindow";
import ItemsList from "./ItemsList";

interface BulkUpdateLocaleWindowConfig extends Config<BulkOperationsWindow> {
}

class BulkUpdateLocaleWindow extends BulkOperationsWindow {
  declare Config: BulkUpdateLocaleWindowConfig;

  static readonly LOCALE: string = "locale";

  constructor(config: Config<BulkUpdateLocaleWindow> = null) {
    super((() => ConfigUtils.apply(Config(BulkUpdateLocaleWindow, {
      title: BulkOperations_properties.bulk_edit_dialog_updateLocale_title,
      items: [
        Config(DisplayField, {
          itemId: "infoBox",
          value: BulkOperations_properties.bulk_edit_dialog_updateLocale_info,
        }),
        Config(AvailableLocalesComboBox, {
          itemId: "localeCombo",
          labelAlign: "top",
          fieldLabel: BulkOperations_properties.bulk_edit_dialog_updateLocale_locale_fieldLabel,
          bindTo: ValueExpressionFactory.createFromValue(this.getModel()),
          propertyName: BulkUpdateLocaleWindow.LOCALE,
          addEmptyItem: false,
          anchor: "100%",
        }),

        Config(ItemsList, {
          bindTo: ValueExpressionFactory.create(BulkUpdateLocaleWindow.ITEMS, this.getModel()),
          selectedVE: ValueExpressionFactory.create(BulkUpdateLocaleWindow.SELECTION, this.getModel()),
          additionalFields: [
            Config(DataField, {
              name: "locale",
              mapping: "",
              convert: this.#formatLocaleName,
            }),
          ],
          columns: [
            Config(LinkListThumbnailColumn),
            Config(TypeIconColumn),
            Config(NameColumn, { flex: 2 }),
            Config(Column, {
              header: "Locale",
              stateId: "locale",
              dataIndex: "locale",
              flex: 1,
            }),
            Config(StatusColumn),
          ],
        }),

      ],
    }), config))());
  }

  override handleOk(): void {
    const action = new BulkUpdateLocaleAction(Config(BulkUpdateLocaleAction, {
      selection: this.getModel().get(BulkOperationsWindow.ITEMS),
      locale: this.getModel().get(BulkUpdateLocaleWindow.LOCALE),
      callback: bind(this, this.updateCallback),
    }));
    action.execute();
  }

  override getModel(): Bean {
    if (!this.model) {
      super.getModel();

      const preferredSite = editorContext._.getSitesService().getPreferredSite();
      if (preferredSite) {
        this.model.set(BulkUpdateLocaleWindow.LOCALE, preferredSite.getLocale().getLanguageTag());
      } else {
        this.model.set(BulkUpdateLocaleWindow.LOCALE, null);
      }

    }
    return this.model;
  }

  #formatLocaleName(content: Content): string {
    const contentLanguageTag = content.getProperties().get("locale");
    if (!contentLanguageTag) {
      return "";
    }

    const localesService = as(editorContext._, EditorContextImpl).getLocalesService();
    const contentLocale: Locale = localesService.getLocale(contentLanguageTag);
    return contentLocale.getDisplayName();
  }

}

export default BulkUpdateLocaleWindow;
