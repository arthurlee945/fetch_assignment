import styled from "@emotion/styled";
import Image from "next/image";
import { FC, Suspense } from "react";
import { m } from "framer-motion";
import { Dog } from "@/utils/dataModelTypes";
import { colors, medias } from "@/styles/style-variables";
import FetchLogo from "@/styles/icons/Fetch-Icons/FetchLogo";

const DogCardContainer = styled(m.div)`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 25px 20px;
    border: 2px solid ${colors.black};
    border-radius: 5px;
    row-gap: 20px;
    box-shadow: 0px 5px 8px #0808081d;
    min-width: 275px;
    max-width: 500px;
    @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
        min-width: 225px;
    }
    @media screen and (max-width: ${`${medias.mobile}px`}) {
        min-width: 225px;
        padding: 10px;
        width: 80%;
    }
    .image {
        display: flex;
        align-items: center;
        justify-content: center;
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
    breedsSet: string;
}

const DogCard: FC<DogCardProps> = ({ data: { id, img, name, age, zip_code, breed }, breedsSet }) => {
    return (
        <DogCardContainer
            key={breedsSet + name + breed}
            id={id}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
        >
            <div className="image">
                <Suspense fallback={<FetchLogo />}>
                    <Image src={img} alt={`${name}-${breed}-image`} fill sizes="100%" loading="lazy" />
                </Suspense>
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
