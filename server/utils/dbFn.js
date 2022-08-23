import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import genSalt from "./genSalt.js";
import genHash from "./hashPassword.js";

export const getUsers = async () => {
	try {
		const users = await prisma.user.findMany({
			select: {
				email: true,
				vault: {
					select: { salt: true },
				},
			},
		});
		return users;
	} catch (error) {
		return false;
	}
};

export const createNewUser = async (email, password) => {
	try {
		const salt = genSalt();
		const hash = await genHash(password);
		await prisma.user.create({
			data: {
				email: email,
				hashedPassword: hash,
				vault: {
					create: {
						salt: salt,
					},
				},
			},
		});
		return true;
	} catch (error) {
		return false;
	}
};

export const getUserByEmail = async (email) => {
	try {
		const user = await prisma.user.findFirst({
			where: { email: email },
			select: {
				email: true,
				hashedPassword: true,
				vault: {
					select: {
						salt: true,
					},
				},
			},
		});
		return user;
	} catch (error) {
		return false;
	}
};
