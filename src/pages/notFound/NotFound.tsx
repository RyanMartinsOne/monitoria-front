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
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-[#424242] px-6">
      <div className="flex w-full flex-col justify-center text-center">
        <h1 className="font-serif text-9xl font-medium tracking-tight text-white">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          A página que você está procurando não existe.
        </p>

        <div className="flex-row items-center justify-center gap-4 sm:flex">
          <button
            onClick={() => navigate("/")}
            className="mt-8 rounded-full border border-white px-6 py-2.5 text-sm text-white transition-colors hover:border-[#e0dfdb] hover:bg-[#C9A24B]/10"
          >
            Voltar agora
          </button>
        </div>
      </div>
    </div>
  );
}
