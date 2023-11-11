import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import NotFound404 from "./Pages/404/NotFound404";
import Mailer from "./Pages/Mailer/Mailer";

const baseURL =
	window.location.hostname === "mailer.adityachoudhury.com"
		? "https://mailer-backend.adityachoudhury.com"
		: "http://localhost:5000";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Mailer />} />
				<Route path="*" element={<NotFound404 />} />
			</Routes>
		</Router>
	);
}

export default App;
