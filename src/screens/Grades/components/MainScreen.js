import { View, StyleSheet } from 'react-native';
import GradesList from './GradesList';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';
import Divider from '../../../components/common/Divider';
import { useCallback } from 'react';
import LoginReqView from '../../../components/common/LoginReqView';
import HeaderBar from './HeaderBar';

const GradesMain = ({ navigation }) => {
    const forwardGradeData = useCallback((data) => {
        navigation.navigate('GradesMinCalc', {
            gradeData: [...data]
        });
    }, [navigation]);

    return (
        <ContainerView>
            <Header title={'Grades'}/>
            <View style={styles.abxWrapper}>
                <HeaderBar
                    navigation={navigation}
                />
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