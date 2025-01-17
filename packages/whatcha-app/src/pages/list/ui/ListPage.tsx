import { useNavigate, useSearchParams } from "react-router";
import styles from "./ListPage.module.css";
import { MainHeader } from "@shared/main-header";
import { CarItem } from "@shared/car-item";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getUsedCarByConditions,
  getUsedCarByKeyword,
  options,
  UsedCarListDto,
} from "@/entities/used-car";
import { PageResponse } from "@/shared";

export function ListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [carList, setCarList] = useState<UsedCarListDto[]>([]);

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
    let response: PageResponse<UsedCarListDto>;
    if (type === "search") {
      if (keyword) {
        response = await getUsedCarByKeyword(keyword, 0);
      } else {
        response = await getUsedCarByConditions(queries, 0);
      }
    }

    setCarList(response!.content);
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
            {carList.map((car) => (
              <CarItem car={car} liked />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * GET /used-car/filter?colorIds={colorIds}&modelTypes={modelTypes}&modelNames={modelNames}&mileageMin={mileageMin}&mileageMax={mileageMax}&yearMin={yearMin}&yearMax={yearMax}&fuelTypes={fuelTypes}&hasNavigation={hasNavigation}&hasHiPass={hasHiPass}&hasHeatedSteeringWheel={hasHeatedSteeringWheel}&hasHeatedSeats={hasHeatedSeats}&hasVentilatedSeats={hasVentilatedSeats}&hasPowerSeats={hasPowerSeats}&hasLeatherSeats={hasLeatherSeats}&hasPowerTrunk={hasPowerTrunk}&hasSunroof={hasSunroof}&hasHUD={hasHUD}&hasSurroundViewMonitor={hasSurroundViewMonitor}&hasRearMonitor={hasRearMonitor}&hasBlindSpotWarning={hasBlindSpotWarning}&hasLaneDepartureWarning={hasLaneDepartureWarning}&hasSmartCruiseControl={hasSmartCruiseControl}&hasFrontParkingWarning={hasFrontParkingWarning}&page={page}

 */
