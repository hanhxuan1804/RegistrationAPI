const niv = require('../../public/Validator');
const Validator = niv.Validator;
const User = require('../../mongooseModel/User');


exports.register = async (req, res) => {
    const v = new Validator(req.body, {
        email: 'required|email|minLength:4|maxLength:100|unique:User,email',
        password: 'required|minLength:6|maxLength:100',
        fullName: 'required|minLength:4|maxLength:100',
        dateOfBirth: 'required|date',
    });
    const matched = await v.check();
    if(!matched){
        return res.status(422).send(v.errors);
    }
try{
    const userObject = new User({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        dateOfBirth: req.body.dateOfBirth,
    });
    console.log(userObject);
    let user = await userObject.save();

    return res.status(201).json({
        message: 'Successfully'
    });
}catch(err){
    return res.status(400).send({
        message: err.message,
        data: err,
    });
}
}
