import Image from "next/image";
import { FC } from "react";

const LinesImage: FC = () => {
  return <div className="image-container-lines">
    <Image
      width={1920}
      height={1280}
      src='/lines.png'
      alt='lines background'
      loading="lazy"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </div>
}

export default LinesImage;