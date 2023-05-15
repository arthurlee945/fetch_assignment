import { FC, MouseEvent } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles/style-variables";

const SearchOptionButtonContainer = styled.button`
    padding: 10px;
    color: ${colors.black};
    font-size: 1.2rem;
    width: 100%;
    text-align: left;
    &:hover {
        background-color: ${colors.lightGrey};
    }
`;
interface SearchOptionbuttonProps {
    value: string;
    onClick: (e: MouseEvent) => void;
}

const SearchOptionbutton: FC<SearchOptionbuttonProps> = ({ value, onClick }) => {
    return (
        <SearchOptionButtonContainer onClick={onClick} data-value={value}>
            {value}
        </SearchOptionButtonContainer>
    );
};

export default SearchOptionbutton;
