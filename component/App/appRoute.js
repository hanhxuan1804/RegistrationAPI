module.exports =(app)=>{
    app.get('/',(req,res)=>{
        res.send({message:'Hello World!'});
    });
    app.use('/auth',require('../auth/authRoute'));
}
