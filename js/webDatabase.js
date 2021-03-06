var webDatabase = { };
webDatabase.sqlResult = null;

webDatabase.verbose = function (verbose) {
  var message;
  if(verbose) {
    html5sql.logInfo = true;
    html5sql.logErrors = true;
    html5sql.putSelectResultsInArray = true;
    message = 'html5sql verbosity off';
  }
  console.log(message);
};

webDatabase.init = function() {
  try {
    if(openDatabase) {
      webDatabase.verbose(true);
      webDatabase.connect('blog_Database','my blog database', 5*1024*1024);
    } else {
      console.log('Web Databases Not Supported, sorry');
    }
  } catch (e) {
    console.error('Error occured during database init. Looks like this web database may not be supported');
  }
};

webDatabase.connect = function(database,title,size) {
  html5sql.openDatabase(database,title,size);
};

webDatabase.setupTables = function() {
  html5sql.process('CREATE TABLE IF NOT EXISTS Blog_Articles (id INTEGER PRIMARY KEY, ' +
  'title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, authorUrl VARCHAR(255),' +
  'category VARCHAR(20),publishedOn DATETIME, DaysPublishedAgo INTEGER, body TEXT NOT NULL);',
  function() {
    // on success
    console.log('Success Setting Up Table');
  } );
};

webDatabase.getJSONobjectOfArticles = function(path) {
  $.getJSON(path, webDatabase.insertAllArticles);
};

webDatabase.insertAllArticles = function(updatedArticle) {

  updatedArticle.forEach(webDatabase.insertArticle);

};

webDatabase.insertArticle = function(articleData) {
  html5sql.process(
    [
      {
        'sql': 'INSERT INTO Blog_Articles (title, author, authorUrl, category, publishedOn, DaysPublishedAgo, body)' +
          'VALUES (?,?,?,?,?,?,?);',
        'data': [ articleData.title, articleData.author, articleData.authorURL, articleData.category, articleData.publishedOn, articleData.DaysPublishedAgo, articleData.body],
      },
    ],
    function() {
      //console.log('Success inserting record for ', articleData.title);
    }
  );
};

webDatabase.defer = function (callback) {
  callback = callback || function() {};
  html5sql.process(
    'SELECT * FROM articles WHERE 0=1;',
    function (tx, result, resultArray) {
      callback(resultArray);
    }
  );
};


webDatabase.execute = function(sql, callback) {
  callback = callback || function() {};
  html5sql.process(
    sql,
    function (tx,result,resultArray) {
      callback(resultArray);
    }
  );
};
