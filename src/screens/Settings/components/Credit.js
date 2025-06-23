import { View, Image, Text, StyleSheet } from 'react-native';

const Credit = () => {
    return (
        <View style={styles.creditContainer}>
            <Image
                style={styles.creditImage}
                source={require('../../../assets/icons/icon.png')}
            />
            <View style={styles.creditTextContainer}>
                <Text style={styles.creditText}> Created by Gian-Marco Coray</Text>
                <Text style={styles.creditText}> https://github.com/explo-gr/KantiTools</Text>
                <Text style={styles.creditText}> KantiTools</Text>
                <Text style={styles.creditText}> Alpha 1.5</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    creditTextContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 2,
    },
    creditContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    creditImage: {
        height: 80,
        width: 80,
        borderRadius: 25
    },
    creditText: {
        fontStyle: 'italic',
        fontWeight: '320'
    }
});

export default Credit;