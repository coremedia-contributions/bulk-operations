package com.coremedia.blueprint.bulkoperations.studio.bulk;

import com.coremedia.cap.content.Content;

import java.util.ArrayList;
import java.util.List;

public class BulkOperationsResponse {
  private String errorCode;
  private final List<Content> modifiedContents = new ArrayList<Content>();

  public String getErrorCode() {
    return errorCode;
  }

  public void setErrorCode(String errorCode) {
    this.errorCode = errorCode;
  }

  public List<Content> getModifiedContents() {
    return modifiedContents;
  }
}
