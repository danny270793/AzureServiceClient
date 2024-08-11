import Axios, { AxiosResponse } from 'axios'
import ActivityRuns, { ActivityRun } from './responses/activity-runs'
import LoginResponse from './responses/login-response'
import PipelineRuns, { PipelineRun } from './responses/pipeline-runs'

export default class DataFactory {
    private readonly subscriptionId: string
    private readonly resourceGroupName: string
    private readonly factoryName: string
    private readonly tenantId: string
    private readonly clientId: string
    private readonly clientSecret: string
    private readonly loginResponse: LoginResponse | undefined

    private async getLoginResponse(): Promise<LoginResponse> {
        if (this.loginResponse === undefined) {
            return await this.login(
                this.tenantId,
                this.clientId,
                this.clientSecret,
            )
        }
        return this.loginResponse
    }

    constructor(
        subscriptionId: string,
        resourceGroupName: string,
        factoryName: string,
        tenantId: string,
        clientId: string,
        clientSecret: string,
    ) {
        this.subscriptionId = subscriptionId
        this.resourceGroupName = resourceGroupName
        this.factoryName = factoryName
        this.tenantId = tenantId
        this.clientId = clientId
        this.clientSecret = clientSecret
    }

    async login(
        tenantId: string,
        clientId: string,
        clientSecret: string,
    ): Promise<LoginResponse> {
        const url: string = `https://login.microsoftonline.com/${tenantId}/oauth2/token`
        const body: { [key: string]: string } = {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            resource: 'https://management.azure.com/',
        }
        const response: AxiosResponse<LoginResponse> = await Axios({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: new URLSearchParams(body),
        })
        return response.data
    }

    async getPipelineRunsThisMonth(): Promise<PipelineRun[]> {
        const now: Date = new Date(Date.now())
        const firstMonthDay: Date = new Date(Date.now())
        firstMonthDay.setDate(1)
        return await this.getPipelineRunsBetween(firstMonthDay, now)
    }

    async getPipelineRunsBetween(from: Date, to: Date): Promise<PipelineRun[]> {
        const url: string = `https://management.azure.com/subscriptions/${this.subscriptionId}/resourceGroups/${this.resourceGroupName}/providers/Microsoft.DataFactory/factories/${this.factoryName}/queryPipelineRuns?api-version=2018-06-01`

        const pipelineRuns: PipelineRun[] = []
        let continuationToken: string | undefined

        let hasMoreRecords: boolean = true
        while (hasMoreRecords) {
            const loginResponse: LoginResponse = await this.getLoginResponse()
            const response: AxiosResponse<PipelineRuns> = await Axios({
                method: 'post',
                url,
                headers: {
                    authorization: `Bearer ${loginResponse.access_token}`,
                    'Content-Type': 'application/json',
                },
                data: {
                    lastUpdatedAfter: from,
                    lastUpdatedBefore: to,
                    continuationToken,
                },
            })
            pipelineRuns.push(...response.data.value)
            continuationToken = response.data.continuationToken
            hasMoreRecords = continuationToken !== undefined
        }

        return pipelineRuns
    }

    async getPipelineRun(runId: string): Promise<PipelineRun> {
        const url: string = `https://management.azure.com/subscriptions/${this.subscriptionId}/resourceGroups/${this.resourceGroupName}/providers/Microsoft.DataFactory/factories/${this.factoryName}/pipelineruns/${runId}?api-version=2018-06-01`
        const loginResponse: LoginResponse = await this.getLoginResponse()
        const response: AxiosResponse<PipelineRun> = await Axios({
            method: 'get',
            url,
            headers: {
                authorization: `Bearer ${loginResponse.access_token}`,
            },
        })
        return response.data
    }

    async getActivitiesRunThisMonth(runId: string): Promise<ActivityRun[]> {
        const now: Date = new Date(Date.now())
        const firstMonthDay: Date = new Date(Date.now())
        firstMonthDay.setDate(1)

        return await this.getActivitiesRunBetween(runId, firstMonthDay, now)
    }

    async getActivitiesRunBetween(
        runId: string,
        from: Date,
        to: Date,
    ): Promise<ActivityRun[]> {
        const url: string = `https://management.azure.com/subscriptions/${this.subscriptionId}/resourceGroups/${this.resourceGroupName}/providers/Microsoft.DataFactory/factories/${this.factoryName}/pipelineruns/${runId}/queryActivityruns?api-version=2018-06-01`

        const activityRuns: ActivityRun[] = []
        let continuationToken: string | undefined

        let hasMoreRecords: boolean = true
        while (hasMoreRecords) {
            const loginResponse: LoginResponse = await this.getLoginResponse()
            const response: AxiosResponse<ActivityRuns> = await Axios({
                method: 'post',
                url,
                headers: {
                    authorization: `Bearer ${loginResponse.access_token}`,
                },
                data: {
                    lastUpdatedAfter: from,
                    lastUpdatedBefore: to,
                    continuationToken,
                },
            })
            activityRuns.push(...response.data.value)
            continuationToken = response.data.continuationToken
            hasMoreRecords = continuationToken !== undefined
        }
        return activityRuns
    }
}
