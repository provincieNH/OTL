# OTL Provincie Noord-Holland

De __OTL__ is gevisualiseerd met <a href="https://provincienh.github.io/OTL/otl-viz" target="_blank">__D3.js__</a>,
en te raadplegen in <a href="https://provincienh.github.io/OTL/otl-doc" target="_blank">__HTML__</a>. Deze documentatie is gegenereerd met behulp van de [Ontodocs](https://github.com/lambdamusic/Ontodocs) library.

Een uitleg over de structuur van de OTL kan [__hier__](otl_uitleg.md) gevonden worden.

Meer detail voorbeelden en documentatie is te raadplegen via de online [sparql-visualizer](https://madsholten.github.io/sparql-visualizer/?file=https://raw.githubusercontent.com/provincieNH/OTL/master/docs/data.json)
(werkt alleen in Chrome/Firefox, niet in Internet Explorer)

============================

De visie op de OTL van Noord-Holland kan als volgt weergegeven worden:
![otl](https://github.com/provincieNH/OTL/raw/master/docs/otl-pnh.jpg "otl")


De OTL is in RDF/OWL opgebouwd:

* de map core bevat de basis ontologie waarop de OTL gebaseerd is. Deze ontologie bestaat uit 2 namespaces:
	 * top: dit is een top ontologie met algemene concepten. Deze ontologie wordt vooralsnog gehost in een aparte [repository](https://github.com/NielsHoffmann/ontologies/tree/master/top)
	 * core: dit is een extensie op de top concepten.

* de map OTB bevat de objecttypeboom zoals deze in vraagspecificaties wordt gebruikt. 
	Deze is gemapt naar CBNL met rdfs:subclassOf Onderlinge relaties in de objecttypeboom zijn gedefinieerd met pnh_otb:partOf

	Deze map bevat 2 submappen. Een aanzet voor de OTB structuur op basis van het ERA project, en een GCR-MN map waarin de op de huidige vastgestelde structuur staat. Deze set is opgedeeld in 2 namespaces:
	* otb: de otb concepten
	* mapping.otb: de mapping van de otb naar de core namespace
	
* de map areaaldata bevat een rdf/owl file van het areaaldatamodel wat ook beschreven staat op: [https://github.com/provincieNH/Leveren_Geoinformatie/](https://github.com/provincieNH/Leveren_Geoinformatie/)

	update juli 2018: er is een map 4.1 bijgekomen waar het Areaaldata 4.1 datamodel in staat
	
	__update feb 2019:__ de namespace van het areaaldatamodel is aangepast naar 4.1_d1 (domeinlijsten versie 1), analoog aan de versienummering van Areaaldata zelf.
    Er is nu ook een SHACL file bijgekomen waarin de contraints zijn gemodelleerd.
	
	Het areaaldata model is opgedeeld in 5 namespaces:
	* areaaldata: dit zijn alleen de class definities
	* areaaldata-wl: dit zijn de waardelijsten
	* areaaldata-prop: dit zijn de eigenschappen
	* mapping.areaaldata: dit is de mapping van areaaldata op de core namespace
	* areaaldata.shapes: dit is de Shacl file met contstraints
	
	meer informatie over de implementatie van shacl kan  [__hier__](shacl_uitleg.md) gevonden worden

* de map OTL bevat de totale ontologie waarbij de mappings van otb, areaaldata en de core geimporteerd zijn.

* de map SE bevat een subset van het SE uitwisselingsmodel. Dit is nog een zeer experimentele ontologie. De kans is groot dat deze nog gaat wijzigen.

* de map DOC bevat een eerste aanzet voor een documenten metamodel. Dit is nog een zeer experimentele ontologie. De kans is groot dat deze nog gaat wijzigen.

__update feb 2019:__ er is een ontologie gemaakt op basis van TMLO. Deze gaat nog uitgebreid worden met noord-holland specifieke zaken... hier is de <a href="https://provincienh.github.io/OTL/tmlo-doc" target="_blank">__TMLO__</a> versie te vinden.

In de map COINS staat de COINS 2.0 compatible library van het Areaaldatamodel.


In de uitwerking ziet dar er dan als volgt uit:
![otl voorbeeld](https://github.com/provincieNH/OTL/raw/master/docs/OTL-structuur.jpg "otl voorbeeld")




