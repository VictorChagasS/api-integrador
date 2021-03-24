console.log(process.env.DATABASE_URL)
console.log(process.env.MONGO_URL)
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
        },
    },
    {
        "name":"mongo",
        "type":"mongodb",
        "url":process.env.MONGO_URL,
        "database" : "mongo_integradordb",
        "useUnifiedTopology":true,
        "entities": [
            "./dist/modules/**/infra/typeorm/schemas/*.js"
          ]
    }
]