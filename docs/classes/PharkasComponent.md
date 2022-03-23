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
- [pharkasImmediateTemplateError](PharkasComponent.md#pharkasimmediatetemplateerror)
- [pharkasTemplateError](PharkasComponent.md#pharkastemplateerror)
- [pharkasTemplateStopped](PharkasComponent.md#pharkastemplatestopped)

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

[pharkas.component.ts:129](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L129)

## Accessors

### pharkasEffectError

• `get` **pharkasEffectError**(): `boolean`

An error has been observed in any observable applied to `bindEffect` or
`bindEffectImmediate`.

#### Returns

`boolean`

#### Defined in

[pharkas.component.ts:104](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L104)

___

### pharkasError

• `get` **pharkasError**(): `boolean`

An error has been observed in any observable applied to `bind`, `bindImmediate`,
`bindEffect`, or `bindEffectImmediate`.

#### Returns

`boolean`

#### Defined in

[pharkas.component.ts:93](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L93)

___

### pharkasImmediateTemplateError

• `get` **pharkasImmediateTemplateError**(): `boolean`

An error has been observed in any observable applied to `bindImmediate`.

#### Returns

`boolean`

#### Defined in

[pharkas.component.ts:117](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L117)

___

### pharkasTemplateError

• `get` **pharkasTemplateError**(): `boolean`

An error has been observed in any observable applied to `bind` or `bindImmediate`.

#### Returns

`boolean`

#### Defined in

[pharkas.component.ts:123](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L123)

___

### pharkasTemplateStopped

• `get` **pharkasTemplateStopped**(): `boolean`

An error has been observed in any observable applied to `bind`. Change detection
has *stopped* for all `bind` bound template observables.

#### Returns

`boolean`

#### Defined in

[pharkas.component.ts:111](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L111)

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

[pharkas.component.ts:243](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L243)

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

[pharkas.component.ts:358](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L358)

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

[pharkas.component.ts:270](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L270)

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

[pharkas.component.ts:386](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L386)

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

[pharkas.component.ts:296](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L296)

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

[pharkas.component.ts:225](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L225)

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

[pharkas.component.ts:310](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L310)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[pharkas.component.ts:464](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L464)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[pharkas.component.ts:409](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L409)

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

[pharkas.component.ts:185](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L185)

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

[pharkas.component.ts:333](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L333)

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

[pharkas.component.ts:206](https://github.com/WorldMaker/angular-pharkas/blob/0eb4ab5/projects/angular-pharkas/src/pharkas.component.ts#L206)
