import { makeStyles } from "@material-ui/core";
import { toNumber } from "lodash";
import React, { ReactElement, useEffect } from "react";
import { Rnd, RndResizeCallback } from "react-rnd";
import { DefaultValueType, Position, Size } from "../../API/Types";
import {
  getTypeOfDefaultPosition,
  useDraggable,
} from "../../Hooks/useDraggable";

const MIN_HEIGHT = 100;
const MIN_WIDTH = 200;

const useStyles = makeStyles({
  globalWindow: {
    backgroundColor: "transparent",
    borderRadius: 8, //Radius for the shadow
    boxShadow: "10px 0px 70px 0px rgba(0, 0, 0, 0.56)",
  },
});

export interface DraggableAndResizableWindowProps {
  sizeAndPosition: Size & Position;
  setSizeAndPosition: React.Dispatch<React.SetStateAction<Size & Position>>;
  disableResizing?: boolean;
  disableDragging?: boolean;
  initialPosition?: Position;
  children?: React.ReactNode;
  shouldBeHidden?: boolean;
}

/**
 *
 * @param {boolean} disableResizing are we allowed to resize the window?
 * @param {boolean} disableDragging are we allowed to drag the window?
 * @param {object} initialPosition  { x: number | string, y: number | string }. Gives the initial position. Supported values are numbers, numbers as strings, or % value
 * @returns A functionnal component that will allow you to drag & resize it's children as long as said children accept a "onMouseDown" function prop.
 */
const DraggableAndResizableWindow: React.FC<
  DraggableAndResizableWindowProps
> = ({
  sizeAndPosition = { width: "20%", height: "20%", x: "20%", y: "20%" },
  setSizeAndPosition,
  disableResizing = false,
  disableDragging = false,
  initialPosition = { x: "20%", y: "20%" },
  children,
  shouldBeHidden,
}) => {
  const localStyles = useStyles();
  const { data, setData, onMouseDown } = useDraggable(
    initialPosition,
    setSizeAndPosition
  );

  const childrenWithProps = disableDragging
    ? children
    : React.cloneElement(children as ReactElement, {
        onMouseDown,
      });

  /**
   * This function is going to adapt current data for x and y to a number value.
   * If the data.x value and data.y values are already numbers, nothing changes.
   * If they are strings, this function shall parse the string to get the correct amount in number instead.
   */
  const adaptPosition = () => {
    const defaultDataTypes = getTypeOfDefaultPosition({
      x: sizeAndPosition.x,
      y: sizeAndPosition.y,
    });
    const tab = [
      {
        positionData: sizeAndPosition.x,
        defaultDataType: defaultDataTypes.x,
      },
      {
        positionData: sizeAndPosition.y,
        defaultDataType: defaultDataTypes.y,
      },
    ];
    const [x, y] = tab.reduce(
      (acc, currentElement, index) => {
        if (
          currentElement.defaultDataType === DefaultValueType.PERCENT_STRING
        ) {
          const percentageNumber = toNumber(
            (currentElement.positionData as string).split("%")[0]
          );
          acc[index] =
            ((index === 0 ? window.innerWidth : window.innerHeight) *
              percentageNumber) /
            100;
        } else {
          acc[index] = toNumber(currentElement.positionData);
        }
        return acc;
      },
      [-1, -1] as [number, number]
    );

    return {
      x,
      y,
      xDefault: sizeAndPosition.x,
      yDefault: sizeAndPosition.y,
    };
  };

  /**
   * Sets the new position value.
   * Is used on an event listener when resizing the browser.
   * Necessary if we have values set as %
   */
  const updatePosition = () => {
    const { xDefault: x, yDefault: y } = adaptPosition();
    setData((prevData) => ({
      ...prevData,
      x,
      y,
    }));
  };

  /**
   * callBack invoked on resize end.
   * This will set the position, width and height properly
   * by keeping the data type. (either number, string or % value)
   * @param position
   */
  const onResizeStop: RndResizeCallback = (
    _event,
    _direction,
    ref,
    _delta,
    position
  ) => {
    //We just need the types, nothing more.
    const defaultTypes = getTypeOfDefaultPosition({
      x: sizeAndPosition.x,
      y: sizeAndPosition.y,
    });
    const tab = [
      {
        positionData: position.x,
        defaultDataType: defaultTypes.x,
      },
      {
        positionData: position.y,
        defaultDataType: defaultTypes.y,
      },
    ];
    //This reduce adapts the new data values by keeping it's type (either number, string or % value)
    const [x, y] = tab.reduce(
      (acc, currentElement, index) => {
        if (
          currentElement.defaultDataType === DefaultValueType.PERCENT_STRING
        ) {
          acc[index] = `${
            (currentElement.positionData /
              (index === 0 ? window.innerWidth : window.innerHeight)) *
            100
          }%`;
        }
        return acc;
      },
      ["", ""] as [string | number, string | number]
    );
    setData((prevData) => ({
      ...prevData,
      isResizing: false,
    }));
    setSizeAndPosition({
      width: toNumber(ref.style.width),
      height: toNumber(ref.style.height),
      x,
      y,
    });
  };

  /**
   * Just indicates that the current component is actually being dragged to trigger useEffect.
   */
  const onResizeStart = () => {
    setData((prevData) => ({
      ...prevData,
      isResizing: true,
    }));
  };

  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    updatePosition();
    //This avoids memory leak.
    // The returned function will execute itself every time the component unmounts.
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
    //eslint-disable-next-line
  }, [data.isDragging, data.isResizing]);

  return (
    <Rnd
      disableDragging
      enableResizing={!disableResizing}
      size={{ width: sizeAndPosition.width, height: sizeAndPosition.height }}
      position={adaptPosition()}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      minHeight={MIN_HEIGHT}
      minWidth={MIN_WIDTH}
      className={localStyles.globalWindow}
      style={{ display: shouldBeHidden ? "none" : "block" }}
    >
      {childrenWithProps}
    </Rnd>
  );
};

export default DraggableAndResizableWindow;
