import styled from "styled-components";
interface ListWrapperProps {
	showList: boolean;
	isLoading: boolean;
}
export const SearchWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin: 10px;
	z-index: 999;
`;
export const ListWrapper = styled.div<ListWrapperProps>`
	position: absolute;
	right: ${props => (props.showList && !props.isLoading ? "0%" : "-100%")};
	margin: 10px;
	width: 40vw;
	transition: 1s;
	z-index: 999;
	background-color: white;
`;

export const HeaderListWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
