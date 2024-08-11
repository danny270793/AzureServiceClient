export default interface SQLPool {
    properties: {
        status: string
        maxSizeBytes: number
        collation: string
        creationDate: string
        storageAccountType: string
        provisioningState: string
    }
    sku: {
        name: string
        capacity: number
    }
    id: string
    name: string
    type: 'Microsoft.Synapse/workspaces/sqlPools'
    location: string
    tags: { [key: string]: string }
}
