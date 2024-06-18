import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkTaggingWindow from "./BulkTaggingWindow";

interface BulkTagSubjectWindowConfig extends Config<BulkTaggingWindow> {}

class BulkTagSubjectWindow extends BulkTaggingWindow {
  declare Config: BulkTagSubjectWindowConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.studio.bulktag.config.bulkTagSubjectWindow";

  constructor(config: Config<BulkTagSubjectWindow> = null) {
    super(
      ConfigUtils.apply(
        Config(BulkTagSubjectWindow, {
          title: BulkOperations_properties.bulk_tag_dialog_subjectTaxonomy_title,
          checkboxText: BulkOperations_properties.bulk_tag_dialog_subjectTaxonomy_override,
          taxonomyPropertyName: "subjectTaxonomy",
          taxonomyId: "Subject",
        }),
        config,
      ),
    );
  }
}

export default BulkTagSubjectWindow;
