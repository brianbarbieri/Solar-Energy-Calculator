function calc(){

    var num_panels = parseFloat($('#num_pan').val())
    if ((num_panels  === "") | (isNaN(num_panels))){
        num_panels = parseFloat($('#num_pan').attr('placeholder'));
    }

    var wp_panels = $('#wp_pan').val()
    if (wp_panels  === ""){
        wp_panels = parseFloat($('#wp_pan').attr('placeholder'));
    }

    var p_panels = $('#p_pan').val()
    if (p_panels  === ""){
        p_panels = parseFloat($('#p_pan').attr('placeholder'));
    }

    var p_inv = $('#p_inv').val()
    if (p_inv  === ""){
        p_inv = parseFloat($('#p_inv').attr('placeholder'));
    }

    var lt_pan = $('#lt_pan').val()
    if (lt_pan  === ""){
        lt_pan = parseFloat($('#lt_pan').attr('placeholder'));
    }

    var lt_inv = $('#lt_inv').val()
    if (lt_inv  === ""){
        lt_inv = parseFloat($('#lt_inv').attr('placeholder'));
    }

    var elec_cost = $('#elec_cost').val()
    if (elec_cost  === ""){
        elec_cost = parseFloat($('#elec_cost').attr('placeholder'));
    }

    var test = true;

    var not_break_even = true;
    var total_income = 0;
    var total_profit = 0;
    var total_costs = 0;
    const degredation = 0.0055; // 0.55 % per year degredation
    var prod_year, income_year, cost_year;
    for (var i = 0; i < lt_pan; i++) {
        prod_year = ((wp_panels * (1 - degredation)**i) * 0.9) * num_panels; //kWh per year
        income_year = prod_year * elec_cost;
        total_income += income_year;
        cost_year = 0;
        if (i % lt_inv == 0){
            cost_year += p_inv;
        }
        if(i % lt_pan == 0){
            cost_year += (num_panels * p_panels);
        }
        total_profit += income_year - cost_year;
        total_income += income_year;
        total_costs += cost_year;
        console.log(i+1, total_profit)
        if ((total_profit >= 0) & not_break_even){
            not_break_even= false;
            $('#breven').html("Break-even point after " + (i+1).toString() + ' years');
        }
    }
    if (not_break_even){
        $('#breven').html("No break-even point can be reached")
    }
}

$('#num_pan, #wp_pan, #p_pan, #p_inv, #lt_pan, lt_inv, #elec_cost').on('input', calc);
calc()