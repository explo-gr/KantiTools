import { useEffect, useState } from 'react';
import { useData } from '../../../context/DataContext';
import { ScrollView, View, Text, Button, Alert } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import LoadingIndicator from '../../../components/common/LoadingIndicator';

const GradesList = () => {
    const { grades, isReady, refreshAll } = useData();
    const [ dataReady, setDataReady ] = useState(false);
    const [ dataAvailable, setDataAvailable ] = useState(false);

    const [ isOpen, setIsOpen ] = useState({});

    const handleOpen = (i) => {
        setIsOpen(prev => ({
            ...prev,
            [i]: !prev[i]
        }));
    };

    useEffect(() => {
        setDataReady(isReady)
    }, [isReady]);

    useEffect(() => {
        setDataAvailable(!!grades.data);
    }), [grades.data];

    if (!dataReady) {
        return (
            <LoadingIndicator status={'Loading'}/>
        );
    }

    return (
        <ScrollView>
            {
                dataAvailable
                    ? grades.data.map((subject, i) => (
                        <View
                            id={`view-${i}`}
                            style={{
                                marginBottom: 5
                            }}
                        >
                            <Accordion
                                key={`acc-${i}`}
                                title={`${subject.subjName}:   ${subject.onlineMean}`}
                                isOpen={!!isOpen[i]}
                                changeIsOpen={() => handleOpen(i)}
                            >
                                <View>
                                    {subject.exams.map((exam, idx) => (
                                        <Text key={idx}>{`${exam.topic}:    ${exam.grade}`}</Text>
                                    ))}
    {/*                                 <Button
                                        title='confirm'
                                        onPress={async () => {
                                            // das isch uf dia art nit möglich 
                                            // ttps://schulnetz.bks-campus.ch/index.php?pageid=21311&action=nvw_bestaetigen&id=83c028eb78464324&transid=7fdsa03f37&listindex=3
                                            // du bruchsch action und listindex näbb cookie und id und transid
                                            await fetch(subject.confirmationHref);
                                            await refreshAll();
                                        }}
                                        disabled={!subject.confirmationHref}
                                    /> */}
                                </View>
                            </Accordion>
                        </View>
                    ))
                    : <Text>No data to display</Text>
            }
        </ScrollView>
    );
}

export default GradesList;