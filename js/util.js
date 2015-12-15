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

    // $('#navAboutMe').click(function() {
    //   $('#AboutMe').show();
    //   $('.article').hide();
    //   $('#site-Nav-filterArticles').hide();
    // });

    // $('#navArticles').click(function() {
    //   $('#AboutMe').hide();
    //   $('.article').show();
    //   $('#site-Nav-filterArticles').show();
    // });

    $('#blog_articles').click(function(e) {
      e.stopPropagation();
      $('#filterList').stop().slideUp(200);
    });

  };


  this.filterByAuthor = function() {
    var $authorClicked = $('.search-author-name');
    $authorClicked.click(function() {
      var $textValue = $(this).text();
      window.location = 'articles/search/author/'+$textValue;

    });
  };

  this.filterByCategory = function() {
    var $categoryClicked = $('.search-category-subject');
    $categoryClicked.click(function() {
      var $textValue = $(this).text();
      window.location = 'articles/search/category/'+$textValue;
    });
  };
}
