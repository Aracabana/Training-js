function fun1() {
    let rtl = document.getElementById('rtl').value;
    let ttl = document.getElementById('ttl');
    
    let rtr = document.getElementById('rtr').value;
    let ttr = document.getElementById('ttr');
    
    let rbl = document.getElementById('rbl').value;
    let tbl = document.getElementById('tbl');
    
    let rbr = document.getElementById('rbr').value;
    let tbr = document.getElementById('tbr');
    
    let rbot = document.getElementById('rbot').value;
    let tbot = document.getElementById('tbot');
    
    let rbor = document.getElementById('rbor').value;
    let tbor = document.getElementById('tbor');
    
    let rbob = document.getElementById('rbob').value;
    let tbob = document.getElementById('tbob');
    
    let rbol = document.getElementById('rbol').value;
    let tbol = document.getElementById('tbol');
    
    let block = document.getElementById('block');
    
    ttl.value = rtl;
    ttr.value = rtr;
    tbl.value = rbl;
    tbr.value = rbr;
    
    tbot.value = rbot;
    tbor.value = rbor;
    tbob.value = rbob;
    tbol.value = rbol;
    
    block.style.borderRadius = rtl + 'px ' + rtr + 'px ' + rbr + 'px ' + rbl + 'px ';
    block.style.borderWidth = rbot + 'px ' + rbor + 'px ' + rbob + 'px ' + rbol + 'px ';
}
