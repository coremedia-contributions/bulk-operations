
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";

import CollectionView from "@coremedia/studio-client.main.editor-components/sdk/collectionview/CollectionView";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkActionViewPlugin from "./BulkActionViewPlugin";

interface BulkOperationsStudioPluginConfig extends Config<StudioPlugin> {
}

class BulkOperationsStudioPlugin extends StudioPlugin {
  declare Config: BulkOperationsStudioPluginConfig;

  constructor(config: Config<BulkOperationsStudioPlugin> = null) {
    super((() => {
      return ConfigUtils.apply(Config(BulkOperationsStudioPlugin, {

        rules: [
          Config(CollectionView, {
            plugins: [
              Config(BulkActionViewPlugin),
            ],
          }),
        ],
      }), config);
    })());
  }
}

export default BulkOperationsStudioPlugin;
