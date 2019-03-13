var mysql=require('mysql')
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
   
    database:"postkrde"
})
con.connect(function(err){
    if(err)
        console.log(err);  
    else
        console.log("connection done.......");
})
module.exports=con;