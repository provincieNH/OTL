// webservices
"use strict";
var ws = {
    endpoints : {
        // 1 en 2 komen hier overeen met de ep: 1, 2 in vocabularies.js project settings
        // auth is het JWT voor de authenticatie tegen de triple store. token verloopt elke 30 dagen. via postman een nieuw token ophalen...
        1: {
            endpoint: 'https://52.208.100.233:7200/repositories/otl',
            auth: '',
            uri: 'otl.noord-holland.nl'
        },
        2: {
            endpoint: 'http://localhost:7200/repositories/concepten',
            auth: '',
            uri: 'ld.noord-holland.nl'
        }
        
    },
    json: function (uri, query, thenFunc) {
        let endpoint = ''
        let auth = ''
        for ( var i in this.endpoints){
            //console.log(i, uri)
            if (uri.includes(this.endpoints[i].uri))
            { 
                //console.log('in if statemtent')
                endpoint = this.endpoints[i].endpoint
                auth = this.endpoints[i].auth
                break;
            }
        }
        //console.log('conn: '+ endpoint, auth)
        return fetch(endpoint + '?query=' + encodeURIComponent(query) , {headers: {'Accept': 'application/sparql-results+json', 'Authorization': auth}})
            .then(res => res.json())
            .then(thenFunc)
            .catch(error => $('#pageContent').append(`<br>no results for <br>URI: <span style="color: red;"><strong>${uri}</strong></span> <br> ` + error));
    },
    projectJson: function (ep, query, thenFunc) {
        let endpoint = this.endpoints[ep].endpoint
        let auth = this.endpoints[ep].auth
        //console.log('endpoint: '+ endpoint)
        return fetch(endpoint + '?query=' + encodeURIComponent(query) , {headers: {'Accept': 'application/sparql-results+json', 'Authorization': auth}})
            .then(res => res.json())
            .then(thenFunc)
            .catch(error => {
                if (!$('#outOfService').length) {
                    $('#rightSidebar').append(`<div id="outOfService" class="alert alert-dismissible alert-primary">
                                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                <h4 class="alert-heading">Service downtime:</h4>
                                                    <p class="mb-0">
                                                        PNH Thesaurus is currently not available!
                                                    </p>
                                                </div>`);
                }
                console.log("projectJson error: "+error)
            });
    }
};
