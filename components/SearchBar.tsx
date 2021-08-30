import { Input, Space, AutoComplete } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";

import { useCountryList } from "../apiServices/apiService";
import { countryListData } from "../interfaces";

import { MenuS, Logo } from "./StyledAppContainer";

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
		<Header>
			<MenuS theme="dark" mode="horizontal">
				<Logo>DisasterReports</Logo>
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
								size="middle"
								placeholder="input here"
								enterButton="Search"
								allowClear
								style={{ width: 400 }}
								onSearch={handleSelectCountry}
							/>
						</AutoComplete>
					</Space>
				)}
			</MenuS>
		</Header>
	);
};

export default SearchBar;
