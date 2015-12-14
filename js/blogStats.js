
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

function getNumberOfWords(words){

  return words.split(/\s+/).length;

}

function add(sum, a) {
  return sum + a;
}

function getLetterCount(bodyString) {
  var replaceNonLetters = bodyString.replace(/[^a-zA-Z]/g,'-');
  var splitUpStringIntoSingleCharacters = replaceNonLetters.split('');
  function removeDash(currentValue) {
    return currentValue !== '-';
  }
  var LettersOnly = splitUpStringIntoSingleCharacters.filter(removeDash);
  return LettersOnly.length;
}

function filterType(type,name) {

  return function(element) {
    return element[type] == name;
  };

}

function Stats() {

  this.articleData = [];
  this.updatedArticleData= [];
  this.authorArray = [];
  this.bodyArray = [];
  this.lettersArray = [];

  this.updateDatabase = function(dataForDatabase) {
    webDatabase.execute('DELETE FROM Blog_Articles',function() {
      console.log('wiped database clean');
    });
    webDatabase.insertAllArticles(dataForDatabase);
  };

  this.selectArticlesFromDatabase = function() {
    webDatabase.execute('SELECT * FROM Blog_Articles;', my.stats.beginDoingStats);
  };

  this.beginDoingStats = function(articleData) {
    $('#numberOfArticles').append(my.stats.numberOfArticles(articleData));
    my.stats.generateArray(articleData,my.stats.authorArray,'author');
    $.unique(my.stats.authorArray);
    $('#numberOfAuthors').append(my.stats.authorArray.length);
    my.stats.generateArrayWithNoHTML(articleData,my.stats.bodyArray,'body');
    my.totalNumberWords = my.stats.countTotalNumberOfWords(my.stats.bodyArray,my.stats.totalNumberOfWords);
    $('#totalNumberOfWords').append(my.totalNumberWords);
    my.totalNumberOfLetters=my.stats.getTotalAmountOfLetters(my.stats.bodyArray);
    $('#averageWordLength').append(((my.totalNumberOfLetters/my.totalNumberWords).toFixed(2)));
    my.stats.getAverageWordLengthForEachAuthor(my.stats.authorArray,articleData);
    my.stats.getTotalWordsForEachArticle(articleData,articleData,'title');
  };

  this.convertRawData = function(rawData,article) {
    rawData.forEach(function(object){
      article.push(new Data(object));
    });
  };

  this.numberOfArticles = function(articleObject) {
    return articleObject.length;
  };

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
    var numberOfWords = articleBodyWithNoHTML.map(getNumberOfWords);
    var totalWords = numberOfWords.reduce(add, 0);
    return totalWords;
  };

  this.getTotalAmountOfLetters = function(articleBodyWithNoHTML) {
    var totalLettersinEachBody = articleBodyWithNoHTML.map(getLetterCount);
    var totalLetters = totalLettersinEachBody.reduce(add, 0);
    return totalLetters;
  };

  this.getAverageWordLengthForEachAuthor = function(authorArray,articleData) {
    var authorAverageWordLengthData = [];

    authorArray.forEach(function(authorname){
      var authorArticles = articleData.filter(filterType('author',authorname));
      var authorBodyArticleArray = [];
      authorArticles.forEach(function(object){
        authorBodyArticleArray.push($(object['body']).text());
      });
      var authorNumberOfWords = authorBodyArticleArray.map(getNumberOfWords);
      var authorLettersinEachBody = authorBodyArticleArray.map(getLetterCount);
      var totalAuthorLetters = authorLettersinEachBody.reduce(add,0);
      var totalAuthorWords = authorNumberOfWords.reduce(add,0);
      var authorData = {author: authorname, averageWordLength: (totalAuthorLetters/totalAuthorWords).toFixed(2)};
      authorAverageWordLengthData.push(authorData);
    });

    authorAverageWordLengthData.forEach(function(object){
      $('#averageWordLengthByAuthor').append('<h5 class="type-stats-heading">'+ object.author + ': <span class="data">'+ object.averageWordLength + '</span></h5>');
    });
  };

  this.getTotalWordsForEachArticle = function(articleData,dataforfilter) {
    var titleArticleWords = [];
    var titleArray = [];

    dataforfilter.forEach(function(object){
      titleArray.push(object['title']);
    });

    titleArray.forEach(function(titlename){
      var titleArticles = articleData.filter(filterType('title',titlename));
      var titleBodyArticleArray = [];
      titleArticles.forEach(function(object){
        titleBodyArticleArray.push($(object['body']).text());
      });
      var titleNumberOfWords = titleBodyArticleArray.map(getNumberOfWords);
      var totaltitleWords = titleNumberOfWords.reduce(add,0);
      var titleData = {title: titlename, titleTotalWords: totaltitleWords};
      titleArticleWords.push(titleData);
    });

    titleArticleWords.forEach(function(object){
      $('#numberOfWordsPerArticle').append('<h5 class="type-stats-heading">'+ object.title + ':<span class="data">  '+ object.titleTotalWords + ' total words</span> </h5>');
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

  this.getUpdatedJSONdata = function() {
    return $.getJSON('blogArticles.json', my.changedJSONdata);
  };

  this.getJSONdata = function() {
    return $.getJSON('blogArticles.json', my.jsonDataReceived);
  };
}

my = {};

$(function() {

  my.stats = new Stats();
  my.ajax = new Ajax();
  my.eTag;
  my.rawData;

  /*** First Callback function on page, connects to database and then sets up tables ***/
  webDatabase.init();
  webDatabase.setupTables();

  my.changedJSONdata = function(data) {
    my.stats.convertRawData(data,my.stats.articleData);
    my.stats.updateDatabase(my.stats.articleData);
    my.jsonDataReceived();
  };

  my.jsonDataReceived = function() {
    my.stats.selectArticlesFromDatabase();
  };

  /**** RUN GET JSON HEAD FUNCTION THEN ON DONE RUN ****/
  my.ajax.getJSONhead().done(function(data,server,xhr){
    my.eTag = xhr.getResponseHeader('eTag');
    if(my.eTag !== localStorage.getItem('uniqueEtag')) {
      localStorage.setItem('uniqueEtag', my.eTag);
      my.ajax.getUpdatedJSONdata().done(function() {
        console.log('Data Loaded');
      });
    } else {
      console.log('eTags are the Same');
      my.ajax.getJSONdata();
    }
  });
  /**** RUN GET JSON HEAD FUNCTION THEN ON FAIL RUN ****/
  my.ajax.getJSONhead().fail(function(){
    console.log('you failed on getting JSON head');
  });

  return my;
});
