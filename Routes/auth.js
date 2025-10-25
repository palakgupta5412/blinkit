import express from "express";
const router = express.Router();
import passport from "passport";

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }),function(req,res){})

router.get('/google/callback', passport.authenticate('google',{successRedirect:'/profile', failureRedirect:'/'}),function(req,res){})

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default router