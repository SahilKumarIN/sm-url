import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useAuth } from "../context/user-auth";
import { useDb } from "../context/db-context";
import QRCode from "react-qr-code";
import { Plus, Trash2Icon } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { getLinks, deleteLink, deleting } = useDb();
  const [links, setLinks] = useState([]);
  const userId = user.$id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      const link = await getLinks(userId);
      setLinks(link.documents || []);
    };

    fetchLinks();
  }, [userId, getLinks]);

  // this feature will be released later on
  const handleQrDownload = (value) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const qrCode = document.getElementById(value);

    canvas.width = qrCode.clientWidth;
    canvas.height = qrCode.clientHeight;
    context.drawImage(qrCode, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${value}-qrcode.png`;
    link.click();
  };

  return (
    <>
      <Header />
      <h1 className="text-yellow-400 font-bold text-xl">👋Hello {user.name}</h1>
      <div className="bg-slate-200 w-4/5 px-4 py-2 my-4 rounded-md overflow-y-scroll scroll scroll-smooth">
        {links.length > 0 ? (
          links.map((item) => (
            <div
              className="bg-black w-full p-8 flex gap-4 rounded-md my-4 text-white"
              key={item.$id}
            >
              <div
                id="QrContainer"
                className="bg-white rounded-md relative p-4"
              >
                <QRCode
                  value={item.longUrl}
                  color="black"
                  bgColor="transparent"
                  size={120}
                />
                {/* <Download
                  color="black"
                  size={32}
                  className="bg-slate-500 p-2 rounded-md absolute top-0 right-0 cursor-pointer"
                  onClick={() => handleQrDownload(item.longUrl)}
                /> */}
              </div>
              <div>
                <div>
                  Long Url :{" "}
                  <span className="text-cyan-600 text-base font-semibold">
                    {item.longUrl}
                  </span>
                </div>
                <div>
                  Short Url :{" "}
                  <span className="text-cyan-600 text-base font-semibold">{`sm-url/${item.shortUrl}`}</span>
                </div>
                <div>
                  Custom Url :{" "}
                  <span className="text-cyan-600 text-base font-semibold">{`sm-url/${item.customUrl}`}</span>
                </div>
                <div>
                  <button
                    className="btn bg-red-600 text-white font-bold p-2 my-4 btn-sm rounded"
                    onClick={() => deleteLink(`${item.$id}`)}
                  >
                    {deleting ? (
                      <BeatLoader color="#334155" />
                    ) : (
                      <div className="flex gap-1 align-middle justify-center">
                        <Trash2Icon color="white" />
                        {"Delete"}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-red-500 text-center">No Data to show</div>
        )}
      </div>
      <div className="absolute bottom-4 right-4 z-50 bg-white p-2 text-black rounded-full">
        <Plus color="black" size={20} onClick={() => navigate("/")} />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
