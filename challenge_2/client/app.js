$(document).ready(function () {
  $('button').on('click', (e) => {
    e.preventDefault();
    var form = document.getElementById('form-id');
    var formData = new FormData(form);
    $.ajax({
      url: 'http://localhost:3000/',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: (data, status, xhr) => {
        $('body').html(data);
        $('#download').css('display', 'inline');
      }
    })
  })
})

