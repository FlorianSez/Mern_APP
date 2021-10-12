const mongoose = require ('mongoose');

mongoose.connect(
    "mongodb+srv://florian:florian@cluster1.qnzmc.mongodb.net/MERN_STACK?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if(!err) console.log("Mongodb connected");
        else console.log("Mongodb pas connected : " + err)
    }
)