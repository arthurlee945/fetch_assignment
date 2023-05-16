import { FC, MouseEvent } from "react";
import styled from "@emotion/styled";
import { colors, medias } from "@/styles/style-variables";

const SearchOptionButtonContainer = styled.label`
    position: relative;
    width: 100%;
    text-align: left;
    cursor: pointer;
    &:hover {
        > .state-display {
            background-color: ${colors.lightGrey};
        }
    }
    input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        &:checked + .state-display {
            background-color: ${colors.darkBlue};
            color: ${colors.white};
        }
    }
    @media screen and (max-width: ${`${medias.mobile}px`}) {
        font-size: 1rem;
    }
    .state-display {
        color: ${colors.black};
        font-size: 1.2rem;
        padding: 10px;
        transition: background-color 300ms, color 300ms;
    }
`;
interface SearchOptionbuttonProps {
    value: string;
    onClick: (e: MouseEvent) => void;
}

const SearchOptionbutton: FC<SearchOptionbuttonProps> = ({ value, onClick }) => {
    return (
        <SearchOptionButtonContainer data-value={value} aria-label={value + "-select-button"} tabIndex={0}>
            <input type="checkbox" onClick={onClick} data-value={value} tabIndex={-1}></input>
            <div className="state-display">
                <p>{value}</p>
            </div>
        </SearchOptionButtonContainer>
    );
};

export default SearchOptionbutton;
