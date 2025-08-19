import * as cheerio from 'cheerio';

// kei typescript für mi 🤷‍♂️😎
const newExamDataTemplate = () => ({
    date: null,
    topic: null,
    grade: null,
    weight: null,
    score: null
});

const newSubjectDataTemplate = () => ({
    courseName: null,
    subjName: null,

    onlineMean: null,
    confirmationHref: null,

    exams: null
});

// query subjects and retrieve resp. data
const parseGradeTable = (document) => {
    if (!document) return null;

    const $ = cheerio.load(document);
    const MAX_SUBJECTS = 32;

    let subjectRefPoints = [];
    let rowIndex = 0;
    let currentRef = $(`.0_${rowIndex}_detailrow`);

    if (!currentRef.length) return null;
    
    while (rowIndex <= MAX_SUBJECTS) {
        subjectRefPoints.push(currentRef);
        
        rowIndex++;
        currentRef = $(`.0_${rowIndex}_detailrow`);

        if (!currentRef.length) break;
    }
    
    return subjectRefPoints.map((e) => {
        const subjectData = newSubjectDataTemplate();

        const prevTr = $(e).prev('tr');
        subjectData.courseName = prevTr.find('td').eq(0).contents().first().text().trim();
        subjectData.subjName = prevTr.find('td').eq(0).contents().last().text().trim();
        subjectData.onlineMean = Number(prevTr.find('td').eq(1).text().trim());

        // href="javascript:decision('Der Best%C3%A4tigungsvorgang kann nicht r%C3%BCckg%C3%A4ngig gemacht werden. Weiterfahren?','index.php?pageid=21311&amp;action=nvw_bestaetigen&amp;id=5689ff98b8f58a10&amp;transid=9e7509&amp;listindex=2')"
        const rawConfirmationHref = prevTr.find('td').find('a').eq(0).attr('href');
        
        if (rawConfirmationHref && rawConfirmationHref.indexOf(',') > -1 && rawConfirmationHref.indexOf(')') > -1) {
            subjectData.confirmationHref = rawConfirmationHref.substring(rawConfirmationHref.indexOf(',') + 2, rawConfirmationHref.indexOf(')') - 1);
        }

        let examArray = [];
        
        $(e).find('tbody').eq(0).find('tr:first').nextUntil('tr:last-child').each((i, e) => {
            const examData = newExamDataTemplate();

            examData.date = $(e).find('td').eq(0).text().trim();
            examData.topic = $(e).find('td').eq(1).text().trim();
            examData.grade = Number($(e).find('td').eq(2).contents().first().text().trim());

            const rawScore = $(e).find('td').eq(2).find('div').contents().last().text().trim();

            if (rawScore.length && rawScore.indexOf('Punkte: ') > -1) {
                examData.score = rawScore.substring(8, rawScore.length);
            }

            examData.weight = Number($(e).find('td').eq(3).contents().first().text().trim());

            examArray.push(examData);
        });

        subjectData.exams = examArray;

        return subjectData;
    });
};

export default parseGradeTable