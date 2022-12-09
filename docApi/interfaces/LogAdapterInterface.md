[@bitdiver/logadapter](../README.md) / [Exports](../modules.md) / LogAdapterInterface

# Interface: LogAdapterInterface

## Implemented by

- [`LogAdapterConsole`](../classes/LogAdapterConsole.md)

## Table of contents

### Properties

- [levelName](LogAdapterInterface.md#levelname)
- [levelNumber](LogAdapterInterface.md#levelnumber)
- [log](LogAdapterInterface.md#log)
- [reset](LogAdapterInterface.md#reset)

## Properties

### levelName

• **levelName**: `string`

Returns the logLevel name as a string

#### Defined in

[interfaceLogAdapter.ts:5](https://github.com/bitdiver/logadapter/blob/7755611/src/interfaceLogAdapter.ts#L5)

___

### levelNumber

• **levelNumber**: `number`

Returns the logLevel as a number

#### Defined in

[interfaceLogAdapter.ts:8](https://github.com/bitdiver/logadapter/blob/7755611/src/interfaceLogAdapter.ts#L8)

___

### log

• **log**: (`logMessage`: [`LogMessageInterface`](LogMessageInterface.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`logMessage`): `Promise`<`void`\>

Logs the message

##### Parameters

| Name | Type |
| :------ | :------ |
| `logMessage` | [`LogMessageInterface`](LogMessageInterface.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[interfaceLogAdapter.ts:14](https://github.com/bitdiver/logadapter/blob/7755611/src/interfaceLogAdapter.ts#L14)

___

### reset

• **reset**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Clears all the existing log entries

##### Returns

`Promise`<`void`\>

#### Defined in

[interfaceLogAdapter.ts:11](https://github.com/bitdiver/logadapter/blob/7755611/src/interfaceLogAdapter.ts#L11)
