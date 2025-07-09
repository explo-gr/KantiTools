import { useState } from 'react';
import { Text } from 'react-native';

const Logger = ({ initLogs=['--- ANFANG ---'] }) => {
    const [ activeLogs, setActiveLogs ] = useState(initLogs);

    const printscr = (...text) => {
        setActiveLogs( l => [...l, ...text]);
    }

    const clearscr = () => {
        setActiveLogs(_ => startLogs);
    }

    const DebugView = () => {
        return (
            activeLogs.map((text='', index) => <Text style={{ paddingBottom: 2 }} key={index}>{text}</Text>)
        );
    }

    return { printscr, clearscr, DebugView };
};

export default Logger;