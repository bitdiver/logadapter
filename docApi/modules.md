[@bitdiver/logadapter](README.md) / Exports

# @bitdiver/logadapter

## Table of contents

### Classes

- [LogAdapterConsole](classes/LogAdapterConsole.md)
- [LogAdapterConsoleJson](classes/LogAdapterConsoleJson.md)
- [LogAdapterFile](classes/LogAdapterFile.md)
- [LogAdapterMemory](classes/LogAdapterMemory.md)

### Interfaces

- [LogAdapterInterface](interfaces/LogAdapterInterface.md)
- [LogMessageInterface](interfaces/LogMessageInterface.md)

### Variables

- [DEFAULT\_TIME\_FORMAT](modules.md#default_time_format)
- [DEFAULT\_TIME\_FORMAT\_FILE](modules.md#default_time_format_file)
- [LEVEL\_DEBUG](modules.md#level_debug)
- [LEVEL\_ERROR](modules.md#level_error)
- [LEVEL\_FATAL](modules.md#level_fatal)
- [LEVEL\_INFO](modules.md#level_info)
- [LEVEL\_WARNING](modules.md#level_warning)

### Functions

- [getLogAdapterConsole](modules.md#getlogadapterconsole)
- [getLogAdapterConsoleJson](modules.md#getlogadapterconsolejson)
- [getLogAdapterFile](modules.md#getlogadapterfile)
- [getLogAdapterMemory](modules.md#getlogadaptermemory)

## Variables

### DEFAULT\_TIME\_FORMAT

• `Const` **DEFAULT\_TIME\_FORMAT**: ``"yyyy-MM-dd HH:mm:ss.SSS ZZ"``

#### Defined in

[constants.ts:1](https://github.com/bitdiver/logadapter/blob/7755611/src/constants.ts#L1)

___

### DEFAULT\_TIME\_FORMAT\_FILE

• `Const` **DEFAULT\_TIME\_FORMAT\_FILE**: ``"yyyy-MM-dd_HHmmss"``

#### Defined in

[constants.ts:2](https://github.com/bitdiver/logadapter/blob/7755611/src/constants.ts#L2)

___

### LEVEL\_DEBUG

• `Const` **LEVEL\_DEBUG**: ``"debug"``

#### Defined in

[logLevel.ts:11](https://github.com/bitdiver/logadapter/blob/7755611/src/logLevel.ts#L11)

___

### LEVEL\_ERROR

• `Const` **LEVEL\_ERROR**: ``"error"``

#### Defined in

[logLevel.ts:14](https://github.com/bitdiver/logadapter/blob/7755611/src/logLevel.ts#L14)

___

### LEVEL\_FATAL

• `Const` **LEVEL\_FATAL**: ``"fatal"``

#### Defined in

[logLevel.ts:15](https://github.com/bitdiver/logadapter/blob/7755611/src/logLevel.ts#L15)

___

### LEVEL\_INFO

• `Const` **LEVEL\_INFO**: ``"info"``

#### Defined in

[logLevel.ts:12](https://github.com/bitdiver/logadapter/blob/7755611/src/logLevel.ts#L12)

___

### LEVEL\_WARNING

• `Const` **LEVEL\_WARNING**: ``"warning"``

#### Defined in

[logLevel.ts:13](https://github.com/bitdiver/logadapter/blob/7755611/src/logLevel.ts#L13)

## Functions

### getLogAdapterConsole

▸ **getLogAdapterConsole**(`opts?`): [`LogAdapterConsole`](classes/LogAdapterConsole.md)

returns the logAdapter

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `LogAdapterOptions` |

#### Returns

[`LogAdapterConsole`](classes/LogAdapterConsole.md)

#### Defined in

[index.ts:34](https://github.com/bitdiver/logadapter/blob/7755611/src/index.ts#L34)

___

### getLogAdapterConsoleJson

▸ **getLogAdapterConsoleJson**(`opts?`): [`LogAdapterConsoleJson`](classes/LogAdapterConsoleJson.md)

returns the logAdapter

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `LogAdapterOptions` |

#### Returns

[`LogAdapterConsoleJson`](classes/LogAdapterConsoleJson.md)

#### Defined in

[index.ts:44](https://github.com/bitdiver/logadapter/blob/7755611/src/index.ts#L44)

___

### getLogAdapterFile

▸ **getLogAdapterFile**(`opts?`): [`LogAdapterFile`](classes/LogAdapterFile.md)

returns the logAdapter

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `LogAdapterOptions` |

#### Returns

[`LogAdapterFile`](classes/LogAdapterFile.md)

#### Defined in

[index.ts:66](https://github.com/bitdiver/logadapter/blob/7755611/src/index.ts#L66)

___

### getLogAdapterMemory

▸ **getLogAdapterMemory**(`opts?`): [`LogAdapterMemory`](classes/LogAdapterMemory.md)

returns the logAdapter

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `LogAdapterOptions` |

#### Returns

[`LogAdapterMemory`](classes/LogAdapterMemory.md)

#### Defined in

[index.ts:56](https://github.com/bitdiver/logadapter/blob/7755611/src/index.ts#L56)
