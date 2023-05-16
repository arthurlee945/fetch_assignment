"use client";
import { ChangeEvent, FC, useState, useContext, useRef, MouseEvent } from "react";
import styled from "@emotion/styled";
import { AnimatePresence, m } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { GlobalContext } from "@/utils/GlobalContext";
import { colors, medias } from "@/styles/style-variables";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@/utils/utilFunctions";
import Search from "@/styles/icons/Search.svg";
import CloseIcon from "@/styles/icons/Close.svg";
import SearchOptionbutton from "../subComponents/SearchOptionbutton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://frontend-take-home-service.fetch.com";

const SearchBarContainer = styled(m.div)`
    position: relative;
    z-index: 1;
    border: 2px solid ${colors.black};
    border-radius: 3px;
    max-width: 1000px;
    margin: 0px auto;
    box-shadow: 0px 5px 8px #0808081d;

    form {
        display: flex;
        justify-content: space-between;
        height: fit-content;
        width: 100%;
        &.loading {
            pointer-events: none;
            background-color: #0808083e;
        }
        @media screen and (max-width: ${`${medias.mobile}px`}) {
            flex-direction: column;
            row-gap: 10px;
        }
        hr {
            border: 0px;
            width: 2px;
            height: 100%;
            background-color: ${colors.black};
            height: 35px;
            align-self: center;
            @media screen and (max-width: ${`${medias.tablet}px`}) {
                height: 25px;
            }
        }
        .search-input-container {
            position: relative;
            display: flex;
            flex: 1;
            .reset-btn {
                width: 35px;
                aspect-ratio: 1/1;
                margin-right: 10px;
                align-self: center;

                &:hover {
                    svg,
                    path {
                        fill: ${colors.grey};
                    }
                }
                svg,
                path {
                    fill: ${colors.black};
                    transition: fill 300ms;
                }
            }
        }
        .search-input {
            background-color: transparent;
            border: 0px;
            font-size: 1.2rem;
            padding: 0px 10px;
            border-radius: 5px;
            width: calc(50% - 1px);
            color: ${colors.black};
            font-weight: 600;
            width: 100%;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                appearance: none;
            }
            &[type="number"] {
                -moz-appearance: textfield;
                appearance: textfield;
            }
            @media screen and (max-width: ${`${medias.tablet}px`}) {
                font-size: 1.1rem;
            }
            @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
            }
            @media screen and (max-width: ${`${medias.mobile}px`}) {
                font-size: 1rem;
                padding: 10px;
            }
            &:hover,
            &:focus {
                outline: 2px solid #08080828;
                border-radius: 0px;
                & + .select-container {
                    max-height: 400px;
                }
            }
        }
        .select-container {
            z-index: 1;
            display: flex;
            flex-direction: column;
            position: absolute;
            bottom: 0px;
            left: -2px;
            transform: translateY(100%);
            width: calc(100% + 1px);
            max-height: 0px;
            overflow: auto;
            border: 2px solid ${colors.black};
            border-top: 0px;
            scrollbar-width: thin;
            background-color: ${colors.white};
            box-shadow: 0px 10px 8px #0808081d;
            transition: max-height 300ms;
            scroll-behavior: smooth;
            @media screen and (max-width: ${`${medias.mobile}px`}) {
                width: calc(100% + 4px);
            }
            &:hover,
            &:focus {
                max-height: 400px;
            }
            &::-webkit-scrollbar {
                appearance: none;
                width: 4px;
            }
            &::-webkit-scrollbar-track {
                background-color: ${colors.lightGrey};
            }
            &::-webkit-scrollbar-thumb {
                background-color: ${colors.darkBlue};
            }
            &::-webkit-scrollbar-thumb:hover {
                background-color: ${colors.blue};
            }
        }
        .error-message {
            position: absolute;
            bottom: 0px;
            transform: translateY(120%);
            color: ${colors.amber};
            font-weight: 600;
            font-size: 0.9rem;
        }
        #select-input {
            position: absolute;
            opacity: 0;
            height: 0px;
            overflow: hidden;
            pointer-events: none;
        }
        .search-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            min-width: 45px;
            aspect-ratio: 1/1;
            background-color: ${colors.darkBlue};
            padding: 10px;
            margin: 5px;
            border-radius: 3px;
            box-shadow: 0px 2px 4px #0808083d;
            transition: box-shadow 300ms, filter 300ms;
            @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
                width: 40px;
                min-width: 40px;
            }
            @media screen and (max-width: ${`${medias.mobile}px`}) {
                width: 95%;
                height: 45px;
                align-self: center;
                aspect-ratio: auto;
                padding: 5px;
                > svg {
                    height: 100%;
                    width: auto;
                }
            }
            &:hover {
                box-shadow: 0px 1px 3px #0808083d;
                filter: brightness(0.9);
            }
            path {
                fill: ${colors.white};
            }
        }
    }
`;
const searchSchema = z.object({
    breeds: z.array(z.string().trim()).min(1, "Please select one breed").optional(),
});

