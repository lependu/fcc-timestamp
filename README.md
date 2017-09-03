### Timestamp microservice
Free code camp
[timestamp](https://www.freecodecamp.org/challenges/timestamp-microservice)
microservice challenge.

### Endpoints
## `GET /timestamp/[time-param]`

**Description:**

Returns parsed param  in natural and unix timestamp form in UTC timezone.

**Param**: `{String} | {Date}`
It accepts `MMMM D, YYYY` string or unix timestamp (in seconds) format

**Example response:**
```JSON
{
  "unix": "1483228800",
  "natural": "January 1, 2017"
}
```

### Errors

## `400`
**Descripton:** It appears when the provided param is not a properly formatted
date string nor a unix timestamp.
```JSON
{
  "status": 400,
  "message": "Bad request",
  "unix": null,
  "natural": null
}
```

## `404`
```JSON
{
  "status": 404,
  "message": "Page no found",
}
```

### Development
- development server with nodemon
`$ npm run dev`
visit http://localhost:[APP_PORT]

### Tests
- lint `$ npm run lint`
- test `$ npm run test`
- coverage `$ npm run coverage`

### Deployment
The deployment process depends on your server and needs.
[Here](https://egghead.io/lessons/node-js-setup-an-nginx-proxy-for-a-node-js-app-with-docker)
you can find a cool tutorial how to setup an `nginx` proxy for a `Node.js` app.
