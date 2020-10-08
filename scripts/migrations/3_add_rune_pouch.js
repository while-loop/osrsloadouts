db.loadouts.updateMany({}, {
    $set: {
        rune_pouch: [
            {id: null, quantity: 1},
            {id: null, quantity: 1},
            {id: null, quantity: 1},
        ]
    }
})
db.db_migrations.update({}, {$set: {db_version: 3, app_version: "0.0.18"}}, {upsert: true});
print(db.getLastError(1));
