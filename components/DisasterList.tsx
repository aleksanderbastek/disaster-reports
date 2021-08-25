import { RightOutlined } from "@ant-design/icons";
import { Button, List, Pagination } from "antd";
import React from "react";
import { UseQueryResult } from "react-query";

import { CountryInfoResponse } from "../interfaces";

import { HeaderListWrapper } from "./StyledAppContainer";

interface Props {
	countryQuery: UseQueryResult<CountryInfoResponse, unknown> | null;
	countryName: string;
	page: number;
	handlePagin(page: number);
	handleCleanCountry();
}

const DisasterList = ({
	countryQuery,
	countryName,
	page,
	handlePagin,
	handleCleanCountry
}: Props) => {
	return (
		<div>
			{countryQuery.data !== null && !(countryName === "") ? (
				countryQuery.isLoading ? (
					<h2></h2>
				) : (
					<>
						<List
							size="small"
							header={
								<HeaderListWrapper>
									<div>Results for {countryName}</div>
									<Button
										type="primary"
										shape="circle"
										icon={<RightOutlined />}
										onClick={handleCleanCountry}
										danger
									/>
								</HeaderListWrapper>
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
