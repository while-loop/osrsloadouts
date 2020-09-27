db.createCollection("users", {collation: {locale: 'en_US', strength: 2}});
db.users.createIndex({username: 1}, {unique: true});

db.createCollection("loadouts", {collation: {locale: 'en_US', strength: 2}});

db.createCollection("db_migrations");
db.db_migrations.update({}, {$set: {db_version: 1, app_version: "0.0.10"}}, {upsert: true});
print(db.getLastError(1));
