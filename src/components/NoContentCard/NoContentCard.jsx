import "./NoContentCard.css";

const NoContentCard = ({ title, subtext, className }) => {
  return (
    <>
      <div className={className || "no-content-card-content"}>
        <h3>Nenhum registro de {title} no momento.</h3>
        {subtext && (
          <p>Por favor, recarregue a página e tente novamente.</p>
        )}
      </div>
    </>
  );
};
export default NoContentCard;
