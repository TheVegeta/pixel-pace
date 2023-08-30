import "../assets/style.css";

const Loading = () => {
  return (
    <div className="center-item">
      <div className="spinner-box">
        <div className="configure-border-1">
          <div className="configure-core"></div>
        </div>
        <div className="configure-border-2">
          <div className="configure-core"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
