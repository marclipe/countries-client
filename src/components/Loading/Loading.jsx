import "./styles.css";

export const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <span><h3>Carregando...</h3></span>
    </div>
  );
}