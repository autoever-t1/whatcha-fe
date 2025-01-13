import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Banner.module.css";
import "./Banner.css";
import SampleImage from "@assets/sample-image.png";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export function Banner() {
  return (
    <div className={styles.container}>
      <Swiper
        modules={[Pagination]}
        pagination={{ type: "fraction" }}
        loop={true}
      >
        <SwiperSlide>
          <img src={SampleImage} alt="sample" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={SampleImage} alt="sample" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={SampleImage} alt="sample" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
