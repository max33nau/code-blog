/**** OBJECT RELATING TO GITHUB API ****/
githubAPI.ajaxRequestInfo = function() {
  $.ajax({
    url: 'https://api.github.com/users/max33nau/repos',
    type: 'GET',
    dataType: 'JSON',
    data: 'Authorization token '+ mySecretToken,
    success: githubAPI.showInfo,
  });
};

githubAPI.showInfo = function(xhr) {
  console.log(xhr);
};

githubAPI.ajaxRequestInfo();
