export default interface RoleAssignment {
    id: string
    roleDefinitionId: string
    principalId: string
    scope: string
    principalType: string
}
