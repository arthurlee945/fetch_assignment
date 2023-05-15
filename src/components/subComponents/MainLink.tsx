import { FC } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { colors, medias } from "@/styles/style-variables";

const MainButtonContainer = styled(Link)`
    text-align: center;
    min-width: 100px;
    padding: 5px 20px;
    color: ${colors.white};
    background-color: ${colors.black};
    font-weight: 600;
    border-radius: 5px;
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
    href: string;
    target?: string;
    ariaLabel?: string;
}

const MainButton: FC<MainButtonProps> = ({ children, href, ariaLabel = "link", target = "_self" }) => {
    return (
        <MainButtonContainer className="paragraph-small" href={href} target={target} aria-label={ariaLabel}>
            {children}
        </MainButtonContainer>
    );
};

export default MainButton;
