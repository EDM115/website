# SportTrack - par Lussandre et Nathan

## Les technologies utilisées

- **Bootstrap 5**
  pour nous faciliter la vie au niveau de la conception graphique (css)
- **Scss**
  de manière à pouvoir utiliser des variables et modifier facilement le code (par exemple une couleur présente dans une dizaines de lignes)
- **JavaScript**
  pour la page où on charge un document, aussi pour la connection

## Les points importants (classés par fichiers)

### `index.html` (le principal)

A la base on voulait faire une page d'accueil, mais dans le cadre de ce projet ça n'a pas tellement de sens. C'est pourquoi cette page redirige en fait vers la page de connection

```javascript
window.onload = function () {
  const page = window.location.href;
  const destination = page.concat("sign-in/");
  const redirectLocation = window.location.href.replace(page, destination);
  window.location.href = redirectLocation;
};
```

on prends l'URL, on rajoute `sign-in/`, et on mets ça à la place de l'URL actuelle  
Chaque sous-dossier où l'utilisateur n'est pas sensé aller possède exactement le même type de fichier, redirigeant vers la page de connection

### `index.html` (sign-in)

On y retrouve d'abord le menu. Il s'agit du même sur toutes les pages. Il utilise la classe `nav-pills` de bootstrap qui permet d'avoir ces sortes de boutons  
Le bouton qui correspond à la page actuelle a la classe `active` pour servir de repère à l'utilisateur et la classe `disabled` pour éviter qu'il clique sur le lien allant sur la page où il se trouve déjà

```html
<li class="nav-item">
  <a href="#" class="nav-link active button-color-active disabled"
    >Se connecter</a
  >
</li>
```

Le formulaire de connection en lui-même utilise `form-floating` de bootstrap pour avoir cette animation de titre qui remonte sur chaque input  
Le type de chaque input est renseigné, a un identifiant et est `required`  
Pour l'option de rester connecté, nous avons utilisé `form-switch` de bootstrap qui permet d'avoir une checkbox qui apparaît comme sur une application. Celui-ci est optionnel  
Enfin, en plus du bouton de connection, le bouton pour se créer un compte est aussi disponible

### `index.html` (sign-up)

La structure est la même que celle du sign-in, il y a seulement des inputs en plus  
La date de naissance est un input `date` qui permet d'avoir un sélectionneur de date géré par le navigateur  
Le choix du sexe est un `<select>` utilisant `form-select` de bootstrap pour un rendu équivalent aux autres inputs  
La taille est de type number et utilise une expression régulière pour être sûr que uniquement des nombres sont acceptés (lors de nos tests, la lettre `e` semble aussi passer)

```html
<input
  class="form-control input-content"
  type="number"
  id="taille"
  name="taille"
  placeholder=" "
  required
  pattern="[0-9]"
/>
```

Pour le poids, on utilise un peu de javascript en prévention d'une utilisation future de ces données. Le but est d'accepter uniquement des nombres, au minimum deux, et de remplacer automatiquement les virgules par des points pour avoir une saisie harmonisée entre les différents utilisateurs

```html
<input
  class="form-control input-content"
  id="poids"
  name="poids"
  placeholder=" "
  required
  pattern="^\d*(\.\d{0,2})?$"
  oninput="this.value=this.value.replace(',', '.');"
/>
```

### `index.html` (edit)

Il s'agit très simplement de la même page que pour la création de compte, le bouton "Créer un compte" à été change par "Modifier"

### `index.html` (load)

Ici, on a opté pour une approche pratique de l'envoi de fichier  
Comme par défaut il ne renvoyait que le nom du fichier, et que l'`input file` n'est pas vraiment customisable, on a fait différemment. Comme cliquer sur le `label` suffit pour ouvrir le selecteur de fichier, on a masqué le bouton  
Il y a aussi un autre input que l'utilisateur ne voit pas, et qui va contenir plus tard le Base64 du fichier  
L'input n'accepte que les fichiers étant des json et ceux avec une extension `.json`

```html
<input
  type="file"
  id="file"
  class="submit-file"
  name="file"
  accept=".json, application/json"
  required
/>
```

### `style.scss` (le css est automatiquement genéré)

_(je précise ici que certains élements n'ont pas étés définis dans le css mais modifiés "en dur" dans le `bootstrap.min.css` car on arrivait pas à override certaines propriétés d'élements)_

Nous avons définis les variables à utiliser, notament celles des couleurs. Nous utilisons le schéma officiel Dracula pour une bonne homogénéité des couleurs et un meilleur confort visuel  
La police utilisée est `Bitter` car elle est ronde et élegante  
Les liens possèdent une transition quand on les survolent et n'ont pas leur forme "classique" (bleu et souligné)  
Les formulaires valides ont une bordure verte, les invalides ont une bordure rouge  
La classe `centered-content` a été crée pour avoir un élement parfaitement au centre de la page  
Pour corriger pas mal de problèmes d'autocomplétion (merci Chrome de changer les couleurs de mon input), on a dû overflow le fonctionnement d'origine

```scss
input {
  background: transparent;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid $green;
  -webkit-text-fill-color: $cyan;
  -webkit-box-shadow: 0 0 0px 1000px #00000000 inset;
  box-shadow: 0 0 0px 1000px #00000000 inset;
  transition: background-color 5000s ease-in-out 0s;
}
```

