

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import FavBtn from "./FavBtn";
import SeeMoreBtn from "./SeeMoreBtn";





export default function ServiceCard({ id, photo, name, provider, category, duration, rating, price }: { id: number, category: string, photo: string; name: string; provider: string; duration: string; rating: number; price: number }) {
    return (
        <div className="flex flex-col w-full max-w-[330px] h-[440px] border border-[#949492] rounded-lg hover:scale-105 transition-transform hover:shadow-lg bg-white">
                <div className="relative h-[60%]">
                    <img
                    src={photo}
                    alt={`Imagen de ${name}`}
                    className="w-full h-full rounded-t-lg object-cover"
                    />
                    <FavBtn />
                    <span className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-lg text-sm font-medium">
                    <FontAwesomeIcon icon={faTag} className="text-sm md:text-base" style={{ width: "1rem", height: "1rem" }} /> {category}
                    </span>
                </div>

                <p className="pt-2 px-2 text-2xl font-semibold text-[var(--color-primary)]">
                    {name}
                </p>
                <span className="px-2 text-md text-[#949492] font-medium">
                    Por {provider}
                </span>

                <span className="flex flex-row justify-between mt-8 px-1 border-b border-[#949492]">
                    <p className="px-2 text-md text-black/40 font-medium">
                    <FontAwesomeIcon icon={faClock} className="text-sm md:text-base" style={{ width: "1rem", height: "1rem" }}/> {duration}
                    </p>
                    <p className="px-2 text-md text-[var(--color-primary)] font-bold">
                    {rating} <FontAwesomeIcon icon={faStar} className="text-sm md:text-base" style={{ width: "1rem", height: "1rem" }}/>
                    </p>
                </span>

                <span className="flex flex-row justify-between px-1 mt-2">
                    <p className="px-2 text-md text-[var(--color-primary)] font-bold">
                    ${price} mxn
                    </p>
                    <SeeMoreBtn id={id} />
                </span>
                </div>
    )
};