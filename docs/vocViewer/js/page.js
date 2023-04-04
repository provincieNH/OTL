// page building&handling
"use strict";
var page = {
    BASE: location.protocol + '//' + location.host + location.pathname,
    urlParams: new URLSearchParams(window.location.search),
    isEmbedded: false,
    hideOnEmbed: ["#search_widget", "#navbarToggler", "#navbarResponsive", "#proj_desc", "#other_desc", "#pageFooter", "#navBar"],
    uriParameter: null,

    // called on page loaded
    init: function () {
        var USER_LANG = (navigator.language || navigator.language).substring(0, 2);
        $('#appsCard').toggle();
        if (this.urlParams.has('lang')) {
            USER_LANG = this.urlParams.get('lang');
        }

        if (USER_LANG !== 'nl') {
            USER_LANG = 'en';
            $('#lang').text('EN');
        } else {
            $('#lang').text('NL');
        }
        lang.load(USER_LANG);

        this.setNavbarFooter();
        search.insertSearchCard(); //inserts search widget only

        var urlParams = this.urlParams;
        if (urlParams.has('search')) { //need lang parameter only for sparql requests
            search.insertSearch(decodeURI(urlParams.get('search')));
            this.insertProjCards(); //quick access cards, plus extended project comments from sparql
        } else if (urlParams.has('info')) {
            this.insertInfo(decodeURI(urlParams.get('info')));
            this.insertProjCards(); //quick access cards, plus extended project comments from sparql
        } else if (urlParams.has('list')) {
            $('#pageContent').empty();
            let uri = '§';
            let label = '§';
            if (urlParams.has('uri')) {
                uri = decodeURI(urlParams.get('uri').replace(/["';><]/gi, '')); //avoid injection
                this.uriParameter = uri;
                label = decodeURI(urlParams.get('list').replace(/["';><]/gi, '')); //avoid injection
            }
            this.insertProjCards(); //quick access cards, plus extended project comments from sparql
        } else if (urlParams.has('uri')) {
            let uri = decodeURI(urlParams.get('uri').replace(/["';><]/gi, '')); //avoid injection
            this.uriParameter = uri;
            $('#pageContent').empty();
            this.initApps(uri);
            detail.details(uri);
            //var project = lang[uri.split('\/')[3] + 'Desc'];
            //var project = uri.split("/")[uri.split("/").length-1] + 'Desc';
            //console.log('project: '+project)
            //this.insertSideCard_projectInfo(project);
            
        } else {
            this.insertPageDesc(); //general intro
            this.insertComments('proj_desc', vocab.LIST_THESAURUS_PROJECTS); //project desc from js ,insert before ProjCards!
            this.insertComments('other_desc', [lang.DESC_LINKEDDATA]);
            this.insertProjCards(); //quick access cards, plus extended project comments from sparql
        }
        search.initProjects();
        document.documentElement.setAttribute('lang', USER_LANG);

        this.isEmbedded = urlParams.has('embedded');
        if (this.isEmbedded || ((screen.width < 1000) && (window.location.search == null || window.location.search == "" || urlParams.has('search')))) {
            var r = $("#rightSidebar");
            r.detach();
            if (!this.isEmbedded)
                r.prependTo("#contentRow1");
            r.removeClass("col-lg-4");
            r.addClass("col-lg-8");
            $("#appsCard").css('visibility', 'collapse');
            $("#proj_links").css('display', 'none');
            if (!this.isEmbedded)
                $("#search_widget").css('visibility', 'inherit');
            else {
                page.hideOnEmbed.forEach(function (s) {
                    $(s).css('visibility', 'collapse');
                });
                $("a:not([target])").attr("target", "_blank");
            }
        }
    },
    setLang: function (lang) {
        if (location.href.indexOf('lang=') != -1) {
            if (lang == 'nl') {
                location.replace(location.href.replace('lang=en', 'lang=nl'));
            } else {
                location.replace(location.href.replace('lang=nl', 'lang=en'));
            }
        } else if (location.href.indexOf('?') != -1) {
            location.replace(location.href + ('&lang=') + lang);
        } else {
            location.replace(location.href + '?lang=' + lang);
        }
        //console.log(location.href);
    },


    openParaLink: function (queryString) { //zB 'info=disclaimer'
        window.open(this.BASE + '?' + queryString + '&lang=' + lang.ID, '_self', '', 'false');
    },
    toggleRead: function (divBtn, divTxt, text) {
        let txt = $('#' + divTxt).is(':visible') ? '<span class="fa fa-caret-down"></span> <em>' + text + ' ..</em>' : '<span class="fa fa-caret-up"></span> <em>' + text + ' ..</em>';
        $('#' + divBtn).html(txt);
        $('#' + divTxt).slideToggle();
    },

    openFeedBack: function () {
        let email = '';
        let subject = 'vocViewer';
        let body = '';
        if ($('#uri').length > 0) {
            body = 'URI: ' + $('#uri').text();
        }
        if ($('.altLabel').length > 0) {
            subject = $('.altLabel').html().replace(/<span class="lang">/g, '[').replace(/<\/span>/g, '] ').replace(/<li>/g, '').replace(/<\/li>/g, '').replace(/  /g, '');
        }
        let mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
        window.location.href = mailto_link;
    },

    insertSideCard_projectInfo: function (project) {
        if (project) {
            $('#proj_links').append(`<div class="card border-info mb-3">
                                <h4 class="card-header">${project.name} (${lang.TOPIC})</h4>
                                <div id="${project.id}Card" class="card-body">${project.desc}</div>
                            </div>`);
        }
    },

    insertInfo: function (topic) {
        var div = $('#page_desc');
        div.empty().append('<br>' + lang['DESC_' + topic.toUpperCase()]);
    },

    setNavbarFooter: function () {
        $('#LABEL_CONTACT').html(lang.LABEL_CONTACT);
        $('#contact').html(lang.LABEL_CONTACT);
        $('#license').html(lang.LABEL_LICENSE);
        $('#disclaimer').html(lang.LABEL_DISCLAIMER);
        $('#IMG_PNHLOGO').attr('src', 'img/' + lang.IMG_PNHLOGO);
    },

    insertProjCards: function () {
        var div = $('#proj_links');
        //depending of type of vocabulary, do different initial queries...    
        vocab.LIST_THESAURUS_PROJECTS.forEach(function (project) {
            if (project.type == 'waardenlijst'){
                var query = `
                    PREFIX dcterms:<http://purl.org/dc/terms/> 
                    PREFIX skos:<http://www.w3.org/2004/02/skos/core#> 
                    PREFIX owl: <http://www.w3.org/2002/07/owl#>
                    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    SELECT  ?cL (COALESCE(?cD, "") AS ?desc) (COUNT(?c) AS ?count) (GROUP_CONCAT(DISTINCT ?L; separator = "|") as ?topConcepts) 
                    WHERE { 
                    ?c a owl:Class; rdfs:label ?cL .
                    FILTER(lang(?cL)="nl-nl") . 
                    FILTER(?c = <http://otl.noord-holland.nl/def/areaaldata/waardenlijst/PNH_Waardenlijsten>) .
                    ?tc rdfs:subClassOf ?c . ?tc rdfs:label ?tcL . FILTER(lang(?tcL)="nl-nl") .  
                    BIND(CONCAT(STR(?tc),"$",STR(?tcL)) AS ?L) 
                    } 
                    GROUP BY ?cL ?cD ORDER BY ?cL`;
            }else {
                var query = `
                        PREFIX dcterms:<http://purl.org/dc/terms/> 
                        PREFIX skos:<http://www.w3.org/2004/02/skos/core#> 
                        SELECT ?cL (COALESCE(?cD, "") AS ?desc) (COUNT(?n) AS ?count) (GROUP_CONCAT(DISTINCT ?L; separator = "|") as ?topConcepts) 
                        WHERE { 
                        ?c a skos:ConceptScheme; skos:prefLabel ?cL
                        . FILTER(lang(?cL)="${lang.ID}") . 
                        #FILTER(?c = <${project.cs}>) .
                        ?tc skos:topConceptOf ?c . ?tc skos:prefLabel ?tcL . FILTER(lang(?tcL)="${lang.ID}") . 
                        ?tc skos:narrower* ?n 
                        BIND(CONCAT(STR(?tc),"$",STR(?tcL)) AS ?L) 
                        OPTIONAL {?c dcterms:description ?cD . FILTER(lang(?cD)="${lang.ID}")} 
                        } 
                        GROUP BY ?cL ?cD ORDER BY ?cL`;
            }
            ws.projectJson(project.ep, query, jsonData => {
                div.append('<div class="card my-4"><h4 class="card-header">' + project.name +
                    '</h4><div id="' + project.id + 'Card" class="card-body"></div></div>');

                //work around for HTML5 details and summary tags
                $('#' + project.id + 'Comment').append(`
                            <br>
                            <div style="cursor: pointer;" id="${project.id}rmBtn"
                            onclick="javascript: page.toggleRead(\'${project.id}rmBtn\', \'${project.id}ReadMore\', \'read more\');"
                            class="text-muted">
                                <span class="fa fa-caret-down"></span> <em>read more ..</em>
                            </div>
                            <div style="display:none;" id="${project.id}ReadMore">
                                <br>
                            </div>`);

                jsonData.results.bindings.forEach(function (a) {
                    //console.log(a.topConcepts.value);
                    $('#' + project.id + 'Card').append(a.cL.value + ':<br><a href="' + page.BASE + '?uri=' +
                        a.topConcepts.value.split('$').join('&lang=' + lang.ID + '">').split('|').join('</a>, <a href="' + page.BASE + '?uri=') + '</a><br>');
                    //add concept schemes + topConcepts to project descriptions
                    $('#' + project.id + 'ReadMore').append('<h4>' + a.cL.value + ' (' + a.count.value +
                        '):</h4><a href="' + page.BASE + '?uri=' + a.topConcepts.value.split('$').join('&lang=' + lang.ID + '">').split('|').join('</a>, <a href="' +
                            page.BASE + '?uri=') + '</a><br>' + a.desc.value + '<br><br>');
                });

            });
        });
    },

    insertComments: function (divID, projects) {
        var div = $('#' + divID);
        div.empty();
        projects.forEach(function (desc) {
            div.append(`
                                                <div class="media mb-4">
                                                    <img alt="${desc.name}" class="d-flex mr-3 rounded-circle" src="img/${desc.image}">
                                                    <div id="${desc.id}Comment" class="media-body">
                                                        <h4 class="mt-0">${desc.name}</h4>
                                                        ${desc.desc}
                                                    </div>
                                                </div>`);
        });
    },

    insertPageDesc: function () {
        $('#page_desc').append('<br><h3 id="title">Provincie Thesaurus</h3>')
            .append('<h3>' + lang.TITLE_THES_2 + '</h3>')
            .append('<p>' + lang.DESC_THESAURUS + '</p>');
    },

    initApps: function (uri) {
        $('#appsCard').toggle();
        $('#appsCard .card-header').text(lang.APPS);
        $('#appsBody1').append(`
                                        <div class="apps">
                                            <span >
                                                <svg version="1.1" id="cluster" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="28px" height="28px" viewBox="0 0 88 88">
                                                    <path fill="#0099cc" d="M25.243,68.226c-7.779-0.162-10.824,1.418-12.514,6.269
                                                    c-1.298,3.725-0.073,7.843,3.052,10.26c3.124,2.417,8.021,2.507,11.218,0.207c3.956-2.846,4.598-6.665,2.281-13.977
                                                    c2.695-3.676,5.439-7.419,7.67-10.462c4.344-0.346,7.912-0.63,10.76-0.856c2.77,2.229,5.328,4.29,7.639,6.15
                                                    c-3.086,9.265-1.674,15.109,4.174,18.846c5.004,3.198,11.908,2.506,16.154-1.619c4.309-4.186,5.209-10.888,2.154-16.039
                                                    c-3.627-6.117-9.424-7.57-18.604-4.8c-2.486-2.344-4.881-4.601-6.598-6.221c0-4.854,0-8.901,0-13.041
                                                    c3.43-3.57,7.107-7.399,10.752-11.193c9.363,4.032,16.313,2.72,21.049-3.901c4.033-5.643,3.449-13.757-1.357-18.86
                                                    C78.143,3.751,69.836,2.801,63.859,6.79c-6.689,4.463-8.117,11.536-4.303,21.188c-3.783,3.745-7.553,7.479-11.523,11.411
                                                    c-1.955-0.574-4.135-1.213-6.449-1.892c-1.358-5.275-2.673-10.38-3.913-15.195c4.617-5.517,5.502-9.582,3.164-13.413
                                                    c-2.165-3.548-6.295-5.263-10.355-4.3c-3.828,0.907-6.542,4.212-6.772,8.244c-0.319,5.573,1.616,7.891,9.164,10.797
                                                    c1.332,4.98,2.699,10.095,4.098,15.327c-1.748,1.625-3.408,3.168-5.104,4.745c-4.015-1.192-7.824-2.323-11.454-3.4
                                                    c-2.861-7.399-5.794-10.033-10.653-9.752c-4.045,0.234-7.7,3.273-8.632,7.178c-0.886,3.712,0.814,7.84,4.115,9.989
                                                    c4.029,2.622,7.786,1.88,13.602-2.779c3.861,1.141,7.828,2.312,11.364,3.354c1.129,3.27,2.087,6.046,3.097,8.969
                                                    C30.682,60.825,28.026,64.438,25.243,68.226z"/>
                                                </svg>
                                            </span>
                                            <a href="network.html?uri=${uri}&lang=${lang.ID}" title="visual network" class="card-link">
                                                <br>Network<br>diagram
                                            </a>
                                        </div>`);
    }
};
