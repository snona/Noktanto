class FirebaseObject {
  static dbToStore(id, db, init) {
    Object.keys(init).forEach(key => {
      if (db[key] === undefined) db[key] = init[key];
    });
    db.id = id;
    return db;
  }

  static storeToDB(store) {
    store.id = null;
    return store;
  }
}
export default FirebaseObject;