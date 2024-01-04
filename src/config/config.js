const config = {
  toEmail: 'sebastian.degerman@consid.se',
  basicAuth: 'Basic ' + btoa('admin:supersecret'),
  URL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://r-t-server.azurewebsites.net',
  sendURI: '/send',
  interval: 4444,
  DATO_KEY: 'b34d980a48010c75bc03728dbd2df2'
};

export default config;