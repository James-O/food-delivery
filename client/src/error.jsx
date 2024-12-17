import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="bg-gray-200 flex justify-center  h-screen text-2xl">
      <div className="shadow w-1/2 h-1/2 mt-24 p-20 text-red-700">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}