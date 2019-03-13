// Fix undefined GA
window["GoogleAnalyticsObject"] = "ga";
window["ga"] = window["ga"] || function () {
	(window["ga"].q = window["ga"].q || []).push(arguments)
};

function optin() {
	document.cookie = "optin=; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT;";
	$("#cookies").slideUp();
	if ($("#adroll_consent_banner").length > 0) $("#adroll_consent_accept div").click();
	setTimeout(function () {
		$("#cookies").remove();
		if ($("section .main span#optout").length > 0) {
			window.location = "/";
		} else {
			window.location.reload();
		}
	}, 750);
}

function optout() {
	document.cookie.split(";").forEach(function (c) {
		document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
	});
	$("#cookies").slideUp();
	setTimeout(function () {
		document.cookie = "optout=; path=/; expires=;";
		$("#cookies").remove();
	}, 750);
}

if (navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1") {
	document.cookie.split(";").forEach(function (c) {
		document.cookie = c.trim().split("=")[0] + "=;" + "expires=Thu, 01 Jan 1970 00:00:00 GMT;";
	});
} else if ((navigator.doNotTrack != "yes" || navigator.doNotTrack != "1" || navigator.msDoNotTrack != "1") && document.cookie.indexOf("optin") === -1) {
	if (document.cookie.indexOf("optout") > -1) {} else {
		$("body").prepend(
			"<div id='cookies'>" +
			"	<div class='inner'>" +
			"		<p class='left'>Ce site utilise des cookies pour améliorer l'expérience de l'utilisateur." +
			"			<a href='#' title='En savoir plus sur les cookies utilisés sur ce site'>En savoir plus</a>" +
			"		</p>" +
			"		<p class='right'>" +
			"			<span class='in'>Poursuivre</span>" +
			"			<span class='out'>Quitter</span>" +
			"		</p>" +
			"	</div>" +
			"</div>"
		);
		$("#cookies").delay(750).slideDown();
		$("#cookies .in").click(function () {
			optin();
		});
		$("#cookies .out").click(function () {
			optout();
		});
	}
}
$("section .main span#optin").click(function () {
	optin();
});
$("section .main span#optout").click(function () {
	optout();
	$("section .main span#optout").closest("p").after("<p><strong>You have elected to opt-out. Return to the <a href='/'>CBI homepage</a></strong></p>");
});
if ((navigator.doNotTrack != "yes" || navigator.doNotTrack != "1" || navigator.msDoNotTrack != "1") && window.location.href.indexOf("cbi.org.uk") >= 0) {
	if (document.cookie.indexOf("optout") >= 0) {} else {
		/* Google */
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({
				'gtm.start': new Date().getTime(),
				event: 'gtm.js'
			});
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src =
				'//www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-KRLJX4');

		/* Eloqua */
		var _elqQ = _elqQ || [];
		_elqQ.push(['elqSetSiteId', '1043207703']);
		_elqQ.push(['elqTrackPageView']);
		(function () {
			function async_load() {
				var s = document.createElement('script');
				s.type = 'text/javascript';
				s.async = true;
				s.src = '//img.en25.com/i/elqCfg.min.js';
				var x = document.getElementsByTagName('script')[0];
				x.parentNode.insertBefore(s, x);
			}
			if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
			else if (window.attachEvent) window.attachEvent('onload', async_load);
		})();
		/* end */

		/* Adroll */
		if (window.location.href.indexOf("businessvoice") > -1 || window.location.href.indexOf("msb-summit") > -1) {
			adroll_adv_id = "CZTH6OSCKBC2RCAYEZOQR2";
			adroll_pix_id = "J36K2WTZEVCOBGGOQH6UGR";
			(function () {
				var _onload = function () {
					if (document.readyState && !/loaded|complete/.test(document.readyState)) {
						setTimeout(_onload, 10);
						return;
					}
					if (!window.__adroll_loaded) {
						__adroll_loaded = true;
						setTimeout(_onload, 50);
						return;
					}
					var scr = document.createElement("script");
					var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
					scr.setAttribute('async', 'true');
					scr.type = "text/javascript";
					scr.src = host + "/j/roundtrip.js";
					((document.getElementsByTagName('head') || [null])[0] || document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
				};
				if (window.addEventListener) {
					window.addEventListener('load', _onload, false);
				} else {
					window.attachEvent('onload', _onload);
				}
			}());
		}

		/* Twitter */
		if (window.location.href.indexOf("businessvoice") > -1) {
			$.getScript("//platform.twitter.com/oct.js", function () {
				twttr.conversion.trackPid('nuwk5', {
					tw_sale_amount: 0,
					tw_order_quantity: 0
				});
			});
		}
	}
}