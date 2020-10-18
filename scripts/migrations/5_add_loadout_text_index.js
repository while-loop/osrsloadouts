// remove author ID from text index
db.loadouts.dropIndexes()
db.loadouts.createIndex({title: "text", tags: "text"});
db.loadouts.createIndex({"author.id": 1});

db.db_migrations.update({}, {$set: {db_version: 5, app_version: "0.0.20"}}, {upsert: true});
print(db.getLastError(1));
