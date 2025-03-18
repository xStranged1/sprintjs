import React, { createContext, useState, ReactNode } from 'react';

export interface StatContext {
    barChartFilter: Filter,
    destination: string,
}

interface ContextType {
    selectingMode: modeMap
    stat: StatContext;
    setStat: (value: StatContext) => void;
    setSelectingMode: (mode: modeMap) => void;
}

export const initialState: StatContext = {
    origin: '',
    destination: '',
}

// Create the context with a default value
export const StatContext = createContext<ContextType>(undefined);

export const StatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stat, setStat] = useState<StatContext>(initialState);
    const [selectingMode, setSelectingMode] = useState<modeMap>('iddle');
    return (
        <StatContext.Provider value={{ stat, setStat, selectingMode, setSelectingMode }}>
            {children}
        </StatContext.Provider>
    );
};