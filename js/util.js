function Util() {

  this.navigation = function() {

  //   $('#site-Nav-filterArticles').click(
  //   function () {
  //     $('#filterList',this).slideDown(200);
  //   }
  // );

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
