function Util() {

  this.expand = function() {
   var $expand = $('.expand');
    $expand.click(function(){
      $(this).parent().siblings().show();
      $(this).hide();
      console.log($(this).parent().siblings());
    });
  }

  this.hide = function() {
    var $hide = $('.hide');
     $hide.click(function(){
     $(this).parent().parent().children(':first-child').children().show();
     $(this).parent().parent().children().not(':first-child').hide();

      // console.log(x);
     });

  }

}
