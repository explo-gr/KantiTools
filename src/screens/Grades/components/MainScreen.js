// imports regarding general objects
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { DataProvider, useData } from '../../../context/DataContext';
import GradesList from './GradesList';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';
import ActionBox from '../../../components/common/ActionBox';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import Divider from '../../../components/common/Divider';
import calcPluspunkte from './calcPluspunkte';
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
                        onPress={() => {
                            if (!isReady) return;
                            const res = calcPluspunkte(grades.data.map(({ onlineMean }) => onlineMean));
                            Alert.alert(`${t('gr_curr_pluspoints')}: ${res}`);
                        }}
                    />
                </ActionBoxContainer>
            </View>
            <Divider/>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 120
                }}
            >
                <GradesList forwardGradeData={forwardGradeData}/>
                {isReady && (
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
    }
});

export default GradesMain;