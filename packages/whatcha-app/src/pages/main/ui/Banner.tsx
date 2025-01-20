import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Banner.module.css";
import "./Banner.css";
import SampleImage from "@assets/sample-image.png";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router";

export function Banner() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        pagination={{ type: "fraction" }}
        loop={true}
      >
        <SwiperSlide>
          <div onClick={() => navigate("/event")}>
            <img src={SampleImage} alt="sample" />
          </div>
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
