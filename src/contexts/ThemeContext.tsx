import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

// Define theme types
interface Theme {
	name: string;
	bg: string;
	card: string;
	text: string;
	textSecondary: string;
	border: string;
	input: string;
	inputText: string;
	inputPlaceholder: string;
	inputBorder: string;
	inputFocusRing: string;
	button: string;
	buttonHover: string;
	buttonText: string;
	errorBg: string;
	errorBorder: string;
	errorText: string;
	iconBg: string;
	iconColor: string;
	link: string;
	linkHover: string;
}

// Define themes
export const themes: { [key: string]: Theme } = {
	light: {
		name: "Light",
		bg: "bg-gray-50",
		card: "bg-white",
		text: "text-gray-900",
		textSecondary: "text-gray-600",
		border: "border-gray-200",
		input: "bg-white",
		inputText: "text-gray-900",
		inputPlaceholder: "placeholder-gray-400",
		inputBorder: "border-gray-300",
		inputFocusRing: "focus:ring-blue-500",
		button: "bg-blue-600 hover:bg-blue-700",
		buttonHover: "hover:bg-blue-700",
		buttonText: "text-white",
		errorBg: "bg-red-50",
		errorBorder: "border-red-400",
		errorText: "text-red-700",
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
		link: "text-blue-600",
		linkHover: "hover:text-blue-500",
	},
	dark: {
		name: "Dark",
		bg: "bg-[rgb(9,10,11)]",
		card: "bg-[rgb(20,20,22)]",
		text: "text-[rgb(248,248,248)]",
		textSecondary: "text-[rgb(162,162,165)]",
		border: "border-[rgb(58,58,60)]",
		input: "bg-[rgb(28,28,30)]",
		inputText: "text-[rgb(248,248,248)]",
		inputPlaceholder: "placeholder-[rgb(138,138,142)]",
		inputBorder: "border-[rgb(58,58,60)]",
		inputFocusRing: "focus:ring-blue-500",
		button: "bg-blue-600 hover:bg-blue-700",
		buttonHover: "hover:bg-blue-700",
		buttonText: "text-white",
		errorBg: "bg-red-900/30",
		errorBorder: "border-red-600",
		errorText: "text-red-400",
		iconBg: "bg-[rgb(28,28,30)]",
		iconColor: "text-blue-400",
		link: "text-blue-400",
		linkHover: "hover:text-blue-300",
	},
	beige: {
		name: "Beige",
		bg: "bg-amber-50",
		card: "bg-amber-100",
		text: "text-amber-900",
		textSecondary: "text-amber-700",
		border: "border-amber-300",
		input: "bg-white",
		inputText: "text-amber-900",
		inputPlaceholder: "placeholder-amber-500",
		inputBorder: "border-amber-300",
		inputFocusRing: "focus:ring-amber-500",
		button: "bg-amber-600 hover:bg-amber-700",
		buttonHover: "hover:bg-amber-700",
		buttonText: "text-white",
		errorBg: "bg-red-100",
		errorBorder: "border-red-500",
		errorText: "text-red-800",
		iconBg: "bg-amber-200",
		iconColor: "text-amber-700",
		link: "text-amber-700",
		linkHover: "hover:text-amber-800",
	},
	rose: {
		name: "Rose Dark",
		bg: "bg-[hsl(340,20%,11%)]", // Using rgb(9,10,11) base with rose tint
		card: "bg-[hsl(340,25%,16%)]",
		text: "text-rose-100",
		textSecondary: "text-rose-300",
		border: "border-rose-800",
		input: "bg-[hsl(340,20%,20%)]",
		inputText: "text-rose-100",
		inputPlaceholder: "placeholder-rose-400",
		inputBorder: "border-rose-700",
		inputFocusRing: "focus:ring-rose-500",
		button: "bg-rose-600 hover:bg-rose-700",
		buttonHover: "hover:bg-rose-700",
		buttonText: "text-white",
		errorBg: "bg-red-900/30",
		errorBorder: "border-red-500",
		errorText: "text-red-400",
		iconBg: "bg-[hsl(340,25%,25%)]",
		iconColor: "text-rose-400",
		link: "text-rose-400",
		linkHover: "hover:text-rose-300",
	},
};

interface ThemeContextType {
	theme: Theme;
	themeName: string;
	setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [themeName, setThemeName] = useState("light"); // Default to light on server side
	const [isClient, setIsClient] = useState(false);

	// Check if we're on the client side
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Load theme from localStorage on client side
	useEffect(() => {
		if (isClient) {
			// Try to get theme from localStorage, default to 'light' if not found
			const savedTheme = localStorage.getItem("theme");
			if (savedTheme && themes[savedTheme]) {
				setThemeName(savedTheme);
			}
		}
	}, [isClient]);

	const setTheme = (name: string) => {
		if (themes[name]) {
			setThemeName(name);
			// Only access localStorage on client side
			if (isClient) {
				localStorage.setItem("theme", name);
			}
		}
	};

	useEffect(() => {
		// Only apply theme class on client side
		if (isClient) {
			document.documentElement.className = themeName;
		}
	}, [themeName, isClient]);

	return (
		<ThemeContext.Provider
			value={{ theme: themes[themeName], themeName, setTheme }}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
