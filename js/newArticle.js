
$(function() {
  var $articleTitle = $('#articleTitle');
  var $articleCategory = $('#articleCategory');
  var $articleAuthor = $('#articleAuthor');
  var $articleBody = $('#articleBody');
  var $htmlRawOutput = $('#htmlRawOutput');
  var $livePreview = $('#livePreview');
  var $jsonObject = $('#jsonObject');
  var newArticle = {};

  function render() {

    /**** Get Values From Text Inputs ****/
    var titleValue = $articleTitle.val();
    var categoryValue = $articleCategory.val();
    var authorValue = $articleAuthor.val();
    var bodyValue = $articleBody.val();

    /**** Marked Body Value ****/
    var markBody = marked(bodyValue);

    /**** Create New Article Object ****/
    var currentDate = new Date();
    console.log(currentDate);
    newArticle.title = titleValue;
    newArticle.category = categoryValue;
    newArticle.author = authorValue;
    newArticle.publishedOn = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + (currentDate.getDate());
    newArticle.body = markBody;
    newArticle.DaysPublishedAgo = parseInt((new Date() -
    new Date(newArticle.publishedOn))/60/60/24/1000);

    /**** Live preview of what article will look on blog ****/
    var handleBarTemplate = Handlebars.compile($('#handleBarTemplate').html());
    var articleToHtml = handleBarTemplate(newArticle);
    $livePreview.html(articleToHtml);

    /**** JSON string that will be able to be put in rawData ****/
    var jsonString = $jsonObject.text(JSON.stringify(newArticle));
  }

  $articleTitle.on('input', render);
  $articleCategory.on('input', render);
  $articleAuthor.on('input', render);
  $articleBody.on('input', render);

  render();
});
