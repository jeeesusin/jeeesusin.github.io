
const $ = id => document.getElementById(id);
const num = id => parseFloat($(id)?.value);
const fmt = n => Number.isFinite(n) ? n.toLocaleString('es-ES',{maximumFractionDigits:2}) : '—';
function show(id,text){if($(id)) $(id).innerHTML=text}
function safeDiv(a,b){return b===0||!Number.isFinite(a)||!Number.isFinite(b)?null:a/b}

function calc(){
 const page=document.body.dataset.calc;
 try{
  let r=null;
  switch(page){
   case 'porcentajes': r=`${fmt(num('p'))}% de ${fmt(num('n'))} = <strong>${fmt(num('p')*num('n')/100)}</strong>`;break;
   case 'iva': {let base=num('base'),iva=num('iva');r=`IVA: <strong>${fmt(base*iva/100)} €</strong><br>Total: <strong>${fmt(base*(1+iva/100))} €</strong>`;break}
   case 'descuentos': {let p=num('precio'),d=num('descuento');r=`Ahorras <strong>${fmt(p*d/100)} €</strong><br>Precio final: <strong>${fmt(p*(1-d/100))} €</strong>`;break}
   case 'regla-de-tres': {let a=num('a'),b=num('b'),c=num('c');let x=safeDiv(b*c,a);r=x===null?'Revisa los valores.':`Resultado: <strong>${fmt(x)}</strong>`;break}
   case 'interes-simple': {let c=num('capital'),i=num('interes'),t=num('tiempo');let interest=c*i*t/100;r=`Interés: <strong>${fmt(interest)} €</strong><br>Total: <strong>${fmt(c+interest)} €</strong>`;break}
   case 'interes-compuesto': {let c=num('capital'),i=num('interes'),t=num('tiempo');let total=c*Math.pow(1+i/100,t);r=`Capital final: <strong>${fmt(total)} €</strong><br>Interés generado: <strong>${fmt(total-c)} €</strong>`;break}
   case 'consumo-coche': {let l=num('litros'),km=num('km');let x=safeDiv(l*100,km);r=x===null?'Revisa los valores.':`Consumo: <strong>${fmt(x)} L/100 km</strong>`;break}
   case 'precio-unitario': {let p=num('precio'),q=num('cantidad');let x=safeDiv(p,q);r=x===null?'Revisa los valores.':`Precio unitario: <strong>${fmt(x)} €</strong>`;break}
   case 'propina': {let c=num('cuenta'),p=num('propina');let tip=c*p/100;r=`Propina: <strong>${fmt(tip)} €</strong><br>Total: <strong>${fmt(c+tip)} €</strong>`;break}
   case 'dividir-cuenta': {let c=num('cuenta'),p=num('personas'),t=num('propina');let total=c*(1+t/100),each=safeDiv(total,p);r=each===null?'Revisa el número de personas.':`Total con propina: <strong>${fmt(total)} €</strong><br>Por persona: <strong>${fmt(each)} €</strong>`;break}
   case 'iva-incluido': {let total=num('total'),iva=num('iva');let base=total/(1+iva/100);r=`Base sin IVA: <strong>${fmt(base)} €</strong><br>IVA: <strong>${fmt(total-base)} €</strong>`;break}
   case 'sueldo-anual': {let m=num('mensual'),pagas=num('pagas');r=`Sueldo anual bruto estimado: <strong>${fmt(m*pagas)} €</strong>`;break}
   case 'sueldo-hora': {let anual=num('anual'),h=num('horas'),s=num('semanas');let x=anual/(h*s);r=`Sueldo por hora estimado: <strong>${fmt(x)} €</strong>`;break}
   case 'diferencia-fechas': {let a=new Date($('fecha1').value),b=new Date($('fecha2').value);let days=Math.round(Math.abs(b-a)/86400000);r=`Diferencia: <strong>${days.toLocaleString('es-ES')} días</strong>`;break}
   case 'edad': {let d=new Date($('nacimiento').value),now=new Date();if(isNaN(d)) throw 1;let y=now.getFullYear()-d.getFullYear();let m=now.getMonth()-d.getMonth();let day=now.getDate()-d.getDate();if(day<0){m--;day+=new Date(now.getFullYear(),now.getMonth(),0).getDate()}if(m<0){y--;m+=12}r=`Edad aproximada: <strong>${y} años, ${m} meses y ${day} días</strong>`;break}
   case 'fracciones': {let a=num('a'),b=num('b'),c=num('c'),d=num('d'),op=$('op').value;if(!b||!d) throw 1;let n=op==='+'?a*d+c*b:op==='-'?a*d-c*b:op==='*'?a*c:a*d;let den=op==='+'||op==='-'?b*d:b*(op==='*'?d:c);r=`Resultado: <strong>${fmt(n)}/${fmt(den)}</strong> ≈ <strong>${fmt(n/den)}</strong>`;break}
   case 'area': {let type=$('tipo').value;let x,y; if(type==='rect'){x=num('a');y=num('b');r=`Área: <strong>${fmt(x*y)} unidades²</strong>`} else if(type==='tri'){x=num('a');y=num('b');r=`Área: <strong>${fmt(x*y/2)} unidades²</strong>`} else {x=num('a');r=`Área: <strong>${fmt(Math.PI*x*x)} unidades²</strong>`}break}
   case 'volumen': {let type=$('tipo').value;let a=num('a'),b=num('b'),c=num('c');let v=type==='cubo'?a**3:type==='caja'?a*b*c:Math.PI*a*a*b;r=`Volumen: <strong>${fmt(v)} unidades³</strong>`;break}
   case 'hipoteca': {let p=num('capital'),rte=num('interes')/100/12,n=num('anos')*12;let m=rte===0?p/n:p*rte/(1-Math.pow(1+rte,-n));r=`Cuota mensual estimada: <strong>${fmt(m)} €</strong><br>Total pagado: <strong>${fmt(m*n)} €</strong>`;break}
   case 'prestamo': {let p=num('capital'),rte=num('interes')/100/12,n=num('meses');let m=rte===0?p/n:p*rte/(1-Math.pow(1+rte,-n));r=`Cuota mensual estimada: <strong>${fmt(m)} €</strong><br>Total pagado: <strong>${fmt(m*n)} €</strong>`;break}
   case 'combustible-viaje': {let km=num('km'),cons=num('consumo'),price=num('precio');let l=km*cons/100;r=`Combustible: <strong>${fmt(l)} L</strong><br>Coste estimado: <strong>${fmt(l*price)} €</strong>`;break}
   case 'longitud': {let v=num('valor'),from=$('from').value,to=$('to').value;const f={m:1,km:1000,cm:.01,mm:.001,milla:1609.344,pie:.3048};r=`Resultado: <strong>${fmt(v*f[from]/f[to])} ${to}</strong>`;break}
   case 'temperatura': {let v=num('valor'),from=$('from').value,to=$('to').value,c=v;if(from==='C') c=v; if(from==='F') c=(v-32)*5/9; if(from==='K') c=v-273.15; let out=to==='C'?c:to==='F'?c*9/5+32:c+273.15;r=`Resultado: <strong>${fmt(out)} °${to}</strong>`;break}
   case 'peso': {let v=num('valor'),from=$('from').value,to=$('to').value;const f={kg:1,g:.001,lb:.45359237,oz:.0283495231,t:1000};r=`Resultado: <strong>${fmt(v*f[from]/f[to])} ${to}</strong>`;break}
   case 'velocidad': {let v=num('valor'),from=$('from').value,to=$('to').value;const f={'km/h':1,'m/s':3.6,'mph':1.609344};r=`Resultado: <strong>${fmt(v*f[from]/f[to])} ${to}</strong>`;break}
   case 'tiempo': {let v=num('valor'),from=$('from').value,to=$('to').value;const f={seg:1,min:60,h:3600,d:86400};r=`Resultado: <strong>${fmt(v*f[from]/f[to])} ${to}</strong>`;break}
   case 'numeros-romanos': {let mode=$('modo').value;if(mode==='arabigo'){let n=Math.floor(num('valor'));if(n<1||n>3999) throw 1;const vals=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let s='';for(const [v,ch] of vals){while(n>=v){s+=ch;n-=v}}r=`Romano: <strong>${s}</strong>`}else{let s=$('romano').value.toUpperCase().trim(),map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000},tot=0;for(let i=0;i<s.length;i++)tot+=(map[s[i]]||0)<(map[s[i+1]]||0)?-map[s[i]]:map[s[i]];r=`Número: <strong>${tot}</strong>`}break}
   case 'media': {let arr=$('valores').value.split(',').map(x=>parseFloat(x.trim())).filter(Number.isFinite);if(!arr.length) throw 1;r=`Media: <strong>${fmt(arr.reduce((a,b)=>a+b,0)/arr.length)}</strong><br>Valores: ${arr.length}`;break}
   case 'aumento-disminucion': {let old=num('anterior'),nw=num('nuevo');let pct=(nw-old)/old*100;r=`Cambio: <strong>${fmt(pct)}%</strong>`;break}
   case 'horas-decimales': {let mode=$('modo').value;if(mode==='decimal'){let v=num('valor');let h=Math.floor(v),m=Math.round((v-h)*60);r=`Resultado: <strong>${h} h ${m} min</strong>`}else{let h=num('horas'),m=num('minutos');r=`Resultado: <strong>${fmt(h+m/60)} horas</strong>`}break}
  }
  show('resultado',r||'Introduce los valores y pulsa calcular.');
 }catch(e){show('resultado','Revisa los valores introducidos.')}
}
document.addEventListener('DOMContentLoaded',()=>{
 const f=$('calcform'); if(f) f.addEventListener('submit',e=>{e.preventDefault();calc()});
 const tipo=$('tipo'); if(tipo) tipo.addEventListener('change',()=>{document.querySelectorAll('[data-type]').forEach(x=>x.hidden=x.dataset.type!==tipo.value)});
 const modo=$('modo'); if(modo) modo.addEventListener('change',()=>{document.querySelectorAll('[data-mode]').forEach(x=>x.hidden=x.dataset.mode!==modo.value)});
 const search=$('search'); if(search) search.addEventListener('input',()=>{const q=search.value.toLowerCase();document.querySelectorAll('.toolcard').forEach(c=>c.classList.toggle('hidden',!c.innerText.toLowerCase().includes(q)))});
});
