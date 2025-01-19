import { useNavigate, useSearchParams } from "react-router";
import styles from "./ListPage.module.css";
import { MainHeader } from "@shared/main-header";
import { CarItem } from "@shared/car-item";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getLikedCar,
  getUsedCarByConditions,
  getUsedCarByKeyword,
  likeUsedCar,
  options,
  UsedCarListDto,
} from "@/entities/used-car";
import { PageResponse } from "@/shared";

export function ListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [carList, setCarList] = useState<UsedCarListDto[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setLoading] = useState(false);

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
    return type === "like"
      ? "나의 찜 목록"
      : type === "search" && keyword
      ? keyword
      : "검색 결과";
  }, [type, keyword]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  const getData = async () => {
    let response: PageResponse<UsedCarListDto>;
    if (type === "search") {
      if (keyword) {
        response = await getUsedCarByKeyword(keyword, page);
      } else {
        response = await getUsedCarByConditions(queries, page);
      }
    } else if (type === "like") {
      response = await getLikedCar(page);
    }

    setCarList((prev) => [...prev, ...response!.content]);
    setLoading(false);
    setHasNextPage(!response!.last);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [page]);

  const handleClickLike = useCallback(async (usedCarId: number) => {
    const response = await likeUsedCar(usedCarId);

    setCarList((prev) => {
      const newList = [...prev];
      const target = newList.find((car) => car.usedCarId === usedCarId);
      if (!target) return prev;
      else {
        target.isLiked = response;
        return newList;
      }
    });
  }, []);

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
              <CarItem
                key={car.usedCarId}
                car={car}
                onClickLike={() => handleClickLike(car.usedCarId)}
              />
            ))}
            <div ref={lastItemRef} style={{ height: "1px" }} />
          </div>
        </div>
      )}
    </div>
  );
}
