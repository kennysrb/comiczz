import { Comic } from "../../types/types";
import styles from "./ComicModal.module.css";
import ComicDetailList from "./components/List/List";
import RowInfo from "./components/RowInfo/RowInfo";
import { useEffect } from "react";
import closeIcon from "../../assets/icons/closeIcon.png";
import Button from "../Button/Button";
import { getLowestPrice, getYearFromDateString } from "../../utils/helpers";

type ComicModalProps = {
  comic: Comic;
  onClose: () => void;
};

const ComicModal = ({ comic, onClose }: ComicModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const price = getLowestPrice(comic.prices);

  const thumbnail = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.ModalWrapper} onClick={(e) => e.stopPropagation()}>
        <img
          className={styles.CloseIcon}
          src={closeIcon}
          alt={"close"}
          onClick={onClose}
        />
        <div className={styles.ModalCover}>
          <img src={thumbnail} alt={comic.title} />
        </div>
        <div className={styles.ModalContent}>
          <div className={styles.TitleWrapper}>
            <p className={styles.Title}>{comic.title}</p>
          </div>

          <RowInfo
            label="Year of release"
            value={getYearFromDateString(
              comic.dates.find((d) => d.type === "focDate")?.date
            )}
          />
          {comic.format && <RowInfo label="Format" value={comic.format} />}
          <RowInfo label="Pages" value={comic.pageCount || "N/A"} />
          {comic.characters.items.length > 0 && (
            <ComicDetailList
              label="Characters"
              items={comic.characters.items}
            />
          )}
          {comic.creators.items.length && (
            <ComicDetailList label="Creators" items={comic.creators.items} />
          )}
          <RowInfo label="Diamond Code" value={comic.diamondCode || "N/A"} />
          <p className={styles.Price}>{price} €</p>
        </div>
        <div className={styles.BtnWrapper}>
          <Button label="Close" clickHandler={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ComicModal;
