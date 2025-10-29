import Link from "next/link";


export default function SeeMoreBtn({id}: {id: number}) { 
    return (
        <Link href={`/serviceDetail/${id}`} > 
            <span className="bg-[var(--color-primary)] px-3 py-1 rounded-xl text-white hover:scale-[1.05] hover:bg-[var(--color-primary-hover)] transition">
                Ver más
            </span>
        </Link>
    );
}