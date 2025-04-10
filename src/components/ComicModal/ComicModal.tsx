import React from "react";
import { Comic } from "../../types/types";
import styles from "./ComicModal.module.css";

type ComicModalProps = {
  comic: Comic;
  onClose: () => void;
};

const ComicModal = ({ comic, onClose }: ComicModalProps) => {
  const thumbnail = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.ModalWrapper}>
        <button className={styles.CloseButton} onClick={onClose}>
          X
        </button>
        <div className={styles.ModalCover}>
          <div className={styles.ModalCoverOverlay}></div>
          <img src={thumbnail} alt={comic.title} />
        </div>
        <div className={styles.ModalContent}>
          <p className={styles.RowInfo}>
            <strong>Title:</strong> {comic.title}
          </p>
          <p className={styles.RowInfo}>
            <strong>Release Date:</strong>{" "}
            {comic.dates.find((d) => d.type === "focDate")?.date || "N/A"}
          </p>
          <p className={styles.RowInfo}>
            <strong>Format:</strong> {comic.format || "N/A"}
          </p>
          <p className={styles.RowInfo}>
            <strong>Pages:</strong> {comic.pageCount || "N/A"}
          </p>
          {comic.characters.items.length > 0 && (
            <div className={styles.ListWrapper}>
              <strong>Characters:</strong>
              <ul className={styles.List}>
                {comic.characters.items.map((char, idx) => (
                  <li key={idx}>{char.name}</li>
                ))}
              </ul>
            </div>
          )}
          {comic.creators.items.length > 0 && (
            <div className={styles.ListWrapper}>
              <strong>Creators:</strong>
              <ul className={styles.List}>
                {comic.creators.items.map((creator, idx) => (
                  <li key={idx}>
                    {creator.name} – {creator.role}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className={styles.RowInfo}>
            <strong>Diamond Code:</strong> {comic.diamondCode || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComicModal;
