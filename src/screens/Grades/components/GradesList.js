import { useEffect, useState } from 'react';
import { useData } from '../../../context/DataContext';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import Button from '../../../components/common/Button';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';

const GradesList = ({ forwardGradeData = () => null }) => {
    const { grades, isReady } = useData();
    const { colors, defaultThemedStyles } = useThemes();
    const [ dataReady, setDataReady ] = useState(false);
    const [ dataAvailable, setDataAvailable ] = useState(false);
    const { t } = useTranslations();

    const [ isOpen, setIsOpen ] = useState({});

    const handleExamDetails = (exam) => {
        Alert.alert(
            exam.topic,
            `${t('gr_dt_date')}: ${exam.date}\n${t('gr_dt_date')}: ${exam.weight}\n${t('gr_dt_date')}: ${exam.score || '-'}\n`
        )
    }

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
                                immutable
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
                                                <Pressable
                                                    style={styles.examContainer}
                                                    key={`${i}-exam-${idx}`}
                                                    onPress={() => {
                                                        handleExamDetails(exam);
                                                    }}
                                                >
                                                    <Text style={[{
                                                        fontSize: 15.5
                                                    }, defaultThemedStyles.text]} key={`${i}-text-${idx}-topic`}>{exam.topic}</Text>
                                                    <Text style={[{
                                                        fontSize: 16,
                                                        fontFamily: 'monospace'
                                                    }, defaultThemedStyles.text]} key={`${i}-text-${idx}-grade`}>{exam.grade || '-'}</Text>
                                                </Pressable>
                                            ))
                                        }
                                        <Button
                                            icon={'external-link'}
                                            title={'gr_calcmin_f'}
                                            onPress={() => {
                                                /*
                                                    forward data to min grade calc and parse the values
                                                    into an appropriate format
                                                */
                                                forwardGradeData(subject.exams.map((exam, idx) => ({
                                                    id: -(1 + idx),
                                                    grade: exam.grade.toString().replace(/[^0-9.,]/g, ''),
                                                    weight: exam.weight.toString().replace(/[^0-9.,]/g, '')
                                                })));
                                            }}
                                        />
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