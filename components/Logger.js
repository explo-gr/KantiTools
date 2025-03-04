import React, { useState } from 'react';
import { Text } from 'react-native';

const Logger = () => {
    const startLogs = ["--- ANFANG ---"];
    const [ activeLogs, setActiveLogs ] = useState(startLogs);

    const printscr = (...text) => {
        setActiveLogs( l => [...l, ...text]);
        console.log(...text);
    }

    const clearscr = () => {
        setActiveLogs(l => startLogs);
    }

    const DebugView = () => {
        return (
            activeLogs.map((text, index) => <Text style={{paddingBottom: 2}} key={index}>{text}</Text>)
        );
    }

    return { printscr, clearscr, DebugView };
};

export default Logger;