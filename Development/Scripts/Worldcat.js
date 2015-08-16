var http        = require('http');
var parseString = require('xml2js').parseString;
var _this       = this;
var results     = [];

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

  // http.get(requestString, function(response){
  //  response.setEncoding('utf8');
  //  var body = '';

  //  response.on('data', function(chunk){
  //    body += chunk;
  //  });

  //  response.on('end', function() {
  //    Worldcat.parse(body);
  //  });

  // }).on('error', function(error) {
  //  console.log("error", error)
  // });
}

_this._parse = function(query) {
  parseString(data, function (err, result) {
    var records = result['searchRetrieveResponse']['records'][0]['record'];

    for (var record in records) {
      var recordData = records[record]['recordData'][0]['record'][0]['datafield'];

      for (var item in recordData) {
        var itemData = recordData[item];
        var author, title, subTitle, notesOnTitle;

        if (_this._findTag(itemData, '100')) {
          if (_this._findCode(itemData, 'a')) { author = _this._findCode(itemData, 'a').value; }
          console.log('author: ', author);
        }

        // Include if you want title,sub-Title, notes On Title
        // if (_this._findTag(itemData, '245')) {
        //   if (_this._findCode(itemData, 'a')) { title        = _this._findCode(itemData, 'a').value; }
        //   if (_this._findCode(itemData, 'c')) { subTitle     = _this._findCode(itemData, 'c').value; }
        //   if (_this._findCode(itemData, 'p')) { notesOnTitle = _this._findCode(itemData, 'p').value; }
        //   console.log('title: ', title);
        //   console.log('subTitle: ', subTitle);
        //   console.log('notesOnTitle: ', notesOnTitle);
        //   console.log('---');
        // }
      }
    }
  });
}

module.exports =  {
  search: function(query) {
   var data = _this._constructRequest(query);
   // console.log(data);
   // return _this._parse(data);
  }
}
