import numpy as np
import subprocess

def read_from_file(filename):
	"""
	Assumption
	- just 1 file
	"""
	with open(filename) as f:
		content = f.readlines()

	content = [x.strip() for x in content][3:-2]

	perintah = ""
	for s in content:
	  tamp = ' '.join(s.split(' ')[2:-1])
	  perintah += tamp + ' '

	perintah = perintah[:-1] # remove last space
	print(perintah)


################################################
##########        MAIN PROGRAM        ##########
################################################

subprocess.call(['./'])