interface SearchBarProps {
    isFetching: boolean;
    searchSubmit: ({ breeds }: { breeds: string[] }) => void;
    resetSubmit: () => void;
}

const SearchBar: FC<SearchBarProps> = ({ isFetching, searchSubmit, resetSubmit }) => {
    const breedRef = useRef<HTMLDivElement>(null);
    const breedInputRef = useRef<HTMLInputElement>(null);
    const {
        authenticatedUser: { authenticated },
    } = useContext(GlobalContext);
    const { data } = useQuery({
        queryKey: ["SearchBarQuery"],
        queryFn: () => {
            if (!authenticated) return null;
            return axios.get(API_URL + "/dogs/breeds", { withCredentials: true });
        },
    });
    const [breeds, setBreeds] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({ resolver: zodResolver(searchSchema) });
    const onSubmit = async (data: FieldValues) => {
        if (isFetching) return;
        const { breeds } = data;
        await searchSubmit({ breeds });
    };
    const onError = (err: FieldValues) => {
        console.log(err);
    };
    const handlebreedsInput = debounce((e: ChangeEvent<HTMLInputElement>) => {
        if (!data || !e.target.value) return;
        const value = e.target.value;
        const selectedOption =
            breedRef.current &&
            Array.from(breedRef.current.children).find((el) =>
                (el as HTMLLabelElement).dataset.value?.toLowerCase().startsWith(value.toLowerCase())
            );

        if (!breedRef.current || !selectedOption) return;
        breedRef.current.scrollTop = (selectedOption as HTMLLabelElement).offsetTop;
    }, 250);
    const handleBreedOptionClick = (e: MouseEvent) => {
        const value = (e.target as HTMLInputElement).dataset.value;
        const toggled = (e.target as HTMLInputElement).checked;
        if (!value) return;
        setValue("breeds", toggled ? [...getValues("breeds"), value] : [...getValues("breeds").filter((val: string) => val != value)]);
        setBreeds((curr) => (toggled ? [...curr, value] : [...curr.filter((val) => val != value)]));
        breedInputRef.current && (breedInputRef.current.value = "");
    };
    const handleReset = () => {
        reset();
        setBreeds([]);
        breedRef.current &&
            Array.from(breedRef.current.children).forEach(
                (el) => (el as HTMLInputElement).checked && ((el as HTMLInputElement).checked = false)
            );
        resetSubmit();
    };

    return (
        <SearchBarContainer initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <form className={isFetching ? "loading" : ""} onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="search-input-container">
                    <select
                        id="select-input"
                        multiple
                        {...register("breeds", {
                            onChange: (e) => {
                                console.log(e.target.value);
                                handleBreedOptionClick(e.target.value);
                            },
                        })}
                    >
                        {data &&
                            data.data.map((breed: string) => (
                                <option key={breed + "-select-option"} value={breed}>
                                    {breed}
                                </option>
                            ))}
                    </select>
                    <input
                        ref={breedInputRef}
                        className="search-input"
                        aria-label="input box for dog breed search"
                        placeholder={breeds.length > 0 ? breeds.join(", ") : "Please select a breed"}
                        onChange={handlebreedsInput}
                    />
                    <div className="select-container" ref={breedRef}>
                        {data &&
                            data.data.map((breed: string) => (
                                <SearchOptionbutton key={breed} value={breed} onClick={handleBreedOptionClick} />
                            ))}
                    </div>
                    {breeds.length > 0 && (
                        <button className="reset-btn" type="button" role="button" onClick={handleReset}>
                            <CloseIcon />
                        </button>
                    )}

                    <AnimatePresence>
                        {errors.breeds && breeds.length === 0 && (
                            <m.p className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {errors.breeds.message as string}
                            </m.p>
                        )}
                    </AnimatePresence>
                </div>
                <button type="submit" className="search-button">
                    <Search />
                </button>
            </form>
        </SearchBarContainer>
    );
};

export default SearchBar;
