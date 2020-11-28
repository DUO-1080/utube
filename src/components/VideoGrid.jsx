import React, { createRef, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 24px auto 0;
  max-width: 100%;
  display: grid;
  /* gap: 8px 8px; */
  grid-template-columns: ${(props) => `repeat(${props.columns}, ${props.width}px)`};
`;

const VideoGrid = ({ children, miniWidth }) => {
  const [columns, setColumns] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef = createRef();

  const calcColumn = (current) => () => {
    const w = current?.getBoundingClientRect().width;
    const column = Math.floor(w / miniWidth) || 1;
    setWidth(w / column);
    if (columns !== column) {
      setColumns(column);
    }
  };

  useEffect(() => {
    const { current } = containerRef;
    calcColumn(current)();
    window.onresize = calcColumn(current);
  }, []);

  return (
    <Wrapper ref={containerRef} columns={columns} width={width}>
      {children}
    </Wrapper>
  );
};

export default VideoGrid;
