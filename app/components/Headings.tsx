import React from "react";

export const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h1 className="text-3xl font-bold mt-16 mb-6 text-center">{children}</h1>;
};

export const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h2 className="text-3xl font-bold mt-16 mb-6">{children}</h2>;
};

export const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h3 className="text-2xl font-bold mt-10 mb-6">{children}</h3>;
};

export const H4: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h4 className="text-xl font-bold mt-10 mb-4">{children}</h4>;
};

export const H5: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h5 className="text-lg font-bold mt-10 mb-4">{children}</h5>;
};