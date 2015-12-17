/**** OBJECT RELATING TO GITHUB API ****/
githubAPI.ajaxRequestInfo = function(aboutme) {
  if (aboutme) {
    $.ajax({
      url: 'https://api.github.com/users/max33nau/repos',
      type: 'GET',
      dataType: 'JSON',
      data: 'Authorization token '+ mySecretToken,
      success: githubAPI.generateMyGitHubInfo,
    });
  } else {
    $.ajax({
      url: 'https://api.github.com/users/max33nau/repos',
      type: 'GET',
      dataType: 'JSON',
      data: 'Authorization token '+ mySecretToken,
      success: githubAPI.generateButDoNotShow,
    });
  }
};

githubAPI.generateMyGitHubInfo = function(data) {
  console.log(data);
  $myGithubInfo = $('#myGithubInfo');
  $myGithubInfo.append('<h1> My Github Information </h1> <h3> Username:'+
  ' <a href=https://github.com/max33nau target="_blank"> @max33nau </a>'+
  ' </h3> <p> Below is a list of the Repositories I have created on Github. '+
  'Each repo name is a link to that repo. If you like what you see on the github repo page, '+
  'please click the star in upper right corner of the page. Thanks. <h3> Current Repositories: </h3> <ul id="repos"> </ul> ');
  $repos = $('#repos');
  data.forEach(function(object){
    $repos.append('<li class="repoName"> <a class="repoURL" href='+object.html_url+'> '+
    object.full_name+'</a> <ul class="repoDescription"> <li> Language: '+object.language+'</li> <li> Private: '+
    object.private+'</li> <li> Last Updated: '+ object.pushed_at+' </li> </ul></li>');
  });
  view.showAboutMe(); // THIS IS THE HUGE DIFFERANCE BETWEEN THE TWO FUNCTIONS AND IS NECESSARY
};

githubAPI.generateButDoNotShow = function(data) {
  console.log(data);
  $myGithubInfo = $('#myGithubInfo');
  $myGithubInfo.append('<h1> My Github Information </h1> <h3> Username:'+
  ' <a href=https://github.com/max33nau target="_blank"> @max33nau </a>'+
  ' </h3> <p> Below is a list of the Repositories I have created on Github. '+
  'Each repo name is a link to that repo. If you like what you see on the github repo page, '+
  'please click the star in upper right corner of the page. Thanks. <h3> Current Repositories: </h3> <ul id="repos"> </ul> ');
  $repos = $('#repos');
  data.forEach(function(object){
    $repos.append('<li class="repoName"> <a class="repoURL" href='+object.html_url+'> '+
    object.full_name+'</a> <ul class="repoDescription"> <li> Language: '+object.language+'</li> <li> Private: '+
    object.private+'</li> <li> Last Updated: '+ object.pushed_at+' </li> </ul></li>');
  });
};
