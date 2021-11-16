const knex = require("knex")({
    client: "pg",
    connection:{
        user:process.env.DB_USER,
        database:process.env.DB,
        host:process.env.DB_HOST,
        password:process.env.DB_PASS,
        port:process.env.PORT
    }
})

module.exports=knex;