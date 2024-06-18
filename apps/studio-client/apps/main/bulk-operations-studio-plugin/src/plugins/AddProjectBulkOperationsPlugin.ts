import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import NestedRulesPlugin from "@coremedia/studio-client.ext.ui-components/plugins/NestedRulesPlugin";
import ProjectContentToolbar from "@coremedia/studio-client.main.control-room-editor-components/project/components/ProjectContentToolbar";
import { cast } from "@jangaroo/runtime";
import ProjectContentControlsToolbar from "@coremedia/studio-client.main.control-room-editor-components/project/components/ProjectContentControlsToolbar";
import AddItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/AddItemsPlugin";
import Component from "@jangaroo/ext-ts/Component";
import Separator from "@jangaroo/ext-ts/toolbar/Separator";
import BulkOperationsMenuButton from "../components/BulkOperationsMenuButton";

interface AddProjectBulkOperationsPluginConfig extends Config<NestedRulesPlugin> {}

class AddProjectBulkOperationsPlugin extends NestedRulesPlugin {
  declare Config: AddProjectBulkOperationsPluginConfig;

  constructor(config: Config<AddProjectBulkOperationsPlugin> = null) {
    const toolbarConfig = cast(ProjectContentToolbar, config.cmp.initialConfig);
    super(
      ConfigUtils.apply(
        Config(AddProjectBulkOperationsPlugin, {
          rules: [
            Config(ProjectContentControlsToolbar, {
              plugins: [
                Config(AddItemsPlugin, {
                  items: [
                    Config(Separator),
                    Config(BulkOperationsMenuButton, { contentValueExpression: toolbarConfig.selectedItemsVE }),
                  ],
                  after: [Config(Component, { itemId: ProjectContentControlsToolbar.WITHDRAW_CONTENT_ITEM_ID })],
                }),
              ],
            }),
          ],
        }),
        config,
      ),
    );
  }
}

export default AddProjectBulkOperationsPlugin;
