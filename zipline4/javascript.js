$(document).ready(function() {
    var inputValue = "Kappa";
    $('.search_box_container').addClass('animated bounceInDown').delay(1000).queue(function(next) {
        $(this).removeClass('animated bounceInDown');
        next();
    });
    $(".search_box_container i").on("click",function() {
        $('.search_box_container').addClass('animated zoomOutUp').delay(1000).queue(function(next) {
          $(this).removeClass("animated zoomOutUp");
            inputValue = $(".container form input").val();
            $(this).css("display","none");
            $(".error").remove()
            getJSON(inputValue);
            next();
        });
    });
    $(".container form span").click(function(){
      $(".container header h2").empty()
      $(".container .pages").empty()
      $(".error").remove()
      getJSON($(".container form input").val());

    });
    $(document).keypress(function(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13') {
        event.preventDefault();
        if ($(".search_box_container").css("display") == "flex"){
            inputValue = $(".search_box_container form input").val();
        }else{
          inputValue = $(".container form input").val();
        }
        if (!inputValue){
          inputValue = "Kappa";
        }
        $('.search_box_container').addClass('animated zoomOutUp').delay(1000).queue(function(next) {
          $(this).removeClass("animated zoomOutUp");
            $(this).css("display","none");
            $(".container header h2").empty()
            $(".container .pages").empty()
            $(".error").remove()
            getJSON(inputValue);
            next();
        });
      }
});
});

var getJSON = function(search) {
    $.ajax({
        url: `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${search}&callback=JSON_CALLBACK`,
        dataType: 'jsonp',
        success: function(jsonRead) {
          createWikipedia(jsonRead,search);
        }
    });
}

var createWikipedia = function(jsonData,search) {
  if (jsonData.query){
    $("body").css({
        "background-Image": "none",
        "background-color": "#1e1b14",
        "display": "block"
    });
    $(".container").css("display", "block");
    $('.container header h2').addClass('animated bounceInDown').delay(1000).queue(function(next) {
        $(this).removeClass('animated bounceInDown');
        next();
    });
    $(".container header h2").append(`You have succesfully search: ${search.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')}`);
    var tempObjects = jsonData.query.pages;
      $.each(tempObjects,function(key,value){
        var titleUnderscore = value["title"].replace(/ /g,"_");
        titleUnderscore = titleUnderscore.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        var tempDiv = $(`
        <section class="${titleUnderscore}">
          <h3>${value["title"].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')}</h3>
          <p>${value["extract"].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')}</p>
        </section>`)
        $(".pages").append(tempDiv);
        $("." + titleUnderscore).click(function(){
          window.open(`https://en.wikipedia.org/wiki/${value["title"]}`)
        });
        $("." + titleUnderscore).animate({
          width: '100%',
          marginLeft: "0px"
        });
      })
  }else{
    if ($(".container").css("display") == "none"){
      console.log("hi" + $(".search_box_container").css("display"));
      $(".search_box_container").css("display","flex");
      $(".search_box_container form").append(`<p class="error"> ERROR: Pages not found. Try Again</p>`);
      $('.search_box_container').addClass('animated bounceInDown').delay(1000).queue(function(next) {
          $(this).removeClass('animated bounceInDown');
          next()
        });
    }else{
      $("header").append(`<p class="error"> ERROR: Pages not found. Try Again</p>`);
    }
  }

}

// $("." + streamer_name).animate({
//     width: '100%',
//     marginLeft: "0px"
// });
