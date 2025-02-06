import { cn } from "@/lib/utils";
import React, { FC } from "react";

type MaxWrapperTypes = {
    children: React.ReactNode;
    className?: string;
};

const MaxWrapper: FC<MaxWrapperTypes> = ({ children, className }) => {
    return <div className={cn("w-full ", className)}>{children}</div>;
};

export default MaxWrapper;