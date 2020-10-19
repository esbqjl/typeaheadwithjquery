$(document).ready (function() {
    var alreadyFilled = false;
      var state;
    async function hi(){ 
            await fetch('http://api.geonames.org/childrenJSON?geonameId=6252001&username=esbqjl')
    .then(function(resp){
      return resp.json();
    })
    .then(function(data){
  state=data;
      console.log(data);
    }
    ); initDialog();}
   function initDialog() {
console.log(state.geonames);
        clearDialog();
        for (var i = 0; i < state.geonames.length; i++) {
            $('.dialog').append('<div>' + state.geonames[i].toponymName + '</div>');
        }
    }
    function clearDialog() {
        $('.dialog').empty();
    }
    $('.typeahead input').click(function() {
        if (!alreadyFilled) {
            $('.dialog').addClass('open');
  
        }
  
    });
    $('body').on('click', '.dialog > div', function() {
        $('.typeahead input').val($(this).text()).focus();
        $('.typeahead .close').addClass('visible');
        alreadyFilled = true;
    });
    $('.typeahead .close').click(function() {
        alreadyFilled = false;
        $('.dialog').addClass('open');
        $('.typeahead input').val('').focus();
        $(this).removeClass('visible');
    });
  
    function match(str) {
        str = str.toLowerCase();
        clearDialog();
        for (var i = 0; i < state.geonames.length; i++) {
                                    
                                                  
            if (state.geonames[i].toponymName.toLowerCase().includes(str)) {
                          
                $('.dialog').append('<div>' + state.geonames[i].toponymName + '</div>');
            }
  }      
    
  }
    $('.typeahead input').on('input', function() {
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
