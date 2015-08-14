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

module.exports =  {
  parse: function(data) {
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
}
