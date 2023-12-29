const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
};

const registerUser = asyncHandler ( async (req, res)=> {
    const {name, email, password} = req.body

    //validation
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter values for all fields");
    }
    if(password.length < 6) {
        res.status(400);
        throw new Error("password must be atleast 6 character");
    }
    
    //Check if email already exist
    const UserExists = await User.findOne({email});

    if(UserExists) {
        res.status(400)
        throw new Error("Email has been already registered");
    }

    //Create new user
    const user = await User.create({
        name,
        email,
        password,
    })

    // Generating token
    const token = generateToken()

    //send cookie - token for valid user login 
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    });

    if(user) {

        const {_id, name, email, phone, photo, bio} = user

        res.status(201).json({
            _id, name, email, phone, photo, bio, token,
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data");
    }
});

// Login User
const LoginUser = asyncHandler( async (req, res)=> { 
    
    const {email, password} = req.body;

    // Validation
    if(!email || !password) {
        res.status(400);
        throw new Error("Please Enter Email and Password");
    }

    const user = await User.findOne({email});

    if(!user) {
        res.status(400);
        throw new Error("No user found");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    const token = generateToken(user._id)

    //send cookie - token for valid user login 
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    });


    if(user && passwordIsCorrect) {
        const {_id, name, email, phone, photo, bio} = user

        res.status(200).json({
            _id, name, email, phone, photo, bio, token
        })
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }

});

const logout = asyncHandler (async (req, res)=> {
    
    //expire cookie to logout user
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });

    return res.status(200).json({
        message: "User Logged Out",

    })
});


//get user profile
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      const { _id, name, email, photo, phone, bio } = user;
      res.status(200).json({
        _id, name, email, photo, phone, bio,
    })
    } else {
      res.status(400);
      throw new Error("User Not Found");
    }
  });

const loginStatus = asyncHandler (async (req, res)=> {
    const token = req.cookies.token;

    if(!token) {
        return res.json(false)
    }  
    
    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(verified) {
        return res.json(true);
    }
    return res.json(false);

});

module.exports = {
    registerUser,
    LoginUser,
    logout,
    getUser,
    loginStatus,
}