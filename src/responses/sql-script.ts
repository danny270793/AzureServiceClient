export default interface SQLScript {
    id: string
    name: string
    type: 'Microsoft.Synapse/workspaces/sqlscripts'
    etag: string
    properties: {
        content: {
            query: string
            metadata: {
                language: string
            }
            currentConnection: {
                databaseName: string
                poolName: string
            }
            resultLimit: number
        }
        type: string
    }
}
