export default interface LinkedService {
    id: string
    name: string
    type: 'Microsoft.Synapse/workspaces/linkedservices'
    etag: string
    properties: {
        typeProperties: {
            url: string
        }
        type: string
        connectVia: {
            referenceName: string
            type: string
        }
    }
}
