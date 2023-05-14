import { FC } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles/style-variables";

const SubmitButtonContainer = styled.button<{ $colorScheme: "light" | "dark" }>`
    color: ${({ $colorScheme }) => ($colorScheme === "light" ? colors.black : colors.white)};
    background-color: ${({ $colorScheme }) => ($colorScheme === "light" ? colors.white : colors.black)};
    padding: 10px;
    border-radius: 5px;
    transition: background-color 300ms;
    font-weight: 600;
    &:hover {
        background-color: ${({ $colorScheme }) => ($colorScheme === "light" ? colors.lightGrey : colors.grey)};
    }
`;

interface SubmitButtonProps {
    children: string;
    colorScheme?: "light" | "dark";
}

const SubmitButton: FC<SubmitButtonProps> = ({ children, colorScheme = "dark" }) => {
    return (
        <SubmitButtonContainer $colorScheme={colorScheme} type="submit" role="button" className="paragraph">
            {children}
        </SubmitButtonContainer>
    );
};

export default SubmitButton;
