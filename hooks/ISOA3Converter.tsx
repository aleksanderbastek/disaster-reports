import { countryListAllIsoDataType, Data } from "../interfaces";
import { countryListAllIsoData } from "../public/ISOA3CountriesCodes";

const findIso = (name: string, array: countryListAllIsoDataType[]) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i].name === name) {
			return array[i].code3;
		}
	}
};

export const useConvertToISOA3 = (countryList: Data[]) => {
	if (countryList) {
		return countryList.map(c => {
			return {
				value: c.value,
				count: c.count,
				ISO3: findIso(c.value, countryListAllIsoData)
			};
		});
	} else return null;
};
