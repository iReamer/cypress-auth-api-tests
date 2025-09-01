const router = require('express').Router();
const User = require('../model/Users');
const { DataValidation } = require('../dataValidation')
const bcrypt = require('bcryptjs')



//app.use('/api/user)
router.post('/register', async (req, res) => {
    //Validate that the body content matches requirments
    const { error } = DataValidation.registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //check to make sure that uzser doesnt exist
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('User with this E-Mail already exists');

    //encrypt Password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword

    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req, res) => {

    const { error } = DataValidation.loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if the email exists
    const userInDB = await User.findOne({ email: req.body.email });
    if (!userInDB) return res.status(400).send('Email not registered');

    console.log('REQ.BODY.PASSWORD:', req.body.password);
    console.log('USERINDB.PASSWORD:', userInDB.password);

    const validPassword = await bcrypt.compare(req.body.password, userInDB.password);
    if (!validPassword) return res.status(401).send('Invalid password');

    res.status(200).send('Logged in');
});


module.exports = router;