Pareil pour le bouton de "Rester connecté", on a changé sa couleur

```scss
.form-check-input {
  background-color: $current-line;
  color: $cyan;
  border-color: $cyan;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%289, 233, 253, 1%29'/%3e%3c/svg%3e");
}

.form-check-input:checked {
  background-color: $pink;
  color: $yellow;
  border-color: $yellow;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28241, 250, 140, 1%29'/%3e%3c/svg%3e");
}
```

Tant que le formulaire est invalide, l'utilisateur ne peut pas le soumettre

```scss
form:invalid button {
  opacity: 0.3;
  pointer-events: none;
}
```

Et voilà comment on a modifié l'input pour le fichier json

```scss
.submit-file-label {
  cursor: pointer;
  color: $cyan;
  font-weight: bold;
}

.label-file:hover {
  color: $pink;
  background-color: $comment;
}

.submit-file {
  display: none;
}

.json-text {
  display: none;
}
```

### `main.js`

Ce fichier possède plusieurs fonctions, chacune étant dédiée à une page en particulier (pour éviter qu'elles s'éxecutent sur une page qui ne les concernent pas). Pour réaliser ça, on vérifie si l'URL correspond à l'une des pages. Exemple :

```js
const url = window.location.href;
if (url.includes("sign-in/")) {
  ...
}
```

Nous accédons aux paramètres dans l'URL grâce à la constante `urlParams`

```js
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
```

Pour le stockage des informations des formulaires, on voulait partir sur des cookies mais c'était un peu complexe alors on a plutôt utilisé l'API LocalStorage qui est plus pratique et facile à manipuler

#### Pour la page de connection

On a une fonction `checkUser` qui vérifie si l'utilisateur est bien existant  
Elle va regarder dans l'URL si la variable `keep` est à true, auquel cas l'utilisateur a demandé de rester connecté. Donc ça va le stocker dans LocalStorage. Si par la suite l'utilisateur recharge la page de connection, les champs seront automatiquement remplis  
Les valeurs adresse mail et mot de passe sont les seules "chifrées" (elles sont juste transformées en Base64 et donc pas en clair, mais cette protection est faible) grâce à la fonction `btoa()`  
Si lors de la connection les valeurs coincident, l'utilisateur est connecté. Sinon, on le redirige vers la page de création de compte

#### Pour la page où on charge un fichier

On a une fonction `clearInputFile` qui permet de vider l'input file (si c'est pas un JSON, on appelle cette fonction pour éviter l'envoi d'un fichier non désiré). A noter que cette fonction est très simple, sauf si le navigateur utilisé est Internet Explorer, auquel cas il faut bidouiller un peu pour que ça marche

```js
function clearInputFile(f) {
  if (f.value) {
    try {
      f.value = "";
    } catch (err) {
      console.log(err);
    }
    if (f.value) {
      // pour IE5 ~ IE10
      var form = document.createElement("form"),
        parentNode = f.parentNode,
        ref = f.nextSibling;
      form.appendChild(f);
      form.reset();
      parentNode.insertBefore(f, ref);
    }
  }
}
```

`checkJson` vérifie si le fichier sélectionné est _réellement_ un JSON, sinon ça vide l'input et ça prévient l'utilisateur

```js
let filebutton = document.getElementById("file");
filebutton.onchange = function checkJson() {
  let file = document.getElementById("file").files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    try {
      JSON.parse(reader.result);
      console.log("JSON valide");
    } catch (e) {
      console.log(e);
      alert("Ce n'est pas un JSON. Veuillez réessayer");
      clearInputFile(filebutton);
    }
  };
};
```

Et enfin, dès que l'input file change, on va convertir notre fichier en Base64 et remplir l'`input text` caché

```js
filebutton.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    console.log(base64String);
    jsonize(base64String);
  };
  reader.readAsDataURL(file);
});

let jsonarea = document.getElementById("json");
function jsonize(b64) {
  jsonarea.value = b64;
}
```

#### Pour la page de création de compte

La fonction est `setUser()`  
Si l'URL contient des paramètres de la page de connection/d'édition, on les supprime (sans recharger la page)  
On va stocker les valeurs de l'URL qu'on veut dans des constantes, puis on compare les champs mail/password à ceux déjà stockés. Si ils correspondent, on redirige l'utilisateur vers la page d'édition de compte, sinon on le stocke dans LocalStorage et on prévient l'utilisateur que son compte a été crée. Enfin, on le redirige vers la page de connection

#### Pour la page de modification d'informations

Si l'URL contient des paramètres de la page de création, on les supprime (sans recharger la page)  
Puis on vérifie si l'utilisateur possède bien un compte, sinon on va le rediriger vers la page de création de compte  
Si la page est vierge (`edit/?action=edit`), on remplit automatiquement les champs avec les valeurs stockées  
Si l'utilisateur a voulu modifier ses infos (`edit/?nom-edit=`), on les modifie dans LocalStorage puis on l'informe du succès de l'opération avant de le rediriger vers la page de connection

_(pour vérifier l'éxactitudes des informations dans LocalStorage, on va utiliser les DevTools (<kbd>F12</kbd> sur la plupart des navigateurs), puis Application, Local Storage)_
