import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import StatefulDateTimeField from "@coremedia/studio-client.ext.base-components/fields/StatefulDateTimeField";
import NameColumn from "@coremedia/studio-client.ext.cap-base-components/columns/NameColumn";
import StatusColumn from "@coremedia/studio-client.ext.cap-base-components/columns/StatusColumn";
import TypeIconColumn from "@coremedia/studio-client.ext.cap-base-components/columns/TypeIconColumn";
import LinkListThumbnailColumn from "@coremedia/studio-client.ext.content-link-list-components/columns/LinkListThumbnailColumn";
import Editor_properties from "@coremedia/studio-client.main.editor-components/Editor_properties";
import DateUtil from "@jangaroo/ext-ts/Date";
import DataField from "@jangaroo/ext-ts/data/field/Field";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import Column from "@jangaroo/ext-ts/grid/column/Column";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkUpdateValidityAction from "../actions/BulkUpdateValidityAction";
import BulkOperationsWindow from "./BulkOperationsWindow";
import ItemsList from "./ItemsList";

interface BulkUpdateValidityWindowConfig extends Config<BulkOperationsWindow> {}

class BulkUpdateValidityWindow extends BulkOperationsWindow {
  declare Config: BulkUpdateValidityWindowConfig;

  static readonly VALID_FROM: string = "validFrom";

  static readonly VALID_TO: string = "validTo";

  static readonly DATE_FORMAT: string = "d.m.Y-H:i";

  static readonly DEFAULT_TIME_ZONE_IDS: Array<any> = [
    "Europe/Berlin",
    "Europe/London",
    "America/New_York",
    "America/Los_Angeles",
  ];

  constructor(config: Config<BulkUpdateValidityWindow> = null) {
    super(
      (() =>
        ConfigUtils.apply(
          Config(BulkUpdateValidityWindow, {
            title: BulkOperations_properties.bulk_edit_dialog_updateValidity_title,
            items: [
              Config(DisplayField, {
                itemId: "infoBox",
                value: BulkOperations_properties.bulk_edit_dialog_updateValidity_info,
              }),
              Config(StatefulDateTimeField, {
                itemId: "validFrom",
                ariaLabel: Editor_properties.Date_property_field,
                timeZoneIds: BulkUpdateValidityWindow.DEFAULT_TIME_ZONE_IDS,
                propertyName: BulkUpdateValidityWindow.VALID_FROM,
                bindTo: ValueExpressionFactory.create("properties", this.getModel()),
                timeZoneHidden: false,
                fieldLabel: BulkOperations_properties.bulk_edit_dialog_updateValidity_validFrom_label,
              }),
              Config(StatefulDateTimeField, {
                itemId: "validTo",
                ariaLabel: Editor_properties.Date_property_field,
                timeZoneIds: BulkUpdateValidityWindow.DEFAULT_TIME_ZONE_IDS,
                propertyName: BulkUpdateValidityWindow.VALID_TO,
                bindTo: ValueExpressionFactory.create("properties", this.getModel()),
                timeZoneHidden: false,
                fieldLabel: BulkOperations_properties.bulk_edit_dialog_updateValidity_validTo_label,
              }),
              Config(ItemsList, {
                bindTo: ValueExpressionFactory.create(BulkUpdateValidityWindow.ITEMS, this.getModel()),
                selectedVE: ValueExpressionFactory.create(BulkUpdateValidityWindow.SELECTION, this.getModel()),
                additionalFields: [
                  Config(DataField, {
                    name: "validFromStr",
                    mapping: "",
                    convert: this.#formatValidFrom,
                  }),
                  Config(DataField, {
                    name: "validToStr",
                    mapping: "",
                    convert: this.#formatValidTo,
                  }),
                ],
                columns: [
                  Config(LinkListThumbnailColumn),
                  Config(TypeIconColumn),
                  Config(NameColumn, { flex: 2 }),
                  Config(Column, {
                    header: BulkOperations_properties.bulk_edit_dialog_updateValidity_validFrom_label,
                    stateId: "validFromStr",
                    dataIndex: "validFromStr",
                    flex: 1,
                  }),
                  Config(Column, {
                    header: BulkOperations_properties.bulk_edit_dialog_updateValidity_validTo_label,
                    stateId: "validToStr",
                    dataIndex: "validToStr",
                    flex: 1,
                  }),
                  Config(StatusColumn),
                ],
              }),
            ],
          }),
          config,
        ))(),
    );
  }

  override handleOk(): void {
    const action = new BulkUpdateValidityAction(
      Config(BulkUpdateValidityAction, {
        selection: this.getModel().get(BulkOperationsWindow.ITEMS),
        validFrom: this.getModel().get("properties").get(BulkUpdateValidityWindow.VALID_FROM),
        validTo: this.getModel().get("properties").get(BulkUpdateValidityWindow.VALID_TO),
        callback: bind(this, this.updateCallback),
      }),
    );
    action.execute();
  }

  override getModel(): Bean {
    if (!this.model) {
      super.getModel();
      this.model.set("properties", beanFactory._.createLocalBean({}));
    }
    return this.model;
  }

  #formatValidFrom(content: Content): string {
    return BulkUpdateValidityWindow.formatValidity(content, "validFrom");
  }

  #formatValidTo(content: Content): string {
    return BulkUpdateValidityWindow.formatValidity(content, "validTo");
  }

  static formatValidity(content: Content, dateProperty: string): string {
    const value = content.getProperties().get(dateProperty);
    if (!value) {
      return "";
    }
    return DateUtil.format(value.getDate(), BulkUpdateValidityWindow.DATE_FORMAT);
  }
}

export default BulkUpdateValidityWindow;
