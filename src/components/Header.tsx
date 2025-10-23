import { Link, useRouter } from "@tanstack/react-router";
import { Calendar, LogIn, LogOut, Navigation } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	const { theme } = useTheme();
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogin = () => {
		router.navigate({ to: "/login" });
	};

	const handleLogout = () => {
		logout();
		router.navigate({ to: "/" });
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 p-4 ${theme.card} ${theme.border} border-b shadow-sm`}
		>
			<div className="flex justify-between items-center max-w-7xl mx-auto">
				<h1 className={`text-xl font-bold ${theme.text}`}>
					<Link to="/" className="flex items-center gap-2">
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
							<Navigation className="w-5 h-5 text-white" />
						</div>
						<span className={theme.text}>post sync</span>
					</Link>
				</h1>

				<div className="flex items-center gap-2">
					<ThemeToggle />

					{user ? (
						<button
							onClick={handleLogout}
							className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${theme.button} ${theme.buttonHover} ${theme.buttonText}`}
						>
							<LogOut className="w-4 h-4" />
							Logout
						</button>
					) : (
						<button
							onClick={handleLogin}
							className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${theme.button} ${theme.buttonHover} ${theme.buttonText}`}
						>
							<LogIn className="w-4 h-4" />
							Login
						</button>
					)}
				</div>
			</div>
		</header>
	);
}
