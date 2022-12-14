import { createContext, useState } from "react";

export default CounterContext = createContext();

//provider
export const CounterContextProvider = ({ children }) => {
    const [counter, setCounter] = useState();

    return (
        <CounterContext.Provider value={{counter, setCounter}}>
            {children}
        </CounterContext.Provider>
    );
};