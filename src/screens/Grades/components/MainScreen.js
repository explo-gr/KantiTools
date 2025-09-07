import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import ContainerView from '../../../components/common/ContainerView';
import Divider from '../../../components/common/Divider';
import Header from '../../../components/common/Header';
import LoginReqView from '../../../components/common/LoginReqView';
import GradesList from './GradesList';
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