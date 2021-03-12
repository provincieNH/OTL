var respecConfig = {
  // this template doesn't use all possible config parameters
  // see https://github.com/Logius-standaarden/respec/wiki for all options

  // specStatus currently supported
  // WW, GN-WV: Werkversie
  // CV, GN-CV: Consultatie versie
  // VV, GN-VV: Vastgestelde versie (of Versie ter vaststelling)
  // DEF, GN-DEF: Definitieve versie
  // EO: Einde ondersteuning, verouderde versie, vervangen door nieuwe versie
  // TG: Versie teruggetrokken
  // BASIS, GN-BASIS: 'geen status'
  specStatus: "BASIS",

  // SpecType currently supported
  // NO: "Norm"
  // ST: "Standaard"
  // IM: "Informatiemodel"
  // PR: "Praktijkrichtlijn"
  // HR: "Handreiking"
  // WA: "Werkafspraak"
  // AL: "Algemeen"
  // BD: "Beheerdocumentatie"
  // BP: "Best Practice"
  specType: "BD",

  // subtitle will be shown below title, can be omitted 
  // subtitle: "Hier komt een subtitle",

  // specify format: "markdown" when multiple markdown files are included 
  format: "markdown",                

  // The specification's "short name", which is the name used in NL_Respec URLs
  shortName: "OTL",

  // A YYYY-MM-DD date. The publication date of the present document. 
  // Als er geen publishDate is opgegeven, genereert ReSpec de dataum o.b.v. de laatste wijzigingen
  // Belangrijk: als publishDate niet opgegeven is, wordt bij de link "Laatst gepubliceerde versie" "geen" gezet. Anders wordt een link opgebouwd voor de laatste versie, met het formaat:
  publishDate: "2021-03-12",

  // A YYYY-MM-DD date. When there is a previous release of a given specification, (W3C)
  //previousPublishDate: "2021-03-12",

  // Zie https://github.com/w3c/respec/wiki/previousMaturity. Dit moet een
  // A YYYY-MM-DD date. When a previousPublishDate is specified, this is typically required as well in order to generate the "Previous Version"
  //previousMaturity: "WW",

  // Link naar vorige vastgestelde versie van het document. Gedocumenteerd op https://github.com/w3c/respec/wiki/prevRecURI
  //prevRecURI: "https://www.w3.org/TR/2014/example-20140327/",

  // license can be one of the following: cc0, cc-by or cc-by-nd((default)) (see https://github.com/Geonovum/respec/wiki/license )
  license: 'cc-by-nd',

  // Overrides the standard logo with one or more other logos. (see https://respec.org/docs/#logos)
  // Geef een lege array op als er geen <default> logo moet staan
  // logos: [], 

  //Adds a JSON-LD script element containing schema.org information, which can be useful for search engines.
  doJsonLd: true,

  // An array of person objects describing the editors of the document
  // this can be simple or more elaborated
  editors: [{
    name: "Niels Hoffmann",
    url: "https://www.noord-holland.nl",
    company: "Provincie Noord-Holland",
  }
  ],
  // An array of person objects describing the authors of the document
  // this can be simple or more elaborated
  authors: [{
    name: "Niels Hoffmann",
    url: "https://www.noord-holland.nl",
    mailto: "",
  }
  ],
  // The github option allows you associate your specification with a repository on GitHub.
  github: "https://github.com/provincieNH/OTL",

  // The URL of your test suite, gets included in the specification's headers.
  // testSuiteURI: "https://portaal.digikoppeling.nl/CV/home.html",

  // With long algorithms in a specification, it can be useful to allow readers to click on variables marked up with <var> (e.g., Let <var>elem</var> be ...).
  // highlightVars: true,

  // Controls if linked "§" section markers are added to a document
  // addSectionLinks: true,

  // Lints for accessibility issues using axe-core
  a11y: false,

  // A number indicating the maximum depth of the table of contents. Defaults to 0 which includes all levels.
  maxTocLevel: 3,

  // Shows links to alternate formats (such as PDF, ePub) in the document header.
  // alternateFormats: [{
  //     label: "html",
  //     uri: "https://publicatie.centrumvoorstandaarden.nl/api/oauth/static.html",
  //   },
  //   {
  //     label: "pdf",
  //     uri: "https://publicatie.centrumvoorstandaarden.nl/api/oauth/static.pdf",
  //   },
  // ],

  // You can use markdown to write ReSpec based documents.
  // format: "markdown",
  // <section data-format="markdown" data-include="<filename>.md"></section>

  // The specification's publish domain, which is used to publish the specification
  // the url in the header thisVersion is generated like `<conf.nl_organisationPublishURL>/<conf.pubDomain>/<specStatus>-<specType.toLowerCase()>-<conf.shortName>}-conf.publishDate>/`
  //pubDomain: "disgeo",

  // Based on the example settings Respec will generate the following links in the header:
  // https://publicatie.centrumvoorstandaarden.nl/dk/ebms/
  // https://{nl_organisationPublishURL}/{pubDomain}/{pubSubDomain}/
  // pubSubDomain: "ebms",

  // this parameter will add the tag_name of the latest release to the document Title
  // only set this parameter when a release has been set
  nl_addReleaseTagTitle: false,

  // For Consultatieversies (specStatus="GN-CV") there is a default text in the section "Status of this document" that contains an emailaddress for feedback and comments on the document.
  //nl_emailComments: "consultatie@geonovum.nl",

  // if you use a single document for your spec, which uses more than one markdown H1 header, e.g. '# inleiding'
  // this configuration can be set to make sure that the alle H1 headers and navigation bars are preserved
  nl_markdownSplitH1sections: true,

  // in some cases the Repository of a Specification document and the Issue- and PR bases are split
  // this scan be configured below
  // if not set, the url's will be generated on the respecConfig.github automatically  
  nl_github: {
    // issueBase: "https://github.com/Geonovum/TstRespec/issues",
    // revision: "https://github.com/Geonovum/TstRespec/commits",
    // pullrequests: "https://github.com//Geonovum/TstRespec/pulls"
  },

  // nl_organisationName is used for some company specific values in the header (and Sotd)
  // currently supported: Logius and Geonovum (default)  
  nl_organisationName: "Noord-Holland",

  // prefix for the names of company specific css, svg and ico prefixes
  // defaults to "GN-"  
  nl_organisationPrefix: "GN-",

  // class style can be automatically insertd in generated markdown tables
  // currently defaults to simple, but this may change
  // options 'simple', 'data', the style css in this template uses 'dkkvs'
  nl_markdownTableClass: "simple",

  // if nl_markdownEmbedImageInFigure is set to true images in markdown generated content will be surrounded with <figures> element
  // so that figures can be linked are be a part of table of figures
  nl_markdownEmbedImageInFigure: true,

  // this url points to the folder where organsation specific css files are stored
  // defaults to https://tools.geostandaarden.nl/respec/style/ if not set
  // nl_organisationStylesURL: "https://publicatie.centrumvoorstandaarden.nl/respec/style/",
  //nl_organisationStylesURL: "https://tools.geostandaarden.nl/respec/style/",
  nl_organisationStylesURL: "media/",

  // nl_organisationPublishURL points to organisation specific publication page, used in header
  // defaults to  https://docs.geostandaarden.nl/"
  nl_organisationPublishURL: "https://provincienh.github.io/",

  // nl_logo refers to company logo
  // defaults to https://tools.geostandaarden.nl/respec/style/logos/Geonovum.svg
  nl_logo: {
    //  src: "https://tools.geostandaarden.nl/respec/style/logos/OmgevingswetLogo.svg",
    src: "https://noord-holland.mediafiler.net/nh/img/nh.png",
    alt: "Provincie Noord-Holland",
    id: "logo",
    height: 66,
    width: 341,
    //url: "https://www.geobasisregistraties.nl/basisregistraties/doorontwikkeling-in-samenhang"
  },

  // If you need to include a one-off reference that isn't in the SpecRef database or 
  // if you need to override an existing reference with specific content, then you can use this configuration option.
  localBiblio: {
    ONTOLOGY: {
          id: "ontology",
          title: "Ontology (information science)",
          href: "https://en.wikipedia.org/wiki/Ontology_(information_science)",
          publisher: "Wikipedia",
          date: "2019-02-22"
    },
    NEN3610: {
        id: "NEN 3610:2011 nl",
        title: "NEN 3610:2011 nl - Basismodel geo-informatie - Termen, definities, relaties en algemene regels voor de uitwisseling van informatie over aan de aarde gerelateerde ruimtelijke objecten",
        href: "https://www.nen.nl/NEN-Shop/Norm/NEN-36102011-nl.htm",
        status: "Definitief",
        publisher: "NEN",
        date: "2011-03-01"
    },
    IMGeo: {
        title: "Informatie Model geografie",
        href: "https://imgeo.geostandaarden.nl/",
        status: "Definitief",
        publisher: "Geonovum",
        date: "juli 2013"
    },
    Assetmanagement: {
        title: "Wat is assetmanagement",
        href: "https://www.iampro-portaal.nl/Assetmanagement-kennis/Wat-is-assetmanagement",
        publisher: "iAMPro",
        date: "2020"
    },
    NTA8035: {
        id: "NTA 8035:2020 nl",
        title: "Semantische gegevensmodellering in de gebouwde omgeving ",
        href: "https://www.nen.nl/NEN-Shop/Norm/NTA-80352020-nl.htm",
        status: "Definitief",
        publisher: "NEN",
        date: "01-04-2020"
    },
    TMLO: {
        title: "Toepassingsprofiel metadatering lokale overheden (TMLO), versie 1.1.",
        href: "https://www.nationaalarchief.nl/archiveren/kennisbank/tmlo",
        status: "Definitief",
        date: "14-4-2014"
    },
    IMBOR_LD: {
        title: "IMBOR (in Linked data-formaat)",
        href: "https://stichting-crow.github.io/imbor/",
        date: "16-6-2020"
    },
    
}
};
