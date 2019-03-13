var express=require('express')
var adminmodel=require('../models/adminmodel')
var url=require('url')
var path=require('path')
var router=express.Router()
var d
router.use('/addsubcatadmin',function(req,res,next){
    adminmodel.fetchallcat('addcat',function(result){
        d=result
        next()
    })
})
var myuser;
var myuserrole;
router.use('/',function(req,res,next){
    myuser=req.session.unm
    myuserrole=req.session.role
    if(myuser==undefined || myuserrole!='admin')
    {
        console.log('invalid user please login first,IP tracking')
        res.redirect('/login')
    }
next()    
})
router.get('/',function(req,res,next){
    res.render('adminhome',{'myuser':myuser})
})
router.get('/manageusersadmin',function(req,res,next){
    adminmodel.manageusersadmin('register',function(result){
        console.log(result)
        res.render('manageusersadmin',{'data':result})
    })
})
router.get('/managepostadmin',function(req,res,next){
    adminmodel.managepostadmin('addpost',function(result){
        console.log(result)
        res.render('managepostadmin',{'data':result})
    })
})

router.get('/validateusers',function(req,res,next){
    var q=url.parse(req.url,true).query
    if(q.block!=undefined)
    {
        adminmodel.blockuser(q.block,function(result){
            console.log('user blocked')
            res.redirect('/admin/manageusersadmin')
        })
    }
    if(q.unblock!=undefined)
    {
        adminmodel.unblockuser(q.unblock,function(result){
            console.log('user unblocked')
            res.redirect('/admin/manageusersadmin')
        })
    }
    if(q.delete!=undefined)
    {
        adminmodel.deleteuser(q.delete,function(result){
            console.log('user deleted')
            res.redirect('/admin/manageusersadmin')
        })
    }
})
router.get('/validatepost',function(req,res,next){
    var q=url.parse(req.url,true).query
    if(q.block!=undefined)
    {
        adminmodel.blockpost(q.block,function(result){
            console.log('post blocked')
            res.redirect('/admin/managepostadmin')
        })
    }
    if(q.unblock!=undefined)
    {
        adminmodel.unblockpost(q.unblock,function(result){
            console.log('post unblocked')
            res.redirect('/admin/managepostadmin')
        })
    }
    if(q.delete!=undefined)
    {
        adminmodel.deletepost(q.delete,function(result){
            console.log('post deleted')
            res.redirect('/admin/managepostadmin')
        })
    }
})
router.all('/addcatadmin',function(req,res,next){
    if(req.method=='GET')
        res.render('addcatadmin',{'r':''})
    else
    {
        var catnm=req.body.catnm
        var catimg=req.files.catimg
        var catimgnm=catimg.name
        console.log(catimgnm)
        var des=path.join(__dirname,'../public/uploads/',catimgnm)
        catimg.mv(des,function(err){
            if(err)
                console.log(err)
            else
                adminmodel.addcatadmin(catnm,catimgnm,function(result){
                    if(result)
                    {
                        console.log('category added successfully')
                        res.render('addcatadmin',{'r':'category added successfully'})
                        
                    }
                    else
                        res.render('addcatadmin',{'r':'category not added'})
                     
                })
        })
    }
         
})
router.all('/addsubcatadmin',function(req,res,next){
    if(req.method=='GET')
        res.render('addsubcatadmin',{'r':'','catdata':d})
    else
    {
        var catnm=req.body.catnm
        var subcatnm=req.body.subcatnm
        var catimg=req.files.catimg
        var catimgnm=catimg.name
        console.log(catimgnm)
        var des=path.join(__dirname,'../public/uploads/',catimgnm)
        catimg.mv(des,function(err){
            if(err)
                console.log(err)
            else
                adminmodel.addsubcatadmin(catnm,subcatnm,catimgnm,function(result){
                    if(result)
                    {
                        console.log('category added successfully')
                        res.render('addsubcatadmin',{'r':'Subcategory added successfully','catdata':d})
                        
                    }
                    else
                        res.render('addsubcatadmin',{'r':'subcategory not added','catdata':d })
                     
                })
        })
    }
         
})




module.exports=router