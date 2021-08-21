import { Input, Space, AutoComplete } from "antd";
import { useState, useEffect } from "react";

const { Search } = Input;
const options = [
	{ value: "Angola" },
	{ value: "Algeria" },
	{ value: "Afganistan" },
	{ value: "Poland" },
	{ value: "Panama" }
];
interface Props {
	handleClick(countryName: string): void;
}

const SearchBar = ({ handleClick }: Props) => {
	return (
		<>
			<Space direction="vertical">
				<AutoComplete options={options}>
					<Search
						size="large"
						placeholder="input here"
						enterButton="Search"
						allowClear
						onSearch={handleClick}
						style={{ width: 600 }}
					/>
				</AutoComplete>
			</Space>
		</>
	);
};

export default SearchBar;
