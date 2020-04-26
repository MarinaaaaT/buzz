export const LOGIN_COMPANY = 'LOGIN_COMPANY';
export const LOGOUT_COMPANY = 'LOGOUT_COMPANY';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';

export function loginCompany(company) {
  return {
    type: LOGIN_COMPANY,
    company,
  };
}

export function logoutCompany() {
  return {
    type: LOGOUT_COMPANY,
  };
}

export function updateCompany(company) {
  return {
    type: UPDATE_COMPANY,
    company,
  };
}
