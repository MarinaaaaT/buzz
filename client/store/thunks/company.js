import { snakeToCamelCase } from 'json-style-converter/es5';
import Notifications from 'react-notification-system-redux';

import { getCompany, putCompany, putCompanyPassword } from '_api/company';
import { updateCompany } from '_actions/company';

import { dispatchError } from '_utils/api';

export const attemptGetCompany = () => dispatch =>
  getCompany()
    .then(data => {
      dispatch(updateCompany(snakeToCamelCase(data.company)));
      return data.company;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateCompany = updatedCompany => dispatch =>
  putCompany(updatedCompany)
    .then(data => {
      dispatch(updateCompany(snakeToCamelCase(data.company)));
      dispatch(Notifications.success({
        title: 'Success!',
        message: data.message,
        position: 'tr',
        autoDismiss: 3,
      }));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdatePassword = passwordInfo => dispatch =>
  putCompanyPassword(passwordInfo)
    .then(data => {
      dispatch(Notifications.success({
        title: 'Success!',
        message: data.message,
        position: 'tr',
        autoDismiss: 3,
      }));
      return data;
    })
    .catch(dispatchError(dispatch));
