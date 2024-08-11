export default interface IntegrationRuntime {
    id: string
    name: string
    type: 'Microsoft.Synapse/workspaces/integrationruntimes'
    properties: {
        type: string
        typeProperties: {
            computeProperties: {
                location: string
            }
        }
        provisioningState: null
    }
    etag: string
}
