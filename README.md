# KantiTools — MA25 Gian-Marco Coray
KantiTools ist ein Schulassistent für die BKS, der im Rahmen einer Maturaarbeit entwickelt worden ist und privat fortgeführt wird. Die App bietet verschiedene nützlicher Funktionen für den Schulalltag, die bemerkenswerteste davon ist die Verknüpfung mit dem Schulnetz.

## Vorstellung

### Benutzeroberfläche

Es gibt Übersetzungen für 6 verschiedene Sprachen:
* Deutsch
* Italienisch
* Englisch
* Französisch
* Romanisch
* Spanisch

Es gibt einen Hell- und Dunkelmodus mit verschiedenen Akzentfarben.

### Homescreen

<p float="left">
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%206.jpg?raw=true" height="300">
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%208.jpg?raw=true" height="300">
</p>
Auf dem Homescreen befinden sich nützliche Shortcuts wie u. a. Zugriff auf den Menüplan und andere relevante Webseiten. Ausserdem kann ein Stundenplan angehängt werden.

### Noten

<p float="left">
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%207.jpg?raw=true" height="300" />
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%202.jpg?raw=true" height="300">
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%204.jpg?raw=true" height="300" />
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%205.jpg?raw=true" height="300" />
</p>
Auf der Notenübersicht wird die Liste mit den Noten vom Schulnetz angezeigt. Ausserdem kann auf den Notenrechner und den Mindestnotenrechner zugegriffen werden.

### Erinnerungen

<p float="left">
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%209.jpg?raw=true" height="300">
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%2010.jpg?raw=true" height="300">
</p>
Hier können To-dos notiert werden. Die To-dos werden durch ihre Farbe sortiert.

### Einstellungen

<p float="left">
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%201.jpg?raw=true" height="300">
  <img src="https://github.com/explo-gr/explo-gr.github.io/blob/main/images/Screenshot%203.jpg?raw=true" height="300">
</p>
In den Einstellungen kann man sich mit seinem Schulnetz-Konto anmelden und die Sprache ändern etc.

## Kompilieren

```shell
# Clone repo & install deps
git clone https://github.com/explo-gr/KantiTools.git
cd KantiTools
npm install

# Start local server (Expo Go)
npx expo start

# Run on emulator/simulator
npx expo run:android
npx expo run:ios

# Build the app
eas build -p android --local
eas build -p ios --local
```


![Please do not resize this app](https://img.shields.io/badge/don't%20resize-1920x1080_only-blue) 
