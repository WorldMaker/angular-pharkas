[pharkas](../README.md) / [Exports](../modules.md) / [angular-pharkas-highcharts](../modules/angular_pharkas_highcharts.md) / ChartComponent

# Class: ChartComponent

[angular-pharkas-highcharts](../modules/angular_pharkas_highcharts.md).ChartComponent

## Hierarchy

- `PharkasComponent`<[`ChartComponent`](angular_pharkas_highcharts.ChartComponent.md)\>

  ↳ **`ChartComponent`**

## Table of contents

### Constructors

- [constructor](angular_pharkas_highcharts.ChartComponent.md#constructor)

### Properties

- [ɵcmp](angular_pharkas_highcharts.ChartComponent.md#ɵcmp)
- [ɵfac](angular_pharkas_highcharts.ChartComponent.md#ɵfac)

### Accessors

- [oneToOne](angular_pharkas_highcharts.ChartComponent.md#onetoone)
- [options](angular_pharkas_highcharts.ChartComponent.md#options)
- [pharkasChangeNotifications](angular_pharkas_highcharts.ChartComponent.md#pharkaschangenotifications)
- [pharkasEffectError](angular_pharkas_highcharts.ChartComponent.md#pharkaseffecterror)
- [pharkasError](angular_pharkas_highcharts.ChartComponent.md#pharkaserror)
- [pharkasTemplateError](angular_pharkas_highcharts.ChartComponent.md#pharkastemplateerror)

### Methods

- [bind](angular_pharkas_highcharts.ChartComponent.md#bind)
- [bindEffect](angular_pharkas_highcharts.ChartComponent.md#bindeffect)
- [bindImmediate](angular_pharkas_highcharts.ChartComponent.md#bindimmediate)
- [bindImmediateEffect](angular_pharkas_highcharts.ChartComponent.md#bindimmediateeffect)
- [bindOutput](angular_pharkas_highcharts.ChartComponent.md#bindoutput)
- [bindable](angular_pharkas_highcharts.ChartComponent.md#bindable)
- [createCallback](angular_pharkas_highcharts.ChartComponent.md#createcallback)
- [ngOnDestroy](angular_pharkas_highcharts.ChartComponent.md#ngondestroy)
- [ngOnInit](angular_pharkas_highcharts.ChartComponent.md#ngoninit)
- [setInput](angular_pharkas_highcharts.ChartComponent.md#setinput)
- [useCallback](angular_pharkas_highcharts.ChartComponent.md#usecallback)
- [useInput](angular_pharkas_highcharts.ChartComponent.md#useinput)

## Constructors

### constructor

• **new ChartComponent**(`ref`, `host`, `highcharts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `ChangeDetectorRef` |
| `host` | `ElementRef`<`any`\> |
| `highcharts?` | `__module` |

#### Overrides

PharkasComponent&lt;ChartComponent\&gt;.constructor

#### Defined in

[projects/angular-pharkas-highcharts/src/chart.component.ts:30](https://github.com/WorldMaker/angular-pharkas/blob/ddc8552/projects/angular-pharkas-highcharts/src/chart.component.ts#L30)

## Properties

### ɵcmp

▪ `Static` **ɵcmp**: `unknown`

#### Inherited from

PharkasComponent.ɵcmp

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:113

___

### ɵfac

▪ `Static` **ɵfac**: `unknown`

#### Inherited from

PharkasComponent.ɵfac

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:112

## Accessors

### oneToOne

• `set` **oneToOne**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` \| `Observable`<`boolean`\> |

#### Returns

`void`

#### Defined in

[projects/angular-pharkas-highcharts/src/chart.component.ts:26](https://github.com/WorldMaker/angular-pharkas/blob/ddc8552/projects/angular-pharkas-highcharts/src/chart.component.ts#L26)

___

### options

• `set` **options**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Observable`<`Options`\> |

#### Returns

`void`

#### Defined in

[projects/angular-pharkas-highcharts/src/chart.component.ts:23](https://github.com/WorldMaker/angular-pharkas/blob/ddc8552/projects/angular-pharkas-highcharts/src/chart.component.ts#L23)

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
| `P` | extends keyof [`ChartComponent`](angular_pharkas_highcharts.ChartComponent.md) |
| `T` | extends `boolean` \| `Observable`<`Options`\> \| `Observable`<`boolean`\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |

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

dist/angular-pharkas/pharkas.component.d.ts:66

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

dist/angular-pharkas/pharkas.component.d.ts:101

___

### bindImmediate

▸ `Protected` **bindImmediate**<`P`, `T`\>(`name`, `observable`, `defaultValue`): `void`

Bind an observable immediately to a bindable (template binding)

Immediate bindings are neither combined nor throttled.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`ChartComponent`](angular_pharkas_highcharts.ChartComponent.md) |
| `T` | extends `boolean` \| `Observable`<`Options`\> \| `Observable`<`boolean`\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |

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

dist/angular-pharkas/pharkas.component.d.ts:75

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

dist/angular-pharkas/pharkas.component.d.ts:109

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

dist/angular-pharkas/pharkas.component.d.ts:81

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
| `name` | keyof [`ChartComponent`](angular_pharkas_highcharts.ChartComponent.md) | Name of bindable |

#### Returns

`T`

value

#### Inherited from

PharkasComponent.bindable

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:57

___

### createCallback

▸ `Protected` **createCallback**<`P`, `T`, `U`\>(`name`): `U`

Create a callback function

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`ChartComponent`](angular_pharkas_highcharts.ChartComponent.md) |
| `T` | extends `boolean` \| `Observable`<`Options`\> \| `Observable`<`boolean`\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |
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

dist/angular-pharkas/pharkas.component.d.ts:87

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Inherited from

PharkasComponent.ngOnDestroy

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:111

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Inherited from

PharkasComponent.ngOnInit

#### Defined in

dist/angular-pharkas/pharkas.component.d.ts:110

___

### setInput

▸ `Protected` **setInput**<`P`, `T`, `U`\>(`name`, `value`): `void`

Set an input value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`ChartComponent`](angular_pharkas_highcharts.ChartComponent.md) |
| `T` | extends `boolean` \| `Observable`<`Options`\> \| `Observable`<`boolean`\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |
| `U` | extends `boolean` \| `void` \| `Options` \| () => `void` \| () => `void` |

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

dist/angular-pharkas/pharkas.component.d.ts:44

___

### useCallback

▸ `Protected` **useCallback**<`P`, `T`, `U`\>(`name`): `Observable`<`U`\>

Get an observable of calls to the callback function

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`ChartComponent`](angular_pharkas_highcharts.ChartComponent.md) |
| `T` | extends `boolean` \| `Observable`<`Options`\> \| `Observable`<`boolean`\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |
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

dist/angular-pharkas/pharkas.component.d.ts:93

___

### useInput

▸ `Protected` **useInput**<`P`, `T`, `U`, `TDefault`\>(`name`, `defaultValue?`): `Observable`<`U`\>

Observe an `@Input()` built with `this.setInput`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof [`ChartComponent`](angular_pharkas_highcharts.ChartComponent.md) |
| `T` | extends `boolean` \| `Observable`<`Options`\> \| `Observable`<`boolean`\> \| `Observable`<`void`\> \| () => `void` \| () => `void` |
| `U` | extends `boolean` \| `void` \| `Options` \| () => `void` \| () => `void` |
| `TDefault` | extends `boolean` \| `void` \| `Options` \| () => `void` \| () => `void` |

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

dist/angular-pharkas/pharkas.component.d.ts:51
