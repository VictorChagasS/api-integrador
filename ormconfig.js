console.log(process.env.DATABASE_URL)
module.exports = [
    {
        "type":"postgres",
        "url": process.env.DATABASE_URL,
        "entities": [
            "./dist/modules/**/infra/typeorm/entities/*.js"
          ],
        "migrations":[
            "./dist/shared/infra/typeorm/migrations/*.js"
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