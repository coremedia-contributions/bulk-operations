import BlueprintDocumentTypes_properties from "@coremedia-blueprint/studio-client.main.blueprint-forms/BlueprintDocumentTypes_properties";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import EventUtil from "@coremedia/studio-client.client-core/util/EventUtil";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import SpacingBEMEntities from "@coremedia/studio-client.ext.ui-components/bem/SpacingBEMEntities";
import ConfigBasedValueExpression from "@coremedia/studio-client.ext.ui-components/data/ConfigBasedValueExpression";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import HorizontalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/HorizontalSpacingPlugin";
import CollectionViewModel from "@coremedia/studio-client.main.editor-components/sdk/collectionview/CollectionViewModel";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import Container from "@jangaroo/ext-ts/container/Container";
import CheckboxGroup from "@jangaroo/ext-ts/form/CheckboxGroup";
import FieldSet from "@jangaroo/ext-ts/form/FieldSet";
import Checkbox from "@jangaroo/ext-ts/form/field/Checkbox";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import TextField from "@jangaroo/ext-ts/form/field/Text";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import BulkOperations_properties from "../BulkOperations_properties";
import SearchAndReplaceAction from "../actions/SearchAndReplaceAction";
import BulkOperationsWindow from "./BulkOperationsWindow";
import ItemsList from "./ItemsList";

interface SearchAndReplaceWindowConfig extends Config<BulkOperationsWindow> {}

class SearchAndReplaceWindow extends BulkOperationsWindow {
  declare Config: SearchAndReplaceWindowConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.studio.bulktag.config.searchAndReplaceWindow";

  protected static readonly TEASER_TITLE: string = "teaserTitle";

  protected static readonly TEASER_TEXT: string = "teaserText";

  protected static readonly TITLE: string = "title";

  protected static readonly DETAIL_TEXT: string = "detailText";

  protected static readonly DATA: string = "data";

  protected static readonly SEARCH_FOR: string = "searchFor";

  protected static readonly REPLACE_WITH: string = "replaceWith";

