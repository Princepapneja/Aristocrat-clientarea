import moment from "moment";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { dateFormat } from "../../../constants";
import Buttons from "./buttons";

function GameCard({ game }) {

  // console.log(game);
  
  const navigation= useNavigate()
  return (
<div
  id={game?.id}
  className="card group relative bg-[#F4F4F4] xl:hover:shadow flex flex-col duration-300 rounded-[20px] max-w-100 w-full transform transition-transform xl:hover:-translate-y-5"
>

  {/* Game Image and Date */}
  <div className="relative w-full">
   <img
  className="h-100 md:h-96  rounded-3xl object-cover w-full"
  src={game.image || "/Images/game.png"}
  alt=""
/>

    {game?.releaseDate && (
      <p
        className="absolute top-3 left-3 text-black px-3 py-2 text-xs font-semibold rounded-[10px]"
        style={{
          background: "linear-gradient(86.08deg, #66FFCC 0%, #94FF80 100%)",
        }}
      >
        {moment(game.releaseDate).format("D MMMM YYYY")}
      </p>
    )}
  </div>

  {/* Game Info + Buttons */}
  <div className="p-5 flex flex-col grow justify-between group-hover:bg-white transition-colors duration-300">
    <p className="text-2xl font-medium mb-3">{game.title}</p>
    <p className="mb-4">By: {game?.studio?.name}</p>


    <div className="overflow-hidden xl:max-h-0 group-hover:max-h-40 transition-all duration-300 flex justify-between ">
      <Buttons onClick={() => navigation(`/dashboard/detail-game/${game.id}`)} className="">
        Details
      </Buttons>
      <Buttons className="">Play Demo</Buttons>
    </div>
  </div>
</div>


  );
}

export default GameCard;
