$('#poslji').on('click', function(){
    $.ajax({
        url: '/python',
        data: {data: editor.getValue() },
        type: 'POST',
        dataType: 'json',
        jsonpCallback: 'callback',
        success: function(data){
            console.log(data);
            $('#resitev').text(data.data);
        },
        error: function(xhr, status, error){
            console.log(error);
        },
    });
});