db.posts.insertMany(
    {
    _id: 1,
    category: "News",
    likes: 10,
    views: 100
    },

    {
    _id: 2,
    category: "News",
    likes: 5,
    views: 50
    },

    {
    _id: 3,
    category: "Event",
    likes: 20,
    views: 200
    }
)

//Group
db.posts.aggregate([
  {
    $group: {
      _id: "$category",
      totalPosts: { $sum: 1 }
    }
  }
])

//sum
db.posts.aggregate([
  {
    $group: {
      _id: null,
      totalLikes: { $sum: "$likes" }
    }
  }
])