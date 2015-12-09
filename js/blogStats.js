
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

  this.convertRawData = function(rawData,article,authorName) {
    rawData.forEach(function(object){
      article.push(new Data(object));
    });
  }

  this.numberOfArticles = function() {
    return this.articleData.length;
  }

  this.generateArrayOfAuthors = function(articleData,authorArray) {
    articleData.forEach(function(object){
      authorArray.push(object.author)
    });
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
  my = {};
  my.stats = new Stats();
  my.ajax = new Ajax();
  my.eTag;
  my.rawData;


  my.jsonDataReceived = function() {
    my.rawData = JSON.parse(localStorage.getItem('blogData'));
    my.stats.convertRawData(my.rawData,my.stats.articleData);
    $('#numberOfArticles').append(my.stats.numberOfArticles());
    my.stats.generateArrayOfAuthors(my.stats.articleData,my.stats.authorArray);
    $.unique(my.stats.authorArray);
    $('#numberOfAuthors').append(my.stats.authorArray.length);



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
