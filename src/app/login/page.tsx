"use client";
import { FC, useContext } from "react";
import styled from "@emotion/styled";
import { GlobalContext } from "@/utils/GlobalContext";
import GeneralErrorMessage from "@/components/modules/GeneralErrorMessage";
import LogInForm from "@/components/modules/LogInForm";

const LogInPageContainer = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20vh 0px;
`;
interface LogInProps {}

const LogIn: FC<LogInProps> = () => {
    const {
        authenticatedUser: { authenticated },
    } = useContext(GlobalContext);
    return (
        <LogInPageContainer>
            {!authenticated ? <LogInForm /> : <GeneralErrorMessage message="Thank you for logging in" />}
        </LogInPageContainer>
    );
};

export default LogIn;
