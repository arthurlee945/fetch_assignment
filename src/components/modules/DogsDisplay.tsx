import { FC, useState } from "react";
import styled from "@emotion/styled";
import { Dog } from "@/utils/dataModelTypes";
import DogCard from "../subComponents/DogCard";
import { medias } from "@/styles/style-variables";
import FetchLogo from "@/styles/icons/Fetch-Icons/FetchLogo";
const DogsDisplayContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: space-between;
    max-width: 1440px;
    margin: 0px auto;
    margin-top: 50px;
    @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
        column-gap: 15px;
    }
    @media screen and (max-width: ${`${medias.mobile}px`}) {
        padding: 10px;
        margin-top: 30px;
    }
    .fallback-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20vh 0px;
        width: 100%;
        text-align: center;
    }
`;
interface DogsDisplayProps {
    dogs: Dog[];
    breedsSet: string;
    isFetched: boolean;
    isFetching: boolean;
}

const DogsDisplay: FC<DogsDisplayProps> = ({ dogs, isFetched, isFetching, breedsSet }) => {
    return (
        <DogsDisplayContainer>
            {dogs.length > 0 ? (
                dogs.map((dog) => <DogCard key={dog.id} data={dog} breedsSet={breedsSet} />)
            ) : (
                <div className="fallback-container">
                    {dogs.length === 0 && isFetched && !isFetching ? (
                        <h1>{"Sorry:< We couldn't find a match with that criteria."}</h1>
                    ) : (
                        <FetchLogo iconSizes={{ width: "15%" }} />
                    )}
                </div>
            )}
        </DogsDisplayContainer>
    );
};

export default DogsDisplay;
