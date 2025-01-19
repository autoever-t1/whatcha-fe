import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ReceiveMethod.module.css";
import { RadioButton } from "@shared/radio-button";
import MarkerIcon from "@common/assets/marker.png";
import { getPathAPI, PathReqDTO } from "@/features/order";

interface ReceiveMethodProps {
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  address: string;
}

export function ReceiveMethod({
  fromLat,
  fromLng,
  toLat,
  toLng,
  address,
}: ReceiveMethodProps) {
  const [receiveMethod, setReceiveMethod] = useState<"pickUp" | "delivery">(
    "pickUp"
  );
  const [distance, setDistance] = useState<number>();
  const [duration, setDuration] = useState<number>();

  const mapRef = useRef<naver.maps.Map>();

  const paintMap = useCallback((lat: number, lng: number) => {
    mapRef.current = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 7,
    });
  }, []);

  const paintMarker = useCallback(
    (fromLat: number, fromLng: number, toLat: number, toLng: number) => {
      if (mapRef.current) {
        const branchMarker = {
          position: new naver.maps.LatLng(toLat, toLng),
          map: mapRef.current,
          icon: {
            url: MarkerIcon,
            size: new naver.maps.Size(50, 50),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 25),
          },
        };

        const myMarker = {
          position: new naver.maps.LatLng(fromLat, fromLng),
          map: mapRef.current,
          icon: {
            url: MarkerIcon,
            size: new naver.maps.Size(50, 50),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 25),
          },
        };

        new naver.maps.Marker(branchMarker);
        new naver.maps.Marker(myMarker);
      }
    },
    []
  );

  const getPath = useCallback(
    async (fromLat: number, fromLng: number, toLat: number, toLng: number) => {
      const pathData: PathReqDTO = {
        fromLng,
        fromLat,
        toLng,
        toLat,
      };

      const response = await getPathAPI(pathData);

      const summary = response.route.traoptimal[0].summary;
      setDistance(summary.distance);
      setDuration(summary.duration);

      const paths: naver.maps.ArrayOfCoords = response.route.traoptimal[0].path;
      new naver.maps.Polyline({
        map: mapRef.current,
        path: paths,
      });
    },
    []
  );

  useEffect(() => {
    paintMap(toLat, toLng);
    paintMarker(fromLat, fromLng, toLat, toLng);
    getPath(fromLat, fromLng, toLat, toLng);
  }, [toLat, toLng, fromLng, fromLat, paintMap, paintMarker, getPath]);

  const handleChangeReceiveMethod = useCallback(() => {
    setReceiveMethod((prev) => (prev === "delivery" ? "pickUp" : "delivery"));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["radio-box"]}>
        <RadioButton
          value={receiveMethod === "pickUp"}
          label="지점 방문"
          onClick={handleChangeReceiveMethod}
        />
        <RadioButton
          value={receiveMethod === "delivery"}
          label="탁송"
          onClick={handleChangeReceiveMethod}
        />
      </div>
      <p className="font-b-md" style={{ marginTop: "16px" }}>
        지점 위치 <span className="font-r-sm">({address})</span>
      </p>
      <div className={styles["map-wrapper"]}>
        <div id="map"></div>
      </div>
      <div className="layout-line">
        <span className="font-b-md">거리</span>
        <span className="font-r-md">
          {distance && (distance / 1000).toFixed(1)}km
        </span>
      </div>
      <div className="layout-line">
        <span className="font-b-md">예상 시간(차량 주행)</span>
        <span className="font-r-md">
          약 {duration && (duration / 1000 / 60 / 60).toFixed(1)}시간
        </span>
      </div>
    </div>
  );
}
