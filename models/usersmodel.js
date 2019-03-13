var con=require('./conn')
var randomstring=require('randomstring')
function userregister(tbl_nm,data,cb){
    var query="insert into "+tbl_nm+" values(NULL,'"+data.nm+"','"+data.email+"','"+data.pass+"','"+data.mno+"','"+data.gender+"','"+data.city+"','"+data.address+"','0','user')"
con.query(query,function(err,result){
    if(err)
        console.log(err)
    else
        cb(result)
})
}
function logincheck(data,cb)
{
    query="select * from register where email='"+data.email+"' && pass='"+data.pass+"' && vstatus=1"
    con.query(query,function(err,result){
        console.log(result)
        if(err)
            console.log(err);
        else
            cb(result)
    })
    
}

function verifyaccount(data,cb)
{
    var query="update register set vstatus='1' where email='"+data.email+"'"
    console.log(query)
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
} 
function fetchcatlimit(cb)
{
    var query="select * from addcat order by catid desc limit 0,9"
    console.log(query)
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
        {    
            cb(result)}
    })
    
}
function fetchsubcatlimit(d,cb)
{
    var query="select * from addsubcat where catnm='"+d.cnm+"'"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
        
            cb(result)
    })
    
}
function fetchpost(d,cb)
{
    if(d.city==undefined)
    {var query="select * from addpost where catnm='"+d.scnm+"' && vstatus=1 order by pid desc"}
    else
    {
        var query="select * from addpost where catnm='"+d.scnm+"' && city='"+d.city+"' && vstatus=1 order by pid desc"
    }
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
        
            cb(result)
    })
    
}
function fetchalldata(tbl_nm,cb)
{
    var query="select * from "+tbl_nm
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
        
            cb(result)
    })
    
    
}
function addpost(data,f1,f2,f3,cb)
{
    var query="insert into addpost values (NULL,'"+data.title+"','"+data.cat_nm+"','"+data.description+"','"+data.price+"','"+f1+"','"+f2+"','"+f3+"','"+data.mob+"','"+data.email+"','"+data.address+"','"+data.city+"',0,0,'"+Date()+"')"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
        
            cb(result)
    })


}
function paymentreq(tbl_nm,data,cb)
{
    var txn_id=randomstring.generate({
        length:12,
        charset:'abcdefghijklmnopqrstuvwxyz0987654321'
    });
    var txn_time=Date()
     var query="insert into "+tbl_nm+" values('"+txn_id+"','"+data.item_id+"','"+data.item_name+"','"+data.item_price+"','"+txn_time+"')"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
        
            cb(result)
    })
}
function addpostuser(data,f1,f2,f3,uid,cb)
{
    var query="insert into addpost values (NULL,'"+data.title+"','"+data.cat_nm+"','"+data.description+"','"+data.price+"','"+f1+"','"+f2+"','"+f3+"','"+data.mob+"','"+data.email+"','"+data.address+"','"+data.city+"','"+uid+"',0,'"+Date()+"')"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
        
            cb(result)
    })


}
/*function managepostuser(user,cb)

{
    query="select * from addpost where email='"+user.user+"'"
    console.log(query)
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}*/






module.exports={addpostuser:addpostuser,paymentreq:paymentreq,fetchpost:fetchpost,addpost:addpost,fetchalldata:fetchalldata,logincheck:logincheck,userregister:userregister,verifyaccount:verifyaccount,fetchcatlimit:fetchcatlimit,fetchsubcatlimit:fetchsubcatlimit}