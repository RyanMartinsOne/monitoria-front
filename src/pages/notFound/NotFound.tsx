import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, navigate]);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-white px-6">
      <div className="flex w-full flex-col justify-center text-center">
        <h1 className="font-serif text-9xl font-medium tracking-tight text-gray-900">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          A página que você está procurando não existe.
        </p>

        <div className="flex-row items-center justify-center gap-4 sm:flex">
          <button
            onClick={() => navigate("/", {replace: true})}
            className="mt-8 rounded-full border border-gray-500 px-6 py-2.5 text-sm text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-800/10 hover:text-gray-900"
          >
            Voltar agora
          </button>
        </div>
      </div>
    </div>
  );
}
