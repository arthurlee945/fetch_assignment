import { FC } from "react";
import styled from "@emotion/styled";
import { colors, medias } from "@/styles/style-variables";

const MainButtonContainer = styled.button`
    text-align: center;
    min-width: 100px;
    padding: 5px 20px;
    color: ${colors.white};
    background-color: ${colors.black};
    font-weight: 600;
    border-radius: 3px;
    transition: background-color 300ms;
    &:focus {
        outline: 2px solid ${colors.lightGrey};
    }
    @media screen and (min-width: ${`${medias.tablet + 1}px`}) {
        &:hover {
            background-color: ${colors.grey};
        }
    }
`;
interface MainButtonProps {
    children: string;
    onClick: () => void;
    ariaLabel?: string;
}

const MainButton: FC<MainButtonProps> = ({ children, ariaLabel = "button", onClick }) => {
    return (
        <MainButtonContainer className="paragraph-small" onClick={onClick} type="button" role="button" aria-label={ariaLabel}>
            {children}
        </MainButtonContainer>
    );
};

export default MainButton;
