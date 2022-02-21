[angular-pharkas](../README.md) / [Exports](../modules.md) / PharkasComponent

# Class: PharkasComponent<TViewModel\>

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

- [constructor](PharkasComponent.md#constructor)

### Methods

- [bind](PharkasComponent.md#bind)
- [bindEffect](PharkasComponent.md#bindeffect)
- [bindImmediate](PharkasComponent.md#bindimmediate)
- [bindImmediateEffect](PharkasComponent.md#bindimmediateeffect)
- [bindOutput](PharkasComponent.md#bindoutput)
- [bindable](PharkasComponent.md#bindable)
- [createCallback](PharkasComponent.md#createcallback)
- [ngOnDestroy](PharkasComponent.md#ngondestroy)
- [ngOnInit](PharkasComponent.md#ngoninit)
- [setInput](PharkasComponent.md#setinput)
- [useCallback](PharkasComponent.md#usecallback)
- [useInput](PharkasComponent.md#useinput)

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

[pharkas.component.ts:77](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L77)

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

[pharkas.component.ts:191](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L191)

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

[pharkas.component.ts:306](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L306)

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

[pharkas.component.ts:218](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L218)

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

[pharkas.component.ts:331](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L331)

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

[pharkas.component.ts:244](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L244)

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

[pharkas.component.ts:173](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L173)

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

[pharkas.component.ts:258](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L258)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[pharkas.component.ts:389](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L389)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[pharkas.component.ts:351](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L351)

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

[pharkas.component.ts:133](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L133)

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

[pharkas.component.ts:281](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L281)

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
| `defaultValue?` | `TDefault` | Default value |

#### Returns

`Observable`<`U`\>

Observable

#### Defined in

[pharkas.component.ts:154](https://github.com/WorldMaker/angular-pharkas/blob/b6a6991/projects/angular-pharkas/src/pharkas.component.ts#L154)
