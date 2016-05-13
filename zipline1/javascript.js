
var quoteGenerator = "https://andruxnet-random-famous-quotes.p.mashape.com/cat="

var readJSONFile = function(){
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: quoteGenerator,
    success: function(data){
      newQuote(data);
    }
  });
};

var newQuote = function(data){
  var parsed = JSON.parse(data);
  var quote_box = document.getElementById("quote");
  var author = document.getElementById("author");
  quote_box.innerHTML = parsed.quote;
  author.innerHTML = parsed.author;
}

$(document).ready(function(){;
  readJSONFile();
  $(".button").click(function(){
    var classname = $(this).attr("class");
    if (classname.includes("new_quote")){
      readJSONFile();
    }
    if (classname.includes("twitter")){
      var quote = $("#quote").html() + " ~ " + $("#author").html();
      console.log(quote);
      window.open("http://twitter.com/home?status=" + quote);
    }

  });
});
