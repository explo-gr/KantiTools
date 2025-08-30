import { View, StyleSheet, Alert } from 'react-native';
import { useData } from '../../../context/DataContext';
import GradesList from './GradesList';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';
import ActionBox from '../../../components/common/ActionBox';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import Divider from '../../../components/common/Divider';
import calcPlusMinusPunkte from './calcPlusMinuspunkte';
import { useTranslations } from '../../../context/LanguageContext';
import { useCallback } from 'react';
import LoginReqView from '../../../components/common/LoginReqView';

const GradesMain = ({ navigation }) => {
    const { grades, isReady } = useData();
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
                `${t('gr_curr_pluspoints')}${plus}\n${t('gr_curr_minuspoints')}${minus}`,
                null,
                { cancelable: true }
            );
        };
    };

    return (
        <ContainerView>
            <Header title={'Grades'}/>
            <View style={styles.abxWrapper}>
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
            <LoginReqView infoStyle={styles.infoStyle} style={styles.loginReqView}>
                <GradesList
                    forwardGradeData={forwardGradeData}
                />
            </LoginReqView>
        </ContainerView>
    );
}

const styles = StyleSheet.create({
    infoStyle: {
        justifyContent: 'flex-start',
        marginTop: 20
    },
    loginReqView: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    abxWrapper: {
        minHeight: 100
    }
});

export default GradesMain;