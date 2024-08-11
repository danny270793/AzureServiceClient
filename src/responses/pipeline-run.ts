export default interface PipelineRun {
    id: string
    runId: string
    debugRunId: null
    runGroupId: string
    pipelineName: string
    parameters: { [key: string]: string }
    invokedBy: {
        id: string
        name: string
        invokedByType: string
        pipelineName: string
        pipelineRunId: string
    }
    runStart: string
    runEnd: string
    durationInMs: number
    status: string
    message: string
    pipelineReturnValue: { [key: string]: string }
    lastUpdated: string
    annotations: string[]
    runDimension: { [key: string]: string }
    isLatest: boolean
}
