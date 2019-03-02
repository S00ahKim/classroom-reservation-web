module.exports = (app, passport) => {
  app.get('/login', (req, res, next) => {
    res.render('login');
  });

  app.post('/signin ', passport.authenticate('local-signin', {
    successRedirect : '/',  
    failureRedirect : '/signin',  
    failureFlash : true  
  }));

  
  app.get('/signout', (req, res) => {
    req.logout();
    req.flash('success', '로그아웃 되었습니다.');
    res.redirect('/signin');
  });
};
