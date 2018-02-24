<h2>Javascript library for STAC SpatioTemporal Asset Catalog</h2>

Basic javascript library for navigating STAC static catalogs. 

<strong>Warning: </strong>This is very much a work in progress implementing against a schema specification that is also a work in progress. 

The stac.js library contains a data model representing the STAC static schema. 

The stacb.html is an "application" that uses stac.js to browse a catalog.

<h3>Vision</h3>

The vision behind stac.js is to provide a way to navigate a catalog to view metadata down through the nodes. The current version works well enough for debugging STAC static catalogs. However, as this evolves it should become a backbone for locating data from a web client, supporting a server less architecture that allows a web client to discover and access assets in a catalog. 

Currently, the stacb.html sample app is focused on navigating links and items. It stops short of displaying any asset data. 

The intension behind this effort is to provide navigation to an asset and then allow different viewers and applications to be invoked by passing the asset/item URL. 

Put simply: 

 - stacb.html is focused on finding assets. The display and use of an asset is left to other applications. 

 - stac.js is focused on enabling applications to discovery assets in static catalogs.


<h3>Getting Started</h3>
Copy stac.js and stacb.html files into a web server of choice such as NGINX or Apache, etc. 

Load http://<pathtoroot_yourwebserver>/stacb.html in your browser.

Specify a URL that points to a static STAC catalog root and click "load".

The browser loads the root catalog information and displays links as it finds them.

Click links to drill deeper.

Click "Parent" to navigate back up the tree.



