const KS = " ကျပ်"
let BALANCE;
let CASH_OUT;
let PHONE;
loadingShow()

const getUserData = () => {
  $.ajax({
    url: 'server/get_data.php',
    type: 'POST',
    data: `username=${username}`,
    success: function (r) {
      let data = JSON.parse(r)
      BALANCE = parseInt(data.balance, 10)
      CASH_OUT = parseInt(data.cash_out, 10)
      let NAME = data.name
      let EMAIL = data.email
      PHONE = data.phone
      $('.mybalance').text(BALANCE + KS)
      $('.mycash_out').text(CASH_OUT + KS)
      $('.myname').text(NAME)
      $('.myemail').text(EMAIL)
      $('.myphone').text(PHONE)
      getHte('', 'today-my-hte', 'server/get_hte.php')
      visited()
    }
  })
}

const visited = () => {
  let visitedID = `${day}-${month}-${year}-${username}`
  if (visitedID == localStorage.getItem('visitedID')) {
    return
  } else {
    let data = {
      username: username,
      day: day,
      month: month,
      year: year
    }
    $.ajax({
      url: 'server/visited.php',
      type: 'POST',
      data: data,
      success: function (r) {
        if (r == 'OK') {
          localStorage.setItem('visitedID', visitedID)
        }
      }
    })
  }
}

window.addEventListener('load', () => {
  if (username == null) {
    location.href = '../index.html'
  } else {
    getUserData()
    getHte('', 'today-lucky-hte', 'server/get_hte.php')
  }
})

const hteNumberValidation = hte_number => {
  if (hte_number.length == 2) {
    return true
  } else {
    return false
  }
}

const amountKyatsValidation = amount_kyats => {
  if (amount_kyats > 0) {
    return true
  } else {
    return false
  }
}

const balanceValidation = (BALANCE, amount) => {
  if (BALANCE >= amount) {
    return true
  } else {
    return false
  }
}

$('#add-hte').click(function () {
  let date = new Date()
  let hours = date.getHours()
  let text_day = date.getDay()
  if (text_day == 6 || text_day == 0) {
    top_alert('ထီပိတ်သည်', '#bb2124')
  } else {
    if (hours == 11 || hours == 12 || hours >= 16) {
      top_alert('ထီထိုးလို့မရတော့ပါ', '#bb2124')
    } else {
      let hte_number = $('#hte-number').val().trim()
      let amount_kyats = $('#amount-kyats').val().trim()
      if (hteNumberValidation(hte_number) == true && amountKyatsValidation(amount_kyats) == true) {
        if (balanceValidation(BALANCE, amount_kyats) == true) {
          loadingShow()
          let url = 'server/add_hte.php'
          let amount = $('#amount-kyats').val()
          let date = new Date()
          let hours = date.getHours()
          let day = date.getDate()
          let month = textMonth(date.getMonth())
          let year = date.getFullYear()
          let session = timeSession(hours)
          let data = {
            username: username,
            hte: $('#hte-number').val(),
            amount: amount,
            session: session,
            day: day,
            month: month,
            year: year
          }
          $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function (r) {
              if (r == 'OK') {
                BALANCE -= amount
                $('.mybalance').text(BALANCE + KS)
                top_alert('အောင်မြင်ပါသည်', '#3a9f1a')
                $('#add-hte-box input').val('')
                getHte('', 'today-my-hte', 'server/get_hte.php')
              } else {
                if (r == 'ပိတ်ဂဏန်း') {
                  loadingHide()
                  top_alert(r, '#bb2124')
                } else {
                  top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
                }
              }
            }
          })
        } else {
          top_alert('လက်ကျန်ငွေမလုံလောက်ပါ', '#3a9f1a')
        }
      } else {
        top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
      }
    }
  }
})

$('#tab > div').click(function () {
  let id = $(this).attr('id')
  $('.page').hide()
  $(`#${id}-page`).show()
  loadingShow()
  if (id == 'profile') {
    loadingHide()
    $('#profile-page .tab-bar b:first-child').click()
  } else {
    getHte('', id, 'server/get_hte.php')
  }
})

$('.to-main-page .fa-arrow-left').click(function () {
  $('.page').hide()
  $(`#main-page`).show()
})

//PROFILE
const logoutAlertShow = () => {
  $('#logout-alert').show()
  $('#profile-page').css({
    opacity: '.4',
    pointerEvents: 'none'
  })
}

const logoutAlertHide = () => {
  $('#logout-alert').hide()
  $('#profile-page').css({
    opacity: '1',
    pointerEvents: 'auto'
  })
}

$('#logout').click(function () {
  logoutAlertShow()
})

$('#no-logout').click(function () {
  logoutAlertHide()
})

$('#yes-logout').click(function () {
  localStorage.removeItem('username', null)
  top_alert('အောင်မြင်စွာထွက်ခဲ့ပါသည်', '#4bb543')
  location.reload()
})

$('#money-transfer > a').click(function () {
  top_alert('ကကျေးဇူးပြု၍ခဏစောင့်ပါ', '#4bb543')
})

$('.tab-bar b').click(function () {
  $('#log-container').html('')
  loadingShow()
  $('.tab-bar b').css('opacity', .7)
  $(this).css('opacity', 1)
  let w = $(this)[0].offsetWidth + 12 + 'px'
  let l = $(this)[0].offsetLeft - 6 + 'px'
  $('.tab-bar .location-ball').css({
    width: w,
    left: l
  })
})

$('#my-hte-lucky-log').click(function () {
  getHte(PHONE, 'my-hte-lucky-log', 'server/get_hte.php')
})

$('#deposit-log').click(function () {
  getLog('in', PHONE, 'server/get_log.php')
})

$('#withdrawal-log').click(function () {
  getLog('out', PHONE, 'server/get_log.php')
})