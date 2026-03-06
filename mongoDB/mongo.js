use("myapp")

db.users.insertOne({
  name: "Arafat",
  skill: "MongoDB",
  level: "pro"
})

db.users.find()