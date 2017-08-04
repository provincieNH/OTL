# OTL structuur Provincie Noord-Holland

De OTL is in eerste instantie in puur RDF/OWL opgebouwd en bestaat uit 3 delen:
* de map OTB bevat de objecttypeboom zoals deze in vraagspecificaties wordt gebruikt. 
	** Deze is gemapt naar CBNL met rdfs:subclassOf
	** Onderlinge relaties zijn gedefinieerd met pnh_otb:partOf

* de map areaaldata bevat een rdf/owl file van het areaaldatamodel wat ook beschreven staat op: https://github.com/provincieNH/ILS/

* de map OTL bevat de mapping van de bovenstaande ontologies op elkaar door middel van owl:equivalentClass met restricties op eigenschappen

In de map COINS staat de COINS 2.0 compatible library van het Areaaldatamodel


