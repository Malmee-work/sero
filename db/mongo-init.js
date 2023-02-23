db = db.getSiblingDB("sero");
db.createUser({
  user: "root",
  pwd: "root",
  roles: [
    {
      role: "readWrite",
      db: "sero",
    },
  ],
});
db.createCollection("recipes");
