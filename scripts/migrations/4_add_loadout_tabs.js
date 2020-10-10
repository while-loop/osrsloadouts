db.loadouts.find({}).forEach(function (doc) {
    doc.tabs = [{
        title: "default",
        inventory: doc.inventory,
        rune_pouch: doc.rune_pouch,
        equipment: doc.equipment,
    }]

    delete doc.inventory
    delete doc.rune_pouch
    delete doc.equipment
    db.loadouts.save(doc)
})
db.db_migrations.update({}, {$set: {db_version: 4, app_version: "0.0.19"}}, {upsert: true});
print(db.getLastError(1));
