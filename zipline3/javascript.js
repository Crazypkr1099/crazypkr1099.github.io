// display_name -- name of channel
// followers -- follower count
// game -- Creative
// viewers -- viewer count
// status -- Stream name

var streamers = ["Crazypkr1099","Wild4games","Pangaeapanga","Gamingdekap","Sinqnew",
"Sethbling","Jaku","Bostwiek","Automateallthegames","Designeralanm","Devwars","LeFrenchStallion","Freecodecamp",
"Ziggerergames","Spa12k","Kapulara","Papatooshi","CloakedYoshi","Bounceyboy"];

var JSONOnline = function(jsonRead) {
    var logoURL = "http://www-cdn.jtvnw.net/images/xarth/404_user_50x50.png"
    if (jsonRead.stream != null) {
        if (jsonRead.stream.channel.logo != null) {
            logoURL = jsonRead.stream.channel.logo
        }
        var div = $(`
          <section class="streamer_box ${jsonRead.stream.channel.display_name}">
            <div class="main_content">
              <div id="streamerLogo"><img src="${logoURL}"></img></div>
              <div id="streamerName">${jsonRead.stream.channel.display_name}</div>
              <div id="streamerStatus" data-status="online">Online</div>
            </div>
          <div class="popup" id="inactive">
            <div class="popup_content">
              <div id="streamerTitle">${jsonRead.stream.channel.status}</div>
              <div id="streamerViewers">~ Viewers: ${jsonRead.stream.viewers}</div>
              <div id="streamerFollowers">~ Followers: ${jsonRead.stream.channel.followers}</div>
            </div>
            <img src="https://static-cdn.jtvnw.net/previews-ttv/live_user_${(jsonRead.stream.channel.display_name).toLowerCase()}-300x150.jpg"></img>
            </div>
          </section>`)
        $(".container").append(div);
        createClickers(jsonRead.stream.channel.display_name);
    }
}

var JSONOffline = function(jsonRead) {
    var logoURL = "http://www-cdn.jtvnw.net/images/xarth/404_user_50x50.png";
    var profile_banner = "http://web-hosting-blog.rackservers.com.au/wp-content/uploads/2012/08/internet-error-404-file-not-found.jpg";
    if (jsonRead.logo != null) {
        logoURL = jsonRead.logo;
    }
    if (jsonRead.profile_banner != null) {
        profile_banner = jsonRead.profile_banner;
    }
    if (jsonRead.stream == null) {
        var div = $(`
         <section class="streamer_box ${jsonRead.display_name}">
           <div class="main_content">
             <div id="streamerLogo"><img src="${logoURL}"></img></div>
             <div id="streamerName">${jsonRead.display_name}</div>
             <div id="streamerStatus" data-status="offline">Offline</div>
            </div>
         <div class="popup" id="inactive">
           <div class="popup_content">
             <div id="streamerTitle">Currently Not Streaming... </div>
             <div id="streamerViewers">~ Total Views: ${jsonRead.views}</div>
             <div id="streamerFollowers">~ Followers: ${jsonRead.followers}</div>
           </div>
           <img src="${profile_banner}"></img>
           </div>
         </section>`)
        $(".container").append(div);

        createClickers(jsonRead.display_name);
    }
}


var createClickers = function(streamer_name) {
    $("." + streamer_name).click(function() {
      var idPath = $(this).children().siblings()[1];
      if ($(idPath).attr("id") == "inactive"){
        $(idPath).attr("id","active");
      }else{
        $(idPath).attr("id","inactive");
      }
    });
    $("." + streamer_name).animate({width: '100%', marginLeft: "0px"});
}

var JSON = function(sort) {
    streamers.forEach(function(streamer_name) {
        $.ajax({
            url: `https://api.twitch.tv/kraken/streams/${streamer_name}`,
            dataType: 'jsonp',
            success: function(jsonReadOnline) {
                if (jsonReadOnline.stream != null) {
                    if (sort == "online") {
                        JSONOnline(jsonReadOnline);
                    } else if (sort == "friends") {
                        JSONOnline(jsonReadOnline);
                        if (jsonReadOnline.stream == null) {
                            $.ajax({
                                url: `https://api.twitch.tv/kraken/channels/${streamer_name}`,
                                dataType: 'jsonp',
                                success: function(jsonReadOffline) {
                                    JSONOffline(jsonReadOffline);
                                }
                            });
                        }
                    }
                    if (jsonReadOnline.stream == null) {
                        $.ajax({
                            url: `https://api.twitch.tv/kraken/channels/${streamer_name}`,
                            dataType: 'jsonp',
                            success: function(jsonReadOffline) {
                                JSONOffline(jsonReadOffline);
                            }
                        })
                    }
                }
                if (sort != "online" && jsonReadOnline.stream == null) {
                    $.ajax({
                        url: `https://api.twitch.tv/kraken/channels/${streamer_name}`,
                        dataType: 'jsonp',
                        success: function(jsonReadOffline) {
                            JSONOffline(jsonReadOffline);
                        }
                    })
                }
            }
        })
    });
}

$(document).ready(function() {
    JSON("friends");
    $("nav #online").click(function(){
      $("section").remove();
      $('nav li').each(function () {
            $(this).removeClass("selected");
        })
        $(this).addClass("selected");
      JSON("online");
    });
    $("nav #offline").click(function(){
      $("section").remove();
      $('nav li').each(function () {
            $(this).removeClass("selected");
        })
        $(this).addClass("selected");
      JSON("offline");
    });
    $("nav #friends").click(function(){
      $("section").remove();
      $('nav li').each(function () {
            $(this).removeClass("selected");
        })
        $(this).addClass("selected");
      JSON("friends");
    });





});
