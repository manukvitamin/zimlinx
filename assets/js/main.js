
const creators=[
{name:"Sherin V",i:"SV",p:"TikTok",cat:"Parenting",f:"85K",v:"32.4K",e:"6.8%",r:"4.9",price:500000,t:["Parenting","Lifestyle"]},
{name:"Nadia A.",i:"NA",p:"Instagram",cat:"Beauty",f:"42K",v:"18.7K",e:"7.2%",r:"4.8",price:350000,t:["Beauty","Fashion"]},
{name:"Raka Food",i:"RF",p:"TikTok",cat:"Food",f:"120K",v:"56K",e:"8.1%",r:"5.0",price:800000,t:["Food","F&B"]},
{name:"Dimas Home",i:"DH",p:"Facebook",cat:"Home & Living",f:"61K",v:"41K",e:"5.9%",r:"4.9",price:450000,t:["Home","Review"]},
{name:"Maya Play",i:"MP",p:"YouTube",cat:"Gaming",f:"75K",v:"29K",e:"5.4%",r:"4.7",price:600000,t:["Gaming","Tech"]},
{name:"Luna Style",i:"LS",p:"TikTok",cat:"Fashion",f:"28K",v:"21K",e:"9.2%",r:"4.9",price:300000,t:["Fashion","Lifestyle"]},
{name:"Alya Beauty",i:"AB",p:"Instagram",cat:"Beauty",f:"110K",v:"47K",e:"6.1%",r:"4.8",price:900000,t:["Beauty","Skincare"]},
{name:"Bimo Gaming",i:"BG",p:"Facebook",cat:"Gaming",f:"36K",v:"17K",e:"7.5%",r:"4.9",price:280000,t:["Gaming","Streamer"]},
{name:"Sari Kitchen",i:"SK",p:"YouTube",cat:"Food",f:"52K",v:"24K",e:"6.7%",r:"4.8",price:420000,t:["Food","Recipe"]},
{name:"Niko Living",i:"NL",p:"TikTok",cat:"Home & Living",f:"19K",v:"15K",e:"8.4%",r:"5.0",price:250000,t:["Home","DIY"]},
{name:"Tara Mom",i:"TM",p:"Instagram",cat:"Parenting",f:"33K",v:"16K",e:"7.8%",r:"4.9",price:325000,t:["Parenting","Family"]},
{name:"Fikri Fit",i:"FF",p:"TikTok",cat:"Lifestyle",f:"67K",v:"35K",e:"6.4%",r:"4.8",price:550000,t:["Wellness","Lifestyle"]}
];
const rp=n=>"Rp"+n.toLocaleString("id-ID");
function renderCreators(){
 const grid=document.querySelector("#creator-grid"); if(!grid)return;
 const q=(document.querySelector("#q")?.value||"").toLowerCase(), p=document.querySelector("#p")?.value||"", c=document.querySelector("#c")?.value||"", b=+(document.querySelector("#b")?.value||0);
 const list=creators.filter(x=>(!q||[x.name,x.p,x.cat,...x.t].join(" ").toLowerCase().includes(q))&&(!p||x.p===p)&&(!c||x.cat===c)&&(!b||x.price<=b));
 grid.innerHTML=list.map(x=>`<article class="creator-card"><div class="cover"><span>${x.p}</span></div><div class="creator-body"><div class="creator-head"><div class="avatar">${x.i}</div><div class="creator-name"><strong>${x.name} ✓</strong><small>${x.cat} · Indonesia</small></div></div><div class="metrics"><div class="metric"><strong>${x.f}</strong><small>Pengikut</small></div><div class="metric"><strong>${x.v}</strong><small>Rata-rata views</small></div><div class="metric"><strong>${x.e}</strong><small>Engagement</small></div></div><div class="tags">${x.t.map(t=>`<span class="tag">${t}</span>`).join("")}</div><div class="card-bottom"><div class="price"><small>Mulai dari</small><strong>${rp(x.price)}</strong></div><button class="btn btn-primary" onclick='book(${JSON.stringify(x)})'>Booking</button></div></div></article>`).join("")||"<p>Tidak ada creator yang cocok.</p>";
}
function book(x){modal(`<div class="eyebrow">BOOKING CREATOR</div><h2 style="margin:0 0 8px">${x.name}</h2><p style="color:#666">Pilih paket endorsement dan lanjutkan ke brief campaign.</p><div class="form"><select><option>TikTok Review — ${rp(x.price)}</option><option>TikTok + Facebook — ${rp(Math.round(x.price*1.5))}</option></select><input placeholder="Nama Brand"><input placeholder="Email bisnis"><textarea placeholder="Tujuan dan brief singkat campaign"></textarea><button class="btn btn-primary" onclick="closeModal();toast('Demo: booking berhasil dibuat.')">Lanjutkan Booking →</button></div>`)}
function modal(html){document.querySelector("#modal-content").innerHTML=html;document.querySelector("#modal").classList.add("show")}
function closeModal(){document.querySelector("#modal").classList.remove("show")}
function toast(s){const t=document.querySelector("#toast");t.textContent=s;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500)}

function loginModal(){
 modal(`<div class="eyebrow">ENDORSEHUB</div>
 <h2 style="margin:0 0 8px">Masuk ke EndorseHub</h2>
 <p style="color:#666">Masuk untuk mengelola campaign, booking, dan penghasilan.</p>
 <div class="form">
 <input placeholder="Email">
 <input type="password" placeholder="Password">
 <button class="btn btn-primary" onclick="closeModal();toast('Demo login berhasil.')">Masuk →</button>
 </div>
 <p style="margin-top:14px;font-size:10px">Belum punya akun? <a href="#" onclick="event.preventDefault();auth('brand')">Daftar gratis</a></p>`);
}

function auth(role){modal(`<div class="eyebrow">ENDORSEHUB</div><h2 style="margin:0 0 8px">${role==="creator"?"Daftar sebagai Creator":"Daftar sebagai Brand"}</h2><p style="color:#666">Buat akun gratis untuk mulai menggunakan EndorseHub.</p><div class="form"><input placeholder="Nama lengkap / nama brand"><input placeholder="Email"><input placeholder="Nomor WhatsApp"><button class="btn btn-primary" onclick="closeModal();toast('Demo: formulir pendaftaran siap dihubungkan ke backend.')">Buat Akun Gratis →</button></div>`)}
document.addEventListener("DOMContentLoaded",renderCreators);
