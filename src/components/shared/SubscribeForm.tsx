/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { CiMail } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ErrorDisplay from './ErrorMsg';

interface SubscribeFormValues {
    email: string;
}

const SubscribeForm = () => {
    const [isSending, setIsSending] = useState<boolean>(false);

    //initial form values
    const initialValues: SubscribeFormValues = {
        email: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format"),
    });

    // OnSubmit handler
    const onSubmit = async (
        values: SubscribeFormValues,
        { resetForm }: FormikHelpers<SubscribeFormValues>
    ) => {
        try {
            setIsSending(true);

            console.log("Submitting email:", values.email);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay

            // Reset the form after successful submission
            resetForm();
            console.log("Email submitted successfully!");
        } catch (error) {
            console.error("Failed to submit email:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={true}
        >
            {(formik) => {
                const { dirty, isValid, errors } = formik;
                return (
                    <Form className="w-full">
                        <div className='w-full h-[48px] relative'>
                            <Field type="email" name="email" id="email" placeholder='Email address' className={`w-full rounded-[12px] border bg-color1 h-full font-nunitoSans text-[14px] placeholder:text-[14px] placeholder:text-color2 text-[#8E8C9C] pl-9 pr-[140px] outline-none transition duration-300 focus:border-color5 ${errors.email ? "border-red-500" : "border-[#E5E7EB]"}`} />
                            {/* icon */}
                            <CiMail className='w-5 h-5 absolute top-1/2 -translate-y-1/2 left-3 text-[#8E8C9C]' />
                            {/* btn */}
                            <button type="submit" disabled={!(dirty && isValid)} className='w-[115px] h-[40px] flex justify-center items-center rounded-[8px] bg-color5 text-[#FFFFFF] font-nunitoSans font-[600] absolute top-1/2 -translate-y-1/2 right-1 z-10 text-[14px] disabled:opacity-80 disabled:cursor-not-allowed'>
                                {
                                    isSending ?
                                        (<span className="flex items-center text-[#FFFFFF] gap-1">
                                            <AiOutlineLoading3Quarters className="animate-spin text-[#FFFFFF]" />
                                            Subscribing...
                                        </span>)
                                        : (<span>Subscribe</span>)
                                }
                            </button>
                        </div>
                        {/* error */}
                        <ErrorMessage name="email"
                            component={({ children }: any) => <ErrorDisplay message={children} />} />
                    </Form>
                )
            }

            }
        </Formik>

    )
}

export default SubscribeForm