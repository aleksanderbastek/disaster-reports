import { useQuery } from "react-query";

import { CountryInfoResponse, countryListResponse, totalCountListResponse } from "../interfaces";

export const useCountryDisasterNews = (country: string | null, page: number) => {
	const filterValue = country === null ? "" : `&offset=${page}&filter[value]=${country}`;
	const query = useQuery(["news_api", country, page], async () => {
		if (filterValue !== "") {
			const response = await fetch(
				`https://api.reliefweb.int/v1/disasters?appname=disaster-reports&sort[]=date:desc&filter[field]=country${filterValue}`
			);

			const json = (await response.json()) as CountryInfoResponse;

			return json;
		}

		return null;
	});

	return query;
};

export const useCountryList = () => {
	const query = useQuery(["countryList_api"], async () => {
		const response = await fetch(
			`https://api.reliefweb.int/v1/countries?appname=disaster-reports&sort[]=name:asc&limit=300`
		);

		const json = (await response.json()) as countryListResponse;

		return json.data;
	});

	return query;
};

export const useCountryTotalCount = () => {
	const query = useQuery(["totalCountList-api"], async () => {
		const response = await fetch(
			"https://api.reliefweb.int/v1/disasters?appname=disaster-reports&facets[0][field]=country&facets[0][limit]=300&facets[0][sort]=value:asc&limit=0"
		);
		const json = (await response.json()) as totalCountListResponse;
		return json.embedded.facets.country.data;
	});
	return query;
};
