Sacha woni macha muas
[x] Style Bottom Tab Navigator
[x] Translation support
[ ] Layout bi da iistelliga nit so behinder macha, luag dass a box drum umma goht so mit margin, sust bürokratie
[ ] Bottom Tab Nav kann iiklappt wärda


Stuck für Stuck
[x] imports fixa, alli
[x] Dropdown Programmiara
[ ] Layout Homescreen/Dashboard ---> hell nah
[x] Login Manager


Für hüt - Iistelliga
[x] Mehrari Bildschirm iistelliga
[x] "container component"
[~] schönes design
[x] login screen


Stand for App:
-------------

- vieles für themeing fehlt (komponenta)
- vieles an layout fehlt
- guates design fehlt
- nonig eimol testat uf iOS

Home
- greeting fehlt
- menuplan fehlt
- stundaplan fehlt
- "overview" mit dashboard --> x todos
- füllerobjekt wia wuchaübersicht

Nota
- front-end fehlt
- notarechner gseht scheisse us
- pluspunktübersicht etc.

Reminder
- kompletti todolista fehlt

Settings
- schualnetz login management fehlt

<Stack.Navigator>
  <Stack.Screen
    name="Settings"
    component={SettingsScreen}
    options={{
      header: () => <CustomHeader showBack={true} animated={true} />
    }}
  />
</Stack.Navigator>



- info i näbb dnota GMACHT
- mindestnote berechnen: übersetziga fehlend GMACHT
- timetable dialog NO
- todos bliibend offa noch löscha
- ladescreen
- package.json für müll prüafa GMACHT
- übersetziga
- zcached würd nia glada datacontextq GMACHT
- maxwidth containerview
- da ganza bildschirma an nama gä
- open source handling