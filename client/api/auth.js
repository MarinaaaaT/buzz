import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const postRegister = user =>
  request.post('/api/auth/register')
    .send(user)
    .then(handleSuccess)
    .catch(handleError);

export const postLogin = user =>
  request.post('/api/auth/login')
    .send(user)
    .then(handleSuccess)
    .catch(handleError);

export const postCompanyRegister = company =>
  request.post('/api/auth/registerCompany')
    .send(company)
    .then(handleSuccess)
    .catch(handleError);

export const postCompanyLogin = company =>
  request.post('/api/auth/loginCompany')
    .send(company)
    .then(handleSuccess)
    .catch(handleError);

export const postLogout = () =>
  request.post('/api/auth/logout')
    .then(handleSuccess)
    .catch(handleError);
