import subprocess
import sys, os

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

def predict():
	os.system('cd ../htk; ./HVite -C config -H hmm13/macros -H hmm13/hmmdefs -S test.scp -l * -i recout.mlf -w wdnet -p 0.0 -s 5.0 dict tiedlist')
	
	# read result
	