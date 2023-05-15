"use client";
import SearchBar from "@/components/modules/SearchBar";
import styled from "@emotion/styled";

const HomePageContainer = styled.main`
    padding: 25px 20px;
`;

export default function Home() {
    return (
        <HomePageContainer>
            <SearchBar />
        </HomePageContainer>
    );
}
