import { List, Pagination } from "antd";
import React from "react";
import { UseQueryResult } from "react-query";

import { CountryInfoResponse, CountryInfo } from "../interfaces";

interface Props {
	countryQuery: UseQueryResult<CountryInfoResponse, unknown> | null;
	countryName: string;
	page: number;
	totalCount?: number;
	handlePagin(page: number);
}

const DisasterList = ({ countryQuery, countryName, page, handlePagin }: Props) => {
	console.log(countryQuery);
	return (
		<div>
			{countryQuery.data !== null ? (
				countryQuery.isLoading && !(countryName === "") ? (
					<h2>Ładowanie</h2>
				) : (
					<>
						<List
							size="small"
							header={<div>Results for {countryName}</div>}
							bordered
							dataSource={countryQuery.data.data}
							renderItem={item => (
								<List.Item key={item.id}>{item.fields.title}</List.Item>
							)}
							footer={
								<Pagination
									simple
									current={page}
									total={countryQuery.data.totalCount}
									onChange={page => handlePagin(page)}
								/>
							}
						/>
					</>
				)
			) : (
				<div></div>
			)}
		</div>
	);
};

export default DisasterList;
