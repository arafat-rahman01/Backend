// use("myapp")

// db.users.insertOne({
//   name: "Arafat",
//   skill: "MongoDB",
//   level: "pro"
// })

// db.users.find()
test> use posts
//switched to db posts
posts> db.posts.insertOne({
   title: "Post Title 1",
   body: "Body of post.",
   category: "News",
   likes: 1,
   tags: ["news", "events"],
   date: Date()
 })
// {
//   acknowledged: true,
//   insertedId: ObjectId('69ab119c693f383c817c2907')
// }
posts> db.posts.insertMany([  
   {
     title: "Post Title 2",
     body: "Body of post.",
     category: "Event",
     likes: 2,
     tags: ["news", "events"],
     date: Date()
   },
   {
     title: "Post Title 3",
     body: "Body of post.",
     category: "Technology",
     likes: 3,
     tags: ["news", "events"],
     date: Date()
   },
   {
     title: "Post Title 4",
     body: "Body of post.",
     category: "Event",
     likes: 4,
     tags: ["news", "events"],
     date: Date()
   }
 ])
{
  // acknowledged: true,
  // insertedIds: {
  //   '0': ObjectId('69ab11af693f383c817c2908'),
  //   '1': ObjectId('69ab11af693f383c817c2909'),
  //   '2': ObjectId('69ab11af693f383c817c290a')
  // }
}
posts> db.posts.find()
[
  {
    _id: ObjectId('69ab119c693f383c817c2907'),
    title: 'Post Title 1',
    body: 'Body of post.',
    category: 'News',
    likes: 1,
    tags: [ 'news', 'events' ],
    date: 'Fri Mar 06 2026 23:40:44 GMT+0600 (Bangladesh Standard Time)'
  },
  {
    _id: ObjectId('69ab11af693f383c817c2908'),
    title: 'Post Title 2',
    body: 'Body of post.',
    category: 'Event',
    likes: 2,
    tags: [ 'news', 'events' ],
    date: 'Fri Mar 06 2026 23:41:03 GMT+0600 (Bangladesh Standard Time)'
  },
  {
    _id: ObjectId('69ab11af693f383c817c2909'),
    title: 'Post Title 3',
    body: 'Body of post.',
    category: 'Technology',
    likes: 3,
    tags: [ 'news', 'events' ],
    date: 'Fri Mar 06 2026 23:41:03 GMT+0600 (Bangladesh Standard Time)'
  },
  {
    _id: ObjectId('69ab11af693f383c817c290a'),
    title: 'Post Title 4',
    body: 'Body of post.',
    category: 'Event',
    likes: 4,
    tags: [ 'news', 'events' ],
    date: 'Fri Mar 06 2026 23:41:03 GMT+0600 (Bangladesh Standard Time)'
  }
]

