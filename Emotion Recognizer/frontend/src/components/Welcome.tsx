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
import Zoom  from '@mui/material/Zoom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@material-ui/core";
import LoopIcon from '@mui/icons-material/Loop';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Paper from "@material-ui/core/Paper";
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
  const [loader, setLoader] = React.useState<boolean>(false);
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

  React.useEffect(()=>{
    if(textFileChosen?.length>0){
      handleClick()
    }
  },[textFileChosen])

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
        <h1 style={{textAlign:"center", fontSize:"50px", color:"#4169e1"}}>Emotion Recognizer</h1>
        <div className="maincard">
          <section>
            <div className="card">
              <div className="box">
                <div className="imgBx">
                  <img src={speech} alt="speech" />
                </div>
                <div className="contentBx">
                  <div>
                    <h2 onClick={handleModalForVoiceNote} style={{cursor:"pointer"}}>Textify</h2>
                    <Modal
                      open={openModalForVoiceNote}
                      onClose={handleCloseForVoiceNote}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      
                      <Box className="speechClass">
                        
                      {/* <IconButton aria-label="Close" className="closeButton" onClick={handleCloseForVoiceNote}>
                      
          <CloseIcon />
          
        </IconButton> */}
        
        
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          <h3 style={{textAlign:"center", color:"#4169e1", paddingTop:"10px"}} >Speech to Text</h3>
                          
                          <hr style={{width:"50%",marginLeft:"25%",marginRight:"25%"}}/>
                        </Typography>
                        <div className="inputClass">
                          {/* <h3>Upload new File</h3> */}
                          <div style={{display:"flex", justifyContent: "space-around",  width:"115%"}}>
                          <label htmlFor="file-upload" className="custom-file-upload">
    <i ><CloudUploadIcon/></i> <span style={{color:"white", textAlign:"center", fontWeight:"bold", paddingLeft:"5px"}}>Upload sound files</span>
</label>
            
                          <input
                          id="file-upload"
                            type="file"
                            name="file"
                            onChange={changeFile}
                            
                          />
                  <span style={{paddingLeft:"5px", paddingTop:"2%"}}>{fileChosen?.length>0 && <DoneOutlineIcon/>}</span>
                  </div>
        <div>
                          <label htmlFor="transcribeInput" className="transcribe">
    <i ><GTranslateIcon/></i> <span style={{color:"white", textAlign:"center", paddingLeft:"25px", fontWeight:"bold", paddingTop:"2%", paddingBottom:"2%", lineHeight:"20px"}}>Transcribe</span>
</label>


                          <input
                            className="transcribe"
                            type="submit"
                            id="transcribeInput"
                            value="Transcribe"
                            onClick={() => setSpeechText(true)}
                            
                          />
                         
                        
                        </div>
                        {speechText && convertedSpeech?.length > 0 && (
                          
                          <div style={{top:"300%", position:"absolute"}}>{convertedSpeech}</div>
                          
                        )}
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
                        <label htmlFor="text-upload" className="custom-file-upload">
    <i ><CloudUploadIcon/></i> <span style={{color:"white", textAlign:"center", fontWeight:"bold", paddingLeft:"5px"}}>Upload Text files</span>
</label>
                          <input
                          id="text-upload"
                            type="file"
                            name="file"
                            onChange={changeText}
                          />
                          <div>
                            {textFileChosen && textFileChosen?.length > 0 && (
                              <audio id="audio" controls src={src} />
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
                      Translate
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
