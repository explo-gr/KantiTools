// imports regarding general objects
import { Text, View, Button, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import { DataProvider, useData } from '../../../context/DataContext';
import GradesList from './GradesList';
import { AuthProvider } from '../../../context/AuthenticationContext';
import ContainerView from '../../../components/common/ContainerView';

const Screen = ({ navigation }) => {
    const { defaultThemedStyles } = useThemes();
    const { refreshAll } = useData();
    const { grades } = useData();

    return (
        <ContainerView>
            <Text style={defaultThemedStyles.text}>GradesScreen</Text>
            <Button
                title='test grades'
                onPress={() => {
                            if (!grades.data) return;
                            grades.data.forEach((e) => {
                            console.log(`Course Name: ${e.courseName}`);
                            console.log(`Subject Name: ${e.subjName}`);
                            console.log(`Online Mean: ${e.onlineMean}`);
                            console.log(`Confirmation Href: ${e.confirmationHref}`);
                            console.log(`Exams: `);
                            e.exams.forEach((e) => {
                                console.log(`            Date: ${e.date}`);
                                console.log(`            Topic: ${e.topic}`);
                                console.log(`            Grade: ${e.grade}`);
                                console.log(`            Weight: ${e.weight}`);
                                console.log(`            Score: ${e.score}`);
                                console.log(`                                  `);
                            })
                            console.log(`------------------------------------`);
                        });
                }}
            />

            <Button
                title='RefreshAll'
                onPress={async () => {
                    await refreshAll();
                }}
            />

            <Button
                title='Go to Screen2'
                onPress={() => navigation.navigate('GradesDebug')}
            />

            <Button
                title='Go to Screen3'
                onPress={() => navigation.navigate('GradesGradeCalculation')}
            />
            <GradesList/>
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