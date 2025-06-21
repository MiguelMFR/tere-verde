import "./NoContentCard.css";

const NoContentCard = ({ title, subtext, className }) => {
  return (
    <>
      <div className={className || "no-content-card-content"}>
        <h3>Não há nenhum registro de {title} presente no momento.</h3>
        {subtext && (
          <p>Por favor, recarregue a página e tente novamente.</p>
        )}
      </div>
    </>
  );
};
export default NoContentCard;
