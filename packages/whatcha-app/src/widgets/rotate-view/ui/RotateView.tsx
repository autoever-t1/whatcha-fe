import styles from "./RotateView.module.css";
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  MouseEventHandler,
  TouchEventHandler,
} from "react";

const startFrame = 201;
const endFrame = 235;
const baseUrl =
  "https://certified-static.hyundai.com/contents/goods/shootConts/tobepic/02/exterior/";
const baseName = "PRD602_";
const crop = "/dims/crop/2871x2473+485+87/resize/900x775/optimize";
const totalFrames = endFrame - startFrame + 1;

interface RotateViewProps {
  goodsNo: string;
}

export function RotateView({ goodsNo }: RotateViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameImages = useRef<HTMLImageElement[]>([]);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const timer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          const newFrame = prev + 1;
          if (newFrame > totalFrames) {
            clearInterval(intervalRef.current!);
            return 0;
          }

          return newFrame;
        });
      }, 50);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 이미지 로드
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = startFrame; i <= endFrame; i++) {
      const img = new Image();
      img.src = `${baseUrl}${goodsNo}/${baseName}${i}.JPG${crop}`;
      images.push(img);
    }

    frameImages.current = images;
  }, [goodsNo]);

  // canvas에 그리기
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");
    const image = frameImages.current[currentFrame];
    if (!image || !ctx) return;

    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    if (image.complete) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }, [currentFrame]);

  // 이벤트 핸들러: 좌우 드래그 시 프레임 이동
  const handleDrag = useCallback((dx: number) => {
    const step = dx > 0 ? 1 : -1;
    setCurrentFrame((prev) => (prev + step + totalFrames) % totalFrames);
  }, []);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  }, []);

  const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (isDragging) {
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 5) {
          handleDrag(dx);
          setStartX(e.clientX);
        }
      }
    },
    [isDragging, startX, handleDrag]
  );

  const onMouseUp: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onTouchStart: TouchEventHandler<HTMLDivElement> = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  }, []);

  const onTouchMove: TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (isDragging) {
        const dx = e.touches[0].clientX - startX;
        if (Math.abs(dx) > 5) {
          handleDrag(dx);
          setStartX(e.touches[0].clientX);
        }
      }
    },
    [isDragging, startX, handleDrag]
  );

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className={styles.container}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "none" }}
    >
      <div className={styles.wrapper}>
        <canvas ref={canvasRef} width={900} height={775} />
      </div>
    </div>
  );
}
