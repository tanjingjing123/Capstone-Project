//import React from "react";
import "./Welcome.css";
import speech from "./../assets/speech.jpeg";
import texttospeech from "./../assets/texttospeech.png";
import convert from "./../assets/convert.png";
import emotion from "./../assets/emotion.gif";
import React from "react";
import axios from "axios";
import FormData from "form-data";

//import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

type IWelcomeProps = {};

export const Welcome: React.FC<IWelcomeProps> = () => {
  const [speechInput, setSpeech] = React.useState<string>("");
  const [openModal, toggleModal] = React.useState<boolean>(false);
  const [openModalForVoiceNote, toggleModalForVoiceNote] =
    React.useState<boolean>(false);
  const [openModalForSpeech, toggleModalForSpeech] =
    React.useState<boolean>(false);
  const [output, setOutput] = React.useState<string>("");
  const [speechText, setSpeechText] = React.useState<boolean>(false);
  const [fileChosen, setFileChosen] = React.useState<any>();
  const [textFileChosen, setTextFileChosen] = React.useState<any>();
  const [convertedSpeech, setConvertedSpeech] = React.useState<any>();
  const [src, setSrc] = React.useState("");
  const handleModal = () => {
    toggleModal(!openModal);
  };

  const handleModalForVoiceNote = () => {
    toggleModalForVoiceNote(!openModalForVoiceNote);
  };

  const handleModalForSpeech = () => {
    toggleModalForSpeech(!openModalForSpeech);
  };

  const handleClose = () => {
    toggleModal(false);
  };

  const handleCloseForVoiceNote = () => {
    toggleModalForVoiceNote(false);
  };

  const handleCloseForSpeech = () => {
    toggleModalForSpeech(false);
  };

  const setTranslatedText = () => {
    axios
      .get("http://localhost:8020/translate_text", {
        params: {
          word: speechInput,
          language: "chinese", // TODO: need to support for english and chinese languages
        },
      })
      .then((data) => {
        setOutput(data.data);
      });
  };

  const changeFile = (e: any) => {
    const files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    setFileChosen(filesArr);
  };

  const changeText = (e: any) => {
    const files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    setTextFileChosen(filesArr);
  };

  function handleClick() {
    let formData = new FormData();
    formData.append("inputFile", textFileChosen[0], textFileChosen[0].name);
    axios({
      url: "http://localhost:8020/Text_to_speech",
      method: "post",
      responseType: "blob",
      headers: { Accept: "*/*", "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then((res) => {
        setSrc(URL.createObjectURL(res.data));
      })
      .catch((error) => {
        console.log("axios error:", error);
      });
  }

  React.useEffect(() => {
    if (fileChosen?.length > 0) {
      let formData = new FormData();
      formData.append("inputFile", fileChosen[0], fileChosen[0].name);
      axios({
        method: "post",
        url: "http://localhost:8020/Speech_to_text",
        headers: { Accept: "*/*", "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((data) => setConvertedSpeech(data.data));
    }
  }, [fileChosen]);

  return (
    <>
      <div className="gallery__body">
        <div className="maincard">
          <section>
            <div className="card">
              <div className="box">
                <div className="imgBx">
                  <img src={speech} alt="speech" />
                </div>
                <div className="contentBx">
                  <div>
                    <h2 onClick={handleModalForVoiceNote}>Voice Notepad</h2>
                    <Modal
                      open={openModalForVoiceNote}
                      onClose={handleCloseForVoiceNote}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="speechClass">
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          <h1>Speech to Text</h1>
                        </Typography>
                        <div id="speechContainer">
                          {/* <h3>Upload new File</h3> */}
                          <input
                            type="file"
                            name="file"
                            onChange={changeFile}
                          />

                          <br />
                          <input
                            type="submit"
                            id="submitButton"
                            value="Transcribe"
                            onClick={() => setSpeechText(true)}
                          />
                        </div>
                        {speechText && convertedSpeech?.length > 0 && (
                          <div>{convertedSpeech}</div>
                        )}
                      </Box>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="imgBx">
                  <img src={texttospeech} alt="speech" />
                </div>
                <div className="contentBx">
                  <div>
                    <h2 onClick={handleModalForSpeech}>Speechify</h2>
                    <Modal
                      open={openModalForSpeech}
                      onClose={handleCloseForSpeech}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="speechClass">
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          <h1>Text to Speech</h1>
                        </Typography>
                        <div id="speechContainer">
                          <input
                            type="file"
                            name="file"
                            onChange={changeText}
                          />
                          {textFileChosen && textFileChosen?.length > 0 && (
                            <button onClick={handleClick}>Play</button>
                          )}
                          <div>
                            {textFileChosen && textFileChosen?.length > 0 && (
                              <audio id="audio" controls src={src} autoPlay />
                            )}
                          </div>
                          <br />
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="imgBx">
                  <img src={convert} alt="speech" />
                </div>
                <div className="contentBx">
                  <div>
                    <h2 onClick={handleModal} className="hoverClass">
                      Convert Me
                    </h2>
                    {/* Popup */}
                    <Modal
                      open={openModal}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="speechClass">
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Enter a text to translate
                        </Typography>
                        <input
                          name="text"
                          type="text"
                          value={speechInput}
                          onChange={(e) => setSpeech(e.target.value)}
                        />
                        <Button onClick={setTranslatedText}>Translate</Button>
                        <br></br>
                        <input name="text" type="text" value={output} />
                      </Box>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="imgBx">
                  <img src={emotion} alt="speech" />
                </div>
                <div className="contentBx">
                  <div>
                    <h2>Emotion Detection</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
