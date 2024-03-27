const Cell = ({
  ind,
  isFrog,
  isObstacle,
  isFinish,
}: {
  ind: number;
  isFrog: boolean;
  isObstacle: boolean;
  isFinish: boolean;
}) => {
  return (
    <div
      className={`cell ${isFrog ? "frog" : ""} ${
        isObstacle ? "obstacle" : ""
      } ${isFinish ? "finish" : ""}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Cell {ind}
    </div>
  );
};
export default Cell;
