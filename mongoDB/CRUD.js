//inset
db.posts.insertOne({
  title: "Post 1",
  category: "News",
  likes: 0
})

//find
db.posts.find({condition})

//updateOne
db.posts.updateOne(
  { title: "Post 1" },   // filter
  {
    $set: {               // update operator
      likes: 10
    }
  }
)

//upsert
db.posts.updateOne(
  { title: "Post 5" },
  { $set: { likes: 1 } },
  { upsert: true }
)