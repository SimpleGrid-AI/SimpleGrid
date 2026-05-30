import glob,re,html as ihtml
from bs4 import BeautifulSoup

SHIPPED=[p for p in glob.glob('**/*.html',recursive=True)
         if not p.startswith(('node_modules/','.node/','assets/')) and p!='post.html']

def esc(s): return ihtml.escape(s,quote=True)

# ---- T1.5: twitter tags on pages missing twitter:card ----
tw_added=[]
for p in SHIPPED:
    raw=open(p,encoding='utf-8').read()
    if 'twitter:card' in raw: continue
    soup=BeautifulSoup(raw,'html.parser')
    def m(name=None,prop=None):
        x=soup.find('meta',attrs={'name':name}) if name else soup.find('meta',attrs={'property':prop})
        return x['content'].strip() if x and x.get('content') else ''
    title=m(prop='og:title') or (soup.title.get_text().strip() if soup.title else '')
    desc=m(prop='og:description') or m(name='description')
    if not title: continue
    block=('<meta name="twitter:card" content="summary_large_image">\n'
           '<meta name="twitter:site" content="@simplegridai">\n'
           '<meta name="twitter:title" content="%s">\n'
           '<meta name="twitter:description" content="%s">\n'
           '<meta name="twitter:image" content="https://simplegrid.ai/assets/og-card.jpg">\n')%(esc(title),esc(desc))
    if '</head>' in raw:
        raw=raw.replace('</head>', block+'</head>',1)
        open(p,'w',encoding='utf-8').write(raw); tw_added.append(p)

# ---- T1.6a: SRI on 18 blog loaders ----
OLD="s.src = src; s.async = false; s.onload = cb; document.head.appendChild(s);"
NEW=("s.src = src; s.async = false; "
     "var SRI={'https://unpkg.com/react@18.3.1/umd/react.production.min.js':'sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z',"
     "'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js':'sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1'};"
     "if(SRI[src]){s.integrity=SRI[src];s.crossOrigin='anonymous';} "
     "s.onload = cb; document.head.appendChild(s);")
sri=[]
for p in glob.glob('blog/*/index.html'):
    raw=open(p,encoding='utf-8').read()
    if OLD in raw and 's.integrity' not in raw:
        open(p,'w',encoding='utf-8').write(raw.replace(OLD,NEW,1)); sri.append(p)

# ---- T1.6b: strip dead clarity.ms from CSP everywhere ----
cl=[]
for p in SHIPPED:
    raw=open(p,encoding='utf-8').read()
    if 'clarity.ms' not in raw: continue
    new=raw.replace(' https://www.clarity.ms','').replace(' https://*.clarity.ms','')
    if new!=raw:
        open(p,'w',encoding='utf-8').write(new); cl.append(p)

print('twitter tags added:',len(tw_added))
print('SRI loaders patched:',len(sri))
print('clarity.ms stripped from:',len(cl),'pages')
