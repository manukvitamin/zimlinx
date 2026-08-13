let supabaseClient=null;

function initZimlinx(){
  if(window.supabase && window.ZIMLINX_SUPABASE_URL && window.ZIMLINX_SUPABASE_PUBLISHABLE_KEY){
    supabaseClient=window.supabase.createClient(window.ZIMLINX_SUPABASE_URL,window.ZIMLINX_SUPABASE_PUBLISHABLE_KEY);
  }
}

function useQuestion(text){
  const q=document.getElementById('question');
  if(q){q.value=text;q.focus();}
}
function clearQuestion(){
  const q=document.getElementById('question');
  if(q)q.value='';
  document.getElementById('result')?.classList.remove('show');
}

function setLoading(on){
  document.getElementById('loading')?.classList.toggle('show',on);
  const b=document.getElementById('askBtn');
  if(b){b.disabled=on;b.textContent=on?'Memproses…':'Tanya Zimlinx →';}
}

function showResult(text){
  const box=document.getElementById('result');
  const body=document.getElementById('resultBody');
  if(!box||!body)return;
  body.textContent=text;
  box.classList.add('show');
  box.scrollIntoView({behavior:'smooth',block:'nearest'});
}

async function ensureAnonymousSession(){
  if(!supabaseClient)return null;
  const existing=await supabaseClient.auth.getSession();
  if(existing.data?.session)return existing.data.session;
  const created=await supabaseClient.auth.signInAnonymously();
  if(created.error)throw created.error;
  return created.data.session;
}

async function askZimlinx(){
  const q=document.getElementById('question')?.value.trim();
  if(!q){showResult('Tulis dulu apa yang sedang kamu coba putuskan.');return;}
  if(q.length<5){showResult('Ceritakan sedikit lebih detail supaya Zimlinx bisa membantu.');return;}
  setLoading(true);
  try{
    const session=await ensureAnonymousSession();
    if(!session)throw new Error('Supabase belum terhubung.');
    const response=await supabaseClient.functions.invoke('zimlinx-ai',{body:{question:q}});
    if(response.error)throw response.error;
    const answer=response.data?.answer;
    if(!answer)throw new Error('AI tidak mengembalikan jawaban.');
    showResult(answer);
  }catch(err){
    console.error(err);
    showResult('Zimlinx belum selesai terhubung ke mesin AI. Koneksi database sudah disiapkan, tetapi fungsi AI server masih perlu dipasang dan diberi API key.');
  }finally{setLoading(false);}
}

document.addEventListener('DOMContentLoaded',initZimlinx);
