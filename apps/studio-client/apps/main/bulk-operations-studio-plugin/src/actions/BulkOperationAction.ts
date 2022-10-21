import {AnyFunction} from "@jangaroo/runtime/types";
import RemoteServiceMethodResponse
  from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethodResponse";
import {as, bind} from "@jangaroo/runtime";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import MessageBoxWindow from "@jangaroo/ext-ts/window/MessageBox";
import BulkOperations_properties from "../BulkOperations_properties";
import ProcessorFactory
  from "@coremedia/studio-client.main.editor-components/sdk/quickcreate/processing/ProcessorFactory";
import RemoteServiceMethod from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethod";
import Config from "@jangaroo/runtime/Config";
import Action from "@jangaroo/ext-ts/Action";

interface BulkOperationActionConfig extends Config<Action>, Partial<Pick<BulkOperationAction,
        "selection" |
        "callback">> {
}

abstract class BulkOperationAction extends Action {

  declare Config: BulkOperationActionConfig;

  selection: Array<any> = null;
  callback: AnyFunction = null;

  protected constructor(config?: Config<BulkOperationAction>) {
    super((()=>{
      config.handler = bind(this, this.execBulkOperation);
      return config;
    })());

    this.selection = config.selection;
    this.callback = config.callback;
  }

  protected abstract execBulkOperation(): void;

  protected execRemoteAction(bulkAction: string, params: any): void {
    const remoteServiceMethod = new RemoteServiceMethod(`bulkoperations/${bulkAction}`, "POST", true);
    remoteServiceMethod.request(params, bind(this, this.success), bind(this, this.failure));
  }

  protected success(response: RemoteServiceMethodResponse): void {
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

  protected failure(response: RemoteServiceMethodResponse): void {
    ProcessorFactory.onError(response.getError());
  }

}

export default BulkOperationAction;
