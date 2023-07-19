let username = localStorage.getItem('username')
const textMonth = month => {
  let text_month
  switch (month) {
    case 0:
      text_month = 'Jan'
      break;
    case 1:
      text_month = 'Feb'
      break;
    case 2:
      text_month = 'Mar'
      break;
    case 3:
      text_month = 'Apr'
      break;
    case 4:
      text_month = 'May'
      break;
    case 5:
      text_month = 'Jun'
      break;
    case 6:
      text_month = 'Jul'
      break;
    case 7:
      text_month = 'Aug'
      break;
    case 8:
      text_month = 'Sep'
      break;
    case 9:
      text_month = 'Oct'
      break;
    case 10:
      text_month = 'Nov'
      break;
    default:
      text_month = 'Dec'
  }
  return text_month
}
const textDay = text_day => {
  let text_day_
  switch (text_day) {
    case 1:
      text_day_ = 'တနင်္လာနေ့'
      break;
    case 2:
      text_day_ = 'အင်္ဂါနေ့'
      break;
    case 3:
      text_day_ = 'ဗုဒ္ဓဟူးနေ့'
      break;
    case 4:
      text_day_ = 'ကြာသပတေးနေ့'
      break;
    case 5:
      text_day_ = 'သောကြာနေ့'
      break;
    case 6:
      text_day_ = 'စနေနေ့'
      break;
    case 0:
      text_day_ = 'တနင်္ဂနွေနေ့'
      break;
  }
  return text_day_
}
const timeSession = time => {
  if (time >= 13) {
    return('PM')
  } else {
    return('AM')
  }
}
const textHide = text => {
  return text.slice(0, 7) + '***'
}

let date = new Date()
let seconds = date.getSeconds()
let minutes = date.getMinutes()
let hours = date.getHours()
let day = date.getDate()
let text_day = date.getDay()
let month = textMonth(date.getMonth())
let year = date.getFullYear()
let session = timeSession(hours)

$('#lucky-hte-add-day, #close-hte-add-day').val(day)
$('#lucky-hte-add-month, #close-hte-add-month').val(month)
$('#lucky-hte-add-year, #close-hte-add-year').val(year)
$('#lucky-hte-add-session, #close-hte-add-session').val(timeSession(hours))

const getHteLive = () => {
  $.ajax({
    url: 'https://api.thaistock2d.com/live',
    type: 'GET',
    data: "data",
    success: function (r) {
      $('.live-twod').text(r.live.twod)
      $('.live-set').text(r.live.set)
      $('.live-value').text(r.live.value)
    }
  })
}

setInterval(getHteLive, 1000)

let today = `${day} - ${month} - ${year} ${textDay(text_day)}`
$('.today').text(today)

if (session == 'AM') {
  $('.sess').append(' ( မနက်ပိုင်း )')
} else {
  $('.sess').append(' ( ညနေပိုင်း )')
}

const top_alert = (content, br) => {
  $('#container').append('<div id="top-alert"></div>');
  $('#top-alert').text(content)
  setTimeout(function() {
    $('#top-alert').css({
      transform: 'translateY(40px)',
      border: `1px solid ${br}`
    })
  }, 100);
  setTimeout(() => {
  $('#top-alert').css('transform','translateY(-110%)')
  }, 3000)
  setTimeout(() => {
  $('#top-alert').remove()
  }, 3500)
}

const vb = () => {
  $('.vb').click(function () {
    navigator.vibrate(20)
  })
}
vb()

const loadingShow = () => {
  $('#container').css('opacity', '.5')
  $('#container').append(`
  <div id="loading">
    <div class="fa-3x">
      <i class="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
    </div>
  </div>`);
}

const loadingHide = () => {
  $('#container').css('opacity', '1')
  $('#loading').remove()
}

const lucky = (phone_, hte_, lucky_amount) => {
  loadingShow()
  let date = new Date()
  let hours = date.getHours()
  let day = date.getDate()
  let month = textMonth(date.getMonth())
  let year = date.getFullYear()
  let session = timeSession(hours)
  let data = {
    phone: phone_,
    hte: hte_,
    lucky_amount: lucky_amount,
    session: session,
    day: day,
    month: month,
    year: year
  }
  $.ajax({
    url: 'PHP/lucky_amount_add.php',
    type: 'POST',
    data: data,
    success: function (r) {
      if (r == 'OK') {
        top_alert('အောင်မြင်ပါသည်', '#4bb543')
        loadingHide()
      } else {
        top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
      }
    }
    })
}

