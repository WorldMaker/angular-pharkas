# Angular-Pharkas-Blurhash

This library provides an Observable-First, Zone-Free wrapper for the Vanilla JS library
[Blurhash](https://blurha.sh) built with the
[angular-pharkas](https://worldmaker.net/angular-pharkas) component framework.

It's key benefits are:

- Zone-Free
  - `ChangeDetectionStrategy.OnPush` tells Angular that it doesn't need to work to detect any template changes

## Usage

Import `PharkasBlurhashModule` and use `<pharkas-blurhash>`.
