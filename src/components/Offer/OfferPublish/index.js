import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Dropzone from "react-dropzone";
import Loader from "react-loader-spinner";
import InputText from "../../Share/Input/InputText";
import InputTextArea from "../../Share/Input/InputTextArea";
import "./index.css";

const OfferPublish = ({ modal, setModal, token }) => {
  const [pictures, setPictures] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [position, setPosition] = useState("");
  const [price, setPrice] = useState("");
  const [acceptExchange, setAcceptExchange] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isPublishing) {
      alert("Une mise à jour est déjà encours");
      return;
    }
    if (!Number(price)) {
      alert(
        "Le prix saisi n'est pas un nombre. Vérifiez la valeur et/ou le format (00.00)."
      );
      return;
    }
    if (pictures.length < 1) {
      alert("Vous devez définir au moins une image.");
      return;
    }
    setIsPublishing(true);
    try {
      const url = Cookies.get("BackUrl") + "offer/publish";

      const formData = new FormData();
      formData.append("title", title ? title : "");
      formData.append("description", description ? description : "");
      formData.append("price", price ? price : "");
      formData.append("condition", state ? state : "");
      formData.append("city", position ? position : "");
      formData.append("brand", brand ? brand : "");
      formData.append("size", size ? size : "");
      formData.append("color", color ? color : "");
      for (let i = 1; i <= pictures.length; i++) {
        formData.append("picture" + i, pictures[i - 1]);
      }

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data", //peut être nécessaire sur certains serveurs (express le reconnait)
        },
      });
      if (response.data.product_name === title) {
        alert("Félicitation ! Votre anonce a été créée avec succès.");
      } else {
        alert("Une erreur a bloqué la création de votre anonce.");
      }
      setIsPublishing(false);
      history.push("/");
    } catch (error) {
      setIsPublishing(false);
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(
          "La publication de l'annonce est impossible pour la raison suivante : \n\n" +
            error.response.data.message
        );
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        alert(
          "La publication de l'annonce est impossible pour la raison suivante : \n\n" +
            error.response.data.error.message
        );
      } else {
        alert("Une erreur bloque la publication de l'annonce");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      setModal("Login");
    }
  }, [modal, setModal, token]);

  return modal ? (
    <></>
  ) : (
    <div className="offer-publish">
      <div className="wrapper">
        <h2>Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="offer-publish-databloc-pictures">
            <div>
              <div className="offer-publish-picture-dropzone">
                <Dropzone
                  accept="image/*"
                  onDrop={(selectedFiles) => {
                    const newTab = [...pictures];
                    let count = newTab.length;
                    selectedFiles.forEach((file) => {
                      if (count < 5) {
                        newTab.push(file);
                        count++;
                      }
                    });
                    setPictures(newTab);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="offer-publish-picture-dropzone-container">
                      <div
                        {...getRootProps({
                          className: "offer-publish-picture-dropzone-dropzone",
                        })}
                      >
                        <input {...getInputProps()} />
                        <p>
                          Déplacez vos images ici, ou cliquez pour en
                          sélectionner (maximum 5)
                        </p>
                      </div>
                      <aside className="offer-publish-picture-dropzone-thumbContainer">
                        <div className="offer-publish-picture-dropzone-thumb">
                          {pictures.map((file, index) => {
                            return (
                              <div
                                className="offer-publish-picture-dropzone-thumbInner"
                                key={index}
                              >
                                <img
                                  src={URL.createObjectURL(file)}
                                  className="offer-publish-picture-dropzone-img"
                                  alt={file.name}
                                />
                                <div
                                  onClick={() => {
                                    const newTab = [...pictures];
                                    newTab.splice(index, 1);
                                    setPictures(newTab);
                                  }}
                                >
                                  X
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </aside>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>
          <div className="offer-publish-databloc">
            <InputText
              label="Titre"
              placeholder="ex: Chemise Sézanne verte"
              withBottomBorder={true}
              value={title}
              setValue={setTitle}
            />
            <InputTextArea
              label="Décris ton article"
              placeholder="ex: porté quelquefois, taille correctement"
              withBottomBorder={false}
              value={description}
              setValue={setDescription}
            />
          </div>
          <div className="offer-publish-databloc">
            <InputText
              label="Marque"
              placeholder="ex: Zara"
              withBottomBorder={true}
              value={brand}
              setValue={setBrand}
            />
            <InputText
              label="Taille"
              placeholder="ex: L / 40 / 12 "
              withBottomBorder={true}
              value={size}
              setValue={setSize}
            />
            <InputText
              label="Couleur"
              placeholder="ex: Fushia"
              withBottomBorder={true}
              value={color}
              setValue={setColor}
            />
            <InputText
              label="Etat"
              placeholder="ex: Neuf avec étaiquette"
              withBottomBorder={true}
              value={state}
              setValue={setState}
            />
            <InputText
              label="Lieu"
              placeholder="ex: Paris"
              withBottomBorder={false}
              value={position}
              setValue={setPosition}
            />
          </div>
          <div className="offer-publish-databloc">
            <InputText
              label="Prix"
              placeholder="0.00 €"
              withBottomBorder={false}
              value={price}
              setValue={setPrice}
            />
            <div className="offer-publish-acceptExchange">
              <input
                id="acceptExchange"
                type="checkbox"
                value={acceptExchange}
                onChange={(e) => {
                  setAcceptExchange(e.target.checked);
                }}
              />
              <label htmlFor={"acceptExchange"}></label>
              <span>Je suis intéressé(e) par les échanges</span>
            </div>
          </div>
          <div className="offer-publish-submit">
            {isPublishing ? (
              <Loader
                type="BallTriangle"
                color="#09b1ba"
                height={80}
                width={80}
              />
            ) : (
              <button type="submit">Ajouter</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferPublish;
