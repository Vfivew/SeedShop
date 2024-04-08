import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-block">
      <h2>Помилка 404</h2>
      <p>Пробачте,але сторінка, яку ви шукайте, не існує.</p>
      <p>
        Будь ласка, перевірте URL або поверніться на{" "}
        <a href="/">Головну сторінку</a>.
      </p>
    </div>
  );
};

export default ErrorPage;
