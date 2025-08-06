import { useEffect, useState } from 'react';
import { useData } from '../../../context/DataContext';
import { View, Text } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { useThemes } from '../../../context/ThemeContext';

const GradesList = () => {
    const { grades, isReady, refreshAll } = useData();
    const { colors } = useThemes();
    const [ dataReady, setDataReady ] = useState(false);
    const [ dataAvailable, setDataAvailable ] = useState(false);

    const [ isOpen, setIsOpen ] = useState({});

    const handleOpen = (i) => {
        setIsOpen(prev => ({
            ...prev,
            [i]: !prev[i]
        }));
    };

    useEffect(() => {
        setDataReady(isReady)
    }, [isReady]);

    useEffect(() => {
        setDataAvailable(!!grades.data);
    }), [grades.data];

    if (!dataReady) {
        return (
            <View style={{
                margin: 10
            }}>
                <LoadingIndicator status={'Loading'}/>
            </View>
        );
    }

    return (
        <View key={'grade-view'}>
            {
                dataAvailable
                    ? grades.data.map((subject, i) => (
                        <View
                            id={`view-${i}`}
                            key={`view-${i}`}
                            style={{
                                marginBottom: 6
                            }}
                        >
                            <Accordion
                                key={`acc-${i}`}
                                title={`${subject.subjName}:`}
                                isOpen={!!isOpen[i]}
                                changeIsOpen={() => handleOpen(i)}
                                disabled={!subject.exams.length}
                                rightItem={
                                    <Text style={{
                                        fontFamily: 'monospace',
                                        fontSize: 19,
                                        fontWeight: 'bold',
                                        color: colors.hardContrast
                                    }}>
                                        {subject.onlineMean || '---'}
                                    </Text>
                                }
                            >
                            {!!subject.exams.length && (
                                <View key={`detail-container-view-${i}`}>
                                        {
                                            subject.exams.map((exam, idx) => (
                                                <Text key={`text-${idx}`}>{`${exam.topic}:    ${exam.grade}`}</Text>
                                            ))
                                        }
                                    </View>
                            )}
                            </Accordion>
                        </View>
                    ))
                    : <Text>No data to display</Text>
            }
        </View>
    );
}

export default GradesList;