import ResourceBundleUtil from "@jangaroo/runtime/l10n/ResourceBundleUtil";
import BulkOperations_properties from "./BulkOperations_properties";

/**
 * Overrides of ResourceBundle "BulkOperations" for Locale "de".
 * @see BulkOperations_properties#INSTANCE
 */
ResourceBundleUtil.override(BulkOperations_properties, {
  bulk_tag_dialog_applyButton_text: "Übernehmen",
  bulk_tag_dialog_failure_title: "Fehler",
  bulk_tag_dialog_failure_text: "Fehler beim Verarbeiten der ausgewählten Elemente",
  bulk_tag_dialog_subjectTaxonomy_title: "Bulk Tag für Themen",
  bulk_tag_dialog_locationTaxonomy_title: "Bulk Tag für Orte",
  bulk_tag_dialog_subjectTaxonomy_override: "Bestehende Themen ersetzen.",
  bulk_tag_dialog_locationTaxonomy_override: "Bestehende Orte ersetzen.",
  bulk_tag_dialog_taxonomy_emptyText: "Hier Taxonomien hinzufügen.",
  bulk_tag_dialog_assetTaxonomy_title: "Bulk Tag für Assets",
  bulk_tag_dialog_assetTaxonomy_override: "Bestehende Asset Kategorien ersetzen",
  bulk_tag_dialog_searchAndReplace_title: "Suchen & Ersetzen",
  bulk_tag_dialog_searchAndReplace_searchFor: "Suchen nach",
  bulk_tag_dialog_searchAndReplace_searchForEmptyText: "Nach folgendem Wert suchen.",
  bulk_tag_dialog_searchAndReplace_replaceWith: "Ersetzen mit",
  bulk_tag_dialog_searchAndReplace_replaceWithEmptyText: "Und mit diesem Wert ersetzen.",
  bulk_tag_dialog_searchAndReplace_property_text: "In den folgenden Properties",
  bulk_tag_dialog_searchAndReplace_grid_title: "Inhalte",
  bulk_edit_dialog_updateValidity_title: "Gültigkeit aktualisieren",
  bulk_edit_dialog_updateValidity_info: "Eine neue Gültigkeit für alle selektierten Inhalte setzen",
  bulk_edit_dialog_updateValidity_validFrom_label: "Gültig von",
  bulk_edit_dialog_updateValidity_validTo_label: "Gültig bis",
});
