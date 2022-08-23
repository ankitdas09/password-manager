import crypto from "crypto";
export default function genSalt() {
	return crypto.randomBytes(64).toString("hex");
}
