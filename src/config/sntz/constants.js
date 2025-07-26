const DATA_KEYS = {
    grades: "cached_grades",
};

const HOST = {
    // static approach, logic would have to be split off somewhere
    // else if multiple providers were to be supported

    login: "https://schulnetz.bks-campus.ch/loginto.php?pageid=2131",
    grades: "https://schulnetz.bks-campus.ch/index.php?pageid=21311",
    attendance: "https://schulnetz.bks-campus.ch/index.php?pageid=21111",
    start: "https://schulnetz.bks-campus.ch/index.php?pageid=1"
};

export {
    DATA_KEYS,
    HOST
}