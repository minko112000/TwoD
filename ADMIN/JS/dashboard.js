let color_8 = ['#6e6696', '#2f8fb7','#5621cf', '#fab574', '#be6a29', '#fff', '#7c5c3c', '#40653c', '#bb2bb2']
let labels =  ['သွင်းငွေ', 'ထုတ်ငွေ', 'ထိုးငွေ', 'ပေါက်ငွေ', 'အသုံးပြုသူ', 'ကြည့်ရှုမှု', 'ထီထိုးသူ', 'ထီပေါက်သူ', 'ထီအလုံးရေ']
let datasAll = [];
let datasToday = [];
let datasYesterday = [];
let datasThisMonth = [];
let datasLastMonth = [];

const chartDatas = () => {
  $('#chart').remove()
  $.ajax({
    url: 'PHP/get_admin_data.php',
    type: 'POST',
    data: `m=${month}`,
    success: function (r) {
      datas = JSON.parse(r)
      datasAll = [datas.datasAll.d1, datas.datasAll.d2, datas.datasAll.d3, datas.datasAll.d4, datas.datasAll.d5, datas.datasAll.d6, datas.datasAll.d7, datas.datasAll.d8, datas.datasAll.d9]
      datasToday = [datas.datasToday.d1, datas.datasToday.d2, datas.datasToday.d3, datas.datasToday.d4, datas.datasToday.d5, datas.datasToday.d6, datas.datasToday.d7, datas.datasToday.d8, datas.datasToday.d9]
      datasThisMonth = [datas.datasThisMonth.d1, datas.datasThisMonth.d2, datas.datasThisMonth.d3, datas.datasThisMonth.d4, datas.datasThisMonth.d5, datas.datasThisMonth.d6, datas.datasThisMonth.d7, datas.datasThisMonth.d8, datas.datasThisMonth.d9]
      $('.chart-container').append(`<canvas id="chart"></canvas>`)
      new Chart($('#chart'), {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: ' စုစုပေါင်း ',
              borderWidth: 1,
              borderColor: '#45b945',
              pointHitRadius: 10,
              pointStyle: 'rectRot',
              tension: .1,
              hoverBorderColor: '#45b945',
              hoverBackgroundColor: '#45b945',
              pointBorderColor: '#45b945',
              pointBackgroundColor: '#45b945',
              data: datasAll,
            },
            {
              label: ' ယနေ့ ',
              borderWidth: 1,
              borderColor: 'yellow',
              pointHitRadius: 10,
              pointStyle: 'rectRot',
              tension: .1,
              hoverBorderColor: 'yellow',
              hoverBackgroundColor: 'yellow',
              pointBorderColor: 'yellow',
              pointBackgroundColor: 'yellow',
              data: datasToday,
            },
            {
              label: ' ယခုလ ',
              borderWidth: 1,
              borderColor: '#bb2124',
              pointHitRadius: 10,
              pointStyle: 'rectRot',
              tension: .1,
              hoverBorderColor: '#bb2124',
              hoverBackgroundColor: '#bb2124',
              pointBorderColor: '#bb2124',
              pointBackgroundColor: '#bb2124',
              data: datasThisMonth,
            }
          ]
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: '#bbb',
              },
              grid: {
                color: '#26324a'
              }
            },
            y: {
              ticks: {
                color: "#bbb"
              },
              grid: {
                color: '#26324a'
              }
            },
          }
        }
      });
    }
  })
}

const hteData = () => {
  username = 'username'
  getHte('', 'today-lucky-hte', '../php/server/get_hte.php')
  getHte('', 'hte-personal', '../php/server/get_hte.php')
}

window.addEventListener('load', () => {
  hteData()
  chartDatas()
})

const mute = () => {
  $('nav, main > div, .inner-page').css({
    opacity: .5,
    pointerEvents: 'none'
  })
}

const bright = () => {
  $('nav, main > div, .inner-page').css({
    opacity: 1,
    pointerEvents: 'auto'
  })
}

const sideBarShow = () => {
  $('#side-bar').addClass('side-bar-show')
  mute()
}

const sideBarHide = () => {
  $('#side-bar').removeClass('side-bar-show')
  bright()
}

const getUsers = (users) => {
  loadingShow()
  $.ajax({
      url: 'PHP/get_users.php',
      type: 'POST',
      data: `users=${users}`,
      success: function (r) {
        let users = JSON.parse(r)
        let users_total_balance = 0
        $('#users-container')[0].innerHTML = ''
        $('.users-count').text(users.length + ' ဦး')
        for (let i = 0; i < users.length; i ++) {
          users_total_balance += parseInt(users[i].balance, 10)
          $('.users-total-balance').text(users_total_balance + ' ကျပ်')
          $('#users-container')[0].innerHTML += `
                                                  <div class="h">
                                                    <b>${users[i].name}</b>
                                                    <b>${users[i].email}</b>
                                                    <b>${users[i].phone}</b>
                                                    <b>${users[i].balance} ကျပ်</b>
                                                    <b>${users[i].cash_out} ကျပ်</b>
                                                  </div>
                                                `
        }
        loadingHide()
      }
  })
}

