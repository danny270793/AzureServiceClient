export interface KeyVault {
    id: string
    name: string
    type: 'Microsoft.KeyVault/vaults'
    location: string
    tags: { [key: string]: string }
}

export interface Insights {
    id: string
    name: string
    type: 'Microsoft.Insights/components'
    kind: string
    location: string
    tags: { [key: string]: string }
}

export interface SmartDetectorAlertRules {
    id: string
    name: string
    type: 'microsoft.alertsmanagement/smartDetectorAlertRules'
    location: string
    tags: { [key: string]: string }
}

export interface MLStudioWorkspace {
    id: string
    name: string
    type: 'Microsoft.MachineLearningServices/workspaces'
    sku: { name: string; tier: string }
    kind: string
    location: string
    identity: {
        principalId: string
        tenantId: string
        type: string
    }
    tags: { [key: string]: string }
    systemData: {
        createdBy: string
        createdByType: string
        createdAt: string
        lastModifiedBy: string
        lastModifiedByType: string
        lastModifiedAt: string
    }
}

export interface StorageAccount {
    id: string
    name: string
    type: 'Microsoft.Storage/storageAccounts'
    sku: { name: string; tier: string }
    kind: string
    location: string
    identity: { type: string }
    tags: { [key: string]: string }
}

export interface SynapseWorkspace {
    id: string
    name: string
    type: 'Microsoft.Synapse/workspaces'
    location: string
    identity: {
        principalId: string
        tenantId: string
        type: string
    }
    tags: { [key: string]: string }
}

export interface SQLPool {
    id: string
    name: string
    type: 'Microsoft.Synapse/workspaces/sqlPools'
    sku: { name: string; capacity: number }
    location: string
    tags: { [key: string]: string }
}

type Resource =
    | KeyVault
    | Insights
    | SmartDetectorAlertRules
    | MLStudioWorkspace
    | StorageAccount
    | SynapseWorkspace
    | SQLPool
export default Resource
