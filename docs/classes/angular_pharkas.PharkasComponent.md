[pharkas](../README.md) / [Exports](../modules.md) / [angular-pharkas](../modules/angular_pharkas.md) / PharkasComponent

# Class: PharkasComponent<TViewModel\>

[angular-pharkas](../modules/angular_pharkas.md).PharkasComponent

Pharkas Base Component

PharkasComponent is a base component for "Observables only" zone-free,
AsyncPipe-free, auto-subscription managing components. It takes some
inspirations from ReactiveUI (.NET) and React's Hook components.

## Type parameters

| Name |
| :------ |
| `TViewModel` |

## Implements

- `OnInit`
- `OnDestroy`

## Table of contents

### Constructors

- [constructor](angular_pharkas.PharkasComponent.md#constructor)

### Accessors

- [pharkasChangeNotifications](angular_pharkas.PharkasComponent.md#pharkaschangenotifications)
- [pharkasEffectError](angular_pharkas.PharkasComponent.md#pharkaseffecterror)
- [pharkasError](angular_pharkas.PharkasComponent.md#pharkaserror)
- [pharkasTemplateError](angular_pharkas.PharkasComponent.md#pharkastemplateerror)

### Methods

- [bind](angular_pharkas.PharkasComponent.md#bind)
- [bindEffect](angular_pharkas.PharkasComponent.md#bindeffect)
- [bindImmediate](angular_pharkas.PharkasComponent.md#bindimmediate)
- [bindImmediateEffect](angular_pharkas.PharkasComponent.md#bindimmediateeffect)
- [bindOutput](angular_pharkas.PharkasComponent.md#bindoutput)
- [bindable](angular_pharkas.PharkasComponent.md#bindable)
- [createCallback](angular_pharkas.PharkasComponent.md#createcallback)
- [ngOnDestroy](angular_pharkas.PharkasComponent.md#ngondestroy)
- [ngOnInit](angular_pharkas.PharkasComponent.md#ngoninit)
- [setInput](angular_pharkas.PharkasComponent.md#setinput)
- [useCallback](angular_pharkas.PharkasComponent.md#usecallback)
- [useInput](angular_pharkas.PharkasComponent.md#useinput)

## Constructors

### constructor

• **new PharkasComponent**<`TViewModel`\>(`ref`)

#### Type parameters

| Name |
| :------ |
| `TViewModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `ChangeDetectorRef` |

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:167](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L167)

## Accessors

### pharkasChangeNotifications

• `get` **pharkasChangeNotifications**(): `Observable`<`void`\>

An observable notifying when template changes have occured.

#### Returns

`Observable`<`void`\>

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:141](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L141)

___

### pharkasEffectError

• `get` **pharkasEffectError**(): `boolean`

An error has been observed in any observable applied to `bindEffect` or
`bindEffectImmediate`.

#### Returns

`boolean`

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:155](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L155)

___

### pharkasError

• `get` **pharkasError**(): `boolean`

An error has been observed in any observable applied to `bind`, `bindImmediate`,
`bindEffect`, or `bindEffectImmediate`.

#### Returns

`boolean`

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:148](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L148)

___

### pharkasTemplateError

• `get` **pharkasTemplateError**(): `boolean`

An error has been observed in any observable applied to `bind` or `bindImmediate`.

#### Returns

`boolean`

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:161](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L161)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:318](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L318)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:437](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L437)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:347](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L347)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:465](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L465)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:375](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L375)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:300](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L300)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:389](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L389)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:550](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L550)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:488](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L488)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:257](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L257)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:412](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L412)

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

#### Defined in

[projects/angular-pharkas/src/pharkas.component.ts:278](https://github.com/WorldMaker/angular-pharkas/blob/dcadbac/projects/angular-pharkas/src/pharkas.component.ts#L278)
