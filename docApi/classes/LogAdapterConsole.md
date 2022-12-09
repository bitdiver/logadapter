[@bitdiver/logadapter](../README.md) / [Exports](../modules.md) / LogAdapterConsole

# Class: LogAdapterConsole

Implements a console logAdapter

## Hierarchy

- **`LogAdapterConsole`**

  ↳ [`LogAdapterConsoleJson`](LogAdapterConsoleJson.md)

  ↳ [`LogAdapterMemory`](LogAdapterMemory.md)

  ↳ [`LogAdapterFile`](LogAdapterFile.md)

## Implements

- [`LogAdapterInterface`](../interfaces/LogAdapterInterface.md)

## Table of contents

### Constructors

- [constructor](LogAdapterConsole.md#constructor)

### Properties

- [level](LogAdapterConsole.md#level)
- [timeFormat](LogAdapterConsole.md#timeformat)

### Accessors

- [levelName](LogAdapterConsole.md#levelname)
- [levelNumber](LogAdapterConsole.md#levelnumber)

### Methods

- [\_logRun](LogAdapterConsole.md#_logrun)
- [\_logStep](LogAdapterConsole.md#_logstep)
- [\_logTestcase](LogAdapterConsole.md#_logtestcase)
- [\_writeLog](LogAdapterConsole.md#_writelog)
- [log](LogAdapterConsole.md#log)
- [reset](LogAdapterConsole.md#reset)

## Constructors

### constructor

• **new LogAdapterConsole**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `LogAdapterOptions` |

#### Defined in

[LogAdapterConsole.ts:18](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L18)

## Properties

### level

• **level**: `number`

#### Defined in

[LogAdapterConsole.ts:15](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L15)

___

### timeFormat

• **timeFormat**: `string`

#### Defined in

[LogAdapterConsole.ts:16](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L16)

## Accessors

### levelName

• `get` **levelName**(): `string`

Returns the logLevel name as a string

#### Returns

`string`

The logLevel

#### Implementation of

[LogAdapterInterface](../interfaces/LogAdapterInterface.md).[levelName](../interfaces/LogAdapterInterface.md#levelname)

#### Defined in

[LogAdapterConsole.ts:37](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L37)

___

### levelNumber

• `get` **levelNumber**(): `number`

Returns the logLevel as a number

#### Returns

`number`

The logLevel

#### Implementation of

[LogAdapterInterface](../interfaces/LogAdapterInterface.md).[levelNumber](../interfaces/LogAdapterInterface.md#levelnumber)

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

#### Defined in

[LogAdapterConsole.ts:113](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L113)

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

#### Implementation of

LogAdapterInterface.log

#### Defined in

[LogAdapterConsole.ts:60](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L60)

___

### reset

▸ **reset**(): `Promise`<`void`\>

Clears all the existing log entries
Placeholder for the implementing loggers

#### Returns

`Promise`<`void`\>

#### Implementation of

LogAdapterInterface.reset

#### Defined in

[LogAdapterConsole.ts:54](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L54)
