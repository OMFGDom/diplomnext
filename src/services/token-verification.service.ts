// services/token-verification.service.js
export function verifyToken(token: string) {
	try {
		if (typeof token !== 'string') {
			throw new Error('Invalid token format')
		}

		const [header, payload, signature] = token.split('.')

		if (!header || !payload || !signature) {
			throw new Error('Incomplete token')
		}

		// Decode the payload from Base64Url to a string
		const payloadJson = Buffer.from(payload, 'base64url').toString('utf-8')

		// Parse the string into a JSON object
		const { exp } = JSON.parse(payloadJson)

		// Check if the token has expired
		return exp > Date.now() / 1000
	} catch (error) {
		return false
	}
}
