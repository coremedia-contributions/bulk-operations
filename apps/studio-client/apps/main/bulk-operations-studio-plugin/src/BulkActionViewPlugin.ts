import AddItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/AddItemsPlugin";
import NestedRulesPlugin from "@coremedia/studio-client.ext.ui-components/plugins/NestedRulesPlugin";
import RemoveItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/RemoveItemsPlugin";
import ICollectionView from "@coremedia/studio-client.main.editor-components/sdk/collectionview/ICollectionView";
import RepositoryToolbar from "@coremedia/studio-client.main.editor-components/sdk/collectionview/RepositoryToolbar";
import SearchToolbar from "@coremedia/studio-client.main.editor-components/sdk/collectionview/SearchToolbar";
import Component from "@jangaroo/ext-ts/Component";
import Item from "@jangaroo/ext-ts/menu/Item";
import { cast } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperationsMenuButton from "./components/BulkOperationsMenuButton";

interface BulkActionViewPluginConfig extends Config<NestedRulesPlugin> {
}

class BulkActionViewPlugin extends NestedRulesPlugin {
  declare Config: BulkActionViewPluginConfig;

  constructor(config: Config<BulkActionViewPlugin> = null) {
    super((()=>{
      const selectionHolder: ICollectionView = cast(ICollectionView, config.cmp);
      return ConfigUtils.apply(Config(BulkActionViewPlugin, {

        rules: [
          Config(SearchToolbar, {
            plugins: [
              Config(RemoveItemsPlugin, {
                items: [
                  Config(Item, { itemId: "createImageGallery" }),
                  Config(Item, { itemId: "createSpinner" }),
                ],
              }),
              Config(AddItemsPlugin, {
                items: [
                  Config(BulkOperationsMenuButton, { contentValueExpression: selectionHolder.getSelectedSearchItemsValueExpression() }),
                ],
                after: [
                  Config(Component, { itemId: "createImageMap" }),
                ],
              }),
            ],
          }),

          Config(RepositoryToolbar, {
            plugins: [
              Config(RemoveItemsPlugin, {
                items: [
                  Config(Item, { itemId: "createImageGallery" }),
                  Config(Item, { itemId: "createSpinner" }),
                ],
              }),
              Config(AddItemsPlugin, {
                items: [
                  Config(BulkOperationsMenuButton, { contentValueExpression: selectionHolder.getSelectedRepositoryItemsValueExpression() }),
                ],
                before: [
                  Config(Component, { itemId: "createImageMap" }),
                ],
              }),
            ],
          }),

        ],

      }), config);
    })());
  }
}

export default BulkActionViewPlugin;
