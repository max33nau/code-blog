// VIEW

view.showAboutMe= function() {
  $('#AboutMe').show();
  $('#blog_articles').hide();
  $('#site-Nav-filterArticles').hide();
};

view.showSpecificAuthorArticles = function(authorName) {
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

view.showSpecificCategoryArticles = function(category) {
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

view.showSpecificArticleTitle = function(specificArticleTitle) {
  $('.articleTitle').each(function() {
    var $title = $(this);
    if($title.text() !== specificArticleTitle) {
      $title.closest('.article').hide();
    } else {
      $title.closest('.article').show();
    }
  });
};

view.showSearchBar = function() {
  $('#filterList','#site-Nav-filterArticles').slideDown(200);
};
