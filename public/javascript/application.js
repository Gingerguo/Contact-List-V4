$(document).ready(function(){

  $("<section class='add-section'></section>").appendTo($('body'));
  $(".add-section").empty();
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

   var loadList = function(results){
     $(".list-section").empty();
     results.forEach(function(entry){
       $('.list-section').append("<div class='each-list' id='"+entry.id+"'>" +entry.firname+"  "+entry.lasname+"  " +entry.email+"  "+"<span class='edit-bar'><button class='button-e'>Edit</button><button class='button-d'>Delete</button></span></div>");
       $('.edit-bar').css("display", "none");
     });
   };

  $('#show-all').on("click", function(){
    $.ajax({
      url:"/show",
      method: "GET",
      success: loadList
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
    $(".edit-section").empty();
    var $arr = $(this).parent().parent().text().split("  ");
    var $entry_id = $(this).parent().parent().attr("id");
    var $firstname = $arr[0];
    var $lastname = $arr[1];
    var $email = $arr[2];
    $(".edit-section").append(
    $("<form id='myForm'/>",{
      action: '/edit',
      method: 'POST'
    }).append(
      $("<input/>", {
        type: 'hidden',
        name: 'contact_id',
        value: $entry_id
      }),$("<br/>"),
      $("<input/>",{
        type: 'text',
        id: 'cfirname',
        name: 'firstname',
        value: $firstname
      }),$("<br/>"),
      $("<input/>", {
        type: 'text',
        id: 'clasname',
        name: 'lastname',
        value: $lastname
      }),$("<br/>"),
      $("<input/>",{
        type: 'text',
        id: 'cemail',
        name: 'email',
        value: $email
      }), $('<br/>'),
      $('<input/>',{
        type: 'submit',
        id: 'submit',
        value: 'Submit'
      })
    )
  );
    submitFunc();
  });

  function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });
    return json;
  }

  var submitFunc = function(){ $("#myForm").on('submit', function(ev){
    ev.preventDefault();
    // do validations
    data = ConvertFormToJSON('#myForm');
    // do ajax call
    updateContact(data, function(results){
        loadList(results);
    });
  });
};

    function updateContact(user_data, _done){
      $.ajax({
        url: '/edit',
        method: 'POST',
        data: user_data,
        success: _done
      });
    }

  $('.list-section').on('click', '.button-d', function(){ //delete

  });
});
