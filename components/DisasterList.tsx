import { SearchOutlined } from "@ant-design/icons";
import { Button, List, Pagination } from "antd";
import React from "react";
import { UseQueryResult } from "react-query";

import { CountryInfoResponse } from "../interfaces";

interface Props {
	countryQuery: UseQueryResult<CountryInfoResponse, unknown> | null;
	countryName: string;
	page: number;
	handlePagin(page: number);
}

const DisasterList = ({ countryQuery, countryName, page, handlePagin }: Props) => {
	return (
		<div>
			{countryQuery.data !== null && !(countryName === "") ? (
				countryQuery.isLoading ? (
					<h2>Ładowanie</h2>
				) : (
					<>
						<List
							size="small"
							header={
								<div>
									<div>Results for {countryName}</div>
									<Button
										type="primary"
										shape="circle"
										icon={<SearchOutlined />}
									/>
								</div>
							}
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
