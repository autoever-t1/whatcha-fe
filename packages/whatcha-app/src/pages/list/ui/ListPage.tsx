import { useNavigate, useSearchParams } from "react-router";
import styles from "./ListPage.module.css";
import { MainHeader } from "@shared/main-header";
import { CarItem } from "@shared/car-item";
import SampleImg from "@assets/sample-image.png";
import { useCallback, useEffect, useMemo } from "react";
import {
  getUsedCarByConditions,
  getUsedCarByKeyword,
  options,
} from "@/entities/used-car";

export function ListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = useMemo(() => {
    return searchParams.get("type");
  }, [searchParams]);

  const keyword = useMemo(() => {
    return type && type === "search" ? searchParams.get("keyword") : null;
  }, [type, searchParams]);

  const modelTypes = useMemo(() => {
    const modelTypeArr =
      searchParams
        .get("modelType")
        ?.split(",")
        .map((str) => `modelTypes=${str}`) || [];

    return modelTypeArr.length === 0 ? null : modelTypeArr.join("&");
  }, [searchParams]);

  const modelNames = useMemo(() => {
    const modelNameArr =
      searchParams
        .get("modelName")
        ?.split(",")
        .map((str) => `modelNames=${str}`) || [];

    return modelNameArr.length === 0 ? null : modelNameArr.join("&");
  }, [searchParams]);

  const fuelTypes = useMemo(() => {
    const fuelTypeArr =
      searchParams
        .get("fuelType")
        ?.split(",")
        .map((str) => `fuelTypes=${str}`) || [];

    return fuelTypeArr.length === 0 ? null : fuelTypeArr.join("&");
  }, [searchParams]);

  const colorIds = useMemo(() => {
    const colorIdArr =
      searchParams
        .get("colorIds")
        ?.split(",")
        .map((str) => `colorIds=${str}`) || [];

    return colorIdArr.length === 0 ? null : colorIdArr.join("&");
  }, [searchParams]);

  const priceMinMax = useMemo(() => {
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");

    return priceMin === null || priceMax === null
      ? null
      : `priceMin=${priceMin}&priceMax=${priceMax}`;
  }, [searchParams]);

  const mileageMinMax = useMemo(() => {
    const mileageMin = searchParams.get("mileageMin");
    const mileageMax = searchParams.get("mileageMax");

    return mileageMin === null || mileageMax === null
      ? null
      : `mileageMin=${mileageMin}&mileageMax=${mileageMax}`;
  }, [searchParams]);

  const yearMinMax = useMemo(() => {
    const yearMin = searchParams.get("yearMin");
    const yearMax = searchParams.get("yearMax");

    return yearMin === null || yearMax === null
      ? null
      : `yearMin=${yearMin}&yearMax=${yearMax}`;
  }, [searchParams]);

  const optionIds = useMemo(() => {
    const optionIds =
      searchParams
        .get("optionId")
        ?.split(",")
        .map((optionId) => `${options[parseInt(optionId)].label}=true`) || [];

    return optionIds.length === 0 ? null : optionIds.join("&");
  }, [searchParams]);

  const queries = useMemo(() => {
    return [
      modelTypes,
      modelNames,
      fuelTypes,
      colorIds,
      priceMinMax,
      mileageMinMax,
      yearMinMax,
      optionIds,
    ]
      .filter((item) => item !== null)
      .join("&");
  }, [
    modelTypes,
    modelNames,
    fuelTypes,
    colorIds,
    priceMinMax,
    mileageMinMax,
    yearMinMax,
    optionIds,
  ]);

  const headerTitle = useMemo(() => {
    return type === "search" && keyword ? keyword : "검색 결과";
  }, [type, keyword]);

  const getData = useCallback(async () => {
    if (type === "search") {
      if (keyword) {
        const response = await getUsedCarByKeyword(keyword, 0);

        console.log(response);
      } else {
        await getUsedCarByConditions(queries, 0);
      }
    }
  }, [type, keyword, queries]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleClickBackButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <MainHeader title={headerTitle} onClickBack={handleClickBackButton} />
      {type && (
        <div className={styles.content}>
          <div className={styles.list}>
            <CarItem
              car={{
                carId: 1,
                img: SampleImg,
                model: "2020 그랜저 가솔린 2.5 프리미엄 초이스",
                date: "23년 11월",
                vhclRegNo: "123가4567",
                mileage: 1000,
                price: 3450,
                likeCount: 134,
              }}
              liked
            />
            <CarItem
              car={{
                carId: 2,
                img: SampleImg,
                model: "2020 그랜저 가솔린 2.5 프리미엄 초이스",
                date: "23년 11월",
                vhclRegNo: "123가4567",
                mileage: 1000,
                price: 3450,
                likeCount: 134,
              }}
              liked={false}
            />
            <CarItem
              car={{
                carId: 3,
                img: SampleImg,
                model: "2020 그랜저 가솔린 2.5 프리미엄 초이스",
                date: "23년 11월",
                vhclRegNo: "123가4567",
                mileage: 1000,
                price: 3450,
                likeCount: 134,
              }}
              liked
            />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * GET /used-car/filter?colorIds={colorIds}&modelTypes={modelTypes}&modelNames={modelNames}&mileageMin={mileageMin}&mileageMax={mileageMax}&yearMin={yearMin}&yearMax={yearMax}&fuelTypes={fuelTypes}&hasNavigation={hasNavigation}&hasHiPass={hasHiPass}&hasHeatedSteeringWheel={hasHeatedSteeringWheel}&hasHeatedSeats={hasHeatedSeats}&hasVentilatedSeats={hasVentilatedSeats}&hasPowerSeats={hasPowerSeats}&hasLeatherSeats={hasLeatherSeats}&hasPowerTrunk={hasPowerTrunk}&hasSunroof={hasSunroof}&hasHUD={hasHUD}&hasSurroundViewMonitor={hasSurroundViewMonitor}&hasRearMonitor={hasRearMonitor}&hasBlindSpotWarning={hasBlindSpotWarning}&hasLaneDepartureWarning={hasLaneDepartureWarning}&hasSmartCruiseControl={hasSmartCruiseControl}&hasFrontParkingWarning={hasFrontParkingWarning}&page={page}

 */