const getHte = (point, target, url) => {
  let date = new Date()
  let hours = date.getHours()
  let day = date.getDate()
  let month = textMonth(date.getMonth())
  let year = date.getFullYear()
  let session = timeSession(hours)
  let data = {
    username: username,
    target: target,
    point: point,
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
      let hte_array = JSON.parse(r)
      if (target == 'my-hte-lucky-log') {
        $('#log-container').html('')
        $('#log-container')[0].innerHTML += `
          <div class="title-bar">
            <b>ရက်စွဲ</b>
            <b>ထိုးငွေ</b>
            <b>ပေါက်ငွေ</b>
          </div>
        `
        if (hte_array.length > 0) {
          for (let i = 0; i < hte_array.length; i ++) {
            $('#log-container')[0].innerHTML += `
              <div class="title-bar">
                <b>${hte_array[i].day} - ${hte_array[i].month} - ${hte_array[i].year} ${hte_array[i].session}</b>
                <b>${hte_array[i].amount} ကျပ်</b>
                <b>${hte_array[i].amount * 100} ကျပ်</b>
              </div>
            `
          }
        } else {
          $('#log-container')[0].innerHTML += `
            <div class="title-bar">
              <b>မရှိသေးပါ</b>
            </div>
          `
        }
      }
      if (target == 'hte-lucky-peoples') {
        $('#hte-lucky-peoples-container').html('')
        if (hte_array.length > 0) {
          for (let i = 0; i < hte_array.length; i ++) {
            $('#hte-lucky-peoples-container')[0].innerHTML += `
              <div class="title-bar">
                <b>${hte_array[i].day} - ${hte_array[i].month} - ${hte_array[i].year} ${hte_array[i].session}</b>
                <b>${textHide(hte_array[i].phone)}</b>
                <b>${hte_array[i].amount} ကျပ်</b>
              </div>
            `
          }
        } else {
          $('#hte-lucky-peoples-container')[0].innerHTML += `
            <div class="title-bar">
              <b>မရှိသေးပါ</b>
            </div>
          `
        }
      }
      if (target == 'hte-results') {
        $('#hte-results-page-container').html('')
        if (hte_array.length > 0) {
          for (let i = 0; i < hte_array.length; i ++) {
            $('#hte-results-page-container')[0].innerHTML += `
              <div class="chart hte-history-box">
                <div>
                  <h4>${hte_array[i].day} - ${hte_array[i].month} - ${hte_array[i].year} ${hte_array[i].session}</h4>
                </div>
                <div>
                  <b>2D</b>
                  <b>Set</b>
                  <b>Value</b>
                </div>
                <div>
                  <b>${hte_array[i].hte}</b>
                  <b>${hte_array[i].sett}</b>
                  <b>${hte_array[i].value}</b>
                </div>
              </div>
            `
          }
        } else {
          $('#hte-results-page-container')[0].innerHTML += `
            <div class="chart title-bar">
              <b>မရှိသေးပါ</b>
            </div>
          `
        }
      }
      if (target == 'today-hte') {
        $('#today-hte-container').html('')
        if (hte_array.length > 0) {
          for (let i = 0; i < hte_array.length; i ++) {
            $('#today-hte-container')[0].innerHTML += `
              <div class="title-bar">
                <b>${hte_array[i].name}</b>
                <b>${hte_array[i].hte}</b>
                <b>${hte_array[i].amount} ကျပ်</b>
              </div>
            `
          }
        } else {
          $('#today-hte-container')[0].innerHTML += `
            <div class="title-bar">
              <b>မရှိသေးပါ</b>
            </div>
          `
        }
      }
      if (target == 'today-lucky-hte') {
        if (hte_array.length > 0) {
          for (let i = 0; i < hte_array.length; i ++) {
            if (hte_array[i].session == 'AM') {
              $('.am-twod').text(hte_array[i].hte)
              $('.am-set').text(hte_array[i].sett)
              $('.am-value').text(hte_array[i].value)
            } else {
              $('.pm-twod').text(hte_array[i].hte)
              $('.pm-set').text(hte_array[i].sett)
              $('.pm-value').text(hte_array[i].value)
            }
          }
        } else {
          $('.dash').text('--')
        }
      }
      if (target == 'hte-personal' || target == 'equal-hte' || target == 'lessthan-amount') {
        $('#hte-personal-container').html('')
        if (hte_array.length > 0) {
          let hORv;
          if (target == 'equal-hte') {
            hORv = 'd-block'
          } else {
            hORv = 'd-none'
          }
          $('.today-hte-count').text(hte_array.length)
          for (let i = 0; i < hte_array.length; i ++) {
            $('#hte-personal-container')[0].innerHTML += `
              <div class="title-bar vb" id="item${i + 1}">
                <b class='phone_'>${hte_array[i].phone}</b>
                <b class='hte_'>${hte_array[i].hte} ${hte_array[i].session}</b>
                <b class="amount_">${hte_array[i].amount} ကျပ်</b>
                <button class="t-sh ${hORv} vb lucky-amount-add">🚽</button>
              </div>
            `
            vb()
            $('.lucky-amount-add').click(function () {
              $(this).parent().css({
                pointerEvents: 'none',
                opacity: .5
              })
              let phone_ = $(this).parent().children('.phone_').text()
              let hte_ = $(this).parent().children('.hte_').text()
              let lucky_amount = $(this).parent().children('.amount_').text().replace(' ကျပ်', '')
              lucky(phone_, hte_, lucky_amount)
            })
          }
        } else {
          $('.today-hte-count').text(0)
          $('#hte-personal-container')[0].innerHTML += `
            <div class="title-bar">
              <b>မရှိသေးပါ</b>
            </div>
          `
        }
      }
      if (target == 'today-my-hte') {
        $('.hte-container').html('')
        if (hte_array.length > 0) {
          for (let i = 0; i < hte_array.length; i ++) {
            $('#today-my-add-hte-container')[0].innerHTML += `
              <div>
                <b>${hte_array[i].hte}</b>
                <b>${hte_array[i].amount} ကျပ်</b>
                <b>${hte_array[i].amount * 100} ကျပ်</b>
              </div>
            `
          }
        } else {
          $('#today-my-add-hte-container')[0].innerHTML += `
            <div>
              <b>မရှိသေးပါ</b>
            </div>
          `
        }
      }
      if (target == 'all-hte') {
        $('#item-hte-list-container').html('')
        if (hte_array.length > 0) {
          for (let i = 0; i < hte_array.length; i ++) {
            $('#item-hte-list-container')[0].innerHTML += `
              <div class="title-bar chart">
                <b>${hte_array[i].day} - ${hte_array[i].month} - ${hte_array[i].year} (${hte_array[i].session})</b>
                <b>${hte_array[i].phone}</b>
                <b>${hte_array[i].hte}</b>
                <b>${hte_array[i].amount} ကျပ်</b>
              </div>
            `
          }
        } else {
          $('#item-hte-list-container')[0].innerHTML += `
            <div class="title-bar chart">
              <b>မရှိသေးပါ</b>
            </div>
          `
        }
      }
      loadingHide()
    }
  })
}

