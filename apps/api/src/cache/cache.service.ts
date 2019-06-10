import {Injectable} from '@nestjs/common';
import {Dictionary} from 'typescript-collections';

const redis = require("redis"),
  client = redis.createClient();
const {promisify} = require('util');

@Injectable()
export class CacheService {
  NOT_CACHED = 'not cached';

  localCache = new Dictionary<string, any>();
  remoteCache = {
    getValue: promisify(client.get).bind(client),
    setValue: promisify(client.set).bind(client),
    deleteValue: promisify(client.del).bind(client)
  };

  constructor() {

  }

  async deleteLocalWithFallback(key:string): Promise<any>{
    this.localCache.remove(key);
    return await this.remoteCache.deleteValue(key);
  }

  async getLocalWithFallback(key: string): Promise<any> {
    const localResult = this.getLocal(key);
    let remoteResult;
    if (typeof localResult === 'undefined') {
      remoteResult = await this.getRemote(key);
    } else {
      return localResult;
    }
    if (remoteResult === null) {
      return this.NOT_CACHED;
    } else {
      return remoteResult;
    }
  }

  async setLocalWithFallback(key: string, value: any, expirationSeconds?: number): Promise<string> {
    this.setLocal(key, value);
    return await this.setRemote(key, value, expirationSeconds);
  }

  async getRemote(key: string): Promise<any> {
    const cachedEntry = await this.remoteCache.getValue(key);
    if (cachedEntry === null) {
      return this.NOT_CACHED;
    } else {
      return JSON.parse(cachedEntry);
    }
  }

  async setRemote(key: string, value: any, expirationSeconds?: number): Promise<string> {
    if (expirationSeconds) {
      return await this.remoteCache.setValue(key, JSON.stringify(value), 'EX', expirationSeconds);
    } else {
      return await this.remoteCache.setValue(key, JSON.stringify(value));
    }
  }

  getLocal(key: string) {
    const cachedEntry = this.localCache.getValue(key);
    if (typeof cachedEntry === 'undefined') {
      return this.NOT_CACHED
    }
    return cachedEntry;
  }

  setLocal(key: string, value: any) {
    this.localCache.setValue(key, value);
  }
}
