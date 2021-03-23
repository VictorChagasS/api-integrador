console.log(process.env.DATABASE_URL)
module.exports = [
    {
        "type":"postgres",
        "url": process.env.DATABASE_URL,
        "entities": [
            "dist/src/modules/**/infra/typeorm/entities/*.ts"
          ],
        "migrations":[
            "dist/src/shared/infra/typeorm/migrations/*.ts"
        ],
        "cli":{
            "migrationsDir": "./src/shared/typeorm/migrations"
        }
    },
    {
        "name":"mongo",
        "type":"mongodb",
        "host":"localhost",
        "port":27017,
        "database" : "mongo_integradordb",
        "useUnifiedTopology":true,
        "entities": [
            "./src/modules/**/infra/typeorm/schemas/*.ts"
          ]
    }
]