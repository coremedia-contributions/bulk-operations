import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ContentAction from "@coremedia/studio-client.ext.cap-base-components/actions/ContentAction";
import Config from "@jangaroo/runtime/Config";

interface IconButtonVisibilityActionConfig extends Config<ContentAction> {
}

class IconButtonVisibilityAction extends ContentAction {
  declare Config: IconButtonVisibilityActionConfig;

  constructor(config: Config<IconButtonVisibilityAction> = null) {
    super(config);
  }

  protected override isHiddenFor(contents: Array<any>): boolean {
    return contents == null || contents.some((content: Content): boolean =>
      !content.getState().readable
                    || !content.isDocument()
                    || !content.getType()
                    || (
                      !content.getType().isSubtypeOf("CMTeasable")
                            && !content.getType().isSubtypeOf("AMAsset")
                            && !content.getType().isSubtypeOf("CMLocalized")
                    ),
    );
  }
}

export default IconButtonVisibilityAction;
