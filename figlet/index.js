const figlet = require("figlet");

figlet("ARAFAT", function (err, data) {
    if (err) {
        console.log("Error happened");
        return;
    }
    console.log(data);
});