import express from "express";
import cors from "cors";
import userRoutes from "../routes/user.routes.js";

function startServer(app, PORT) {
	app.use(cors({ credentials: true }));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use("/users", userRoutes);

	app.use((err, req, res, next) => {
		const { status = 500, message = "Something went wrong!" } = err;
		res.status(status).json({ error: true, message: message });
	});

	app.listen(PORT, () => {
		console.log(`Listening on PORT ${PORT}`);
	});
}
export default startServer;
