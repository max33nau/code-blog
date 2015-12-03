function Util() {
  this.expand = function() {
    var $expand = $('.expand');
    $expand.css('cursor', 'e-resize');
    $expand.click(function(){
      var $self = $(this);
      $self.parent().siblings().show();
      $self.hide();
      console.log($self.parent().siblings());
    });
  };
/* CURSOR RESISE USING CSS */
  this.hide = function() {
    var $hide = $('.hide');
    $hide.css('cursor', 'w-resize');
    $hide.click(function(){
      $('html,body').animate( {scrollTop: $(this).closest('.article').offset().top}, 400);
      var $self = $(this);
      $self.parent().parent().children(':first-child').children().show();
      $self.parent().parent().children().not(':first-child').hide();
    });
  };

  this.navigation = function() {
  /*  $('#filter').hover(
    function () {
      $('#navFilter', this).stop().slideDown(100);
    },
    function () {
      $('#navFilter', this).stop().slideUp(100);
    }
  );*/

    $('#filter').click(
    function () {
      console.log('work');
      $('#navFilter',this).slideDown(200);

    }
  );

    $('#closeNavFilter').click(
    function(e) {
      console.log('here');
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
  };

  this.filterAuthors = function() {
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

  this.filterCategory = function() {
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
