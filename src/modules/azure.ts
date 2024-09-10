import ResourceGroup from '../responses/resource-group'
import Resource from '../responses/resource'
import Base from './base'

export default class Azure extends Base {
    getLoginResource(): string {
        return 'https://management.azure.com/'
    }

    async getVirtualMachine(resourceGroupName: string, name: string): Promise<any> {
        return (
            await this.get(
                `subscriptions/${this.getSubscriptionId()}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${name}`,
                { 'api-version': '2024-07-01' },
            )
        )
    }

    async getVirtualMachineInstanceView(resourceGroupName: string, name: string): Promise<any> {
        return (
            await this.get(
                `subscriptions/${this.getSubscriptionId()}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${name}/instanceView`,
                { 'api-version': '2024-07-01' },
            )
        )
    }

    async getResourceByResourceGroup(
        resourceGroupName: string,
    ): Promise<Resource[]> {
        return (
            await this.get(
                `subscriptions/${this.getSubscriptionId()}/resourceGroups/${resourceGroupName}/resources`,
                { 'api-version': '2021-04-01' },
            )
        ).value
    }

    async getResourceGroups(): Promise<ResourceGroup[]> {
        return (
            await this.get(
                `subscriptions/${this.getSubscriptionId()}/resourcegroups`,
                { 'api-version': '2021-04-01' },
            )
        ).value
    }

    async getPricingDaily(
        resourceGroupName: string,
        from: Date,
        to: Date,
    ): Promise<any[]> {
        const payload: any = {
            type: 'Usage',
            timeframe: 'Custom',
            timePeriod: {
                from: from.toISOString(),
                to: to.toISOString(),
            },
            dataset: {
                granularity: 'Daily',
                aggregation: {
                    totalCost: {
                        name: 'Cost',
                        function: 'Sum',
                    },
                },

                grouping: [
                    {
                        type: 'Dimension',
                        name: 'ResourceId',
                    },
                ],
                orderby: [
                    {
                        column: 'UsageDate',
                        direction: 'Asc',
                    },
                ],
            },
        }
        const properties: any = (
            await this.post(
                `subscriptions/${this.getSubscriptionId()}/resourceGroups/${resourceGroupName}/providers/Microsoft.CostManagement/query`,
                payload,
                { 'api-version': '2019-11-01' },
            )
        ).properties
        const columns: Array<{ name: string; type: string }> =
            properties.columns
        return properties.rows.map((row: any[]) => {
            const rowAsDictionary: { [key: string]: string } = {}
            row.forEach((column, index) => {
                rowAsDictionary[columns[index].name] = column
            })
            return rowAsDictionary
        })
    }
}
