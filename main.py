import numpy as np
import subprocess


fname = "recout.mlf"
with open(fname) as f:
    content = f.readlines()
content = [x.strip() for x in content] 
content = content[3:-2]

perintah = ""
for s in content:
  tamp = ' '.join(s.split(' ')[2:-1])
  perintah += tamp + ' '

perintah = perintah[:-1]
print(perintah)

subprocess.call(['./'])