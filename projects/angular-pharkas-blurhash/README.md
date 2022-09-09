# Angular-Pharkas-Blurhash

This library provides an Observable-First, Zone-Free wrapper for the Vanilla JS library
[Blurhash](https://blurha.sh) built with the
[angular-pharkas](https://worldmaker.net/angular-pharkas) component framework.

It's key benefits are:

- Zone-Free
  - `ChangeDetectionStrategy.OnPush` tells Angular that it doesn't need to work to detect any template changes

## Usage

Import `PharkasBlurhashModule` and use `<pharkas-blurhash>`. The API:

```html
<pharkas-blurhash [image]="blurhashDescriptionObservable"></pharkas-blurhash>
```

`[image]` is an `Observable<BlurhashDescription>` where `BlurhashDescription` is a simple interface describing
image metadata including the relevant blurhash.

### `BlurhashDescription`

```ts
{
  width: '100%',
  canvasWidth: 1024,
  height: '100%',
  canvasHeight: 728,
  blurhash: 'xyz…',
  blurhashPunch: 1,
  imageSrc: 'https://…',
  imageAlt: 'An example image of…'
}
```

Required:

- `blurhash` is the Blurhash to display
- `imageSrc` is the image to display
- `imageAlt` is the alternate description
- `width` is the width of the container (for both the blurhash and the image) as either a number (of pixels)
  or CSS size
- `height` is the height of the container (for both the blurhash and the image) as either a number (of pixels)
  or CSS size

Optional:

- `blurhashPunch` is a dial of the "punch" of a blurhash and defaults to `1`.
- `canvasWidth` is the size of canvas the blurhash is painted on, in pixels. It falls back to the `width` when
  provided as a number and otherwise defaults to 160 (for an assumption of 16x9 photos as default)
- `canvasHeight` is the size of canvas the blurhash is painted on, in pixels. It falls back to the `height`
  when provided as a number and otherwise defaults to 90 (for an assumption of 16x9 photos as default)
