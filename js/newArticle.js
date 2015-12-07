function NewArticle() {
  this.$articleTitle = $('#articleTitle');
  this.$articleCategory = $('#articleCategory');
  this.$articleAuthor = $('#articleAuthor');
  this.$articleAuthorURL = $('#articleAuthorUrl');
  this.$articleBody = $('#articleBody');
  this.$htmlRaw = $('#htmlRaw');
  this.$htmlRawOutput = $('#htmlRawOutput');
  this.$livePreview = $('#livePreview');
  this.$jsonObject = $('#jsonObject');
  this.articleToBePublished = {};

  this.render = function() {
      /**** Get Values From Text Inputs ****/
      console.log(this.$articleTitle.val()+ "render");
      var titleValue = this.$articleTitle.val();
      var categoryValue = this.$articleCategory.val();
      var authorValue = this.$articleAuthor.val();
      var authorUrlValue = this.$articleAuthorURL.val();
      var bodyValue = this.$articleBody.val();

      /**** Marked Values ****/
      var markBody = marked(bodyValue);

      /**** Create New Article Object ****/
      var currentDate = new Date();
      console.log(currentDate);
      this.articleToBePublished.title = titleValue;
      this.articleToBePublished.category = categoryValue;
      this.articleToBePublished.author = authorValue;
      this.articleToBePublished.authorURL = authorUrlValue;
      this.articleToBePublished.publishedOn = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + (currentDate.getDate());
      this.articleToBePublished.body = markBody;
      this.articleToBePublished.DaysPublishedAgo = parseInt((new Date() -
      new Date(this.articleToBePublished.publishedOn))/60/60/24/1000);

      /**** Live preview of what article will look on blog ****/
      var handleBarTemplate = Handlebars.compile($('#handleBarTemplate').html());
      var articleToHtml = handleBarTemplate(this.articleToBePublished);
      this.$livePreview.html(articleToHtml);
      this.$livePreview.find('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });

      /**** HTML RAW OUTPUT ****/
      this.$htmlRawOutput.text(articleToHtml);

      /**** JSON string that will be able to be put in rawData ****/
      var jsonString = this.$jsonObject.text(JSON.stringify(this.articleToBePublished));
    }

    this.addEventListener = function() {
      var $articleTitleChanged = this.$articleTitle;
       $articleTitleChanged.on('input', function() {
         this.$articleTitle = $(this).val();
         article.new.render();
       });
       var $articleAuthorChanged = this.$articleAuthor;
        $articleAuthorChanged.on('input', function() {
          this.$articleAuthor = $(this).val();
          article.new.render();
        });
        var $articleAuthorURLChanged = this.$articleAuthorURL;
         $articleAuthorURLChanged.on('input', function() {
           this.$articleAuthorURL = $(this).val();
           article.new.render();
         });
         var $articleBodyChanged = this.$articleBody;
          $articleBodyChanged.on('input', function() {
            this.$articleBody = $(this).val();
            article.new.render();
          });
    }
  }

var article = {};

$(function() {

  article.new = new NewArticle();
  article.new.render();
  article.new.addEventListener();


});
