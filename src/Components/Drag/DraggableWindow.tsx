import { toNumber } from "lodash";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { useTerminalStyles } from "../Terminal/Terminal";

export interface DraggableWindowExtendingProps {
  onMouseDown?: () => void;
}

export interface DraggableWindowProps {
  position?: {
    x: number;
    y: number;
  };
  children?: React.ReactNode;
}

interface DraggableAndResizableElementsData {
  width: number;
  height: number;
  isDragging: boolean;
  x: number;
  y: number;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  position = { x: 20, y: 20 },
  children,
}) => {
  const localStyles = useTerminalStyles();
  const [data, setData] = useState<DraggableAndResizableElementsData>({
    width: 200,
    height: 200,
    x: position.x,
    y: position.y,
    isDragging: false,
  });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (data.isDragging) {
        setData((prevState) => ({
          ...prevState,
          x: prevState.x + e.movementX,
          y: prevState.y + e.movementY,
        }));
      }
    },
    [data.isDragging]
  );

  const onMouseDown = useCallback(() => {
    setData((prevState) => ({
      ...prevState,
      isDragging: true,
    }));
  }, []);

  const onMouseUp = useCallback(() => {
    if (data.isDragging) {
      setData((prevState) => ({
        ...prevState,
        isDragging: false,
      }));
    }
  }, [data.isDragging]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const childrenWithProps = React.cloneElement(children as ReactElement, {
    onMouseDown,
    state: data,
  });

  return (
    <Rnd
      disableDragging
      enableResizing
      size={{ width: data.width, height: data.height }}
      position={{ x: data.x, y: data.y }}
      onResizeStop={(_event, _direction, ref, _delta, position) => {
        setData((prevData) => ({
          ...prevData,
          width: toNumber(ref.style.width),
          height: toNumber(ref.style.height),
          ...position,
        }));
      }}
      minHeight={100}
      minWidth={200}
      className={localStyles.globalWindow}
    >
      {childrenWithProps}
    </Rnd>
  );
};

export default DraggableWindow;
