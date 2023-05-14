import { FC } from "react";
import styled from "@emotion/styled";
import { m } from "framer-motion";

//-------------------------custom
import { colors } from "@/styles/style-variables";
const SubmitMessageContainer = styled(m.div)`
    > p {
        color: ${colors.grey};
    }
`;

interface SubmitMessageProps {
    message?: string;
}

const SubmitMessage: FC<SubmitMessageProps> = ({ message }) => {
    return (
        <SubmitMessageContainer initial={{ x: 15, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            {message ? (
                <p className="paragraph" dangerouslySetInnerHTML={{ __html: message }}></p>
            ) : (
                <p className="paragraph">
                    Sorry Something Went Wrong.
                    <br />
                    Please Try Again!
                </p>
            )}
        </SubmitMessageContainer>
    );
};

export default SubmitMessage;
