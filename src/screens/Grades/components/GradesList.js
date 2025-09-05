import { useState, useCallback, useMemo } from 'react';
import { useData } from '../../../context/DataContext';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Accordion from '../../../components/common/Accordion';
import Button from '../../../components/common/Button';
import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import ExamRow from './ExamRow';
import CacheIndicator from './indicators/CacheIndicator';
import NoDataIndicator from './indicators/NoDataIndicator';
import RefreshButton from './RefreshButton';
import { useShowAlert } from '../../../hooks/useShowAlert';

const GradesList = ({ forwardGradeData = () => null }) => {
    const { grades, isReady } = useData();
    const { colors } = useThemes();
    const { t } = useTranslations();

    const [isOpen, setIsOpen] = useState({});
    const showAlert = useShowAlert();

    showAlert({
        title: exam.topic,
        message: `${t('gr_dt_date')}: ${exam.date}\n${t('gr_dt_weight')}: ${exam.weight}\n${t('gr_dt_score')}: ${exam.score || '-'}\n`
    });

    const handleOpen = useCallback((id) =>
        setIsOpen(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    , []);

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

    const renderCacheIndicator = useMemo(() => (grades.cached && <CacheIndicator/>), [grades.cached]);

    const getMeanText = useCallback((mean) => {
        const num = Number(mean);
        return !mean || isNaN(num) 
            ? '---'
            : num.toFixed(2); 
    }, []);

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
            ListFooterComponent={RefreshButton}
            ListHeaderComponent={renderCacheIndicator}
            contentContainerStyle={styles.contentContainer}
            updateCellsBatchingPeriod={50}
            maxToRenderPerBatch={3}
            removeClippedSubviews
            renderItem={({ item: subject }) => (
                <View style={styles.accordionContainer}>
                    <Accordion
                        title={`${subject.subjName}:`}
                        isOpen={!!isOpen[subject.subjId]}
                        changeIsOpen={handleOpen}
                        accordionKey={subject.subjId}
                        disabled={!subject.exams.length}
                        tint={colors.generic}
                        immutable
                        rightItem={
                            <Text
                                style={[{
                                    color: colors.hardContrast
                                }, styles.avgGradeText]}
                            >
                                {getMeanText(subject.onlineMean)}
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
    loadingIndContainer: {
        margin: 15,
        flex: 1
    },
    accordionContainer: {
        marginBottom: 8,
    },
    avgGradeText: {
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: 20,
    },
    contentContainer: {
        paddingBottom: 120,
        justifyContent: 'flex-start'
    },
});

export default GradesList;