## De BGT-LD uitleg die ik had willen hebben...

Naar aanleiding van de lancering van de BGT als Linked data wilde ik kijken of ik er wat moois mee kon. Bijvoorbeeld de demo's die we in eerdere HIGH5's 
gemaakt hebben op prototypes van de BGT 'upgraden' naar het nieuwe endpoint.

Dat bleek nog niet zo makkelijk omdat er wel een aantal ontwerpbeslissingen genomen zijn (die weliswaar erg terecht zijn) die niet direct duidelijk waren voor mij...

### BGT/IMGeo en NEN3610

Vanuit de BGT/IMGeo zijn we gewend om eigenlijk alleen naar de BGT/IMGeo objecttypen te kijken.

In de opgestelde ontologie is het NEN3610 topmodel ook opgenomen. Dit maakt het plaatje natuurlijk completer, maar betekend ook dat bijvoorbeeld een bgt:BegroeidTerreindeel nu ook gemapt is aan nen3610:Terrein.

### Strikte scheiding tussen de registratie en de definities

Ik was in eerste instantie op zoek naar instances van het type Wegdeel, en die kon ik niet vinden... Dat komt omdat Wegdeel de definitie van 'het ding buiten in de werkelijkheid' is en WegdeelRegistratie het 'ding in de registratie'. Eigenlijk best logisch. 

### Onderscheid tussen de registratie van het object, de nen3610 identificatie en de 'metadata' van het object

Er is dus een WegdeelRegistratie met prefix 'registratie' <https://bgt.basisregistraties.overheid.nl/bgt/id/registratie/>
een nen3610 identificatie met de prefix 'identificatie' <https://bgt.basisregistraties.overheid.nl/bgt/id/identificatie/>
en een metadata object met de prefix 'object' <https://bgt.basisregistraties.overheid.nl/bgt/id/object/>
het model heeft de prefix 'bgt' <https://bgt.basisregistraties.overheid.nl/bgt/def/> 

### alle mutaties aan de registratieobjecten zijn opgenomen in de graph

In de registratieobject zijn alle mutaties aan het object opgenomen, deze hebben een unieke URI gekregen op basis van het NEN3610 ID plus de timestamp van de objectbegintijd.
Objectbegintijd en objecteindtijd zijn gemapt op prov:generatedAtTime en prov:invalidatedAtTime
Om het huidige object te vinden moet je dus filteren op het object dat geen prov:invalidatedAtTime heeft:
```filter not exists {?reg prov:invalidatedAtTime [] .}```

### Geometrie is in RD opgenomen in het bgt attribuut bgt:geometrie met als serialisatie WKT

Ik wilde al aan de slag met de standaard Geosparql hasGeometry/asWKT constructie, maar dat werkt dus anders.
En even opletten dat de meeste online tools WGS84 verwachten, dus niet vegreten je geometrie te transformeren van RD -> WGS84
```bind(bif:ST_Transform(?geomRD, 4326) as ?geomWGS)```

