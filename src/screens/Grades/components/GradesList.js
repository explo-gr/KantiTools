import { useEffect, useState } from 'react';
import { useData } from '../../../context/DataContext';
import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import Button from '../../../components/common/Button';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';
import Feather from '@expo/vector-icons/Feather';
import TranslatedText from '../../../components/translations/TranslatedText';

const CacheIndicator = ({ title }) => {
    const { colors, defaultThemedStyles } = useThemes();

    return (
        <View style={{
            flexDirection: 'row',
            gap: 4,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 8,
            marginLeft: 2
        }}>
            <Feather name={'info'} size={24} color={colors.gray} />
            <TranslatedText style={[defaultThemedStyles.text, {
                color: colors.gray
            }]}>
                gr_cache_indic
            </TranslatedText>
        </View>
    )
}

const NoDataAvail = ({ }) => {
    const { colors, defaultThemedStyles } = useThemes();

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 8
        }}>
            <TranslatedText style={[defaultThemedStyles.text, {
                color: colors.red
            }]}>gr_data_err</TranslatedText>
        </View>
    )
}

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
            `${t('gr_dt_date')}: ${exam.date}\n${t('gr_dt_weight')}: ${exam.weight}\n${t('gr_dt_score')}: ${exam.score || '-'}\n`
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
                margin: 15
            }}>
                <LoadingIndicator status={t('loading')}/>
            </View>
        );
    }

    return (
        <View key={'grade-view'}>
            { grades.cached && (<CacheIndicator/>) }
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
                                                <TouchableOpacity
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
                                                </TouchableOpacity>
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
                    : <NoDataAvail/>
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