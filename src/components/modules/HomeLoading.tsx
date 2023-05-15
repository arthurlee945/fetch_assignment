import { FC } from "react";
import styled from "@emotion/styled";
import FetchLogo from "@/styles/icons/Fetch-Icons/FetchLogo";

const HomeLoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20vh 0px;
`;

interface HomeLoadingProps {}

const HomeLoading: FC<HomeLoadingProps> = () => {
    return (
        <HomeLoadingContainer>
            <FetchLogo iconSizes={{ width: "15%" }} />
        </HomeLoadingContainer>
    );
};

export default HomeLoading;
