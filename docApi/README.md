@bitdiver/logadapter / [Exports](modules.md)

# LogAdapter

The log adapter is used to handle the log calls. All the log events from
the steps or the runner will be forwarded to the registered log adapter.

# LogAdapterConsole

This logger just logs to the console output. It implements the main
logic other log adapter may need.

This LogAdapter is intended to be used as a base class for other
adapters.

## Konfiguration options

**configuration**

    const opts = {
      logLevel: 'error'                        
      timeFormat: 'yyyy-MM-dd HH:mm:ss.SSS ZZ' 
    }

-   The logLevel of the logger. Default is ''error''.

-   The time format used to display times in the log. The format comes
    from 'https://moment.github.io/luxon/' module.

## Methods

    logAdapter.log(logMessage) : promise

**Format of the logMessage**

    const logMessage = {
      meta: {                             
        run: {
          start: new Date(),
          id: 'runId',
          name: 'suite name',
        },
        tc: {                             
          countCurrent: tcCountCurrent,
          countAll: tcCountAll,
          id: 'tcId',
          name: 'great tc name',
        },
        step: {                           
          countCurrent: stepCountCurrent,
          countAll: stepCountAll,
          id: 'stepId',
          name: 'great step name',
          typ: 'singel',
        },
      },
      data: { anyKey: 'some value' },     
      logLevel: 'error',                  
    }

-   The 'run' section of the meta block is always there. No log without
    a run. This is filled automatically.

-   If the log comes from a test case or a step also the 'tc' section is
    provided. This is filled automatically.

-   The 'step' section is only provided if the log was initiated by a
    step. This is filled automatically.

-   The 'data' section contains the real message data.

-   The logLevel is also set automatically.

# LogAdapterMemory

This is a special implementation of a LogAdapter. Its mainly used for
testing. If there is a unit test for a step this adapter could be used
to collect the created logs to validate them

**Format the data is stored**

    const this.logs = {   
      runId: {            
        logs:[{}, ...]    
        testcases: {}     
      }
    }

-   The data is stored under the property 'logs' of the LogAdapter.

-   The data is stored per run by the run Id. Normally there will be
    only one run at a time.

-   This log stores all the logs directly related to the run.

-   Logs which are related to a test case are stored by the test case
    instance id under this property.

**Format of the test case section**

    const testcase = {
      logs: []     
      steps: {}    
    }

-   This log stores all the logs directly related to the test case.

-   Logs which are related to a step are stored by the step instance id
    under this property.

**Format of the step section**

    const step = {
      logs: []    
    }

-   This log stores all the logs directly related to the step.

# LogAdapterFile

Stores the logs into a local file system. It will create one directory
per run. Then in the run directory one directory per test case. And
again in the test case one directory per step.

## Konfiguration options

**configuration**

    const opts = {
      targetDir: 'logs'                        
      timeFormatFileName: 'yyyy-MM-dd_HHmmss'  
    }

-   The constructor arguments are the 'targetDir'. All the logs will be
    stored under this directory. This parameter defaults to ''log''

-   The format used to create the file names.
