
function Data (rawData) {
  this.title = rawData.title;
  this.category = rawData.category;
  this.author = rawData.author;
  this.authorURL = rawData.authorUrl;
  this.publishedOn = rawData.publishedOn;
  this.DaysPublishedAgo = parseInt((new Date() -
  new Date(rawData.publishedOn))/60/60/24/1000);
  this.convertMarkDown = function() {
    var body;
    if(rawData.body) {
      body= rawData.body;
    } else if (!rawData.body) {
      body = marked(rawData.markdown);
    } else {
      console.log('Not Here');
    }
    return body;
  };
  this.body = this.convertMarkDown();
};


function Stats() {

  this.articleData = [];
  this.authorArray = [];
  this.bodyArray = [];
  this.lettersArray = [];

// var article = $(articleData.body).text();
// var counter = article.slice(' ').length;


  this.convertRawData = function(rawData,article) {
    rawData.forEach(function(object){
      article.push(new Data(object));
    });
  }

  this.numberOfArticles = function() {
    return this.articleData.length;
  }

  this.generateArray = function(articleData,typeArray,type) {
    articleData.forEach(function(object){
      typeArray.push(object[type]);
    });
  };

  this.generateArrayWithNoHTML = function(articleData,typeArray,type) {
    articleData.forEach(function(object){
      typeArray.push($(object[type]).text());
    });
  };

  this.countTotalNumberOfWords = function(articleBodyWithNoHTML,totalWords) {
    function getNumberOfWords(words){
      return words.split(/\s+/).length;
    }
    var numberOfWords = articleBodyWithNoHTML.map(getNumberOfWords);
    function add(sum, a) {
      return sum + a;
    }
    totalWords= numberOfWords.reduce(add, 0);
    console.log(totalWords);
    return totalWords;
  }

  this.generateLettersArray = function(articleBodyWithNoHTML, letterArray) {



  };





};

function Ajax() {
  this.getJSONhead = function() {
    return $.ajax({
      type: 'HEAD',
      url: 'blogArticles.json'
    });
  };

  this.getJSONdata = function() {
    return $.getJSON('blogArticles.json', function(data) {
      localStorage.setItem('blogData', JSON.stringify(data));
    });
  };
}

$(function() {

var words = ["Hello", "there", "EVERYONE!"];

function countLetters(w) {
  return w.length;
}

var numLettersArray = words.map(countLetters);
console.log("words = "+words+"  numLettersArray = "+numLettersArray);

function add(sum, a) {
  return sum + a;
}
var total = numLettersArray.reduce(add, 0);

console.log("total ="+total);

  my = {};
  my.stats = new Stats();
  my.ajax = new Ajax();
  my.eTag;
  my.rawData;
  my.totalwordlength ;
  my.totalLetters;


  my.jsonDataReceived = function() {
    my.rawData = JSON.parse(localStorage.getItem('blogData'));
    my.stats.convertRawData(my.rawData,my.stats.articleData);
    $('#numberOfArticles').append(my.stats.numberOfArticles());
    my.stats.generateArray(my.stats.articleData,my.stats.authorArray,'author');
    $.unique(my.stats.authorArray);
    $('#numberOfAuthors').append(my.stats.authorArray.length);
    my.stats.generateArrayWithNoHTML(my.stats.articleData,my.stats.bodyArray,'body');
    my.totalNumberWords = my.stats.countTotalNumberOfWords(my.stats.bodyArray,my.stats.totalNumberOfWords);
    $('#totalNumberOfWords').append(my.totalNumberWords);
    my.totalLetters = my.stats.generateLettersArray(my.stats.bodyArray,my.stats.lettersArray);


  }


  /**** RUN GET JSON HEAD FUNCTION THEN ON DONE RUN ****/
  my.ajax.getJSONhead().done(function(data,server,xhr){
    my.eTag = xhr.getResponseHeader('eTag');
    if(my.eTag !== localStorage.getItem('uniqueEtag')) {
      localStorage.setItem('uniqueEtag', my.eTag);
      my.ajax.getJSONdata().done(function() {
        console.log('Data Loaded');
        my.jsonDataReceived();

      });
      my.ajax.getJSONdata().fail(function(){
        console.log('you failed on getting JSON data');
      });
    } else {
      console.log('eTags are the Same');
      my.jsonDataReceived();

    }
  });

  /**** RUN GET JSON HEAD FUNCTION THEN ON FAIL RUN ****/
  my.ajax.getJSONhead().fail(function(){
    console.log('you failed on getting JSON head');
  });



  return my;
});
