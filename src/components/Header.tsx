import { Link, useRouter } from "@tanstack/react-router";
import {
	Calendar,
	Home,
	LogIn,
	LogOut,
	Navigation,
	Search,
	Settings,
} from "lucide-react";
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
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 p-4 ${theme.card} ${theme.border} border-b shadow-sm`}
			>
				<div className="flex justify-between items-center max-w-7xl mx-auto">
					<h1 className={`text-xl font-bold ${theme.text}`}>
						<Link to="/" className="flex items-center gap-2">
							<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
								<Navigation className="w-5 h-5 text-white" />
							</div>
							<span className={theme.text}>PostSync</span>
						</Link>
					</h1>

					<div className="flex items-center gap-2">
						{/* Search in header for logged in users */}
						{user && (
							<div className="relative">
								<input
									type="text"
									placeholder="Search..."
									className={`pl-10 pr-4 py-2 border ${theme.inputBorder} rounded-lg ${theme.inputPlaceholder} ${theme.inputText} ${theme.input} focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent`}
								/>
								<Search
									className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.textSecondary}`}
								/>
							</div>
						)}

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

			{/* Secondary Navigation for logged in users - simplified */}
			{user && (
				<nav
					className={`fixed top-20 left-0 right-0 z-40 px-4 ${theme.card} ${theme.border} border-b shadow-sm`}
				>
					<div className="flex justify-center max-w-7xl mx-auto">
						<div className="flex gap-6">
							<Link
								to="/app"
								className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${theme.text} ${theme.link} ${theme.linkHover} transition-all duration-200 hover:scale-105`}
								activeProps={{
									className: `${theme.button} ${theme.buttonText}`,
								}}
							>
								<Home className="w-4 h-4" />
								<span>Dashboard</span>
							</Link>

							<Link
								to="/app/calendar"
								className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${theme.text} ${theme.link} ${theme.linkHover} transition-all duration-200 hover:scale-105`}
							>
								<Calendar className="w-4 h-4" />
								<span>Calendar</span>
							</Link>

							<button
								className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${theme.text} ${theme.link} ${theme.linkHover} transition-all duration-200 hover:scale-105`}
							>
								<Settings className="w-4 h-4" />
								<span>Settings</span>
							</button>
						</div>
					</div>
				</nav>
			)}
		</>
	);
}
