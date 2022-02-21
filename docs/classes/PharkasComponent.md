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

### Properties

- [[props]](PharkasComponent.md#[props])
- [[state]](PharkasComponent.md#[state])
- [[subscription]](PharkasComponent.md#[subscription])

### Methods

- [bind](PharkasComponent.md#bind)
- [bindEffect](PharkasComponent.md#bindeffect)
- [bindImmediate](PharkasComponent.md#bindimmediate)
- [bindImmediateEffect](PharkasComponent.md#bindimmediateeffect)
- [bindOutput](PharkasComponent.md#bindoutput)
- [bindable](PharkasComponent.md#bindable)
- [createCallback](PharkasComponent.md#createcallback)
- [createInput](PharkasComponent.md#createinput)
- [getOrCreateInput](PharkasComponent.md#getorcreateinput)
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

[pharkas.component.ts:86](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L86)

## Properties

### [props]

• `Private` **[props]**: `Map`<keyof `TViewModel`, `PharkasProp`<`unknown`\>\>

#### Defined in

[pharkas.component.ts:80](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L80)

___

### [state]

• `Private` **[state]**: `WeakMap`<`PharkasComponentState`<`unknown`\>, `BehaviorSubject`<`unknown`\>\>

#### Defined in

[pharkas.component.ts:81](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L81)

___

### [subscription]

• `Private` **[subscription]**: `Subscription`

#### Defined in

[pharkas.component.ts:79](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L79)

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

[pharkas.component.ts:200](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L200)

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

[pharkas.component.ts:315](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L315)

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

[pharkas.component.ts:227](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L227)

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

[pharkas.component.ts:340](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L340)

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

[pharkas.component.ts:253](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L253)

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

[pharkas.component.ts:182](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L182)

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

[pharkas.component.ts:267](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L267)

___

### createInput

▸ `Private` **createInput**<`T`, `U`\>(`name`, `defaultValue?`): `PharkasInput`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `defaultValue?` | `U` |

#### Returns

`PharkasInput`<`T`\>

#### Defined in

[pharkas.component.ts:90](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L90)

___

### getOrCreateInput

▸ `Private` **getOrCreateInput**<`P`, `T`, `U`, `TDefault`\>(`name`, `defaultValue?`): `PharkasInput`<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `string` \| `number` \| `symbol` |
| `T` | `T` |
| `U` | extends `unknown` |
| `TDefault` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `P` |
| `defaultValue?` | `TDefault` |

#### Returns

`PharkasInput`<`U`\>

#### Defined in

[pharkas.component.ts:120](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L120)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[pharkas.component.ts:398](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L398)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[pharkas.component.ts:360](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L360)

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

[pharkas.component.ts:142](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L142)

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

[pharkas.component.ts:290](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L290)

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

[pharkas.component.ts:163](https://github.com/WorldMaker/angular-pharkas/blob/0f49e89/projects/angular-pharkas/src/pharkas.component.ts#L163)
