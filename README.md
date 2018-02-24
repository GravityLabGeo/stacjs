<h2>Javascript library for STAC (SpatioTemporal Asset Catalog)</h2>

Stacjs is a javascript library for navigating STAC static catalogs. Included is a basic navigaton web app for exploring static catalogs.

<strong>Warning: </strong>This is very much a work in progress implementing against a schema specification that is also a work in progress. 

This stac.js library contains a data model representing the STAC static schema.

The stacb.html is an "application" that uses stac.js to browse a catalog.

<h3>Vision</h3>

The vision behind stac.js is to provide a way to navigate catalog metadata down through the nodes.
As this library evolves it will become a backbone for locating data in a static STAC catalog from a web client.
This model further supports a server less architecture that allows a web client to discover and access assets in a catalog for application use.

Currently, the stacb.html sample app works well enough to debug static STAC catalogs. The app is focused on navigating links and items.
It stops short of displaying any asset data.

The intension is to provide navigation to find an asset and then pass the asset URL to a different viewers and applications. This allows asset-specific tools
to be used against an asset, but keeps the stacb.html app relatively clean and focused on metadata navigation.

In the future, stacb and stac.js could be enhanced to directly manage STAC catalogs, with proper permissioning.

Put simply: 

 - stacb.html is focused on finding assets. The display and use of an asset is left to other applications. 

 - stac.js is focused on enabling applications to discovery assets in static catalogs.


<h3>Getting Started</h3>
Copy stac.js and stacb.html files into a web server of choice such as Nginx or Apache, etc.

Load http://<pathtoroot_yourwebserver>/stacb.html in your browser.

Specify a URL that points to a static STAC catalog root json file and click "load".

The browser loads the root catalog information and displays links as it finds them.

Click links to drill deeper.

Click "Parent" to navigate back up the tree.



