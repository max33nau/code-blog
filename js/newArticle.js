$(function() {
  var $articleTitle = $('#articleTitle');
  var $articleCategory = $('#articleCategory');
  var $articleAuthor = $('#articleAuthor');
  var $articleAuthorURL = $('#articleAuthorUrl');
  var $articleBody = $('#articleBody');
  var $htmlRaw = $('#htmlRaw');
  var $htmlRawOutput = $('#htmlRawOutput');
  var $livePreview = $('#livePreview');
  var $jsonObject = $('#jsonObject');
  var newArticle = {};

  function render() {
    var articleToHtml;
    var handleBarTemplate;

    /**** Get Values From Text Inputs ****/
    var titleValue = $articleTitle.val();
    var categoryValue = $articleCategory.val();
    var authorValue = $articleAuthor.val();
    var authorUrlValue = $articleAuthorURL.val();
    var bodyValue = $articleBody.val();

    /**** Marked Values ****/
    var markTitle = marked(titleValue);
    var markCategory = marked(categoryValue);
    var markAuthor = marked(authorValue);
    var markAuthorUrl = marked(authorUrlValue);
    var markBody = marked(bodyValue);

    /**** Create New Article Object ****/
    var currentDate = new Date();
    console.log(currentDate);
    newArticle.title = titleValue;
    newArticle.category = categoryValue;
    newArticle.author = authorValue;
    newArticle.authorURL = authorUrlValue;
    newArticle.publishedOn = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + (currentDate.getDate());
    newArticle.body = markBody;
    newArticle.DaysPublishedAgo = parseInt((new Date() -
    new Date(newArticle.publishedOn))/60/60/24/1000);

    /**** Live preview of what article will look on blog ****/
    $.get('templates/articleTemplate.html', function(articleTemplate) {
      handleBarTemplate = Handlebars.compile(articleTemplate);
      articleToHtml = handleBarTemplate(newArticle);
      $livePreview.html(articleToHtml);
      $livePreview.find('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
      /**** HTML RAW OUTPUT ****/
      $htmlRawOutput.text(articleToHtml);
    });



    /**** JSON string that will be able to be put in rawData ****/
    var jsonString = $jsonObject.text(JSON.stringify(newArticle));
  }

  $articleTitle.on('input', render);
  $articleCategory.on('input', render);
  $articleAuthor.on('input', render);
  $articleAuthorURL.on('input',render);
  $articleBody.on('input', render);

  render();
});
