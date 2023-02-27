const _isLocalhost = window.location.port.indexOf('4200') > -1;
const _isDev = window.location.origin.indexOf('app-bok.gke.dev.gcp.renault.com') > -1;
const _isQa = window.location.origin.indexOf('app-bok.gke.int.gcp.renault.com') > -1;


const _isOpe = () => {
  if (window.location.origin.indexOf('booking-online.renault.com') > -1 || window.location.origin.indexOf('booking-online.renault.fr') > -1) {
    return true;
  }
  else {
    return false;
  }
};

const getHostApi = () => {
  if (_isLocalhost) { return 'http://localhost:8080/api'; }
  else {
    return '/api/';
  }
};

const getHostApi1 = () => {
  if (_isLocalhost) { return 'http://localhost:8080/api2'; }
  else {
    return '/api/';
  }
};

const getHostApi2 = () => {
  if (_isLocalhost) { return 'http://localhost:8080/api/v1'; }
  else {
    return '/api/';
  }
};
const getHostApi3 = () => {
  if (_isLocalhost) { return 'http://localhost:8080/api/v2'; }
  else {
    return '/api/';
  }
};

export const ENV = {
  API_HOST_URL: getHostApi(),
  API_HOST_1_URL: getHostApi1(),
  API_HOST_2_URL: getHostApi2(),
  API_HOST_3_URL: getHostApi3()
};
