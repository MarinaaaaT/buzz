const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const immutablePlugin = require('mongoose-immutable');
const bcrypt = require('bcryptjs');
const R = require('ramda');

const { Schema } = mongoose;

const companySchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true, immutable: true },
  username_case: { type: String, required: true },
  password: { type: String, required: true },
  company_pic: { type: String },
  company_name: { type: String, maxlength: 20 },
  bio: { type: String, maxlength: 240 },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
});

MongooseAutoIncrementID.initialise('counters');

companySchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: 'Company',
  field: 'company',
  incrementBy: 1,
  startAt: 1,
  unique: true,
  nextCount: false,
  resetCount: false,
});

companySchema.plugin(immutablePlugin);

companySchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

companySchema.methods.hashPassword = function() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) { reject(err1); }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) { reject(err2); }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

companySchema.methods.hidePassword = function() {
  return R.omit(['password', '__v', '_id'], this.toObject({ virtuals: true }));
};

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
