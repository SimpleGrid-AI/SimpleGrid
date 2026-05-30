import os,re,json,glob,sys
from bs4 import BeautifulSoup

TOOLS=sorted(glob.glob('tools/*/index.html'))
TOOLS=[t for t in TOOLS if t!='tools/index.html']

def tool_meta(soup):
    title=soup.title.get_text().strip() if soup.title else ''
    short=re.split(r'\s*[|\-–]\s*',title)[0].strip()  # before first | or dash
    md=soup.find('meta',attrs={'name':'description'})
    desc=md['content'].strip() if md and md.get('content') else ''
    h1=soup.find('h1').get_text(' ',strip=True) if soup.find('h1') else short
    return short,desc,h1

def input_labels(soup):
    labs=[]
    for lab in soup.select('label'):
        t=lab.get_text(' ',strip=True)
        # drop the radio "1 - Critical gap" style option labels (scorecards)
        if not t: continue
        if re.match(r'^\d+\s*[-–]\s', t): continue
        if t.lower().startswith(('yes','no ','1 -','2 -','3 -','4 -','5 -')): continue
        labs.append(t)
    # de-dup preserving order
    seen=set(); out=[]
    for l in labs:
        k=l.lower()
        if k in seen: continue
        seen.add(k); out.append(l)
    return out

def page_text(soup):
    return soup.get_text(' ',strip=True).lower()

def build_howto(slug,soup):
    short,desc,h1=tool_meta(soup)
    txt=page_text(soup)
    labs=input_labels(soup)
    is_score = any(k in slug for k in ['readiness','assessment','scorecard','health-score','maturity','checklist','concentration','kpi-benchmark','revenue-per-employee'])
    is_gen = any(k in slug for k in ['generator','template','schedule','bill-of-materials','invoice','quote','purchase-order'])
    has_pdf = 'pdf' in txt
    has_csv = 'csv' in txt
    # Step 1 - enter / answer (tool-specific via real labels)
    if is_score:
        s1name="Answer the questions"
        sample=labs[:4]
        s1text=("Work through each question about your operation" + (": " + "; ".join(sample) + "." if sample else "."))
    else:
        s1name="Enter your numbers"
        sample=labs[:5]
        s1text=("Fill in your figures" + (": " + "; ".join(sample) + "." if sample else " for your operation."))
    # Step 2 - result (tool-specific via description)
    s2name="Get your result instantly"
    s2text=(desc if desc else ("See your "+short+" calculated in the browser."))
    s2text=s2text.strip()
    # Step 3 - export / next
    exp=[]
    if has_pdf: exp.append("PDF")
    if has_csv: exp.append("CSV")
    if exp:
        s3name="Export or take it further"
        s3text="Download the result as "+ " or ".join(exp) + ", or book a demo to see SimpleGrid track this automatically from your live operation."
    else:
        s3name="Take it further"
        s3text="Use the result in your planning, or book a demo to see SimpleGrid track this automatically from your live operation."
    url="https://simplegrid.ai/tools/%s/"%slug
    howto={
        "@type":"HowTo",
        "name":"How to use the "+short,
        "description":(desc if desc else short)[:300],
        "step":[
            {"@type":"HowToStep","position":1,"name":s1name,"text":s1text[:340],"url":url+"#tool"},
            {"@type":"HowToStep","position":2,"name":s2name,"text":s2text[:340],"url":url+"#result"},
            {"@type":"HowToStep","position":3,"name":s3name,"text":s3text[:340],"url":url+"#next"},
        ]
    }
    return howto

def process(path, write=True):
    slug=path.split('/')[1]
    html=open(path,encoding='utf-8').read()
    soup=BeautifulSoup(html,'html.parser')
    # find first ld+json with @graph
    blocks=soup.find_all('script',type='application/ld+json')
    target=None
    for b in blocks:
        try: data=json.loads(b.string)
        except: continue
        if isinstance(data,dict) and '@graph' in data:
            target=b; gdata=data; break
    if not target:
        return 'NO-GRAPH'
    types=[n.get('@type') for n in gdata['@graph'] if isinstance(n,dict)]
    if 'HowTo' in types:
        return 'ALREADY'
    howto=build_howto(slug,soup)
    # insert after SoftwareApplication (index 0 typically), keep BreadcrumbList last
    g=gdata['@graph']
    insert_at=1
    for i,n in enumerate(g):
        if isinstance(n,dict) and n.get('@type')=='SoftwareApplication': insert_at=i+1
    g.insert(insert_at,howto)
    new_json=json.dumps(gdata,ensure_ascii=False,separators=(',',':'))
    # replace the script block's content in raw html (match the exact original string)
    orig=target.string
    if orig not in html:
        return 'STRING-MISS'
    html2=html.replace(orig, '\n'+new_json+'\n',1)
    if write:
        open(path,'w',encoding='utf-8').write(html2)
    return 'OK'

if __name__=='__main__':
    only=sys.argv[1] if len(sys.argv)>1 else None
    n=0
    for t in TOOLS:
        if only and only not in t: continue
        r=process(t, write=(only is None or only=='ALL'))
        if only and only!='ALL':
            # dry preview
            slug=t.split('/')[1]
            soup=BeautifulSoup(open(t).read(),'html.parser')
            print('PREVIEW',t); print(json.dumps(build_howto(slug,soup),ensure_ascii=False,indent=2)); 
        else:
            print(r,t); 
        n+=1
