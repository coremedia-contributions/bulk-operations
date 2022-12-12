import SvgIconUtil from "@coremedia/studio-client.base-models/util/SvgIconUtil";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import OpenCreateImageGalleryWindowAction
  from "@coremedia/studio-client.main.bpbase-studio-components/pictures/gallery/OpenCreateImageGalleryWindowAction";
import OpenCreateSpinnerWindowAction
  from "@coremedia/studio-client.main.bpbase-studio-components/pictures/spinner/OpenCreateSpinnerWindowAction";
import Item from "@jangaroo/ext-ts/menu/Item";
import Menu from "@jangaroo/ext-ts/menu/Menu";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import IconButtonVisibilityAction from "../actions/IconButtonVisibilityAction";
import OpenBulkActionWindowAction from "../actions/OpenBulkActionWindowAction";
import icon from "../icons/bulktag.svg";
import AddProductOrCategoryReferenceWindow from "./AddProductOrCategoryReferenceWindow";
import BulkTagAssetsWindow from "./BulkTagAssetsWindow";
import BulkTagLocationWindow from "./BulkTagLocationWindow";
import BulkTagSubjectWindow from "./BulkTagSubjectWindow";
import BulkUpdateLocaleWindow from "./BulkUpdateLocaleWindow";
import BulkUpdateValidityWindow from "./BulkUpdateValidityWindow";
import SearchAndReplaceWindow from "./SearchAndReplaceWindow";

interface BulkOperationsMenuButtonConfig extends Config<IconButton>, Partial<Pick<BulkOperationsMenuButton,
        "contentValueExpression">> {
}

class BulkOperationsMenuButton extends IconButton {
  declare Config: BulkOperationsMenuButtonConfig;

  contentValueExpression: ValueExpression = null;

  constructor(config: Config<BulkOperationsMenuButton> = null) {
    super(ConfigUtils.apply(Config(BulkOperationsMenuButton, {

      itemId: "bulkActions",
      iconCls: SvgIconUtil.getIconStyleClassForSvgIcon(icon),
      ariaLabel: "Bulk Operations",

      baseAction: new IconButtonVisibilityAction({ contentValueExpression: config.contentValueExpression }),
      menu: Config(Menu, {
        items: [
          Config(Item, {
            iconCls: CoreIcons_properties.time,
            text: BulkOperations_properties.bulk_edit_dialog_updateValidity_title,
            baseAction: new OpenBulkActionWindowAction({
              contentValueExpression: config.contentValueExpression,
              multiSelect: true,
              contentType: "CMTeasable",
              windowConfig: Config(BulkUpdateValidityWindow),
            }),
          }),
          Config(Item, {
            iconCls: CoreIcons_properties.locale,
            text: BulkOperations_properties.bulk_edit_menu_updateLocale_text,
            baseAction: new OpenBulkActionWindowAction({
              contentValueExpression: config.contentValueExpression,
              multiSelect: true,
              contentType: "CMLocalized",
              windowConfig: Config(BulkUpdateLocaleWindow),
            }),
          }),
          Config(Item, {
            iconCls: CoreIcons_properties.add_tag,
            text: BulkOperations_properties.bulk_tag_dialog_subjectTaxonomy_title,
            baseAction: new OpenBulkActionWindowAction({
              contentValueExpression: config.contentValueExpression,
              multiSelect: true,
              contentType: "CMTeasable",
              windowConfig: Config(BulkTagSubjectWindow),
            }),
          }),
          Config(Item, {
            iconCls: CoreIcons_properties.add_tag,
            text: BulkOperations_properties.bulk_tag_dialog_locationTaxonomy_title,
            baseAction: new OpenBulkActionWindowAction({
              contentValueExpression: config.contentValueExpression,
              multiSelect: true,
              contentType: "CMTeasable",
              windowConfig: Config(BulkTagLocationWindow),
            }),
          }),
          Config(Item, {
            iconCls: CoreIcons_properties.research,
            text: BulkOperations_properties.bulk_tag_dialog_searchAndReplace_title,
            baseAction: new OpenBulkActionWindowAction({
              contentValueExpression: config.contentValueExpression,
              multiSelect: true,
              contentType: "CMTeasable",
              windowConfig: Config(SearchAndReplaceWindow),
            }),
          }),
          Config(Item, {
            iconCls: CoreIcons_properties.add_tag,
            text: BulkOperations_properties.bulk_tag_dialog_assetTaxonomy_title,
            baseAction: new OpenBulkActionWindowAction({
              contentValueExpression: config.contentValueExpression,
              multiSelect: true,
              contentType: "AMAsset",
              windowConfig: Config(BulkTagAssetsWindow),
            }),
          }),
          Config(Item, {
            iconCls: CoreIcons_properties.add_tag,
            text: BulkOperations_properties.bulk_tag_dialog_ecommerceReference_title,
            baseAction: new OpenBulkActionWindowAction({
              contentValueExpression: config.contentValueExpression,
              multiSelect: true,
              contentType: "CMPicture",
              windowConfig: Config(AddProductOrCategoryReferenceWindow),
            }),
          }),
          Config(Item, {
            iconCls: CoreIcons_properties.add_tag,
            text: BulkOperations_properties.bulk_tag_dialog_ecommerceReference_title,
            baseAction: new OpenBulkActionWindowAction({
              contentValueExpression: config.contentValueExpression,
              multiSelect: true,
              contentType: "CMDownload",
              windowConfig: Config(AddProductOrCategoryReferenceWindow),
            }),
          }),
          Config(Item, { baseAction: new OpenCreateImageGalleryWindowAction({ contentValueExpression: config.contentValueExpression }) }),
          Config(Item, { baseAction: new OpenCreateSpinnerWindowAction({ contentValueExpression: config.contentValueExpression }) }),
        ],
      }),

    }), config));
  }
}

export default BulkOperationsMenuButton;
