export interface Activity {
  name: string
  type: string
  dependsOn: [
    {
      activity: string
      dependencyConditions: string[]
    },
  ]
  policy: {
    timeout: string
    retry: number
    retryIntervalInSeconds: number
    secureOutput: boolean
    secureInput: boolean
  }
  userProperties: string[]
  typeProperties: {
    source: {
      type: string
      storeSettings: {
        type: string
        recursive: boolean
        wildcardFolderPath: string
        wildcardFileName: string
        enablePartitionDiscovery: boolean
      }
    }
    sink: {
      type: string
      storeSettings: {
        type: string
      }
      formatSettings: {
        type: string
      }
    }
    enableStaging: boolean
    translator: {
      type: string
      typeConversion: boolean
      typeConversionSettings: {
        allowDataTruncation: boolean
        treatBooleanAsNumber: boolean
      }
    }
  }
  inputs: [
    {
      referenceName: string
      type: string
      parameters: { [key: string]: string }
    },
  ]
  outputs: [
    {
      referenceName: string
      type: string
      parameters: { [key: string]: string }
    },
  ]
}

export default interface Pipeline {
  id: string
  name: string
  type: 'Microsoft.Synapse/workspaces/pipelines'
  etag: string
  properties: {
    activities: Activity[]
    policy: {
      elapsedTimeMetric: { [key: string]: string }
      cancelAfter: { [key: string]: string }
    }
    folder: {
      name: string
    }
    annotations: []
    lastPublishTime: string
  }
}
