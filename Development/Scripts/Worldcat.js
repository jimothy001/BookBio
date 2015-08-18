var http        = require('http');
var parseString = require('xml2js').parseString;
var _this       = this;
var results     = [];
var Q           = require('q');

/*///////////////////////////
// Create WorldCat request // 
///////////////////////////*/
_this._getWCIndex = function(search) {
  var base = 'srw.'

  switch (search) {
  case 'keyword':
    return base + 'kw';
  case 'title':
    return base + 'ti';
  case 'author':
    return base + 'au';
  case 'subject':
    return base + 'su';
  case 'isbn':
    return base + 'bn';
  case 'issn':
    return base + 'n2';
  default:
    return base + 'kw';
  }
}

_this._constructRequest = function(data) {
  var fields         = data['fields'];
  var language       = data['language'];
  var operator       = '+any+';
  var conjugator     = '+and+';
  var queryBase      = 'http://www.worldcat.org/webservices/catalog/search/sru?query=';
  var searchString   = '';
  var query          = '';
  var version        = '&version=1.1';
  var worldCatApiKey = '&operation=searchRetrieve&wskey=GwpUhR9ag9TLFAGLt6qTkPpIVCSetHrvnOvCY7FWE9pEbPztqmCjCFGWII8sbfpaGZ2CeLwGwXg7pHpC';
  var pagingOptions  = '&recordSchema=&maximumRecords=10&startRecord=1&recordPacking=xml&servicelevel=default&sortKeys=relevance&resultSetTTL=300&recordXPath=';

  for (var key in fields) {
    if (fields[key] !== '') {
      var wcIndex = _this._getWCIndex(key); 
      var searchTerm = encodeURIComponent(' ' + fields[key] + ' ' );
      searchString += wcIndex + operator + searchTerm + conjugator;
    }
  }

  if (language !== 'all languages') {
    var languageTerm = encodeURIComponent(' ' + language + ' ');
    searchString += 'srw.la' + operator + languageTerm;
  } else {
    searchString = searchString.substring(0, searchString.length - conjugator.length); 
  }

  query = queryBase + searchString + version + worldCatApiKey + pagingOptions;
  return query;
}

_this._makeRequest = function(query) {
  var deferred = Q.defer();

  _this._httpGet(query).then(function (response) {
    var body = '';
    response.setEncoding('utf8');

    response.on('data', function(chunk){
      body += chunk;
    });

    response.on('end', function() {
      deferred.resolve(body);
    });

    response.on('error', function() {
      console.log('error', error);
      deferred.reject(error);
    });
  });

  return deferred.promise;
}

_this._httpGet = function (opts) {
  var deferred = Q.defer();
  http.get(opts, deferred.resolve);
  return deferred.promise;
};


/*///////////////////////////////
// Parse the WorldCat response // 
///////////////////////////////*/
_this._findTag = function(data, tagNumber) {
  var tagData = data['$']['tag']; 
  return tagData === tagNumber ? true : false;
}

_this._findCode = function(data, codeNumber) {
  var dataItems = data['subfield'];
  var result;

  for (var item in dataItems) {
    var code = dataItems[item]['$'].code;
    var value = dataItems[item]['_']

    if (code === codeNumber) {
      result = {
        'code' : code,
        'value': value
      }
    } 
  }
  return result;
}

_this._cleanup = function(obj) {
  return year = obj.replace(/[\©.,:/]/g, "");
}

// Convert "1845-1942" into an object with `yearStart` & `yearEnd`
_this._splitDate= function(date) {
  var newDate = {};
  if (date.indexOf('-') != -1) {
    var dates = date.split('-', 2);
    newDate['yearStart'] = parseInt(dates[0], 10);
    newDate['yearEnd']   = parseInt(dates[1], 10);
  } else {
    newDate['yearStart'] = parseInt(date, 10);
  }
  return newDate;
}

_this._parse = function(data) {
  var deferred = Q.defer();
  parseString(data, function (err, result) {
    var records = result['searchRetrieveResponse']['records'][0]['record'];
    var outputs = [];

    for (var record in records) {
      var recordData = records[record]['recordData'][0]['record'][0]['datafield'];
      var output = {};

      for (var item in recordData) {
        var itemData = recordData[item];
        var author, title, subTitle, publicationCity, year, edition, publisher;

        // AUTHOR
        if (_this._findTag(itemData, '100')) {
          if (_this._findCode(itemData, 'a')) { author = _this._findCode(itemData, 'a').value; }
          output['author'] = author;
        }

        // TITLE & SUBTITLE
        if (_this._findTag(itemData, '245')) {
          if (_this._findCode(itemData, 'a')) { title    = _this._findCode(itemData, 'a').value; }

          if (_this._findCode(itemData, 'c')) { subTitle = _this._findCode(itemData, 'c').value; }
          output['title'] = title;
          output['subTitle'] = subTitle;
        }

        // PUBLICATION CITY, DATE, & PUBLISHER
        if (_this._findTag(itemData, '260')) {
          if (_this._findCode(itemData, 'a')) { 
            publicationCity = _this._findCode(itemData, 'a').value; 
            output['place'] = _this._cleanup(publicationCity);
          }

          if (_this._findCode(itemData, 'b')) { 
            publisher = _this._findCode(itemData, 'b').value; 
            output['publisher'] = publisher;
          }

          if (_this._findCode(itemData, 'c')) { 
            year = _this._findCode(itemData, 'c').value;
            year = _this._cleanup(year);
            output.date = _this._splitDate(year);
          }
        }

        // Edition
        if (_this._findTag(itemData, '250')) {
          if (_this._findCode(itemData, 'a')) { edition = _this._findCode(itemData, 'a').value; }
          output['edition'] = edition;
        }
      }
      outputs.push(output);
      console.log(output);
    }
    deferred.resolve(outputs);
  });
  return deferred.promise;
}


/*////////////////////////
// Public Search method // 
////////////////////////*/
module.exports =  {

  createNameFromQuery: function(query) {
    var name = 'WorldCat Search: ';
    var fields = query['fields'];
    for (var field in fields) {
      if (fields[field] !== ''){
        name += fields[field] + ' ' 
      }
    }
    return name;
  },

  search: function(query) {
    var deferred = Q.defer();
    var wcQuery = _this._constructRequest(query);

    _this._makeRequest(wcQuery).then(function (result) {
      _this._parse(result).then(function (finalOutput) {
        deferred.resolve(finalOutput);
      });
    });

    return deferred.promise;
  }
}
