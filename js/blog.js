function Data (rawData) {
  this.title = rawData.title;
  this.category = rawData.category;
  this.author = rawData.author;
  this.authorURL = rawData.authorUrl;
  this.publishedOn = rawData.publishedOn;
  this.body = rawData.body;
  this.DaysPublishedAgo = parseInt((new Date() -
  new Date(rawData.publishedOn))/60/60/24/1000);
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
      $self.find('p').not(':first').hide();
      $self.find('p:first').append('<span class="expand"> Read More --> </span>');
      $self.find('p:last').append('<span class="hide"> Hide <-- </span>');
    });
  };

  this.expand = function() {
    var $expand = $('.expand');
    $expand.css('cursor', 'e-resize');
    $expand.click(function(){
      var $self = $(this);
      $self.parent().siblings().stop().slideDown(200);
      $self.hide();
    });
  };

  this.hide = function() {
    var $hide = $('.hide');
    $hide.css('cursor', 'w-resize');
    $hide.click(function(){
      $('html,body').animate( {scrollTop: $(this).closest('.article').offset().top}, 400);
      var $self = $(this);
      $self.parent().parent().children(':first-child').children().show();
      $self.parent().parent().children().not(':first-child').stop().slideUp(200);;
    });
  };

}

$(function() {

  /**** Initialize Objects ****/
  var my = {};
  my.$anchor = $('#blog_articles');
  my.util = new Util();
  my.blog = new Blog();


  /**** Sort and Filter Raw Data ****/
  my.blog.generateObjectArray(blog.rawData);
  my.blog.sortArrays();
  my.blog.author = my.blog.filterProperty(my.blog.author);
  my.blog.category = my.blog.filterProperty(my.blog.category);
  my.blog.addSubjectstoNav();

  /**** Add Articles to DOM using Handlebars ****/
  my.handleBarTemplate = Handlebars.compile($('#handleBarTemplate').html());
  for( var ii = 0; ii < my.blog.article.length; ii++) {
    my.articleToHtml = my.handleBarTemplate(my.blog.article[ii]);
    my.$anchor.append(my.articleToHtml);
  }

  /**** Truncate Paragraphs and Add 'Read More' and 'Hide' to Paragraphs ****/
  my.blog.manipulateArticleBodyParagraphs();
  my.blog.expand();
  my.blog.hide();

  /**** Add Functionality to Main Nav Bar and Create Filter Ability ****/
  my.util.navigation();
  my.util.filterByAuthor();
  my.util.filterByCategory();

  return my;

}
);
