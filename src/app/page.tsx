"use client";
import SearchBar from "@/components/modules/SearchBar";
import styled from "@emotion/styled";
import { medias } from "@/styles/style-variables";

const HomePageContainer = styled.main`
    padding: 25px 20px;
    @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
    }

    @media screen and (max-width: ${`${medias.mobile}px`}) {
        padding: 20px 10px;
    }
`;

export default function Home() {
    return (
        <HomePageContainer>
            <SearchBar />
        </HomePageContainer>
    );
}
