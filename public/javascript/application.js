$(document).ready(function(){

  $("<section class='add-section'></section>").appendTo($('body'));

  $(".add-section").append(
    $("<h3/>").text("Contact Form"), $("<p/>").text("This is my form. Please fill it out. It's awesome!"), $("<form/>",{
      action: '/create',
      method: 'POST'
    }).append(
      $("<input/>", {
        type: 'text',
        id: 'cfirname',
        name: 'firstname',
        placeholder: 'Your first name'
      }),$("<br/>"),
      $("<input/>", {
        type: 'text',
        id: 'clasname',
        name: 'lastname',
        placeholder: 'Your last name'
      }),$("<br/>"),
      $("<input/>",{
        type: 'text',
        id: 'cemail',
        name: 'email',
        placeholder: 'Email'
      }), $('<br/>'), $('<input/>',{
        type: 'submit',
        id: 'submit',
        value: 'Submit'
      })
    ));

  $("<button id='show-all'>Show my contacts</button>").appendTo($("body"));
  $("<section class='list-section'></section>").appendTo($('body'));
  $("<section class='edit-section'></section>").appendTo($('body'));

  $('#show-all').on("click", function(){
    $(".list-section").empty();
    $.ajax({
      url:"/show",
      method: "GET",
      success: function(results){
        results.forEach(function(entry){
          $('.list-section').append("<div class='each-list' id='"+entry.id+"'>" + entry.firname+ "   "+ entry.lasname+ "   "+ entry.email+ "<span class='edit-bar'><button class='button-e'>Edit</button><button class='button-d'>Delete</button></span></div>");
          $('.edit-bar').css("display", "none");
        });
      }
    });
  });

  $('.edit-section').append($("<div id='show-detail'></div>"));
    $('.each-list').on("click", function(){
      $id = $(this).attr("id");
      $('.edit-detail').fadeIn();
    });

  $('.list-section').on("click", ".each-list", function(){
    $id = $(this).attr("id");
    $(this).find(".edit-bar").show();
  });

  $('.list-section').on('click', '.button-e', function(){
    $('.edit-section').append(
      $("<input/>", {
        type: 'hidden',
        name: 'contact_id'
      }),$("<br/>"),
      $("<input/>",{
        type: 'text',
        id: 'cfirname',
        name: 'firstname',
        placeholder: 'Your first name'
      }),$("<br/>"),
      $("<input/>", {
        type: 'text',
        id: 'clasname',
        name: 'lastname',
        placeholder: 'Your last name'
      }),$("<br/>"),
      $("<input/>",{
        type: 'text',
        id: 'cemail',
        name: 'email',
        placeholder: 'Email'
      }), $('<br/>'),
      $('<input/>',{
        type: 'submit',
        id: 'submit',
        value: 'Submit'
      })
    );
    $.ajax({
      url: '/edit',
      method: 'POST',
      data: {

      },
      success: function(entry){
        $('.list-section').append("<div class='each-list' id='"+entry.id+"'>" + entry.firname+ "   "+ entry.lasname+ "   "+ entry.email);
      }
    });
  });

  $('.list-section').on('click', '.button-d', function(){
    
  });
});
