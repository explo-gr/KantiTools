// Imports
import { Text, View, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useThemes } from '../../../context/ThemeContext';
import GradeItem from './GradeItem';
import { useHeaderHeight } from '@react-navigation/elements'
import Button from '../../../components/common/Button';

const createNewEntry = (id) => ({
    id,
    grade: '',
    weight: '',
});

const deleteEntry = (arr, id) => arr.filter(entry => entry.id !== id);

const duplicateEntry = (arr, id, newId) => {
    const index = arr.findIndex(entry => entry.id === id);
    if (index === -1) return arr;
  
    const duplicated = { ...arr[index], id: newId };
    return [...arr.toSpliced(index, 0, duplicated)];
};

// Grade Calculation
const MinimumGradeCalculator = () => {
    const { colors } = useThemes();

    const entryId = useRef(0);

    const [ dataTable, updateDataTable ] = useState([]);
    const [ desiredGrade, setDesiredGrade ] = useState('');
    const [ dgWeight, setDgWeight ] = useState('');
    const [ output, setOutput ] = useState('');

    const addItem = () => {
        entryId.current += 1;

        const newEntry = createNewEntry(`entry-${entryId.current}`);
        updateDataTable(prev => [...prev, newEntry]);
    };

    useEffect(() => {
        let weightSum = 0;
        let minGrade = 0;Platform

        dataTable.forEach(({ weight, grade }) => {
            const parsedWeight = Number(weight);
            const parsedGrade = Number(grade);

            if (parsedGrade && parsedWeight) {
                weightSum += parsedWeight;
                minGrade -= parsedWeight * parsedGrade;
            }
        });

        const convertedDesiredGrade = Number(desiredGrade);
        const convertedDesiredWeight = Number(dgWeight);

        if (convertedDesiredGrade && convertedDesiredWeight) {
            minGrade += convertedDesiredGrade * (weightSum + convertedDesiredWeight);
            const result = Math.round((minGrade /= convertedDesiredWeight) * 100) / 100;
            setOutput(result.toFixed(2));
        } else {
            setOutput('1.00');
        }

    }, [desiredGrade, dgWeight, dataTable])

    return (
        <View style={styles.rootContainer}>
            <View style={styles.outputContainer}>
                <Text style={[{
                    color: colors.blue
                },styles.outputText]}>{ output }</Text>
            </View>
{/*
            <KeyboardAvoidingView
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 50}
            >
*/}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={dataTable}
                        extraData={dataTable}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps={'handled'}
                        scrollEnabled
                        contentContainerStyle={{ paddingBottom: 300 }}
                        ListHeaderComponent={
                            <View style={styles.headerContainer}>
                                <TextInput
                                    onChangeText={(input) => setDesiredGrade(input.replace(/[^0-9.,]/g, ''))}
                                    value={desiredGrade}
                                    keyboardType='number-pad'
                                    placeholder='desired'
                                />
                                <TextInput
                                    onChangeText={(input) => setDgWeight(input.replace(/[^0-9.,]/g, ''))}
                                    value={dgWeight}
                                    keyboardType='number-pad'
                                    placeholder='weight'
                                />
                                <Button title='Add' onPress={addItem}/>
                            </View>
                        }
                        renderItem={({ item }) => {
                            return (
                                <GradeItem
                                    grade={item.grade}
                                    weight={item.weight}

                                    onDelete={() => updateDataTable(prev => deleteEntry(prev, item.id)) }
                                    onDuplicate={() => {
                                        updateDataTable(prev => {
                                            entryId.current += 1;
                                            return duplicateEntry(prev, item.id, `entry-${entryId.current}`);
                                        });
                                    }}
                                    onGradeChange={(input) =>
                                        updateDataTable(prev =>
                                          prev.map((entry) =>
                                            entry.id === item.id
                                              ? { ...entry, grade: input.replace(/[^0-9.,]/g, '') }
                                              : entry
                                          )
                                        )
                                    }
                                    onWeightChange={(input) =>
                                        updateDataTable(prev =>
                                          prev.map((entry) =>
                                            entry.id === item.id
                                              ? { ...entry, weight: input.replace(/[^0-9.,]/g, '') }
                                              : entry
                                          )
                                        )
                                    }
                                />
                            );
                        }}
                    />
                </TouchableWithoutFeedback>
{/*
            </KeyboardAvoidingView>
*/}
        </View>
    );
};

const styles = StyleSheet.create({
    outputText: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 82
    },
    outputContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rootContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        padding: 5
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 8,
        padding: 4
    }
});

export default MinimumGradeCalculator;