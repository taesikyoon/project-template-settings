# NestJS TypeORM Database Template

_**- This template assumes the use of environment variables as a default premise, so please refer to it**_

- [Go to Environment Variable Template README.md Page](https://github.com/taesikyoon/project-template-settings/blob/main/environment/README.md)

**Perform migration and seeding tasks using TypeORM and typeorm-extension!**

1. Create and delete databases
2. Generate and delete seeds
3. Apply changes to the database safely

### Install List

```
- @nestjs/typeorm
- typeorm
- typeorm-extension
- mysql2
- @nestjs/config
- class-validator
- class-transformer
```

**[Click Github [typeorm-extension] Click](https://github.com/tada5hi/typeorm-extension)**

## Execute Scripts

```
"typeorm": "node -r tsconfig-paths/register -r ts-node/register ./node_modules/typeorm/cli",
"typeorm:migration": "node -r tsconfig-paths/register -r ts-node/register ./node_modules/typeorm/cli -d ./src/database/configs/migration.config.ts",
"migration:create": "npm run typeorm migration:create ./src/database/migrations/$npm_config_name",
"migration:generate": "npm run typeorm:migration migration:generate ./src/database/migrations/$npm_config_name",
"migration:run": "npm run typeorm:migration migration:run",
"migration:revert": "npm run typeorm:migration migration:revert",
"db:create": "ts-node ./node_modules/typeorm-extension/bin/cli.cjs db:create -d ./src/database/configs/migration.config.ts",
"db:drop": "ts-node ./node_modules/typeorm-extension/bin/cli.cjs db:drop -d ./src/database/configs/migration.config.ts",
"seed:create": "ts-node ./node_modules/typeorm-extension/bin/cli.cjs seed:create --name ./src/database/seeds/$npm_config_name.ts",
"seed:run": "ts-node -r tsconfig-paths/register ./node_modules/typeorm-extension/bin/cli.cjs seed:run -d ./src/database/configs/seeder.config.ts --name ./src/database/seeds/$npm_config_name.ts"

```

### Database Schema Create

```
npm run db:create
```

### Database Schema Drop

```
npm run db:drop
```

## Seed Generation

```

npm run seed:create --name=<name>

# Example: npm run seed:create --name=user -> 1700746434744-user
```

### Seed Execution

```
npm run seed:run --name=<name>

# Example: npm run seed:create --name=user -> 1700746434744-user
```

### Database Migration Generate

```
npm run migration:generate
```

### Database Migration Run

```
npm run migration:run
```

### Database Migration Revert

```
npm run migration:revert
```
