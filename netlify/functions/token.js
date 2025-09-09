import { indieauth } from '../config'
export default async (request) => indieauth.tokenEndpoint(request)