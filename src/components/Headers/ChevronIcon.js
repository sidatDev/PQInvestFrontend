// Dropdown arrow - open hone par ghoom jata hai
export default function ChevronIcon({ isOpen, className = "w-4 h-4" }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`${className} shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
            <path d="M5 7.5l5 5 5-5" />
        </svg>
    );
}
