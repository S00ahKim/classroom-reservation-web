const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*  
    roomnum 강의실 번호
    booker 예약자의 studentID
    start 예약 시작 시간
    end 예약 종료 시간
    date 예약 날짜
    createdAt 예약 순간의 시각 정보
    object 예약 목적

    */

var schema = new Schema({
  roomnum: {type: String, required: true, trim: true},
  booker: { type: Schema.Types.ObjectId, ref: 'User' },  
  start: { type: Number, required: true, trim: true },  
  end: { type: Number, required: true, trim: true }, 
  date: { type: Date, required: true, trim: true },  
  createdAt: {type: Date, default: Date.now},
  object: {type: String, required: true, trim: true}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
var Reservation = mongoose.model('Reservation', schema);

module.exports = Reservation;