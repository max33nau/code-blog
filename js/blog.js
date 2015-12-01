function Articles() {
  this.articleData = [];
  this.sortPublishDate = function () {
    for(var ii = 0; ii < blog.rawData.length; ii++) {
      blog.rawData[ii].DaysPublishedAgo = parseInt((new Date() -
      new Date(blog.rawData[ii].publishedOn))/60/60/24/1000);
      this.articleData.push(blog.rawData[ii]);
    }
    this.articleData.sort(function(a,b){ return (a.DaysPublishedAgo - b.DaysPublishedAgo ); });
    console.log(this.articleData);
  };
}

Articles.prototype.toHtml = function(ii) {
  var $generateArticle = $( 'article.articleTemplate' ).clone();
  $generateArticle.removeClass('articleTemplate');
  $generateArticle.attr( 'id',this.articleData[ii].title.split(' ')[0] )
  .attr( 'class','article' );
  $generateArticle.find('h1:first').html(this.articleData[ii].title);
  $generateArticle.find('#author').html('By ' + this.articleData[ii].author);
  $generateArticle.find('time').html('exactly ' + this.articleData[ii].DaysPublishedAgo + ' days ago');
  $generateArticle.find('.article-body').html(this.articleData[ii].body);
  $generateArticle.append('<hr>');
  return $generateArticle;
};

$(function() {
  var my = {};
  my.$anchor = $('#blog_articles');
  my.articles = new Articles();
  my.articles.sortPublishDate();

  for( var ii = 0; ii < my.articles.articleData.length; ii++) {
    my.$anchor.append(my.articles.toHtml(ii));
  }

  return my;
}
);
