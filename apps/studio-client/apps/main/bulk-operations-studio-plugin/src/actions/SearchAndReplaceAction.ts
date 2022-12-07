import Config from "@jangaroo/runtime/Config";
import BulkOperationAction from "./BulkOperationAction";

interface SearchAndReplaceActionConfig extends Config<BulkOperationAction>, Partial<Pick<SearchAndReplaceAction,
        "properties" |
        "teaserTitle" |
        "teaserText" |
        "title" |
        "detailText" |
        "searchFor" |
        "replaceWith">> {
}

/**
 * Bulk operation to search and replace text on the selected items.
 */
class SearchAndReplaceAction extends BulkOperationAction {

  declare Config: SearchAndReplaceActionConfig;

  properties: any = null;
  teaserTitle: boolean = false;
  teaserText: boolean = false;
  title: boolean = false;
  detailText: boolean = false;
  searchFor: string = null;
  replaceWith: string = null;

  constructor(config?: Config<SearchAndReplaceAction>) {
    super(config);

    this.searchFor = config.searchFor;
    this.replaceWith = config.replaceWith;
    this.properties = config.properties;
  }

  protected override execBulkOperation(): void {
    const params: any = SearchAndReplaceAction.#makeRequestParameters(this.selection, this.searchFor, this.replaceWith, this.properties);
    this.execRemoteAction("searchandreplace", params);
  }

  static #makeRequestParameters(selection: Array<any>, searchFor: string, replaceWith: string, properties: any): any {
    return {
      selection: selection,
      searchFor: searchFor,
      replaceWith: replaceWith,
      properties: properties,
    };
  }

}

export default SearchAndReplaceAction;
