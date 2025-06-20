import "./NoContentCard.css";

const NoContentCard = ({ title }) => {
  return (
    <>
      <div className="no-content-card-content">
        <h2>Não há nenhum registro de {title} presente no momento.</h2>
        <p>Por favor, recarregue a página e tente novamente.</p>
      </div>
    </>
  );
};
export default NoContentCard;
