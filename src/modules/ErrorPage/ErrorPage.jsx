export const ErrorPage = ({ error }) => {
  console.log("errorpage");
  return (
    <div>
      <h2>Ошибка 404</h2>
      <p>{error?.message ?? "Неизвестная ошибка"}</p>
    </div>
  );
};
