// imports regarding general objects
import { Text, View, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import { DataProvider, useData } from '../../../context/DataContext';
import GradesList from './GradesList';
import { AuthProvider } from '../../../context/AuthenticationContext';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';
import ActionBox from '../../../components/common/ActionBox';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import Divider from '../../../components/common/Divider';

const Screen = ({ navigation }) => {
    const { defaultThemedStyles } = useThemes();
    const { refreshAll } = useData();
    const { grades } = useData();

    return (
        // das züg zurna flatlist macha und de mit denna sections dAlertBoxContainer so dingsla halt
        <ContainerView>
            <Header title={'Grades'}/>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <ActionBoxContainer
                    height={90}
                >
                    <ActionBox
                        label={'gr_calcgrade'}
                        icon={'divide-square'}
                        onPress={() => {
                            Alert.alert('hallo')
                        }}
                    />
                    <ActionBox
                        label={'gr_calcmin'}
                        icon={'bar-chart-2'}
                        onPress={() => {
                            Alert.alert('hallo')
                        }}
                    />
                    <ActionBox
                        label={'gr_pluspoints'}
                        icon={'activity'}
                        onPress={() => {
                            Alert.alert('hallo')
                        }}
                    />
                </ActionBoxContainer>
                <Divider/>
                <GradesList/>
            </ScrollView>
        </ContainerView>
    );
}

const GradesMain = ({ navigation }) => {
    return (
        <AuthProvider>
            <DataProvider>
                <Screen
                    navigation={navigation}
                />
            </DataProvider>
        </AuthProvider>
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