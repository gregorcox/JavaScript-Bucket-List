use bucket_list;
db.dropDatabase();

db.items.insertMany([
  {
    name: "skydive",
    completed: false
  }
])
