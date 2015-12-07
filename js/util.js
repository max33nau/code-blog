function Util() {

  this.navigation = function() {

    $('#site-Nav-filterArticles').click(
    function () {
      $('#filterList',this).slideDown(200);
    }
  );

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

    $('#navAboutMe').click(function() {
      $('#AboutMe').show();
      $('.article').hide();
      $('#site-Nav-filterArticles').hide();
    });

    $('#navArticles').click(function() {
      $('#AboutMe').hide();
      $('.article').show();
      $('#site-Nav-filterArticles').show();
    });

    $('.article').click(function() {
      $('#filterList').slideUp(200);
    });

  };


  this.filterByAuthor = function() {
    var $authorClicked = $('.search-author-name');
    $authorClicked.click(function() {
      var $textValue = $(this).text();
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


  this.filterByCategory = function() {
    var $categoryClicked = $('.search-category-subject');
    $categoryClicked.click(function() {
      var $textValue = $(this).text();
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
