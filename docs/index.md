# OTL Provincie Noord-Holland

De __OTL__ is gevisualiseerd met <a href="https://provincienh.github.io/OTL/otl-viz" target="_blank">__D3.js__</a>,
en te raadplegen in <a href="https://provincienh.github.io/OTL/otl-doc" target="_blank">__HTML__</a>. Deze documentatie is gegenereerd met behulp van de [Ontodocs](https://github.com/lambdamusic/Ontodocs) library.



Meer detail voorbeelden en documentatie is te raadplegen via de online [sparql-visualizer](https://madsholten.github.io/sparql-visualizer/?file=https://raw.githubusercontent.com/provincieNH/OTL/master/docs/data.json)

============================

De OTL is in RDF/OWL opgebouwd:

* de map core bevat de basis ontologie waarop de OTL gebaseerd is. Deze ontologie bestaat uit 2 namespaces:
	 * top: dit is een top ontologie met algemene concepten. Deze ontologie wordt vooralsnog gehost in een aparte [repository](https://github.com/NielsHoffmann/ontologies/tree/master/top)
	 * core: dit is een extensie op de top concepten.

* de map OTB bevat de objecttypeboom zoals deze in vraagspecificaties wordt gebruikt. 
	Deze is gemapt naar CBNL met rdfs:subclassOf Onderlinge relaties in de objecttypeboom zijn gedefinieerd met pnh_otb:partOf

	Deze map bevat 2 submappen. Een aanzet voor de OTB structuur op basis van het ERA project, en een GCR-MN map waarin de op de huidige vastgestelde structuur staat. Deze set is opgedeeld in 2 namespaces:
	* otb: de otb concepten
	* mapping.otb: de mapping van de otb naar de core namespace
	

* de map areaaldata bevat een rdf/owl file van het areaaldatamodel wat ook beschreven staat op: https://github.com/provincieNH/ILS/

	update juli 2018: er is een map 4.1 bijgekomen waar het Areaaldata 4.1 datamodel in staat
	
	Het areaaldata model is opgedeeld in 4 namespaces:
	* areaaldata: dit zijn alleen de class definities
	* areaaldata-wl: dit zijn de waardelijsten
	* areaaldata-prop: dit zijn de eigenschappen
	* mapping.areaaldata: dit is de mapping van areaaldata op de core namespace

* de map OTL bevat de totale ontologie waarbij de mappings van otb, areaaldata en de core geimporteerd zijn.

* de map SE bevat een subset van het SE uitwisselingsmodel. Dit is nog een zeer experimentele ontologie. De kans is groot dat deze nog gaat wijzigen.

In de map COINS staat de COINS 2.0 compatible library van het Areaaldatamodel.

De visie op de OTL kan als volgt weergegeven worden:
![otl](https://github.com/provincieNH/OTL/raw/master/docs/otl-pnh.jpg "otl")

In de uitwerking ziet dar er dan als volgt uit:
![otl voorbeeld](https://github.com/provincieNH/OTL/raw/master/docs/OTL-structuur.jpg "otl voorbeeld")




