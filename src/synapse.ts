import Base from './base'
import LinkedService from './responses/linked-service'
import DataFlow from './responses/dataflow'
import Dataset from './responses/dataset'
import IntegrationRuntime from './responses/integration-runtime'
import Pipeline from './responses/pipeline'
import SQLPool from './responses/sql-pool'
import SQLScript from './responses/sql-script'
import Trigger from './responses/trigger'
import RoleAssignment from './responses/role-assigment'
import PipelineRun from './responses/pipeline-run'

export default class Synapse extends Base {
    getLoginResource(): string {
        return 'https://dev.azuresynapse.net/'
    }

    async getAllObjects(workspace: string): Promise<any[]> {
        return await Promise.all([
            this.getTriggers(workspace),
            this.getSqlScripts(workspace),
            this.getSqlPools(workspace),
            this.getPipelines(workspace),
            this.getLinkedservices(workspace),
            this.getIntegrationRuntimes(workspace),
            this.getDatasets(workspace),
            this.getDataflows(workspace),
            this.getRoleAssignments(workspace),
        ])
    }

    async getTriggers(workspace: string): Promise<Trigger[]> {
        return (
            await this.get(
                `https://${workspace}.dev.azuresynapse.net/triggers`,
                {
                    'api-version': '2020-12-01',
                },
            )
        ).value
    }

    async getDataflows(workspace: string): Promise<DataFlow[]> {
        return (
            await this.get(
                `https://${workspace}.dev.azuresynapse.net/dataflows`,
                {
                    'api-version': '2020-12-01',
                },
            )
        ).value
    }

    async getSqlScripts(workspace: string): Promise<SQLScript[]> {
        return (
            await this.get(
                `https://${workspace}.dev.azuresynapse.net/sqlScripts`,
                {
                    'api-version': '2020-12-01',
                },
            )
        ).value
    }

    async getIntegrationRuntimes(
        workspace: string,
    ): Promise<IntegrationRuntime[]> {
        return (
            await this.get(
                `https://${workspace}.dev.azuresynapse.net/integrationRuntimes`,
                { 'api-version': '2020-12-01' },
            )
        ).value
    }

    async getSqlPools(workspace: string): Promise<SQLPool[]> {
        return (
            await this.get(
                `https://${workspace}.dev.azuresynapse.net/sqlPools`,
                {
                    'api-version': '2020-12-01',
                },
            )
        ).value
    }

    async getPipelines(workspace: string): Promise<Pipeline[]> {
        return (
            await this.get(
                `https://${workspace}.dev.azuresynapse.net/pipelines`,
                {
                    'api-version': '2020-12-01',
                },
            )
        ).value
    }

    async getLinkedservices(workspace: string): Promise<LinkedService[]> {
        return (
            await this.get(
                `https://${workspace}.dev.azuresynapse.net/linkedservices`,
                { 'api-version': '2020-12-01' },
            )
        ).value
    }

    async getDatasets(workspace: string): Promise<Dataset[]> {
        return (
            await this.get(
                `https://${workspace}.dev.azuresynapse.net/datasets`,
                {
                    'api-version': '2020-12-01',
                },
            )
        ).value
    }

    async getRoleAssignments(workspace: string): Promise<RoleAssignment[]> {
        return (
            await this.get(
                `https://${workspace}.dev.azuresynapse.net/roleAssignments`,
                { 'api-version': '2020-12-01' },
            )
        ).value
    }

    async getAtivitiesRuns(
        workspace: string,
        pipelineName: string,
        runId: string,
        from: Date,
        to: Date,
    ): Promise<any[]> {
        const activityRuns: any[] = []
        let continuationToken: string | undefined
        let hasMoreRecords: boolean = true
        while (hasMoreRecords) {
            const payload: any = {
                lastUpdatedAfter: from,
                lastUpdatedBefore: to,
                continuationToken,
            }
            const data: any = await this.post(
                `https://${workspace}.dev.azuresynapse.net/pipelines/${pipelineName}/pipelineruns/${runId}/queryActivityruns`,
                payload,
                { 'api-version': '2020-12-01' },
            )
            activityRuns.push(...data.value)
            continuationToken = data.continuationToken
            hasMoreRecords = continuationToken !== undefined
        }
        return activityRuns
    }

    async getPipelineRuns(
        workspace: string,
        from: Date,
        to: Date,
    ): Promise<PipelineRun[]> {
        const pipelineRuns: any[] = []
        let continuationToken: string | undefined
        let hasMoreRecords: boolean = true
        while (hasMoreRecords) {
            const payload: any = {
                lastUpdatedAfter: from,
                lastUpdatedBefore: to,
                continuationToken,
            }
            const data: any = await this.post(
                `https://${workspace}.dev.azuresynapse.net/queryPipelineRuns`,
                payload,
                { 'api-version': '2020-12-01' },
            )
            pipelineRuns.push(...data.value)
            continuationToken = data.continuationToken
            hasMoreRecords = continuationToken !== undefined
        }
        return pipelineRuns
    }
}
