import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkTaggingWindow from "./BulkTaggingWindow";

interface BulkTagLocationWindowConfig extends Config<BulkTaggingWindow> {}

class BulkTagLocationWindow extends BulkTaggingWindow {
  declare Config: BulkTagLocationWindowConfig;

  constructor(config: Config<BulkTagLocationWindow> = null) {
    super(
      ConfigUtils.apply(
        Config(BulkTagLocationWindow, {
          title: BulkOperations_properties.bulk_tag_dialog_locationTaxonomy_title,
          checkboxText: BulkOperations_properties.bulk_tag_dialog_locationTaxonomy_override,
          taxonomyPropertyName: "locationTaxonomy",
          taxonomyId: "Location",
        }),
        config,
      ),
    );
  }
}

export default BulkTagLocationWindow;
