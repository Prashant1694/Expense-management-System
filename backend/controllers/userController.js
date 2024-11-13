const usermodel = require('../models/users');

//login callback
const logincontroller = async (req,res) => {
    const {email,password} = req.body;
        const user = await usermodel.findOne({email,password});
        if(!user){
            return res.status(404).send('User Not Found');
        }
        res.status(200).json({
            success:true,
            user
        });
    {/*try{
        const {email,password} = req.body;
        await usermodel.fineOne({email,password});
        if(!user){
            return res.status(404).send('User Not Found');
        }
        res.status(200).json({
            success:true,
            user
        });
    }catch(error){
        res.satus(400).json({
            success:false,
            error
        });

    }*/}
};
//register callback
const registercontroller = async (req,res) => {
    {/*console.log(JSON.stringify(req, null, 2),'error');*/}
    const newuser = new usermodel(req.body);
    await newuser.save();
    return res.status(200).json({
        success:true,
        newuser
    })
    {/*try {
        const newuser = new userModel(req.body);
        await newuser.save();
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
        
    }*/}
};

module.exports = {logincontroller, registercontroller};
