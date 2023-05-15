import { FC } from "react";
import styled from "@emotion/styled";
import { Dog } from "@/utils/dataModelTypes";
import DogCard from "../subComponents/DogCard";
const DogsDisplayContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: space-between;
    margin-top: 40px;
    padding: 30px 0px;
    max-width: 1440px;
    margin: 0px auto;
`;
interface DogsDisplayProps {
    dogs: Dog[];
}

const DogsDisplay: FC<DogsDisplayProps> = ({ dogs }) => {
    return (
        <DogsDisplayContainer>
            {dogs.map((dog) => (
                <DogCard key={dog.id} data={dog} />
            ))}
        </DogsDisplayContainer>
    );
};

export default DogsDisplay;
