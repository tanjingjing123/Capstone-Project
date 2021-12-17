import pandas as pd
import librosa
import numpy as np
import keras
from keras.models import model_from_json

def speech_to_emotion(file):
	X, sample_rate = librosa.load(file, res_type='kaiser_fast',duration=2.5,sr=22050*2,offset=0.5)
	sample_rate = np.array(sample_rate)
	mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13),axis=0)
	featurelive = mfccs
	livedf2 = featurelive
	livedf2= pd.DataFrame(data=livedf2)
	livedf2 = livedf2.stack().to_frame().T
	twodim= np.expand_dims(livedf2, axis=2)
	opt = keras.optimizers.rmsprop(lr=0.00001, decay=1e-6)

	json_file = open('model.json', 'r')
	loaded_model_json = json_file.read()
	json_file.close()
	loaded_model = model_from_json(loaded_model_json)

	loaded_model.load_weights("model3.h5")
	print("Loaded model from disk")
	loaded_model.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['accuracy'])
	livepreds = loaded_model.predict(twodim, batch_size=32,verbose=1)
	livepreds1=livepreds.argmax(axis=1)
	liveabc = livepreds1.astype(int).flatten()
	pred_to_class = {
		0: "female_angry",
		1: "female_calm",
		2: "female_fearful",
		3: "female_happy",
		4: "female_sad",
		5: "male_angry",
		6: "male_calm",
		7: "male_fearful",
		8: "male_happy",
		9: "male_sad"
	}
	return pred_to_class[liveabc.item()]
