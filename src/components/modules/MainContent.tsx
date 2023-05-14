import { FC } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const MainContentContainer = styled.div``;
interface MainContentProps {}

const MainContent: FC<MainContentProps> = () => {
    return <MainContentContainer>Floyd</MainContentContainer>;
};

export default MainContent;
