function calc(){
    console.log($(this).val())
}


$('#num_pan, #wp_pan').on('input', calc);