## vocViewer

Webviewer voor Vocabulaires en waardenlijsten. Hiermee is het een frontend applicatie voor SPARQL triple stores.

geinspireerd op gba-thesaurus: https://github.com/schmar00/gba-thesaurus.

__LET OP!__ Nog zwaar in ontwikkeling...

### Componenten
* HTML5, CSS, Javascript, ES6, JQuery
* Fuse.js voor fuzzy search: https://github.com/krisk/Fuse
* vis.js netwerk visualisaties: https://visjs.github.io/vis-network/docs/network
* Bootstrap

### Aan de praat krijgen...

puur html/css/javascript, dus kan in principe ook op bv github.io draaien...

* In ws.js zijn de sparql endpoints gedefinieerd. evt met een JWT (JSON Web Token) om te authenticeren tegen een endpoint. Er is niets geregeld met login of iets dergelijks om een JWT te verkrijgen...
* vocabulaires.js bevat de configuratie voor de vocabulaires die getoond worden.
* de viewer is in principe tweetalig nederlands/engels, dus sommige configuratie zaken staan er dubbel in om evt. in twee talen toe te lichten...
* zo hier en daar zitten er nog hard-coded 'hacks' in om op bv noord-holland te testen...


### Licentie

MIT License - zie [LICENSE.md](LICENSE) voor details