import { useState } from "react";

const dummyData = [
  {
    id: 1,
    nama: "Dono",
    unitKerja: "Warkop",
    jenisPegawai: "omen",
  },
  {
    id: 2,
    nama: "Kasino",
    unitKerja: "Prambors",
    jenisPegawai: "gile lu ndro",
  },
  {
    id: 3,
    nama: "Indro",
    unitKerja: "SUCI",
    jenisPegawai: "kompor gas",
  },
];

function App() {
  // States
  const [users, setUsers] = useState(dummyData);
  const [winners, setWinners] = useState([]);

  const [uiProps, setUiProps] = useState({
    buttonDisabled: false,
    displayProgressBarr: false,
  });

  // Utility functions
  let pegawai;
  function getRandomName() {
    return (pegawai = users[Math.floor(Math.random() * users.length)]);
  }

  // Handlers
  const handleStart = () => {
    getRandomName();
    if (typeof pegawai === "undefined") {
      const confirmed = window.confirm(
        "Sudah menang semua bang!, reload browser yak"
      );

      if (confirmed) {
        return location.reload(true);
      }

      location.reload(true);
    }

    setUiProps({
      buttonDisabled: true,
      displayProgressBarr: true,
    });
  };

  const handleStop = () => {
    getRandomName();
    console.log(pegawai);

    // Add random name to winner list
    setWinners([...winners, pegawai]);
    // Update and Remove the random name form users
    const updateNameList = users.filter((user) => user.id !== pegawai.id);

    setUsers(updateNameList);

    setUiProps({
      buttonDisabled: false,
      displayProgressBarr: false,
    });
  };

  return (
    <div className="container w-6/12 mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-2xl">Pegawai</h2>
          <ul id="userList">
            {users?.map((user, index) => (
              <li className="list-item" key={user.id}>
                {index + 1 + ". "}
                {user.nama}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col text-center">
          <div className="flex gap-2">
            <button
              onClick={handleStart}
              disabled={uiProps.buttonDisabled}
              type="button"
              className="disabled:bg-indigo-100 bg-indigo-500 text-white py-2 px-3 rounded w-44 mx-auto mt-8"
            >
              START
            </button>

            <button
              onClick={handleStop}
              disabled={!uiProps.buttonDisabled}
              type="button"
              className="disabled:bg-red-100 bg-red-500 text-white py-2 px-3 rounded w-44 mx-auto mt-8"
            >
              STOP
            </button>
          </div>

          <div className="text-3xl mt-8">
            {uiProps.displayProgressBarr && "loading..."}
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl">Pemenang</h2>
          <ul className="winners">
            {winners?.map((winner, index) => (
              <li key={winner.id} className="list-item">
                {index + 1 + ". "}
                {winner.nama}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
