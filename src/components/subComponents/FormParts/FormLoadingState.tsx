import { FC } from "react";
import styled from "@emotion/styled";

//------------custom
import FetchLogo from "@/styles/icons/Fetch-Icons/FetchLogo";
import { colors } from "@/styles/style-variables";

const FormLoadingStateContainer = styled.div<{ $colorScheme: "light" | "dark" }>`
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    backdrop-filter: contrast(0.8);
    border-radius: 15px;
    overflow: hidden;
    path {
        stroke: ${({ $colorScheme }) => ($colorScheme === "dark" ? colors.black : colors.white)} !important;
    }
`;

interface FormLoadingStateProps {
    colorScheme?: "light" | "dark";
}

const FormLoadingState: FC<FormLoadingStateProps> = ({ colorScheme = "dark" }) => {
    return (
        <FormLoadingStateContainer $colorScheme={colorScheme}>
            <FetchLogo />
        </FormLoadingStateContainer>
    );
};

export default FormLoadingState;
