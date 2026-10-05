import { indieauth } from '../config.js'
export const config = { path: '/.well-known/oauth-authorization-server' }
export default async (request) => indieauth.getMetadata(request, {
	issuer: process.env.URL,
	authorization_endpoint: `${process.env.URL}/auth`,
	token_endpoint: `${process.env.URL}/token`,
	introspection_endpoint: `${process.env.URL}/introspect`,
	userinfo_endpoint: `${process.env.URL}/userinfo`,
	jwks_uri: `${process.env.URL}/jwks`,
})
