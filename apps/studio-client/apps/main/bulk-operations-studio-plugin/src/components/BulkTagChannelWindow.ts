import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkTaggingWindow from "./BulkTaggingWindow";

interface BulkTagChannelWindowConfig extends Config<BulkTaggingWindow> {
}

class BulkTagChannelWindow extends BulkTaggingWindow {
  declare Config: BulkTagChannelWindowConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.studio.bulktag.config.BulkTagChannelWindow";

  constructor(config: Config<BulkTagChannelWindow> = null) {
    super(ConfigUtils.apply(Config(BulkTagChannelWindow, {
      title: BulkOperations_properties.bulk_tag_dialog_channelTaxonomy_title,
      checkboxText: BulkOperations_properties.bulk_tag_dialog_channelTaxonomy_title,
      taxonomyPropertyName: "channelTaxonomy",
      taxonomyId: "Channel",

    }), config));
  }
}

export default BulkTagChannelWindow;
