// Imports
import { Text, View, StyleSheet, TextInput, FlatList, Keyboard, Pressable } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useThemes } from '../../../context/ThemeContext';
import GradeItem from './GradeItem';
import Button from '../../../components/common/Button';
import { useTranslations } from '../../../context/LanguageContext';

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
const MinimumGradeCalculator = ({ gradeData = [] }) => {
    const { colors } = useThemes();
    const { t } = useTranslations();

    const entryId = useRef(0);

    const [ dataTable, updateDataTable ] = useState(gradeData);
    const [ desiredGrade, setDesiredGrade ] = useState('');
    const [ dgWeight, setDgWeight ] = useState('');
    const [ output, setOutput ] = useState('');

    const addItem = () => {
        entryId.current += 1;

        const newEntry = createNewEntry(`entry-${entryId.current}`);
        updateDataTable(prev => [newEntry, ...prev]);
    };

    useEffect(() => {
        let weightSum = 0;
        let minGrade = 0;

        dataTable.forEach(({ weight, grade }) => {
            const parsedWeight = Number(weight) || 1;
            const parsedGrade = Number(grade);

            if (parsedGrade) {
                weightSum += parsedWeight;
                minGrade -= parsedWeight * parsedGrade;
            }
        });

        const convertedDesiredGrade = Number(desiredGrade);
        const convertedDesiredWeight = Number(dgWeight) || 1;

        let tempOutput;

        if (convertedDesiredGrade) {
            minGrade += convertedDesiredGrade * (weightSum + convertedDesiredWeight);

            const result = minGrade /= convertedDesiredWeight;
            console.log(result);

            if (result < 1) {
                tempOutput = '1-';
            } else if (result > 6) {
                tempOutput = '6+';
            } else {
                tempOutput = (Math.round((minGrade /= convertedDesiredWeight) * 100) / 100).toFixed(2);
            }

        } else {
            tempOutput = '1.00';
        }

        setOutput(tempOutput);
    }, [desiredGrade, dgWeight, dataTable])

    return (
        <View style={styles.rootContainer}>
            <View style={styles.outputContainer}>
                <Text style={[{
                    color: colors.blue
                },styles.outputText]}>{ output }</Text>
            </View>

            <View style={styles.rootHeaderContainer}>
                <View style={styles.headerContainer}>
                    <TextInput
                        onChangeText={(input) => setDesiredGrade(input.replace(/[^0-9.,]/g, ''))}
                        value={desiredGrade}
                        keyboardType='number-pad'
                        placeholder={t('gr_calcmin_dd')}
                        placeholderTextColor={colors.gray}
                        maxLength={5}
                        style={[{
                            borderColor: colors.blue,
                            color: colors.hardContrast
                        }, styles.input]}
                    />
                    <TextInput
                        onChangeText={(input) => setDgWeight(input.replace(/[^0-9.,]/g, ''))}
                        value={dgWeight}
                        keyboardType='number-pad'
                        placeholder={t('gr_calcmin_wt')}
                        placeholderTextColor={colors.gray}
                        maxLength={5}
                        style={[{
                            borderColor: colors.blue,
                            color: colors.hardContrast
                        }, styles.input]}
                    />
                    <Button title={t('add')} onPress={addItem} icon={'plus'}/>
                </View>
            </View>

            {!!dataTable.length && (
                <Pressable onPress={Keyboard.dismiss}>
                    <FlatList
                        data={dataTable}
                        extraData={dataTable}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps={'handled'}
                        scrollEnabled
                        contentContainerStyle={styles.contentContainer}
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
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    outputText: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 82,
        marginBottom: 20,
        marginTop: 5
    },
    outputContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rootContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
        padding: 5
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 8,
        padding: 4,
        gap: 10
    },
    input: {
        borderWidth: 2,
        borderRadius: 14,
        paddingHorizontal: 10,
        flex: 1,
        padding: 8,
        height: 45
    },
    contentContainer: {
        paddingBottom: 300
    },
    rootHeaderContainer: {
        paddingBottom: 5
    }
});

export default MinimumGradeCalculator;