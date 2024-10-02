import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDb } from "../context/db-context";

const Redirect = () => {
  const { id: shortUrl } = useParams();
  const { validateLink } = useDb();
  const [smUrl, setSmUrl] = useState();

  useEffect(async () => {
    const link = await validateLink(shortUrl);
    console.log(link);
    setSmUrl(link);
    window.location.replace(link.longUrl);
  }, []);
  return (
    <h1 className="text-white font-extrabold text-4xl mt-4">
      Redirecting to <br />
      <span className="text-indigo-600 text-center">
        {smUrl?.userId ? smUrl?.longUrl : shortUrl}
      </span>
    </h1>
  );
};

export default Redirect;
