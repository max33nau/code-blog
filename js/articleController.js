
/**** OBJECT RELATED TO CALLBACKS IN ROUTER.JS ****/
controller.loadData = function() {
  console.log('load Data', my.dataIsLoaded);
  my.initialize();
};

controller.searchingForAuthor = function(ctx) {
  my.lookingforAuthorName = ctx.params.author;
  controller.loadData();
};

controller.searchingForCategory = function(ctx){
  my.lookingforCategorySubject = ctx.params.category;
  controller.loadData();
};

controller.searchingForTitle = function(ctx){
  my.lookingForArticleTitle = ctx.params.title;
  controller.loadData();
};
