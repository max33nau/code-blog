page.base('/');

page('aboutme', controller.showAboutMe);
page('articles', controller.showAllArticles);
page('articles/search', controller.showSearchBar);
page('articles/search/author/:author', controller.searchingForAuthor);
page('articles/search/category/:category', controller.searchingForCategory);
page('articles/search/article/:title', controller.searchingForTitle);

page();
