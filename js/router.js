page.base('/');
$(function() {

  page('/',controller.loadData);
  page('articles',controller.loadData);
  page('aboutme', view.showAboutMe);
  page('articles/search', view.showSearchBar);
  page('articles/search/author/:author', controller.searchingForAuthor);
  page('articles/search/category/:category', controller.searchingForCategory);
  page('articles/search/article/:title', controller.searchingForTitle);
  page();

});

/***** ALL CALLBACK PAIRS ARE IN THE articleController.js FILE becuase it made more
sense to throw all the new functions in there instead of adding old functions to the
articleController.js, easier to find and sort.  *****/
