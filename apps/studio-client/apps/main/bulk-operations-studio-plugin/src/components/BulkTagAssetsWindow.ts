import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkTaggingWindow from "./BulkTaggingWindow";

interface BulkTagAssetsWindowConfig extends Config<BulkTaggingWindow> {
}

class BulkTagAssetsWindow extends BulkTaggingWindow {
  declare Config: BulkTagAssetsWindowConfig;

  constructor(config: Config<BulkTagAssetsWindow> = null) {
    super(ConfigUtils.apply(Config(BulkTagAssetsWindow, {
      title: BulkOperations_properties.bulk_tag_dialog_assetTaxonomy_title,
      checkboxText: BulkOperations_properties.bulk_tag_dialog_assetTaxonomy_override,
      taxonomyPropertyName: "assetTaxonomy",
      taxonomyId: "Asset Download Portal",

    }), config));
  }
}

export default BulkTagAssetsWindow;
