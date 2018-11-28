from subprocess import call
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
	return perintah

def predict():
	# os.system("cd ../htk; ./HCopy -C config -S hcopy-test.scp; ./HVite -C config1 -H hmm12/macros -H hmm12/hmmdefs -S test-wav.scp -l '*' -i recout-wav.mlf -w wdnet -p 0.0 -s 5.0 dict triphones1; ./HResults -I testref.mlf triphones1 recout-wav.mlf")
	# os.system("cd ../htk; ./HCopy -C config -S hcopy-test.scp")
	# os.system("sudo su; cd ../htk; ./HVite -C config1 -H hmm12/macros -H hmm12/hmmdefs -S test-wav.scp -l '*' -i recout-wav.mlf -w wdnet -p 0.0 -s 5.0 dict triphones1")
	# os.system("cd ../htk; ./HResults -I testref.mlf triphones1 recout-wav.mlf")
	call("(cd htk/ && ./HCopy -C config -S hcopy-test.scp && ./HVite -C config1 -H hmm12/macros -H hmm12/hmmdefs -S test-wav.scp -l '*' -i recout-wav.mlf -w wdnet -p 0.0 -s 5.0 dict triphones1)", shell=True)
	# call("./htk/scripttest_2", shell=True)

	result = read_from_file('htk/recout-wav.mlf')

	return result