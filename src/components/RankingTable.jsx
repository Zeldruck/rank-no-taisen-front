import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Grid, AutoSizer, InfiniteLoader } from 'react-virtualized';

export default function RankingTable({ items, loadMoreItems, hasMore }) {
  const gutter = 16;
  const cellHeight = 400;
  const cellWidthRef = useRef(300);

  const [width, setWidth] = useState(0);
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    if (width < 640) {
      setColumnCount(1);
      cellWidthRef.current = width - gutter;
    } else if (width < 800) {
      setColumnCount(2);
      cellWidthRef.current = (width - gutter * 2) / 2;
    } else {
      setColumnCount(3);
      cellWidthRef.current = (width - gutter * 3) / 3;
    }
  }, [width]);

  const loadMoreCells = () => {
    if (hasMore) return loadMoreItems();
    return Promise.resolve();
  };

  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    const item = items[index];
    if (!item) return <div key={key} style={style} />;

    const isTop3 = index <= 2;

    return (
      <div key={key} style={{ ...style, padding: gutter / 2 }}>
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="relative">
            <img
              src={item.image || 'https://via.placeholder.com/300x180'}
              alt={item.title}
              className="w-full h-60 object-cover object-[0%_40%]"
            />
            <motion.span
              className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold ${
                index === 0
                  ? 'bg-yellow-400 text-white'
                  : index === 1
                  ? 'bg-gray-400 text-white'
                  : index === 2
                  ? 'bg-orange-400 text-white'
                  : 'bg-indigo-100 text-indigo-700'
              }`}
              animate={isTop3 ? { scale: [1, 1.2, 1] } : {}}
              transition={isTop3 ? { repeat: Infinity, duration: 1.2 } : {}}
            >
              #{index + 1}
            </motion.span>
          </div>

          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {item.year}
            </p>
            <div className="mt-auto text-right font-mono font-semibold text-indigo-600 text-lg">
              ELO: {item.elo}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const onResize = useCallback(({ width }) => setWidth(width), []);

  const rowCount = Math.ceil(items.length / columnCount) + (hasMore ? 1 : 0);

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <AutoSizer onResize={onResize}>
        {({ width, height }) => (
          <InfiniteLoader
            isRowLoaded={({ index }) =>
              index < rowCount && items[index * columnCount]
            }
            loadMoreRows={loadMoreCells}
            rowCount={rowCount}
          >
            {({ onRowsRendered, registerChild }) => (
              <Grid
                ref={registerChild}
                columnCount={columnCount}
                columnWidth={cellWidthRef.current + gutter}
                rowCount={rowCount}
                rowHeight={cellHeight + gutter}
                height={height}
                width={width + gutter}
                cellRenderer={cellRenderer}
                onSectionRendered={({ rowStartIndex, rowStopIndex }) =>
                  onRowsRendered({
                    startIndex: rowStartIndex,
                    stopIndex: rowStopIndex,
                  })
                }
              />
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
}
