db.createCollection("users", {collation: {locale: 'en_US', strength: 2}});
db.users.createIndex({username: 1}, {unique: true})

db.createCollection("loadouts", {collation: {locale: 'simple'}});
db.loadouts.createIndex({ "author.id": 1, title: "text", tags: "text" })

db.createCollection("user_stats");

db.createCollection("view_log");
db.view_log.createIndex( { "created": 1 }, { expireAfterSeconds: 60 } )
