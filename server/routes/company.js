const express = require('express');
const bcrypt = require('bcryptjs');
const { requireCompanyAuth } = require('./middleware');
const { Company } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  const company = (req.company && req.company.hidePassword()) || {};

  res.send({ message: 'Company info successfully retreived', company });
});

router.put('/password', requireCompanyAuth, (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (req.company.validPassword(oldPassword)) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.status(400).send({ err, message: 'Error updating password' });
      }
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) {
          res.status(400).send({ err, message: 'Error updating password' });
        }
        Company.findByIdAndUpdate({ _id: req.company._id }, { password: hash }, err => {
          if (err) {
            res.status(400).send({ err, message: 'Error updating password' });
          }
          res.status(200).send({ message: 'Password successfully updated' });
        });
      });
    });
  } else {
    res.status(400).send({ message: 'Old password did not match' });
  }
});

router.put('/', requireCompanyAuth, (req, res) => {
  req.body.updated_at = Date.now();

  Company.findByIdAndUpdate({ _id: req.company._id }, req.body, { new: true }, (err, company) => {
    if (err) {
      res.status(400).send({ err, message: 'Error updating company' });
    }
    res.status(200).send({ message: 'Company successfully updated', company: company.hidePassword() });
  });
});
