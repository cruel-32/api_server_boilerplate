# Account Log Server

api 기본 서버 보일러플레이트

## Features

- node (v22.14.0)
- express (웹개발 프레임워크)
- pm2 (node 프로세스 매니저)
- ts-node (node에 typescript 적용)
- 초기설정 당시 디펜던시 (추후 추가 된것들은 package.json 확인)

  - Global Dependencies

    ```typescript
    npm i -g pm2
    ```

  - Dependencies

    ```typescript
    npm i @types/express express npm-run-all rimraf swagger-autogen ts-node ts-node-dev
    ```

  - DevDependencies

    ```typescript

    npm i -D @types/node @types/swagger-jsdoc @types/swagger-ui-express swagger-jsdoc swagger-ui-express tsc-alias tsconfig-paths typescript
    ```
