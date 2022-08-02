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

interface AddProductOrCategoryReferenceActionConfig extends Config<Action>, Partial<Pick<AddProductOrCategoryReferenceAction,
  "selection" |
  "callback" |
  "references" |
  "overrideValue"
>> {
}

class AddProductOrCategoryReferenceAction extends Action {
  declare Config: AddProductOrCategoryReferenceActionConfig;

  selection: Array<any> = null;

  callback: AnyFunction = null;

  references: Array<any> = null;

  overrideValue: boolean = false;

  constructor(config?: Config<AddProductOrCategoryReferenceAction>) {
    super((()=>{
      config.handler = bind(this, this.#doSearchAndReplace);
      return config;
    })());
    this.selection = config.selection;
    this.callback = config.callback;

    this.references = config.references;
    this.overrideValue = config.overrideValue;
  }

  #doSearchAndReplace(): void {
    const remoteServiceMethod = new RemoteServiceMethod("bulkoperations/addorupdatereferences", "POST", true);
    const params: any = AddProductOrCategoryReferenceAction.#makeRequestParameters(this.selection, this.references, this.overrideValue);
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

  static #makeRequestParameters(selection: Array<any>, references: Array<any>, overrideValue: boolean): any {
    return {
      selection: selection,
      references: references,
      overrideValue: overrideValue,
    };
  }
}

export default AddProductOrCategoryReferenceAction;
