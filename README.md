# LRU 缓存

`@x-9lab/xlab` 使用的 LRU 缓存模块

## 使用

- `create` 生成或获取一个缓存实例
    ```ts
    /**
    * 生成或获取一个缓存实例
    * @param  cacheName 实例名称
    * @param  conf      缓存配置，仅在生成的时候有效
    * @return           缓存实例
    */
    function create(cacheName: string, conf: Record<string, XLab.JsonValue>): any;
    ```
- `get` 获取一个缓存实例
    ```ts
    /**
    * 获取一个缓存实例
    * @param name 缓存名称
    * @param conf 缓存配置
    */
    function get(name: string, conf?: Record<string, XLab.JsonValue>): any;
    ```
- `len` 获取当前缓存实例数量
    ```ts
    /**
    * 获取当前缓存实例数量
    * @return 缓存数量
    */
    function len(): number;
    ```