export interface Pipeline {
    pipelineReference: {
        referenceName: string
        type: string
    }
    parameters: any
}

export default interface Trigger {
    id: string
    name: string
    type: 'Microsoft.Synapse/workspaces/triggers'
    etag: string
    properties: {
        annotations: string[]
        pipelines: Pipeline[]
        type: 'ScheduleTrigger'
        typeProperties: {
            recurrence: {
                frequency: string
                interval: number
                startTime: string
                timeZone: string
                schedule: {
                    minutes: number[]
                    hours: number[]
                }
            }
        }
        runtimeState: string
    }
}
