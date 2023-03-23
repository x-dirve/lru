import { isObject, isString } from "@x-drive/utils";
import LRU from "lru-cache";

const maxCache = 100;
const maxAge = 60 * 60 * 1000;

const MAX_NUM = 20;
var NOW_NUM = 0;
const CACHE_LIST = [];

/**
 * LRU-CACHE实例缓存对象
 */
var LRU_CACHES: Record<string, typeof LRU> = {};

/**
 * 初始化缓存实例
 * @param  cacheName 缓存名称
 * @param  conf      缓存配置
 * @return           缓存实例
 */
function init(cacheName: string, conf: Record<string, XLab.JsonValue>) {
    if (NOW_NUM >= MAX_NUM) {
        var cache: typeof LRU;
        var deadName: string;
        deadName = CACHE_LIST.shift();
        cache = LRU_CACHES[deadName];
        if (cache) {
            cache.reset();
            cache = null;
            LRU_CACHES[deadName] = null;
            NOW_NUM -= 1;
        }
    }

    conf = conf || {};
    conf.max = conf.max || maxCache;
    conf.maxAge = conf.maxAge || maxAge;
    LRU_CACHES[cacheName] = new LRU(conf);
    NOW_NUM += 1;
    CACHE_LIST.push(cacheName);
    return LRU_CACHES[cacheName];
}

/**
 * 生成或获取一个缓存实例
 * @param  cacheName 实例名称
 * @param  conf      缓存配置，仅在生成的时候有效
 * @return           缓存实例
 */
function create(cacheName: string, conf: Record<string, XLab.JsonValue>) {
    cacheName = cacheName || "DEFAULT";
    if (!LRU_CACHES[cacheName]) {
        if (LRU_CACHES[cacheName] === null) {
            console.log(`${cacheName} 为已被回收的缓存实例，重新生成新实例对象`);
        }
        init(cacheName, conf);
    }
    return LRU_CACHES[cacheName];
};
export { create };

/**
 * 获取一个缓存实例
 * @param name 缓存名称
 * @param conf 缓存配置
 */
function get(name: string, conf?: Record<string, XLab.JsonValue>) {
    if (!isString(name)) {
        throw new Error("必须指定缓存名称");
    }
    if (LRU_CACHES[name]) {
        return LRU_CACHES[name];
    }

    if (isObject(conf)) {
        return create(name, conf);
    }
    throw new Error(`找不到缓存 ${name}, 你可以先创建再调用本方法获取,或传入配置对象自动生成`);
}
export { get }

/**
 * 获取当前缓存实例数量
 * @return 缓存数量
 */
function len() {
    return CACHE_LIST.length;
}
export { len };
