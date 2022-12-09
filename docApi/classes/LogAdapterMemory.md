[@bitdiver/logadapter](../README.md) / [Exports](../modules.md) / LogAdapterMemory

# Class: LogAdapterMemory

Implements a console logAdapter

## Hierarchy

- [`LogAdapterConsole`](LogAdapterConsole.md)

  ↳ **`LogAdapterMemory`**

## Table of contents

### Constructors

- [constructor](LogAdapterMemory.md#constructor)

### Properties

- [level](LogAdapterMemory.md#level)
- [logs](LogAdapterMemory.md#logs)
- [timeFormat](LogAdapterMemory.md#timeformat)

### Accessors

- [levelName](LogAdapterMemory.md#levelname)
- [levelNumber](LogAdapterMemory.md#levelnumber)

### Methods

- [\_logRun](LogAdapterMemory.md#_logrun)
- [\_logStep](LogAdapterMemory.md#_logstep)
- [\_logTestcase](LogAdapterMemory.md#_logtestcase)
- [\_prepareRun](LogAdapterMemory.md#_preparerun)
- [\_prepareTestcase](LogAdapterMemory.md#_preparetestcase)
- [\_writeLog](LogAdapterMemory.md#_writelog)
- [log](LogAdapterMemory.md#log)
- [reset](LogAdapterMemory.md#reset)

## Constructors

### constructor

• **new LogAdapterMemory**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `LogAdapterOptions` |

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[constructor](LogAdapterConsole.md#constructor)

#### Defined in

[LogAdapterConsole.ts:18](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L18)

## Properties

### level

• **level**: `number`

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[level](LogAdapterConsole.md#level)

#### Defined in

[LogAdapterConsole.ts:15](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L15)

___

### logs

• **logs**: `any` = `{}`

#### Defined in

[LogAdapterMemory.ts:8](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterMemory.ts#L8)

___

### timeFormat

• **timeFormat**: `string`

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[timeFormat](LogAdapterConsole.md#timeformat)

#### Defined in

[LogAdapterConsole.ts:16](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L16)

## Accessors

### levelName

• `get` **levelName**(): `string`

Returns the logLevel name as a string

#### Returns

`string`

The logLevel

#### Inherited from

LogAdapterConsole.levelName

#### Defined in

[LogAdapterConsole.ts:37](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L37)

___

### levelNumber

• `get` **levelNumber**(): `number`

Returns the logLevel as a number

#### Returns

`number`

The logLevel

#### Inherited from

LogAdapterConsole.levelNumber

#### Defined in

[LogAdapterConsole.ts:46](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L46)

## Methods

### \_logRun

▸ **_logRun**(`logMessage`): `Promise`<`void`\>

Logs the data of a run

**`See`**

LogMessageInterface

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | The message to be logged. |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Overrides

[LogAdapterConsole](LogAdapterConsole.md).[_logRun](LogAdapterConsole.md#_logrun)

#### Defined in

[LogAdapterMemory.ts:38](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterMemory.ts#L38)

___

### \_logStep

▸ **_logStep**(`logMessage`): `Promise`<`void`\>

Log the data of a step

**`See`**

LogMessageInterface

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | The message to be logged. |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Overrides

[LogAdapterConsole](LogAdapterConsole.md).[_logStep](LogAdapterConsole.md#_logstep)

#### Defined in

[LogAdapterMemory.ts:64](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterMemory.ts#L64)

___

### \_logTestcase

▸ **_logTestcase**(`logMessage`): `Promise`<`void`\>

Logs the data of a test case

**`See`**

LogMessageInterface

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | The message to be logged. |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Overrides

[LogAdapterConsole](LogAdapterConsole.md).[_logTestcase](LogAdapterConsole.md#_logtestcase)

#### Defined in

[LogAdapterMemory.ts:47](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterMemory.ts#L47)

___

### \_prepareRun

▸ **_prepareRun**(`runId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `runId` | `string` |

#### Returns

`void`

#### Defined in

[LogAdapterMemory.ts:14](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterMemory.ts#L14)

___

### \_prepareTestcase

▸ **_prepareTestcase**(`runId`, `testcaseName`, `meta`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `runId` | `string` |
| `testcaseName` | `string` |
| `meta` | `LogMessageMetaInterface` |

#### Returns

`void`

#### Defined in

[LogAdapterMemory.ts:23](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterMemory.ts#L23)

___

### \_writeLog

▸ **_writeLog**(`logMessage`): `Promise`<`void`\>

This method will do the work. It is called by the log method
if the logLevel of the message shows that the message is relavant for logging

**`See`**

LogMessageInterface

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | The message to be logged. |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[_writeLog](LogAdapterConsole.md#_writelog)

#### Defined in

[LogAdapterConsole.ts:77](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L77)

___

### log

▸ **log**(`logMessage`): `Promise`<`void`\>

Logs a message.

**`See`**

LogMessageInterface

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | The message to be logged. |

#### Returns

`Promise`<`void`\>

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[log](LogAdapterConsole.md#log)

#### Defined in

[LogAdapterConsole.ts:60](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L60)

___

### reset

▸ **reset**(): `Promise`<`void`\>

Clears all the existing log entries
Placeholder for the implementing loggers

#### Returns

`Promise`<`void`\>

#### Overrides

[LogAdapterConsole](LogAdapterConsole.md).[reset](LogAdapterConsole.md#reset)

#### Defined in

[LogAdapterMemory.ts:10](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterMemory.ts#L10)
