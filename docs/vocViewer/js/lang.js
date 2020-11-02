// language context
"use strict";
var lang = {
    load: function (id) {
        this.ID = id || "nl";
        var f = this[id] || this.NL;
        f.call(this);
        vocab.load(id) // vocabulaires uit vocabulaires.js laden
    },
    // loading functions, one for each language
    nl: function () {
        this.LABEL_LICENSE = 'Gebruiksbeperkingen';
        this.LABEL_DISCLAIMER = 'Disclaimer';
        this.LABEL_SERVICES = 'Services';
        this.LABEL_CONTACT = 'Contact';
        this.LABEL_SEARCH = 'thesaurus';
        this.TIP_SEARCH = 'Zoeken...';
        this.TITLE_SEARCHRESULTS = 'Zoekresultaten';
        this.HITS_SEARCHRESULTS = '0 resultaten voor ';
        this.LABEL_BIBLREF = 'Bibliografie';
        this.IMG_PNHLOGO = 'pnhlogo.png';
        this.APPS = 'Applcaties';
        this.TOPIC = 'Thema';
        this.DB_QUERY = 'Database query (SPARQL)';
        this.EXAMPLE_QUERY = 'Voorbeeld query';
        this.SEM_REL = 'Relaties';
        this.descriptions_H = 'Beschrijvingen';
        this.scientificReferences_H = 'Bronverwijzing';
        this.semanticRelations_H = 'Semantische Relaties';
        this.dataLinks_H = 'Downloads';
        this.visualization_H = 'Visualisatie';
        this.location_H = 'Locatie';
        this.creator_H = 'Provenance';
        this.TITLE_THES_2 ='DISCLAIMER: Dit is een test site. Er kunnen geen rechten aan de getoonde informatie ontleent worden...';
        this.DESC_THESAURUS = '..tweetalig (Nederlands, Englisch) <br>..ontworpen als generieke, uitbreidbare kennisbank <br> '+ 
        '..gemaakt met <a href="http://www.w3.org/2004/02/skos/" title="SKOS Simple Knowledge Organization System" target="_blank">SKOS</a> ' +
        'concepten (Begrippen, en synoniemen), met eigen unieke identificatie in de vorm van <a href="http://de.wikipedia.org/wiki/Uniform_Resource_Identifier" ' +
        'title="URI Uniform Resource Identifier" target="_blank">URI\'s</a><br>..opgebouwd in een meervoudige hierarchie met ruimere, nauwere en verwante begrippen '+
        'inclusief definities en verwijzingen';

        //************Description Objects**************

        this.DESC_LINKEDDATA = {
            id: 'linkedData',
            image: 'linkedData.png',
            name: 'Linked Data',
            desc: 'formatted as SKOS concepts (terms, including synonyms), each with their own web addresses &#8594; <a href="http://en.wikipedia.org/wiki/Uniform_Resource_Identifier" title="URI Uniform Resource Identifier" target="_blank">URIs</a> - specified by polyhierarchical relationships as broader, narrower, and related concepts within the domain including descriptions and bibliographic references - as <a href="http://en.wikipedia.org/wiki/Linked_Open_Data" title="Linked Data" target="_blank">Linked Data</a> resource semantically linked to other web resources &#8594; <a href="http://dbpedia.org/" title="DBpedia Knowledge Base" target="_blank">DBpedia</a>, <a href="http://inspire.ec.europa.eu/registry/" title="INSPIRE Codes" target="_blank">INSPIRE</a>, <a href="http://resource.geosciml.org/" title="Resources for Geosciences XML" target="_blank">GeoSciML</a> - machine-readable published using web services (endpoints) according to the standards of <a href="http://www.w3.org/2013/data/" title="The World Wide Web Consortium" target="_blank">W3C</a> &#8594; <a href="http://www.w3.org/RDF/" title="Resource Description Framework (RDF)" target="_blank">RDF</a>, <a href="http://www.w3.org/TR/rdf-sparql-query/" title="SPARQL Query Language for RDF" target="_blank">SparQL</a> - to be used in Linked Data web applications such as hyperlinks for online texts or as encoding for geospatial data harmonizing data, DataViewer'
        };
        
        this.DESC_DISCLAIMER = '<h1>Disclaimer:</h1>The user of this site takes note and approves this disclaimer.<br><br>The application uses standards like HTML5/ES16/JQuery and is best viewed with Firefox, Chrome, Safari or Edge. MS InternetExplorer11 and older versions are not supported.';
    },
    en: function () {
        this.LABEL_LICENSE = 'Terms of use';
        this.LABEL_DISCLAIMER = 'Disclaimer';
        this.LABEL_SERVICES = 'Services';
        this.LABEL_CONTACT = 'Contact';
        this.LABEL_SEARCH = 'thesaurus';
        this.TIP_SEARCH = 'Search for...';
        this.TITLE_SEARCHRESULTS = 'Search results';
        this.HITS_SEARCHRESULTS = '0 results for ';
        this.LABEL_BIBLREF = 'bibliographic references';
        this.IMG_PNHLOGO = 'pnhlogo.png';
        this.APPS = 'Applications';
        this.TOPIC = 'subject';
        this.DB_QUERY = 'Database query (SPARQL)';
        this.EXAMPLE_QUERY = 'Example queries';
        this.SEM_REL = 'Concept relations';
        this.descriptions_H = 'Descriptions';
        this.scientificReferences_H = 'Scientific references';
        this.semanticRelations_H = 'Semantic relations';
        this.dataLinks_H = 'Downloads';
        this.visualization_H = 'Visualization';
        this.location_H = 'Location';
        this.creator_H = 'Provenance';
        this.TITLE_THES_2 = 'DISCLAIMER: This is a test site. No rights can be derived from this information';
        this.DESC_THESAURUS = '..bilingual in dutch and english as used in publications and datasets of the province <br>'+
        '..designed as a knowledge representation <br>..formatted as <a href="http://www.w3.org/2004/02/skos/" title="SKOS Simple Knowledge Organization System" target="_blank">SKOS</a> '+
        'concepts (terms, including synonyms), each with their own web addresses &#8594; '+
        '<a href="http://en.wikipedia.org/wiki/Uniform_Resource_Identifier" title="URI Uniform Resource Identifier" target="_blank">URIs</a><br>'+
        '..specified by polyhierarchical relationships as broader, narrower, and related concepts within the domain including descriptions';

        this.DESC_LINKEDDATA = {
            id: 'linkedData',
            image: 'linkedData.png',
            name: 'Linked Data',
            desc: 'formatted as SKOS concepts (terms, including synonyms), each with their own web addresses &#8594; <a href="http://en.wikipedia.org/wiki/Uniform_Resource_Identifier" title="URI Uniform Resource Identifier" target="_blank">URIs</a> - specified by polyhierarchical relationships as broader, narrower, and related concepts within the domain including descriptions and bibliographic references - as <a href="http://en.wikipedia.org/wiki/Linked_Open_Data" title="Linked Data" target="_blank">Linked Data</a> resource semantically linked to other web resources &#8594; <a href="http://dbpedia.org/" title="DBpedia Knowledge Base" target="_blank">DBpedia</a>, <a href="http://inspire.ec.europa.eu/registry/" title="INSPIRE Codes" target="_blank">INSPIRE</a>, <a href="http://resource.geosciml.org/" title="Resources for Geosciences XML" target="_blank">GeoSciML</a> - machine-readable published using web services (endpoints) according to the standards of <a href="http://www.w3.org/2013/data/" title="The World Wide Web Consortium" target="_blank">W3C</a> &#8594; <a href="http://www.w3.org/RDF/" title="Resource Description Framework (RDF)" target="_blank">RDF</a>, <a href="http://www.w3.org/TR/rdf-sparql-query/" title="SPARQL Query Language for RDF" target="_blank">SparQL</a> - to be used in Linked Data web applications such as hyperlinks for online texts or as encoding for geospatial data harmonizing data, DataViewer'
        };

        this.DESC_DISCLAIMER = '<h1>Disclaimer:</h1>The user of this site takes note and approves this disclaimer.<br><br>The application uses standards like HTML5/ES16/JQuery and is best viewed with Firefox, Chrome, Safari or Edge. MS InternetExplorer11 and older versions are not supported.';
    },
    // current langId
    ID: null
};
