# OTL structuur Provincie Noord-Holland

De OTL is in eerste instantie in puur RDF/OWL opgebouwd:
* de map OTB bevat de objecttypeboom zoals deze in vraagspecificaties wordt gebruikt. 
	**Deze is gemapt naar CBNL met rdfs:subclassOf** Onderlinge relaties zijn gedefinieerd met pnh_otb:partOf

	update juli 2018: de OTB-CB-NL mapping is bijgewerkt naar de nieuwe (betekenisloze) uri's van CB-NL

* de map areaaldata bevat een rdf/owl file van het areaaldatamodel wat ook beschreven staat op: https://github.com/provincieNH/ILS/

	update juli 2018: er is een map 4.1 bijgekomen waar het Areaaldata 4.1 datamodel in staat

* de map OTL bevat de mapping van de bovenstaande ontologies op elkaar door middel van owl:equivalentClass met restricties op eigenschappen

	update juli 2018: de OTL bevat ook een begin van de mapping naar IMBOR

* de map SE bevat een subset van het SE uitwisselingsmodel. Dit is nog een zeer experimentele ontologie. De kans is groot dat deze nog gaat wijzigen.

In de map COINS staat de COINS 2.0 compatible library van het Areaaldatamodel.

De huidige (2017) versie van de OTL kan als volgt weergegeven worden:
![alt text](https://github.com/provincieNH/OTL/raw/master/Documentatie/otl-2017.png "otl 2017")

Op de planning voor de doorontwikkeling staat het integreren van het toekomstige SE referentiekader voor COINS en het
uitsplitsen van datavalidatie naar SHACL profielen.
Daarnaast willen we een duidelijker onderscheid maken in het begrippenkader met definities en de ontologie.

Dat kan als volgt weergegeven worden:
![alt text](https://github.com/provincieNH/OTL/raw/master/Documentatie/otl-2018.png "otl 2018")


