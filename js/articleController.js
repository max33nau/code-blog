
/**** OBJECT RELATED TO CALLBACKS IN ROUTER.JS ****/
controller.loadData = function() {
//  console.log('load Data', my.dataIsLoaded);
  var aboutMe = false; // Need this so the view.showAboutMe doesn't get called in repoController.js
  my.initialize();
  githubAPI.ajaxRequestInfo(aboutMe);
};

controller.goToAboutMe = function() {
  aboutMe = true; 
  my.initialize();
  githubAPI.ajaxRequestInfo(aboutMe); // on repoController.js
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
