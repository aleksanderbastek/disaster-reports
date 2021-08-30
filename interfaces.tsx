export interface CountryInfo {
	fields: {
		name: string;
	};
	href: string;
	id: string;
}

export interface CountryInfoResponse {
	count: number;
	data: CountryInfo[];
	totalCount: number;
}

//CountryList
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

// TotalCountList
export interface Data {
	value: string;
	count: number;
}

interface Country {
	type: string;
	data: Data[];
	missing: number;
	more: boolean;
}

interface Facet {
	country: Country;
}

interface Embedded {
	facets: Facet;
}

export interface totalCountListResponse {
	time: number;
	href: string;
	took: number;
	totalCount: number;
	count: number;
	embedded: Embedded;
}

// iso3 converter

export interface countryListAllIsoDataType {
	code: string;
	code3: string;
	name: string;
	number: string;
}

export interface DataIso3 {
	value: string;
	count: number;
	ISO3: string;
}
