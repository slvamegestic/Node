var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var bcrypt   = require('bcrypt-nodejs');


var UserSchema=new mongoose.Schema ({
     id: Number,
     username: String,
     avatar:String,
     firstName:String,
     lastName:String,
     password:String,
     id: Number,
     last_login_date: {
        type:  Date,
        default: Date.now
    }

});

// generating a hash
// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
//
// // checking if password is valid
// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };
UserSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("user", UserSchema);


// var studentSchema = new mongoose.Schema({
//
//     name:{
//         type: String,
//         required: true
//     },
//     rollno:{
//         type: Number,
//         required: true
//     },
//     grade:{
//         type: String,
//         required: true
//     },
//     result:{
//         type: String,
//         required: true
//     }
// });
//
//
// var Student = module.exports = mongoose.model('Student',studentSchema);
//
// module.exports.getStudents = function (callback){
//
//     Student.find(callback);
// }
