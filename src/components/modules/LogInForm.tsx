import { FC, useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "@emotion/styled";
import { m } from "framer-motion";
//----------------custom
import { colors, medias } from "@/styles/style-variables";
import { GlobalContext } from "@/utils/contexts/GlobalContext";
import TextInput from "../subComponents/FormParts/TextInput";
import SubmitButton from "../subComponents/FormParts/SubmitButton";
import SubmitMessage from "../subComponents/FormParts/SubmitMessage";
import GlobalFormError from "../subComponents/FormParts/GlobalFormError";
import FormLoadingState from "../subComponents/FormParts/FormLoadingState";

const LogInFormConatiner = styled(m.div)`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    .log-container {
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
        background-color: ${colors.white};
        padding: 60px 50px;
        border-radius: 10px;
        min-width: 450px;
        color: ${colors.black};
        box-shadow: 0px 5px 10px #08080837;
        @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
        }
        @media screen and (max-width: ${`${medias.mobile}px`}) {
            padding: 35px 30px;
            width: 90%;
        }
        .close-btn {
            position: absolute;
            top: 10px;
            right: 16px;
            width: 25px;
            height: 25px;
        }
        .other-action {
            margin-top: 5px;
            .co-name {
                font-weight: 600;
            }
            .otherAction-button {
                color: ${colors.blue};
                font-weight: 700;
                &:hover {
                    text-decoration: underline;
                    text-decoration-color: ${colors.blue};
                }
            }
        }
    }
    .log-title {
        font-size: 1.4rem;
        font-weight: 600;
    }
    .form-container {
        position: relative;
    }
    .login-form {
        display: flex;
        flex-direction: column;
        row-gap: 15px;
    }
`;

const logInSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().min(1, "Email is required").email("Invalid email"),
});

interface LogInFormProps {}

const LogInForm: FC<LogInFormProps> = () => {
    const { login } = useContext(GlobalContext);
    const [formStates, setFormState] = useState({
        loading: false,
        submitted: false,
    });
    const [globalFormError, setGlobalFormError] = useState<string | undefined>(undefined);
    const {
        register,
        handleSubmit,
        resetField,
        setFocus,
        setError,
        formState: { errors, isSubmitSuccessful, dirtyFields },
    } = useForm({
        resolver: zodResolver(logInSchema),
    });

    const onSubmit = async (data: FieldValues) => {
        if (formStates.loading) return;
        setGlobalFormError(undefined);
        setFormState((curr) => ({
            ...curr,
            loading: true,
        }));

        //---------------send
        const { name, email } = data;
        try {
            await login({ name, email });
        } catch (err) {
            setGlobalFormError("Something");
            setError("root.serverError", {
                type: "400",
            });
            setFormState((curr) => ({
                ...curr,
                loading: false,
                submitted: true,
            }));
        }
    };
    useEffect(() => {
        setFocus("name");
    }, [setFocus]);
    return (
        <LogInFormConatiner key="login-form">
            <m.div className="log-container" style={{ y: -25, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <h1 className="log-title">Log In</h1>
                {globalFormError && (
                    <GlobalFormError
                        error={globalFormError}
                        closeError={() => {
                            setGlobalFormError(undefined);
                        }}
                    />
                )}
                {formStates.submitted && !isSubmitSuccessful ? (
                    <SubmitMessage />
                ) : (
                    <div className="form-container">
                        <form id="login-form" className="login-form" onSubmit={handleSubmit(onSubmit)}>
                            <TextInput
                                id="name"
                                label="Name"
                                isDirty={!!dirtyFields.name}
                                register={register}
                                resetField={resetField}
                                errors={errors.name}
                            />
                            <TextInput
                                id="email"
                                label="Email"
                                isDirty={!!dirtyFields.email}
                                register={register}
                                resetField={resetField}
                                errors={errors.email}
                            />
                            <SubmitButton>Log In</SubmitButton>
                        </form>
                        {formStates.loading && <FormLoadingState />}
                    </div>
                )}
            </m.div>
        </LogInFormConatiner>
    );
};

export default LogInForm;
