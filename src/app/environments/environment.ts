export const environment = {
  production: false, // Indica che è l'ambiente di sviluppo
  appName: 'Passaparola',

  apiKrathemisTest: 'https://testapi.krathemis.com/api/', // URL di testing

  apiUnika: 'https://wallet.unikaexchange.com/api',
  urlPWA: '',
  joinAppLink: 'https://passaparola.page.link/join',
  language: {
    default: 'es',
    list: ['es', 'en', 'val'],
  },
  firebaseConfig: {
    apiKey: 'AIzaSyAEOEs_zxUUGAGYcAzu3OdxtAohOnuQtFk',
    authDomain: 'app-passaparola.firebaseapp.com',
    projectId: 'app-passaparola',
    storageBucket: 'app-passaparola.appspot.com',
    messagingSenderId: '535115645434',
    appId: '1:535115645434:web:16928243b2a8701139e443',
  },
  urlBucketStorage: 'https://s3youetix.s3.nl-ams.scw.cloud',
  cryptoJS: {
    size: 8,
    lastKeyEncrypt: '4NT4D1G1',
    key: 'wert',
  },

  p73: {
    nameApp: "p73",
    url: "http://localhost:3000",
    token: "EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD"
  },
  etixPay: {
    nameApp: "etixPay",
    url: "https://api-alfa.youetix.com",
    token: "EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD"
  },
  etixMarket: {
    nameApp: "etixMarket",
    url: "https://beta-market.youetix.com",
    token: "pXTy127pEjPs5icx6G82iEHWaaW1rRMZs0VYiduEiGwiwY8Gu1"
  },
  gateway: {
    nameApp: "gateway",
    url: "https://beta-gateway.youetix.com",
    token: ""
  },
  imageGenerate : {
    nameApp: "imageGenerate",
    url: "https://generator.protocol73.com",
    token: ""
  }
};
