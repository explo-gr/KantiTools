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
    let date = getMondayDate();

    const constructDate = () => `${date.getDate()}. ${months[date.getMonth()]}`;
    const from = constructDate();
    date.setDate(date.getDate() + 4);
    const to = constructDate();

    return {
        from: from,
        to: to,
        year: date.getFullYear(),
    }
}

const reconstructURL = () => {
    const { from, to, year } = reconstructDates();
    const base = "https://www.gr.ch/DE/institutionen/verwaltung/ekud/ahb/wvb/Menueplaene/Documents/";

    return {
        url: `${base} Menüplan Mensa Münzmühle Woche vom ${from} bis ${to}.pdf`,
        id: `${year}-${from}-${to}`,
    }
}

export default reconstructURL;