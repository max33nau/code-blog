page.base('/');

page('aboutme', showAboutMe);
page('articles', showAllArticles);
page('articles/search', showSearchBar);
page('home', runPages);
page('articles/search/:authorName', showSpecificAuthorArticles);

page();


function showAboutMe() {
  $('#AboutMe').show();
  $('#blog_articles').hide();
  $('#site-Nav-filterArticles').hide();
}

function showAllArticles() {
  $('#AboutMe').hide();
  $('#blog_articles').show();
  $('.article').show();
  $('#site-Nav-filterArticles').show();
}

function showSearchBar() {

  $('#filterList','#site-Nav-filterArticles').slideDown(200);

}

function showSpecificAuthorArticles(ctx) {
  webDatabase.defer();
  console.log(ctx.params.authorName);
  $('.author').find('.authorSpan').each(function() {
    var $author = $(this);
    if($author.text() !== ctx.params.authorName) {
      $author.closest('.article').hide();
    } else {
      $author.closest('.article').show();
    }
  });
}

function runPages() {
  /*** First Callback function on page, connects to database and then sets up tables ***/
  webDatabase.init();
  webDatabase.setupTables();

  /*** Compiles Template that will be used for each article ***/
  $.get('templates/articleTemplate.html', function(articleTemplate) {
    my.handleBarTemplate = Handlebars.compile(articleTemplate);
  });

  my.ajax.getJSONhead().done(function(data,server,xhr){
    my.eTag = xhr.getResponseHeader('eTag');

    if(my.eTag !== localStorage.getItem('uniqueEtag')) {
      localStorage.setItem('uniqueEtag', my.eTag);
  /*** Happens when first etag doesn't exist or is new ***/
      my.ajax.getUpdatedJSONdata().done(function() {
        console.log('Data Loaded');
      });
      my.ajax.getJSONdata().fail(function(){
        console.log('you failed on getting JSON data');
      });
    } else {
      my.ajax.getJSONdata();
    }
  });
  my.ajax.getJSONhead().fail(function(){
    console.log('you failed on getting JSON head');
  });

}
