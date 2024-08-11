import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import LoginResponse from '../responses/login-response'
import CacheProvider from '../providers/cache-provider'

export default abstract class Base {
    private readonly subscriptionId: string
    private readonly tenantId: string
    private readonly clientId: string
    private readonly clientSecret: string
    private cache: CacheProvider | undefined
    private loginResponse: { [key: string]: LoginResponse } = {}

    constructor(
        subscriptionId: string,
        tenantId: string,
        clientId: string,
        clientSecret: string,
    ) {
        this.subscriptionId = subscriptionId
        this.tenantId = tenantId
        this.clientId = clientId
        this.clientSecret = clientSecret
    }

    setCacheProvider(cache: CacheProvider | undefined): void {
        this.cache = cache
    }

    abstract getLoginResource(): string

    getSubscriptionId(): string {
        return this.subscriptionId
    }

    getTenantId(): string {
        return this.tenantId
    }

    getClientId(): string {
        return this.clientId
    }

    getClientSecret(): string {
        return this.clientSecret
    }

    async getLoginResponse(resource: string): Promise<LoginResponse> {
        if (this.loginResponse[resource] === undefined) {
            this.loginResponse[resource] = await this.login(
                this.tenantId,
                this.clientId,
                this.clientSecret,
                resource,
            )
        }
        return this.loginResponse[resource]
    }

    async login(
        tenantId: string,
        clientId: string,
        clientSecret: string,
        resource: string,
    ): Promise<LoginResponse> {
        const url: string = `https://login.microsoftonline.com/${tenantId}/oauth2/token`
        const body: { [key: string]: string } = {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            resource,
        }
        const response: AxiosResponse<LoginResponse> = await Axios({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: new URLSearchParams(body),
        })
        return response.data
    }

    async post(
        endpoint: string,
        payload: { [key: string]: any },
        query: { [key: string]: string } = {},
    ): Promise<any> {
        const resource: string = this.getLoginResource()
        const loginResponse: LoginResponse =
            await this.getLoginResponse(resource)
        const queryParameters: string = new URLSearchParams(query).toString()
        const url: string =
            (endpoint.startsWith('https')
                ? endpoint
                : `${resource}/${endpoint}`) + `?${queryParameters}`
        const axiosRequestConfig: AxiosRequestConfig = {
            method: 'POST',
            url,
            headers: {
                authorization: `Bearer ${loginResponse.access_token}`,
                'Content-Type': 'application/json',
            },
            data: payload,
        }
        const key: string = JSON.stringify({ url, payload })
        if (this.cache !== undefined) {
            if (await this.cache.exists(key)) {
                return await this.cache.read(key)
            }
        }

        const response: AxiosResponse<any> = await Axios(axiosRequestConfig)
        if (this.cache !== undefined) {
            await this.cache.write(key, response.data)
        }
        return response.data
    }

    async get(
        endpoint: string,
        query: { [key: string]: any } = {},
    ): Promise<any> {
        const resource: string = this.getLoginResource()
        const loginResponse: LoginResponse =
            await this.getLoginResponse(resource)
        const queryParameters: string = new URLSearchParams(query).toString()
        const url: string =
            (endpoint.startsWith('https')
                ? endpoint
                : `${resource}/${endpoint}`) + `?${queryParameters}`
        if (this.cache !== undefined) {
            if (await this.cache.exists(url)) {
                return await this.cache.read(url)
            }
        }
        const axiosRequestConfig: AxiosRequestConfig = {
            method: 'GET',
            url,
            headers: {
                authorization: `Bearer ${loginResponse.access_token}`,
                'Content-Type': 'application/json',
            },
        }
        const response: AxiosResponse<any> = await Axios(axiosRequestConfig)
        if (this.cache !== undefined) {
            await this.cache.write(url, response.data)
        }
        return response.data
    }
}
