## v2.0.0-beta.22

Fix controls losing focus on update

## v2.0.0-beta.20

Breaking changes:

```ts
render.addPreset(Presets.reroute.setup({
  translate(id, dx, dy) {
    // const { k } = rea.area.transform
    // dividing by k isn't needed
    reroutePlugin.translate(id, dx, dy);
  }
}))
```


## 2.0.0-beta.19

Breaking changes: `area` property omitted from `Presets.classic.setup({ area })`

## 2.0.0-beta.18

Alias Control from classic preset
Use `useNoDrag` in `InputControl`

## 2.0.0-beta.17

- Exposed `useDrag`
- Added `useNoDrag` and `NoDrag` in `Drag` namespace

## v2.0.0-beta.12

Added `RefControl` and `RefSocket` to classic preset

## v2.0.0-beta.10

Breaking changes: `RefComponent` requires `unmount` property
