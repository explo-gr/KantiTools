import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react'
import * as cheerio from 'cheerio';
import Logger from './Logger';

const HOST = {
    LOGIN: "https://schulnetz.bks-campus.ch/loginto.php?pageid=2131",
    GRADES: "https://schulnetz.bks-campus.ch/index.php?pageid=21311",
    ABSENCES: "https://schulnetz.bks-campus.ch/index.php?pageid=21111",
    TIMETABLE: "https://schulnetz.bks-campus.ch/index.php?pageid=22202"
};

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
    } catch (error) {
        return "Failed to fetch data";
    }
};

const scrapePageData = async (uri) => {
    const USERNAME = "coray.gian-marco@bks-campus.ch";
    const PASSWORD = "APPLESUCKS";
    const LOGINHASH = await getLoginHash(uri);

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

        //TODO: uf HTTPS Response Code pr�afa
        return response.text();
    }

    catch {
        return "<tr><td>Failed to retrieve html</td></tr>";
    }
}

const parseTable = (html_data) => {

    const $ = cheerio.load(html_data);

    var grade_table = [
        {
            name: "Biologie",
            grades: {
                results: [5, 5, 5],
                weight: [1, 1, 1]
            },
            confirm_uri: "www.google.com"
        }
    ];

    var name_list = [];
    $('table.mdl-data-table > tr').each((_i, el) => {
        

        //Fachname
        let subject_name_raw = $(el).find('td:first').html() //zu raw html u widr zruck
        const subject_name = subject_name_raw.slice(subject_name_raw.indexOf('<br>') + 3, subject_name_raw.indexOf('</td>'));

        //Bestätigungs URL
        const grade_confirm_url = $(el).find('a').attr('href');

        //Noten
        $(el).find('table.clean > tr:gt(0)').each();
        
    })

    return name_list;

}

const SchulnetzNotenTest = () => {
    const logger = Logger();

    return (
        <View style={styles.container}>
            <ScrollView>
                <logger.DebugView/>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button
                    onPress={async () => {
                        const html_raw = await scrapePageData(HOST.GRADES);
                        
                        const start_index = html_raw.indexOf('<table class="mdl-data-table', 42000);
                        const end_index = html_raw.indexOf('<br><br>', 42000);

                        var html_cut = html_raw.slice(start_index, end_index);
                        var parsed = parseTable(html_cut);

                        logger.printscr("\nPARSED\n", parsed,"\nRAW\n", html_cut);
                    }}
                    title='fetch (cut)'
                />
                <Button
                    onPress={async () => {
                        const html_raw = await scrapePageData(HOST.GRADES);
                        const gradeTable = parseTable(html_raw);
                        
                        logger.printscr("\nCUT\n", gradeTable);
                    }}
                    title='fetch (uncut)'
                    disabled
                />
                <Button
                    onPress={async () => {
                        logger.clearscr()
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