import Dates, { Durations } from '../libraries/dates'
import CacheProvider from './cache-provider'
import * as Fs from 'node:fs'
import * as Path from 'node:path'

interface CachedContent {
    payload: any
    cachedAt: Date
}

export default class FileCacheProvider implements CacheProvider {
    private readonly path: string
    private readonly secondsTimeout: number
    private cachedData: { [key: string]: CachedContent }

    constructor(path: string, secondsTimeout: number) {
        const parent: string = Path.dirname(path)
        if (!Fs.existsSync(parent)) {
            Fs.mkdirSync(parent, { recursive: true })
        }
        this.path = path
        this.secondsTimeout = secondsTimeout
        this.cachedData = this.loadCachedData()
        this.clearCaducatedKeys()
    }

    loadCachedData(): { [key: string]: CachedContent } {
        if (!Fs.existsSync(this.path)) {
            Fs.writeFileSync(this.path, JSON.stringify({}, null, 4))
        }

        const buffer: Buffer = Fs.readFileSync(this.path)
        const content: string = buffer.toString()
        const json: { [key: string]: CachedContent } = JSON.parse(content)
        return json
    }

    clearCaducatedKeys(): void {
        Object.keys(this.cachedData).map((key: string) => {
            const cachedContent: CachedContent | undefined =
                this.cachedData[key]
            if (cachedContent === undefined) {
                return
            }

            const cachedAt: Date = new Date(cachedContent.cachedAt)
            if (
                Dates.diffIn(cachedAt, new Date(), Durations.SECONDS) >
                this.secondsTimeout
            ) {
                delete this.cachedData[key]
            }
        })
        Fs.writeFileSync(this.path, JSON.stringify(this.cachedData, null, 4))
    }

    async exists(key: string): Promise<boolean> {
        if (!Fs.existsSync(this.path)) {
            return await Promise.resolve(false)
        }

        const cachedContent: CachedContent | undefined = this.cachedData[key]
        if (cachedContent === undefined) {
            console.log(`not exists "${key}"`)
            return await Promise.resolve(false)
        }

        const cachedAt: Date = new Date(cachedContent.cachedAt)
        if (
            Dates.diffIn(cachedAt, new Date(), Durations.SECONDS) >
            this.secondsTimeout
        ) {
            console.log(`caducated "${key}"`)
            delete this.cachedData[key]
            Fs.writeFileSync(
                this.path,
                JSON.stringify(this.cachedData, null, 4),
            )
            return await Promise.resolve(false)
        }

        return await Promise.resolve(true)
    }

    async write(key: string, payload: any): Promise<void> {
        const cachedContent: CachedContent = {
            payload,
            cachedAt: new Date(),
        }
        this.cachedData[key] = cachedContent
        Fs.writeFileSync(this.path, JSON.stringify(this.cachedData, null, 4))
        return await Promise.resolve()
    }

    async read(key: string): Promise<any> {
        const cachedContent: CachedContent = this.cachedData[key]
        return await Promise.resolve(cachedContent.payload)
    }
}
