export default interface ResourceGroup {
    id: string
    name: string
    type: string
    location: string
    tags: { [key: string]: string }
    properties: { [key: string]: string }
}
