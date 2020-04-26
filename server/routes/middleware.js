const requireUserAuth = (req, res, next) =>
  !req.user ? res.status(401).send({ message: 'User not authenticated' }) : next();

  const requireCompanyAuth = (req, res, next) =>
  !req.company ? res.status(401).send({ message: 'Company not authenticated' }) : next();  

module.exports = {
  requireAuth: requireUserAuth,
  requireCompanyAuth: requireCompanyAuth
};
