db.loadouts.renameCollection("loadouts_bak");

db.createCollection("loadouts", {collation: {locale: 'simple'}});
db.loadouts.createIndex({"author.id": 1, title: "text", tags: "text"});

db.getCollection('loadouts_bak').aggregate([{$out: 'loadouts'}]);
db.loadouts_bak.drop();

db.createCollection("user_stats");
db.createCollection("view_log");
db.createCollection("db_migrations");

db.view_log.createIndex({created: 1}, {expireAfterSeconds: 60});
db.view_log.createIndex({user_id: 1, loadout_id: 1}, {unique: true});
db.db_migrations.update({}, {$set: {db_version: 2, app_version: "0.0.11"}}, {upsert: true});
print(db.getLastError(1));
