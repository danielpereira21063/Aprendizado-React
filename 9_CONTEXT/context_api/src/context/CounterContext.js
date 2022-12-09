import { createContext, useState } from "react";

export default CounterContext = createContext();

//provider
export const CounterContextProvider = ({ children }) => {
    const [counter, setCounter] = useState(5);

    return (
        <CounterContext.Provider value={{counter, setCounter}}>

        </CounterContext.Provider>
    )
}