function pausecomp(millis) {
  var date = new Date()
  var curDate = null
  do {
    curDate = new Date()
  } while (curDate - date < millis)
}

function getDaysSinceLaunch() {
  var baseDate = new Date('03/22/22'),
    baseValue = 1
  var presentDate = new Date()
  presentDate.setHours(00, 00, 00)
  var timeDiff = Math.abs(presentDate.getTime() - baseDate.getTime())
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  baseValue = baseValue + diffDays
  return baseValue
}

async function getLinesOfCode() {
  const response = await fetch('https://api.codetabs.com/v1/loc/?github=EDM115/unzip-bot')
  if (!response.ok) {
    console.log('getLinesOfCode() : Not reachable')
    return 0
  }
  const data = await response.json()
  const linesOfCode = data[data.length - 1].lines
  return linesOfCode
}

// function that returns the number of stars and forks of the project
async function getStarsAndForks() {
  const response = await fetch('https://api.github.com/repos/EDM115/unzip-bot')
  if (!response.ok) {
    console.log('getStarsAndForks() : Not reachable')
    return 0
  }
  const data = await response.json()
  const stars = data.stargazers_count
  const forks = data.forks_count
  return [stars, forks]
}

function setElements([linesOfCode, stars, forks]) {
  const linesElement = document.getElementById('lines-of-code')
  linesElement.setAttribute('data-purecounter-end', linesOfCode)
  const starsElement = document.getElementById('stars')
  starsElement.setAttribute('data-purecounter-end', stars)
  const forksElement = document.getElementById('forks')
  forksElement.setAttribute('data-purecounter-end', forks)
}

function setDays(days) {
  const daysElement = document.getElementById('days-since-launch')
  daysElement.setAttribute('data-purecounter-end', days)
}

window.addEventListener('load', async () => {
  const days = getDaysSinceLaunch()
  setDays(days)
  const linesOfCode = await getLinesOfCode()
  const [stars, forks] = await getStarsAndForks()
  setElements([linesOfCode, stars, forks])
})
