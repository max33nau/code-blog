var controller = {};

controller.showAboutMe= function() {
  $('#AboutMe').show();
  $('#blog_articles').hide();
  $('#site-Nav-filterArticles').hide();
};

controller.showAllArticles = function()  {
  $('#AboutMe').hide();
  $('#blog_articles').show();
  $('.article').show();
  $('#site-Nav-filterArticles').show();
};

controller.showSearchBar = function() {
  $('#filterList','#site-Nav-filterArticles').slideDown(200);
};

controller.showSpecificAuthorArticles = function(ctx) {
  webDatabase.defer();
  console.log(ctx.params.authorName);
  $('.author').find('.authorSpan').each(function() {
    var $author = $(this);
    if($author.text() !== ctx.params.authorName) {
      $author.closest('.article').hide();
    } else {
      $author.closest('.article').show();
    }
  });
};
