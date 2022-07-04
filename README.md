
# NxTicketioTasks

## Setup

Zum Installieren der Abhängigkeiten und Starten des Projektes ist die Ausführung folgender Befehle notwendig:

> npm i && npm run start

Automatische Tests:

> npm run test

## Lösung - Aufgabe 1

Entnimmt man die Münzen pro Maschine so, dass man von der ersten eine nimmt, von der zweiten zwei und von der x-ten x Münzen (max. 10), gibt die Zehnerstelle der Summe aller zusammen gewogenen Münzen einen Hinweis darauf, welche Maschine defekt ist. Voraussetzung ist aber, dass wie beschrieben genau eine defekt ist. Ist die Zehnerstelle eine 1, ist die erste Maschine defekt, ist die Zehnerstelle x, ist die x-te Maschine defekt. Einzige Ausnahme wäre bei diesem Vorgehen die zehnte Maschine, die in einer Zehnerstelle von 0 resultieren würde.

## Lösung - Aufgabe 2

In der folgenden Ansicht werden alle gespeicherten Events geladen, mit den jeweils den Events zugeordneten Tickets. Für die Umsetzung wurden im Frontent folgende Technologien genutzt:
NX, React, Material-UI, TypeScript, Axios, react-qr-code

Für die Umsetzung im Backend habe ich auf eine Node/Express Lösung zurückgegriffen, da NestJS noch nicht zu meinem aktuellen Tech-Stack gehört und die Bearbeitungszeit limitiert war. Weitere Technologien:
NX, Express, NodeJS, randomstring
