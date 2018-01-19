$(document).ready(function () {
  $('#login-form').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      email: {
        email: 'Please enter a valid email',
        required: 'Please enter your email'
      },
      password: {
        required: 'Please enter your password',
        minlength: 'Your password is too short'
      }
    },
    submitHandler: function () {
      $.ajax({
        url: 'http://localhost:8080/user/login',
        type: 'POST',
        dataType: 'json',
        data: {
          email: $('#email').val(),
          password: $('#password').val()
        },
        success: function (data) {
          if (data.code === 0) {
            window.location.href = '/project/dashboard'
          } else if (data.code === 1) {
            $('.error-message').text(data.message)
          }
        },
        error: function (error) {
          console.log(error.responseJSON.message)
        }
      })
    }
  })
})
