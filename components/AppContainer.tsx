import React, { useEffect, useState } from "react";

import { useCountryDisasterNews } from "../apiServices/apiService";
import useConvertPagination from "../hooks/paginationConverter";

import DisasterList from "./DisasterList";
import SearchBar from "./SearchBar";
import { ListWrapper, SearchWrapper } from "./StyledAppContainer";

const AppContainer = () => {
	const [onSearch, setOnSearch] = useState(null as string | null);
	const [page, setPage] = useState(1);
	const handlePagin = page => setPage(page);
	const convertPage = useConvertPagination(page);
	const handleClick = (countryName: string) => setOnSearch(countryName);
	const countryQuery = useCountryDisasterNews(onSearch, convertPage);

	useEffect(() => {
		setPage(1);
	}, [onSearch]);

	return (
		<>
			<SearchWrapper>
				<SearchBar handleClick={handleClick} />
			</SearchWrapper>
			<ListWrapper>
				<DisasterList
					countryQuery={countryQuery}
					countryName={onSearch}
					handlePagin={handlePagin}
					page={page}
				/>
			</ListWrapper>
		</>
	);
};

export default AppContainer;
