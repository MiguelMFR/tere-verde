import "./SubmitCard.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminSubmitCard = ({ onClick, category }) => {

  return (
    <div className="card-container submit-card">
      <button className="plus-button" aria-label="Criar nova entidade" onClick={onClick}>
        <FontAwesomeIcon
          icon={faPlus}
          className="plus-icon"
        />
      </button>
    </div>
  )
}

export default AdminSubmitCard;
