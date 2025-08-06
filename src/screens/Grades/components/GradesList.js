import { useEffect, useState } from 'react';
import { useData } from '../../../context/DataContext';
import { View, Text, StyleSheet } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { useThemes } from '../../../context/ThemeContext';

const GradesList = () => {
    const { grades, isReady, refreshAll } = useData();
    const { colors, defaultThemedStyles } = useThemes();
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
                                marginBottom: 8
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
                                    <View
                                        style={styles.detailsContainer}
                                        key={`detail-container-view-${i}`}
                                    >
                                        {
                                            subject.exams.map((exam, idx) => (
                                                <View
                                                    style={styles.examContainer}
                                                    key={`${i}-exam-${idx}`}
                                                >
                                                    <Text style={[{
                                                        fontSize: 16
                                                    }, defaultThemedStyles.text]} key={`${i}-text-${idx}-topic`}>{exam.topic}</Text>
                                                    <Text style={[{
                                                        fontSize: 16,
                                                        fontFamily: 'monospace'
                                                    }, defaultThemedStyles.text]} key={`${i}-text-${idx}-grade`}>{exam.grade || '-'}</Text>
                                                </View>
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

const styles = StyleSheet.create({
    detailsContainer: {
        paddingHorizontal: 3,
        paddingBottom: 20,
        gap: 15,
        marginHorizontal: 5
    },
    examContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    }
});

export default GradesList;