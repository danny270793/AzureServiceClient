export interface Schema {
    name: string
    type: string
}

export default interface Dataset {
    id: string
    name: string
    type: 'Microsoft.Synapse/workspaces/datasets'
    etag: string
    properties: {
        linkedServiceName: {
            referenceName: string
            type: string
        }
        annotations: string[]
        type: string
        typeProperties: {
            location: {
                type: string
                folderPath: string
                fileSystem: string
            }
            compressionCodec: string
        }
        schema: Schema[]
    }
}
