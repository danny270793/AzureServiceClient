import { Azure } from '../src'
import { Resource, ResourceGroup } from '../src/responses'

async function main(): Promise<void> {
    const azureSubscriptionsNames: string[] = (process.env.AZURE_SUBSCRIPTION_NAMES || '').split(',')
    const azureSubscriptionsIds: string[] = (process.env.AZURE_SUBSCRIPTION_IDS || '').split(',')
    const azureTenantId: string = process.env.AZURE_TENANT_ID || ''
    const azureClientId: string = process.env.AZURE_CLIENT_ID || ''
    const azureClientSecret: string = process.env.AZURE_CLIENT_SECRET || ''

    for(let index: number = 0; index < azureSubscriptionsIds.length; index ++) {
        const azureSubscriptionId: string = azureSubscriptionsIds[index]
        const azure: Azure = new Azure(
            azureSubscriptionId,
            azureTenantId,
            azureClientId,
            azureClientSecret
        )

        const resourceGroups: ResourceGroup[] = await azure.getResourceGroups()
        for(const resourceGroup of resourceGroups) {
            const resouces: Resource[] = await azure.getResourceByResourceGroup(resourceGroup.name)
            for(const resouce of resouces) {
                //'Microsoft.MachineLearningServices/workspaces', 'Microsoft.Sql/servers/databases', 'Microsoft.Databricks/workspaces', 'Microsoft.Sql/servers', 'Microsoft.Synapse/workspaces/bigDataPools', 'Microsoft.Synapse/workspaces/sqlPools'
                if(`${resouce.type}` === 'Microsoft.Compute/virtualMachines') {
                    const virtualMachineInstanceView: any = await azure.getVirtualMachineInstanceView(resourceGroup.name, resouce.name)
                    const instanceView: any = virtualMachineInstanceView['statuses'].filter((status: any) => status['code'].startsWith('PowerState'))[0]
                    if(instanceView['code'] !== 'PowerState/deallocated') {
                        console.log(`Virtual machine "${resouce.name}" on resouce group "${resourceGroup.name}" on subscription "${azureSubscriptionId}" called "${azureSubscriptionsNames[index]}" is not deallocated ${JSON.stringify(instanceView)}`)
                    }
                } else if(`${resouce.type}` === 'Microsoft.Fabric/capacities') {
                    console.log(resouce)
                }
            }
        }
    }

    console.log('done')
}

main().catch(console.error)
