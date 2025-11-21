import React from 'react';

const MoveHistory = ({ moves, currentMoveIndex }) => {
  // Display moves in alternating format: "1. e4", "1... e5", "2. Ba4", etc.
  const formattedMoves = moves.map((move, index) => {
    const moveNumber = Math.floor(index / 2) + 1;
    const isWhiteMove = index % 2 === 0;
    return {
      display: isWhiteMove ? `${moveNumber}. ${move.san}` : `${moveNumber}... ${move.san}`,
      san: move.san,
      index: index,
      isWhiteMove: isWhiteMove,
      moveNumber: moveNumber
    };
  });

  const nextMoveNumber = Math.floor(moves.length / 2) + 1;
  const isNextWhiteMove = moves.length % 2 === 0;

  return (
    <div className="w-[402px] h-[441px] bg-white rounded-[25px]" style={{ border: '1.5px solid rgba(123, 123, 123, 0.1)' }}>
      {/* Title */}
      <div className="px-[22px] pt-[17px] pb-[17px]">
        <h3 className="font-semibold text-lg leading-8 text-[#1A1D1F]" style={{ fontFamily: 'Inter' }}>
          Move History
        </h3>
      </div>

      {/* Move list */}
      <div className="px-[22px] space-y-[6px] max-h-[360px] overflow-y-auto pb-0 hide-scrollbar">
        {formattedMoves.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No moves yet</p>
        ) : (
          <>
            {/* Moves */}
            {formattedMoves.map((move, index) => (
              <div
                key={index}
                className={`w-[357px] h-[55px] flex flex-col items-start justify-start px-4 pt-3 rounded-xl ${
                  move.index === currentMoveIndex
                    ? 'bg-[#EEF2FF]'
                    : ''
                }`}
                style={{
                  border: move.index === currentMoveIndex
                    ? '1.81818px solid #A3B3FF'
                    : '0.909091px solid #EFEFEF'
                }}
              >
                <div className="font-normal text-sm leading-[14px] tracking-[0.175px] text-[#101010]" style={{ fontFamily: 'Helvetica' }}>
                  {move.display}
                </div>
                <div
                  className={`font-semibold text-xs leading-3 tracking-[0.15px] mt-[5px] ${
                    move.index === currentMoveIndex ? 'text-[#4F39F6]' : 'text-[#6F767E]'
                  }`}
                  style={{ fontFamily: 'Inter' }}
                >
                  {move.index === currentMoveIndex
                    ? 'Current'
                    : move.isWhiteMove ? 'White' : 'Black'
                  }
                </div>
              </div>
            ))}

            {/* Your turn indicator */}
            <div
              className="w-[357px] h-[55px] flex flex-col items-start justify-start px-4 pt-3 rounded-xl"
            >
              <div className="font-normal text-sm leading-[14px] tracking-[0.175px] text-[#101010]" style={{ fontFamily: 'Helvetica' }}>
                {isNextWhiteMove ? `${nextMoveNumber}. ...` : `${nextMoveNumber}... ...`}
              </div>
              <div className="font-semibold text-xs leading-3 tracking-[0.15px] text-[#6F767E] mt-[5px]" style={{ fontFamily: 'Inter' }}>
                Your turn
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoveHistory;
