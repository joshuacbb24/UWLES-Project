let roomId = false;
let nameofmembers = [];
var whitelist_2 = [];
var whitelist_3 = [];
var xisweird = 0;
var y = 0;
var z = 0;
let clickState = 0;
let member = false;
var memberlist = [];
let tagger = document.getElementById('user-input');
let inRoom = false;
let groupName = false;
let allRooms = [];
let createroom = false;
let socketopen = null;
let text_changed = false;
let link = [];
let typedmessage = null;
let found = null;
var prefix = 'https://';
var prefix2 = 'http://'
let ellipsisClicked = false;
//let hideellipsis = false;
let timeid = 0;
let removeduser = null;
let removedusername = null;
var allnewusers = [];
let emptyroom = false;
var newChat = document.getElementById('chatName');
let avatararray = [];
let arrayofusers = [];
let a = 0;
let ext = null;
let extension = null;
let roomexists = null;
let avatarsexist = false;
let createconfirmation = 0;
let joinedroom = false;
let createroomid = false;
let wasclicked = false;
let notice = false;
let unreadnotdisplayed = true;
let awayclicked = false;
const noticeMessage = "User made change to chat."


function onChangeName(event) {

    /* alphanumeric = /[0-9a-zA-Z]/;
     let isValid = alphanumeric.test(event.key);

     let inputLength = newChat.value.length;
     if (isValid) {
         inputLength += 1;
     }*/

    if (newChat.value.length > 0) {
        document.getElementById('confirmation-of-name').disabled = false;
    }
    else {
        document.getElementById('confirmation-of-name').disabled = true;
    }

    //return isValid;

}

