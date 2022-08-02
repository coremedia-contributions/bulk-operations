package com.coremedia.blueprint.bulkoperations.studio.bulk;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.struct.Struct;
import com.coremedia.cap.struct.StructBuilder;
import com.coremedia.cap.util.CapStructUtil;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupFactory;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;


@RestController
@RequestMapping(value = "bulkoperations", produces = MediaType.APPLICATION_JSON_VALUE)
public class BulkOperationsResource {

  private static final String LOCALE = "locale";

  @PostMapping(value = "tag", consumes = MediaType.APPLICATION_JSON_VALUE)
  @SuppressWarnings("unchecked")
  public BulkOperationsResponse bulkTag(@RequestBody @NonNull Map<String, Object> json) {
    List<Content> selection = (List<Content>) json.get("selection");
    List<Content> taxonomyItems = (List<Content>) json.get("taxonomyItems");
    boolean taxonomyCheckBoxValue = (Boolean) json.get("taxonomyCheckBoxValue");
    String taxonomyPropertyName = (String) json.get("taxonomyPropertyName");
    BulkOperationsResponse result = new BulkOperationsResponse();
    try {
      for (Content item : selection) {
        boolean wasCheckedOut = item.isCheckedOut();

        if (!wasCheckedOut || item.isCheckedOutByCurrentSession()) {

          if (!item.isCheckedOut()) {
            item.checkOut();
          }
          updateTags(taxonomyItems, taxonomyCheckBoxValue, taxonomyPropertyName, result, item);
          if (!wasCheckedOut) {
            item.checkIn();
          }
        }
      }
    } catch (Exception e) {
      result.setErrorCode(e.getMessage());
      for (Content item : selection) {
        item.revert();
      }
    }
    return result;
  }

  @PostMapping(value = "addorupdatereferences", consumes = MediaType.APPLICATION_JSON_VALUE)
  @SuppressWarnings("unchecked")
  public BulkOperationsResponse addOrUpdateReferences(@RequestBody @NonNull Map<String, Object> json) {
    List<Content> selection = (List<Content>) json.get("selection");
    List<String> references = (List<String>) json.get("references");
    boolean overrideValue = (Boolean) json.get("overrideValue");
    BulkOperationsResponse result = new BulkOperationsResponse();
    try {
      for (Content item : selection) {
        boolean wasCheckedOut = item.isCheckedOut();

        if (!wasCheckedOut || item.isCheckedOutByCurrentSession()) {

          if (!item.isCheckedOut()) {
            item.checkOut();
          }
          if (references != null && !references.isEmpty()) {
            Struct localSettings = item.getStruct("localSettings");
            StructBuilder builder;
            if (localSettings == null) {
              localSettings = item.getRepository().getConnection().getStructService().emptyStruct();
            }
            builder = localSettings.builder();
            if (!CapStructUtil.hasPropertyDescriptor(localSettings, "commerce")) {
              builder.declareStruct("commerce", item.getRepository().getConnection().getStructService().emptyStruct());
            }
            builder.enter("commerce");

            if(builder.getDescriptor("references") == null) {
              builder.declareStrings("references", Integer.MAX_VALUE, Collections.emptyList());
              localSettings = builder.build();
            }
            if(overrideValue) {
              builder.set("references", references);
            } else {
              List<String> existingElements = new ArrayList<>(localSettings.getStruct("commerce").getStrings("references"));
              existingElements.addAll(references);
              builder.set("references", existingElements);
            }
            Struct newStruct = builder.build();
            item.set("localSettings", newStruct);
          } else if (overrideValue) {
            Struct localSettings = item.getStruct("localSettings");
            if (localSettings != null && CapStructUtil.hasPropertyDescriptor(localSettings, "commerce")) {
              Struct newStruct = localSettings.builder().enter("commerce").remove("references").build();
              item.set("localSettings", newStruct);
            }
          }
          if (!wasCheckedOut) {
            item.checkIn();
          }
        }
      }
    } catch (Exception e) {
      result.setErrorCode(e.getMessage());
      for (Content item : selection) {
        item.revert();
      }
    }
    return result;
  }

