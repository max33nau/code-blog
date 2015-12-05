$(function() {
  var $articleTitle = $('#articleTitle');
  var $articleCategory = $('#articleCategory');
  var $articleAuthor = $('#articleAuthor');
  var $articleBody = $('#articleBody');
  var $htmlRawOutput = $('#htmlRawOutput');
  var $markdownOutput = $('#markdownOutput');
  var $json = $('#json');
  var jsonObject = {};

  function render() {
    var titleValue = $articleTitle.val();
    var categoryValue = $articleCategory.val();
    var authorValue = $articleAuthor.val();
    var bodyValue = $articleBody.val();

    var convertBody = marked(bodyValue);
    $htmlRawOutput.text(convertBody);
    $markdownOutput.html(convertBody);

    var currentDate = new Date();
    console.log(currentDate);
    jsonObject.title = titleValue;
    jsonObject.category = categoryValue;
    jsonObject.author = authorValue;
    jsonObject.publishedOn = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + (currentDate.getDay()-1);
    jsonObject.body = convertBody;

    var jsonString = $json.text(JSON.stringify(jsonObject));
  }

  $articleTitle.on('input', render);
  $articleCategory.on('input', render);
  $articleAuthor.on('input', render);
  $articleBody.on('input', render);

  render();
});
