let a=5;
for(let i=0;i<5;i++){
    console.log("Updation",i);
}
console.log(process.argv);

//[1]  powerShell PS C:\Users\access 213\Desktop\Web dev class\Backend>
//[2]  cd node_js1
//[3]  dir
//[4]  node script.js hello world

let args=process.argv;

for(let i=2;i<args.length;i++){
    console.log("Hello to ", args[i]);
}