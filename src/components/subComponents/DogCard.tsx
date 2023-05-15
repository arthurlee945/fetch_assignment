import styled from "@emotion/styled";
import Image from "next/image";
import { FC } from "react";
import { m } from "framer-motion";
import { Dog } from "@/utils/dataModelTypes";
import { colors, medias } from "@/styles/style-variables";

const DogCardContainer = styled(m.div)`
    display: flex;
    flex-direction: column;
    width: 22%;
    padding: 25px 20px;
    border: 2px solid ${colors.black};
    border-radius: 5px;
    row-gap: 20px;
    box-shadow: 0px 5px 8px #0808081d;
    @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
    }
    @media screen and (max-width: ${`${medias.mobile}px`}) {
        padding: 10px;
    }
    .image {
        width: 100%;
        aspect-ratio: 1/1;
        position: relative;
        overflow: hidden;
        border: 5px;
        box-shadow: 0px 3px 4px #0808081d;
        > img {
            object-fit: cover;
        }
    }
    .info-container {
        p {
            padding: 5px;
            border-bottom: 2px solid #0808081a;
            font-size: 0.9rem;
            span {
                font-weight: 600;
                font-size: 1rem;
            }
            &:nth-last-of-type(1) {
                border-bottom: 0px;
            }
        }
    }
`;
interface DogCardProps {
    data: Dog;
}

const DogCard: FC<DogCardProps> = ({ data: { id, img, name, age, zip_code, breed } }) => {
    return (
        <DogCardContainer id={id} initial={{ y: 25, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
            <div className="image">
                <Image src={img} alt={`${name}-${breed}-image`} fill sizes="100%" />
            </div>
            <div className="info-container">
                <p>
                    Name: <span>{name}</span>
                </p>
                <p>
                    Age: <span>{age}</span>
                </p>
                <p>
                    Breed: <span>{breed}</span>
                </p>
                <p>
                    Zip Code: <span>{zip_code}</span>
                </p>
            </div>
        </DogCardContainer>
    );
};

export default DogCard;
