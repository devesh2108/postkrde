var con=require('./conn')

function manageusersadmin(tblnm,cb)

{
    query="select * from "+tblnm+" where role!='admin'"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}
function managepostadmin(tblnm,cb)

{
    query="select * from "+tblnm
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
        { console.log(result)
            cb(result)}
    })
}
function blockuser(regid,cb)
{
    query="update register set vstatus='0' where regid = "+regid
    console.log(query)
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}
function blockpost(pid,cb)
{
    query="update addpost set vstatus='0' where pid = "+pid
    console.log(query)
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}
function unblockuser(regid,cb)
{
    query="update register set vstatus='1' where regid = "+regid
    console.log(query)
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}
function unblockpost(pid,cb)
{
    query="update addpost set vstatus='1' where pid = "+pid
    console.log(query)
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}

function deleteuser(regid,cb)
{
    query="delete from register where regid = "+regid
    console.log(query)
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}
function deletepost(pid,cb)
{
    query="delete from addpost where pid = "+pid
    console.log(query)
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}

function addcatadmin(catnm,catimgnm,cb)
{
        var query="insert into addcat values(NULL,'"+catnm+"','"+catimgnm+"')"
         con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
         })
        
}
function fetchallcat(tbl_nm,cb)
{
    var query="select * from "+tbl_nm
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
        {   console.log(result)
            cb(result)}
         })
}
function addsubcatadmin(catnm,subcatnm,subcatimgnm,cb)
{
        var query="insert into addsubcat values(NULL,'"+catnm+"','"+subcatnm+"','"+subcatimgnm+"')"
         con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
         })
        
}






module.exports={managepostadmin:managepostadmin,blockpost:blockpost,unblockpost:unblockpost,deletepost:deletepost,addsubcatadmin:addsubcatadmin,fetchallcat:fetchallcat,addcatadmin:addcatadmin,manageusersadmin:manageusersadmin,blockuser:blockuser,unblockuser:unblockuser,deleteuser:deleteuser}