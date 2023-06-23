import { useEffect, useState } from 'react';

const usePersistedState = (initialState, sessionStorageKey) => {
    const [state, setState] = useState(() => {
        const persistedValue = sessionStorage.getItem(sessionStorageKey);
        return persistedValue ? JSON.parse(persistedValue) : initialState;
    });
    useEffect(() => {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
    }, [state, sessionStorageKey]);

    return [state, setState];
}

export const useSearchStr = () => {
    return usePersistedState('', 'searchString');
}

// const usePersistedReducer = (reducer, initialState, localStorageKey) => {
//     const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
//         const persistedValue = localStorage.getItem(localStorageKey);
//         return persistedValue ? JSON.parse(persistedValue) : initial;
//     });

//     useEffect(() => {
//         localStorage.setItem(localStorageKey, JSON.stringify(state))
//     }, [state, localStorageKey]);

//     return [state, dispatch];
// }
