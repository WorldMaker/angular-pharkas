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

### Accessors

- [pharkasEffectError](PharkasComponent.md#pharkaseffecterror)
- [pharkasError](PharkasComponent.md#pharkaserror)
- [pharkasTemplateError](PharkasComponent.md#pharkastemplateerror)

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

[pharkas.component.ts:157](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L157)

## Accessors

### pharkasEffectError

• `get` **pharkasEffectError**(): `boolean`

An error has been observed in any observable applied to `bindEffect` or
`bindEffectImmediate`.

#### Returns

`boolean`

#### Defined in

[pharkas.component.ts:145](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L145)

___

### pharkasError

• `get` **pharkasError**(): `boolean`

An error has been observed in any observable applied to `bind`, `bindImmediate`,
`bindEffect`, or `bindEffectImmediate`.

#### Returns

`boolean`

#### Defined in

[pharkas.component.ts:138](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L138)

___

### pharkasTemplateError

• `get` **pharkasTemplateError**(): `boolean`

An error has been observed in any observable applied to `bind` or `bindImmediate`.

#### Returns

`boolean`

#### Defined in

[pharkas.component.ts:151](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L151)

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

[pharkas.component.ts:271](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L271)

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

[pharkas.component.ts:390](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L390)

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

[pharkas.component.ts:300](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L300)

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

[pharkas.component.ts:418](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L418)

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

[pharkas.component.ts:328](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L328)

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

[pharkas.component.ts:253](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L253)

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

[pharkas.component.ts:342](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L342)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[pharkas.component.ts:497](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L497)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[pharkas.component.ts:441](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L441)

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

[pharkas.component.ts:213](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L213)

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

[pharkas.component.ts:365](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L365)

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

[pharkas.component.ts:234](https://github.com/WorldMaker/angular-pharkas/blob/3925255/projects/angular-pharkas/src/pharkas.component.ts#L234)
