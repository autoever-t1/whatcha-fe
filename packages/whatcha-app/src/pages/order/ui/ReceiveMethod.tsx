import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ReceiveMethod.module.css";
import { RadioButton } from "@shared/radio-button";
import MarkerIcon from "@common/assets/marker.png";
import axios from "axios";

export function ReceiveMethod() {
  const [receiveMethod, setReceiveMethod] = useState<"pickUp" | "delivery">(
    "delivery"
  );
  const [distance, setDistance] = useState<number>();
  const [duration, setDuration] = useState<number>();

  const mapRef = useRef<naver.maps.Map>();

  const paintMap = useCallback(() => {
    mapRef.current = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.48152, 126.882625),
      zoom: 13,
    });
  }, []);

  const getLocation = useCallback(() => {
    setTimeout(() => {
      if (mapRef.current) {
        const markerOptions = {
          position: new naver.maps.LatLng(37.48152, 126.882625),
          map: mapRef.current,
          icon: {
            url: MarkerIcon,
            size: new naver.maps.Size(50, 50),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 25),
          },
        };

        new naver.maps.Marker(markerOptions);
      }
    }, 2000);
  }, []);

  const getPath = useCallback(async () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const clientSecrert = import.meta.env.VITE_NAVER_CLIENT_SECRET;

    const start = "126.882625,37.48152";
    const goal = "126.972683,37.300279";

    const response = await axios.get(
      `/map-direction/v1/driving?start=${start}&goal=${goal}`,
      {
        headers: {
          "x-ncp-apigw-api-key-id": clientId,
          "x-ncp-apigw-api-key": clientSecrert,
        },
      }
    );

    const summary = response.data.route.traoptimal[0].summary;
    setDistance(summary.distance);
    setDuration(summary.duration);

    const paths: naver.maps.ArrayOfCoords =
      response.data.route.traoptimal[0].path;
    new naver.maps.Polyline({
      map: mapRef.current,
      path: paths,
    });
  }, []);

  useEffect(() => {
    paintMap();
    getLocation();
    getPath();
  }, []);

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
        지점 위치
      </p>
      <div className={styles["map-wrapper"]}>
        <div id="map"></div>
      </div>
      <div className="layout-line">
        <span className="font-r-sm">거리</span>
        <span className="font-r-sm">
          {distance && (distance / 1000).toFixed(1)}km
        </span>
      </div>
      <div className="layout-line">
        <span className="font-r-sm">예상 시간</span>
        <span className="font-r-sm">
          약 {duration && (duration / 1000 / 60 / 60).toFixed(1)}시간
        </span>
      </div>
    </div>
  );
}
