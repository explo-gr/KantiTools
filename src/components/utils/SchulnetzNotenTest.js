import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react'
import _Logger from './Logger';
import getSubjectData from '../../lib/sntz/gradeTableParser';

const HOST = Object.freeze({
    LOGIN: "https://schulnetz.bks-campus.ch/loginto.php?pageid=2131",
    GRADES: "https://schulnetz.bks-campus.ch/index.php?pageid=21311",
    ATTENDANCE: "https://schulnetz.bks-campus.ch/index.php?pageid=21111",
    TIMETABLE: "https://schulnetz.bks-campus.ch/index.php?pageid=22202"
});

const getLoginHash = async (uri) => {
    try {
        const response = await fetch(uri, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const raw_html = await response.text();
        const hash_index = raw_html.indexOf('<input type="hidden" value="') + 28;

        return raw_html.substring(hash_index, hash_index + 32);
    } catch {
        return null;
    }
};

// 302 found bei falschem login

const scrapePageData = async (uri) => {
    const USERNAME = "coray.gian-marco@bks-campus.ch";
    const PASSWORD = "";
    const LOGINHASH = await getLoginHash(uri);

    if (LOGINHASH == null) return null;

    const DATA = {
        'login': USERNAME,
        'passwort': PASSWORD,
        'loginhash': LOGINHASH
    };

    try {
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html'
            },
            redirect: 'follow',
            body: new URLSearchParams(DATA).toString()
        });

        //TODO: uf HTTPS Response Code prüafa
        return response.text();
    }

    catch {
        return null;
    }
}

const SchulnetzNotenTest = () => {
    const Logger = _Logger();

    return (
        <View style={styles.container}>
            <ScrollView>
                <Logger.DebugView/>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button
                    onPress={async () => {
                        const html_raw = await scrapePageData(HOST.GRADES);
                        const parsed_subjects = getSubjectData(html_raw);

                        parsed_subjects.forEach((e) => {
                            console.log(`Course Name: ${e.courseName}`);
                            console.log(`Subject Name: ${e.subjName}`);
                            console.log(`Online Mean: ${e.onlineMean}`);
                            console.log(`Confirmation Href: ${e.confirmationHref}`);
                            console.log(`Exams: `);
                            e.exams.forEach((e) => {
                                console.log(`            Date: ${e.date}`);
                                console.log(`            Topic: ${e.topic}`);
                                console.log(`            Grade: ${e.grade}`);
                                console.log(`            Weight: ${e.weight}`);
                                console.log(`            Score: ${e.score}`);
                                console.log(`                                  `);
                            })
                            console.log(`------------------------------------`);
                        })

                        parsed_subjects.forEach((e) => {
                            console.log(e.exams.length);
                        })

                        Logger.printscr("\nPARSED\n", "ir konsola","\nRAW\n", html_raw);
                    }}
                    title='fetch'
                />
                <Button
                    onPress={async () => {
                        Logger.clearscr()
                    }}
                    title='clear'
                />
            </View>
        </View>
    );

}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logtext: {
        paddingBottom: 2
    },
    buttonContainer: {
        flexDirection: 'row',
    }
});

export default SchulnetzNotenTest;