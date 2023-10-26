const config = {
  toEmail: 'sebastian.degerman@consid.se',
  basicAuth: 'Basic ' + btoa('admin:supersecret'),
  URL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://r-t-server.azurewebsites.net',
  sendURI: '/send'
};

export default config;