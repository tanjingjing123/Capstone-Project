from google.cloud import speech
import os
import io
import pyaudio
import wave

CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
RECORD_SECONDS = 10
WAVE_OUTPUT_FILENAME = "new5.wav"

p = pyaudio.PyAudio()

stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
print("🔴 recording started")

frames = []

for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
    data = stream.read(CHUNK)
    frames.append(data)

print("✅ Done recording ")

stream.stop_stream()
stream.close()
p.terminate()

wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
wf.setnchannels(CHANNELS)
wf.setsampwidth(p.get_sample_size(FORMAT))
wf.setframerate(RATE)
wf.writeframes(b''.join(frames))
wf.close()
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "/Users/hemanthharshinee/Downloads/speech-to-text.json"
client = speech.SpeechClient()

file_name = os.path.join(os.path.dirname(__file__), "new5.wav")

with io.open(file_name, "rb") as audio_file:
    content = audio_file.read()
    audio = speech.RecognitionAudio(content=content)

config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    audio_channel_count=1,
    language_code="en-US", enable_automatic_punctuation=True)

response = client.recognize(request={"config": config, "audio": audio})

print("The transcript:")
for result in response.results:
    print(result.alternatives[0].transcript)
