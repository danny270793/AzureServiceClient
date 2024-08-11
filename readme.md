# Azure Service Client

[![Github pipeline status](https://github.com/danny270793/AzureServiceClient/actions/workflows/releaser.yaml/badge.svg)](https://github.com/danny270793/AzureServiceClient/actions/workflows/releaser.yaml)
![NPM Type Definitions](https://img.shields.io/npm/types/@danny270793/AzureServiceClient)

[![install size](https://packagephobia.com/badge?p=@danny270793/AzureServiceClient)](https://packagephobia.com/result?p=@danny270793/AzureServiceClient)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/@danny270793/AzureServiceClient)
![GitHub repo size](https://img.shields.io/github/repo-size/danny270793/AzureServiceClient)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/danny270793/AzureServiceClient)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@danny270793/AzureServiceClient)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/danny270793/AzureServiceClient)
![NPM Downloads](https://img.shields.io/npm/dy/@danny270793/AzureServiceClient)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/danny270793/AzureServiceClient/total)

Library to access to azure resources information

## Instalation

Install package from public registry

```bash
npm install @danny270793/AzureServiceClient
```

## Examples

List resource groups on a supscription scoped by client id and client secret

```ts
import { Azure } from '@danny270793/AzureServiceClient'
import ResourceGroup from '@danny270793/AzureServiceClient/src/responses/resource-group'

const azureSubscriptionId: string = process.env.AZURE_SUBSCRIPTION_ID
const azureTenantId: string = process.env.AZURE_TENANT_ID
const azureClientId: string = process.env.AZURE_CLIENT_ID
const azureClientSecret: string = process.env.AZURE_CLIENT_SECRET

const azure: Azure = new Azure(
  azureSubscriptionId,
  azureTenantId,
  azureClientId,
  azureClientSecret,
)

const resourceGroups: ResourceGroup[] = await azure.getResourceGroups()
console.log(resourceGroups)
```

## Follow me

[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/channel/UC5MAQWU2s2VESTXaUo-ysgg)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://www.github.com/danny270793/)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danny270793)

## LICENSE

[![GitHub License](https://img.shields.io/github/license/danny270793/AzureServiceClient)](license.md)

## Version

![GitHub Tag](https://img.shields.io/github/v/tag/danny270793/AzureServiceClient)
![GitHub Release](https://img.shields.io/github/v/release/danny270793/AzureServiceClient)
![GitHub package.json version](https://img.shields.io/github/package-json/v/danny270793/AzureServiceClient)
![NPM Version](https://img.shields.io/npm/v/@danny270793/AzureServiceClient)

Last update 11/08/2024