  constructor(config: Config<SearchAndReplaceWindow> = null) {
    super(
      (() =>
        ConfigUtils.apply(
          Config(SearchAndReplaceWindow, {
            title: BulkOperations_properties.bulk_tag_dialog_searchAndReplace_title,
            iconCls: CoreIcons_properties.research,
            cls: "searchAndReplaceWindow",

            items: [
              Config(Container, {
                layout: Config(HBoxLayout),
                items: [
                  Config(DisplayField, { value: BulkOperations_properties.bulk_tag_dialog_searchAndReplace_searchFor }),
                  Config(TextField, {
                    hideLabel: true,
                    itemId: "searchFor",
                    emptyText: BulkOperations_properties.bulk_tag_dialog_searchAndReplace_searchForEmptyText,
                    flex: 1,
                    plugins: [
                      Config(BindPropertyPlugin, {
                        bidirectional: true,
                        bindTo: new ConfigBasedValueExpression({
                          context: this.getModel(),
                          expression: SearchAndReplaceWindow.SEARCH_FOR,
                        }),
                      }),
                    ],
                  }),
                  Config(DisplayField, {
                    value: BulkOperations_properties.bulk_tag_dialog_searchAndReplace_replaceWith,
                  }),
                  Config(TextField, {
                    hideLabel: true,
                    itemId: "replaceWith",
                    emptyText: BulkOperations_properties.bulk_tag_dialog_searchAndReplace_replaceWithEmptyText,
                    flex: 1,
                    plugins: [
                      Config(BindPropertyPlugin, {
                        bidirectional: true,
                        bindTo: new ConfigBasedValueExpression({
                          context: this.getModel(),
                          expression: SearchAndReplaceWindow.REPLACE_WITH,
                        }),
                      }),
                    ],
                  }),
                ],
                plugins: [
                  Config(HorizontalSpacingPlugin, { modifier: SpacingBEMEntities.HORIZONTAL_SPACING_MODIFIER_200 }),
                ],
              }),
              Config(FieldSet, {
                title: BulkOperations_properties.bulk_tag_dialog_searchAndReplace_property_text,
                collapsible: true,
                collapsed: true,
                items: [
                  Config(CheckboxGroup, {
                    columns: 3,
                    vertical: true,
                    items: [
                      Config(Checkbox, {
                        hideLabel: true,
                        boxLabel: BlueprintDocumentTypes_properties.CMTeasable_teaserTitle_text,
                        plugins: [
                          Config(BindPropertyPlugin, {
                            bidirectional: true,
                            bindTo: new ConfigBasedValueExpression({
                              context: this.getModel(),
                              expression: SearchAndReplaceWindow.TEASER_TITLE,
                            }),
                          }),
                        ],
                      }),
                      Config(Checkbox, {
                        hideLabel: true,
                        boxLabel: BlueprintDocumentTypes_properties.CMTeasable_teaserText_text,
                        plugins: [
                          Config(BindPropertyPlugin, {
                            bidirectional: true,
                            bindTo: new ConfigBasedValueExpression({
                              context: this.getModel(),
                              expression: SearchAndReplaceWindow.TEASER_TEXT,
                            }),
                          }),
                        ],
                      }),
                      Config(Checkbox, {
                        hideLabel: true,
                        boxLabel: BlueprintDocumentTypes_properties.CMLinkable_title_text,
                        plugins: [
                          Config(BindPropertyPlugin, {
                            bidirectional: true,
                            bindTo: new ConfigBasedValueExpression({
                              context: this.getModel(),
                              expression: SearchAndReplaceWindow.TITLE,
                            }),
                          }),
                        ],
                      }),
                      Config(Checkbox, {
                        hideLabel: true,
                        boxLabel: BlueprintDocumentTypes_properties.CMTeasable_detailText_text,
                        plugins: [
                          Config(BindPropertyPlugin, {
                            bidirectional: true,
                            bindTo: new ConfigBasedValueExpression({
                              context: this.getModel(),
                              expression: SearchAndReplaceWindow.DETAIL_TEXT,
                            }),
                          }),
                        ],
                      }),
                      Config(Checkbox, {
                        hideLabel: true,
                        boxLabel: BlueprintDocumentTypes_properties.CMHTML_data_text,
                        plugins: [
                          Config(BindPropertyPlugin, {
                            bidirectional: true,
                            bindTo: new ConfigBasedValueExpression({
                              context: this.getModel(),
                              expression: SearchAndReplaceWindow.DATA,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              Config(ItemsList, {
                bindTo: ValueExpressionFactory.create(BulkOperationsWindow.ITEMS, this.getModel()),
                selectedVE: ValueExpressionFactory.create(BulkOperationsWindow.SELECTION, this.getModel()),
              }),
            ],
          }),
          config,
        ))(),
    );
  }

  protected override afterRender(): void {
    super.afterRender();

    // Fill model with current search term from library
    const searchTextVE = ValueExpressionFactory.create(
      CollectionViewModel.SEARCH_TEXT_PROPERTY,
      editorContext._.getCollectionViewModel().getMainStateBean(),
    );
    searchTextVE.loadValue((searchTerm: any): void => {
      if (searchTerm && searchTerm !== "") {
        this.getModel().set(SearchAndReplaceWindow.SEARCH_FOR, searchTerm);
      }
    });

    // Refreshing the layout to fix spacer issues on hbox layouts
    EventUtil.invokeLater(bind(this, this.updateLayout));
  }

  override handleOk(): void {
    const action = new SearchAndReplaceAction(
      Config(SearchAndReplaceAction, {
        selection: this.getModel().get(BulkOperationsWindow.ITEMS),
        callback: bind(this, this.updateCallback),
        searchFor: this.getModel().get(SearchAndReplaceWindow.SEARCH_FOR),
        replaceWith: this.getModel().get(SearchAndReplaceWindow.REPLACE_WITH),
        properties: {
          teaserTitle: this.getModel().get(SearchAndReplaceWindow.TEASER_TITLE),
          teaserText: this.getModel().get(SearchAndReplaceWindow.TEASER_TEXT),
          title: this.getModel().get(SearchAndReplaceWindow.TITLE),
          detailText: this.getModel().get(SearchAndReplaceWindow.DETAIL_TEXT),
          data: this.getModel().get(SearchAndReplaceWindow.DATA),
        },
      }),
    );
    action.execute();
  }

  override getModel(): Bean {
    if (!this.model) {
      this.model = beanFactory._.createLocalBean({
        searchFor: "",
        replaceWith: "",
      });
      this.model.set(BulkOperationsWindow.ITEMS, []);
      this.model.set(BulkOperationsWindow.SELECTION, []);
      this.model.set(SearchAndReplaceWindow.TEASER_TITLE, true);
      this.model.set(SearchAndReplaceWindow.TEASER_TEXT, true);
      this.model.set(SearchAndReplaceWindow.TITLE, true);
      this.model.set(SearchAndReplaceWindow.DETAIL_TEXT, true);
      this.model.set(SearchAndReplaceWindow.DATA, true);
    }
    return this.model;
  }
}

export default SearchAndReplaceWindow;
