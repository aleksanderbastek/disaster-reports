import { useQuery } from "react-query";

import { CountryInfoResponse } from "../interfaces";

export const useCountryDisasterNews = (country: string | null, page: number) => {
	const filterValue = country === null ? "" : `&offset=${page}&filter[value]=${country}`;
	const query = useQuery(["news_api", country, page], async () => {
		if (filterValue !== "") {
			const response = await fetch(
				`https://api.reliefweb.int/v1/reports?appname=disaster-reports&filter[field]=disaster${filterValue}`
			);

			const json = (await response.json()) as CountryInfoResponse;

			return json;
		}

		return null;
	});

	return query;
};
