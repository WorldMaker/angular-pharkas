[pharkas](../README.md) / [Exports](../modules.md) / [angular-pharkas-leaflet](../modules/angular_pharkas_leaflet.md) / LeafletMapComponent

# Class: LeafletMapComponent<TViewModel\>

[angular-pharkas-leaflet](../modules/angular_pharkas_leaflet.md).LeafletMapComponent

Pharkas Base Component for building Leaflet Maps

## Type parameters

| Name | Type |
| :------ | :------ |
| `TViewModel` | extends [`LeafletMapComponent`](angular_pharkas_leaflet.LeafletMapComponent.md)<`TViewModel`\> |

## Hierarchy

- `PharkasComponent`<`TViewModel`\>

  ↳ **`LeafletMapComponent`**

## Table of contents

### Constructors

- [constructor](angular_pharkas_leaflet.LeafletMapComponent.md#constructor)

### Properties

- [[setMap]](angular_pharkas_leaflet.LeafletMapComponent.md#[setmap])
- [ɵcmp](angular_pharkas_leaflet.LeafletMapComponent.md#ɵcmp)
- [ɵfac](angular_pharkas_leaflet.LeafletMapComponent.md#ɵfac)

### Accessors

- [pharkasChangeNotifications](angular_pharkas_leaflet.LeafletMapComponent.md#pharkaschangenotifications)
- [pharkasEffectError](angular_pharkas_leaflet.LeafletMapComponent.md#pharkaseffecterror)
- [pharkasError](angular_pharkas_leaflet.LeafletMapComponent.md#pharkaserror)
- [pharkasSuspense](angular_pharkas_leaflet.LeafletMapComponent.md#pharkassuspense)
- [pharkasTemplateError](angular_pharkas_leaflet.LeafletMapComponent.md#pharkastemplateerror)

### Methods

- [bind](angular_pharkas_leaflet.LeafletMapComponent.md#bind)
- [bindEffect](angular_pharkas_leaflet.LeafletMapComponent.md#bindeffect)
- [bindImmediate](angular_pharkas_leaflet.LeafletMapComponent.md#bindimmediate)
- [bindImmediateEffect](angular_pharkas_leaflet.LeafletMapComponent.md#bindimmediateeffect)
- [bindOutput](angular_pharkas_leaflet.LeafletMapComponent.md#bindoutput)
- [bindSuspense](angular_pharkas_leaflet.LeafletMapComponent.md#bindsuspense)
- [bindable](angular_pharkas_leaflet.LeafletMapComponent.md#bindable)
- [createCallback](angular_pharkas_leaflet.LeafletMapComponent.md#createcallback)
- [ngOnDestroy](angular_pharkas_leaflet.LeafletMapComponent.md#ngondestroy)
- [ngOnInit](angular_pharkas_leaflet.LeafletMapComponent.md#ngoninit)
- [setInput](angular_pharkas_leaflet.LeafletMapComponent.md#setinput)
- [useCallback](angular_pharkas_leaflet.LeafletMapComponent.md#usecallback)
- [useInput](angular_pharkas_leaflet.LeafletMapComponent.md#useinput)
- [useMap](angular_pharkas_leaflet.LeafletMapComponent.md#usemap)

## Constructors

### constructor

• **new LeafletMapComponent**<`TViewModel`\>(`ref`, `element`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TViewModel` | extends [`LeafletMapComponent`](angular_pharkas_leaflet.LeafletMapComponent.md)<`TViewModel`, `TViewModel`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `ChangeDetectorRef` |
| `element` | `ElementRef`<`any`\> |

#### Overrides

PharkasComponent&lt;TViewModel\&gt;.constructor

#### Defined in

[projects/angular-pharkas-leaflet/src/leaflet-map.component.ts:31](https://github.com/WorldMaker/angular-pharkas/blob/0d50a82/projects/angular-pharkas-leaflet/src/leaflet-map.component.ts#L31)

## Properties

### [setMap]

• `Readonly` **[setMap]**: (`mapState`: `Observable`<`Map`\>) => `void`

#### Type declaration

▸ (`mapState`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `mapState` | `Observable`<`Map`\> |

##### Returns

`void`

#### Defined in

[projects/angular-pharkas-leaflet/src/leaflet-map.component.ts:27](https://github.com/WorldMaker/angular-pharkas/blob/0d50a82/projects/angular-pharkas-leaflet/src/leaflet-map.component.ts#L27)

___

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

## Methods

### bind

▸ `Protected` **bind**<`P`, `T`\>(`name`, `observable`, `defaultValue`): `void`

Bind an observable to a bindable (template binding)

Default bound observation is combined and throttled to requestAnimationFrame for smooth template updates.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `string` \| `number` \| `symbol` |
| `T` | `T` |

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
| `P` | extends `string` \| `number` \| `symbol` |
| `T` | `T` |

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
| `name` | keyof `TViewModel` | Name of bindable |

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
| `P` | extends `string` \| `number` \| `symbol` |
| `T` | `T` |
| `U` | extends (...`args`: `unknown`[]) => `void` |

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
| `P` | extends `string` \| `number` \| `symbol` |
| `T` | `T` |
| `U` | extends `unknown` |

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
| `P` | extends `string` \| `number` \| `symbol` |
| `T` | `T` |
| `U` | extends `unknown`[] |

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
| `P` | extends `string` \| `number` \| `symbol` |
| `T` | `T` |
| `U` | extends `unknown` |
| `TDefault` | extends `unknown` |

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

___

### useMap

▸ `Protected` **useMap**(`options`): `Observable`<`Map`\>

Use a Leaflet Map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `MapOptions` | Leaflet options |

#### Returns

`Observable`<`Map`\>

Observable of Leaflet Map

#### Defined in

[projects/angular-pharkas-leaflet/src/leaflet-map.component.ts:59](https://github.com/WorldMaker/angular-pharkas/blob/0d50a82/projects/angular-pharkas-leaflet/src/leaflet-map.component.ts#L59)
