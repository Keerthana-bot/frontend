import { io } from "socket.io-client";
import { BASE_URL } from "../config"
const connectionOptions = {
	reconnectionAttempts: "Infinity",
	timeout: 10000,
};
export const socket = io(BASE_URL, connectionOptions);