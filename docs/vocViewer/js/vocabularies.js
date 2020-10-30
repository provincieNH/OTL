// language context
"use strict";
var vocab = {
    load: function (id) {
        this.ID = id || "nl";
        var f = this[id] || this.NL;
        f.call(this);
        // after lang loaded:
        this.LIST_THESAURUS_PROJECTS = [this.AreaaldataDesc, this.AreaaldataWL];
    },
    // loading functions, one for each language
    /*
    id: intern id wat in de code gebruikt wordt,
    cs: concept scheme. de uri of het skos:conceptscheme wat getoond moet worden. Wordt gebruikt om de verschillende concept schemes uit 1 repo te scheiden,
    type: kiezen uit 'skos' of 'waardenlijst', op basis hiervan worden de juiste sparql queries uitgevoerd. TODO:nta8035 compliant shacl ontologie...
    image: het plaatje op de homepage. kiezen uit: voc.png, ont.png of list.png
    name: de naam die op de homepage verschijnt
    desc: de beschrijving op de homepage
    ep: het endpoint waar de sparql queries tegen geplaatst moeten worden. de endpoints zijn in ws.js gedefinieerd
    */
    nl: function () {
        this.AreaaldataDesc = {
            id: 'Areaaldatabegrippen',
            cs: 'http://otl.noord-holland.nl/id/areaaldata/concept/Areaaldata',
            type: 'skos',
            image: 'ont.png',
            name: 'Areaaldata Concepten',
            desc: 'Dit Vocabulaire bevat alle concepten die in Areaaldata gebruikt worden. '+
            'Deze concepten zijn zoveel mogelijk gerelateerd aan IMGeo begrippen. Daar waar van toepassing zijn er ook relaties naar andere vocabulaires gelegd.',
            ep: 1
        };
        this.AreaaldataWL = {
            id: 'AreaaldataWaardenlijsten',
            cs: 'http://otl.noord-holland.nl/def/areaaldata/waardenlijst/',
            type: 'waardenlijst',
            image: 'list.png',
            name: 'Areaaldata Waardenlijsten',
            desc: 'Dit Vocabulaire bevat alle waardenlijsten die in Areaaldata gebruikt worden.',
            ep: 1
        };
    },
    en: function () {
        this.AreaaldataDesc = {
            id: 'Areaaldatabegrippen',
            cs: 'http://otl.noord-holland.nl/id/areaaldata/concept/Areaaldata',
            type: 'skos',
            image: 'ont.png',
            name: 'Areaaldata Concepten',
            desc: 'Dit Vocabulaire bevat alle concepten die in Areaaldata gebruikt worden. '+
            'Deze concepten zijn zoveel mogelijk gerelateerd aan IMGeo begrippen. Daar waar van toepassing zijn er ook relaties naar andere vocabulaires gelegd.',
            ep: 1
        };
        this.AreaaldataWL = {
            id: 'AreaaldataWaardenlijsten',
            cs: 'http://otl.noord-holland.nl/def/areaaldata/waardenlijst/',
            type: 'waardenlijst',
            image: 'list.png',
            name: 'Areaaldata Waardenlijsten',
            desc: 'Dit Vocabulaire bevat alle waardenlijsten die in Areaaldata gebruikt worden.',
            ep: 1
        };
    },
    // current langId
    ID: null
};