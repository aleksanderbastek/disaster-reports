import { Input, Space, AutoComplete } from "antd";

import { useCountryList } from "../apiServices/apiService";
import { countryListData } from "../interfaces";

const { Search } = Input;
interface Props {
	handleSelectCountry(countryName: string): void;
}

const SearchBar = ({ handleSelectCountry }: Props) => {
	const countryListData = useCountryList();
	const countryList = countryListData.isLoading
		? []
		: countryListData.data.map((name: countryListData) => {
				return { value: name.fields.name };
		  });

	return (
		<>
			{!countryListData.isLoading && (
				<Space direction="vertical">
					<AutoComplete
						options={countryList}
						onSelect={handleSelectCountry}
						filterOption={(inputValue, option) =>
							option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						}
					>
						<Search
							size="large"
							placeholder="input here"
							enterButton="Search"
							allowClear
							style={{ width: 600 }}
							onSearch={handleSelectCountry}
						/>
					</AutoComplete>
				</Space>
			)}
		</>
	);
};

export default SearchBar;
