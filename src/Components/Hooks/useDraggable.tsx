import { toNumber } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { DefaultValueType } from "../API/Types";

interface DraggableAndResizableElementsData {
  width: number | string;
  height: number | string;
  isDragging: boolean;
  isResizing: boolean;
  x: number | string;
  y: number | string;
}

export const getTypeOfDefaultPosition = (position: {
  x: number | string;
  y: number | string;
}) => {
  const [xType, yType] = [position.x, position.y].reduce(
    (acc, currentPositionElement, index) => {
      if (
        typeof currentPositionElement === "string" &&
        currentPositionElement.endsWith("%")
      ) {
        acc[index] = DefaultValueType.PERCENT_STRING;
      } else if (
        typeof currentPositionElement === "string" &&
        !currentPositionElement.endsWith("%")
      ) {
        acc[index] = DefaultValueType.NUMBER_STRING;
      } else {
        acc[index] = DefaultValueType.CLASSIC_NUMBER;
      }
      return acc;
    },
    [DefaultValueType.CLASSIC_NUMBER, DefaultValueType.CLASSIC_NUMBER] as [
      DefaultValueType,
      DefaultValueType
    ]
  );
  return { x: xType, y: yType };
};

export const useDraggable = (position: {
  x: number | string;
  y: number | string;
}) => {
  const defaultDataTypes = getTypeOfDefaultPosition(position);
  const [data, setData] = useState<DraggableAndResizableElementsData>({
    width: 200,
    height: 200,
    x: position.x,
    y: position.y,
    isDragging: false,
    isResizing: false,
  });

  /**
   * The point of this function is to change the position if by keeping units
   * (% or px).
   * @param previousX position before movement on x axis
   * @param previousY position before movement on y axis
   * @param movementX movement value on x axis
   * @param movementY movement value on y axis
   * @returns the new position x and y as numbers
   */
  const resolveXAndYPosition = (
    previousX: number | string,
    previousY: number | string,
    movementX: number,
    movementY: number
  ) => {
    const tab = [
      {
        previous: previousX,
        movement: movementX,
        defaultDataType: defaultDataTypes.x,
      },
      {
        previous: previousY,
        movement: movementY,
        defaultDataType: defaultDataTypes.y,
      },
    ];
    const [x, y] = tab.reduce(
      (acc, currentElement, index) => {
        if (
          currentElement.defaultDataType === DefaultValueType.PERCENT_STRING
        ) {
          const currentPercentageNumber = (
            currentElement.previous as string
          ).split("%")[0];
          const currentMovementPercentageNumber =
            (currentElement.movement /
              (index === 0 ? window.innerWidth : window.innerHeight)) *
            100;
          const currentNewFinalStringValue = `${
            toNumber(currentPercentageNumber) + currentMovementPercentageNumber
          }%`;

          acc[index] = currentNewFinalStringValue;
        } else {
          acc[index] =
            toNumber(currentElement.previous) + currentElement.movement;
        }
        return acc;
      },
      ["", ""] as [string | number, string | number]
    );
    return { x, y };
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (data.isDragging) {
        setData((prevState) => {
          const { x, y } = resolveXAndYPosition(
            prevState.x,
            prevState.y,
            e.movementX,
            e.movementY
          );
          return {
            ...prevState,
            x,
            y,
          };
        });
      }
    },
    //eslint-disable-next-line
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

  return {
    onMouseMove,
    onMouseDown,
    onMouseUp,
    data,
    setData,
    resolveXAndYPosition,
  };
};
