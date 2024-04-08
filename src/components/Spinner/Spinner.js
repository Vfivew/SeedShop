import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  );
};

export default Spinner;
