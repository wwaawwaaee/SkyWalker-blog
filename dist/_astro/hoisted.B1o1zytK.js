import"./hoisted.BlWn1cc6.js";document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("click-note");t&&t.addEventListener("click",i=>{t.classList.add("hidden");const d=document.querySelector("#particles-js canvas");if(d){const o=t.getBoundingClientRect(),e=i.clientX||o.left+o.width/2,s=i.clientY||o.top+o.height/2;for(let n=0;n<70;n++)setTimeout(()=>{const c=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0,clientX:e,clientY:s});d.dispatchEvent(c)},n*60)}setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},400),window.innerWidth>768&&document.documentElement.getAttribute("data-theme")!=="dark"&&setTimeout(()=>{if(!document.getElementById("mode-note")){const e=document.createElement("div");e.id="mode-note",e.className="mode-note",e.textContent="dark mode looks cooler!",e.style.cssText=`
              position: fixed;
              top: 86px;
              right: 7.5rem;
              z-index: 3;
              background: #fffdf5;
              color: #333;
              border: 1px solid rgba(0,0,0,0.08);
              border-radius: 6px;
              box-shadow: 0 8px 18px rgba(0,0,0,0.15);
              padding: 8px 12px;
              font-family: 'Shadows Into Light', cursive;
              font-size: 18px;
              transform: rotate(-2deg);
              cursor: pointer;
              user-select: none;
              transition: opacity 0.2s ease, transform 0.2s ease;
            `,e.addEventListener("click",()=>{e.style.opacity="0",setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},240)}),document.body.appendChild(e),setTimeout(()=>{e.parentNode&&(e.style.opacity="0",setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},260))},3e3)}},4e3)})});
