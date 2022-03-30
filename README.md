# Beskrivning
Cold n Yummy™ vill ha en kampanjsida för framröstning av en ny glassmak. Användare väljer en smak och skickar med sitt namn och e-mail-adress för att rösta på den. Man ska även kunna se topplistan på de mest populära smakerna.

## Instruktioner
Skapa ett privat repository och bjud in läraren.

Skapa en datamodell med ER-diagram för applikationen.

Implementera applikationen!

Se figma-fil för färger och typsnitt och sånt bös.

## Teknisk specifikation
* Express
* EJS
* Sequelize
* express-session eller cookie-session(VG)
* bcryptjs(VG)

## Krav - G
* ER-Diagram
* Ett statiskt antal förskapade smaker
* Användare kan rösta på någon av dessa, men bara en gång genom att skicka med sin e-mail (har man fler e-mail-adresser kan man rösta fler gånger)
* Användare kan se antal röster på de 10 mest populära smakerna

## Krav - VG
* {...G-krav}
* Registrering och inloggning
* Ett statiskt antal förskapade smaker, men användare kan skapa _en_ ny smak som andra kan rösta på
* Vettig styling

## Bonusbana
En sluttid när det inte går att rösta mer och en timer på frontenden som räknar ner till detta
