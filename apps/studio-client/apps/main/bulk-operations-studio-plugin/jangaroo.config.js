const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.blueprint__bulk-operations-studio-client.main",
    namespace: "com.coremedia.blueprint.bulkoperations.main",
    studioPlugins: [
      { mainClass: "com.coremedia.blueprint.bulkoperations.main.BulkOperationsStudioPlugin" },
    ],
  },
});
