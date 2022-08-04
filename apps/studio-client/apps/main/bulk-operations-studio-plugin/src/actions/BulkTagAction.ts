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

interface BulkTagActionConfig extends Config<Action>, Partial<Pick<BulkTagAction,
  "taxonomyItems" |
  "selection" |
  "callback" |
  "taxonomyCheckBoxValue" |
  "taxonomyPropertyName"
>> {
}

/**
 * Creates a new collection document with set of images.
 */

class BulkTagAction extends Action {
  declare Config: BulkTagActionConfig;

  taxonomyItems: Array<any> = null;

  selection: Array<any> = null;

  callback: AnyFunction = null;

  taxonomyCheckBoxValue: boolean = false;

  taxonomyPropertyName: string = null;

  constructor(config?: Config<BulkTagAction>) {
    super((()=>{
      config.handler = bind(this, this.#doBulkTag);
      return config;
    })());

    this.callback = undefined;

    this.taxonomyItems = config.taxonomyItems;
    this.taxonomyCheckBoxValue = config.taxonomyCheckBoxValue;
    this.taxonomyPropertyName = config.taxonomyPropertyName;
    this.selection = config.selection;
    this.callback = config.callback;
  }

  #doBulkTag(): void {
    const remoteServiceMethod = new RemoteServiceMethod("bulkoperations/tag", "POST", true);
    const params: any = BulkTagAction.#makeRequestParameters(this.selection, this.taxonomyItems, this.taxonomyCheckBoxValue, this.taxonomyPropertyName);
    remoteServiceMethod.request(params, bind(this, this.#success), ProcessorFactory.onError);
  }

  #success(response: RemoteServiceMethodResponse): void {
    const contents = as(response.getResponseJSON().modifiedContents, Array);
    contents.forEach((content: Content) =>
      content.invalidate(),
    );
    const responseCode = as(response.getResponseJSON().errorCode, String);
    if (!responseCode) {
      this.callback.call(null);
    } else {

      MessageBoxWindow.getInstance().alert(BulkOperations_properties.bulk_tag_dialog_failure_title, BulkOperations_properties.bulk_tag_dialog_failure_text);
    }
  }

  static #makeRequestParameters(selection: Array<any>, taxonomyItems: Array<any>, taxonomyCheckBoxValue: boolean, taxonomyPropertyName: string): any {
    return {
      selection: selection,
      taxonomyItems: taxonomyItems,
      taxonomyCheckBoxValue: taxonomyCheckBoxValue,
      taxonomyPropertyName: taxonomyPropertyName,
    };
  }
}

export default BulkTagAction;
