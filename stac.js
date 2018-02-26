

function Node(url, rootNode, parentNode, entry) {

    this.url = url; //URL associated with this node. this is essentially the unique id.
    this.rootNode = rootNode;
    this.parentNode = parentNode;
    this.entry = entry;
    this.children = [];

    this.getEntry = function(){
        return this.entry;
    }

    this.computeUrlBase = function(){
        var r = /[^\/]*$/;
        return this.url.replace(r, '');
    }

    this.fetchChildNode = function(link) {

        var dataObj = null;

        if ('child' == link.rel) {
            dataObj = new Catalog();
        } else if ('item' == link.rel) {
            dataObj = new Item();
        } else {   /* TODO, how to handle 'alternate' or other rel extensions ? */
            dataObj = new Catalog();
        }

        var fullUrl = this.computeUrlBase() + link.href;

        var rtnstatus;
        var rtnexception;

        $.ajax({
                url: fullUrl,
                type: 'GET',
                crossDomain: true,
                async: false,
                dataType: 'text',
                success: function(data){
                    var obj = JSON.parse(data);
                    dataObj.fromJson(obj);
                },
                error: function(xhr, status, exception){
                    rtnstatus = status;
                    rtnexception = exception;
                }
            });

        if (null != rtnstatus || null != rtnexception){
            throw "Unable to read node: " + status + ' ' + exception;
        }

        var node = new Node(fullUrl, this.rootNode, this, dataObj);
        node.entry = dataObj;
        this.children.push(node);
        return node;
    }
}

function Index() {

    this.rootNode = null;

    this.getRootNode = function(){
        return this.rootNode;
    }

    this.initialize = function(rootCatalogUrl){

        var idx = this;
        var rcurl = rootCatalogUrl;
        var rootNode = null;

        var rtnstatus;
        var rtnexception;

        $.ajax({
                url: rcurl,
                type: 'GET',
                crossDomain: true,
                async: false,
                dataType: 'text',   /* had to set so response is not parsed and causing errors */
                success: function(data){
                    var obj = JSON.parse(data);
                    var rc = new RootCatalog();
                    rc.fromJson(obj);
                    rootNode = new Node(rcurl, null, null, rc);
                },
                error: function(xhr, status, exception){
                    rtnstatus = status;
                    rtnexception = exception;
                }
            });

        if (null != rtnstatus || null != rtnexception){
            throw "Unable to read catalog: " + status + ' ' + exception;
        }

        this.rootNode = rootNode;
    }
};




/*************** Model Objects ***************************/

/** Root catalog, contains contact info, licensing, etc. */

function RootCatalog(){
   this.name = '';
   this.description = '';
   this.links = [];
   this.license = {
        'name' : '',
        'short_name' : '',
        'link' : '',
        'copyright' : ''
    };
    this.contact = {
        'name' : '',
        'organization' : '',
        'email' : '',
        'url' : ''
    };
    this.keywords = '';
    this.homepage = '';
    this.provider = {
        'scheme': '',
        'region': '',
        'requesterPays': ''
    };

    this.findLink = function(href){

        var rtn = null;
        $.each(this.links, function(idx, value){
            if (href == value.href){
                rtn = value;
                return false;
            }
        });

        return rtn;
    }

    this.fromJson = function(json){
        if ("name" in json){
            this.name = json.name;
        }
        if ("description" in json){
            this.description = json.description;
        }
        if ("links" in json){
            var arr = this.links;
            $.each(json.links, function(idx, value){
                var link = new Link();
                link.fromJson(value);
                arr.push(link);
            });
        }
        if ("license" in json) {
            this.license = json.license;
        }
        if ("contact" in json) {
            this.contact = json.contact;
        }
        if ("keywords" in json) {
            this.keywords = json.keywords;
        }
        if ("homepage" in json) {
            this.homepage = json.homepage;
        }
        if ("provider" in json) {
            this.provider = json.provider;
        }
    };

    this.isValid = function(){
        return (this.name != '' && this.description != '' && this.links.length > 0);
    }
};

/** Link Catalog */

function Catalog(){
    this.name = '';
    this.description = '';
    this.links = [];

    this.fromJson = function(json){
        if ("name" in json){
            this.name = json.name;
        }
        if ("description" in json){
            this.description = json.description;
        }
        if ("links" in json){
            this.links = json.links;
        }
    }

    this.findLink = function(href){

        var rtn = null;
        $.each(this.links, function(idx, value){
            if (href == value.href){
                rtn = value;
                return false;
            }
        });

        return rtn;
    }

    this.isValid = function(){
        return (this.name != '' && this.description != '' && this.links.length > 0);
    }
};

function Link(){

    this.rel = null;
    this.href = null;

    this.fromJson = function(json){
        if ("rel" in json){
            this.rel = json.rel;
        }
        if ("href" in json){
            this.href = json.href;
        }
    }

    this.isValid = function(){
        return (this.rel != '' && this.href != '');
    }
};

function Asset(){
    this.type;
    this.name;
    this.href;

    this.fromJson = function(json){
        if ("type" in json){
            this.type = json.type;
        }
        if ("name" in json){
            this.name = json.name;
        }
        if ("href" in json){
            this.href = json.href;
        }
    }

    this.isValid = function(){
        return (this.type != '' && this.name != '' && this.href != '');
    }

};

function Geometry() {
    this.type = [];
    this.coordinates = [];

    this.fromJson = function(json){
        if ("type" in json){
            this.type = json.type;
        }
        if ("coordinates" in json){
            this.coordinates = json.coordinates;
        }
    }
};

function Item(){
    this.type = null;
    this.id = null;
    this.bbox = null;
    this.geometry = null;
    this.properties = [];
    this.links = [];
    this.assets = [];

    this.fromJson = function(json){
        if ("type" in json){
            this.type = json.type;
        }
        if ("id" in json){
            this.id = json.id;
        }
        if ("bbox" in json){
            this.bbox = json.bbox;
        }
        if ("geometry" in json){
            this.geometry = new Geometry();
            this.geometry.fromJson(json);
        }
        if ("properties" in json){
            this.properties = json.properties;
        }
        if ("links" in json){
            var arr = this.links;
            $.each(json.links, function(idx, value){
                var link = new Link();
                link.fromJson(value);
                arr.push(link);
            });
        }
        if ("assets" in json){
            var arr = this.assets;
            $.each(json.assets, function(idx, value){
                var asset = new Asset();
                asset.fromJson(value);
                arr.push(asset);
            });
        }
    }
};