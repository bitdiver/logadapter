[@bitdiver/logadapter](../README.md) / [Exports](../modules.md) / LogAdapterConsoleJson

# Class: LogAdapterConsoleJson

Implements a Logadaper whoch writes the log as JSON

## Hierarchy

- [`LogAdapterConsole`](LogAdapterConsole.md)

  ↳ **`LogAdapterConsoleJson`**

## Table of contents

### Constructors

- [constructor](LogAdapterConsoleJson.md#constructor)

### Properties

- [level](LogAdapterConsoleJson.md#level)
- [timeFormat](LogAdapterConsoleJson.md#timeformat)

### Accessors

- [levelName](LogAdapterConsoleJson.md#levelname)
- [levelNumber](LogAdapterConsoleJson.md#levelnumber)

### Methods

- [\_logRun](LogAdapterConsoleJson.md#_logrun)
- [\_logStep](LogAdapterConsoleJson.md#_logstep)
- [\_logTestcase](LogAdapterConsoleJson.md#_logtestcase)
- [\_writeLog](LogAdapterConsoleJson.md#_writelog)
- [log](LogAdapterConsoleJson.md#log)
- [reset](LogAdapterConsoleJson.md#reset)

## Constructors

### constructor

• **new LogAdapterConsoleJson**(`opts?`)

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

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[_logRun](LogAdapterConsole.md#_logrun)

#### Defined in

[LogAdapterConsole.ts:97](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L97)

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

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[_logStep](LogAdapterConsole.md#_logstep)

#### Defined in

[LogAdapterConsole.ts:132](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L132)

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

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[_logTestcase](LogAdapterConsole.md#_logtestcase)

#### Defined in

[LogAdapterConsole.ts:113](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L113)

___

### \_writeLog

▸ **_writeLog**(`logMessage`): `Promise`<`void`\>

This method will do the work. It is called by the log method
if the logLevel of the message shows that the message is relavant for logging

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | The message to be logged |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Overrides

[LogAdapterConsole](LogAdapterConsole.md).[_writeLog](LogAdapterConsole.md#_writelog)

#### Defined in

[LogAdapterConsoleJson.ts:17](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsoleJson.ts#L17)

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

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[reset](LogAdapterConsole.md#reset)

#### Defined in

[LogAdapterConsole.ts:54](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L54)
