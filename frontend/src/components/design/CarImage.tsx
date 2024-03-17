import Image from "next/image";
import { FC } from "react";

const CarImage: FC = () => {
  return <div className="image-container-car">
    <Image
      width={900}
      height={400}
      src='/car.png'
      alt='sportcar'
      loading="lazy"
    />
  </div>
}

export default CarImage;