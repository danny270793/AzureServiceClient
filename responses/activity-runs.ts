export interface Error {
  errorCode: string
  message: string
  failureType: string
  target: string
  details: string
}

export interface Input {
  pipeline: {
    referenceName: string
    type: string
  }
  waitOnCompletion: boolean
  parameters: any
}

export interface Output {
  pipelineName: string
  pipelineRunId: string
}

export interface ActivityRun {
  // The name of the activity.
  activityName: string

  // The end time of the activity run in 'ISO 8601' format.
  activityRunEnd: string

  // The id of the activity run.
  activityRunId: string

  // The start time of the activity run in 'ISO 8601' format.
  activityRunStart: string

  // The type of the activity.
  activityType: string

  // The duration of the activity run.
  durationInMs: number

  // The error if any from the activity run.
  error: any

  // The input for the activity.
  input: any

  // The name of the compute linked service.
  linkedServiceName: string

  // The output for the activity.
  output: any

  // The name of the pipeline.
  pipelineName: string

  // The id of the pipeline run.
  pipelineRunId: string

  // The status of the activity run.
  status: string

  userProperties: any|undefined
}

export default interface ActivityRuns {
  value: ActivityRun[]
  continuationToken: string
}
