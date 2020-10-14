$(document).ready (function() {
  var alreadyFilled = false;
    var state;
  async function hi(){ 
 
       await fetch('data/state.json')
  .then(function(resp){
    return resp.json();
  })
  .then(function(data){
state=data;
    console.log(data);
  }
  );

initDialog();}
 function initDialog() {

      clearDialog();
      for (var i = 0; i < state.length; i++) {
          $('.dialog').append('<div>' + state[i].name + '</div>');
      }
  }
  function clearDialog() {
      $('.dialog').empty();
  }
  $('.autocomplete input').click(function() {
      if (!alreadyFilled) {
          $('.dialog').addClass('open');

      }

  });
  $('body').on('click', '.dialog > div', function() {
      $('.autocomplete input').val($(this).text()).focus();
      $('.autocomplete .close').addClass('visible');
      alreadyFilled = true;
  });
  $('.autocomplete .close').click(function() {
      alreadyFilled = false;
      $('.dialog').addClass('open');
      $('.autocomplete input').val('').focus();
      $(this).removeClass('visible');
  });

  function match(str) {
      str = str.toLowerCase();
      clearDialog();
      for (var i = 0; i < state.length; i++) {
          if (state[i].name.toLowerCase().startsWith(str)) {
              $('.dialog').append('<div>' + state[i].name + '</div>');
          }
      }
  }
  $('.autocomplete input').on('input', function() {
      $('.dialog').addClass('open');
      alreadyFilled = false;
      match($(this).val());
  });
  $('body').click(function(e) {
      if (!$(e.target).is("input, .close")) {
          $('.dialog').removeClass('open');
      }
  });
hi();
  
});