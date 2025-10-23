import { Link } from "@tanstack/react-router";
import { BarChart3, Home, LogIn, LogOut, Calendar, Settings } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../contexts/ThemeContext";

export default function BottomNav() {
	const { user, logout } = useAuth();
	const { theme } = useTheme();

	// Only show bottom navigation if user is logged in
	if (!user) {
		return null;
	}

	return (
		<>
			{/* Desktop Navigation - Hidden on mobile */}
			<nav className="hidden md:flex fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
				<div className="bg-white border border-gray-200 rounded-full shadow-sm px-8 py-3">
					<div className="flex justify-center gap-8">
						<Link
							to="/"
							className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
							activeProps={{
								className: "flex items-center gap-2 text-blue-600",
							}}
						>
							<Home size={20} />
							<span>Home</span>
						</Link>

						<Link
							to="/app"
							className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
							activeProps={{
								className: "flex items-center gap-2 text-blue-600",
							}}
						>
							<BarChart3 size={20} />
							<span>Dashboard</span>
						</Link>

						<Link
							to="/app/calendar"
							className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
							activeProps={{
								className: "flex items-center gap-2 text-blue-600",
							}}
						>
							<Calendar size={20} />
							<span>Calendar</span>
						</Link>

						<Link
							to="/app/settings"
							className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
							activeProps={{
								className: "flex items-center gap-2 text-blue-600",
							}}
						>
							<Settings size={20} />
							<span>Settings</span>
						</Link>
					</div>
				</div>
			</nav>

			{/* Mobile Navigation - Hidden on desktop */}
			<nav className="fixed bottom-2 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 md:hidden">
				<div className="flex justify-around items-center py-2">
					<Link
						to="/"
						className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
						activeProps={{
							className: "flex flex-col items-center gap-1 p-2 text-blue-600",
						}}
					>
						<Home size={20} />
						<span className="text-xs">Home</span>
					</Link>

					<Link
						to="/app"
						className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
						activeProps={{
							className: "flex flex-col items-center gap-1 p-2 text-blue-600",
						}}
					>
						<BarChart3 size={20} />
						<span className="text-xs">Dashboard</span>
					</Link>

					<Link
						to="/app/calendar"
						className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
						activeProps={{
							className: "flex flex-col items-center gap-1 p-2 text-blue-600",
						}}
					>
						<Calendar size={20} />
						<span className="text-xs">Calendar</span>
					</Link>

					<Link
						to="/app/settings"
						className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
						activeProps={{
							className: "flex flex-col items-center gap-1 p-2 text-blue-600",
						}}
					>
						<Settings size={20} />
						<span className="text-xs">Settings</span>
					</Link>
				</div>
			</nav>
		</>
	);
}
