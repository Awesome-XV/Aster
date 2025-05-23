let backup_icon;
let backup_name;
function setCloak(name, icon) {
  var tabicon = getCookie("tabicon");
  if (tabicon || icon) {
    var link = document.querySelector("link[rel~='icon']");
    if (link) {
      if (link.href != icon) backup_icon = link;
      while (document.querySelector("link[rel~='icon']")) {
        document.querySelector("link[rel~='icon']").remove();
      }
    }
    var link = document.querySelector("link[rel~='shortcut icon']");
    if (link) {
      if (link.href != icon) backup_icon = link;
      while (document.querySelector("link[rel~='shortcut icon']")) {
        document.querySelector("link[rel~='shortcut icon']").remove();
      }
    }
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
    link.href = tabicon;
    if (name) {
      link.href = icon;
    }
  }

  var tabname = getCookie("tabname");
  backup_name = document.title;
  if (tabname) {
    document.title = tabname;
  }
  if (name) {
    document.title = name;
  }
  panicMode();
}
if (getCookie("debugging") == 1) {
  const debugscript = document.createElement("script");
  debugscript.setAttribute("src", "/js/debug.js");
  document.head.append(debugscript);
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
let listofchars = "";
document.addEventListener("keydown", (e) => {
  listofchars = listofchars + e.key;
  if (listofchars.length > 20) {
    listofchars = listofchars.substring(e.key.length);
  }
  if (listofchars.includes("safemode")) {
    window.location.href = panicurl;
    listofchars = "";
  } else if (listofchars.includes("debugplz")) {
    if (getCookie("debugging") == 1) {
      document.cookie = "debugging=0;";
      alert("debugging off!");
    } else {
      document.cookie = "debugging=1";
      alert("debugging on!");
    }
    listofchars = "";
  }
});
function panicMode() {
  panicurl = getCookie("panicurl");
  if (panicurl == "") {
    panicurl = "https://google.com";
  }
}
const head = document.getElementsByTagName("head")[0];
document.addEventListener(
  "DOMContentLoaded",
  function () {
    setCloak();
    const gscript = document.createElement("script");
    gscript.setAttribute("async", "");
    gscript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-XVTVBR1D5V");
    const ingscript = document.createElement("script");
    ingscript.innerHTML = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-98DP5VKS42');`;
    document.head.append(gscript, ingscript);
  },
  false
);
if (location.pathname.substring(1).includes("semag") && localStorage.getItem("selenite.blockClose") == "true") {
  window.onbeforeunload = function () {
    return "";
  };
}
addEventListener("visibilitychange", (e) => {
  if (localStorage.getItem("selenite.tabDisguise") == "true") {
    if (document.visibilityState === "hidden") {
      setCloak("Google", "https://www.google.com/favicon.ico");
    } else {
      if (!backup_icon) {
        icon = document.createElement("link");
        icon.rel = "icon";

        var link = document.querySelector("link[rel~='icon']");
        if (link) {
          backup_icon = link;
          while (document.querySelector("link[rel~='icon']")) {
            document.querySelector("link[rel~='icon']").remove();
          }
        }
        var link = document.querySelector("link[rel~='shortcut icon']");
        if (link) {
          backup_icon = link;
          while (document.querySelector("link[rel~='shortcut icon']")) {
            document.querySelector("link[rel~='shortcut icon']").remove();
          }
        }
        document.head.appendChild(icon);
        icon.href = location.origin + "/favicon.ico";
      } else {
        document.head.appendChild(backup_icon);
      }
      document.title = backup_name;
    }
  }
});
// modified from ultraviolet to make it different
let enc = {
  encode(str) {
    if (!str) return str;
    return btoa(
      encodeURIComponent(
        str
          .toString()
          .split("")
          .map((char, ind) => (ind % 3 ? String.fromCharCode(char.charCodeAt() + ind) : char))
          .join("")
      )
    );
  },
  decode(str) {
    if (!str) return str;
    let [input, ...search] = str.split("?");
    input = decodeURIComponent(atob(input));
    return (
      input
        .split("")
        .map((char, ind) => (ind % 3 ? String.fromCharCode(char.charCodeAt(0) - ind) : char))
        .join("") + (search.length ? "?" + search.join("?") : "")
    );
  },
};
// if (localStorage.getItem("selenite.password")) {
// 	if (!location.hash) {
// 		location.hash = localStorage.getItem("selenite.password");
// 	}
// }
if (JSON.parse(localStorage.getItem("selenite.passwordAtt"))) {
  if (JSON.parse(localStorage.getItem("selenite.passwordAtt"))[0] == false && Math.floor(Date.now() / 1000) - JSON.parse(localStorage.getItem("selenite.passwordAtt"))[1] < 600) {
    location.href = "https://google.com";
  }
}
!(function () {
  var e = document.createElement("script");
  (e.src = "https://code.jquery.com/jquery-3.7.1.min.js"),
    document.head.appendChild(e),
    (e.onload = function () {
      var t = $("<script>").attr("src", "https://unpkg.com/webp-hero@0.0.2/dist-cjs/polyfills.js");
      $("head").append(t);
      var n = $("<script>").attr("src", "https://unpkg.com/webp-hero@0.0.2/dist-cjs/webp-hero.bundle.js");
      $("head").append(n),
        t.on("load", function () {
          n.on("load", function () {
            var t = new webpHero.WebpMachine();
            t.polyfillDocument();
          });
        });
    });
})();
// webp loader for older browsers
var polyfillScript = document.createElement("script");
polyfillScript.src = "https://polyfill.io/v3/polyfill.js";
document.head.appendChild(polyfillScript);
// polyfill.io
