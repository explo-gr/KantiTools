const calcPlusMinuspunkte = (grades) => {
    if (!grades) return null;

    let plus = 0;
    let minus = 0;

    grades.forEach((grade) => {
        if (!grade) return; 
        const rounded = Math.round(grade * 2) / 2;  // round quarters

        console.log(rounded);

        if (rounded >= 4) {
            plus += rounded - 4;
        } else {
            minus = 4 - rounded;
        }
    });

    return { plus, minus };
}

export default calcPlusMinuspunkte;