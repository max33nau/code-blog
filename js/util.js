function Util() {
  this.manipulateArticleBodyParagraphs = function() {
    var $generateBody = $('.article-body').each(function(){
      var $self = $(this);
      $self.find('p').not(':first').hide();
      $self.find('p:first').append('<span class="expand"> Read More --> </span>');
      $self.find('p:last').append('<span class="hide"> Hide <-- </span>');
    });
  };

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

    $('#filter').click(
    function () {
      $('#navFilter',this).slideDown(200);
    }
  );

    $('#closeNavFilter').click(
    function(e) {
      $('#navFilter').slideUp(200);
      e.stopPropagation();
    }
   );

    $('.filterSubjects').hover(
    function () {
      $('#authorFilter', this).stop().slideDown(100);
    },
    function () {
      $('#authorFilter', this).stop().slideUp(100);
    }
  );

    $('.filterSubjects').hover(
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
      $('#filter').hide();
    });

    $('#navArticles').click(function() {
      $('#AboutMe').hide();
      $('.article').show();
      $('#filter').show();
    });

    $('.article').click(function() {
      $('#navFilter').slideUp(200);
    });

  };

  this.filterByAuthor = function() {
    var $authorClicked = $('.authorName');
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
    var $categoryClicked = $('.categorySubject');
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