function SearchFunction() {
    /*if (hideellipsis) {
        $("[chat-dropdown-value=" + chatDropdownId + "]").hide();
        hideellipsis = false;
    }*/

    search_input = $("#myInput")[0];
    var filter = search_input.value.toUpperCase();
    var ul = document.getElementById("rooms");
    var li = ul.getElementsByClassName("room-link");
    for (i = 0; i < li.length; i++) {
        var a = li[i].getElementsByTagName("span")[0];
        var txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
/*function mySubmitFunction(e) {
    e.preventDefault();
    var userinput = document.querySelector('input[name=users-list-tags]');
    if (createroom == true) {
        if (userinput.value < 1) {
            return false;
        }
    }

    else {
        return true;
    }
}*/

window.onclick = function (event) {
    var modal = $(".chat-dropdown-content");
    var modal2 = $(".ellipsis");
    if (!modal.toArray().includes(event.target) && !modal2.toArray().includes(event.target)) {
        enableScroll();
        $(".chat-dropdown-content").hide();
    }

}
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    //var scrollrooms = $(".rooms");
    console.log("disable scroll");
    var element = document.getElementById('rooms');
    element.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    element.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    element.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    element.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    //var scrollrooms = $(".rooms");
    console.log("enable scroll");
    var element = document.getElementById('rooms');
    element.removeEventListener('DOMMouseScroll', preventDefault, false);
    element.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    element.removeEventListener('touchmove', preventDefault, wheelOpt);
    element.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
/*function disableScroll() {
    // Get the current page scroll position
    var scrollrooms = $(".rooms");
    var scrollroomsoffset = scrollrooms.offset();
    scrollTop =
        scrollroomsoffset.pageYOffset || document.documentElement.scrollTop;
    scrollLeft =
        scrollroomsoffset.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted,
        // set this to the previous value
        scrollrooms.on("scroll", function () {
            console.log("rooms onscroll")
            scrollrooms.scrollTop(scrollTop);
        });
}*/

/*function disableScroll() {
    // Get the current page scroll position
    var element = document.getElementById('rooms');
    scrollTop = element.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = element.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        element.onscroll = function () {
            element.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    element.onscroll = function () { };
}*/
$(function () {

    // Correctly decide between ws:// and wss://
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var ws_path = ws_scheme + "://" + window.location.host + "/chat/stream/";
    console.log("Connecting to " + ws_path);

    //var socket = new WebSocket(ws_path);
    var socket = new ReconnectingWebSocket(ws_path);
    var roomName = null;
    var title = null;



    $(".sending-form").on("submit", function () {
        typedmessage = document.querySelector('#typed_msg').value;
        if (createroom == false) {
            event.preventDefault();
            if (roomName) {
                socket.send(
                    JSON.stringify({
                        "command": "send",
                        "room": roomName,
                        "from_user": $("#myself").val(),
                        "message": typedmessage,
                        "file": false,
                        "notice": false,
                    })
                );
                $(".unread-break-line").hide();
                unreadnotdisplayed = true;
                $('input[name=chat-message]').val('');

            }
        }
        else if (createroom == true && createconfirmation == 1) {
            event.preventDefault();
            socket.send(
                JSON.stringify({
                    "command": "create",
                    "message": typedmessage,
                    "newUsers": JSON.parse($("#tag-input").val()),
                    "created_by": $("#myself").val(),
                    "file": false,
                    "notice": false,
                })
            );
            $("#tag-input").hide();
            $("#users-list").hide();
            $("#chat-name").hide();
            $("#tag-input").empty();
            $(".user-header").show();
            $(".user-header p").hide();
            $("#title-img").hide();
            $("#create-chat").show();
            $("#upload-photos-button").hide();
            $(".msg_send_btn").hide();
            $(".rightAccordion").show();
            $("#typed_msg").empty();
            $(".rightAccordion").hide();
            $(".rightPanel").hide();
            $('input[name=chat-message]').val('');
            $("#typed_msg").hide();
            createroom = false;
        }
        else if (createroom == true && createconfirmation == 0) {
            //show error
            event.preventDefault();
            alert("Users Need to be selected.");
        }
    });

    $("#upload-photos-button").click(function () {
        $("#fileupload").click();
    });

    /* 2. INITIALIZE THE FILE UPLOAD COMPONENT */
    $("#fileupload").fileupload({
        dataType: 'json',
        done: function (e, data2) {  /* 3. PROCESS THE RESPONSE FROM THE SERVER */
            if (data2.result.is_valid) {
                /*send file to recipient and add a progress bar*/
                const message = '<a size-id="' + data2.result.size + '" href="' + data2.result.url + '" target="_blank">' + data2.result.name + '</a>'
                if (createroom == false) {
                    if (roomName) {
                        socket.send(
                            JSON.stringify({
                                "command": "send",
                                "room": roomName,
                                "message": message,
                                "from_user": $("#myself").val(),
                                "file": true,
                                "notice": false,
                            })
                        );
                        $(".unread-break-line").hide();
                        unreadnotdisplayed = true;
                    }
                }
                else if (createroom == true && createconfirmation == 1) {
                    socket.send(
                        JSON.stringify({
                            "command": "create",
                            "newUsers": JSON.parse($("#tag-input").val()),
                            "message": message,
                            "created_by": $("#myself").val(),
                            "file": true,
                            "notice": false,
                        })
                    );
                    $("#tag-input").hide();
                    $("#users-list").hide();
                    $("#chat-name").hide();
                    $("#tag-input").empty();
                    $(".user-header").show();
                    $(".user-header p").hide();
                    $("#title-img").hide();
                    $("#create-chat").show();
                    $("#upload-photos-button").hide();
                    $(".msg_send_btn").hide();
                    $(".rightAccordion").show();
                    $("#typed_msg").empty();
                    $(".rightAccordion").hide();
                    $(".rightPanel").hide();
                    $('input[name=chat-message]').val('');
                    $("#typed_msg").hide();
                    createroom = false;
                }
                else if (createroom == true && createconfirmation == 0) {
                    //show error modal
                    event.preventDefault();
                    alert("Users Need to be selected.");
                }


            }
        }
    });

    // Handle incoming messages
    socket.onmessage = function (message) {
        var data = JSON.parse(message.data);
        console.log("data", data)
        // Handle errors
        if (data.error) {
            alert(data.error);
            return;
        }

        message = data.message


        // Handle joining
        if (data.join) {
            console.log("Joining room " + data.join);
            roomName = data.join;
            title = data.title;
            joinedroom = true;
            createroomid = roomId;
            //   console.log("myself value: " + $("#myself").val() + "data.from_user value: " + message.from_user)

            // Hook up send button to send a message




            //hook up sending files
            /* 1. OPEN THE FILE EXPLORER WINDOW */
            var obj = data.title;
            //var extra = ", ";

            var me = $("#myself").val();
            if (obj.match(me)) {
                me = $("#myself").val() + ", ";
                me2 = ", " + $("#myself").val();
                var comma = obj.replace(/-/g, ', ');
                var new_string = comma.replace(me, "");
                new_string = new_string.replace(me2, "");
                new_string = "me, " + new_string;
                new_string = new_string.replace(/-deleted/g, "");
                new_string = new_string.replace(/-removed/g, "");
                new_string = new_string.replace(/-additional/g, "");
                new_string = new_string.replace(/, deleted/g, "");
                new_string = new_string.replace(/, additional/g, "");
                new_string = new_string.replace(/, removed/g, "");
            }
            else {
                var new_string = obj.replace(/-deleted/g, "");
                new_string = new_string.replace(/-removed/g, "");
                new_string = new_string.replace(/-additional/g, "");
                new_string = new_string.replace(/, deleted/g, "");
                new_string = new_string.replace(/, additional/g, "");
                new_string = new_string.replace(/, removed/g, "");
            }

            $(".user-header p").html(new_string);

            // Handle leaving
        } else if (data.leave) {
            console.log("Leaving room " + data.leave);
            roomName = null;
            joinedroom = false;
            // Handle getting a message
        } else if (data.message || data.msg_type != 0) {
            var msgdiv = $(".chat-log");
            var ok_msg = "";



            // msg types are defined in chat/settings.py
            // Only for demo purposes is hardcoded, in production scenarios, consider call a service.
            const LEFT_ROOM = 5;
            switch (data.msg_type) {
                case 0:
                    // Message
                    let pattern = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/[^><]*)?", "g")
                    let text = (data.message.text) ? data.message.text : data.message;
                    let inroomid = (data.message.room) ? data.message.room : data.room;
                    let user = (data.message.from_user) ? data.message.from_user : data.username;
                    let useravatar = (data.message.avatar) ? data.message.avatar : data.avatar;
                    let defaultcolor = (data.message.default) ? data.message.default : data.default;
                    let avatarofchatlog = useravatar ? '<img class="profile-pic" src="' + useravatar + '">' : '<div class="profile-pic-wrapper" data-username="' + user + '" data-bgcolor="' + defaultcolor + '"></div>'
                    //if statement for where user.username is not equal to data.message.from_user
                    let time = (data.message.sent_at) ? data.message.sent_at : data.sent_at;
                    let iftime = (data.message.sent_at) ? data.message.sent_at : data.sent_at;
                    let notificationofmessage = (data.message.notification) ? data.message.notification : data.notification;
                    let unreadmessage = (data.message.unread !== undefined) ? data.message.unread : data.unread;
                    let is_file = (data.message.is_file !== undefined) ? data.message.is_file : data.is_file;
                    let notice = (data.message.notice !== undefined) ? data.message.notice : data.notice;
                    let received = (data.message.received !== undefined) ? data.message.received : data.received
                    const NewMessage = "New Message";
                    const cssClass = $("#myself").val() == user ? 'outgoing' : 'incoming';
                    var d = new Date();
                    var month = d.toLocaleString('default', { month: 'short' }); //months from 1-12
                    var day = d.getDate();
                    var date = "";
                    date = month + " " + day + ",";
                    if (time.match(date)) {
                        time = time.replace(date, "");
                    }
                    else {
                        /*var timeregex = new RegExp("^[0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
                        time = time.replace(timeregex, "");*/
                        time = time.substr(0, time.lastIndexOf(",") + 1);
                        time = time.replace(",", "");

                    }
                    
                    if (notificationofmessage) {
                        if (!notice) {
                            $("[message-preview-value=" + data.room + "]").html("");
                            $("[message-preview-value=" + data.room + "]").html(text);
                        }
                        if (notice) {
                            $("[message-preview-value=" + data.room + "]").html("");
                            $("[message-preview-value=" + data.room + "]").html(noticeMessage);
                        }
                        if (user != $("#myself").val()) {
                            var musicnotification = document.getElementById("chatAudio");
                            musicnotification.play();
                        }
                    }
                    //extract the url from the message
                    if (notice && !is_file && roomId == inroomid) {
                        console.log("slow it down");
                        console.log("slow it down");
                        console.log("slow it down");
                        $(".chat-log").append(
                            `<div class='notice-message'>` +
                            `<span>` +
                            text +
                            `</span>` +
                            `</div>`);
                    }
                    else if (!is_file && !notice  && roomId == inroomid) {

                        result = text.replace(pattern, function (url) {
                            ;
                            //should i replace text with url because I believe
                            //it is passing the found ones into url
                            if (url.substr(0, prefix.length) !== prefix || url.substr(0, prefix.length) !== prefix2) {
                                s = prefix + url;
                            }
                            else {
                                s = url;
                            }
                            $(".list-of-links").append(
                                `<li>
                                <i class="las la-link" style="display: inline;"><a href="${s}">${url}</a></i>
                                </li>`
                            );
                            return '<a href="' + s + '">' + url + '</a>';

                        })


                        if (cssClass == 'outgoing') {
                            $(".chat-log").append(
                                `<div class='chat-wrapper' style="float: right; margin-right: 25px;">` +
                                `<div class='outgoing-msg-img'>` + avatarofchatlog + `</div>` +
                                `<div class='${cssClass}' id='time-${timeid}'>` +
                                result +
                                `</div>` +
                                `<span class='time_date'id='date-${timeid}' style="">` +
                                time +
                                `</span>` +
                                `</div>`);

                            if (iftime.match(date)) {
                                let idoftime = "time-" + timeid;
                                var marginid = document.getElementById(idoftime);
                                var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                var intwidth = parseInt(msgwidth);
                                intwidth = intwidth - 40;
                                intwidth = intwidth.toString()
                                var newwidth = intwidth + "px";
                                document.getElementById('date-' + timeid).style.right = newwidth;
                                timeid++;
                            }
                            else {
                                let idoftime = "time-" + timeid;
                                var marginid = document.getElementById(idoftime);
                                var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                var intwidth = parseInt(msgwidth);
                                intwidth = intwidth - 20;
                                intwidth = intwidth.toString()
                                var newwidth = intwidth + "px";
                                document.getElementById('date-' + timeid).style.right = newwidth;
                                timeid++;
                            }
                        } else {
                            if (unreadmessage && unreadnotdisplayed) {
                                $(".chat-log").append(
                                    `<div class='unread-break-line'>` +
                                    `<span style='text-align: center;'>` +
                                    NewMessage +
                                    `</span>` +
                                    `</div>`);
                                $(".unread-break-line").show();
                                unreadnotdisplayed = false;
                            }
                            if (received === true) {
                                $(".unread-break-line").hide();
                                unreadnotdisplayed = true;
                            }
                            $(".chat-log").append(
                                `<div class='chat-wrapper' style="float: left; margin-left: 25px;">` +
                                `<div class='incoming-msg-img'>` + avatarofchatlog + `</div>` +
                                `<div class='${cssClass}' id='time-${timeid}'>` +
                                result +
                                `</div>` +
                                `<span class='time_date' id='date-${timeid}'>` +
                                time +
                                `</span>` +
                                `</div>`);
                            if (iftime.match(date)) {
                                let idoftime = "time-" + timeid;
                                var marginid = document.getElementById(idoftime);
                                var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                var intwidth = parseInt(msgwidth);
                                intwidth = intwidth + 5;
                                intwidth = intwidth.toString()
                                var newwidth = intwidth + "px";
                                document.getElementById('date-' + timeid).style.left = newwidth;
                                timeid++;
                            }
                            else {
                                let idoftime = "time-" + timeid;
                                var marginid = document.getElementById(idoftime);
                                var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                var intwidth = parseInt(msgwidth);
                                intwidth = intwidth + 5;
                                intwidth = intwidth.toString()
                                var newwidth = intwidth + "px";
                                document.getElementById('date-' + timeid).style.left = newwidth;

                                timeid++;
                            }
                        }
                    }
                    else if (is_file && !notice  && roomId == inroomid) {
                        ext = text.split(".");
                        extension = ext[ext.length - 1];
                        extension = extension.replace("</a>", "")
                        extension = extension.toLowerCase();
                        var fileinfo = extension.toUpperCase();
                        if (extension == 'pdf' || extension == 'doc' || extension == 'docx' || extension == 'txt' || extension == 'odt' || extension == 'ppt' || extension == 'pptx' || extension == 'html' || extension == 'rtf') {
                            fileinfo = fileinfo + " Document";
                            $(".list-of-files").append(
                                `<li>
                            <a> 
                                <span class="file_image"><img id="doc" src="{% static 'app/images/documents.png' %}"></span>` +
                                text +
                                `</a>
                              </li>`)

                            if (cssClass == 'outgoing') {
                                $(".chat-log").append(
                                    `<div class='chat-wrapper' style="float: right; margin-right: 25px;">` +
                                    `<div class='outgoing-msg-img'>` + avatarofchatlog + `</div>` +
                                    `<div class='${cssClass}' id='time-${timeid}'>` +
                                    `<div class='msgimg'>` +
                                    `<img id="msg_doc" src="{% static 'app/images/documents.png' %}">` +
                                    `<div class='msgimgname'>` +
                                    text +
                                    `<br>` +
                                    `<div class='msgimginfo'>` +
                                    fileinfo +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<span class='time_date'id='date-${timeid}' style="">` +
                                    time +
                                    `</span>` +
                                    `</div>`);
                                if (iftime.match(date)) {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 40;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.right = newwidth;
                                    timeid++;
                                }
                                else {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 20;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.right = newwidth;
                                    timeid++;
                                }
                            } else {
                                if (unreadmessage && unreadnotdisplayed) {
                                    $(".chat-log").append(
                                        `<div class='unread-break-line'>` +
                                        `<span style='text-align: center;'>` +
                                        NewMessage +
                                        `</span>` +
                                        `</div>`);
                                    $(".unread-break-line").show();
                                    unreadnotdisplayed = false;
                                }
                                $(".chat-log").append(
                                    `<div class='chat-wrapper' style="float: left; margin-left: 25px;">` +
                                    `<div class='incoming-msg-img'>` + avatarofchatlog + `</div>` +
                                    `<div class='${cssClass}' id='time-${timeid}'>` +
                                    `<div class='msgimg'>` +
                                    `<img id="msg_doc" src="{% static 'app/images/documents.png' %}">` +
                                    `<div class='msgimgname'>` +
                                    text +
                                    `<br>` +
                                    `<div class='msgimginfo'>` +
                                    fileinfo +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<span class='time_date' id='date-${timeid}'>` +
                                    time +
                                    `</span>` +
                                    `</div>`);
                                if (iftime.match(date)) {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 40;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.left = newwidth;
                                    timeid++;
                                }
                                else {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 20;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.left = newwidth;

                                    timeid++;
                                }
                            }

                        }
                        else if (extension == 'jpg' || extension == 'png' || extension == 'gif' || extension == 'jpeg') {
                            fileinfo = fileinfo + " Image";
                            $(".list-of-files").append(
                                `<li>
                            <a> 
                                <span class="file_image"><img id="pic" src="{% static 'app/images/images.png' %}"></span>` +
                                text +
                                `</a>
                              </li>`)
                            if (cssClass == 'outgoing') {
                                $(".chat-log").append(
                                    `<div class='chat-wrapper' style="float: right; margin-right: 25px;">` +
                                    `<div class='outgoing-msg-img'>` + avatarofchatlog + `</div>` +
                                    `<div class='${cssClass}' id='time-${timeid}'>` +
                                    `<div class='msgimg'>` +
                                    `<img id="msg_img" src="{% static 'app/images/images.png' %}">` +
                                    `<div class='msgimgname'>` +
                                    text +
                                    `<br>` +
                                    `<div class='msgimginfo'>` +
                                    fileinfo +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<span class='time_date'id='date-${timeid}' style="">` +
                                    time +
                                    `</span>` +
                                    `</div>`);
                                if (iftime.match(date)) {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 40;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.right = newwidth;
                                    timeid++;
                                }
                                else {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 20;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.right = newwidth;
                                    timeid++;
                                }
                            } else {
                                if (unreadmessage && unreadnotdisplayed) {
                                    $(".chat-log").append(
                                        `<div class='unread-break-line'>` +
                                        `<span style='text-align: center;'>` +
                                        NewMessage +
                                        `</span>` +
                                        `</div>`);
                                    $(".unread-break-line").show();
                                    unreadnotdisplayed = false;
                                }
                                $(".chat-log").append(
                                    `<div class='chat-wrapper' style="float: left; margin-left: 25px;">` +
                                    `<div class='incoming-msg-img'>` + avatarofchatlog + `</div>` +
                                    `<div class='${cssClass}' id='time-${timeid}'>` +
                                    `<div class='msgimg'>` +
                                    `<img id="msg_img" src="{% static 'app/images/images.png' %}">` +
                                    `<div class='msgimgname'>` +
                                    text +
                                    `<br>` +
                                    `<div class='msgimginfo'>` +
                                    fileinfo +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<span class='time_date' id='date-${timeid}'>` +
                                    time +
                                    `</span>` +
                                    `</div>`);
                                if (iftime.match(date)) {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 40;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.left = newwidth;
                                    timeid++;
                                }
                                else {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 20;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.left = newwidth;

                                    timeid++;
                                }
                            }
                        }
                        else if (extension == 'mov' || extension == 'mp4' || extension == 'wmv' || extension == 'avi' || extension == 'flv' || extension == 'mkv' || extension == 'mpeg') {
                            fileinfo = fileinfo + " Video";
                            $(".list-of-files").append(
                                `<li>
                            <a> 
                                <span class="file_image"><img id="vid" src="{% static 'app/images/movies.png' %}"></span>` +
                                text +
                                `</a>
                              </li>`)
                            if (cssClass == 'outgoing') {
                                $(".chat-log").append(
                                    `<div class='chat-wrapper' style="float: right; margin-right: 25px;">` +
                                    `<div class='outgoing-msg-img'>` + avatarofchatlog + `</div>` +
                                    `<div class='${cssClass}' id='time-${timeid}'>` +
                                    `<div class='msgimg'>` +
                                    `<img id="msg_vid" src="{% static 'app/images/movies.png' %}">` +
                                    `<div class='msgimgname'>` +
                                    text +
                                    `<br>` +
                                    `<div class='msgimginfo'>` +
                                    fileinfo +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<span class='time_date'id='date-${timeid}' style="">` +
                                    time +
                                    `</span>` +
                                    `</div>`);
                                if (iftime.match(date)) {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 40;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.right = newwidth;
                                    timeid++;
                                }
                                else {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 20;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.right = newwidth;
                                    timeid++;
                                }
                            } else {
                                if (unreadmessage && unreadnotdisplayed) {
                                    $(".chat-log").append(
                                        `<div class='unread-break-line'>` +
                                        `<span style='text-align: center;'>` +
                                        NewMessage +
                                        `</span>` +
                                        `</div>`);
                                    $(".unread-break-line").show();
                                    unreadnotdisplayed = false;
                                }
                                $(".chat-log").append(
                                    `<div class='chat-wrapper' style="float: left; margin-left: 25px;">` +
                                    `<div class='incoming-msg-img'>` + avatarofchatlog + `</div>` +
                                    `<div class='${cssClass}' id='time-${timeid}'>` +
                                    `<div class='msgimg'>` +
                                    `<img id="msg_vid" src="{% static 'app/images/movies.png' %}">` +
                                    `<div class='msgimgname'>` +
                                    text +
                                    `<br>` +
                                    `<div class='msgimginfo'>` +
                                    fileinfo +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<span class='time_date' id='date-${timeid}'>` +
                                    time +
                                    `</span>` +
                                    `</div>`);
                                if (iftime.match(date)) {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 40;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.left = newwidth;
                                    timeid++;
                                }
                                else {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 20;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.left = newwidth;

                                    timeid++;
                                }
                            }
                        }
                        else {
                            fileinfo = fileinfo + " File";
                            $(".list-of-files").append(
                                `<li>
                            <a> 
                                <span class="file_image"><img id="etc" src="{% static 'app/images/file.png' %}"></span>` +
                                text +
                                `</a>
                              </li>`)
                            if (cssClass == 'outgoing') {
                                $(".chat-log").append(
                                    `<div class='chat-wrapper' style="float: right; margin-right: 25px;">` +
                                    `<div class='outgoing-msg-img'>` + avatarofchatlog + `</div>` +
                                    `<div class='${cssClass}' id='time-${timeid}'>` +
                                    `<div class='msgimg'>` +
                                    `<img id="msg_etc" src="{% static 'app/images/file.png' %}">` +
                                    `<div class='msgimgname'>` +
                                    text +
                                    `<br>` +
                                    `<div class='msgimginfo'>` +
                                    fileinfo +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<span class='time_date'id='date-${timeid}' style="">` +
                                    time +
                                    `</span>` +
                                    `</div>`);
                                if (iftime.match(date)) {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 40;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.right = newwidth;
                                    timeid++;
                                }
                                else {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 20;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.right = newwidth;
                                    timeid++;
                                }
                            } else {
                                if (unreadmessage && unreadnotdisplayed) {

                                    $(".chat-log").append(
                                        `<div class='unread-break-line'>` +
                                        `<span style='text-align: center;'>` +
                                        NewMessage +
                                        `</span>` +
                                        `</div>`);
                                    $(".unread-break-line").show();
                                    unreadnotdisplayed = false;
                                }
                                $(".chat-log").append(
                                    `<div class='chat-wrapper' style="float: left; margin-left: 25px;">` +
                                    `<div class='incoming-msg-img'>` + avatarofchatlog + `</div>` +
                                    `<div class='${cssClass}' id='time-${timeid}'>` +
                                    `<div class='msgimg'>` +
                                    `<img id="msg_etc" src="{% static 'app/images/file.png' %}">` +
                                    `<div class='msgimgname'>` +
                                    text +
                                    `<br>` +
                                    `<div class='msgimginfo'>` +
                                    fileinfo +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<span class='time_date' id='date-${timeid}'>` +
                                    time +
                                    `</span>` +
                                    `</div>`);
                                if (iftime.match(date)) {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 40;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.left = newwidth;
                                    timeid++;
                                }
                                else {
                                    let idoftime = "time-" + timeid;
                                    var marginid = document.getElementById(idoftime);
                                    var msgwidth = document.getElementById('time-' + timeid).clientWidth;
                                    var intwidth = parseInt(msgwidth);
                                    intwidth = intwidth - 20;
                                    intwidth = intwidth.toString()
                                    var newwidth = intwidth + "px";
                                    document.getElementById('date-' + timeid).style.left = newwidth;

                                    timeid++;
                                }
                            }
                        }

                    }

                    showDefaultAvatar();
                    break;

                case 1:
                    // Warning / Advice messages
                    ok_msg =
                        "<div class='contextual-message text-warning'>" +
                        data.message +
                        "</div>";
                    break;
                case 2:
                    // Alert / Danger messages
                    ok_msg =
                        "<div class='contextual-message text-danger'>" +
                        data.message +
                        "</div>";
                    break;
                case 3:
                    // "Muted" messages
                    ok_msg =
                        "<div class='contextual-message text-muted'>" +
                        data.message +
                        "</div>";
                    break;
                case 4:
                    // User joined room
                    break;
                case 5:
                    // User left room
                    break;
                case "created":
                    var obj = data.name;
                    var me = $("#myself").val() + ", ";
                    var me2 = ", " + $("#myself").val();
                    var comma = obj.replace(/-/g, ', ');
                    var new_string = comma.replace(me, "");
                    new_string = new_string.replace(me2, "");
                    new_string = "me, " + new_string;

                    //me = extra + $("#myself").val();
                    //new_string = new_string.replace(me, "");

                    let avatardivcreate = ""

                    function avatarhtml(userdata) {
                        let avatar = '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '">';
                        if (userdata.avatar) {
                            avatar += '<img class="profile-pic" src="' + userdata.avatar + '">';

                        }
                        avatar += '</div>';
                        //let avatar = userdata.avatar ? '<img class="profile-pic" src="' + userdata.avatar + '">' : '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '"></div>'

                        return avatar
                    }
                    for (var i = 0; i < data.avatars.length; i++) {
                        /*if (data.avatars[i].username == $("#myself").val()) {
                            continue
                        }*/
                        if (i > 2) {
                            break
                        }
                        avatardivcreate += avatarhtml(data.avatars[i])

                    }

                    avatararray[a] = {
                        "group_avatar": avatardivcreate,
                        "group_id": data.room
                    }
                    a++;

                    let extraUserscreate = data.avatars.length - i;

                    $(".rooms").append(
                        `<li id="room-link" class="room-link" data-room-id="${data.room}" name="${data.room}">
                        <div class="wrap">
                            <div avatar-value="${data.room}" class="avatars">
                            ${avatardivcreate}
                            </div>
                            <div class="room-details">
                                <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" room-name-value="${data.room}" class="name-of-room" id="name-of-room">${new_string}</span>
                                <p message-preview-value="${data.room}" class="preview">${data.message}</p>
                            </div>
                            <span
                            ellipsis-value="${data.room}" id="ellipsis-${data.room}" class="las la-ellipsis-v ellipsis">
                                </span>
                            <div class="chat-dropdown"> 
                               
                                <div chat-dropdown-value="${data.room}" class="chat-dropdown-content">
                                <a edit-button-value="${data.room}" class="edit-button" id="edit-${data.room}">Edit Name</a>
                                <a delete-button-value="${data.room}" class="delete-button" id="delete-${data.room}">Delete Room</a>
                                </div>
                            </div>
                        </div>

                    </li>`);
                    if ($("#myself").val() != data.created_by) {
                        var noticeofcreatedchat = document.getElementById("chatAudio");
                        var newroom = $("li[data-room-id=" + data.room + "]")[0];
                        console.log("new", newroom);
                        $(newroom).addClass("unread");
                        noticeofcreatedchat.play();
                        socket.send(
                            JSON.stringify({
                                command: "acknowledged",
                                room: data.room,
                            })
                        );

                    }
                    //maybe it's this that causes the problem
                    showDefaultAvatar();
                    editbuttonclicked(`ellipsis-${data.room}`);
                    menuclicked(`delete-${data.room}`, `edit-${data.room}`);

                    break;
                case "room_exists":
                    $("li[data-room-id=" + data.room_id + "]")[0].click();
                    break;
                case "sent_to_others":
                    if (roomId !== data.room && $("#myself").val() != data.sender) {
                        socket.send(
                            JSON.stringify({
                                command: "create_unread",
                                room: data.room,
                                messageId: data.message,
                                messagestring: data.messagestring,
                                notice: data.is_notice,

                            })
                        );

                    }
                    else{
                      $("[message-preview-value=" + data.room + "]").html("");
                      $("[message-preview-value=" + data.room + "]").html(data.messagestring);        
                    }
                    break;
                case "get_unread":
                    var unreadroom = $("li[data-room-id=" + data.unread.room + "]")[0];
                    var otherppl = document.getElementById("chatAudio");
                    otherppl.play();
                    $(unreadroom).addClass("unread");
                    if (!data.unread.is_notice) {
                        $("[message-preview-value=" + data.unread.room + "]").html("");
                        $("[message-preview-value=" + data.unread.room + "]").html(data.unread.message);
                    }
                    else {
                        $("[message-preview-value=" + data.unread.room + "]").html("");
                        $("[message-preview-value=" + data.unread.room + "]").html(noticeMessage);
                    }
                    socket.send(
                        JSON.stringify({
                            command: "acknowledged",
                            room: data.unread.room,
                        })
                    );
                    break;
                case "get_members":
                    var people = data.member
                    //TO-DO: if awayclicked = false {let coloricon = green or red} else {let color icon = grey}
                    let coloricon = people.online ? `<div data-link-id="${people.id}" class="online_icon" style="background-color: green;"></div>` : `<div data-link-id="${people.id}" class="online_icon" style="background-color: red;"></div>`
                    let avatarofmembers = people.avatar ? '<img class="profile-pic" src="' + people.avatar + '">' : '<div class="profile-pic-wrapper" data-username="' + people.username + '" data-bgcolor="' + people.default + '"></div>'


                    // $(".avatar-list").append(
                    //`<li><img src="" alt="user" class="profile-photo-lg"></li>`
                    // );

                    if (!people.solitary) {

                        $("#upload-photos-button").show();
                        $(".msg_send_btn").show();
                        $("#typed_msg").show();
                        $("#add-members").show();

                        $(".list-of-members").append(
                            `       <li>
                                <span class="profile-link">${avatarofmembers}${coloricon}<p class="profile-name">${people.username}</p><i data-id="${people.id}" id="user-${people.id}" data-member-name="${people.username}" class="las la-minus remove-button"></i></span>
                  </li>`

                        );
                        nameofmembers[xisweird] = people.username;
                        xisweird++;

                        /*$(".remove-buttons").append(
                            `<li style="padding-bottom: 18px;"><button data-id="${people.id}" class="remove-user">Remove User</button>
                                </li>`      //attach user id to remove button
                        );*/
                        showDefaultAvatar();
                        removeduserclicked(`user-${people.id}`);
                    }
                    else {
                        $("#upload-photos-button").hide();
                        $(".msg_send_btn").hide();
                        $("#typed_msg").hide();
                        $("#add-members").hide();
                        $(".list-of-members").empty();

                    }
                    break;
                case "delete_room":
                    removedelement = $("li[data-room-id=" + data.room + "]")[0];
                    var list = document.getElementById("rooms");
                    var obj = data.name;
                    var me = $("#myself").val();
                    if (obj.match(me)) {
                        me = $("#myself").val() + ", ";
                        me2 = ", " + $("#myself").val();
                        var comma = obj.replace(/-/g, ', ');
                        var new_string = comma.replace(me, "");
                        new_string = new_string.replace(me2, "");
                        new_string = "me, " + new_string;
                        new_string = new_string.replace(/-deleted/g, "");
                        new_string = new_string.replace(/-removed/g, "");
                        new_string = new_string.replace(/-additional/g, "");
                        new_string = new_string.replace(/, deleted/g, "");
                        new_string = new_string.replace(/, additional/g, "");
                        new_string = new_string.replace(/, removed/g, "");
                    }
                    else {
                        var new_string = obj.replace(/-deleted/g, "");
                        new_string = new_string.replace(/-removed/g, "");
                        new_string = new_string.replace(/-additional/g, "");
                        new_string = new_string.replace(/, deleted/g, "");
                        new_string = new_string.replace(/, additional/g, "");
                        new_string = new_string.replace(/, removed/g, "");
                    }
                    let counterdelete = 0;
                    let avatardelete = ""

                    function avatarhtml(userdata) {
                        let avatar = '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '">';
                        if (userdata.avatar) {
                            avatar += '<img class="profile-pic" src="' + userdata.avatar + '">';

                        }
                        avatar += '</div>';
                        //let avatar = userdata.avatar ? '<img class="profile-pic" src="' + userdata.avatar + '">' : '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '"></div>'

                        return avatar
                    }
                    for (var i = 0; i < data.avatars.length; i++) {

                        // Only show avatars for the first three users in the chat
                        if (data.avatars[i].username == $("#myself").val()) {
                            continue
                        }
                        if (counterdelete > 2) {
                            break
                        }
                        avatardelete += avatarhtml(data.avatars[i])
                        counterdelete++;
                    }

                    for (var i = 0; i < avatararray.length; i++) {
                        av = avatararray[i];
                        if (av.group_id == data.room) {
                            avatararray[i] = {
                                "group_avatar": avatardelete,
                                "group_id": data.room
                            }
                            break;
                        }
                    }

                    let extraUsersAvatarDelete = data.avatars.length - i;
                    if ($("#myself").val() == data.removed_user && roomId == data.room) {
                        socket.send(
                            JSON.stringify({
                                command: "leave",
                                room: data.room,
                            })
                        );

                        $("#title-img").hide();
                        $("#typed_msg").hide();
                        $("#upload-photos-button").hide();
                        $(".msg_send_btn").hide();
                        $(".user-header").show();
                        $(".user-header p").hide();
                        $("#tag-input").hide();
                        $("#users-list").hide();
                        $("#chat-name").hide();
                        $(".chat-log").empty();
                        $(".rightAccordion").hide();
                        $(".rightPanel").hide();
                        $("#add-members").hide();
                        $("#create-chat").show();
                        $("#avatars").empty();

                        list.removeChild(removedelement);
                    }
                    else if ($("#myself").val() == data.removed_user && roomId != data.room) {
                        list.removeChild(removedelement);
                    }

                    else if ($("#myself").val() != data.removed_user) {

                        if (data.edited && roomId == data.room) {
                            wasclicked = false;
                            /*socket.send(
                                JSON.stringify({
                                    command: "leave",
                                    room: data.room,
                                })
                            );*/
                            socket.send(
                                JSON.stringify({
                                    command: "join",
                                    room: data.room,
                                    "wasclicked": wasclicked,
                                })
                            );
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avatardelete);
                            $("#avatar").empty();
                            $("#avatar").append(avatardelete);
                            $(".list-of-members").empty();
                            socket.send(
                                JSON.stringify({
                                    command: "members",
                                    room: data.room,
                                })
                            );
                            $(".chat-log").append(
                                `<div class='notice-message'>` +
                                `<span>` +
                                data.msgAlert +
                                `</span>` +
                                `</div>`);

                        }
                        else if (!data.edited && roomId == data.room) {
                            wasclicked = false;
                            /*socket.send(
                                JSON.stringify({
                                    command: "leave",
                                    room: data.room,
                                })
                            );*/
                            socket.send(
                                JSON.stringify({
                                    command: "join",
                                    room: data.room,
                                    "wasclicked": wasclicked,
                                })
                            );
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avatardelete);
                            $("#avatar").empty();
                            $("#avatar").append(avatardelete);
                            $("[room-name-value=" + data.room + "]").html("");
                            $("[room-name-value=" + data.room + "]").html(new_string);
                            $(".room-title").html("");
                            $(".room-title").html(new_string);
                            $(".list-of-members").empty();
                            socket.send(
                                JSON.stringify({
                                    command: "members",
                                    room: data.room,
                                })
                            );
                            $(".chat-log").append(
                                `<div class='notice-message'>` +
                                `<span>` +
                                data.msgAlert +
                                `</span>` +
                                `</div>`);
                        }
                        else if (!data.edited && roomId != data.room) {
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avatardelete);
                            $("[room-name-value=" + data.room + "]").html("");
                            $("[room-name-value=" + data.room + "]").html(new_string);
                        }
                        else if (data.edited && roomId != data.room) {
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avatardelete);
                        }
                    }
                    //menuclicked(`delete-${data.room}`, `edit-${data.room}`);
                    showDefaultAvatar();
                    break;
                case "get_users":

                    var allusers = data.user
                    //let avatarofusers = allusers.avatar ? '<img class="profile-pic" src="' + allusers.avatar + '">' : '<div class="profile-pic-wrapper" style="display: inline; width: 10%;" data-username="' + allusers.username + '" data-bgcolor="' + allusers.default + '"></div>'

                    memberlist[y] = {
                        value: allusers.id,
                        name: allusers.username,
                        email: allusers.email,
                        avatar: allusers.avatar,
                        default: allusers.default,
                        online: allusers.online
                    }
                    y++;

                    //populate();
                    break;
                case "get_additional":

                    //var newTitle = data.adder
                    var list = document.getElementById("rooms");
                    var obj = data.name;
                    var me = $("#myself").val();
                    if (obj.match(me)) {
                        me = $("#myself").val() + ", ";
                        me2 = ", " + $("#myself").val();
                        var comma = obj.replace(/-/g, ', ');
                        var new_string = comma.replace(me, "");
                        new_string = new_string.replace(me2, "");
                        new_string = "me, " + new_string;
                        new_string = new_string.replace(/-deleted/g, "");
                        new_string = new_string.replace(/-removed/g, "");
                        new_string = new_string.replace(/-additional/g, "");
                        new_string = new_string.replace(/, deleted/g, "");
                        new_string = new_string.replace(/, additional/g, "");
                        new_string = new_string.replace(/, removed/g, "");
                    }
                    else {
                        var new_string = obj.replace(/-deleted/g, "");
                        new_string = new_string.replace(/-removed/g, "");
                        new_string = new_string.replace(/-additional/g, "");
                        new_string = new_string.replace(/, deleted/g, "");
                        new_string = new_string.replace(/, additional/g, "");
                        new_string = new_string.replace(/, removed/g, "");
                    }
                    let avataradditional = ""
                    let counteradditional = 0;

                    function avatarhtml(userdata) {
                        let avatar = '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '">';
                        if (userdata.avatar) {
                            avatar += '<img class="profile-pic" src="' + userdata.avatar + '">';

                        }
                        avatar += '</div>';
                        //let avatar = userdata.avatar ? '<img class="profile-pic" src="' + userdata.avatar + '">' : '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '"></div>'

                        return avatar
                    }
                    for (var i = 0; i < data.avatars.length; i++) {

                        // Only show avatars for the first three users in the chat
                        /*if (data.avatars[i].username == $("#myself").val()) {
                            continue
                        }*/
                        if (counteradditional > 2) {
                            break
                        }
                        avataradditional += avatarhtml(data.avatars[i])
                        counteradditional++;
                    }
                    for (var i = 0; i < avatararray.length; i++) {
                        av = avatararray[i];
                        if (av.group_id == data.room) {
                            avatararray[i] = {
                                "group_avatar": avataradditional,
                                "group_id": data.room
                            }
                            avatarsexist = true;
                            break;
                        }

                    }
                    if (!avatarsexist) {
                        var r = avatararray.length;
                        avatararray[r] = {
                            "group_avatar": avataradditional,
                            "group_id": data.room
                        }
                    }
                    let extraUsersAvatarAdd = data.avatars.length - i;
                    //let text = (data.message.text) ? data.message.text : data.message;

                    roomexists = ($("li[data-room-id=" + data.room + "]")[0]) ? true : false;

                    if (roomexists == true) {
                        if (data.edited && roomId == data.room) {
                            wasclicked = false;
                            /*socket.send(
                                JSON.stringify({
                                    command: "leave",
                                    room: data.room,
                                })
                            );*/
                            socket.send(
                                JSON.stringify({
                                    command: "join",
                                    room: data.room,
                                    "wasclicked": wasclicked,
                                })
                            );
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avataradditional);
                            $("#avatar").empty();
                            $("#avatar").append(avataradditional);
                            $(".list-of-members").empty();
                            socket.send(
                                JSON.stringify({
                                    command: "members",
                                    room: data.room,
                                })
                            );
                            $(".chat-log").append(
                                `<div class='notice-message'>` +
                                `<span>` +
                                data.msgAlert +
                                `</span>` +
                                `</div>`);
                        }
                        else if (!data.edited && roomId == data.room) {
                            wasclicked = false;
                            /*socket.send(
                                JSON.stringify({
                                    command: "leave",
                                    room: data.room,
                                })
                            );*/
                            socket.send(
                                JSON.stringify({
                                    command: "join",
                                    room: data.room,
                                    "wasclicked": wasclicked,
                                })
                            );
                            $("[room-name-value=" + data.room + "]").html("");
                            $("[room-name-value=" + data.room + "]").html(new_string);
                            $(".room-title").html("");
                            $(".room-title").html(new_string);
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avataradditional);
                            $("#avatar").empty();
                            $("#avatar").append(avataradditional);
                            $(".list-of-members").empty();
                            socket.send(
                                JSON.stringify({
                                    command: "members",
                                    room: data.room,
                                })
                            );
                            $(".chat-log").append(
                                `<div class='notice-message'>` +
                                `<span>` +
                                data.msgAlert +
                                `</span>` +
                                `</div>`);
                        }
                        else if (!data.edited && roomId != data.room) {
                            $("[room-name-value=" + data.room + "]").html("");
                            $("[room-name-value=" + data.room + "]").html(new_string);
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avataradditional);
                        }
                        else if (data.edited && roomId != data.room) {
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avataradditional);
                        }

                    }
                    else {

                        $(".rooms").append(
                            `<li id="room-link" class="room-link" data-room-id="${data.room}" name="${data.room}">
                                    <div class="wrap">
                                        <div avatar-value="${data.room}" class="avatars">
                                            ${avataradditional}
                                        </div>
                                        <div class="room-details">
                                            <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" room-name-value="${data.room}" class="name-of-room" id="name-of-room">${new_string}</span>
                                            <p message-preview-value="${data.room}" class="preview">${data.preview}</p>
                                        </div>
                                        <span
                                            ellipsis-value="${data.room}" id="ellipsis-${data.room}" class="las la-ellipsis-v ellipsis">
                                            </span>
                                        <div class="chat-dropdown"> 
                                            
                                            <div chat-dropdown-value="${data.room}" class="chat-dropdown-content">

                                            <a edit-button-value="${data.room}" class="edit-button" id="edit-${data.room}">Edit Name</a>
                                            <a delete-button-value="${data.room}" class="delete-button" id="delete-${data.room}">Delete Room</a>
                                                    </div>
                                        </div>
                                    </div>

                                    </li>`);
                        editbuttonclicked(`ellipsis-${data.room}`);
                        menuclicked(`delete-${data.room}`, `edit-${data.room}`);
                        var additionalroom = $("li[data-room-id=" + data.room + "]")[0];
                        $(additionalroom).addClass("unread");
                        var noticeofadditionalchat = document.getElementById("chatAudio");
                        noticeofadditionalchat.play();
                    }


                    showDefaultAvatar();
                    break;
                case "remove_user":

                    //var newTitle = data.adder
                    let old_room = $("li[data-room-id=" + data.room + "]")[0];
                    let old_room_edit_id = $("#edit-" + data.room)[0];
                    let old_room_delete_id = $("#delete-" + data.room)[0];
                    let old_room_avatar = $("[avatar-value=" + data.room + "]")[0];
                    let old_room_name = $("[room-name-value=" + data.room + "]")[0];
                    let old_room_preview = $("[message-preview-value=" + data.room + "]")[0];
                    let old_room_ellipsis = $("[ellipsis-value=" + data.room + "]")[0];
                    let old_room_dropdown = $("[chat-dropdown-value=" + data.room + "]")[0];
                    let old_room_edit_button = $("[edit-button-value=" + data.room + "]")[0];
                    let old_room_delete_button = $("[delete-button-value=" + data.room + "]")[0];
                    let old_room_ellipsis_id = $("span[ellipsis-value=" + data.room + "]")[0];
                    var obj = data.name;
                    var me = $("#myself").val();
                    if (obj.match(me)) {
                        me = $("#myself").val() + ", ";
                        me2 = ", " + $("#myself").val();
                        var comma = obj.replace(/-/g, ', ');
                        var new_string = comma.replace(me, "");
                        new_string = new_string.replace(me2, "");
                        new_string = "me, " + new_string;
                        new_string = new_string.replace(/-deleted/g, "");
                        new_string = new_string.replace(/-removed/g, "");
                        new_string = new_string.replace(/-additional/g, "");
                        new_string = new_string.replace(/, deleted/g, "");
                        new_string = new_string.replace(/, additional/g, "");
                        new_string = new_string.replace(/, removed/g, "");
                    }
                    else {
                        var new_string = obj.replace(/-deleted/g, "");
                        new_string = new_string.replace(/-removed/g, "");
                        new_string = new_string.replace(/-additional/g, "");
                        new_string = new_string.replace(/, deleted/g, "");
                        new_string = new_string.replace(/, additional/g, "");
                        new_string = new_string.replace(/, removed/g, "");
                    }
                    let avatarremove = ""
                    let counterremove = 0;

                    function avatarhtml(userdata) {
                        let avatar = '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '">';
                        if (userdata.avatar) {
                            avatar += '<img class="profile-pic" src="' + userdata.avatar + '">';

                        }
                        avatar += '</div>';
                        //let avatar = userdata.avatar ? '<img class="profile-pic" src="' + userdata.avatar + '">' : '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '"></div>'

                        return avatar
                    }

                    for (var i = 0; i < data.avatars.length; i++) {

                        if ($("#myself").val() != data.removed_user) {
                            // Only show avatars for the first three users in the chat
                            /*if (data.avatars[i].username == $("#myself").val()) {
                                continue
                            }*/
                            if (counterremove > 2) {
                                break
                            }
                            avatarremove += avatarhtml(data.avatars[i])
                            counterremove++;
                        }
                        else {
                            avatarremove += avatarhtml(data.avatars[i])
                            break
                        }

                    }
                    if ($("#myself").val() == data.removed_user) {
                        avatararray[a] = {
                            "group_avatar": avatarremove,
                            "group_id": data.new_room
                        }
                        a++;
                    }
                    else {
                        avatararray[a] = {
                            "group_avatar": avatarremove,
                            "group_id": data.room
                        }
                        a++;
                    }
                    let extraUsersAvatarRemove = data.avatars.length - i;

                    if ($("#myself").val() == data.removed_user && roomId == data.room) {
                        socket.send(
                            JSON.stringify({
                                command: "leave",
                                room: data.room,
                            })
                        );
                        $("[avatar-value=" + data.new_room + "]").html("");
                        $("[avatar-value=" + data.new_room + "]").html(avatarremove);
                        $("#avatar").empty();
                        $("#avatar").append(avatarremove);
                        old_room.setAttribute("name", data.new_room);
                        old_room.setAttribute("data-room-id", data.new_room);
                        old_room_name.setAttribute("room-name-value", data.new_room);
                        old_room_preview.setAttribute("message-preview-value", data.new_room);
                        old_room_ellipsis.setAttribute("ellipsis-value", data.new_room);
                        old_room_dropdown.setAttribute("chat-dropdown-value", data.new_room);
                        old_room_edit_button.setAttribute("edit-button-value", data.new_room);
                        old_room_delete_button.setAttribute("delete-button-value", data.new_room);
                        old_room_avatar.setAttribute("avatar-value", data.new_room);
                        old_room_ellipsis_id.setAttribute("id", "ellipsis-" + data.new_room);
                        old_room_edit_id.setAttribute("id", "edit-" + data.new_room);
                        old_room_delete_id.setAttribute("id", "delete-" + data.new_room);

                        $(".list-of-members").empty();
                        socket.send(
                            JSON.stringify({
                                command: "members",
                                room: data.new_room,
                            })
                        );
                        $(".chat-log").append(
                            `<div class='notice-message'>` +
                            `<span>` +
                            data.msgAlert +
                            `</span>` +
                            `</div>`);
                    }
                    else if ($("#myself").val() == data.removed_user && roomId != data.room) {
                        $("[avatar-value=" + data.new_room + "]").html("");
                        $("[avatar-value=" + data.new_room + "]").html(avatarremove);


                        old_room.setAttribute("name", data.new_room);
                        old_room.setAttribute("data-room-id", data.new_room);
                        old_room_name.setAttribute("room-name-value", data.new_room);
                        old_room_preview.setAttribute("message-preview-value", data.new_room);
                        old_room_ellipsis.setAttribute("ellipsis-value", data.new_room);
                        old_room_dropdown.setAttribute("chat-dropdown-value", data.new_room);
                        old_room_edit_button.setAttribute("edit-button-value", data.new_room);
                        old_room_delete_button.setAttribute("delete-button-value", data.new_room);
                        old_room_avatar.setAttribute("avatar-value", data.new_room);
                        old_room_ellipsis_id.setAttribute("id", "ellipsis-" + data.new_room);
                        old_room_edit_id.setAttribute("id", "edit-" + data.new_room);
                        old_room_delete_id.setAttribute("id", "delete-" + data.new_room);


                        //editbuttonclicked(`ellipsis-${data.new_room}`);
                        //menuclicked(`delete-${data.new_room}`, `edit-${data.new_room}`);
                    }
                    else if ($("#myself").val() != data.removed_user) {
                        if (data.edited && roomId == data.room) {
                            wasclicked = false
                            /*socket.send(
                                JSON.stringify({
                                    command: "leave",
                                    room: data.room,
                                })
                            );*/
                            socket.send(
                                JSON.stringify({
                                    command: "join",
                                    room: data.room,
                                    "wasclicked": wasclicked,
                                })
                            );
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avatarremove);
                            $("#avatar").empty();
                            $("#avatar").append(avatarremove);
                            $(".list-of-members").empty();
                            socket.send(
                                JSON.stringify({
                                    command: "members",
                                    room: data.room,
                                })
                            );
                            $(".chat-log").append(
                                `<div class='notice-message'>` +
                                `<span>` +
                                data.msgAlert +
                                `</span>` +
                                `</div>`);
                        }
                        else if (!data.edited && roomId == data.room) {
                            wasclicked = false;
                            /*socket.send(
                                JSON.stringify({
                                    command: "leave",
                                    room: data.room,
                                })
                            );*/
                            socket.send(
                                JSON.stringify({
                                    command: "join",
                                    room: data.room,
                                    "wasclicked": wasclicked,
                                })
                            );
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avatarremove);
                            $("#avatar").empty();
                            $("#avatar").append(avatarremove);
                            $("[room-name-value=" + data.room + "]").html("");
                            $("[room-name-value=" + data.room + "]").html(new_string);
                            $(".room-title").html("");
                            $(".room-title").html(new_string);
                            $(".list-of-members").empty();
                            socket.send(
                                JSON.stringify({
                                    command: "members",
                                    room: data.room,
                                })
                            );
                            $(".chat-log").append(
                                `<div class='notice-message'>` +
                                `<span>` +
                                data.msgAlert +
                                `</span>` +
                                `</div>`);
                        }
                        else if (!data.edited && roomId != data.room) {
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avatarremove);
                            $("[room-name-value=" + data.room + "]").html("");
                            $("[room-name-value=" + data.room + "]").html(new_string);
                        }
                        else if (data.edited && roomId != data.room) {
                            $("[avatar-value=" + data.room + "]").html("");
                            $("[avatar-value=" + data.room + "]").html(avatarremove);
                        }
                    }

                    showDefaultAvatar();
                    break;

                case "get_rooms":
                    roomie = data.rooms;
                    let o = 0;
                    allRooms[o] = roomie.id;
                    o++;

                    var obj = roomie.name;
                    var me = $("#myself").val();
                    if (obj.match(me)) {
                        me = $("#myself").val() + ", ";
                        me2 = ", " + $("#myself").val();
                        var comma = obj.replace(/-/g, ', ');
                        var new_string = comma.replace(me, "");
                        new_string = new_string.replace(me2, "");
                        new_string = "me, " + new_string;
                        new_string = new_string.replace(/-deleted/g, "");
                        new_string = new_string.replace(/-removed/g, "");
                        new_string = new_string.replace(/-additional/g, "");
                        new_string = new_string.replace(/, deleted/g, "");
                        new_string = new_string.replace(/, additional/g, "");
                        new_string = new_string.replace(/, removed/g, "");
                    }
                    else {
                        var new_string = obj.replace(/-deleted/g, "");
                        new_string = new_string.replace(/-removed/g, "");
                        new_string = new_string.replace(/-additional/g, "");
                        new_string = new_string.replace(/, deleted/g, "");
                        new_string = new_string.replace(/, additional/g, "");
                        new_string = new_string.replace(/, removed/g, "");
                    }

                    let avatardiv = ""
                    let preview = ""
                    let counter = 0;

                    function avatarhtml(userdata) {
                        let avatar = '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '">';
                        if (userdata.avatar) {
                            avatar += '<img class="profile-pic" src="' + userdata.avatar + '">';

                        }
                        avatar += '</div>';
                        //let avatar = userdata.avatar ? '<img class="profile-pic" src="' + userdata.avatar + '">' : '<div class="profile-pic-wrapper" data-username="' + userdata.username + '" data-bgcolor="' + userdata.default + '"></div>'

                        return avatar
                    }
                    for (var i = 0; i < data.rooms.avatars.length; i++) {
                        /*<div class="profile-pic-wrapper" data-username="{{user.username}}" data-bgcolor="{{user.bgColor}}">
                        {% if user.avatar %}
                        <img class="profile-pic" src="{{user.avatar.url}}">
                        {% endif %}
                        </div>*/

                        // Only show avatars for the first three users in the chat
                        /*if (data.rooms.avatars[i].username == $("#myself").val()) {
                            continue
                        }*/
                        if (counter > 2) {
                            break
                        }
                        avatardiv += avatarhtml(data.rooms.avatars[i])
                        counter++;
                    }

                    avatararray[a] = {
                        "group_avatar": avatardiv,
                        "group_id": roomie.id
                    }
                    a++;
                    let extraUsers = data.rooms.avatars.length - i;

                    for (var j = 0; j < data.rooms.preview.length; j++) {

                        preview = data.rooms.preview[j];

                    }
                    $(".rooms").append(
                        `<li id="room-link" class="room-link" data-room-id="${roomie.id}" name="${roomie.id}">
                        <div class="wrap">
                            <div avatar-value="${roomie.id}" class="avatars" style="
                            bottom: 7px;
                        ">
                            ${avatardiv}
                            </div>
                            <div class="room-details">
                                <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" room-name-value="${roomie.id}" class="name-of-room" id="name-of-room">${new_string}</span>
                                <p message-preview-value="${roomie.id}" class="preview">${preview}</p>
                            </div>
                            <span
                                 ellipsis-value="${roomie.id}" id="ellipsis-${roomie.id}" class="las la-ellipsis-v ellipsis">
                                </span>

                        </div>
                        <div class="chat-dropdown">
                            <div chat-dropdown-value="${roomie.id}" class="chat-dropdown-content dropdown-menu">
                                <a edit-button-value="${roomie.id}" class="edit-button dropdown-item" id="edit-${roomie.id}">Edit Name</a>
                                <a delete-button-value="${roomie.id}" class="delete-button dropdown-item" id="delete-${roomie.id}">Delete Room</a>
                            </div>
                        </div>
                        </li>`
                    );

                    if (data.rooms.unread == true) {
                        var firstunreadroom = $("li[data-room-id=" + roomie.id + "]")[0];
                        $(firstunreadroom).addClass("unread");
                        if (data.rooms.acknowledged == false) {
                            var firstnoticeofunreadchat = document.getElementById("chatAudio");
                            firstnoticeofunreadchat.play();
                            socket.send(
                                JSON.stringify({
                                    command: "acknowledged",
                                    room: roomie.id,
                                })
                            );
                        }
                    }

                    showDefaultAvatar();
                    editbuttonclicked(`ellipsis-${roomie.id}`);
                    menuclicked(`delete-${roomie.id}`, `edit-${roomie.id}`);
                    break;

                case "print_title":
                    var new_title = data.room;
                    title = new_title.name;
                    break;
                case "change_status":
                    //TO-DO: if awayclicked = false {let coloricon = green} else {let color icon = grey}
                    console.log("change_status");
                    var onlinelink = $("[data-link-id=" + data.id + "]");
                    onlinelink.css("background-color", "green");
                    $(".status-message").empty();
                    $(".status-message").append("Available");
                    break;
                case "change_status_off":
                    //TO-DO: if awayclicked = false {let coloricon = red} else {let color icon = grey}
                    console.log("change_status");
                    var onlinelink = $("[data-link-id=" + data.id + "]");
                    onlinelink.css("background-color", "red");
                    $(".status-message").empty();
                    $(".status-message").append("Away");
                    break;
                case "edit":
                    var target_li = $("li[data-room-id=" + data.room + "]")[0];
                    var nameOfChat = target_li.getElementsByTagName("span")[0];

                    if (roomId == data.room) {
                        wasclicked = false;
                        /*socket.send(
                            JSON.stringify({
                                command: "leave",
                                room: data.room,
                            })
                        );*/
                        socket.send(
                            JSON.stringify({
                                command: "join",
                                room: data.room,
                                "wasclicked": wasclicked,
                            })
                        );
                        $(nameOfChat).html("");
                        $(nameOfChat).html(data.name);
                        $(".room-title").html("");
                        $(".room-title").html(data.name);
                        $(".chat-log").append(
                            `<div class='notice-message'>` +
                            `<span>` +
                            data.msgAlert +
                            `</span>` +
                            `</div>`);

                    }
                    else {
                        $(nameOfChat).html("");
                        $(nameOfChat).html(data.name);
                    }

                    break;

                default:
                    console.log("Unsupported message type!");
                    return;
            }

            $(".chat-log").html();
            if (data.msg_type != "created")
                msgdiv.append(ok_msg);

            msgdiv.scrollTop(msgdiv.prop("scrollHeight"));
        } else {
            console.log("Cannot handle message!");
        }
    };

    $("#add-members").click(function () {
        $(".unread-break-line").hide();
        /*if (hideellipsis) {
            $("[chat-dropdown-value=" + chatDropdownId + "]").hide();
            hideellipsis = false;
        }
        else {
 
        }*/
        whitelist_2 = [];
        xisweird = 0;
        y = 0;
        z = 0;
        member = false;
        for (var j = 0; j < memberlist.length; j++) {
            var el = memberlist[j];
            for (var i = 0; i < nameofmembers.length; i++) {
                if (el.name == nameofmembers[i]) {
                    member = true;
                }
            }
            if (member == true) {
                whitelist_2[z] = {

                    "value": el.value,
                    "name": el.name,
                    "avatar2": "{% static 'app/images/PngItem_4212266.png' %}",
                    "avatar": el.avatar,
                    "email": el.email,
                    "default": el.default,
                    "disabled": true,
                    "status": el.online
                }
                member = false;
                z++;
            }
            else {
                whitelist_2[z] = {
                    "value": el.value,
                    "name": el.name,
                    "avatar2": "{% static 'app/images/PngItem_4212266.png' %}",
                    "avatar": el.avatar,
                    "email": el.email,
                    "default": el.default,
                    "disabled": false,
                    "status": el.online
                }

                z++;
            }

        }
        socket.send(
            JSON.stringify({
                command: "title",
                room: roomId,
            })
        );

        $(".room-name").html("");
        $(".room-name").html(title);
        $("#members-page").show();

        fillarray2();

        console.log("name", nameofmembers);
        console.log("memberlist", memberlist);
        console.log("whitelist", whitelist_2);

    });



    // Says if we joined a room or not by if there's a div for it
    inRoom = function (roomId) {
        return $("#room-" + roomId).length > 0;
    };

    // Room join/leave

    /* -Show all saved messages when joining a room
                -Make it if already in that room either do nothing or reload that room
                -if not in that room leave current room, if in one, then join the
                room that was clicked on
                -If not in room when a message comes in give it an unread class*/



    function editbuttonclicked(buttonclicked) {
        $("#" + buttonclicked).click(function (event) {
            chatDropdownId = $(this).attr("ellipsis-value");
            let currentdropdownselector = "[chat-dropdown-value=" + chatDropdownId + "]";
            let currentdropdown = $(currentdropdownselector)
            currentdropdown.css("left", event.clientX);
            currentdropdown.css("top", event.clientY);

            ellipsisClicked = true;
            //hideellipsis = true;


            $(".chat-dropdown-content").not(currentdropdownselector).hide();

            currentdropdown.toggle();
            if ($(currentdropdownselector).is(":visible")) {
                disableScroll();
            }
            else {

                enableScroll();
            }


        });
    }


    function menuclicked(deletechat, edit) {
        $("#" + deletechat).click(function () {
            $(".unread-break-line").hide();
            deleteroom = $(this).attr("delete-button-value");
            //modal show
            $(".confirmation-chat-modal").show();
            $("[chat-dropdown-value=" + chatDropdownId + "]").hide();

        });
        $("#" + edit).click(function () {
            $(".unread-break-line").hide();
            editroom = $(this).attr("edit-button-value");
            //modal show
            $(".edit-chat-modal").show();



            $("[chat-dropdown-value=" + chatDropdownId + "]").hide();
        });


    }
    function removeduserclicked(userclicked) {
        $("#" + userclicked).click(function () {
            $(".unread-break-line").hide();
            removeduser = $(this).attr("data-id");
            removedusername = $(this).attr("data-member-name");
            //modal show
            $(".confirmation-modal").show();
        });
    }
    $("#confirm").click(function () {
        var noticemsg = $("#myself").val() + " has removed " + removedusername + " from the chat."
        socket.send(
            JSON.stringify({
                command: "remove",
                room: roomId,
                old_user: removeduser,
                "message": noticemsg,
                "from_user": $("#myself").val(),
                "file": false,
                "notice": true,
            })
        );

        $(".confirmation-modal").hide();
    });
    $("#confirmation").click(function () {
        var noticemsg = $("#myself").val() + " has removed themself from the chat."
        socket.send(
            JSON.stringify({
                command: "delete",
                room: deleteroom,
                "message": noticemsg,
                "from_user": $("#myself").val(),
                "file": false,
                "notice": true,
            })
        );

        $(".confirmation-chat-modal").hide();
    });
    $("#confirmation-of-name").click(function () {
        newChatName = document.querySelector('#chatName').value;
        var noticemsg = $("#myself").val() + " has changed the chatname to " + newChatName + "."
        socket.send(
            JSON.stringify({
                command: "edit",
                room: editroom,
                newName: newChatName,
                "message": noticemsg,
                "from_user": $("#myself").val(),
                "file": false,
                "notice": true,
            })
        );

        $('input[name=new-chat-name]').val('');
        $(".edit-chat-modal").hide();
    });
    $("#exit-member-removal").click(function () {
        $(".confirmation-modal").hide();

    })
    $("#reverse").click(function () {
        $(".confirmation-chat-modal").hide();
    })
    $("#cancel-name").click(function () {
        $(".edit-chat-modal").hide();
    })
    $("#submit-users").on('click', function () {
        let arrayofnewusers = [];
        var noticemsg;
        arrayofnewusers = JSON.parse($("#user-input").val());
        for (var i = 0; i < arrayofnewusers.length; i++) {
            var el = arrayofnewusers[i];
            arrayofusers[i] = el.name;
            if (arrayofnewusers.length < 2) {
                noticemsg = $("#myself").val() + " has added " + el.name + " to the chat."
            }
            else {
                noticemsg = $("#myself").val() + " has added " + el.name + ", to the chat."
            }
        }
        socket.send(
            JSON.stringify({
                command: "add",
                room: roomId,
                newUsers: JSON.parse($("#user-input").val()),
                "message": noticemsg,
                "from_user": $("#myself").val(),
                "file": false,
                "notice": true,
            })
        );
        $("#members-page").hide();

    });
    $("#canc").on('click', function () {
        document.getElementById('members-page').style.display = 'none'
    });
    function roomClick() {
        let b = 0;
        xisweird = 0;
        y = 0;
        memberlist = [];
        if (ellipsisClicked == false) {


            roomId = $(this).attr("data-room-id");
            if (roomId == createroomid) {

            }
            else {
              $(".left-panel").hide();
              $(".middle-panel").show();
                $(".list-of-members").empty();
                $(".list-of-links").empty();
                $(".list-of-files").empty();
                $(".chat-log").empty();
                $(".unread-break-line").hide();
                unreadnotdisplayed = true;
                if (joinedroom) {
                    // Leave room
                    wasclicked = true;
                    socket.send(
                        JSON.stringify({
                            command: "leave",
                            room: createroomid,
                        })
                    );

                    socket.send(
                        JSON.stringify({
                            command: "join",
                            room: roomId,
                            "wasclicked": wasclicked,
                        })
                    );

                    if (createroom == true) {
                        createroom = false;
                    }

                    var readjoinedroom = $("li[data-room-id=" + roomId + "]")[0];
                    $(readjoinedroom).removeClass("unread");





                    socket.send(
                        JSON.stringify({
                            command: "members",
                            room: roomId,
                        })
                    );

                    socket.send(
                        JSON.stringify({
                            command: "users",
                        })
                    );
                    $(this).addClass('active-room').siblings().removeClass('active-room');
                    for (var i = 0; i < avatararray.length; i++) {
                        av = avatararray[i];
                        if (av.group_id == roomId) {
                            $("#avatars").empty();
                            $("#avatars").append(av.group_avatar);
                            break;
                        }
                    }
                    showDefaultAvatar();
                    $("#title-img").show();
                    $(".user-header").show();
                    $(".user-header p").show();
                    $("#create-chat").show();
                    $("#tag-input").hide();
                    $("#users-list").hide();
                    $("#chat-name").hide();
                    $(".rightAccordion").show();
                    $(".rightPanel").show();
                    $(".title-wrap").show();


                    /*if (hideellipsis) {
                        $("[chat-dropdown-value=" + chatDropdownId + "]").hide();
                        hideellipsis = false;
                    }
                    else {
     
                    }*/
                    //empty chat log
                } else {
                    // Join room
                    wasclicked = true;

                    if (createroom == true) {
                        createroom = false;
                    }
                    var readroom = $("li[data-room-id=" + roomId + "]")[0];
                    $(readroom).removeClass("unread");

                    $(".list-of-members").empty();
                    $(".list-of-links").empty();
                    $(".list-of-files").empty();
                    $(".chat-log").empty();

                    socket.send(
                        JSON.stringify({
                            command: "join",
                            room: roomId,
                            "wasclicked": wasclicked,
                        })
                    );

                    socket.send(
                        JSON.stringify({
                            command: "members",
                            room: roomId,
                        })
                    );

                    socket.send(
                        JSON.stringify({
                            command: "users",
                        })
                    );
                    $(this).addClass('active-room').siblings().removeClass('active-room');
                    for (var i = 0; i < avatararray.length; i++) {
                        av = avatararray[i];
                        if (av.group_id == roomId) {
                            $("#avatars").empty();
                            $("#avatars").append(av.group_avatar);
                            break;
                        }
                    }
                    showDefaultAvatar();
                    $("#title-img").show();
                    $(".user-header").show();
                    $(".user-header p").show();
                    $("#create-chat").show();
                    $("#tag-input").hide();
                    $("#users-list").hide();
                    $("#chat-name").hide();
                    $(".rightAccordion").show();
                    $(".rightPanel").show();
                    $(".title-wrap").show();


                    /*if (hideellipsis) {
                        $("[chat-dropdown-value=" + chatDropdownId + "]").hide();
                        hideellipsis = false;
                    }
                    else {
     
                    }*/
                }
            }
        }
        else {
            ellipsisClicked = false;
        }
    }
    $(document).on('click', '.room-link', roomClick)

    // Creating Rooms

    $("#create-chat").click(function () {
        wasclicked = false;

        if (joinedroom) {
            socket.send(
                JSON.stringify({
                    command: "leave",
                    room: roomId,
                })
            );
        }
        /*if (hideellipsis) {
            $("[chat-dropdown-value=" + chatDropdownId + "]").hide();
            hideellipsis = false;
        }
        else {
 
        }*/
        $(".room-link").removeClass('active-room');
        $("#title-img").hide();
        $("#upload-photos-button").show();
        $(".title-wrap").hide();
        $("#create-chat").hide();
        $("#tag-input").show();
        $("#users-list").show();
        $("#chat-name").show();
        $(".chat-log").empty();
        $("#typed_msg").show();
        $(".msg_send_btn").show();
        $(".rightAccordion").hide();
        $(".rightPanel").hide();
        createroom = true;
        joinedroom = false;
        roomId = null;
        createroomid = null;
        getusers();
        getallusers();

    });

    function getusers() {
        memberlist = [];
        y = 0;
        socket.send(
            JSON.stringify({
                command: "users",
            })
        );
    }
    /*function populate() {
        for (var i = 0; i < memberlist.length; i++) {
            var el = memberlist[i];
            let avatarofwhitelist = el.avatar ? '<img class="profile-pic" src="' + el.avatar + '">' : '<div class="profile-pic-wrapper" style="display: inline; width: 10%;" data-username="' + el.name + '" data-bgcolor="' + el.default + '"></div>'
 
            whitelist_2[z] = {
 
                "value": el.value,
                "name": el.name,
                "avatar": "{% static 'app/images/PngItem_4212266.png' %}",
                "email": el.email,
            }
            z++;
        }
        showDefaultAvatar();
    }*/



    $("#available").click(function () {
        $(".status-dropdown-menu").hide();
        $(".status-message").empty();
        $(".status-message").append("Available");
        socket.send(
            JSON.stringify({
                "command": "was_connected",
                "user": $("#myself").val(),
            })
        );
        awayclicked = false;
    })
    $("#away").click(function () {
        $(".status-dropdown-menu").hide();
        $(".status-message").empty();
        $(".status-message").append("Away");
        socket.send(
            JSON.stringify({
                "command": "was_disconnected",
                "user": $("#myself").val(),
            })
        );
        awayclicked = true;
    })

    // Helpful debugging
    socket.onopen = function () {
        console.log("Connected to chat socket");
        socketopen = true;
        if (socketopen) {
            console.log("disconnected modal hidden")
            $(".Disconnected-modal").hide();
            socket.send(
                JSON.stringify({
                    "command": "rooms",
                })
            );
            socket.send(
                JSON.stringify({
                    "command": "was_connected",
                    "user": $("#myself").val(),
                })
            );
            if (roomId) {
                //give room you were in active class and join it
                let activeroom = $("li[room-link=" + roomId + "]")[0];
                wasclicked = false;
                socket.send(
                    JSON.stringify({
                        command: "join",
                        room: roomId,
                        "wasclicked": wasclicked,
                    })
                );
                $(activeroom).addClass("active-room");
            }
        }
    };
    socket.onclose = function () {
        socketopen = false;
        console.log("Disconnected from chat socket");
        if (!socketopen) {
            console.log("disconnected modal shown")
            $(".Disconnected-modal").show();
            $(".rooms").empty();
            socket.send(
                JSON.stringify({
                    "command": "was_disconnected",
                    "user": $("#myself").val(),
                })
            );
        }
    };
  $("#go_back").on("click", goback);

  function goback() {
    socket.send(
      JSON.stringify({
          command: "leave",
          room: roomId,
      })
  );
    document.getElementById("myForm").style.width = "21%";
    document.getElementById("middle-panel").style.width = "100%"
    $(".left-panel").show();
    $(".middle-panel").hide();
    $(".right-panel").hide();
    roomId = null;
    createroomid = null;

  };

  $("#expand").on("click", expand);

  function expand() {
    $(this).toggleClass('la-compress-arrows-alt la-expand-arrows-alt');
    if (clickState == 0) {
      document.getElementById("myForm").style.width = "600px";
      document.getElementById("middle-panel").style.width = "50%"
      document.getElementById("right-panel").style.width = "50%"
      $(".right-panel").show();
      clickState = 1;
    } else {
      $(".right-panel").hide();
      document.getElementById("myForm").style.width = "21%";
      document.getElementById("middle-panel").style.width = "100%"
      clickState = 0;
    }
  };
  function fillarray2() {

    var input = document.querySelector('input[name=tags-manual-suggestions]');
    // init Tagify script on the above inputs
    input.addEventListener('change', onChange)

    function onChange(e) {
        if (input.value != 0) {
            document.getElementById('submit-users').disabled = false;
        } else {
            document.getElementById('submit-users').disabled = true;
        }
    }

    tagify = new Tagify(input, {
        tagTextProp: 'name', // very important since a custom template is used with this property as text
        templates: {
            tag: function (tagData) {
                try {
                    let avatarurl = "";
                    for (var i = 0; i < memberlist.length; i++) {
                        var el = memberlist[i];
                        if (el.value == tagData.value) {
                            avatarurl = el.avatar
                            break;
                        }
                    }
                    return `
                        <tag title="${tagData.email}"
                            contenteditable='false'
                            spellcheck='false'
                            tabIndex="-1"
                            class="tagify__tag ${tagData.class ? tagData.class : ""}"
                            ${this.getAttributes(tagData)}>
                        <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
                        <div>
                            ${tagData.avatar ? `
                    <div class='tagify__tag__avatar-wrap'>
                        <img onerror="this.style.visibility='hidden'" src="${avatarurl}">
                    </div>` : `<div class='tagify__tag__avatar-wrap' data-username="${tagData.name}" data-bgcolor="${tagData.default}">
                <div data-link-id="${tagData.value}"class="online_icon"></div>
            </div>`}
                            <span class='tagify__tag-text'>${tagData.name}</span>
                        </div>
                        </tag>`
                }
                catch (err) { }
            },

            dropdownItem: function (tagData) {
                try {
                    //let onlineicon = status;
                    let avatarurl = "";
                    for (var i = 0; i < memberlist.length; i++) {
                        var el = memberlist[i];
                        if (el.value == tagData.value) {
                            avatarurl = el.avatar
                            break;
                        }
                    }
                    if (tagData.disabled) {
                        let avatarurl = "";
                        for (var i = 0; i < memberlist.length; i++) {
                            var el = memberlist[i];
                            if (el.value == tagData.value) {
                                avatarurl = el.avatar
                                break;
                            }
                        }
                        return `
                       <div ${this.getAttributes(tagData)}
                           style="display: none;"
                           class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}'
                           tabindex="0"
                           role="option">
                           ${tagData.avatar ? `
                           <div class='tagify__dropdown__item__avatar-wrap'>
                               <img class='tagify__dropdown__item__avatar-wrap' onerror="this.style.visibility='hidden'" src="${avatarurl}">
                           </div>` : ''
                            }
                           <strong>${tagData.name}</strong>
                           <span>${tagData.email}</span>
                       </div>
                   `
                    }
                    else {
                        return `
                       <div ${this.getAttributes(tagData)}
                           class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}'
                           tabindex="0"
                           role="option">
                           ${tagData.avatar ? `         
                            <div class='tagify__dropdown__item__avatar-wrap'>
                            <img onerror="this.style.visibility='hidden'" src="${avatarurl}">
                            ${tagData.status === true ? `<div data-link-id="${tagData.value}"class="online_icon" style="background-color: green"></div>` : `<div data-link-id="${tagData.value}"class="online_icon" style="background-color: red"></div>`}
                            </div>` : `<div class='tagify__dropdown__item__avatar-wrap' data-username="${tagData.name}" data-bgcolor="${tagData.default}">
                                ${tagData.status === true ? `<div data-link-id="${tagData.value}"class="online_icon" style="background-color: green"></div>` : `<div data-link-id="${tagData.value}"class="online_icon" style="background-color: red"></div>`}
                                </div>`
                            }
                           <strong>${tagData.name}</strong>
                           <span>${tagData.email}</span>
                       </div>
                   `

                    }
                }
                catch (err) { }
            }
        },

        dropdown: {
            position: "manual",
            maxItems: Infinity,
            enabled: 0,
            searchKeys: ['id', 'email'],  // very important to set by which keys to search for suggesttions when typing
            classname: "customSuggestionsList"
        },
        enforceWhitelist: true,
        whitelist: []
    })

    //var whitelist_1 = [{ "value": 2, "name": "bannas", "avatar": "{% static 'app/images/PngItem_4212266.png' %}", "email": "oh" }];

    tagify.settings.whitelist = whitelist_2;


    tagify.on("dropdown:show", onSuggestionsListUpdate)
        .on("dropdown:hide", onSuggestionsListHide)
        //.on('dropdown:scroll', onDropdownScroll)
        .on("dropdown:select", onDropdownSelect)
        .on("dropdown:updated", onDropdownSelect)
        .on("dropdown:noMatch", onDropdownSelect)
        .on("add", onTagSelect)

    renderSuggestionsList()

    function onDropdownSelect() {
        showTagAvatars();
        showDropdownAvatars();
    }
    function onTagSelect() {
        showTagAvatars();
    }
    // ES2015 argument destructuring
    function onSuggestionsListUpdate({ detail: suggestionsElm }) {
        showDropdownAvatars();
        //console.log(suggestionsElm)
    }

    function onSuggestionsListHide() {
        //console.log("hide dropdown")
    }

    function onDropdownScroll(e) {
        //console.log(e.detail)
        //showDropdownAvatars();
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    function renderSuggestionsList() {
        tagify.dropdown.show.call(tagify) // load the list
        tagify.DOM.scope.parentNode.appendChild(tagify.DOM.dropdown)
    }



    $("#canc").on('click', tagify.removeAllTags.bind(tagify));


    $("#submit-users").on('click', tagify.removeAllTags.bind(tagify));


    showDropdownAvatars();

}
});