$('#me').click(function () {
  location.href = 'https://www.facebook.com/minko404'
})

const getLog = (cat, phone, url) => {
  let data = {
    cat: cat,
    phone: phone,
  }
  $.ajax({
    url: url,
    type: 'POST',
    data: data,
    success: function (r) {
      let log = JSON.parse(r)
      if (log.length == 0) {
        $('#log-container')[0].innerHTML = `
                                            <div><h5>မရှိသေးပါ</h5></div> 
                                            `
      }
      if (cat == 'all' && phone == 'all') {
        for (let i = 0; i < log.length; i ++) {
          let cat;
          (log[i].category == 'in') ? cat = 'ငွေသွင်း' : cat = 'ငွေထုတ်';
          $('#item-wallet-log-page')[0].innerHTML += `
                                              <div class="log-box chart">
                                                <div><b>${cat}</b></div>
                                                <div>
                                                  <small>အမည်</small>
                                                  <b>${log[i].name}</b>
                                                </div>
                                                <div>
                                                  <small>ဖုန်း</small>
                                                  <b>${log[i].phone}</b>
                                                </div>
                                                <div>
                                                  <small>ငွေပမာဏ</small>
                                                  <b>${log[i].amount} ကျပ်</b>
                                                </div>
                                                <div>
                                                  <small>ရက်စွဲ</small>
                                                  <b>${log[i].day} - ${log[i].month} - ${log[i].year}</b>
                                                </div>
                                              </div>
                                              `
        }
      } else {
        for (let i = 0; i < log.length; i ++) {
        let cat;
        (log[i].category == 'in') ? cat = 'ငွေသွင်း' : cat = 'ငွေထုတ်';
        $('#log-container')[0].innerHTML += `
                                            <div class="log-box chart">
                                              <div><b>${cat}</b></div>
                                              <div>
                                                <small>ငွေပမာဏ</small>
                                                <b>${log[i].amount} ကျပ်</b>
                                              </div>
                                              <div>
                                                <small>ရက်စွဲ</small>
                                                <b>${log[i].day} - ${log[i].month} - ${log[i].year}</b>
                                              </div>
                                            </div>
                                            `
      }
      }
      loadingHide()
    }
  })
}