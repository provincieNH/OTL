# OTL Provincie Noord-Holland, uitleg van shacl implementatie

[SHACL](https://www.w3.org/TR/shacl/) kan gebruikt worden om RDF Graphs te valideren. Daar waar OWL restrictions bedoelt zijn om extra kennis af te leiden (inferencing)
is SHACL onder ander bedoelt om data te toetsen.

De Areaaldata OTL is uitgebreid met een SHACL graph die de constraints uitdrukt die ook in de .MD files zijn opgenomen.
De volgende constructies zijn daarbij gebruikt:
* sh:maxCount om af te dwingen dat er niet meerdere attribuutwaarden worden opgenomen
* sh:minCount om af te dwingen dat een attribuut ingevuld MOET worden (daar waar Nullable: False staat in de .md's)
* sh:class naar een adwl: klasse om het gebruik van een domeinwaarde voor te schrijven
* sh:datatype om het datatype voor te schrijven
* sh:class naar een sf: klasse om het geometrietype voor te schrijven 


Het is goed om op te bedenken dat dit de constraints zijn die vanuit technisch oogpunt aan het datamodel gesteld worden. In de aanvullende Informatie Levering Specificatie eisen
wordt per datalevering nader afgestemd welke attributen er gevuld moeten worden.

####Voorbeeld

Hieronder volgt een beperkt voorbeeld hoe een bak_p is gemodelleerd (uitgeschreven in turtle formaat)
 
Areaaldata klasse definitie:
```
ad:bak_p
  a owl:Class ;
  ad:herkomstDefinitie "PNH" ;
  ad:isBGT_Object "Nee" ;
  ad:positioneleNauwkeurigheid "15 cm" ;
  rdfs:label "bak_p" ;
  rdfs:subClassOf geo:Feature ;
  rdfs:subClassOf [
      a owl:Restriction ;
      owl:onClass sf:Point ;
      owl:onProperty geo:hasGeometry ;
      owl:qualifiedCardinality "1"^^xsd:nonNegativeInteger ;
    ] ;
  skos:definition "Object met een permanent karakter dat dient om iets in op te bergen of te verzamelen." ;
.
``` 
Areaaldata eigenschappen en domeinwaarden definitie:    
```
adprop:AD_ID
  a owl:DatatypeProperty ;
  a owl:FunctionalProperty ;
  rdfs:domain ad:bak_p ;
  rdfs:label "AD_ID" ;
  rdfs:range xsd:string ;
  skos:definition "PNH" ;
.
adprop:TYPESPEC_typeSpecBAK
  a owl:FunctionalProperty ;
  a owl:ObjectProperty ;
  rdfs:domain ad:bak_p ;
  rdfs:label "TYPESPEC" ;
  rdfs:range adwl:typeSpecBAK ;
  skos:definition "PNH" ;
.
adwl:typeSpecBAK
  a owl:Class ;
  rdfs:label "typeSpecBAK" ;
.
adwl:typeSpecBAK_Afvalbak
  a adwl:typeSpecBAK ;
  rdfs:label "typeSpecBAK, code: Afvalbak, omschrijving: Afvalbak" ;
.
adwl:typeSpecBAK_Zandkist
  a adwl:typeSpecBAK ;
  rdfs:label "typeSpecBAK, code: Zandkist, omschrijving: Zandkist" ;
.
```
SHACL constraints:
```
ad:bak_pShape
  a sh:NodeShape ;
  sh:targetClass ad:bak_p ;
  sh:property ad:bak_p-AD_ID ;
  sh:property ad:bak_p-TYPESPEC_typeSpecBAK ;
  sh:property ad:bak_p-hasGeometry ;
.
ad:bak_p-AD_ID
  a sh:PropertyShape ;
  sh:path adprop:AD_ID ;
  sh:datatype xsd:string ;
  sh:maxCount "1"^^xsd:integer ;
  sh:minCount "1"^^xsd:integer ;
.
ad:bak_p-TYPESPEC_typeSpecBAK
  a sh:PropertyShape ;
  sh:path adprop:TYPESPEC_typeSpecBAK ;
  sh:class adwl:typeSpecBAK ;
  sh:maxCount "1"^^xsd:integer ;
  sh:minCount "1"^^xsd:integer ;
.
ad:bak_p-hasGeometry
  a sh:PropertyShape ;
  sh:path geo:hasGeometry ;
  sh:QualifiedMaxCount "1"^^xsd:integer ;
  sh:QualifiedMixCount "1"^^xsd:integer ;
  sh:class sf:Point ;
.
```
Instantie data:
```turtle
data:AD.03B5C43714F04B2DBD4FF418AAB39A2B_fcl
  a ad:bak_p ;
  adprop:AD_ID "AD.03B5C43714F04B2DBD4FF418AAB39A2B" ;
  adprop:BGTPLUSTYPE_typeBAK adwl:typeBAK_niet-bgtafvalbak ;
  geo:hasGeometry data:AD.03B5C43714F04B2DBD4FF418AAB39A2B_Point ;
  rdfs:label "AD.03B5C43714F04B2DBD4FF418AAB39A2B_fcl" ;
.

data:AD.03B5C43714F04B2DBD4FF418AAB39A2B_Point
  a sf:Point ;
  geo:asWKT "POINT Z (114756.96900000051 517876.65399999917 0)" ;
  rdfs:label "AD.03B5C43714F04B2DBD4FF418AAB39A2B_Point" ;
.
```
shacl validatie graph:
```
[] a sh:ValidationReport ;
    sh:conforms false ;
    sh:result [ a sh:ValidationResult ;
            sh:focusNode <http://projx.noord-holland.nl/data/AD.03B5C43714F04B2DBD4FF418AAB39A2B_fcl> ;
            sh:resultPath adprop:TYPESPEC_typeSpecBAK ;
            sh:resultSeverity sh:Violation ;
            sh:sourceConstraintComponent sh:MinCountConstraintComponent ;
            sh:sourceShape ad:bak_p-TYPESPEC_typeSpecBAK ] .
```
De data in niet valide omdat er een typespec_bak verplicht is, maar deze niet voorkomt in de data.
Er is ook nog de mogelijkheid om strictere validatie af te dwingen met sh:closed true ;

shacl validatie graph het closed true:
```
[] a sh:ValidationReport ;
    sh:conforms false ;
    sh:result [ a sh:ValidationResult ;
            sh:focusNode <http://projx.noord-holland.nl/data/AD.03B5C43714F04B2DBD4FF418AAB39A2B_fcl> ;
            sh:resultPath adprop:BGTPLUSTYPE_typeBAK ;
            sh:resultSeverity sh:Violation ;
            sh:sourceConstraintComponent sh:ClosedConstraintComponent ;
            sh:sourceShape ad:bak_pShape ;
            sh:value adwl:typeBAK_niet-bgtafvalbak ],
        [ a sh:ValidationResult ;
            sh:focusNode <http://projx.noord-holland.nl/data/AD.03B5C43714F04B2DBD4FF418AAB39A2B_fcl> ;
            sh:resultPath rdf:type ;
            sh:resultSeverity sh:Violation ;
            sh:sourceConstraintComponent sh:ClosedConstraintComponent ;
            sh:sourceShape ad:bak_pShape ;
            sh:value ad:bak_p ],
        [ a sh:ValidationResult ;
            sh:focusNode <http://projx.noord-holland.nl/data/AD.03B5C43714F04B2DBD4FF418AAB39A2B_fcl> ;
            sh:resultPath adprop:TYPESPEC_typeSpecBAK ;
            sh:resultSeverity sh:Violation ;
            sh:sourceConstraintComponent sh:MinCountConstraintComponent ;
            sh:sourceShape ad:bak_p-TYPESPEC_typeSpecBAK ],
        [ a sh:ValidationResult ;
            sh:focusNode <http://projx.noord-holland.nl/data/AD.03B5C43714F04B2DBD4FF418AAB39A2B_fcl> ;
            sh:resultPath rdfs:label ;
            sh:resultSeverity sh:Violation ;
            sh:sourceConstraintComponent sh:ClosedConstraintComponent ;
            sh:sourceShape ad:bak_pShape ;
            sh:value "AD.03B5C43714F04B2DBD4FF418AAB39A2B_fcl" ] .
```
In dit geval worden ook het BGTPLUSTYPE, Label en type declaratie fout gerekend omdat deze niet in de shape zijn gedefinieerd.

Al deze code is gegenereerd met python met behulp van rdflib en pyshacl. 