export interface PipelineRunInvokedBy {
  // The ID of the entity that started the run.
  id: string

  // The type of the entity that started the run.
  invokedByType: string

  // Name of the entity that started the pipeline run.
  name: string

  // The name of the pipeline that triggered the run, if any.
  pipelineName: string

  // The run id of the pipeline that triggered the run, if any.
  pipelineRunId: string
}

export interface PipelineRun {
  // The duration of a pipeline run.
  durationInMs: number

  // Entity that started the pipeline run.
  invokedBy: PipelineRunInvokedBy

  // Indicates if the recovered pipeline run is the latest in its group.
  isLatest: boolean

  // The last updated timestamp for the pipeline run event in ISO8601 format.
  lastUpdated: string

  // The message from a pipeline run.
  message: string

  // The full or partial list of parameter name, value pair used in the pipeline run.
  parameters: any

  // The pipeline name.
  pipelineName: string

  // Run dimensions emitted by Pipeline run.
  runDimensions: any

  // The end time of a pipeline run in ISO8601 format.
  runEnd: string

  // Identifier that correlates all the recovery runs of a pipeline run.
  runGroupId: string

  // Identifier of a run.
  runId: string

  // The start time of a pipeline run in ISO8601 format.
  runStart: string

  // The status of a pipeline run. Possible values: Queued, InProgress, Succeeded, Failed, Canceling, Cancelled
  status: string
}

export default interface PipelineRuns {
  value: PipelineRun[]
  continuationToken: string
}
