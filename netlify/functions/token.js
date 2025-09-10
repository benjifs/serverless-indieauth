import { indieauth } from '../config.js'
export default async (request) => indieauth.tokenEndpoint(request)