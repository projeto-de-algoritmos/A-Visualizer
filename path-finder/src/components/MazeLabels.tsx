const MazeLabels = () => {
  const getLabel = (label: string, background: string) => {
    return (
      <div className="label" style={{ background, marginInline:"8px" }}>
        {label}
      </div>
    );
  };

  return (
    <div style={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
      {getLabel("Inicio", "green")}
      {getLabel("Fim", "blue")}
      {getLabel("Visitado", "red")}
      {getLabel("Enfileirado", "yellow")}
      {getLabel("Caminho", "orange")}
    </div>
  )
};

export default MazeLabels;

