import { AuthHandler } from '@benjifs/indieauth'
const { PASSWORD_SECRET, PRIVATE_KEY, PUBLIC_KEY } = process.env
export const indieauth = new AuthHandler({
	passwordSecret: PASSWORD_SECRET,
	privateKey: PRIVATE_KEY,
	publicKey: PUBLIC_KEY,
})
