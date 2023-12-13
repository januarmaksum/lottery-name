import ActionsApp from "../components/ActionsApp";
import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { GET_PEGAWAI, GET_PEMENANG, POST_PEGAWAI } from "../utils/utils";
import bgImage1 from "../assets/bg4.png";
import Confetti from "../components/Confetti";
import Swal from "sweetalert2";
import ListWinners from "../components/ListWinners";
import Error from "../components/Error";
import Header from "../components/Header";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export default function Demosatu() {
  // states
  const [pegawai, setPegawai] = useState(null);
  const [winners, setWinners] = useState([]);
  const [runParticle, setRunParticle] = useState(false);

  const [uiProps, setUiProps] = useState({
    buttonDisabled: false,
    displayProgressBarr: false,
  });

  // get data
  const {
    data: dataPegawai,
    mutate: mutateGetPegawai,
    error: errorGetPegawai,
    isLoading,
  } = useSWR(GET_PEGAWAI, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  const { data: dataPemenang, mutate: mutateGetPemenang } = useSWR(
    GET_PEMENANG,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // post data
  const postData = (data) => {
    const payload = {
      id: data.id,
    };
    axios
      .post(POST_PEGAWAI, payload)
      .then((res) => {
        if (res.data.status === 200) {
          mutateGetPegawai();
          mutateGetPemenang();
          setPegawai(null);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handlers
  const handleStart = () => {
    startInterval();

    setUiProps({
      buttonDisabled: true,
      displayProgressBarr: true,
    });
  };

  const handleStop = () => {
    stopInterval();
    setPegawai(dataPegawai[currentIndex]);

    setUiProps({
      buttonDisabled: false,
      displayProgressBarr: false,
    });
  };

  const modal = (isDetail, isDraw) => {
    const isDataDetail = isDraw?.namalengkap ? true : false;
    const content = {
      body: `<div style="display: flex; flex-direction: column; gap: 8px; text-align: center">
              <h1 style='font-size: 3rem; color: red;'>${
                isDataDetail ? isDraw.namalengkap : pegawai.namalengkap
              }</h1>
              <div style='font-size: 1.5rem'>Unit: ${
                isDataDetail ? isDraw.nama_unit_kerja : pegawai.nama_unit_kerja
              }</div>
              <div style='font-size: 1.5rem'>Sub Unit: ${
                isDataDetail
                  ? isDraw.nama_subunit_kerja
                  : pegawai.nama_subunit_kerja
              }</div>
            </div>`,
    };
    Swal.fire({
      width: 800,
      title: isDetail
        ? "<span style='font-size: 2rem;'>🎉 Detail Pemenang 🎉</span>"
        : "<span style='font-size: 2rem;'>🎉 Selamat kepada 🎉</span>",
      html: content.body,
      allowOutsideClick: false,
      backdrop: false,
      confirmButtonText: `
        <span style='font-size: 1.5rem;'>${
          isDetail ? "Tutup" : "OK, LANJUT !"
        }</span>
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        setRunParticle(false);
        Swal.close();
      }
    });
  };

  const handleDetail = (item) => {
    console.log(item, "item detail");
    modal(true, item);
    setRunParticle(true);
  };

  const startInterval = () => {
    setIsRunning(true);
  };

  const stopInterval = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * dataPegawai.length);
        setCurrentIndex(randomIndex);
      }, 1); // Set the interval duration (in milliseconds)
    }

    // Cleanup function to clear the interval when the component unmounts or when isRunning becomes false
    return () => clearInterval(intervalId);
  }, [isRunning, dataPegawai]);

  useEffect(() => {
    if (!isRunning && pegawai) {
      console.log("pegawai: ", pegawai);
      postData(pegawai);
      setRunParticle(true);
      modal();
      setWinners([...dataPemenang, pegawai]);
    }
  }, [currentIndex, pegawai, isRunning]);

  useEffect(() => {
    if (dataPemenang?.length > 0 && !isRunning) {
      setWinners(dataPemenang);
    }
  }, [dataPemenang, isRunning]);

  if (errorGetPegawai) return <Error />;

  return (
    <>
      <Header />
      <Confetti run={runParticle} />
      {winners.length > 0 && (
        <ListWinners winners={winners} handleClick={handleDetail} />
      )}
      <div
        style={{ backgroundImage: `url(${bgImage1})` }}
        className="mx-auto h-screen bg-no-repeat bg-cover bg-bottom pt-80"
      >
        <div className="flex justify-center flex-col items-center">
          <div className="c-subscribe-box u-align-center">
            <div className="rainbow">
              <span></span>
              <span></span>
            </div>
            <div className="c-subscribe-box__wrapper text-center">
              <div className="flex justify-center flex-col items-center h-screen">
                <h1 className="text-[40px] mb-12">
                  {isRunning &&
                    dataPegawai &&
                    dataPegawai[currentIndex].namalengkap}
                  {!isRunning && pegawai?.namalengkap}
                </h1>
                {!pegawai && !isRunning && (
                  <div className="text-3xl tracking-widest text-gray-700">
                    . . .
                  </div>
                )}
              </div>
            </div>
          </div>
          <ActionsApp
            uiProps={uiProps}
            isLoading={isLoading}
            handleStart={handleStart}
            handleStop={handleStop}
          />
        </div>
      </div>
    </>
  );
}
