var interval;
document.addEventListener("DOMContentLoaded", function () {
	initTime();
	if (localStorage.getItem("theme")) {
		localStorage.setItem("selenite.theme", localStorage.getItem("theme"));
		localStorage.removeItem("theme");
	}
	if (localStorage.getItem("selenite.theme")) {
		document.body.setAttribute("theme", localStorage.getItem("selenite.theme"));
	} else {
		document.body.setAttribute("theme", "main");
	}
	if (document.querySelectorAll("[id=adcontainer]")) {
		for (let i = 0; i < document.querySelectorAll("[id=adcontainer]").length; i++) {
			if (Math.random() < 0.5 || localStorage.getItem("selenite.adblock") == "true") document.querySelectorAll("[id=adcontainer]")[i].innerHTML = "";
		}
	}
	const iconSetting = document.querySelector("input#discordIcon");
	const blockClose = document.querySelector("input#blockClose");
	const openBlank = document.getElementById("blank");
	if (document.querySelector("widgetbot-crate")) {
		if (localStorage.getItem("selenite.discordIcon") == "true") {
			const widget = document.querySelector("widgetbot-crate");
			widget.setAttribute("style", "display:none");
		}
	}
	if (document.querySelector("input#discordIcon")) {
		if (localStorage.getItem("selenite.discordIcon") == "true") {
			iconSetting.checked = true;
		}
		iconSetting.addEventListener("click", () => {
			localStorage.setItem("selenite.discordIcon", iconSetting.checked);
		});
	}
	if (document.querySelector("input#blockClose")) {
		if (localStorage.getItem("selenite.blockClose") == "true") {
			blockClose.checked = true;
		}
		blockClose.addEventListener("click", () => {
			localStorage.setItem("selenite.blockClose", blockClose.checked);
		});
	}
	if (document.querySelector("input#tabDisguise")) {
		if (localStorage.getItem("selenite.tabDisguise") == "true") {
			tabDisguise.checked = true;
		}
		tabDisguise.addEventListener("click", () => {
			localStorage.setItem("selenite.tabDisguise", tabDisguise.checked);
		});
	}
	document.getElementById("blank").addEventListener("click", () => {
		win = window.open();
		win.document.body.style.margin = "0";
		win.document.body.style.height = "100vh";
		html = `
        <style>*{margin:0;padding:0;border:none}body,iframe{height:100vh;width:100vw}iframe{height:96vh}header{display:flex;height:4vh;justify-content:center;}button{margin-right:100px;height:100%;aspect-ratio: 1 / 1}#reload{background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath d='M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z'/%3E%3C/svg%3E");background-size:cover;}#goBack{background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath d='M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z'/%3E%3C/svg%3E");background-size:cover;}</style><script>
        </script><header><button id=goBack></button><button id=reload></button></header><iframe id=selenite></iframe>`;
		win.document.querySelector("html").innerHTML = html;
		win.eval(`let selenite = document.getElementById("selenite");console.log(selenite);selenite.setAttribute("src", "${location.origin}");console.log(selenite);document.getElementById("goBack").addEventListener("click", function () {selenite.contentDocument.location.href = selenite.contentDocument.location.origin;});document.getElementById("reload").addEventListener("click", function () {selenite.contentDocument.location.href = selenite.contentDocument.location.href;})`);
		location.href = "https://google.com";
		close();
	});
	if ($("#panicmode").length > 0) {
		$("#panicmode").prop({ href: panicurl });
	}
	if ($(".seleniteminified").length > 0) {
		$.get("https://raw.githubusercontent.com/skysthelimitt/selenite-optimized/main/build/bookmark.txt", function (data) {
			$(".seleniteminified").prop({ href: data });
		});
		$.get("https://raw.githubusercontent.com/car-axle-client/car-axle-client/v9/dist/build.js", function (data) {
			$(".caraxle").prop({ href: `javascript:${encodeURI(data)}` });
		});
	}
	if(document.body) {
		for(let i = 0;i<10;i++) {
			setTimeout(() => {
				crate.options.color = getComputedStyle(document.body).getPropertyValue("--uibg");
			}, 100)
		}
	}

});
function setPanicMode() {
	if (!$("#panic").val().startsWith("https")) {
		document.cookie = "panicurl=https://" + $("#panic").val();
		return;
	}

	document.cookie = "panicurl=" + $("#panic").val();
}
function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
	alert("Copied text!");
}
function setTheme(theme) {
	localStorage.setItem("selenite.theme", theme);
	document.body.setAttribute("theme", theme);
	if (theme != "custom") {
		document.getElementById("customMenu").style.display = "none";
		document.body.style = "";
	}
}
function setPanicMode() {
	if (!$("#panic").val().startsWith("https")) {
		document.cookie = "panicurl=https://" + $("#panic").val();
		return;
	}
	document.cookie = "panicurl=" + $("#panic").val();
}
function setPassword() {
	localStorage.setItem("selenite.password", enc.encode(document.getElementById("pass").value));
}
function delPassword() {
	location.hash = "";
	localStorage.removeItem("selenite.passwordAtt");
	localStorage.removeItem("selenite.password");
}

function getCurrentTime() {
    const n = document.getElementById("time");

    fetch("https://worldtimeapi.org/api/ip")
        .then(response => response.json())
        .then(data => {
            const t = new Date(data.utc_datetime);
            const formattedTime = t.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true
            });
            n.textContent = formattedTime;
        })
        .catch(() => {

            const currentTime = new Date();
            const formattedTime = currentTime.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true
            });
            n.textContent = formattedTime;
        });
}

getCurrentTime();
setInterval(getCurrentTime, 900);

 $(function() {     $('.game').on('error', function() {       $(this).attr('src', decodeURIComponent(atob('aHR0cHM6Ly93ZWIuYXJjaGl2ZS5vcmcvd2ViLzIwMjQwMzEyMDA1NTQ3aWZfL2h0dHBzOi8vbmF0ZS1nYW1lcy5jb20vc3RhdGljL2ltYWdlLXBsYWNlaG9sZGVyLnN2Zw==')));     });   });
$(document).ready(function(){if(!window.location.href.startsWith('about:')){$("#webicon").attr("placeholder",window.location.href.replace(/\/[^\/]*$/,'/'));}});
function loadScript(a,b){var c=document.createElement("script");c.type="text/javascript",c.src=a,c.onload=b,document.head.appendChild(c)}loadScript("https://cdn.jsdelivr.net/gh/proudparrot2/quick.js/quick.js",function(){console.log("Script loaded successfully.");function getRandomNumber(){return Math.floor(1e6*Math.random())+1}if(1===getRandomNumber()){var a=_.get(".chan");_.edit(a,"selentine.")}});
function loadUnderscore(e){var t=document.createElement("script");t.src="https://underscorejs.org/underscore-min.js",t.onload=e,document.head.appendChild(t)}function updatePlaceholder(){var e=document.title,t=document.getElementById("webname");t.placeholder=_.escape(e)}loadUnderscore(function(){updatePlaceholder()});setInterval(function(){var e=document.title,t=document.getElementById("webname").getAttribute("data-title");e!==t&&(updatePlaceholder(),document.getElementById("webname").setAttribute("data-title",e))},1e3);


let cookieConsentScript = document.createElement("script");
cookieConsentScript.src = "/js/cookieConsent.js";
document.head.appendChild(cookieConsentScript);
let cookieConsentStyle = document.createElement("link");
cookieConsentStyle.href = "/js/cookieConsent.css";
cookieConsentStyle.rel = "stylesheet";
document.head.appendChild(cookieConsentStyle);