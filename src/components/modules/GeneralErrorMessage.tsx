import { FC } from "react";
import styled from "@emotion/styled";

const GeneralErrorMessageContainer = styled.div`
    padding: 20vh 0px;
    text-align: center;
`;
interface GeneralErrorMessageProps {
    message: string;
}

const GeneralErrorMessage: FC<GeneralErrorMessageProps> = ({ message }) => {
    return (
        <GeneralErrorMessageContainer>
            <h1>{message}</h1>
        </GeneralErrorMessageContainer>
    );
};

export default GeneralErrorMessage;
