const calcPluspunkte = (grades) => {
    if (!grades) return null;

    let points = 0;
    grades.forEach((grade) => {
        if (!grade) return; 
        const rounded = Math.round(grade * 2) / 2;
        points += rounded - 4;
    });

    return points;
}

export default calcPluspunkte;