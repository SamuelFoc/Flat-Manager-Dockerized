// TODO: CORS (Cross-Origin-Resource-Sharing) these are the alowed origins that can send requests to this API.

const allowedOrigins = [
  "https://www.aha-cloud.com",
  "http://www.aha-cloud.com",
  "http://localhost",
  "http://localhost:3000",
  "http://192.168.0.2",
  "http://192.168.0.2:3000",
];

module.exports = allowedOrigins;
