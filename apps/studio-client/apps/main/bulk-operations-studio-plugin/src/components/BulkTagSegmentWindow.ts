import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkTaggingWindow from "./BulkTaggingWindow";

interface BulkTagSegmentWindowConfig extends Config<BulkTaggingWindow> {
}

class BulkTagSegmentWindow extends BulkTaggingWindow {
  declare Config: BulkTagSegmentWindowConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.studio.bulktag.config.BulkTagSegmentWindow";

  constructor(config: Config<BulkTagSegmentWindow> = null) {
    super(ConfigUtils.apply(Config(BulkTagSegmentWindow, {
      title: BulkOperations_properties.bulk_tag_dialog_segmentTaxonomy_title,
      checkboxText: BulkOperations_properties.bulk_tag_dialog_segmentTaxonomy_title,
      taxonomyPropertyName: "segmentTaxonomy",
      taxonomyId: "Segment",

    }), config));
  }
}

export default BulkTagSegmentWindow;
