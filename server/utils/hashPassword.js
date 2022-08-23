import argon2 from "argon2";
export default async function genHash(password) {
	return await argon2.hash(password);
}
