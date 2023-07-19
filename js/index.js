const toMainPage = () => {
  setTimeout(function() {
    location.href = 'php/main.html'
  }, 3000);
}

if (username != null) {
  toMainPage()
} else {
  setTimeout(function() {
    $('#intro').hide()
  }, 3000);
}

let registration = 'login'

const nameCheck = name => {
  if (name.length < 3) {
    return false
  } else {
    return true
  }
}

const emailCheck = email => {
  if (email.length > 15 && email.length < 41) {
    return true
  } else {
    return false
  }
}

const phoneCheck = phone => {
  if (phone.length == 11 || phone.length == 10) {
    return true
  } else {
    return false
  }
}

const passwordCheck = password => {
  if (password.length >= 8) {
    return true
  } else {
    return false
  }
}

const otpCheck = otp => {
  if (otp.length == 6) {
    return true
  } else {
    return false
  }
}

const form = document.getElementById('form')

const formChange = () => {
  if (registration == 'login') {
    $('#forgot-password').show()
    $('#login').show()
    $('#signup').hide()
    $('.to-signup').show()
    $('.to-login').hide()
    $('#name').parent().hide()
    $('#phone').parent().hide()
  } else {
    $('#forgot-password').hide()
    $('#login').hide()
    $('#signup').show()
    $('.to-signup').hide()
    $('.to-login').show()
    $('#name').parent().show()
    $('#phone').parent().show()
  }
}
formChange()

const sendFormData = form => {
    const data = new FormData(form)
    $.ajax({
      url: 'php/server/registration.php',
      type: 'POST',
      data: data,
      contentType: false,
      processData: false,
      success: function (r) {
        let entry = JSON.parse(r)
        console.log(entry)
        let entry_username = entry.username
        let entry_entry = entry.entry
        if (entry_username == '' && entry_entry == '') {
          top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
        } else if (entry_username == '' && entry_entry == 'used email') {
            top_alert('အသုံးပြုပြီးသားအီးလ်မေး', '#4bb543')
        } else if (entry_username == '' && entry_entry == 'used phone') {
            top_alert('အသုံးပြုပြီးသားဖုန်း', '#4bb543')
        } else if (entry_username == '' && entry_entry == 'signup') {
          loadingHide()
          top_alert('​အောင်မြင်ပါသည်၊ အကောင့်ပြန်ဝင်ပါ။', '#4bb543')
          $('#to-login').click()
        } else if (entry_username != '' && entry_entry == 'login') {
          top_alert('အောင်မြင်ပါသည်', '#4bb543')
          localStorage.setItem('username', entry_username)
          toMainPage()
        }
        loadingHide()
      }
    })
}

const forgotPasswordBoxShow = () => {
  $('#forgot-password-box').show()
  $('#form, .change').css('opacity', .2)
}

const forgotPasswordBoxHide = () => {
  $('#forgot-password-box').hide()
  $('#form, .change').css('opacity', 1)
}

$('#form > div input').keyup(function () {
  if ($(this).val().trim() != '') {
    $(this).parent().children('label').addClass('labelup')
  } else {
    $(this).parent().children('label').removeClass('labelup')
  }
})

$('#eye').click(function () {
  if ($(this).hasClass('fa-eye')) {
    $(this).removeClass('fa-eye')
    $(this).addClass('fa-eye-slash')
    $('#password').attr('type', 'text')
  } else {
    $(this).addClass('fa-eye')
    $(this).removeClass('fa-eye-slash')
    $('#password').attr('type', 'password')
  }
})

$('#to-signup').click(function () {
  registration = 'signup'
  formChange()
})

$('#to-login').click(function () {
  registration = 'login'
  formChange()
})

$('.change b').click(function () {
  $('input').val('')
  $('label').removeClass('labelup')
})

$('#login').click(function () {
  let email = $('#email').val().trim()
  let password = $('#password').val().trim()
  if (emailCheck(email) == true && passwordCheck(password) == true) {
    sendFormData(form)
    loadingShow()
  } else {
    top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
  }
})

$('#signup').click(function () {
  let name = $('#name').val().trim()
  let email = $('#email').val().trim()
  let phone = $('#phone').val().trim()
  let password = $('#password').val().trim()
  if (nameCheck(name) == true && emailCheck(email) == true && phoneCheck(phone) == true && passwordCheck(password) == true) {
    loadingShow()
    $('#signup-m').val(month)
    sendFormData(form)
  } else {
    top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
  }
})

$('#forgot-password').click(function () {
  forgotPasswordBoxShow()
})

$('#forgot-password-box-close').click(function () {
  forgotPasswordBoxHide()
})

const codeDuration = () => {
  let s = 60
  const setIntervalId = setInterval(function () {
    $('#send-code small').text(`${s -= 1}s`)
  }, 1000)
  setTimeout(function() {
    clearInterval(setIntervalId)
    $('#send-code small').text('')
    $('#send-code').css('pointerEvents', 'auto')
    $.ajax({
      url: 'php/server/forgot_password.php',
      type: 'POST',
      data: 'otp=otp',
    })
  }, 60000);
}

$('#send-code').click( function () {
  top_alert('ကျေးဇူးပြု၍ ခဏစောင့်ပေးပါ', '#4bb543')
  $('#send-code').css('pointerEvents', 'none')
  let forgot_password_email = $('#forgot-password-email').val().trim()
  if (emailCheck(forgot_password_email) == true) {
    let data = {
      forgot_password_email: forgot_password_email
    }
    $.ajax({
      url: 'php/server/forgot_password.php',
      type: 'POST',
      data: data,
      success: function (r) {
      console.log(r)
        if (r == 'တစ်မိနစ်အတွင်းကုဒ်ထည့်ပါ') {
          top_alert(forgot_password_email + ' သို့ OTP ပို့ပေးထားသည်', '#4bb543')
          codeDuration()
        } else {
          top_alert(r, '#bb2124')
        }
      }
    })
  } else {
    $('#send-code').css('pointerEvents', 'auto')
    top_alert('မှန်ကန်မှုမရှိသောအီးလ်မေး', '#bb2124')
  }
})

$('#forgot-password-submit').click( function () {
  let forgot_password_email = $('#forgot-password-email').val().trim()
  let forgot_password_otp = $('#forgot-password-otp').val()
  let new_password = $('#new-password').val()
  if (passwordCheck(new_password) == true && otpCheck(forgot_password_otp) == true) {
    let data = {
      email: forgot_password_email,
      otp: forgot_password_otp,
      new_password: new_password
    }
    $.ajax({
      url: 'php/server/forgot_password.php',
      type: 'POST',
      data: data,
      success: function (r) {
        if (r == 'OK') {
          top_alert('အောင်မြင်ပါသည်၊ အကောင့်ပြန်ဝင်ပါ။', '#4bb543')
          $('#forgot-password-box-close').click()
          $('#forgot-password-box input').val('')
        } else {
          top_alert(r, '#bb2124')
        }
      }
    })
  } else {
    top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
  }
})