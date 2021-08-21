import type { NextPage } from "next";
import { ReactQueryDevtools } from "react-query/devtools";

import AppContainer from "../components/AppContainer";

const Home: NextPage = () => {
	return (
		<>
			<AppContainer />
			<ReactQueryDevtools />
		</>
	);
};

export default Home;
