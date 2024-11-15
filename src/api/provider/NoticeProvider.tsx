import { createContext, FC, useState } from "react";

interface Context {
    searchKeyWord: object;
    setSearchKeyWord: (KeyWord: object) => void;
}

const defaultValue: Context = {
    searchKeyWord: {},
    setSearchKeyWord: () => {},
};

export const NoticeContext = createContext(defaultValue);

export const NoticeProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyWord, setSearchKeyWord] = useState({});
    return <NoticeContext.Provider value={{searchKeyWord, setSearchKeyWord}}>{ children }</NoticeContext.Provider>;
    
};