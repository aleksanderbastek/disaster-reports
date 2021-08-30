import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

import { useCountryDisasterNews } from "../apiServices/apiService";
import useConvertPagination from "../hooks/paginationConverter";

import DisasterList from "./DisasterList";
import MapChart from "./MapChart";
import SearchBar from "./SearchBar";
import { ListWrapper, SearchWrapper } from "./StyledAppContainer";

const AppContainer = () => {
	const [countryName, setCountryName] = useState(null as string | null);
	const [page, setPage] = useState(1);
	const [content, setContent] = useState("" as string | null);

	const handlePagin = page => setPage(page);
	const handleSelectCountry = (countryName: string | null) => setCountryName(countryName);

	const convertPage = useConvertPagination(page);
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
			<Content>
				<ListWrapper showList={showList} isLoading={countryQuery.isLoading}>
					<DisasterList
						countryQuery={countryQuery}
						countryName={countryName}
						handlePagin={handlePagin}
						page={page}
						handleCleanCountry={() => setCountryName("")}
					/>
				</ListWrapper>
				<MapChart selectCountry={handleSelectCountry} setTooltipContent={setContent} />
				<ReactTooltip backgroundColor="#1f1a1a">{content}</ReactTooltip>
			</Content>
		</>
	);
};

export default AppContainer;
