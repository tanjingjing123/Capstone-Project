//import React from "react";
import "./Welcome.css";
import speech from "./../assets/speech.jpeg";
import texttospeech from "./../assets/texttospeech.png";
import convert from "./../assets/convert.png";
import emotion from "./../assets/emotion.gif";
import React from "react";
import axios from "axios";
//import { Modal } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";
//import { text } from "stream/consumers";
type IWelcomeProps = {};

export const Welcome: React.FC<IWelcomeProps> = () => {
  const [speechInput,setSpeech] = React.useState<string>("");
  const [openModal, toggleModal] = React.useState<boolean>(false);
  const [output, setOutput] = React.useState<string>("")
  React.useEffect(()=>{
    if(speechInput.length>0){
      axios.get('http://localhost:5000/convert_ch_to_en', {
        params: {
          "word":speechInput
        }
      }).then(data=>{
        console.log("Data here",data)
        //setOutput(data)
      })
    }
  },[speechInput])

  

  const handleModal = () =>{
    toggleModal(!openModal)
  }

  const handleClose =() =>{
    toggleModal(false);
  }
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
                   <h2>Voice Notepad</h2>
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
                    <h2>Speechify</h2>
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

                    <h2 onClick={handleModal} className="hoverClass">Convert Me</h2>
                    {/* Popup */}
                    <Modal
  open={openModal}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box className="speechClass">
<Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a model
          </Typography>
<input
                    name="text"
                      type="text"
                      value={speechInput}
                      onChange={e=>setSpeech(e.target.value)}
                    />

                    
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
