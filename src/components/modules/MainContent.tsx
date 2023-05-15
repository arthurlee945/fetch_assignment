import { FC } from "react";

import styled from "@emotion/styled";
import axios from "axios";

const MainContentContainer = styled.div`
    border: 1px solid red;
`;
interface MainContentProps {}

const MainContent: FC<MainContentProps> = () => {
    return <MainContentContainer></MainContentContainer>;
};

export default MainContent;
