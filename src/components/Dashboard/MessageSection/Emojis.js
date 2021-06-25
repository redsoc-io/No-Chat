import { GoSmiley } from "react-icons/go";
import { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { AnimatePresence, motion } from "framer-motion";

export default function Emojis(props) {
  const [pickerActive, setPickerActive] = useState(false);
  const addEmoji = ({ native }) => {
    props.addEmoji(native);
  };
  return (
    <div className="position-relative">
      <button
        className={`btn rounded-pill p-0 d-flex justify-content-center align-items-center ${
          !pickerActive ? "btn-light text-muted" : "btn-light text-primary"
        } fs-4`}
        type="button"
        style={{ height: 40, width: 40 }}
        onClick={() => setPickerActive(!pickerActive)}
      >
        <div className="container p-0 d-flex justify-content-center align-items-center">
          <GoSmiley />
        </div>
      </button>
      <div
        className={`shadow-sm position-absolute emojis-holder ${
          pickerActive ? "show" : "hide"
        }`}
      >
        <Picker onSelect={addEmoji} native />
      </div>
    </div>
  );
}
