"use client";
import { ChangeEvent, FC, useState, useContext, useRef, MouseEvent } from "react";
import styled from "@emotion/styled";
import { AnimatePresence, m, motion } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { GlobalContext } from "@/utils/GlobalContext";
import Search from "@/styles/icons/Search.svg";
import { colors, medias } from "@/styles/style-variables";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@/utils/utilFunctions";
import SearchOptionbutton from "../subComponents/SearchOptionbutton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://frontend-take-home-service.fetch.com";

const SearchBarContainer = styled(motion.div)`
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
                height: 30px;
            }
        }
        .input-container {
            display: flex;
            flex: 1;
            .search-input-container {
                position: relative;
                display: flex;
                &.zipcode-container {
                    flex: 0.75;
                }
                &.search-container {
                    flex: 1;
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
                    padding: 10px;
                }
                &:focus {
                    outline: 2px solid #08080828;
                    border-radius: 0px;
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
                max-height: 500px;
                overflow: auto;
                border: 2px solid ${colors.black};
                border-top: 0px;
                scrollbar-width: thin;
                background-color: ${colors.white};
                box-shadow: 0px 10px 8px #0808081d;
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
                .no-result-txt {
                    color: ${colors.lightGrey};
                    font-weight: 600;
                }
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
                align-self: center;
                aspect-ratio: auto;
                padding: 5px;
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
    breed: z.string().trim().min(1, "Please select one breed"),
    zipcode: z.string().regex(/\d/, "Please Enter numbers").min(5, "Please input a zipcode").max(5, "Please enter in 5 digit zip code"),
});

interface SearchBarProps {
    searchSubmit: ({ breed, zipcode }: { breed: string; zipcode?: string }) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchSubmit }) => {
    const breedRef = useRef<HTMLInputElement>(null);
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
    const [{ loading, breedSearch }, setFormState] = useState({
        loading: false,
        breedSearch: "",
    });
    const {
        register,
        handleSubmit,
        resetField,
        setFocus,
        getValues,
        setValue,
        setError,
        formState: { errors, dirtyFields },
    } = useForm({ resolver: zodResolver(searchSchema) });
    const onSubmit = (data: FieldValues) => {
        setFormState((curr) => ({
            ...curr,
            loading: true,
        }));
        const { breed, zipcode } = data;
        searchSubmit({ breed, zipcode });
        setFormState((curr) => ({
            ...curr,
            loading: false,
        }));
    };
    const onError = (err: FieldValues) => {
        console.log(err);
    };
    const handleBreedSearchInput = debounce((e: ChangeEvent<HTMLInputElement>) => {
        if (!data) return;
        setFormState((curr) => ({
            ...curr,
            breedSearch: e.target.value,
        }));
    }, 150);
    const handleBreedOptionClick = (e: MouseEvent) => {
        e.preventDefault();
        const value = (e.target as HTMLButtonElement).dataset.value;
        if (!value) return;
        setValue("breed", value);
        setFormState((curr) => ({
            ...curr,
            breedSearch: value,
        }));
        breedRef.current && (breedRef.current.value = value);
    };

    const filterdBreed = data && data.data.filter((breed: string) => breed.toLowerCase().startsWith(breedSearch.toLowerCase()));
    return (
        <SearchBarContainer initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="input-container">
                    <div className="search-input-container search-container">
                        <select
                            id="select-input"
                            {...register("breed", {
                                onChange: (e) => {
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
                            ref={breedRef}
                            className="search-input"
                            aria-label="input box for dog breed search"
                            placeholder="Search Terrier, Corgi, etc."
                            onChange={handleBreedSearchInput}
                        />
                        <AnimatePresence>
                            {data && breedSearch && getValues("breed") !== breedSearch && (
                                <m.div
                                    className="select-container"
                                    initial={{ maxHeight: 0 }}
                                    animate={{ maxHeight: 400 }}
                                    exit={{ maxHeight: 0 }}
                                >
                                    {filterdBreed.length > 0 ? (
                                        filterdBreed.map((breed: string) => (
                                            <SearchOptionbutton key={breed} value={breed} onClick={handleBreedOptionClick} />
                                        ))
                                    ) : (
                                        <p className="no-result-txt">Sorry There is No breed matching that name</p>
                                    )}
                                </m.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {errors.breed && !breedSearch && (
                                <m.p className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    {errors.breed.message as string}
                                </m.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <hr />
                    <div className="search-input-container zipcode-container">
                        <input maxLength={5} className="search-input" placeholder="ZIP Code" {...register("zipcode")} />
                        {errors.zipcode && <p className="error-message">{errors.zipcode.message as string}</p>}
                    </div>
                </div>
                <button type="submit" className="search-button">
                    <Search />
                </button>
            </form>
        </SearchBarContainer>
    );
};

export default SearchBar;
