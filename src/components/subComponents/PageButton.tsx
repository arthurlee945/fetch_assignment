import { FC } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles/style-variables";
const PageButtonContainer = styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.black};
    padding: 5px;
    border-radius: 5px;
    aspect-ratio: 1/1;
    width: 40px;
    border: 1px solid ${colors.black};
    font-weight: 600;
    font-size: 1rem;
    transition: color 300ms, background-color 300ms;
    background-color: ${({ $selected }) => ($selected ? colors.black : colors.white)};
    color: ${({ $selected }) => ($selected ? colors.white : colors.black)};
    pointer-events: ${({ $selected }) => ($selected ? "none" : "auto")};
    &:hover {
        color: ${colors.white};
        background-color: ${colors.black};
    }
`;
interface PageButtonProps {
    page: number;
    selected: boolean;
    onClick: () => void;
}

const PageButton: FC<PageButtonProps> = ({ page, selected, onClick }) => {
    return (
        <PageButtonContainer type="button" role="button" $selected={selected} aria-label={`go to ${page} page`} onClick={onClick}>
            {page}
        </PageButtonContainer>
    );
};

export default PageButton;
