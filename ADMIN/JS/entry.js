$('#admin-login').click(function () {
  const data = {
    username: $('#username').val().trim(),
    password: $('#password').val().trim()
  }
  $.ajax({
      url: 'PHP/entry.php',
      type: 'POST',
      data: data,
      success: function (r) {
        if (r == 'OK') {
          top_alert('အောင်မြင်ပါသည်', '#4bb543')
          setTimeout(function() {
            location.href = 'dashboard.php'
          }, 3000);
        } else {
          top_alert('တစ်ခုခုမှားယွင်းနေပါသည်', '#bb2124')
        }
      }
  })
})