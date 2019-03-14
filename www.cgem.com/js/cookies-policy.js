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
	$("section .main span#optout").closest("p").after("<p><strong>Vous avez choisi de quitter le site. retou <a href='/'>CGEM accueil</a></strong></p>");
});
if ((navigator.doNotTrack != "yes" || navigator.doNotTrack != "1" || navigator.msDoNotTrack != "1") && window.location.href.indexOf("cgem.com") >= 0) {
	if (document.cookie.indexOf("optout") >= 0) {} else {
		/* Cookies... */
	}
}