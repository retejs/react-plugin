## [2.0.2](https://github.com/retejs/react-plugin/compare/v2.0.1...v2.0.2) (2023-10-05)


### Bug Fixes

* pointerdown propagation ([14ae6ec](https://github.com/retejs/react-plugin/commit/14ae6ece434e19417773ac3f2a9edc8785426ca2))

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
