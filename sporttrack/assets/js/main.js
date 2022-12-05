const url = window.location.href;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// null|null => bnVsbHxudWxs

if (url.includes("sign-in/")) {
	window.onload = checkUser();
	function checkUser() {
		const maillog = urlParams.get("mail-log");
		const pwdlog = urlParams.get("pwd-log");
		const keep = urlParams.get("keep");
		if (keep == "true") {
			localStorage.setItem("keep", true);
		} else {
			localStorage.setItem("keep", false);
		}
		if (localStorage.getItem("keep") == "true") {
			const log1 = document.getElementById("mail-log");
			const log2 = document.getElementById("pwd-log");
			const logvalue = localStorage.getItem("logvalue");
			let connect = atob(logvalue).split("|");
			const mail = connect[0];
			const pwd = connect[1];
			log1.value = mail;
			log2.value = pwd;
		}
		let logvalue = maillog + "|" + pwdlog;
		logvalue = btoa(logvalue);
		let logstored = localStorage.getItem("logvalue");
		if (logstored == logvalue && logvalue != "bnVsbHxudWxs") {
			console.log("logstored = logvalue");
			window.alert("Vous êtes connecté");
		} else {
			if (logvalue == "bnVsbHxudWxs") {
				const url2 = url.split("?");
				let redirect = url.replace(url2[1], '').replace('?', '');
				window.history.replaceState({}, document.title, redirect);
			} else {
				window.alert("Compte inconnu. Veuillez vous créer un compte d'abord");
				let redirect = url.replace("sign-in/", "sign-up/")
				window.location.href = redirect;
			}
		}
	}
}

if (url.includes("load/")) {
	function clearInputFile(f) {
		if (f.value) {
			try {
				f.value = '';
			} catch(err) {
				console.log(err);
			}
			if (f.value) { // pour IE5 ~ IE10
				var form = document.createElement("form"),
					parentNode = f.parentNode, ref = f.nextSibling;
				form.appendChild(f);
				form.reset();
				parentNode.insertBefore(f, ref);
			}
		}
	}
	
	let filebutton = document.getElementById("file");
	filebutton.onchange = function checkJson() {
		let file = document.getElementById("file").files[0];
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function() {
			try {
				JSON.parse(reader.result);
				console.log("JSON valide");
			} catch (e) {
				console.log(e);
				alert("Ce n'est pas un JSON. Veuillez réessayer");
				clearInputFile(filebutton);
			}
		}
	}
	
	filebutton.addEventListener("change", (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64String = reader.result
				.replace("data:", '')
				.replace(/^.+,/, '');
			console.log(base64String);
			jsonize(base64String);
		}
		reader.readAsDataURL(file);
	})
	
	let jsonarea = document.getElementById("json");
	function jsonize(b64) {
		jsonarea.value = b64;
	}
}

if (url.includes("sign-up/")) {
	window.onload = setUser();
	function setUser() {
		if (url.includes("sign-up/?mail-log=") || url.includes("sign-up/?action=edit")) {
			const url2 = url.split("?");
			let redirect = url.replace(url2[1], '').replace('?', '');
			window.history.replaceState({}, document.title, redirect);
		}
		const nom = urlParams.get("nom");
		const prenom = urlParams.get("prenom");
		const bdate = urlParams.get("bdate");
		const sexe = urlParams.get("sexe");
		const taille = urlParams.get("taille");
		const poids = urlParams.get("poids");
		const mail = urlParams.get("mail");
		const pwd = urlParams.get("pwd");
		let logvalue2 = mail + "|" + pwd;
		logvalue2 = btoa(logvalue2);
		if (localStorage.getItem("logvalue") == logvalue2) {
			window.alert("Ce compte existe déjà. Vous voulez sûrement modifier vos informations");
			let redirect = url.replace("sign-up/", "edit/")
			window.location.href = redirect;
		} else {
			if (logvalue2 != "bnVsbHxudWxs") {
				localStorage.setItem("nom", nom);
				localStorage.setItem("prenom", prenom);
				localStorage.setItem("bdate", bdate);
				localStorage.setItem("sexe", sexe);
				localStorage.setItem("taille", taille);
				localStorage.setItem("poids", poids);
				localStorage.setItem("logvalue", logvalue2);
				window.alert("Votre compte a été crée");
				const url2 = url.split("?");
				let redirect = url.replace(url2[1], '').replace('?', '');
				redirect = redirect.replace("sign-up/", "sign-in/");
				window.location.href = redirect;
			}
		}
	}
}

if (url.includes("edit/")) {
	if (url.includes("edit/?nom=")) {
		const url2 = url.split("?");
		let redirect = url.replace(url2[1], "action=edit");
		window.history.replaceState({}, document.title, redirect);
	} else if (url.includes("edit/?action=edit")) {
		if (localStorage.getItem("logvalue") == null) {
			window.alert("Veuillez vous créer un compte d'abord");
			let redirect = url.replace("edit/", "sign-up/")
			window.location.href = redirect;
		}
		const nom = localStorage.getItem("nom");
		const prenom = localStorage.getItem("prenom");
		const bdate = localStorage.getItem("bdate");
		const sexe = localStorage.getItem("sexe");
		const taille = localStorage.getItem("taille");
		const poids = localStorage.getItem("poids");
		const logvalue = localStorage.getItem("logvalue");
		let connect = atob(logvalue).split("|");
		const mail = connect[0];
		const pwd = connect[1];
		let nomedit = document.getElementById("nom-edit");
		let prenomedit = document.getElementById("prenom-edit");
		let bdateedit = document.getElementById("bdate-edit");
		let sexeedit = document.getElementById("sexe-edit");
		let tailleedit = document.getElementById("taille-edit");
		let poidsedit = document.getElementById("poids-edit");
		let mailedit = document.getElementById("mail-edit");
		let pwdedit = document.getElementById("pwd-edit");
		nomedit.value = nom;
		prenomedit.value = prenom;
		bdateedit.value = bdate;
		sexeedit.value = sexe;
		tailleedit.value = taille;
		poidsedit.value = poids;
		mailedit.value = mail;
		pwdedit.value = pwd;
	} else if (url.includes("edit/?nom-edit=")) {
		const nom = urlParams.get("nom-edit");
		const prenom = urlParams.get("prenom-edit");
		const bdate = urlParams.get("bdate-edit");
		const sexe = urlParams.get("sexe-edit");
		const taille = urlParams.get("taille-edit");
		const poids = urlParams.get("poids-edit");
		const mail = urlParams.get("mail-edit");
		const pwd = urlParams.get("pwd-edit");
		let logvalue2 = mail + "|" + pwd;
		logvalue2 = btoa(logvalue2);
		localStorage.setItem("nom", nom);
		localStorage.setItem("prenom", prenom);
		localStorage.setItem("bdate", bdate);
		localStorage.setItem("sexe", sexe);
		localStorage.setItem("taille", taille);
		localStorage.setItem("poids", poids);
		localStorage.setItem("logvalue", logvalue2);
		window.alert("Vos informations ont étés mises à jour");
		const url2 = url.split("?");
		let redirect = url.replace(url2[1], '').replace('?', '');
		redirect = redirect.replace("edit/", "sign-in/");
		window.location.href = redirect;
	}
}