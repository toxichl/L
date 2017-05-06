# 

## Pure-JavaScript-HTML5-Parser

```js
var results = "";

HTMLParser("<p id=test>hello <i>world", {
  start: function( tag, attrs, unary ) {
    results += "<" + tag;
 
    for ( var i = 0; i < attrs.length; i++ )
      results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
 
    results += ">";
  },
  end: function( tag ) {
    results += "</" + tag + ">";
  },
  chars: function( text ) {
    results += text;
  },
  comment: function( text ) {
    results += "<!--" + text + "-->";
  }
});

// results == '<p id="test">hello <i>world</i></p>"

```