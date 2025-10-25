//the code snippet copied from passport.js website search passport google oauth then 
//code for serialize and deserialise is also copied and modified from the same source 
//import userModel and passport 

import GoogleStrategy from 'passport-google-oauth20';

import userModel from '../models/userModel.js';
import passport from 'passport';

passport.use(new GoogleStrategy({
    //will save these credentials in env file
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  // this above step will give data in profile, jo bhi google id hum authentication 
  // ke liye select krnge toh usko profile mein store krna hoga
  async function(accessToken, refreshToken, profile, cb) {
    try{
        //searching for the user in database with this unique email 
        let user = await userModel.findOne({email : profile.emails[0].value});
    
        if(!user){
            user = userModel({
                name : profile.displayName,
                email : profile.emails[0].value     //profile mein emails naam se array ke 0th index pe value hoti h email ki jisse we are trying to login 
            })
            await user.save();
            //callback fn cb to be called or else it wont move further 
            cb(null,user);
        }
    }
    catch(err){
        cb(err,false);
    }
  }
));

// serializing is the process of converting the user object into a string so that it 
// can be stored in the session this basically stores the user id in the session so 
// that we can know which user is logged in and passes this with each request and route to keep us logged in in each route 

passport.serializeUser(function(user, cb){
    //asks us to return what to store in session like id or username , on what basis user will be identified
    cb(null,user._id);
})

passport.deserializeUser(async function(id, cb){
    let user = await userModel.findOne({_id : id});
    cb(null,user);      //showing all data corresponding to id 

    //cb(null,user._id);    //showing only id
})

export default passport;