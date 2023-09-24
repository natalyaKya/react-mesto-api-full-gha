
const whitelist = [
  'https://mesto.natalyakya.nomoredomainsrocks.ru',
  'http://mesto.natalyakya.nomoredomainsrocks.ru',
  'localhost:3000',
];

const corsOptions = {
  origin: whitelist,
  methods: 'GET,HEAD,PUT,PATH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: 'true',
};

module.exports = corsOptions;
