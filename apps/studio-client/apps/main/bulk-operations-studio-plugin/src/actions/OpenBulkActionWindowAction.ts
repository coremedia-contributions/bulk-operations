import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ContentAction from "@coremedia/studio-client.ext.cap-base-components/actions/ContentAction";
import ComponentManager from "@jangaroo/ext-ts/ComponentManager";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";

interface OpenBulkActionWindowActionConfig extends Config<ContentAction>, Partial<Pick<OpenBulkActionWindowAction,
  "contentType" |
  "multiSelect" |
  "windowConfig"
>> {
}

class OpenBulkActionWindowAction extends ContentAction {
  declare Config: OpenBulkActionWindowActionConfig;

  contentType: string = null;

  multiSelect: boolean = false;

  windowConfig: any = null;

  constructor(config: Config<OpenBulkActionWindowAction> = null) {
    super((()=>{
      this.multiSelect = config.multiSelect;
      this.contentType = config.contentType;
      this.windowConfig = config.windowConfig;
      return Config(ContentAction, Object.assign({}, { handler: bind(this, this.#showWindow) }, config));
    })());
  }

  /**
   * Displays the window.
   */
  #showWindow(): void {
    ComponentManager.create(Object.assign({}, { selectedItems: this.getContents() }, this.windowConfig)).show();
  }

  protected override calculateHidden(): boolean {
    /*
    * Make sure the content is not a repository tree folder
     */
    if (!this.getContents() || this.getContents().length == 0) {
      return true;
    }
    return super.calculateHidden();
  }

  protected override isDisabledFor(contents: Array<any>): boolean {
    return contents.some((content: Content): boolean =>
      !content.getState().readable || !content.isDocument() || (!content.getType().isSubtypeOf(this.contentType) && !content.getType().isSubtypeOf("AMAsset")) || content.isCheckedOutByOther(),
    );
  }

  protected override isHiddenFor(contents: Array<any>): boolean {
    if (!this.multiSelect && contents.length > 1) {
      return true;
    }
    return contents.some((content: Content): boolean =>
      !content.getState().readable || !content.isDocument() || !content.getType() || (!content.getType().isSubtypeOf(this.contentType) && !content.getType().isSubtypeOf("AMAsset")),
    );
  }
}

export default OpenBulkActionWindowAction;
