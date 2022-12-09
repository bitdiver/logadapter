[@bitdiver/logadapter](../README.md) / [Exports](../modules.md) / LogAdapterFile

# Class: LogAdapterFile

Implements a logAdapter. The results are written to the file system

## Hierarchy

- [`LogAdapterConsole`](LogAdapterConsole.md)

  ↳ **`LogAdapterFile`**

## Table of contents

### Constructors

- [constructor](LogAdapterFile.md#constructor)

### Properties

- [level](LogAdapterFile.md#level)
- [targetDir](LogAdapterFile.md#targetdir)
- [timeFormat](LogAdapterFile.md#timeformat)
- [timeFormatFileName](LogAdapterFile.md#timeformatfilename)

### Accessors

- [levelName](LogAdapterFile.md#levelname)
- [levelNumber](LogAdapterFile.md#levelnumber)

### Methods

- [\_getFileName](LogAdapterFile.md#_getfilename)
- [\_getRunTargetPath](LogAdapterFile.md#_getruntargetpath)
- [\_logRun](LogAdapterFile.md#_logrun)
- [\_logStep](LogAdapterFile.md#_logstep)
- [\_logTestcase](LogAdapterFile.md#_logtestcase)
- [\_writeLog](LogAdapterFile.md#_writelog)
- [\_writeLogFile](LogAdapterFile.md#_writelogfile)
- [log](LogAdapterFile.md#log)
- [reset](LogAdapterFile.md#reset)

## Constructors

### constructor

• **new LogAdapterFile**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `LogAdapterFileOptions` |

#### Overrides

[LogAdapterConsole](LogAdapterConsole.md).[constructor](LogAdapterConsole.md#constructor)

#### Defined in

[LogAdapterFile.ts:25](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterFile.ts#L25)

## Properties

### level

• **level**: `number`

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[level](LogAdapterConsole.md#level)

#### Defined in

[LogAdapterConsole.ts:15](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L15)

___

### targetDir

• **targetDir**: `string`

#### Defined in

[LogAdapterFile.ts:20](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterFile.ts#L20)

___

### timeFormat

• **timeFormat**: `string`

#### Inherited from

[LogAdapterConsole](LogAdapterConsole.md).[timeFormat](LogAdapterConsole.md#timeformat)

#### Defined in

[LogAdapterConsole.ts:16](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterConsole.ts#L16)

___

### timeFormatFileName

• **timeFormatFileName**: `string` = `DEFAULT_TIME_FORMAT_FILE`

#### Defined in

[LogAdapterFile.ts:23](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterFile.ts#L23)

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

### \_getFileName

▸ **_getFileName**(`request`): `Promise`<`string`\>

Creates a new file name which does not exists. It will try to create a unique name until
it finds one

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Object` | The request as defined |
| `request.logLevel` | `string` | - |
| `request.targetPath` | `string`[] | - |
| `request.timeStamp` | `string` | - |

#### Returns

`Promise`<`string`\>

fileName - The created file name

#### Defined in

[LogAdapterFile.ts:146](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterFile.ts#L146)

___

### \_getRunTargetPath

▸ **_getRunTargetPath**(`meta`): `string`[]

Create the target Path segments from the run

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meta` | `LogMessageMetaInterface` | The meta information |

#### Returns

`string`[]

List of path segements

#### Defined in

[LogAdapterFile.ts:87](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterFile.ts#L87)

___

### \_logRun

▸ **_logRun**(`logMessage`): `Promise`<`void`\>

Logs the data of a run

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | The logMessage |

#### Returns

`Promise`<`void`\>

#### Overrides

[LogAdapterConsole](LogAdapterConsole.md).[_logRun](LogAdapterConsole.md#_logrun)

#### Defined in

[LogAdapterFile.ts:37](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterFile.ts#L37)

___

### \_logStep

▸ **_logStep**(`logMessage`): `Promise`<`void`\>

Log the data of a step

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | The logMessage |

#### Returns

`Promise`<`void`\>

#### Overrides

[LogAdapterConsole](LogAdapterConsole.md).[_logStep](LogAdapterConsole.md#_logstep)

#### Defined in

[LogAdapterFile.ts:63](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterFile.ts#L63)

___

### \_logTestcase

▸ **_logTestcase**(`logMessage`): `Promise`<`void`\>

Log the data of a test case

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | The logMessage |

#### Returns

`Promise`<`void`\>

#### Overrides

[LogAdapterConsole](LogAdapterConsole.md).[_logTestcase](LogAdapterConsole.md#_logtestcase)

#### Defined in

[LogAdapterFile.ts:46](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterFile.ts#L46)

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

### \_writeLogFile

▸ **_writeLogFile**(`request`): `Promise`<`void`\>

Writes the log to the target directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Object` | The request as described |
| `request.logMessage` | [`LogMessageInterface`](../interfaces/LogMessageInterface.md) | - |
| `request.targetPath` | `string`[] | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[LogAdapterFile.ts:103](https://github.com/bitdiver/logadapter/blob/7755611/src/LogAdapterFile.ts#L103)

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
