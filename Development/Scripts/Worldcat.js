var parseString = require('xml2js').parseString;
var _this       = this;
var results     = [];

_this._findTag = function(data, tagNumber) {
  var tagData = data['$']['tag']; 
  return tagData === tagNumber ? true : false;
}

_this._findCode = function(data, codeNumber) {
  var code = data['subfield'][0]['$']['code'];
  return code === codeNumber ? true : false;
}

module.exports =  {
  parse: function(data) {
    parseString(data, function (err, result) {
      var records = result['searchRetrieveResponse']['records'][0]['record'];

      for (var record in records) {
        var recordData = records[record]['recordData'][0]['record'][0]['datafield'];
        for (var item in recordData) {
          var itemData = recordData[item];
          // console.log(itemData);
          if (_this._findTag(itemData, '100')) {
            if (_this._findCode(itemData, 'a')) {
              var author = itemData['subfield'][0]['_'];
              console.log(author);
            }
          }
        }
      }
    });
  }
}
