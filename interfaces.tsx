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
