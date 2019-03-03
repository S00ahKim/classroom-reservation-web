const express = require('express');
const User = require('../models/user');
const Reservation = require('../models/reservation');
const router = express.Router();
const catchErrors = require('../lib/async-error');

//- TODO: 라우터 추가 필요

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '먼저 로그인 해주세요.');
    res.redirect('/signin');
  }
}

function validateForm(form, options) {
  var name = form.name || "";
  var studentID = form.studentID || "";
  name = name.trim();
  studentID = studentID.trim();

  if (!name) {
    return '이름이 입력되어야 합니다.';
  }

  if (!studentID) {
    return '학번이 입력되어야 합니다.';
  }

  if (!form.password && options.needPassword) {
    return '비밀번호가 입력되어야 합니다.';
  }

  if (form.password !== form.password_confirmation) {
    return '비밀번호가 맞지 않습니다.';
  }

  if (form.password.length < 6) {
    return '비밀번호는 최소 6글자 이상이어야 합니다.';
  }

  return null;
}


module.exports = router;
