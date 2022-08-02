import TaxonomyLinkListPropertyField from "@coremedia-blueprint/studio-client.main.taxonomy-studio/taxonomy/selection/TaxonomyLinkListPropertyField";
import session from "@coremedia/studio-client.cap-rest-client/common/session";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import ConfigBasedValueExpression from "@coremedia/studio-client.ext.ui-components/data/ConfigBasedValueExpression";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import Checkbox from "@jangaroo/ext-ts/form/field/Checkbox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import BulkTagAction from "../actions/BulkTagAction";
import BulkOperationsWindow from "./BulkOperationsWindow";
import ItemsList from "./ItemsList";

interface BulkTaggingWindowConfig extends Config<BulkOperationsWindow>, Partial<Pick<BulkTaggingWindow,
  "checkboxText" |
  "taxonomyPropertyName" |
  "taxonomyId"
>> {
}

class BulkTaggingWindow extends BulkOperationsWindow {
  declare Config: BulkTaggingWindowConfig;

  static readonly OVERRIDE_CHECKER: string = "overrideChecker";

  constructor(config: Config<BulkTaggingWindow> = null) {
    super((()=> ConfigUtils.apply(Config(BulkTaggingWindow, {
      items: [
        Config(TaxonomyLinkListPropertyField, {
          propertyName: config.taxonomyPropertyName,
          taxonomyIdExpression: ValueExpressionFactory.createFromValue(config.taxonomyId),
          bindTo: ValueExpressionFactory.create("", this.getModel(config.taxonomyPropertyName)),
          ...{ emptyTextOverride: BulkOperations_properties.bulk_tag_dialog_taxonomy_emptyText },
          forceReadOnlyValueExpression: config.forceReadOnlyValueExpression,
          ...{ linksValueExpression: this.getTaxonomiesValueExpression(config.taxonomyPropertyName) },
          anchor: "100%",
        }),
        Config(Checkbox, {
          hideLabel: true,
          boxLabel: config.checkboxText,
          anchor: "100%",
          plugins: [
            Config(BindPropertyPlugin, {
              bidirectional: true,
              bindTo: new ConfigBasedValueExpression({
                context: this.getModel(),
                expression: BulkTaggingWindow.OVERRIDE_CHECKER,
              }),
            }),
          ],
        }),

        Config(ItemsList, {
          bindTo: ValueExpressionFactory.create(BulkTaggingWindow.ITEMS, this.getModel()),
          selectedVE: ValueExpressionFactory.create(BulkTaggingWindow.SELECTION, this.getModel()),
        }),
      ],

    }), config))());
  }

  override getModel(taxonomyPropertyName?: string): Bean {
    if (!this.model) {
      const propsBean = beanFactory._.createLocalBean();
      propsBean.set(taxonomyPropertyName, []);

      const bean = beanFactory._.createLocalBean({
        properties: propsBean,
        type: session._.getConnection().getContentRepository().getContentType("CMTeasable"),
      });
      bean["getPath"] = ((): string =>
        undefined
      );
      bean["getUriPath"] = ((): string =>
        undefined
      );
      bean["isRoot"] = ((): boolean =>
        true
      );
      bean["getParent"] = ((): Content =>
        undefined
      );

      this.model = bean;

      this.model.set(BulkOperationsWindow.ITEMS, []);
      this.model.set(BulkOperationsWindow.SELECTION, []);

      // Set initial checkbox state
      bean.set(BulkTaggingWindow.OVERRIDE_CHECKER, false);
    }
    return this.model;
  }

  override handleOk(): void {
    const action = new BulkTagAction(Config(BulkTagAction, {
      selection: this.getModel().get(BulkTaggingWindow.ITEMS),
      callback: bind(this, this.#updateCallback),
      taxonomyPropertyName: this.taxonomyPropertyName,
      taxonomyItems: this.taxonomyListExp.getValue(),
      taxonomyCheckBoxValue: this.getModel().get(BulkTaggingWindow.OVERRIDE_CHECKER),
    }));
    action.execute();
  }

  getTaxonomiesValueExpression(taxonomyPropertyName: string): ValueExpression {
    if (!this.taxonomyListExp) {
      this.taxonomyListExp = ValueExpressionFactory.create("properties", this.getModel(taxonomyPropertyName)).extendBy(taxonomyPropertyName);
    }
    return this.taxonomyListExp;
  }

  #updateCallback(): void {
    this.close();
  }

  checkboxText: string = null;

  taxonomyPropertyName: string = null;

  taxonomyId: string = null;

  taxonomyListExp: ValueExpression = null;

}

export default BulkTaggingWindow;
