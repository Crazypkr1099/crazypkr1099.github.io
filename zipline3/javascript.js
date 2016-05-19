// display_name -- name of channel
// followers -- follower count
// game -- Creative
// viewers -- viewer count
// status -- Stream name

var streamers = ["Crazypkr1099", "Papatooshi", "Freecodecamp", "Xartuo","CloakedYoshi","Nom_in_HD","LeFrenchStallion","DegenTP","Sinqnew","PangaeaPanga"];

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
          <div class="popup" id="active">
            <div class="popup_content">
              <div id="streamerTitle">${jsonRead.stream.channel.status}</div>
              <div id="streamerViewers">~ Viewers: ${jsonRead.stream.viewers}</div>
              <div id="streamerFollowers">~ Followers: ${jsonRead.stream.channel.followers}</div>
            </div>
            <div class="popup_image"><img src="https://static-cdn.jtvnw.net/previews-ttv/live_user_${(jsonRead.stream.channel.display_name).toLowerCase()}-300x150.jpg"></img></div>
          </div>
          </section>`)
        $(".container").append(div);
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
         <div class="popup" id="active">
           <div class="popup_content">
             <div id="streamerTitle">Currently Not Streaming... </div>
             <div id="streamerViewers">~ Total Views: ${jsonRead.views}</div>
             <div id="streamerFollowers">~ Followers: ${jsonRead.followers}</div>
           </div>
           <div class="popup_image"><img src="${profile_banner}"></img></div>
         </div>
         </section>`)
        $(".container").append(div);
    }
}

var JSON = function(sort){
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
                        });
                    }
                }
                if (sort != "online" && jsonReadOnline.stream == null) {
                    $.ajax({
                        url: `https://api.twitch.tv/kraken/channels/${streamer_name}`,
                        dataType: 'jsonp',
                        success: function(jsonReadOffline) {
                            JSONOffline(jsonReadOffline);
                        }
                    });
                }
            }
        });
    });
}


$(document).ready(function() {
    JSON("friends");
});
