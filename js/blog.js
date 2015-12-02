function Data (rawData) {
    this.title = rawData.title;
    this.category = rawData.category;
    this.author = rawData.author;
    this.aurthorURL = rawData.authorUrl;
    this.publishedOn = rawData.publishedOn;
    this.body = rawData.body;
    this.DaysPublishedAgo = parseInt((new Date() -
    new Date(rawData.publishedOn))/60/60/24/1000);
  }

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
}

Blog.prototype.toHtml = function(ii) {
  var $generateArticle = $( 'article.articleTemplate' ).clone();
  $generateArticle.removeClass('articleTemplate');
  $generateArticle.attr( 'class','article' );
  $generateArticle.find('h1:first').html(this.article[ii].title);
  $generateArticle.find('.author').html('By ' + this.article[ii].author);
  $generateArticle.find('time').html('exactly ' + this.article[ii].DaysPublishedAgo + ' days ago');
  var $generateBody = $generateArticle.find('.article-body');
  $generateBody.html(this.article[ii].body).find('p').not(':first').hide();
  $generateBody.find('p:first').append('<span class="expand"> Read More --> </span>');
  $generateBody.find('p:last').append('<span class="hide"> Hide <-- </span>');
  $generateArticle.append('<hr>');
  return $generateArticle;
};

$(function() {
  var my = {};
  my.$anchor = $('#blog_articles');
  my.util = new Util();
  my.blog = new Blog();
  my.blog.generateObjectArray(blog.rawData);
  my.blog.sortArrays();
  my.blog.author = my.blog.filterProperty(my.blog.author);
  my.blog.category = my.blog.filterProperty(my.blog.category);
  for( var ii = 0; ii < my.blog.article.length; ii++) {
    my.$anchor.append(my.blog.toHtml(ii));
  }

  my.util.expand();
  my.util.hide();

  return my;

}
);
