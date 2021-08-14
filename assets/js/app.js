/* Copyright 2021 by Mohamad Adithya */
const btnStart = document.querySelector('.start')
const btnStop = document.querySelector('.stop')
const btnReset = document.querySelector('.reset')
const btnLap = document.querySelector('.lap')

const btnLapNotif = document.querySelector('.lap-notif')
const btnLapNotifClose = document.querySelector('.lap-notif.close')

const laps = document.querySelector('.laps')
const lapLists = laps.querySelector('.lap-list')

let hours = 0
let minutes = 0
let seconds = 0
let miliseconds = 0

let displayMiliseconds = miliseconds
let displaySeconds = seconds
let displayMinutes = minutes
let displayHours = hours

let timerMilisec = document.getElementById('milisec')
let timerSec = document.getElementById('sec')
let timerMins = document.getElementById('mins')
let timerHours = document.getElementById('hours')
  
let interval = null

let status = 'stopped'

let lapNow = null
let lapCount = 1

const start = () => {
  miliseconds++
  
  if (miliseconds < 10) {
    displayMiliseconds = `0${miliseconds}`
  } else {
    displayMiliseconds = miliseconds
  }
  
  if (seconds < 10) {
    displaySeconds = `0${seconds}`
  } else {
    displaySeconds = seconds
  }
  
  if (minutes < 10) {
    displayMinutes = `0${minutes}`
  } else {
    displayMinutes = minutes
  }
  
  if (hours < 10) {
    displayHours = `0${hours}`
  } else {
    displayHours = hours
  }
  
  if (miliseconds / 99 === 1) {
    seconds++
    miliseconds = 0
    if (seconds / 60 === 1) {
      minutes++
      seconds = 0
      if (minutes / 60 === 1) {
        hours++
        minutes = 0
      }
    }
  }
  
  timerMilisec.innerText = displayMiliseconds
  timerSec.innerText = displaySeconds
  timerMins.innerText = displayMinutes
  timerHours.innerText = displayHours
}

btnStart.onclick = () => {
  btnStop.classList.add('show')
  btnStart.classList.add('hide')
  btnLap.classList.add('show')
  btnReset.classList.remove('show')
  
  interval = window.setInterval(start, 10)
}

btnStop.onclick = () => {
  btnStart.classList.remove('hide')
  btnReset.classList.add('show')
  btnStop.classList.remove('show')
  btnLap.classList.remove('show')
  
  window.clearInterval(interval)
}

btnReset.onclick = () => {
  btnReset.classList.remove('show')
  
  window.clearInterval(interval)
  miliseconds = 0
  seconds = 0
  minutes = 0
  hours = 0
  
  displayMiliseconds = '00'
  displaySeconds = '00'
  displayMinutes = '00'
  displayHours = '00'
  
  timerMilisec.innerText = displayMiliseconds
  timerSec.innerText = displaySeconds
  timerMins.innerText = displayMinutes
  timerHours.innerText = displayHours
  
  lapLists.innerHTML = ''
  lapCount = 1
  btnLapNotif.style.display = 'none'
}

btnLap.onclick = () => {
 lapNow = `${displayHours}:${displayMinutes}:${displaySeconds}:${displayMiliseconds}`
  lapLists.innerHTML += `<li class="lap-time"><i class="fas fa-flag-checkered"></i> <strong class="lap-count">${lapCount++}</strong> ${lapNow}</li>`
  btnLapNotif.style.display = 'block'
}

btnLapNotif.onclick = () => {
  btnLapNotif.classList.toggle('on-laps')
  if (btnLapNotif.classList.contains('on-laps')) {
    btnLapNotif.classList.replace('fa-flag-checkered', 'fa-chevron-down')
  } else {
    btnLapNotif.classList.replace('fa-chevron-down', 'fa-flag-checkered')
  }
  laps.classList.toggle('active')
}
/* Copyright 2021 by Mohamad Adithya */