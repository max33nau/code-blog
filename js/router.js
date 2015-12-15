page.base('/');

page('aboutme', controller.showAboutMe);
page('articles', controller.showAllArticles);
page('articles/search', controller.showSearchBar);
page('articles/search/:authorName', controller.showSpecificAuthorArticles);

page();
