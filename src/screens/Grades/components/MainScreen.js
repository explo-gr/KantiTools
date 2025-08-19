import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useData } from '../../../context/DataContext';
import GradesList from './GradesList';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';
import ActionBox from '../../../components/common/ActionBox';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import Divider from '../../../components/common/Divider';
import calcPlusMinusPunkte from './calcPlusMinuspunkte';
import Button from '../../../components/common/Button';
import { useTranslations } from '../../../context/LanguageContext';
import { useCallback } from 'react';

const GradesMain = ({ navigation }) => {
    const { grades, isReady, refreshAll } = useData();
    const { t } = useTranslations();

    const forwardGradeData = useCallback((data) => {
        navigation.navigate('GradesMinCalc', {
            gradeData: [...data]
        });
    }, [navigation]);

    const handlePluspunkte = () => {
        if (isReady) {
            const {
                plus,
                minus
            } = calcPlusMinusPunkte(grades.data.map(({ onlineMean }) => onlineMean));

            Alert.alert(
                t('gr_pluspoints'),
                `${t('gr_curr_pluspoints')}${plus}\n${t('gr_curr_minuspoints')}${minus}`
            );
        };
    };

    return (
        <ContainerView>
            <Header title={'Grades'}/>
            <View style={{
                height: '12%'
            }}>
                <ActionBoxContainer>
                    <ActionBox
                        label={'gr_calcgrade'}
                        icon={'divide-square'}
                        onPress={() => {
                            navigation.navigate('GradesGradeCalc');
                        }}
                    />
                    <ActionBox
                        label={'gr_calcmin'}
                        icon={'bar-chart-2'}
                        onPress={() => {
                            navigation.navigate('GradesMinCalc');
                        }}
                    />
                    <ActionBox
                        label={'gr_pluspoints'}
                        icon={'plus'}
                        onPress={handlePluspunkte}
                    />
                </ActionBoxContainer>
            </View>
            <Divider/>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
            >
                <GradesList forwardGradeData={forwardGradeData}/>
                {isReady && !grades.cached && grades.data && (
                    <View style={styles.refreshBtnContainer}>
                        <Button
                            title={t('refresh')}
                            onPress={refreshAll}
                            icon={'refresh-cw'}
                        />
                    </View>
                )}
            </ScrollView>
        </ContainerView>
    );
}

const styles = StyleSheet.create({
    refreshBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
    contentContainer: {
        paddingBottom: 120
    }
});

export default GradesMain;