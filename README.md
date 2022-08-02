![Status: Active](https://documentation.coremedia.com/badges/badge_status_active.png "Status: Active")
![For CoreMedia CMS](https://documentation.coremedia.com/badges/badge_coremedia_cms.png "For CoreMedia CMS")

# Bulk Operations

This extension allows you to configure and define bulk operations for content. Let me give you some examples:
* You have a list of items that you want to tag
* You want to bulk update the locale of a list of items

### Examples

This extensions adds a litte button to your Studio Library
![Closed Menu](docs/images/bulk-action-button.png)

![Open Menu](docs/images/open-menu.png)


#### Bulk Tagging
The following bulk tagging actions are available
* Bulk Tagging for Tags
* Bulk Tagging for Locations
* Bulk Tagging for Assets

![Bulk Tagging](docs/images/bulk-tagging.png)

#### Bulk Assigning Product References
This action allows you to easily add a list of commerce items to e.g. Images
![Bulk Tagging](docs/images/assigning-assets.png)

#### Search & Replace
This action allows you to search & replace a text
![Search & Replace](docs/images/search-and-replace.png)

#### Bulk Update Locale
This action allows you to bulk update the locale of a list of content items
![Update Locae.png](docs/images/update-locale.png)

### Installation

- From the project's root folder, clone this repository as a submodule of the extensions folder. Make sure to use the branch name that matches your workspace version.
```
git submodule add https://github.com/coremedia-contributions/bulk-operations modules/extensions/bulk-operations
```

- Use the extension tool in the root folder of the project to link the modules to your workspace.
 ```
mvn extensions:sync -f workspace-configuration/extensions -Denable=bulk-operations
```
