export default async (req) => {
  if (req.method !== 'POST') return Response.json({error:'POST required'}, {status:405});
  const key = process.env.BRAVE_SEARCH_API_KEY;
  if (!key) return Response.json({error:'Set BRAVE_SEARCH_API_KEY in Netlify environment variables.'},{status:500});
  let body; try {body=await req.json()} catch {return Response.json({error:'Invalid JSON'},{status:400})}
  const term=String(body.query||'Family First Life insurance agent').slice(0,120);
  const count=Math.min(20,Math.max(1,Number(body.count)||10));
  const q=`site:instagram.com/ ${term}`;
  const u=new URL('https://api.search.brave.com/res/v1/web/search');
  u.searchParams.set('q',q);u.searchParams.set('count',String(count));
  try {
    const r=await fetch(u,{headers:{'X-Subscription-Token':key,'Accept':'application/json'}});
    if(!r.ok) return Response.json({error:`Search provider returned ${r.status}. Check API key, quota, and plan.`},{status:502});
    const data=await r.json();
    const results=(data.web?.results||[]).filter(x=>/^https?:\/\/(www\.)?instagram\.com\//i.test(x.url||'')).map(x=>{
      const url=new URL(x.url);const username=url.pathname.split('/').filter(Boolean)[0]||'';
      const valid=/^[A-Za-z0-9._]{1,30}$/.test(username)&&!['p','reel','explore','stories','accounts'].includes(username);
      return valid?{username,name:x.title||'',instagram:`https://www.instagram.com/${username}/`,snippet:x.description||'',email:'',phone:'',agency:'',location:'',website:'',status:'Needs verification',source:x.url}:null;
    }).filter(Boolean);
    return Response.json({results,query:q});
  } catch {return Response.json({error:'Search request failed'},{status:502})}
};
