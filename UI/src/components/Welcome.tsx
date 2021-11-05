//import React from "react";
import "./Welcome.css";
import speech from "./../assets/speech.jpeg";
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
                   
                   <div>Text to Speech</div>
                   <div>Text to Speech</div>
                  </div>
                  
                </div>
                
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="imgBx">
                <img src={speech} alt="speech" />
                </div>
                <div className="contentBx">
                  <div>
                    <h2>Speech to text </h2>
                    <h2>Speech to text </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="imgBx">
                </div>
                <div className="contentBx">
                  <div>
                    <h2>PRICE_TRACKER</h2>
                    <a href="https://github.com/sindhuriguntur-1996/amazon-price-tracker">
                      <p className="project__details">Git-link</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="imgBx">
                </div>
                <div className="contentBx">
                  <div>
                    <h2>ZOOM-CLONE</h2>
                    <a href="https://github.com/sindhuriguntur-1996/zoom-clone">
                      <p className="project__details">Git-link</p>
                    </a>
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
