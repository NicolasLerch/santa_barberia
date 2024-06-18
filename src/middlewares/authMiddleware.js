let accessToken = '';

let url = 'https://auth.calendly.com/oauth/token';

let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic undefined'
  },
  body: encodedParams
};

fetch(url, options)
  .then(res => res.json())
//   .then(json => console.log(json))
  .catch(err => console.error('error:' + err));


app.get('/', (req, res) => {
    res.redirect(AUTH_URL)
})