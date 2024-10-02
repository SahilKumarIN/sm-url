const LinkCard = ({ data }) => {
  return (
    <div className="w-3/4  mt-8 rounded-md p-4 border border-white flex gap-6 relative">
      {/* <img
    className="bg-white rounded-md h-full object-contain"
    src={data.qrCode}
    alt={data.shortenUrl}
  /> */}
      <QRCode
        size={200}
        value={data?.longUrl}
        className="bg-white rounded-md h-full p-2 object-contain"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-white font-bold text-3xl mb-4 hover:text-cyan-500 hover:transition-all">
            {data?.title}
          </h2>

          <p className="text-white font-bold">
            Short Url :{" "}
            <a
              href={`https://sm-url/${data?.shortenUrl}`}
              className="underline text-cyan-400 cursor-pointer"
            >
              https://sm-url/{data?.shortenUrl}
            </a>
          </p>
          <p className="text-white font-bold">
            Original Url :{" "}
            <a
              href={data?.longUrl}
              className="underline text-cyan-400 cursor-pointer"
            >
              {data?.longUrl}
            </a>
          </p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300 font-semibold">
            {data?.dateCreated}
          </span>
          <span className="text-gray-300 font-semibold">
            {data?.timeCreated}
          </span>
        </div>
      </div>
      <div className="absolute right-2 top-2 flex gap-4 mt-2 pr-2">
        <Copy
          color="white"
          size={24}
          onClick={() => {
            navigator.clipboard.writeText(`https://sm-url/${data?.shortenUrl}`);
            toast.success("Copied to clipboard");
          }}
        />
        <Download
          color="white"
          size={24}
          onClick={() => {
            const anchor = document.createElement("a");
            anchor.href = data?.qrCode;
            anchor.download = data?.title;
            anchor.click();
            document.removeChild(anchor);
          }}
        />
      </div>
    </div>
  );
};

export default LinkCard;
