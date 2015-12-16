/**** VIEW RELATING TO ABOUT ME AND REPOS ****/
view.showAboutMe= function() {
  $('#AboutMe').show();
  $('#blog_articles').hide();
  $('#site-Nav-filterArticles').hide();
};


/**** VIEW RELATING TO ARTICLES ****/
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

//VIEWING OPTIONS FOR NAV BAR
function Util() {

  this.navigation = function() {

    $('#closeNavFilter').click(
    function(e) {
      $('#filterList').slideUp(200);
      e.stopPropagation();
    }
   );

    $('.searchList-item').hover(
    function () {
      $('#authorFilter', this).stop().slideDown(100);
    },
    function () {
      $('#authorFilter', this).stop().slideUp(100);
    }
  );

    $('.searchList-item').hover(
    function () {
      $('#categoryFilter', this).stop().slideDown(100);
    },
    function () {
      $('#categoryFilter', this).stop().slideUp(100);
    }
  );

    $('#navArticles').click(function() {
      history.pushState({},'article','articles');
      $('#AboutMe').hide();
      $('#blog_articles').show();
      $('.article').show();
      $('#site-Nav-filterArticles').show();
    });

    $('#blog_articles').click(function(e) {
      e.stopPropagation();
      $('#filterList').stop().slideUp(200);
    });
  };

  this.filterByAuthor = function() {
    var $authorClicked = $('.search-author-name');
    $authorClicked.click(function() {
      var $textValue = $(this).text();
      history.pushState({},'author','articles/search/author/'+$textValue);
      $('.author').find('.authorSpan').each(function() {
        var $author = $(this);
        if($author.text() !== $textValue) {
          $author.closest('.article').hide();
        } else {
          $author.closest('.article').show();
        }
      });
    });
  };

  this.filterByTitle = function() {
    var $titleClicked = $('.articleTitle');
    $titleClicked.click(function() {
      var $textValue = $(this).text();
      history.pushState({},'title','articles/search/article/'+$textValue);
      $('.articleTitle').each(function() {
        var $title = $(this);
        if($title.text() !== $textValue) {
          $title.closest('.article').hide();
        } else {
          $title.closest('.article').show();
        }
      });
    });
  };

  this.filterByCategory = function() {
    var $categoryClicked = $('.search-category-subject');
    $categoryClicked.click(function() {
      var $textValue = $(this).text();
      history.pushState({},'category','articles/search/category/'+$textValue);
      $('.category').each(function() {
        var $category = $(this);
        if($category.text() !== $textValue) {
          $category.closest('.article').hide();
        } else {
          $category.closest('.article').show();
        }
      });
    });
  };
}
