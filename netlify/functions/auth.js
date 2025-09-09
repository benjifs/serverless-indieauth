import { indieauth } from '../config'
export default async (request) => indieauth.authorizationEndpoint(request)