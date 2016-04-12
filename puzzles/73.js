r=readline
a=Math.abs
n=+r()
print(r().split(' ').reduce((p,c)=>c==-1*p?a(c):a(c)<a(p)?c:p,n?5527:0))
