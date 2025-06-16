import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import { ScrollView } from "react-native";
import Accordion from "../../../components/common/Accordion";

const LoadingIndicator = () => {
    return <ActivityIndicator size="large" />;
}

const GradesList = () => {
    const { grades, isReady } = useData();
    const [ gradesReady, setGradesReady ] = useState(false);

    useEffect(() => {
        if (isReady) {
            setGradesReady(true);
        } else {
            setGradesReady(false);
        }
    }, [isReady]);

    if (!gradesReady) {
        return <LoadingIndicator/>;
    }

    return (
        <ScrollView>
            { grades.map((subject, i) => {
                <Accordion
                    key={i}
                    title={}
                >

                </Accordion>
            })}
        </ScrollView>
    );
}

export default GradesList;