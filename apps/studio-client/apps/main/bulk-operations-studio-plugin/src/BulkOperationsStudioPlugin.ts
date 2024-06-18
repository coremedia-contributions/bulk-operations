import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import CollectionView from "@coremedia/studio-client.main.editor-components/sdk/collectionview/CollectionView";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import ProjectContentToolbar from "@coremedia/studio-client.main.control-room-editor-components/project/components/ProjectContentToolbar";
import AddProjectBulkOperationsPlugin from "./plugins/AddProjectBulkOperationsPlugin";
import BulkActionViewPlugin from "./plugins/BulkActionViewPlugin";

interface BulkOperationsStudioPluginConfig extends Config<StudioPlugin> {}

class BulkOperationsStudioPlugin extends StudioPlugin {
  declare Config: BulkOperationsStudioPluginConfig;

  constructor(config: Config<BulkOperationsStudioPlugin> = null) {
    super(
      (() => {
        return ConfigUtils.apply(
          Config(BulkOperationsStudioPlugin, {
            rules: [
              // Add bulk actions to library toolbars
              Config(CollectionView, {
                plugins: [Config(BulkActionViewPlugin)],
              }),

              // Add bulk actions to project toolbar
              Config(ProjectContentToolbar, {
                plugins: [Config(AddProjectBulkOperationsPlugin)],
              }),
            ],
          }),
          config,
        );
      })(),
    );
  }
}

export default BulkOperationsStudioPlugin;
