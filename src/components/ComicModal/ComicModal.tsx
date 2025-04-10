import { Comic } from "../../types/types";
import styles from "./ComicModal.module.css";
import ComicDetailList from "./components/List/List";
import RowInfo from "./components/RowInfo/RowInfo";

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
          <RowInfo label="Title" value={comic.title} />
          <RowInfo
            label="Release Date"
            value={comic.dates.find((d) => d.type === "focDate")?.date || "N/A"}
          />
          <RowInfo label="Format" value={comic.format || "N/A"} />
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
        </div>
      </div>
    </div>
  );
};

export default ComicModal;