$('#bar-icon').click(function () {
  sideBarShow()
})

$('main, #wrapper-page').mousedown(function () {
  sideBarHide()
})

$('.item').click(function () {
  sideBarHide()
  let id = $(this).attr('id')
  if (id == 'item-home') {
    $('main').show()
    $('#wrapper-page').hide()
  } else {
    $('main').hide()
    $('#wrapper-page').show()
    $('.inner-page').hide()
    $(`#${id}-page`).show()
    if (id == 'item-users') {
      getUsers('all')
    }
    if (id == 'item-hte-list') {
      loadingShow()
      getHte('', 'all-hte', '../php/server/get_hte.php')
    }
    if (id == 'item-wallet-log') {
      loadingShow()
      getLog('all', 'all', '../php/server/get_log.php')
    }
  }
})

$('#users-search').keyup(function () {
  let text = $(this).val().trim()
  if (text == '') {
    getUsers('all')
  } else {
    getUsers(text)
  }
})

let type = '';
$('.money-in-out-add > div div').click(function () {
  $('.money-in-out-add > div div').text('')
  type = $(this).attr('id')
  $(this).text('✔')
})

$('#money-in-out-add-btn').click(function () {
  let date = new Date()
  let day = date.getDate()
  let month = textMonth(date.getMonth())
  let year = date.getFullYear()
  let phone = $('#phone').val()
  let amount = $('#amount').val()
  if (type.length != 0 && phone.length != 0 && amount > 0) {
    let data = {
      type: type,
      phone: phone,
      amount: amount,
      day: day,
      month: month,
      year: year
    }
    $.ajax({
      url: 'PHP/money_in_out_add.php',
      type: 'POST',
      data: data,
      success: function (r) {
        if (r == 'OK') {
          $('.money-in-out-add #phone').val('')
          $('.money-in-out-add #amount').val('')
          top_alert('အောင်မြင်ပါသည်', '#3a9f1a')
        } else {
          top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
        }
      }
    })
    top_alert('အောင်မြင်ပါသည်', '#3a9f1a')
  } else {
    top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
  }
})

let target_search = 'equal-hte';
$('.search-bar div').click(function () {
  target_search = $(this).attr('id')
  $('.search-bar div').removeClass('check')
  $(this).addClass('check')
})

$('#search').keyup(function () {
  let point = $(this).val().trim()
  if (point != '') {
    getHte(point, target_search, '../php/server/get_hte.php')
  } else {
    getHte('', 'hte-personal', '../php/server/get_hte.php')
  }
})

$('#lucky-hte-add-btn').click(function () {
  let twod = $('#lucky-hte-add-twod').val()
  let sett = $('#lucky-hte-add-set').val()
  let value = $('#lucky-hte-add-value').val()
  let day = $('#lucky-hte-add-day').val()
  let month = $('#lucky-hte-add-month').val().trim()
  let year = $('#lucky-hte-add-year').val()
  let session = $('#lucky-hte-add-session').val().toUpperCase().trim()
  if (twod.length == 2 && sett.length != 0 && value.length != 0 && day.length != 0 && month != '' && year >= 2023 && session != '') {
    let data = {
      mode: 'lucky',
      hte: twod,
      sett: sett,
      value: value,
      day: day,
      month: month,
      year: year,
      session: session
    }
    $.ajax({
      url: 'PHP/hte_result_add.php',
      type: 'POST',
      data: data,
      success: function (r) {
        if (r == 'OK') {
          top_alert('အောင်မြင်ပါသည်', '#3a9f1a')
          $('.lucky-hte-add input').val('')
        } else {
          top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
        }
      }
    })
  } else {
    top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
  }
})

$('#close-hte-add-btn').click(function () {
  let twod = $('#close-hte-add-twod').val()
  let day = $('#close-hte-add-day').val()
  let month = $('#close-hte-add-month').val().trim()
  let year = $('#close-hte-add-year').val()
  let session = $('#close-hte-add-session').val().toUpperCase().trim()
  if (twod.length == 2 && day.length != 0 && month != '' && year >= 2023 && session != '') {
    let data = {
      mode: 'close',
      hte: twod,
      sett: 0,
      value: 0,
      day: day,
      month: month,
      year: year,
      session: session
    }
    $.ajax({
      url: 'PHP/hte_result_add.php',
      type: 'POST',
      data: data,
      success: function (r) {
          console.log(r)
        if (r == 'OK') {
          top_alert('အောင်မြင်ပါသည်', '#3a9f1a')
          $('.lucky-hte-add input').val('')
        } else {
          top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
        }
      }
    })
  } else {
    top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
  }
})