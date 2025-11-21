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
    <div className="w-full flex-1 bg-white rounded-2xl overflow-hidden" style={{ border: '1.5px solid rgba(123, 123, 123, 0.1)' }}>
      {/* Title */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-semibold text-base leading-6 text-[#1A1D1F]" style={{ fontFamily: 'Inter' }}>
          Move History
        </h3>
      </div>

      {/* Move list */}
      <div className="px-4 space-y-1 overflow-y-auto pb-2" style={{ maxHeight: 'calc(100% - 48px)' }}>
        {formattedMoves.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No moves yet</p>
        ) : (
          <>
            {/* Moves */}
            {formattedMoves.map((move, index) => (
              <div
                key={index}
                className={`w-full h-10 flex items-center justify-between px-3 rounded-lg ${
                  move.index === currentMoveIndex
                    ? 'bg-[#EEF2FF]'
                    : ''
                }`}
                style={{
                  border: move.index === currentMoveIndex
                    ? '1.5px solid #A3B3FF'
                    : '1px solid #EFEFEF'
                }}
              >
                <span className="font-normal text-sm text-[#101010]" style={{ fontFamily: 'Helvetica' }}>
                  {move.display}
                </span>
                <span
                  className={`font-semibold text-xs ${
                    move.index === currentMoveIndex ? 'text-[#4F39F6]' : 'text-[#6F767E]'
                  }`}
                  style={{ fontFamily: 'Inter' }}
                >
                  {move.index === currentMoveIndex
                    ? 'Current'
                    : move.isWhiteMove ? 'W' : 'B'
                  }
                </span>
              </div>
            ))}

            {/* Your turn indicator */}
            <div className="w-full h-10 flex items-center justify-between px-3 rounded-lg border border-dashed border-[#EFEFEF]">
              <span className="font-normal text-sm text-[#101010]" style={{ fontFamily: 'Helvetica' }}>
                {isNextWhiteMove ? `${nextMoveNumber}. ...` : `${nextMoveNumber}... ...`}
              </span>
              <span className="font-semibold text-xs text-[#6F767E]" style={{ fontFamily: 'Inter' }}>
                Your turn
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoveHistory;
