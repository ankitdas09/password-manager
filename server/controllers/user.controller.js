import argon2 from "argon2";
import { Router } from "express";

const router = Router();
import { createNewUser, getUserByEmail, getUsers } from "../utils/dbFn.js";

export const getAllUsers = async (req, res) => {
	const users = await getUsers();
	res.json(users);
};

export const createUser = async (req, res) => {
	const { email, password } = req.body;
	const resp = await createNewUser(email, password);
	console.log(resp);
	res.send(resp);
};

export const signInUser = async (req, res) => {
	const { email, password } = req.body;
	const resp = await getUserByEmail(email);
	if (!resp) {
		res.json({ error: true, message: "Invalid Email or Password" });
		return;
	}
	if (!(await argon2.verify(resp.hashedPassword, password))) {
		res.json({ error: true, message: "Invalid Email or Password" });
		return;
	}
	console.log(resp);
	const user = {
		id: resp.id,
		email: resp.email,
		salt: resp.vault.salt,
	};
	res.send(user);
};
