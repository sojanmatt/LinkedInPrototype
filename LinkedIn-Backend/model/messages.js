const mongoose = require("../mongoose");
const Schema = mongoose.Schema;
id = mongoose.Types.ObjectId();

var Messages = new Schema({
    senderEmailId: {
        type: String
    },
    receiverEmailId: {
        type: String
    },
    messageThread: {
        type: Array
    }
});


 let Message = mongoose.model("messages", Messages, "messages");  

//var Messages = mongoose.model("Messages", Messages)
module.exports = Message;

