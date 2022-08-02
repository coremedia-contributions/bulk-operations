# Scope of the implementation

This extension allows business users to add additional configuration for a viewtype called:

### Tetris
Viewtype Name: tetris

Code: [TetrisBlockOptionsForm.ts](../apps/studio-client/apps/main/bulk-operations-studio-plugin/src/configuration/TetrisBlockOptionsForm.ts)
![Tetris](./images/Tetris.png)
### Story Slider
Viewtype Name: story-slider

Code: [StoriesSliderOptionsForm.ts](../apps/studio-client/apps/main/bulk-operations-studio-plugin/src/configuration/StoriesSliderOptionsForm.ts)
![Story Slider](./images/Slider.png)

These two configurations are just examples. To build your own configuration, just extend [ViewTypeConfigurationForm.ts](../apps/studio-client/apps/main/viewtype-configuration-studio-base/src/editors/ViewTypeConfigurationForm.ts) 
and don't forget to define the
```typescript
appliesTo: ["name-of-your-viewtype"],
```

Delivery Support is currently implemented for Headless Service only. ```viewtypeConfiuration``` is available for all CMCollection items.
