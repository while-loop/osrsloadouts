db.createCollection("users", {collation: {locale: 'en_US', strength: 2}});
db.users.createIndex({username: 1, rsn: 1});
db.users.createIndex({username: 1}, {unique: true})

db.createCollection("favorites");

db.createCollection("loadouts", {collation: {locale: 'en_US', strength: 2}});
db.loadouts.createIndex({tags: 1, title: 1, description: 1, "author.username": 1});

db.createCollection("views", {collation: {locale: 'en_US', strength: 2}});
