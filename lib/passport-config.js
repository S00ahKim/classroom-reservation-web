const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => { 
    done(null, user.id); 
  });

  passport.deserializeUser((id, done) => { 
    User.findById(id, done);
  });

  passport.use('local-signin', new LocalStrategy({ 
    usernameField: 'stuendID',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, studentID, password, done) => {
    try {
      const user = await User.findOne({ studentID: studentID });
      if (user && await user.validatePassword(password)) {
        return done(null, user, req.flash('success', '반갑습니다!'));
      }
      return done(null, false, req.flash('danger', '유효하지 않은 학번 또는 비밀번호입니다.'));
    } catch (err) {
      done(err);
    }
  }));
};

