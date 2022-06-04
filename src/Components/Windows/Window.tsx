import { useState } from "react";
import { WindowType, Position, Size, DefaultValueType } from "../API/Types";
import { getTypeOfDefaultPosition } from "../Hooks/useDraggable";
// import { useDraggable } from "../Hooks/useDraggable";
import DraggableAndResizableWindow from "./Drag/DraggableAndResizableWindow";

interface WindowProps {
  openWindow: WindowType;
  index: number;
  openedWindows: WindowType[];
  setOpenedWindows: React.Dispatch<React.SetStateAction<WindowType[]>>;
}

const Window: React.FC<WindowProps> = ({
  openWindow,
  index,
  openedWindows,
  setOpenedWindows,
}) => {
  const [sizeAndPosition, setSizeAndPosition] = useState<Size & Position>({
    width: openWindow.initialSize?.width ?? "20%",
    height: openWindow.initialSize?.height ?? "20%",
    x: openWindow.initialPosition?.x ?? "20%",
    y: openWindow.initialPosition?.y ?? "20%",
  });

  const [previousSizeAndPosition, setPreviousSizeAndPosition] = useState<
    Size & Position
  >({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onClickHideButton = (windowIndex: number) => {
    const newlyUpdatedWindows = openedWindows.map((openedWindow, index) => {
      if (index !== windowIndex) return openedWindow;
      return {
        ...openedWindow,
        isWindowHidden: true,
      };
    });

    setOpenedWindows([...newlyUpdatedWindows]);
  };

  const onClickGrowButton = (windowIndex: number) => {
    if (openWindow.isFullScreen) {
      const newOpenedWidowsList = openedWindows.map((currentWindow, index) => {
        if (index !== windowIndex) return currentWindow;
        return {
          ...currentWindow,
          isFullScreen: false,
        };
      });
      setSizeAndPosition(previousSizeAndPosition);
      setOpenedWindows(newOpenedWidowsList);
    } else {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const newOpenedWidowsList = openedWindows.map((currentWindow, index) => {
        if (index !== windowIndex) return currentWindow;
        return {
          ...currentWindow,
          isFullScreen: true,
        };
      });
      const dataType = getTypeOfDefaultPosition({
        x: sizeAndPosition.x,
        y: sizeAndPosition.y,
      });
      setOpenedWindows(newOpenedWidowsList);
      setPreviousSizeAndPosition(sizeAndPosition);
      setSizeAndPosition({
        x: dataType.x === DefaultValueType.PERCENT_STRING ? "0%" : "0",
        y: dataType.y === DefaultValueType.PERCENT_STRING ? "0%" : "0",
        width: newWidth,
        height: newHeight,
      });
    }
  };

  return (
    <DraggableAndResizableWindow
      key={openWindow.key}
      shouldBeHidden={openWindow.isWindowHidden}
      sizeAndPosition={sizeAndPosition}
      setSizeAndPosition={setSizeAndPosition}
    >
      <openWindow.component
        onCloseButtonClick={() =>
          setOpenedWindows(
            openedWindows.filter(
              (_openedWindow, filterIndex) => index !== filterIndex
            )
          )
        }
        onHideButtonClick={() => onClickHideButton(index)}
        onGrowButtonClick={() => onClickGrowButton(index)}
      />
    </DraggableAndResizableWindow>
  );
};

export default Window;
