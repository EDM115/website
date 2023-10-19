/* Things to dynamically change the current URL (i.e. accessible from 2 locations) */

const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}

// create a function that will check in the whole document for the word "{website}" and replace it with the current URL. That function needs to be called every time the page is loaded or refreshed
;(function replaceWebsite () {
  const currentURL = window.location.href.split('/')[2]
  const regex = new RegExp('{website}', 'gi')
  console.log('Replacing {website} with ' + currentURL + '...')
  const originalHTML = document.body.innerHTML
  const newHTML = originalHTML.replace(regex, currentURL)
  const numReplacements = (newHTML.match(regex) || []).length
  console.log('Replacement complete. ' + numReplacements + ' occurrences of {website} replaced.')
  if (numReplacements > 0) {
    console.log('Replacements made in the following locations:')
    let index = 0
    while ((match = regex.exec(newHTML))) {
      console.log(match.index + ': ' + match[0])
      index = match.index + match[0].length
    }
  }
  document.body.innerHTML = newHTML

  /* Preloader */
  const preloader = select('#preloader')
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    })
  }
})()
