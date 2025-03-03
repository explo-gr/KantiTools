const getMondayDate = () => {
    let date = new Date();
    const day = date.getDay();

    let delta;

    switch (day) {
        case 0:
            delta = 1;
            break;
        case 6:
            delta = 2;
        default:
            delta = -(date - 1);
    }

    date.setDate(date.getDate() + delta);

    return date;
}

const reconstructDates = () => {
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let initialDate = getMondayDate();

    const constructDate = () => `${initialDate.getDate()}. ${months[initialDate.getMonth()]}`;
    const from = constructDate();
    initialDate.setDate(initialDate.getDate() + 4);
    const to = constructDate();

    return {
        from: from,
        to: to
    }
}

const reconstructURL = () => {
    const { from, to } = reconstructDates();
    const base = "https://www.gr.ch/DE/institutionen/verwaltung/ekud/ahb/wvb/Menueplaene/Documents/";
    return `${base} Menüplan Mense Münzmühle Woche vom ${from} bis ${to}.pdf`;
}

export default reconstructURL;