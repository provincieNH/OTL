// search features
"use strict";
var search = {
    initProjects: function () {
        var a = [];
        var b = 0;
        var query = `PREFIX skos:<http://www.w3.org/2004/02/skos/core#> 
                                        SELECT ?s ?L 
                                        WHERE { 
                                        VALUES ?p {skos:prefLabel skos:altLabel} 
                                        ?s a skos:Concept; ?p ?L . FILTER(lang(?L)="${lang.ID}") 
                                        } ORDER BY STRLEN(STR(?L)) ?L`;

        vocab.LIST_THESAURUS_PROJECTS.forEach(function (project) {
            ws.projectJson(project.ep, query, jsonData => {
                a = [...a, ...jsonData.results.bindings];
                b += 1;

                if (b == vocab.LIST_THESAURUS_PROJECTS.length) {
                    const options = {
                        shouldSort: true,
                        tokenize: true,
                        keys: ['L.value']
                    };
                    window.fuse = new Fuse(a, options);
                }
            });
        });
    },

    __selectSearchLink: function (up, click) {
        var options = $(".searchLink");
        if (options.length == 0)
            return;
        for (var c = 0; c < options.length; c++) {
            if ($(options[c]).hasClass("selected"))
                break;
        }
        if (click) {
            return c >= options.length ? null : $(options[c]);
        }
        if (c >= options.length)
            c = -1;
        if (up)
            c = c < 1 ? options.length - 1 : c - 1;
        else
            c = c == -1 || c == options.length - 1 ? 0 : c + 1;
        options.removeClass("selected");
        if (c >= 0) {
            var o = $(options[c]);
            o.addClass("selected");
            var searchInput = $('#searchInput');
            searchInput.val(o.text());
        }
    },
    insertSearchCard: function (widgetID) {
        $('#searchInputLabel').html(lang.LABEL_SEARCH);
        $('#searchInput').attr('placeholder', lang.TIP_SEARCH);
        var searchInput = $('#searchInput');
        $('#searchInput').keydown(function (e) {
            switch (e.which) {
                case 13:
                    var item = search.__selectSearchLink(1, 1);
                    if (item) {
                        var url = item.attr("data_url");
                        document.location.href = url;
                        return;
                    }
                    page.openParaLink('search=' + encodeURI(searchInput.val()));
                    $('#dropdown').empty();
                    searchInput.val('');
                    break;
                case 38: // up
                    search.__selectSearchLink(1);
                    break;
                case 40: // down
                    search.__selectSearchLink(0);
                    break;
            }
        });

        $('#searchBtn').click(function (e) { //provide search results 
            page.openParaLink('search=' + encodeURI(searchInput.val()));
            $('#dropdown').empty();
            searchInput.val('');
        });

        searchInput.focusout(function () {
            $('#dropdown').delay(300).hide(0, function () {
                $('#dropdown').empty();
                searchInput.val('');
            });
        });

        let timer;
        searchInput.on('input', function () {
            clearTimeout(timer);
            $('#dropdown').empty();
            timer = setTimeout(function () {
                var searchVal = searchInput.val();
                if (searchVal.length > 0) {
                    $('#dropdown').show();
                    let autoSuggest = window.fuse.search(searchVal);
                    let c = [];
                    $.each(autoSuggest.slice(0, 10), function (index, value) {
                        c.push(value.L.value)
                    });
                    $.each(autoSuggest.slice(0, 10), function (index, value) {
                        let entry = value.L.value;
                        if (c.indexOf(entry) !== c.lastIndexOf(entry)) {
                            try{
                                entry = entry + ' <span class="addVoc">(' + lang[value.s.value.split('\/')[3] + 'Desc'].name + ')</span>';
                            }catch{
                                entry = entry ;
                            }
                        }
                        $('#dropdown').append('<tr><td class="searchLink" data_url="' + page.BASE + '?uri=' + value.s.value + '&lang=' + lang.ID + '" onclick="document.location.href=\'' + page.BASE + '?uri=' + value.s.value + '&lang=' + lang.ID + '\';">' + entry + '</td></tr>');
                    });
                }
            }, 200);
        });
    },

    sparqlEncode: function (str) {
        var hex, i;
        str = str.toLowerCase();
        var result = "";
        for (i = 0; i < str.length; i++) {
            hex = str.charCodeAt(i);
            if (hex < 32 || hex > 128)
                result += "\\u" + ("000" + hex.toString(16)).slice(-4);
            else
                result += str.charAt(i);
        }

        return result
    },
    insertSearch: function (searchText) {
        var gbaStatusStyle = ['bold', 'success', 'danger', 'primary'];
        var pageContent = $('#pageContent');
        pageContent.empty().append('<br><h3 id="title">' + lang.TITLE_SEARCHRESULTS + '</h3><p id="hits" class="lead">' + lang.HITS_SEARCHRESULTS +
            '\"' + searchText + '\"</p><hr><ul id="searchresults" class="searchresults"></ul>');
        $('#searchresults').bind("DOMSubtreeModified", function () {
            $('#hits').html(lang.HITS_SEARCHRESULTS.replace('0', $('#searchresults li').length) + '\"' + searchText + '\"');
        });

        let query = `PREFIX skos:<http://www.w3.org/2004/02/skos/core#> 
                                        SELECT DISTINCT ?s (MIN(?pL) AS ?title) (GROUP_CONCAT(DISTINCT ?label; separator = "$") as ?text) (MIN(?so) AS ?sort) 
                                        (MIN(?stat) AS ?Status) 
                                        WHERE {
                                        VALUES ?n {"${search.sparqlEncode(searchText)}"} 
                                        VALUES ?p {skos:prefLabel skos:altLabel skos:definition skos:scopeNote <http://purl.org/dc/terms/description>} 
                                        ?s a skos:Concept; ?p ?L . FILTER((lang(?L)="${lang.ID}")) . 
                                        BIND(CONCAT(STR(?p),"|",STR(?L)) AS ?label) . FILTER(regex(?L,?n,"i")) 
                                        ?s skos:prefLabel ?pL . FILTER((lang(?pL)="${lang.ID}")) 
                                        BIND(IF(?p=skos:prefLabel,1,2) AS ?so) 
                                        } 
                                        GROUP BY ?s 
                                        ORDER BY ?sort 
                                        LIMIT 100`;
        vocab.LIST_THESAURUS_PROJECTS.forEach(function (project) {

            ws.projectJson(project.ep, query, jsonData => {

                jsonData.results.bindings.forEach(function (a) {
                    if ($('#searchresults li').length > 199) {
                        return false;
                    } else if (a.title && a.s) {
                        $('#searchresults').append(`
                                            <li>
                                                <a href="${page.BASE}?uri=${a.s.value}&lang=${lang.ID}">
                                                    <strong>${a.title.value}</strong> (${project.name})
                                                </a>
                                                <br>
                                                <span class="searchPropTyp">URI: </span>
                                                <span class="searchResultURI text-${gbaStatusStyle[Number(a.Status.value)]}">
                                                    ${a.s.value}
                                                </span>
                                                <br>
                                                <p class="searchResultText">
                                                    ${search.createSearchResultsText(a.text.value, searchText)}
                                                </p>
                                            </li>`);
                        if ($('#searchresults li').length > 199) {
                            $('#hits').prepend('>');
                        }
                    }
                });

            }).catch(function (error) {
                console.log(error);
            });
        });
    },

    createSearchResultsText: function (sparqlText, searchText) {
        let searchText1 = searchText.toLowerCase();
        var regex1 = new RegExp(searchText1, "g");
        let searchText2 = searchText.charAt(0).toUpperCase() + searchText.slice(1);
        var regex2 = new RegExp(searchText2, "g");
        let resultText = '';

        for (let propPart of sparqlText.split('\$')) {
            resultText += propPart.split('|')[0].replace('http:\/\/www.w3.org\/2004\/02\/skos\/core#', '<span class="searchPropTyp">skos:').replace('http://purl.org/dc/terms/', '<span class="searchPropTyp">dcterms:') + '</span> - ';
            let textArr = propPart.split('|')[1].split('\. ');
            for (let i of textArr) {
                if (i.search(new RegExp(searchText, "i")) > -1) {
                    resultText += i.replace(regex1, '<strong>' + searchText1 + '</strong>').replace(regex2, '<strong>' + searchText2 + '</strong>') + ' .. ';
                }
            }
            resultText += '<br>';
        }
        return resultText;
    }
};
