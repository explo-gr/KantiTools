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

const Screen = ({ navigation }) => {
    const { grades, isReady, refreshAll } = useData();
    const { t } = useTranslations();

    return (
        <ContainerView>
            <Header title={'Grades'}/>
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
            <Divider/>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <GradesList/>
                {isReady && (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 4
                    }}>
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

// das vlt no wäg
const GradesMain = ({ navigation }) => {
    return (
        <DataProvider>
            <Screen
                navigation={navigation}
            />
        </DataProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default GradesMain;