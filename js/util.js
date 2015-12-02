function Util() {

  this.expand = function() {
   var $expand = $('.expand');
   $expand.click(function(){
      var $self = $(this);
      $self.parent().siblings().show();
      $self.hide();
      console.log($self.parent().siblings());
    });
  }

  this.hide = function() {
    var $hide = $('.hide');
    $hide.click(function(){
      var $self = $(this);
      $self.parent().parent().children(':first-child').children().show();
      $self.parent().parent().children().not(':first-child').hide();
    });
  }
}
