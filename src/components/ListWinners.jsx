export default function ListWinners({ winners, handleClick }) {
  return (
    <div className="fixed right-7 top-48">
      <div className="bg-white border-double border-4 border-sky-500">
        <div className="flex justify-center relative">
          <h2 className="bg-amber-400 text-black absolute inline-flex -top-5 text-center px-2 py-1 border-double border-4 border-sky-500">
            🎉 Daftar Pemenang 🎉
          </h2>
        </div>
        <ol className="bg-white w-64 grid grid-cols-1 divide-y divide-dashed pt-7 overflow-y-auto max-h-[30rem]">
          {winners &&
            winners.map((item) => {
              return (
                <li key={item.pegawai_id}>
                  <button
                    className="flex w-full gap-2 text-left flex-grow py-1 px-3 transition ease-in-out hover:text-red-700 duration-300"
                    type="button"
                    onClick={() => handleClick?.(item)}
                  >
                    <span className="flex-none">{item.no}.</span>
                    <span className="flex-auto ">{item.namalengkap}</span>
                  </button>
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}
