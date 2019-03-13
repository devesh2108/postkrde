var express = require('express');
var path=require('path')
var url=require('url')
var usersmodel=require('../models/usersmodel')
var router = express.Router();


var myuser;
var myuserrole;

    router.use('/',function(req,res,next){
    myuser=req.session.unm
    myuserrole=req.session.role
    if(myuser==undefined || myuserrole!='user')
    {
        console.log('invalid user please login first,IP tracking')
        res.redirect('/login')
    }
next()    

    
})
var d2=''
router.use('/addpostuser',function(req,res,next){
    usersmodel.fetchalldata('addsubcat',function(result){
        d2=result
        next()
    
})
})


/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('userhome',{'myuser':myuser})
});
router.all('/addpostuser',function(req,res,next){
   if(req.method=='GET')
   {
       res.render('addpostuser',{'result':'','subcatlist':d2})
   }
   else
   {
       var data=req.body
       var myfiles=req.files
       imgref1=req.files.myimg1
       if(imgref1!=undefined)
       {
           f1=imgref1.name
           var des=path.join(__dirname,'../public/uploads',f1)
           imgref1.mv(des)
       }
       else
       {
           var f1='dummy.png'
       }
       imgref2=req.files.myimg2
       if(imgref2!=undefined)
       {
           f2=imgref2.name
           var des=path.join(__dirname,'../public/uploads',f2)
           imgref2.mv(des)
       }
       else
       {
           var f2='dummy.png'
       }
       imgref3=req.files.myimg3
       if(imgref3!=undefined)
       {
           f3=imgref3.name
           var des=path.join(__dirname,'../public/uploads',f3)
           imgref3.mv(des)
       }
       else
       {
           var f3='dummy.png'
       }
       usersmodel.addpostuser(data,f1,f2,f3,myuser,function(result){
           if(result)
               res.render('addpostuser',{'result':'Post added successfully please wait for verification','subcatlist':d2})
           else
               res.render('addpostuser',{'result':'post not added','subcatlist':d2})
       })
   }
});
/*router.get('/managepostuser',function(req,res,next){
   // var user=url.parse(req.url,true).query
    var user=r
    console.log(user)
    usersmodel.managepostuser(user,function(result){
        console.log(result)
       // res.render('managepostuser',{'data':result})
    })
})*/


module.exports = router;
