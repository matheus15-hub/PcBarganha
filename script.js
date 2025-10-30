// Menu responsivo: alterna a classe open para o <nav>
document.addEventListener('click', function (e) {
  // Menu buttons com IDs menuBtn, menuBtn2, ...
  const btn = e.target.closest('.menu-btn');
  if (!btn) return;
  const nav = btn.nextElementSibling;
  if (!nav) return;
  const isOpen = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(isOpen));
});

// Copiar cupom (evento delegação)
document.addEventListener('click', function (e) {
  const copyBtn = e.target.closest('.copy-coupon');
  if (!copyBtn) return;
  const code = copyBtn.dataset.code;
  if (!code) return;
  // tenta usar a API Clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = 'Copiado!';
      setTimeout(()=> copyBtn.textContent = 'Copiar', 1500);
    }).catch(()=>{
      // fallback
      const tmp = document.createElement('textarea');
      tmp.value = code; document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand('copy'); copyBtn.textContent = 'Copiado!'; }
      catch(e){ alert('Não foi possível copiar automaticamente. Código: ' + code); }
      tmp.remove();
      setTimeout(()=> copyBtn.textContent = 'Copiar', 1500);
    });
  } else {
    // fallback
    const tmp = document.createElement('textarea');
    tmp.value = code; document.body.appendChild(tmp);
    tmp.select();
    try { document.execCommand('copy'); copyBtn.textContent = 'Copiado!'; }
    catch(e){ alert('Não foi possível copiar automaticamente. Código: ' + code); }
    tmp.remove();
    setTimeout(()=> copyBtn.textContent = 'Copiar', 1500);
  }
});