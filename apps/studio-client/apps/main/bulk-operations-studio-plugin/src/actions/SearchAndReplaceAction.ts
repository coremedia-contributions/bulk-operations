import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import RemoteServiceMethod from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethod";
import RemoteServiceMethodResponse from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethodResponse";
import ProcessorFactory from "@coremedia/studio-client.main.editor-components/sdk/quickcreate/processing/ProcessorFactory";
import Action from "@jangaroo/ext-ts/Action";
import MessageBoxWindow from "@jangaroo/ext-ts/window/MessageBox";
import { as, bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import { AnyFunction } from "@jangaroo/runtime/types";
import BulkOperations_properties from "../BulkOperations_properties";

interface SearchAndReplaceActionConfig extends Config<Action>, Partial<Pick<SearchAndReplaceAction,
  "selection" |
  "callback" |
  "properties" |
  "teaserTitle" |
  "teaserText" |
  "title" |
  "detailText" |
  "searchFor" |
  "replaceWith"
>> {
}

class SearchAndReplaceAction extends Action {
  declare Config: SearchAndReplaceActionConfig;

  selection: Array<any> = null;

  callback: AnyFunction = null;

  properties: any = null;

  teaserTitle: boolean = false;

  teaserText: boolean = false;

  title: boolean = false;

  detailText: boolean = false;

  searchFor: string = null;

  replaceWith: string = null;

  constructor(config?: Config<SearchAndReplaceAction>) {
    super((()=>{
      config.handler = bind(this, this.#doSearchAndReplace);
      return config;
    })());
    this.selection = config.selection;
    this.callback = config.callback;

    this.searchFor = config.searchFor;
    this.replaceWith = config.replaceWith;
    this.properties = config.properties;
  }

  #doSearchAndReplace(): void {
    const remoteServiceMethod = new RemoteServiceMethod("bulkoperations/searchandreplace", "POST", true);
    const params: any = SearchAndReplaceAction.#makeRequestParameters(this.selection, this.searchFor, this.replaceWith, this.properties);
    remoteServiceMethod.request(params, bind(this, this.#success), ProcessorFactory.onError);
  }

  #success(response: RemoteServiceMethodResponse): void {
    const contents = as(response.getResponseJSON().modifiedContents, Array);
    contents.forEach((content: Content): void => {
      content.invalidate();
      return;
    },
    );
    const responseCode = as(response.getResponseJSON().errorCode, String);
    if (!responseCode) {
      this.callback.call(null);
    } else {

      MessageBoxWindow.getInstance().alert(BulkOperations_properties.bulk_tag_dialog_failure_title, BulkOperations_properties.bulk_tag_dialog_failure_text);
    }
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
