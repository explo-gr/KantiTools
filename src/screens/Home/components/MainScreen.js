// Imports
import { StyleSheet, View } from 'react-native';

import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';
import { useThemes } from '../../../context/ThemeContext';
import Greeting from './Greeting';
import Weekdays from './Weekdays';
import Shortcuts from './Shortcuts';

// Main Home Screen
const HomeMain = ({ navigation }) => {
    const { colors } = useThemes();

    return (
        <ContainerView>
            <Header title={'Home'}/>
            <View style={styles.spacer}/>
            <Greeting/>
            <View style={[{
                borderColor: colors.accent,
            }, styles.shortcutsContainer]}>
                <Shortcuts/>
            </View>
            <View style={styles.spacer}/>
            <Weekdays/>
        </ContainerView>
    );
};

const styles = StyleSheet.create({
    spacer: {
        marginTop: '12%'
    },
    shortcutsContainer: {
        padding: 10,
        margin: 10,
        height: 265,
        borderWidth: 3,
        borderRadius: 25,
        justifyContent: 'center',
    }
});

export default HomeMain;