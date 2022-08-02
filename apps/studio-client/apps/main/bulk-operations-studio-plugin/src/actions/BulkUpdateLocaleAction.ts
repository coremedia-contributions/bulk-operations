import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import RemoteServiceMethod from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethod";
import RemoteServiceMethodResponse
  from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethodResponse";
import ProcessorFactory
  from "@coremedia/studio-client.main.editor-components/sdk/quickcreate/processing/ProcessorFactory";
import Action from "@jangaroo/ext-ts/Action";
import MessageBoxWindow from "@jangaroo/ext-ts/window/MessageBox";
import { as, bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import { AnyFunction } from "@jangaroo/runtime/types";

interface BulkUpdateLocaleActionConfig extends Config<Action>, Partial<Pick<BulkUpdateLocaleAction,
        "selection" |
        "locale" |
        "callback"
>> {}

class BulkUpdateLocaleAction extends Action {

  declare Config: BulkUpdateLocaleActionConfig;

  selection: Array<Content> = null;

  locale: string = null;

  callback: AnyFunction = null;

  constructor(config: Config<BulkUpdateLocaleAction> = null) {
    super((() => {
      config.handler = bind(this, this.#doBulkUpdateLocale);
      return config;
    })());

    this.selection = config.selection;
    this.locale = config.locale;
    this.callback = config.callback;
  }

  #doBulkUpdateLocale(): void {
    const remoteServiceMethod = new RemoteServiceMethod("bulkoperations/updatelocale", "POST", true);
    const params: any = BulkUpdateLocaleAction.#makeRequestParameters(this.selection, this.locale);
    remoteServiceMethod.request(params, bind(this, this.#success), ProcessorFactory.onError);
  }

  #success(response: RemoteServiceMethodResponse): void {
    const error = as(response.getResponseJSON()["errorCode"], String);
    if (error) {
      MessageBoxWindow.getInstance().alert("Update failed", "Ups. Something went wrong.");
    } else {
      const modifiedContents = as(response.getResponseJSON()["modifiedContents"], Array);
      modifiedContents.forEach((content: Content) => content.invalidate());
      this.callback.call(modifiedContents);
    }
  }

  static #makeRequestParameters(selection: Array<any>, languageTag: string): any {
    return {
      selection: selection,
      languageTag: languageTag,
    };
  }

}

export default BulkUpdateLocaleAction;
