//import React from "react";
import "./Welcome.css";
import speech from "./../assets/speech.jpeg";
import texttospeech from "./../assets/texttospeech.png";
import convert from "./../assets/convert.png";
import emotion from "./../assets/emotion.gif";
//import { text } from "stream/consumers";
type IWelcomeProps = {};

export const Welcome: React.FC<IWelcomeProps> = () => {
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
                    <h2>Convert Me</h2>
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
