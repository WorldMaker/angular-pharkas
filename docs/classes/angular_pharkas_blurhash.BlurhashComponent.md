[pharkas](../README.md) / [Exports](../modules.md) / [angular-pharkas-blurhash](../modules/angular_pharkas_blurhash.md) / BlurhashComponent

# Class: BlurhashComponent

[angular-pharkas-blurhash](../modules/angular_pharkas_blurhash.md).BlurhashComponent

## Hierarchy

- `PharkasComponent`<[`BlurhashComponent`](angular_pharkas_blurhash.BlurhashComponent.md)\>

  ↳ **`BlurhashComponent`**

## Table of contents

### Constructors

- [constructor](angular_pharkas_blurhash.BlurhashComponent.md#constructor)

### Properties

- [ɵcmp](angular_pharkas_blurhash.BlurhashComponent.md#ɵcmp)
- [ɵfac](angular_pharkas_blurhash.BlurhashComponent.md#ɵfac)

### Accessors

- [aspectRatio](angular_pharkas_blurhash.BlurhashComponent.md#aspectratio)
- [blurhashUrl](angular_pharkas_blurhash.BlurhashComponent.md#blurhashurl)
- [heightStyle](angular_pharkas_blurhash.BlurhashComponent.md#heightstyle)
- [image](angular_pharkas_blurhash.BlurhashComponent.md#image)
- [imageAlt](angular_pharkas_blurhash.BlurhashComponent.md#imagealt)
- [imageSrc](angular_pharkas_blurhash.BlurhashComponent.md#imagesrc)
- [pharkasChangeNotifications](angular_pharkas_blurhash.BlurhashComponent.md#pharkaschangenotifications)
- [pharkasEffectError](angular_pharkas_blurhash.BlurhashComponent.md#pharkaseffecterror)
- [pharkasError](angular_pharkas_blurhash.BlurhashComponent.md#pharkaserror)
- [pharkasSuspense](angular_pharkas_blurhash.BlurhashComponent.md#pharkassuspense)
- [pharkasTemplateError](angular_pharkas_blurhash.BlurhashComponent.md#pharkastemplateerror)
- [widthStyle](angular_pharkas_blurhash.BlurhashComponent.md#widthstyle)

### Methods

- [bind](angular_pharkas_blurhash.BlurhashComponent.md#bind)
- [bindEffect](angular_pharkas_blurhash.BlurhashComponent.md#bindeffect)
- [bindImmediate](angular_pharkas_blurhash.BlurhashComponent.md#bindimmediate)
- [bindImmediateEffect](angular_pharkas_blurhash.BlurhashComponent.md#bindimmediateeffect)
- [bindOutput](angular_pharkas_blurhash.BlurhashComponent.md#bindoutput)
- [bindSuspense](angular_pharkas_blurhash.BlurhashComponent.md#bindsuspense)
- [bindable](angular_pharkas_blurhash.BlurhashComponent.md#bindable)
- [createCallback](angular_pharkas_blurhash.BlurhashComponent.md#createcallback)
- [ngOnDestroy](angular_pharkas_blurhash.BlurhashComponent.md#ngondestroy)
- [ngOnInit](angular_pharkas_blurhash.BlurhashComponent.md#ngoninit)
- [setInput](angular_pharkas_blurhash.BlurhashComponent.md#setinput)
- [useCallback](angular_pharkas_blurhash.BlurhashComponent.md#usecallback)
- [useInput](angular_pharkas_blurhash.BlurhashComponent.md#useinput)

## Constructors

### constructor

• **new BlurhashComponent**(`ref`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `ChangeDetectorRef` |

#### Overrides

PharkasComponent&lt;BlurhashComponent\&gt;.constructor

#### Defined in

[projects/angular-pharkas-blurhash/src/blurhash.component.ts:59](https://github.com/WorldMaker/angular-pharkas/blob/bb9b128/projects/angular-pharkas-blurhash/src/blurhash.component.ts#L59)

## Properties

### ɵcmp

▪ `Static` **ɵcmp**: `unknown`

#### Inherited from

PharkasComponent.ɵcmp

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:126

___

### ɵfac

▪ `Static` **ɵfac**: `unknown`

#### Inherited from

PharkasComponent.ɵfac

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:125

## Accessors

### aspectRatio

• `get` **aspectRatio**(): `string`

#### Returns

`string`

#### Defined in

[projects/angular-pharkas-blurhash/src/blurhash.component.ts:46](https://github.com/WorldMaker/angular-pharkas/blob/bb9b128/projects/angular-pharkas-blurhash/src/blurhash.component.ts#L46)

___

### blurhashUrl

• `get` **blurhashUrl**(): `string`

#### Returns

`string`

#### Defined in

[projects/angular-pharkas-blurhash/src/blurhash.component.ts:55](https://github.com/WorldMaker/angular-pharkas/blob/bb9b128/projects/angular-pharkas-blurhash/src/blurhash.component.ts#L55)

___

### heightStyle

• `get` **heightStyle**(): `string`

#### Returns

`string`

#### Defined in

[projects/angular-pharkas-blurhash/src/blurhash.component.ts:52](https://github.com/WorldMaker/angular-pharkas/blob/bb9b128/projects/angular-pharkas-blurhash/src/blurhash.component.ts#L52)

___

### image

• `set` **image**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Observable`<[`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md)\> |

#### Returns

`void`

#### Defined in

[projects/angular-pharkas-blurhash/src/blurhash.component.ts:36](https://github.com/WorldMaker/angular-pharkas/blob/bb9b128/projects/angular-pharkas-blurhash/src/blurhash.component.ts#L36)

___

### imageAlt

• `get` **imageAlt**(): `string`

#### Returns

`string`

#### Defined in

[projects/angular-pharkas-blurhash/src/blurhash.component.ts:43](https://github.com/WorldMaker/angular-pharkas/blob/bb9b128/projects/angular-pharkas-blurhash/src/blurhash.component.ts#L43)

___

### imageSrc

• `get` **imageSrc**(): `string`

#### Returns

`string`

#### Defined in

[projects/angular-pharkas-blurhash/src/blurhash.component.ts:40](https://github.com/WorldMaker/angular-pharkas/blob/bb9b128/projects/angular-pharkas-blurhash/src/blurhash.component.ts#L40)

___

### pharkasChangeNotifications

• `get` **pharkasChangeNotifications**(): `Observable`<`void`\>

An observable notifying when template changes have occured.

#### Returns

`Observable`<`void`\>

#### Inherited from

PharkasComponent.pharkasChangeNotifications

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:21

___

### pharkasEffectError

• `get` **pharkasEffectError**(): `boolean`

An error has been observed in any observable applied to `bindEffect` or
`bindEffectImmediate`.

#### Returns

`boolean`

#### Inherited from

PharkasComponent.pharkasEffectError

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:31

___

### pharkasError

• `get` **pharkasError**(): `boolean`

An error has been observed in any observable applied to `bind`, `bindImmediate`,
`bindEffect`, or `bindEffectImmediate`.

#### Returns

`boolean`

#### Inherited from

PharkasComponent.pharkasError

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:26

___

### pharkasSuspense

• `get` **pharkasSuspense**(): `boolean`

Template change notifications are suspended for non-immediate bindings.
(Observed from a `bindSuspense`.)

#### Returns

`boolean`

#### Inherited from

PharkasComponent.pharkasSuspense

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:40

___

### pharkasTemplateError

• `get` **pharkasTemplateError**(): `boolean`

An error has been observed in any observable applied to `bind` or `bindImmediate`.

#### Returns

`boolean`

#### Inherited from

PharkasComponent.pharkasTemplateError

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:35

___

### widthStyle

• `get` **widthStyle**(): `string`

#### Returns

`string`

#### Defined in

[projects/angular-pharkas-blurhash/src/blurhash.component.ts:49](https://github.com/WorldMaker/angular-pharkas/blob/bb9b128/projects/angular-pharkas-blurhash/src/blurhash.component.ts#L49)

## Methods

### bind

▸ `Protected` **bind**<`P`, `T`\>(`name`, `observable`, `defaultValue`): `void`

Bind an observable to a bindable (template binding)

Default bound observation is combined and throttled to requestAnimationFrame for smooth template updates.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`BlurhashComponent`](angular_pharkas_blurhash.BlurhashComponent.md) |
| `T` | extends `string` \| `boolean` \| `Observable`<[`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md)\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `P` | Name of bindable |
| `observable` | `Observable`<`T`\> | Observable to bind to |
| `defaultValue` | `T` | Default value |

#### Returns

`void`

#### Inherited from

PharkasComponent.bind

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:71

___

### bindEffect

▸ `Protected` **bindEffect**<`T`\>(`observable`, `effect`): `void`

(Last Resort!) Bind an observable to a side effect

**Does not** notify Angular of possible template binding changes. Does try to schedule to requestAnimationFrame.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observable` | `Observable`<`T`\> | Observable |
| `effect` | (`item`: `T`) => `void` | Side effect |

#### Returns

`void`

#### Inherited from

PharkasComponent.bindEffect

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:114

___

### bindImmediate

▸ `Protected` **bindImmediate**<`P`, `T`\>(`name`, `observable`, `defaultValue`): `void`

Bind an observable immediately to a bindable (template binding)

Immediate bindings are neither combined nor throttled.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`BlurhashComponent`](angular_pharkas_blurhash.BlurhashComponent.md) |
| `T` | extends `string` \| `boolean` \| `Observable`<[`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md)\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `P` |
| `observable` | `Observable`<`T`\> |
| `defaultValue` | `T` |

#### Returns

`void`

#### Inherited from

PharkasComponent.bindImmediate

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:80

___

### bindImmediateEffect

▸ `Protected` **bindImmediateEffect**<`T`\>(`observable`, `effect`): `void`

(Truly the Last Resort!) Bind an observable immediately to a side effect

**Does not** notify Angular of possible template binding changes.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observable` | `Observable`<`T`\> | Observable |
| `effect` | (`item`: `T`) => `void` | Side effect |

#### Returns

`void`

#### Inherited from

PharkasComponent.bindImmediateEffect

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:122

___

### bindOutput

▸ `Protected` **bindOutput**<`T`\>(`eventEmitter`, `observable`): `void`

Bind an observable to an `@Output()`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventEmitter` | `EventEmitter`<`T`\> | Output |
| `observable` | `Observable`<`T`\> | Observable |

#### Returns

`void`

#### Inherited from

PharkasComponent.bindOutput

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:94

___

### bindSuspense

▸ `Protected` **bindSuspense**(`observable`): `void`

Bind a suspense observable

While this observable emits `true`, template change notifications will skipped
for non-immediate bindings and the `pharkasSuspense` blinkenlight will be `true`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observable` | `Observable`<`boolean`\> | Suspense |

#### Returns

`void`

#### Inherited from

PharkasComponent.bindSuspense

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:88

___

### bindable

▸ `Protected` **bindable**<`T`\>(`name`): `T`

Get the value of a bindable (template binding)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | keyof [`BlurhashComponent`](angular_pharkas_blurhash.BlurhashComponent.md) | Name of bindable |

#### Returns

`T`

value

#### Inherited from

PharkasComponent.bindable

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:62

___

### createCallback

▸ `Protected` **createCallback**<`P`, `T`, `U`\>(`name`): `U`

Create a callback function

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`BlurhashComponent`](angular_pharkas_blurhash.BlurhashComponent.md) |
| `T` | extends `string` \| `boolean` \| `Observable`<[`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md)\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |
| `U` | extends () => `void` \| () => `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `P` | Name of callback |

#### Returns

`U`

Callback function

#### Inherited from

PharkasComponent.createCallback

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:100

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Inherited from

PharkasComponent.ngOnDestroy

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:124

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Inherited from

PharkasComponent.ngOnInit

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:123

___

### setInput

▸ `Protected` **setInput**<`P`, `T`, `U`\>(`name`, `value`): `void`

Set an input value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`BlurhashComponent`](angular_pharkas_blurhash.BlurhashComponent.md) |
| `T` | extends `string` \| `boolean` \| `Observable`<[`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md)\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |
| `U` | extends `string` \| `boolean` \| `void` \| [`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md) \| () => `void` \| () => `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `P` | Name of input |
| `value` | `U` \| `Observable`<`U`\> | value |

#### Returns

`void`

#### Inherited from

PharkasComponent.setInput

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:49

___

### useCallback

▸ `Protected` **useCallback**<`P`, `T`, `U`\>(`name`): `Observable`<`U`\>

Get an observable of calls to the callback function

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`BlurhashComponent`](angular_pharkas_blurhash.BlurhashComponent.md) |
| `T` | extends `string` \| `boolean` \| `Observable`<[`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md)\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |
| `U` | extends [] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `P` | Name of callback |

#### Returns

`Observable`<`U`\>

Observable

#### Inherited from

PharkasComponent.useCallback

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:106

___

### useInput

▸ `Protected` **useInput**<`P`, `T`, `U`, `TDefault`\>(`name`, `defaultValue?`): `Observable`<`U`\>

Observe an `@Input()` built with `this.setInput`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`BlurhashComponent`](angular_pharkas_blurhash.BlurhashComponent.md) |
| `T` | extends `string` \| `boolean` \| `Observable`<[`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md)\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |
| `U` | extends `string` \| `boolean` \| `void` \| [`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md) \| () => `void` \| () => `void` |
| `TDefault` | extends `string` \| `boolean` \| `void` \| [`BlurhashDescription`](../interfaces/angular_pharkas_blurhash.BlurhashDescription.md) \| () => `void` \| () => `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `P` | Name of input |
| `defaultValue?` | `TDefault` \| () => `Observable`<`TDefault`\> | Default value |

#### Returns

`Observable`<`U`\>

Observable

#### Inherited from

PharkasComponent.useInput

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:56
