# serverless-indieauth (barnacle)

This project uses [@benjifs/indieauth](https://github.com/benjifs/indieauth) to
setup a serverless [IndieAuth](https://indieauth.net/) endpoint.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/benjifs/serverless-indieauth)

Clicking the "Deploy to Netlify" button will fork this repository and create a new
[Netlify](https://www.netlify.com/) site which will setup an [authorization](https://indieweb.org/authorization-endpoint)
and [token](https://indieweb.org/token-endpoint) endpoint.

## Setup

When setting this project up on Netlify, you should be asked to configure the following
**environment variables**:

### `SECRET`
A random generated string which will be used to create the access token. You can
generate it with:
- `openssl rand -hex 16`
- Generate a [random string](https://generate-random.org/string-generator)

### `PASSWORD_SECRET`
Your password hashed with [bcrypt](https://en.wikipedia.org/wiki/Bcrypt). To do so
you can either:
- `htpasswd -bnBC 10 "" toomanysecrets | cut -d : -f 2` where "toomanysecrets" is the password
- Use [this website](https://www.bcrypt.io/) to create the hash

### Routes
Optionally, you can customize the routes if you would like them to be different
than the default. You can do this by renaming the filenames in [/netlify/functions](/netlify/functions)
or add a `path` value to the function's config like in [metadata.js](/netlify/functions/metadata.js).
For more info you can also read Netlify's [Route requests](https://docs.netlify.com/build/functions/get-started/?data-tab=TypeScript#route-requests) documentation.

If you modify the routes, you will also have to make sure the values that you've
changed them to match the values shown in [metadata.js](/netlify/functions/metadata.js).
For example, if you rename `auth.js` to `authorization.js`, you will need to change
[Line 5 in `metadata.js`](https://github.com/benjifs/serverless-indieauth/blob/d74bb3a2efa675f5d0678fcc63fa9f66a847c5ce/netlify/functions/metadata.js#L5) from:

```js
authorization_endpoint: `${process.env.URL}/auth`
```

to

```js
authorization_endpoint: `${process.env.URL}/authorization`
```

## Usage

After your IndieAuth server is built and deployed, you will need to add the following
to the `<head>` of your site:

```html
<link rel="indieauth-metadata" href="https://auth.example.com/.well-known/oauth-authorization-server">
<link rel="authorization_endpoint" href="https://auth.example.com/auth">
<link rel="token_endpoint" href="https://auth.example.com/token">
```

Where `auth.example.com` is the domain where your site gets deployed to, whether
a Netlify subdomain (default) or [custom domain](https://docs.netlify.com/manage/domains/get-started-with-domains/)
if you are using one.

By default, this project sets up the following endpoints at the following routes:

### **GET** `/.well-known/oauth-authorization-server`
Show [IndieAuth Server Metadata](https://indieauth.spec.indieweb.org/#indieauth-server-metadata).

### **GET** `/auth`
Show login form to [Authenticate](https://indieauth.spec.indieweb.org/#authorization-request).

### **POST** `/auth`
Exchange `code` for [Profile Information](https://indieauth.spec.indieweb.org/#profile-information).

### **GET** `/token` (legacy)
Check if `token` is [valid](https://indieauth.spec.indieweb.org/#access-token-verification-response).

### **POST** `/token`
Exchange `code` for [Access Token](https://indieauth.spec.indieweb.org/#access-token-response).

### **POST** `/introspect`
Check if `token` is [valid](https://indieauth.spec.indieweb.org/#access-token-verification-response).
Updated from **GET** `/token` on [Feb 2022](https://indieauth.spec.indieweb.org/#changes-from-26-november-2020-to-12-february-2022).

### **GET** `/userinfo`
Get [User Information](https://indieauth.spec.indieweb.org/#user-information).

## References
* [IndieAuth spec](https://indieauth.spec.indieweb.org/)
* [authorization-endpoint](https://indieweb.org/authorization-endpoint)
* [token-endpoint](https://indieweb.org/token-endpoint)
