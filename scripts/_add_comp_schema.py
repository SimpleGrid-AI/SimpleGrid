import json,re,glob
from bs4 import BeautifulSoup

def get(path):
    return open(path,encoding='utf-8').read()
def put(path,s):
    open(path,'w',encoding='utf-8').write(s)

def head_inject(html, block, marker='</head>'):
    if 'application/ld+json' in html and '"@graph"' in html:
        return html, 'HAS-GRAPH'
    tag='<script type="application/ld+json">\n'+json.dumps(block,ensure_ascii=False,separators=(",",":"))+'\n</script>\n'
    return html.replace(marker, tag+marker, 1), 'OK'

def meta(soup,name=None,prop=None):
    if name: m=soup.find('meta',attrs={'name':name})
    else: m=soup.find('meta',attrs={'property':prop})
    return m['content'].strip() if m and m.get('content') else ''

ORG={"@id":"https://simplegrid.ai/#org"}
WEBSITE={"@id":"https://simplegrid.ai/#website"}

results={}
# 8 competitor pages
for f in sorted(glob.glob('competitors/*/index.html')):
    soup=BeautifulSoup(get(f),'html.parser')
    title=soup.title.get_text().strip()
    canon=soup.find('link',rel='canonical')['href']
    desc=meta(soup,name='description')
    crumb=re.split(r'\s*\|\s*',title)[0].strip()  # "SimpleGrid vs NetSuite"
    graph={"@context":"https://schema.org","@graph":[
        {"@type":"WebPage","@id":canon+"#webpage","url":canon,"name":title,"description":desc,
         "isPartOf":WEBSITE,"about":ORG,"inLanguage":"en-US","publisher":ORG},
        {"@type":"BreadcrumbList","itemListElement":[
            {"@type":"ListItem","position":1,"name":"Home","item":"https://simplegrid.ai/"},
            {"@type":"ListItem","position":2,"name":"SimpleGrid vs Other ERPs","item":"https://simplegrid.ai/competitors.html"},
            {"@type":"ListItem","position":3,"name":crumb,"item":canon}]}
    ]}
    html2,st=head_inject(get(f),graph)
    if st=='OK': put(f,html2)
    results[f]=st
# competitors hub
f='competitors.html'
soup=BeautifulSoup(get(f),'html.parser')
title=soup.title.get_text().strip(); canon=soup.find('link',rel='canonical')['href']; desc=meta(soup,name='description')
graph={"@context":"https://schema.org","@graph":[
    {"@type":"CollectionPage","@id":canon+"#webpage","url":canon,"name":title,"description":desc,
     "isPartOf":WEBSITE,"about":ORG,"inLanguage":"en-US","publisher":ORG},
    {"@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":1,"name":"Home","item":"https://simplegrid.ai/"},
        {"@type":"ListItem","position":2,"name":"SimpleGrid vs Other ERPs","item":canon}]}
]}
html2,st=head_inject(get(f),graph); 
if st=='OK': put(f,html2)
results[f]=st
# furniture-erp
f='furniture-erp/index.html'
soup=BeautifulSoup(get(f),'html.parser')
title=soup.title.get_text().strip(); canon=soup.find('link',rel='canonical')['href']; desc=meta(soup,name='description')
graph={"@context":"https://schema.org","@graph":[
    {"@type":"WebPage","@id":canon+"#webpage","url":canon,"name":title,"description":desc,
     "isPartOf":WEBSITE,"about":ORG,"inLanguage":"en-US","publisher":ORG},
    {"@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":1,"name":"Home","item":"https://simplegrid.ai/"},
        {"@type":"ListItem","position":2,"name":"Furniture ERP","item":canon}]}
]}
html=get(f)
html2,st=head_inject(html,graph)
# add og:image to furniture if missing (insert after twitter:card or canonical)
if 'og:image' not in html2:
    og='  <meta property="og:image" content="https://simplegrid.ai/assets/og-card.jpg">\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">\n'
    html2=html2.replace('</head>', og+'</head>',1)
if st=='OK': put(f,html2)
results[f]=st+('+og' if 'og:image' in html2 else '')

for k,v in results.items(): print(v,k)
