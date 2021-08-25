export interface CountryInfo {
	fields: {
		title: string;
	};
	href: string;
	id: string;
}

export interface CountryInfoResponse {
	count: number;
	data: CountryInfo[];
	totalCount: number;
}

export interface countryListData {
	id: number;
	score: number;
	fields: {
		name: string;
	};
	href: string;
}

export interface countryListResponse {
	count: number;
	data: countryListData[];
	totalCount: number;
}
