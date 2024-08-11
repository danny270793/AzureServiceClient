export default interface CacheProvider {
  exists: (key: string) => Promise<boolean>
  write: (key: string, payload: any) => Promise<void>
  read: (key: string) => Promise<any>
}
