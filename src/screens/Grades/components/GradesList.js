import { useEffect, useState } from 'react';
import { useData } from '../../../context/DataContext';
import { ScrollView, View } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import LoadingIndicator from '../../../components/common/LoadingIndicator';

const GradesList = () => {
    const { grades, isReady } = useData();
    const [ dataReady, setDataReady ] = useState(false);

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

    if (!dataReady) {
        return (
            <LoadingIndicator status={'Loading'}/>
        );
    }

    return (
        <ScrollView>
            {grades.data.map((subject, i) => (
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
            ))}
        </ScrollView>
    );
}

export default GradesList;