function Util() {
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

  this.filterAuthors = function() {
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

  this.filterCategory = function() {
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
