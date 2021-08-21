import { Input, Space, AutoComplete } from "antd";

import countryList from "../public/countryList";

const { Search } = Input;
interface Props {
	handleSelectCountry(countryName: string): void;
}

const SearchBar = ({ handleSelectCountry }: Props) => {
	return (
		<>
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
		</>
	);
};

export default SearchBar;
