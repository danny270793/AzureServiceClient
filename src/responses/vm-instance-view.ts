export interface virtualMachineInstanceViewStatus {
    code: string,
    level: string,
    displayStatus: string,
    time: string|undefined
}
export default interface virtualMachineInstanceView {
    disks: [
      {
        name: string,
        statuses: any[]
      }
    ],
    hyperVGeneration: string,
    statuses: virtualMachineInstanceViewStatus[]
}
