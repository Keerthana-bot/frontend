import { useState, useContext, createContext, useEffect } from "react";
import {
	getToken,
	login,
	getUserData,
	getAccess,
	logout,
} from "../utils/handleAuth";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";
const AuthContext = createContext({});

export function AuthProvider({ children }) {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState({});
	const [MyToken, setMyToken] = useState("");
	const [access, setAccess] = useState(false);
	const [books, setBooks] = useState({});
	const [error, setError] = useState(false);
	
	const [adminHomeData, setAdminHomeData] = useState({
		users: 0,
		books: 0,
		rbooks: 0,
		online: 0,
	});

	useEffect(() => {
		const myToken = getToken();
		if (myToken) {
			setIsAuthenticated(true);
			setMyToken(myToken);
			setUser(getUserData());
			setAccess(getAccess());
		}
	}, []);

	async function SignIn(email, password) {
		return await API.post("/users/login", { email, password });
	}



	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}