import { useEffect, useState, useCallback } from 'react';
import { useData } from '../../../context/DataContext';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Accordion from '../../../components/common/Accordion';
import Button from '../../../components/common/Button';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';

import ExamRow from './ExamRow';
import CacheIndicator from './CacheIndicator';
import NoDataIndicator from './NoDataIndicator';

const GradesList = ({
    forwardGradeData = () => null,
    ListHeaderComponent = null,
    ListFooterComponent = null,
}) => {
    const { grades, isReady } = useData();
    const { colors } = useThemes();
    const { t } = useTranslations();

    const [isOpen, setIsOpen] = useState({});

    const handleExamDetails = (exam) => {
        Alert.alert(
            exam.topic,
            `${t('gr_dt_date')}: ${exam.date}\n${t('gr_dt_weight')}: ${exam.weight}\n${t('gr_dt_score')}: ${exam.score || '-'}\n`
        );
    };

    const handleOpen = (i) => {
        setIsOpen((prev) => ({
            ...prev,
            [i]: !prev[i],
        }));
    };

    const handleForwardGradeData = useCallback(
        (subject) => {
            forwardGradeData(
                subject.exams.map((exam, idx) => ({
                    id: -(1 + idx), // avoid duplicate keys
                    grade: exam.grade.toString().replace(/[^0-9.,]/g, ''),
                    weight: exam.weight.toString().replace(/[^0-9.,]/g, ''),
                }))
            );
        },
        [forwardGradeData]
    );

    if (!isReady) {
        return (
            <View style={styles.loadingIndContainer}>
                <LoadingIndicator status={t('loading')} />
            </View>
        );
    }

    if (!grades.data) {
        return <NoDataIndicator />;
    }

    return (
        <FlatList
            keyExtractor={(subject) => `subj-${subject.subjId}`}
            data={grades.data}
            ListHeaderComponent={
                <>
                    {grades.cached && <CacheIndicator />}
                    {ListHeaderComponent}
                </>
            }
            ListFooterComponent={ListFooterComponent}
            contentContainerStyle={styles.contentContainer}
            renderItem={({ item: subject }) => (
                <View style={styles.accordionContainer}>
                    <Accordion
                        title={`${subject.subjName}:`}
                        isOpen={!!isOpen[subject.subjId]}
                        changeIsOpen={() => handleOpen(subject.subjId)}
                        disabled={!subject.exams.length}
                        immutable
                        rightItem={
                            <Text
                                style={[{
                                    color: colors.hardContrast
                                }, styles.avgGradeText]}
                            >
                                {subject.onlineMean || '---'}
                            </Text>
                        }
                    >
                        {!!subject.exams.length && (
                            <View
                                style={styles.detailsContainer}
                                key={`detail-container-view-${subject.subjId}`}
                            >
                                {subject.exams.map((exam) => (
                                    <ExamRow
                                        key={`exam-${exam.examId}`}
                                        exam={exam}
                                        onPress={handleExamDetails}
                                    />
                                ))}
                                <View style={styles.gradeCalcBtnContainer}>
                                    <Button
                                        icon={'external-link'}
                                        title={'gr_calcmin_f'}
                                        onPress={() =>
                                            handleForwardGradeData(subject)
                                        }
                                    />
                                </View>
                            </View>
                        )}
                    </Accordion>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        paddingHorizontal: 3,
        gap: 18,
        marginHorizontal: 5,
    },
    gradeCalcBtnContainer: {
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    examContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    loadingIndContainer: {
        margin: 15,
        flex: 1
    },
    accordionContainer: {
        marginBottom: 8,
    },
    avgGradeText: {
        fontFamily: 'monospace',
        fontSize: 19,
        fontWeight: 'bold',
    },
    examTopicText: {
        fontSize: 16,
        maxWidth: '90%',
        overflow: 'hidden',
    },
    examGradeText: {
        fontSize: 17,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingBottom: 120,
        justifyContent: 'flex-start'
    },
});

export default GradesList;