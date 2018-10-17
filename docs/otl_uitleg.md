# OTL Provincie Noord-Holland, uitleg met voorbeelden

De term OTL staat voor Object Type Library, een Objecttype Bibliotheek.

Een OTL is een conceptueel informatiemodel waarin concepttypes en hun onderlinge relaties beschreven staan. De OTL wordt omschreven als: Een digitale beschrijving van generieke, herbruikbare concepten (typen of soorten), die betrekking hebben op : 
* Fysieke gebouwde (verbouwde, aangepaste) objecten in de wereld om ons heen (onze omgeving). 
* De gebruiksruimten en –gebieden, die door deze objecten worden gerealiseerd. 
* Gedurende de hele levenscyclus (concept, ontwerp, realisatie, gebruik, onderhoud, sloop). 
* Focus: as required (ontwerp, realisatie), as built (gebruik, onderhoud).

Uitwisselen van digitale informatie met marktpartijen is alleen mogelijk als iedereen dezelfde taal spreekt. De ontwikkeling en het gebruik van de OTL draagt eraan bij dat ketenpartners over de hele levenscyclus van een bouwwerk dezelfde taal spreken. De OTL is gebouwd met Linked Data.

Linked data kan zowel in de bedrijfscontext gebruikt worden als in Open Data vorm. Zowel een aantal BIM standaarden zoals COINS en CB-NL als het Digitaal Stelsel Omgevingswet is gebaseerd op Linked Data technologie.

Een goede intro over Linked Data is in deze presentatie te vinden: [http://www.pilod.nl/w/images/7/78/20160627_GE_Hoekstra_LD_Introductie.pdf](http://www.pilod.nl/w/images/7/78/20160627_GE_Hoekstra_LD_Introductie.pdf)

Voor meer informatie over het betekenisvol verbinden van informatie is de volgende link erg waardevol: [http://bp4mc2.org/](http://bp4mc2.org/)

Onderstaand voorbeeldje illustreert mooi waarom die eenduidige modellering zo belangrijk is:
![eenduidige modellering van begrippen](http://bp4mc2.org/image393.png)

In de context van het provinciale areaal is onderstaand voorbeeld illustratief:
![welke Weg?](https://github.com/provincieNH/OTL/raw/master/docs/wegConcepten.jpg "welke weg?")

Voor elk van deze begrippen is er dus een afzonderlijke plek in de structuur van de overkoepelende OTL. 
Afhankelijk van de 'view' die je hebt op de OTL zie je misschien maar een deel van de gehele structuur. Dus in bijvoorbeeld Areaaldata bestaat het objecttype Wegdeel. Dit past het beste bij de context van de fysieke weg.

De verbinding tussen deze verschillende concepten kan gelegd worden via een 'wordtGerealiseerdDoor' of een 'bestaatUit' relatie. Dus het ruimtelijke concept weg wordt gerealiseerd door (o.a.) de fysieke weg. En andersom realiseert een wegdeel een wegvak.
<img src="https://github.com/provincieNH/OTL/raw/master/docs/wegdeel-wegvak.jpg" width="1200">
