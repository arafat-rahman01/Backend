const figlet = require("figlet");  //figlet directly bcz package

figlet("ARAFAT", function (err, data) {
    if (err) {
        console.log("Error happened");
        return;
    }
    console.log(data);
});