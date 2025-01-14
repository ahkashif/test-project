import mongoose from "mongoose";

export async function connect() {
	try {
		mongoose.connect(process.env.MONGO_URI!);
		const connection = mongoose.connection;
		mongoose.connection.setMaxListeners(20);
		connection.on("connected", () => {
			console.log("Mongo DB Connected");
		});

		connection.on("error", (err) => {
			console.log("Mongo DB Connection Error, Make sure DB is up and running" + err);
			process.exit();
		});
	} catch (error) {
		console.log("Something went wrong");
		console.log(error);
	}
}
