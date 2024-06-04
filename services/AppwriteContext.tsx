import React, { FC, PropsWithChildren, createContext, useState } from "react";
import AppwriteService from "./appWriteService";

type AppContextType = {
    appWriteService: AppwriteService;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
};

export const AppwriteContext = createContext<AppContextType>({
    appWriteService: new AppwriteService(),
    isLogin: false,
    setIsLogin: () => { },
});

export const AppwriteContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    let defaultValue = {
        appWriteService: new AppwriteService(),
        isLogin,
        setIsLogin,
    };

    return (
        <AppwriteContext.Provider value={defaultValue}>
            {children}
        </AppwriteContext.Provider>
    );
};
