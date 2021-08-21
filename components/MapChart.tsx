import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps";

interface CountryInfo {
	fields: {
		title: string;
	};
	href: string;
	id: string;
}

interface CountryInfoResponse {
	data: CountryInfo[];
}

const useCountryNews = (country: string | null) => {
	const filterValue = country === null ? "" : `&filter[value]=${country}`;

	const query = useQuery(["news_api", country], async () => {
		if (filterValue !== null) {
			const response = await fetch(
				`https://api.reliefweb.int/v1/reports?appname=apidoc&filter[field]=disaster${filterValue}`
			);

			const json = (await response.json()) as CountryInfoResponse;

			return json.data;
		}

		return null;
	});

	return query;
};

const geoUrl =
	"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const colorScale = scaleLinear().domain([0.29, 0.68]).range(["#ffedea", "#ff5233"]);

const MapChart = () => {
	const [data, setData] = useState([]);

	const [selectedCountry, setSelectedCountry] = useState(null as string | null);
	const countryQuery = useCountryNews(selectedCountry);

	useEffect(() => {
		csv(`/vulnerability.csv`).then(data => {
			setData(data);
		});
	}, []);

	const infoAboutCountry = countryQuery.isLoading ? (
		<h2>Ładowanie</h2>
	) : (
		countryQuery.data.map(info => <div key={info.id}>{info.fields.title}</div>)
	);

	return (
		<>
			<h1>{selectedCountry}</h1>
			{infoAboutCountry}
			<ComposableMap
				projectionConfig={{
					rotate: [-10, 0, 0],
					scale: 147
				}}
			>
				<Sphere stroke="#E4E5E6" strokeWidth={0.5} id="1" fill="#ffffff" />
				<Graticule stroke="#E4E5E6" strokeWidth={0.5} />
				{data.length > 0 && (
					<Geographies geography={geoUrl}>
						{info =>
							info.geographies.map(geo => {
								const d = data.find(s => s.ISO3 === geo.properties.ISO_A3);
								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										onClick={() => setSelectedCountry(geo.properties.NAME)}
										fill={"#F5F4F6"}
									/>
								);
							})
						}
					</Geographies>
				)}
			</ComposableMap>
		</>
	);
};

export default MapChart;
