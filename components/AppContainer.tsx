import React, { useEffect, useState } from "react";

import { useCountryDisasterNews } from "../apiServices/apiService";
import useConvertPagination from "../hooks/paginationConverter";

import DisasterList from "./DisasterList";
import SearchBar from "./SearchBar";
import { ListWrapper, SearchWrapper } from "./StyledAppContainer";

const AppContainer = () => {
	const [countryName, setCountryName] = useState(null as string | null);
	const [page, setPage] = useState(1);
	const handlePagin = page => setPage(page);
	const convertPage = useConvertPagination(page);
	const handleSelectCountry = (countryName: string) => setCountryName(countryName);
	const countryQuery = useCountryDisasterNews(countryName, convertPage);
	const showList = countryName !== "" && countryName !== null ? true : false;

	useEffect(() => {
		setPage(1);
	}, [countryName]);

	return (
		<>
			<SearchWrapper>
				<SearchBar handleSelectCountry={handleSelectCountry} />
			</SearchWrapper>
			<ListWrapper showList={showList} isLoading={countryQuery.isLoading}>
				<DisasterList
					countryQuery={countryQuery}
					countryName={countryName}
					handlePagin={handlePagin}
					page={page}
					handleCleanCountry={() => setCountryName("")}
				/>
			</ListWrapper>
		</>
	);
};

export default AppContainer;
