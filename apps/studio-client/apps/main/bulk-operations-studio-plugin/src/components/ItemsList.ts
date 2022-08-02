import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import MemoryLinkListWrapper from "@coremedia/studio-client.content-link-list-models/MemoryLinkListWrapper";
import NameColumn from "@coremedia/studio-client.ext.cap-base-components/columns/NameColumn";
import StatusColumn from "@coremedia/studio-client.ext.cap-base-components/columns/StatusColumn";
import TypeIconColumn from "@coremedia/studio-client.ext.cap-base-components/columns/TypeIconColumn";
import LinkListThumbnailColumn
  from "@coremedia/studio-client.ext.content-link-list-components/columns/LinkListThumbnailColumn";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import CollapsiblePanel from "@coremedia/studio-client.ext.ui-components/components/panel/CollapsiblePanel";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import PanelSkin from "@coremedia/studio-client.ext.ui-components/skins/PanelSkin";
import ToolbarSkin from "@coremedia/studio-client.ext.ui-components/skins/ToolbarSkin";
import Actions_properties from "@coremedia/studio-client.main.editor-components/sdk/actions/Actions_properties";
import ContentGridPanel from "@coremedia/studio-client.main.editor-components/sdk/components/ContentGridPanel";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import Column from "@jangaroo/ext-ts/grid/column/Column";
import Separator from "@jangaroo/ext-ts/toolbar/Separator";
import Toolbar from "@jangaroo/ext-ts/toolbar/Toolbar";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";

interface ItemsListConfig extends Config<ContentGridPanel>, Partial<Pick<ItemsList, "bindTo" | "selectedVE">> {
}

class ItemsList extends CollapsiblePanel {
  declare Config: ItemsListConfig;

  bindTo: ValueExpression = null;

  selectedVE: ValueExpression = null;

  constructor(config: Config<ItemsList> = null) {
    super((() => ConfigUtils.apply(Config(ItemsList,
      {
        minHeight: 300,
        title: BulkOperations_properties.bulk_edit_dialog_items_title,
        stateEvents: ["collapse", "expand"],
        ui: PanelSkin.CARD_100.getSkin(),
        plugins: [
          Config(BindPropertyPlugin, {
            bindTo: config.bindTo,
            transformer: this.#formatTitle,
            componentProperty: "title",
          }),
        ],
        items: [Config(ContentGridPanel, {
          itemId: "contentList",
          scrollable: true,
          height: 300,
          width: "100%",
          lazy: true,
          initialViewLimit: 30,
          viewLimitIncrement: 30,
          linkListWrapper: new MemoryLinkListWrapper({ linksVE: config.bindTo }),
          selectedValuesExpression: config.selectedVE,
          hideDropArea: true,
          viewEnableDrop: true,
          hideValidation: true,
          additionalFields: config.additionalFields,
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
          tbar: Config(Toolbar, {
            ui: ToolbarSkin.FIELD.getSkin(),
            items: [
              Config(IconButton, {
                handler: bind(this, this.#deleteItems),
                text: Actions_properties.Action_deleteSelectedLinks_text,
                iconCls: Actions_properties.Action_deleteSelectedLinks_icon,
                tooltip: Actions_properties.Action_deleteSelectedLinks_tooltip,
              }),
              Config(IconButton, {
                handler: bind(this, this.#openItemsInTab),
                text: Actions_properties.Action_openInTab_text,
                iconCls: Actions_properties.Action_openInTab_icon,
                tooltip: Actions_properties.Action_openInTab_tooltip,
              }),
              Config(Separator),
            ],
          }),
        })],
      },

    ), config))());
  }

  #deleteItems(): void {
    const selectedItems = this.selectedVE.getValue();
    const oldItemList = this.bindTo.getValue();
    const newItemList = [];

    if (selectedItems) {
      for (let i: number = 0; i <= oldItemList.length - 1; i++) {
        if (selectedItems.indexOf(oldItemList[i]) === -1) {
          newItemList.push(oldItemList[i]);
        }
      }
      this.bindTo.setValue(newItemList);
    }
  }

  #openItemsInTab(): void {
    const selectedItems = this.selectedVE.getValue();
    if (selectedItems) {
      editorContext._.getWorkAreaTabManager().openTabsForEntities(selectedItems, true);
    }
  }

  #formatTitle(items: Array<Content>): string {
    let title = "Content";
    if (items && items.length >= 1) {
      title += " (" + items.length + ")";
    }
    return title;
  }
}

export default ItemsList;
