import { useEffect, useState } from 'react';
import { useData } from '../../../context/DataContext';
import { ScrollView, View, Text } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import LoadingIndicator from '../../../components/common/LoadingIndicator';

const GradesList = () => {
    const { grades, isReady } = useData();
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
                        <Accordion
                            key={i}
                            title={`${subject.subjName}:   ${subject.onlineMean}`}
                            isOpen={!!isOpen[i]}
                            changeIsOpen={() => handleOpen(i)}
                        >
                            <View>
                                {subject.exams.map((exam, idx) => (
                                    <Text key={idx}>{`${exam.topic}:    ${exam.grade}`}</Text>
                                ))}
                            </View>
                        </Accordion>
                    ))
                    : <Text>No data to display</Text>
            }
        </ScrollView>
    );
}

export default GradesList;