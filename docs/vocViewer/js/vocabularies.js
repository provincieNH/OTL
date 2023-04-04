// language context
"use strict";
var vocab = {
    load: function (id) {
        this.ID = id || "nl";
        var f = this[id] || this.NL;
        f.call(this);
        // after lang loaded:
        this.LIST_THESAURUS_PROJECTS = [ this.pnhConcepten];
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
        this.pnhConcepten = {
            id: 'pnhConcepten',
            cs: 'http://ld.noord-holland.nl/id/thesaurus/concept/',
            type: 'skos',
            image: 'ont.png',
            name: 'PNH Concepten',
            desc: 'Dit Vocabulaire bevat concepten die bij de provincie gebruikt worden. '+
            'eerste aanzet...',
            ep: 1
        };
        // this.AreaaldataDesc = {
        //     id: 'Areaaldatabegrippen',
        //     cs: 'http://otl.noord-holland.nl/id/areaaldata/concept/Areaaldata',
        //     type: 'skos',
        //     image: 'ont.png',
        //     name: 'Areaaldata Concepten',
        //     desc: 'Dit Vocabulaire bevat alle concepten die in Areaaldata gebruikt worden. '+
        //     'Deze concepten zijn zoveel mogelijk gerelateerd aan IMGeo begrippen. Daar waar van toepassing zijn er ook relaties naar andere vocabulaires gelegd.',
        //     ep: 1
        // };
        // this.AreaaldataWL = {
        //     id: 'AreaaldataWaardenlijsten',
        //     cs: 'http://otl.noord-holland.nl/def/areaaldata/waardenlijst/',
        //     type: 'waardenlijst',
        //     image: 'list.png',
        //     name: 'Areaaldata Waardenlijsten',
        //     desc: 'Dit Vocabulaire bevat alle waardenlijsten die in Areaaldata gebruikt worden.',
        //     ep: 1
        // };
    },
    en: function () {
        this.pnhConcepten = {
            id: 'pnhConcepten',
            cs: 'http://ld.noord-holland.nl/id/thesaurus/concept/',
            type: 'skos',
            image: 'ont.png',
            name: 'PNH Concepten',
            desc: 'Dit Vocabulaire bevat concepten die bij de provincie gebruikt worden. '+
            'eerste aanzet...',
            ep: 1
        };
        // this.AreaaldataDesc = {
        //     id: 'Areaaldatabegrippen',
        //     cs: 'http://otl.noord-holland.nl/id/areaaldata/concept/Areaaldata',
        //     type: 'skos',
        //     image: 'ont.png',
        //     name: 'Areaaldata Concepten',
        //     desc: 'This Vocabulary contains all concepts in use in the scope of \'Areaaldata\'. '+
        //     'These concepts are, where possible, mapped to the IMGeo concepts, or other relevant concept schemes. <br> Note: the vocuabulary itself is only in Dutch...',
        //     ep: 1
        // };
        // this.AreaaldataWL = {
        //     id: 'AreaaldataWaardenlijsten',
        //     cs: 'http://otl.noord-holland.nl/def/areaaldata/waardenlijst/',
        //     type: 'waardenlijst',
        //     image: 'list.png',
        //     name: 'Areaaldata Waardenlijsten',
        //     desc: 'This Vocabulary contains all value lists that are in use in \'Areaaldata\'. <br> Note: the vocuabulary itself is only in Dutch...',
        //     ep: 1
        // };
    },
    // current langId
    ID: null
};