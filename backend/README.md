## 项目简介

- `common`：公共模块

- `gateway`：网关模块

- `user`：用户模块

## 启动项目

### `Nacos`

- [下载 Nacos v2.2.2](https://nacos.io/download/release-history/)

- 打开 `/nacos安装位置/conf/application.properties` 文件, 配置 `Nacos`

  ```properties
  # 用户名（在项目中使用）
  nacos.core.auth.server.identity.key=nacos

  # 密码（在项目中使用）
  nacos.core.auth.server.identity.value=nacos

  # 加密后的密码
  nacos.core.auth.plugin.nacos.token.secret.key=VGhpc0lzTXlDdXN0b21TZWNyZXRLZXkwMTIzNDU2Nzg=
  ```

- 启动 `Nacos` 单机版

  ```bash
  /nacos安装位置/bin/startup.sh -m standalone
  ```

### `Redis`

- [下载 Redis for Windows](https://github.com/tporadowski/redis/releases) (本人用的是 `5.0.14.1`)

- 打开 `/redis安装位置/redis.windows.conf` 文件, 配置 `Redis`

```conf
#（在项目中使用）
requirepass 123456
```

### 启动项目
