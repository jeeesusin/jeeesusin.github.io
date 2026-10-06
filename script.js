const E=n=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n),N=id=>parseFloat(document.getElementById(id).value)||0,O=(id,x)=>document.getElementById(id).innerHTML=x;
function pct(){O('r',`Resultado: <strong>${(N('a')*N('b')/100).toFixed(2)}</strong>`)}
function iva(){let p=N('a'),r=N('b'),x=p*r/100;O('r',`IVA: <strong>${E(x)}</strong><br>Total: <strong>${E(p+x)}</strong>`)}
function disc(){let p=N('a'),d=N('b'),x=p*d/100;O('r',`Ahorro: <strong>${E(x)}</strong><br>Precio final: <strong>${E(p-x)}</strong>`)}
function rule(){O('r',`Resultado: <strong>${(N('b')*N('c')/N('a')).toFixed(2)}</strong>`)}
function interest(){let x=N('a')*N('b')/100*N('c');O('r',`Interés: <strong>${E(x)}</strong><br>Capital final: <strong>${E(N('a')+x)}</strong>`)}
function car(){let l=N('a')*N('b')/100;O('r',`Litros: <strong>${l.toFixed(2)} L</strong><br>Coste: <strong>${E(l*N('c'))}</strong>`)}
function unit(){O('r',`Precio unitario: <strong>${E(N('a')/N('b'))}</strong>`)}
function tip(){let x=N('a')*N('b')/100;O('r',`Propina: <strong>${E(x)}</strong><br>Total: <strong>${E(N('a')+x)}</strong>`)}
function split(){O('r',`Cada persona: <strong>${E(N('a')/N('b'))}</strong>`)}
function reverse(){let t=N('a'),r=N('b'),base=t/(1+r/100);O('r',`Base: <strong>${E(base)}</strong><br>IVA: <strong>${E(t-base)}</strong>`)}
function annual(){O('r',`Bruto anual aproximado: <strong>${E(N('a')*N('b'))}</strong><br><span class="muted">No incluye IRPF ni cotizaciones.</span>`)}
function dates(){let a=new Date(document.getElementById('a').value),b=new Date(document.getElementById('b').value);O('r',`Diferencia: <strong>${Math.abs(Math.round((b-a)/86400000))} días</strong>`)}
function age(){let b=new Date(document.getElementById('a').value),n=new Date(),x=n.getFullYear()-b.getFullYear();if(n.getMonth()<b.getMonth()||(n.getMonth()==b.getMonth()&&n.getDate()<b.getDate()))x--;O('r',`Edad: <strong>${x} años</strong>`)}
function search(){let q=document.getElementById('q').value.toLowerCase();document.querySelectorAll('.calc').forEach(x=>x.style.display=x.dataset.n.includes(q)?'block':'none')}
