const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


/*  name 학생 이름 또는 닉네임 (정보 수정 페이지에서 수정 가능, DB 용량을 위해 필수 옵션 제거)
    role 관리자 계정과 일반 계정 분리
    studentID 학번
    password 비밀번호
    contact 연락처
    */

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  role: {type:String}, 
  studentID: {type: String, required: true, index: true, unique: true, trim: true},
  password: {type: String, required: true, trim: true},
  contact: {type: String, required: true, trim: true}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.methods.generateHash = function(password) {
  return bcrypt.hash(password, 10); // return Promise
};

schema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password); // return Promise
};

var User = mongoose.model('User', schema);

module.exports = User;
