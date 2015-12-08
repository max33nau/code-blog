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

function Blog() {
  this.article = [];
  this.author = [];
  this.category = [];

  this.generateObjectArray = function(rawData) {
    for(var ii = 0; ii < rawData.length; ii++) {
      this.article.push(new Data(rawData[ii]));
      this.author.push(this.article[ii].author);
      this.category.push(this.article[ii].category);
    }
  };

  this.sortArrays = function () {
    this.article.sort(function(a,b){ return (a.DaysPublishedAgo - b.DaysPublishedAgo ); });
    this.author.sort();
    this.category.sort();
  };

  this.filterProperty = function(PropertyToBeFiltered) {
    var filteredArray = [];
    var repeat = 0;
    for(var ii = 0; ii < PropertyToBeFiltered.length; ii++) {
      if( PropertyToBeFiltered[ii] == PropertyToBeFiltered[ii+1] ) {
        repeat++;
      } else {
        filteredArray.push(PropertyToBeFiltered[ii]);
      }
    }
    return filteredArray;
  };

  this.addSubjectstoNav = function() {
    var $authorFilter = $('#authorFilter');
    var $categoryFilter = $('#categoryFilter');
    for (var ii = 0; ii, ii < this.author.length; ii++) {
      $authorFilter.append('<li class="search-author-name">' + this.author[ii] + '</li>');
    }
    for (var ii = 0; ii, ii < this.category.length; ii++) {
      $categoryFilter.append('<li class="search-category-subject">' + this.category[ii] + '</li>');
    }
  };

  this.manipulateArticleBodyParagraphs = function() {
    var $generateBody = $('.article-body').each(function(){
      var $self = $(this);

      $self.children().hide();
      $self.find('p:first').append('<span class="expand"> Read More --> </span>');
      $self.find(':last-child').append('<span class="hide"> Hide <-- </span>');
      $self.find('p:first').show().prevUntil('p:first').show();
      $self.find('.hide').hide();
    });
  };

  this.expand = function() {
    var $expand = $('.expand');
    $expand.css('cursor', 'e-resize');
    $expand.click(function(){
      var $self = $(this);
      $self.parent().siblings().stop().slideDown(300);
      $self.parent().siblings().find('.hide').show();
      $self.hide();
    });
  };

  this.hide = function() {
    var $hide = $('.hide');
    $hide.css('cursor', 'w-resize');
    $hide.click(function(){
      $('html,body').animate( {scrollTop: $(this).closest('.article-body').parent().offset().top}, 400);
      var $self = $(this);
      $self.parent().hide();
      $self.parent().parent().children().not('p:first').stop().slideUp(300);
      $self.parent().siblings().find('.expand').show();
    });
  };

}

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

  /**** Initialize Objects ****/

  var my = {};
  my.$anchor = $('#blog_articles');
  my.util = new Util();
  my.blog = new Blog();
  my.ajax = new Ajax();
  my.eTag;
  my.articleData;


  my.generateJSONarticles=function() {
    my.articleData = JSON.parse(localStorage.getItem('blogData'));
      /**** Sort and Filter Raw Data ****/
    my.blog.generateObjectArray(my.articleData);
    my.blog.sortArrays();
    my.blog.author = my.blog.filterProperty(my.blog.author);
    my.blog.category = my.blog.filterProperty(my.blog.category);
    my.blog.addSubjectstoNav();
      /**** Add Articles to DOM using Handlebars ****/
    $.get('templates/articleTemplate.html', function(articleTemplate) {
      my.handleBarTemplate = Handlebars.compile(articleTemplate);
      for( var ii = 0; ii < my.blog.article.length; ii++) {
        my.articleToHtml = my.handleBarTemplate(my.blog.article[ii]);
        my.$anchor.append(my.articleToHtml);
      }
      /**** Truncate Paragraphs and Add 'Read More' and 'Hide' to Paragraphs ****/
      my.blog.manipulateArticleBodyParagraphs();
      my.blog.expand();
      my.blog.hide();
    });

    /**** Add Functionality to Main Nav Bar and Create Filter Ability ****/
    my.util.navigation();
    my.util.filterByAuthor();
    my.util.filterByCategory();

  };


  my.ajax.getJSONhead().done(function(data,server,xhr){
    my.eTag = xhr.getResponseHeader('eTag');

    if(my.eTag !== localStorage.getItem('uniqueEtag')) {
      localStorage.setItem('uniqueEtag', my.eTag);
      my.ajax.getJSONdata().done(function() {
        console.log('Data Loaded');
        my.generateJSONarticles();
      });
      my.ajax.getJSONdata().fail(function(){
        console.log('you failed on getting JSON data');
      });
    } else {
      my.articleData = JSON.parse(localStorage.getItem('blogData'));
      my.generateJSONarticles();

    }
  });
  my.ajax.getJSONhead().fail(function(){
    console.log('you failed on getting JSON head');
  });







  return my;

}
);