  @PostMapping(value = "searchandreplace", consumes = MediaType.APPLICATION_JSON_VALUE)
  @SuppressWarnings("unchecked")
  public BulkOperationsResponse searchAndReplace(@RequestBody @NonNull Map<String, Object> json) throws Exception {
    List<Content> selection = (List<Content>) json.get("selection");
    String searchFor = (String) json.get("searchFor");
    String replaceWith = (String) json.get("replaceWith");
    Map<String, Boolean> properties = (Map<String, Boolean>) json.get("properties");
    BulkOperationsResponse result = new BulkOperationsResponse();
    try {
      for (Content item : selection) {
        boolean wasCheckedOut = item.isCheckedOut();
        boolean replacedProperty = false;

        if (!wasCheckedOut || item.isCheckedOutByCurrentSession()) {

          if (!item.isCheckedOut()) {
            item.checkOut();
          }
          for (Map.Entry<String, Boolean> entry : properties.entrySet()) {
            if (entry.getValue()) {
              Object prop = item.get(entry.getKey());
              if (prop instanceof String) {
                String stringProperty = (String) prop;
                stringProperty = stringProperty.replace(searchFor, replaceWith);
                item.set(entry.getKey(), stringProperty);
                result.getModifiedContents().add(item);
                replacedProperty = true;
              } else if (prop instanceof Markup) {
                Markup markupProperty = (Markup) prop;
                item.set(entry.getKey(), MarkupFactory.fromString(markupProperty.toString().replace(searchFor, replaceWith)));
                replacedProperty = true;
                result.getModifiedContents().add(item);
              }
            }
          }
          if (!replacedProperty) {
            item.revert();
          } else if (!wasCheckedOut) {
            item.checkIn();
          }
        }
      }
    } catch (Exception e) {
      result.setErrorCode(e.getMessage());
      for (Content item : selection) {
        item.revert();
      }
    }
    return result;
  }

  /**
   * Bulk-update the provided list of content with the provided locale.
   */
  @PostMapping(value = "updatelocale", consumes = MediaType.APPLICATION_JSON_VALUE)
  @SuppressWarnings("unchecked")
  public BulkOperationsResponse bulkUpdateLocale(@RequestBody @NonNull Map<String, Object> json) throws Exception {
    List<Content> selection = (List<Content>) json.get("selection");
    String languageTag = (String) json.get("languageTag");

    BulkOperationsResponse result = new BulkOperationsResponse();
    try {
      Locale locale = Locale.forLanguageTag(languageTag);

      for (Content item : selection) {
        boolean wasCheckedOut = item.isCheckedOut();

        if (!wasCheckedOut || item.isCheckedOutByCurrentSession()) {

          if (!item.isCheckedOut()) {
            item.checkOut();
          }
          boolean modified = updateLocale(item, locale);
          if (modified) {
            result.getModifiedContents().add(item);
          }
          if (!wasCheckedOut) {
            item.checkIn();
          }
        }
      }
    } catch (Exception e) {
      result.setErrorCode(e.getMessage());
      for (Content item : selection) {
        item.revert();
      }
    }

    return result;
  }
  private void updateTags(List<Content> taxonomies, boolean reset, String taxonomyType, BulkOperationsResponse result, Content item) {
    if (taxonomies != null && !taxonomies.isEmpty()) {
      List<Content> subjectTaxonomies;
      if (reset) {
        subjectTaxonomies = new ArrayList<>();
      } else {
        subjectTaxonomies = new ArrayList<>(item.getLinks(taxonomyType));
      }
      for (Content tag : taxonomies) {
        if (!subjectTaxonomies.contains(tag)) {
          subjectTaxonomies.add(tag);
          result.getModifiedContents().add(item);
        }
      }
      item.set(taxonomyType, subjectTaxonomies);

    } else if (reset) {
      item.set(taxonomyType, new ArrayList<Content>());
    }
  }

  /**
   * Update the locale of the given content with the provided locale.
   *
   * @return <code>true</code> if the locale has been updated, <code>false</code> otherwise.
   */
  private boolean updateLocale(@NonNull Content item, Locale locale) {
    boolean updated = false;
    if (locale != null && !locale.toLanguageTag().equals(item.getString(LOCALE))) {
      item.set(LOCALE, locale.toLanguageTag());
      updated = true;
    }
    return updated;
  }
}
