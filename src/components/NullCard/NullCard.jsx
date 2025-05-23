import "./NullCard.css";

const NullCard = ({ title }) => {
  return (
    <>
      <div className="card-content">
        <h2>Não há nenhum registro de {title} existente no momento.</h2>
        <p>
          Caso tenha ocorrido algum erro, recarregue a página e tente novamente.
        </p>
      </div>
    </>
  );
};
export default NullCard;
