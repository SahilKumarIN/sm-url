import { BeatLoader } from "react-spinners";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import { useAuth } from "../context/user-auth";
import { useNavigate } from "react-router-dom";
import { useDb } from "../context/db-context";

const Home = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const { loading, isAuthenticated, user } = useAuth();
  const { createLink, checkShortUrl } = useDb();
  const navigate = useNavigate();
  const handleShorten = () => {};

  const generateShortUrl = () => {
    const symbols =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortPrefix = "";
    for (let i = 0; i < 8; i++) {
      shortPrefix += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    if (!checkShortUrl(shortPrefix)) generateShortUrl();
    return shortPrefix;
  };

  return (
    <>
      <Header />
      <h1 className="text-white text-4xl font-extrabold">Welcome to sm-url</h1>
      <h3 className="text-white text-xl pt-2 pb-6 font-bold">
        Make your looooong urls short 👇
      </h3>
      <div className="flex flex-col gap-4">
        <input
          className="bg-white w-96 rounded-md py-2 px-2 bg-transparent border border-gray-400 "
          type="text"
          name="longUrl"
          id="longUrl"
          autoComplete="false"
          placeholder="enter your looong url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <input
          className="bg-white w-96 rounded-md py-2 px-2 bg-transparent border border-gray-400 "
          type="text"
          name="shortUrl"
          autoComplete="false"
          id="shortUrl"
          placeholder="short url"
          value={shortUrl}
          onClick={() => {
            let shortPrefix = generateShortUrl();
            setShortUrl(shortPrefix);
          }}
        />
        <input
          className="bg-white w-96 rounded-md py-2 px-2 bg-transparent border border-gray-400 "
          type="text"
          name="customUrl"
          autoComplete="false"
          id="customUrl"
          placeholder="custom url"
          value={customUrl}
          onChange={(e) => {
            setCustomUrl(e.target.value);
          }}
        />
        <button
          disabled={loading}
          onClick={() => {
            isAuthenticated()
              ? createLink(user.$id, longUrl, shortUrl, customUrl)
              : navigate(`/auth`);
          }}
          className="bg-white text-gray-700 py-2 px-4 rounded-md font-bold"
        >
          {loading ? <BeatLoader color="#334155" /> : "Shorten!"}
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Home;
