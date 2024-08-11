import Base from './base'
import Resource from './responses/resource'

type GetFoldersWithSizeCallback = (path: string, total: number) => Promise<void>

interface Container {
  etag: string
  lastModified: string
  name: string
}

interface ContainerContent {
  contentLength: string
  etag: string
  lastModified: string
  name: string
}

export default class StorageAccount extends Base {
  getLoginResource(): string {
    return 'https://storage.azure.com/'
  }

  async getContainers(datalakeName: string): Promise<any> {
    return (
      await this.get(`https://${datalakeName}.dfs.core.windows.net`, {
        resource: 'account',
      })
    ).filesystems
  }

  async getContent(
    datalakeName: string,
    container: string,
    path: string,
    recursive: boolean = false,
  ): Promise<any> {
    return (
      await this.get(
        `https://${datalakeName}.dfs.core.windows.net/${container}`,
        { directory: path, recursive, resource: 'filesystem' },
      )
    ).paths
  }

  async getFoldersWithSize(
    resource: Resource,
    container: Container,
    path: string,
    callback: GetFoldersWithSizeCallback,
  ): Promise<number> {
    let total: number = 0
    const contents: ContainerContent[] = await this.getContent(
      resource.name,
      container.name,
      path,
    )
    for (const content of contents) {
      if (content.contentLength === '0' && content.name !== path) {
        total += await this.getFoldersWithSize(
          resource,
          container,
          content.name,
          callback,
        )
      } else {
        total += parseInt(content.contentLength)
      }
    }
    await callback(path, total)

    return total
  }
}
