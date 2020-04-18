const Axios = require('axios');
const qs = require('querystring');

const axios = Axios.create({
  baseURL: 'https://spotify.home.yooooomi.com/api/',
  withCredentials: true,
});

async function main(path) {
  const user = await axios.post('/login', { username: 'oioi', password: 'oioi' });
  axios.defaults.headers.common.Cookie = user.headers['set-cookie'][0];
  const args = qs.encode({
    start: (new Date((new Date()).getTime() - 24 * 60 * 60 * 1000)).toUTCString(),
    timeSplit: 'hour',
  })
  const { data } = await axios.get(`/spotify/${path}?${args}`);
  console.log(data);
}

main(process.argv[2]);
