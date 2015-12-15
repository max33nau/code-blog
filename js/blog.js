/*** CONVERTS JSON DATA TO ARTICLE OBJECT ***/
function Data (rawData) {
  this.title = rawData.title;
  this.category = rawData.category;
  this.author = rawData.author;
  this.authorURL = rawData.authorUrl;
  this.publishedOn = rawData.publishedOn;
  this.DaysPublishedAgo = parseInt((new Date() -
  new Date(rawData.publishedOn))/60/60/24/1000);
  this.convertMarkDown = function() {
    var body;
    if(rawData.body) {
      body= rawData.body;
    } else if (!rawData.body) {
      body = marked(rawData.markdown);
    } else {
      console.log('Not Here');
    }
    return body;
  };
  this.body = this.convertMarkDown();
};

/*** CONSTRUCTOR OBJECT USED FOR BLOG DEVELOPMENT ***/
function Blog() {
  this.article = [];

  this.updateDatabase = function(dataForDatabase) {
    webDatabase.execute('DELETE FROM Blog_Articles',function() {
      console.log('wiped database clean');
    });
    webDatabase.insertAllArticles(dataForDatabase);
  };

  this.selectArticlesFromDatabase = function() {
    webDatabase.execute('SELECT * FROM Blog_Articles ORDER BY DaysPublishedAgo ASC', my.blog.showArticlesOnBlog);
  };

  this.showArticlesOnBlog = function(myArticles) {
    var articles = myArticles;
    //console.log("Async: Near top of showArticles(): articles="+articles);
    $.each(articles, function(i,eachArticle) {
      my.articleToHtml = my.handleBarTemplate(eachArticle);
      my.$anchor.append(my.articleToHtml);
    });
    /**** Truncate Paragraphs and Add 'Read More' and 'Hide' to Paragraphs ****/
    my.blog.manipulateArticleBodyParagraphs();
    my.blog.expand();
    my.blog.hide();
    $('pre code').each(function(i,block){
      hljs.highlightBlock(block);
    });
    my.util.filterByTitle();
    if(my.lookingForArticleTitle) {
      controller.showSpecificArticleTitle(my.lookingForArticleTitle);
    }
  };

  this.generateObjectArray = function(rawData) {
    for(var ii = 0; ii < rawData.length; ii++) {
      this.article.push(new Data(rawData[ii]));
    }
  };

  this.addAuthorNamestoNav = function() {
    webDatabase.execute('SELECT DISTINCT author FROM Blog_Articles ORDER BY author ASC;', my.blog.authorSubject);
  };

  this.addCategorySubjectstoNav = function() {
    webDatabase.execute('SELECT DISTINCT category FROM Blog_Articles ORDER BY category ASC;', my.blog.categorySubject);
  };

  this.authorSubject = function(author) {
    var $authorFilter = $('#authorFilter');
    $.each(author, function(i,object) {
      $authorFilter.append('<li class="search-author-name">' + object.author + '</li>');
    });
    my.util.filterByAuthor();
    if(my.lookingforAuthorName) {
      controller.showSpecificAuthorArticles(my.lookingforAuthorName);
    }
  };

  this.categorySubject = function(category) {
    var $categoryFilter = $('#categoryFilter');
    $.each(category, function(i,object) {
      $categoryFilter.append('<li class="search-category-subject">' + object.category + '</li>');
    });
    my.util.filterByCategory();
    if(my.lookingforCategorySubject) {
      controller.showSpecificCategoryArticles(my.lookingforCategorySubject);
    }
    my.dataIsLoaded = true;
    console.log('load Data init', my.dataIsLoaded);

  };

  this.manipulateArticleBodyParagraphs = function() {
    var $generateBody = $('.article-body').each(function(){
      var $self = $(this);
      $self.children().hide();
      $self.find('p:first').append('<span class="expand"> Read More --> </span>');
      $self.find(':last-child').append('<span class="hide"> Hide <-- </span>');
      $self.find('p:first').show().prevUntil('p:first').show();
      $self.find('.hide').hide();
    });
  };

  this.expand = function() {
    var $expand = $('.expand');
    $expand.css('cursor', 'e-resize');
    $expand.click(function(){
      var $self = $(this);
      $self.parent().siblings().stop().slideDown(300);
      $self.parent().siblings().find('.hide').show();
      $self.hide();
    });
  };

  this.hide = function() {
    var $hide = $('.hide');
    $hide.css('cursor', 'w-resize');
    $hide.click(function(){
      $('html,body').animate( {scrollTop: $(this).closest('.article-body').parent().offset().top}, 400);
      var $self = $(this);
      $self.parent().hide();
      $self.parent().siblings().nextUntil('p:first').not('p:first').stop().slideUp(200);
      $self.parent().siblings().find('.expand').show();
    });
  };
}

function Ajax() {
  this.getJSONhead = function() {
    return $.ajax({
      type: 'HEAD',
      url: 'blogArticles.json'
    });
  };

  this.getUpdatedJSONdata = function() {
    return $.getJSON('blogArticles.json', my.changedJSONdata);
  };

  this.getJSONdata = function() {
    return $.getJSON('blogArticles.json', my.processJSONarticles);
  };

}

var my = {};

$(function() {
  my.changedJSONdata = function(data) {
    my.blog.generateObjectArray(data);
    my.blog.updateDatabase(my.blog.article);
    my.processJSONarticles();
  };

  my.processJSONarticles = function() {
    //console.log(my.lookingforAuthorName);
    my.blog.selectArticlesFromDatabase();
    my.blog.addAuthorNamestoNav();
    my.blog.addCategorySubjectstoNav();

    /**** Add Functionality to Main Nav Bar and Create Filter Ability ****/
    my.util.navigation();
  };

my.initialize = function() {

  /**** Initialize Objects ****/
  my.$anchor = $('#blog_articles');
  my.util = new Util();
  my.blog = new Blog();
  my.ajax = new Ajax();
  my.eTag;
  my.articleData;

  // $.ajax({
  //   url: 'https://api.hithub.com',
  //   type: 'GET',
  //   dataType: 'JSON',
  //   data: 'Authorization: token 5e0f83be0ab21a970dae99f4194d52e1c75cc17e',
  //   success: function to run next,
  // });


/*** First Callback function on page, connects to database and then sets up tables ***/
  webDatabase.init();
  webDatabase.setupTables();

/*** Compiles Template that will be used for each article ***/
  $.get('templates/articleTemplate.html', function(articleTemplate) {
    my.handleBarTemplate = Handlebars.compile(articleTemplate);
  });

/*** Check the JSON object head to see if JSON object has been updated.  ***
 *** Once done begin to check if etag is the same as previous etag or if ***
 *** it even existed.                                                    ***/
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

};

  return my;

}
);
