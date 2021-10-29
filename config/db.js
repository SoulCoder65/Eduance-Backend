const mongoose = require("mongoose")


// Making Connection With Mongodb
module.exports = connect = async() => {
    console.log()
    try {
        mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,


        }).then((result) => {
            console.log("Database Connected....")
        }).catch((err) => {
            console.log(err)
        });
    } catch (error) {
        console.log(error)
    }
}