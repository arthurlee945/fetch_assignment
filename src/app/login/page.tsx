"use client";
import { FC, useContext } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

import { GlobalContext } from "@/utils/contexts/GlobalContext";
import GeneralErrorMessage from "@/components/modules/GeneralErrorMessage";
import LogInForm from "@/components/modules/LogInForm";

const LogInPageContainer = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
`;
interface LogInProps {}

const LogIn: FC<LogInProps> = () => {
    const router = useRouter();
    const {
        authenticatedUser: { authenticated },
    } = useContext(GlobalContext);
    return (
        <LogInPageContainer>
            {!authenticated ? <LogInForm /> : <GeneralErrorMessage message="You are already logged in!" />}
        </LogInPageContainer>
    );
};

export default LogIn;
