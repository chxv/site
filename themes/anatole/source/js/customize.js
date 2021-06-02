function homepage() {
  const homepageCookie = "toHome";
  if (window.location.pathname === '/') {
    if (getCookie(homepageCookie) === '') {
      setCookie(homepageCookie, '1', 1);
      window.location.href = '/home';
    }
  }
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

function showComment() {
  if (document.getElementById("remark42") == null) {
    console.log("not found comment div, stop show comment");
    return;
  }
  var remark_config = {
    host: "https://api.xchens.cn",
    site_id: 'xchens_cn',
    components: ['embed']
  };
  !function (e, n) { for (var o = 0; o < e.length; o++) { var r = n.createElement("script"), c = ".js", d = n.head || n.body; "noModule" in r ? (r.type = "module", c = ".mjs") : r.async = !0, r.defer = !0, r.src = remark_config.host + "/web/" + e[o] + c, d.appendChild(r) } }(remark_config.components || ["embed"], document);
}

// ----
homepage();
setTimeout(function () {
  showComment();
}, 1000);

