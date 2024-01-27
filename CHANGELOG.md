## [2.0.5](https://github.com/retejs/react-plugin/compare/v2.0.4...v2.0.5) (2024-01-27)


### Bug Fixes

* **build:** source maps ([131cbec](https://github.com/retejs/react-plugin/commit/131cbecfc8783f5912cc0b17a79d4c143b83cfc6))

## [2.0.4](https://github.com/retejs/react-plugin/compare/v2.0.3...v2.0.4) (2023-10-24)


### Bug Fixes

* run flushSync in microtask ([fa2ba02](https://github.com/retejs/react-plugin/commit/fa2ba02255c075e14657f4b9ecc8710cdf2e9c1e))

## [2.0.3](https://github.com/retejs/react-plugin/compare/v2.0.2...v2.0.3) (2023-10-20)


### Bug Fixes

* no drag propagation ([267cfaa](https://github.com/retejs/react-plugin/commit/267cfaa2c2670b479f5d0a1a25b1c9bf12eff341))

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
