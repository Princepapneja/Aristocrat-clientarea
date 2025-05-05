import React from "react";
import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <>
      <Link to={`/dashboard/detail-game/${game.id}`} id={game?.id} className="bg-white-v2 flex flex-col rounded-2xl max-w-72 w-full ">
          <div className="relative ">
            <img className="w-72 h-96 rounded-3xl " src={game.image} alt="" />
            {game?.date && (
              <p className="absolute top-3 left-3 font-semibold px-3.5 py-2.5 primary-gradient rounded-xl ">
                {game.date}
              </p>
            )}
          </div>

          <div className="p-7 flex flex-col grow justify-between ">
            <p className="text-2xl font-medium mb-3 ">{game.title}</p>
            <p className="">By: {game.by}</p>
          </div>
      </Link>
    </>
  );
}

export default GameCard;
