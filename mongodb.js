// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId=mongodb.ObjectId;

const { MongoClient, ObjectId } = require("mongodb");

// const id=new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      console.log(error);
      return console.log("Unable to connect to database");
    }
    //console.log("Connected correctly");
    const db = client.db(databaseName);

    db.collection("tasks")
      .deleteMany({
        completed: true,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // db.collection("users").deleteMany({
    //     age:21
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error);
    // });

    // update
    // const updatePromise=db.collection("users").updateOne({
    //     _id:new ObjectId("6103b2893726a87e55661b6f")
    // },{
    //     $set:{
    //         name:"Divyam"
    //     }
    // });
    // updatePromise.then((result)=>{
    //     console.log(result);
    // }).then((error)=>{
    //     console.log(error);
    // });
  }
);

//    read-  findOne(data), find(data)
//   db.collection("users").find({age:21}).count((error,user)=>{
//     if(error){
//         return console.log("Unable to find the data");
//     }
//     if(user==null)
//     console.log("No user fouund ");
//     else
//     console.log(user);

// });

// create
// db.collection("users").insertOne({ },(error,result)=>{
//     if(error){
//         return console.log("unable to insert user");
//     }
//     console.log(result.insertedId);
// });
// db.collection("users").insertMany(
//   [
//
//   ],
//   (error, result) => {
//     if (error) {
//       return console.log("Unable to insert data");
//     }

//     console.log(result);
//   }
// );
