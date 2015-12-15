var controller = {};

controller.loadData = function() {

  console.log('load Data', my.dataIsLoaded);
  my.initialize();
};

controller.showAboutMe= function() {
  $('#AboutMe').show();
  $('#blog_articles').hide();
  $('#site-Nav-filterArticles').hide();
};

controller.showAllArticles = function()  {
  controller.loadData();
  $('#AboutMe').hide();
  $('#blog_articles').show();
  $('.article').show();
  $('#site-Nav-filterArticles').show();

};

controller.showSearchBar = function() {
  $('#filterList','#site-Nav-filterArticles').slideDown(200);
};

controller.showSpecificAuthorArticles = function(authorName) {
//  console.log(authorName);
  $('.author').find('.authorSpan').each(function() {
    var $author = $(this);
    if($author.text() !== authorName) {
      $author.closest('.article').hide();
    } else {
      $author.closest('.article').show();
    }
  });
};

controller.showSpecificCategoryArticles = function(category) {
  //console.log('here',category);
  $('.category').each(function() {
    var $category = $(this);
    if($category.text() !== category) {
      $category.closest('.article').hide();
    } else {
      $category.closest('.article').show();
    }
  });
};

controller.showSpecificArticleTitle = function(specificArticleTitle) {
  $('.articleTitle').each(function() {
    var $title = $(this);
    if($title.text() !== specificArticleTitle) {
      $title.closest('.article').hide();
    } else {
      $title.closest('.article').show();
    }
  });
};

controller.searchingForAuthor = function(ctx) {
  my.lookingforAuthorName = ctx.params.author;
  controller.loadData();
};

controller.searchingForCategory = function(ctx){
  my.lookingforCategorySubject = ctx.params.category;
  controller.loadData();
};

controller.searchingForTitle = function(ctx){
  my.lookingForArticleTitle = ctx.params.title;
  controller.loadData();
};
