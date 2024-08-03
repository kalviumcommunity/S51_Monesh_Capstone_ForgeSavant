const mongoose = require('mongoose');

const savesSchema = new mongoose.Schema({
  cpu : { type : String, required : true},
  motherboard : { type : String, required : true}, 
  gpu : { type : String, required : true},
  primaryStorage : { type : String, required : true},
  secondaryStorage : { type : String, required : true},
  ram : { type : String, required : true},
  powerSupply : { type : String, required : true},
  cabinet : { type : String, required : true},
  email : { type : String, required : true},
  cinebench : {type: String, required : true},
  cyberpunk : {type: String, required: true},
  image: {type: String, required: true},
});

const savesSchema2 = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  cpu : { type : String, required : true},
  motherboard : { type : String, required : true},
  gpu : { type : String, required : true},
  primaryStorage : { type : String, required : true},
  secondaryStorage : { type : String, required : true},
  ram : { type : String, required : true},
  powerSupply : { type : String, required : true},
  cabinet : { type : String, required : true},
  email : { type : String, required : true},
  cinebench : {type: String, required : true},
  cyberpunk : {type: String, required: true},
  image: {type: String, required: true},
})

const saves = mongoose.model('saves', savesSchema);
const saves2 = mongoose.model('saves2', savesSchema2, 'saves');
module.exports = {saves, saves2};
