import {
	createFileRoute,
	Link,
	redirect,
	useRouter,
} from "@tanstack/react-router";
import {
	BarChart3,
	Bell,
	Calendar,
	Home,
	Plus,
	Search,
	Settings,
} from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/app")({
	component: AppDashboard,
});

function AppDashboard() {
	const { user } = useAuth();
	const { theme } = useTheme();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.navigate({ to: "/login" });
		}
	}, [user, router]);

	return (
		<div className={`min-h-screen ${theme.bg}`}>
			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-6 pt-24 pb-24 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					{/* Welcome Section */}
					<div className="mb-8">
						<h1 className={`text-3xl font-bold ${theme.text} mb-2`}>
							Welcome back, {user?.name}
						</h1>
						<p className={`${theme.textSecondary}`}>
							Here's what's happening with your social media today.
						</p>
					</div>

					{/* Top Actions */}
					<div className="flex flex-col sm:flex-row gap-4 mb-8">
						<Link
							to="/app/create"
							className={`flex items-center justify-center gap-2 px-6 py-3 ${theme.button} ${theme.buttonText} rounded-lg font-medium transition-all duration-200 hover:scale-105`}
						>
							<Plus className="w-5 h-5" />
							New Post
						</Link>
						<div className="flex items-center flex-1">
							<div className="relative w-full">
								<Search
									className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.textSecondary}`}
								/>
								<input
									type="text"
									placeholder="Search posts..."
									className={`w-full pl-10 pr-4 py-3 border ${theme.inputBorder} rounded-lg ${theme.inputPlaceholder} ${theme.inputText} ${theme.input} focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent`}
								/>
							</div>
						</div>
						<button
							className={`relative p-3 ${theme.card} ${theme.border} border rounded-lg transition-all duration-200`}
						>
							<Bell className={`w-5 h-5 ${theme.text}`} />
							<span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
						</button>
					</div>

					{/* Quick Stats */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<div
							className={`${theme.card} p-6 rounded-lg shadow border ${theme.border}`}
						>
							<div className="flex items-center justify-between mb-4">
								<h3 className={`text-lg font-semibold ${theme.text}`}>
									Total Posts
								</h3>
								<div className={`p-2 ${theme.iconBg} rounded-lg`}>
									<BarChart3 className={`w-5 h-5 ${theme.iconColor}`} />
								</div>
							</div>
							<p className="text-3xl font-bold text-blue-600">24</p>
							<p className={`text-sm ${theme.textSecondary} mt-2`}>
								+12% from last month
							</p>
						</div>
						<div
							className={`${theme.card} p-6 rounded-lg shadow border ${theme.border}`}
						>
							<div className="flex items-center justify-between mb-4">
								<h3 className={`text-lg font-semibold ${theme.text}`}>
									Scheduled
								</h3>
								<div className={`p-2 ${theme.iconBg} rounded-lg`}>
									<Calendar className={`w-5 h-5 ${theme.iconColor}`} />
								</div>
							</div>
							<p className="text-3xl font-bold text-green-600">8</p>
							<p className={`text-sm ${theme.textSecondary} mt-2`}>
								Next post in 2 hours
							</p>
						</div>
						<div
							className={`${theme.card} p-6 rounded-lg shadow border ${theme.border}`}
						>
							<div className="flex items-center justify-between mb-4">
								<h3 className={`text-lg font-semibold ${theme.text}`}>
									Engagement
								</h3>
								<div className={`p-2 ${theme.iconBg} rounded-lg`}>
									<Home className={`w-5 h-5 ${theme.iconColor}`} />
								</div>
							</div>
							<p className="text-3xl font-bold text-purple-600">89%</p>
							<p className={`text-sm ${theme.textSecondary} mt-2`}>
								+5% from last week
							</p>
						</div>
					</div>

					{/* Recent Posts */}
					<div
						className={`${theme.card} rounded-lg shadow border ${theme.border}`}
					>
						<div className="p-6 border-b ${theme.border}">
							<div className="flex items-center justify-between">
								<h2 className={`text-xl font-semibold ${theme.text}`}>
									Recent Posts
								</h2>
								<Link
									to="/app/calendar"
									className={`text-sm ${theme.link} ${theme.linkHover}`}
								>
									View Calendar
								</Link>
							</div>
						</div>
						<div className="p-6">
							<div className="space-y-4">
								{[1, 2, 3].map((i) => (
									<div
										key={i}
										className={`flex items-center justify-between p-4 ${theme.bg} rounded-lg`}
									>
										<div className="flex items-center gap-4">
											<div
												className={`w-12 h-12 ${theme.iconBg} rounded-lg flex items-center justify-center`}
											>
												<Calendar className={`w-6 h-6 ${theme.iconColor}`} />
											</div>
											<div>
												<h4 className={`font-medium ${theme.text}`}>
													Product Launch Announcement
												</h4>
												<p className={`text-sm ${theme.textSecondary}`}>
													Scheduled for tomorrow at 2:00 PM
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<button
												className={`p-2 ${theme.card} ${theme.border} border rounded-lg hover:bg-opacity-80 transition-colors`}
											>
												<Search className={`w-4 h-4 ${theme.text}`} />
											</button>
											<button
												className={`p-2 ${theme.card} ${theme.border} border rounded-lg hover:bg-opacity-80 transition-colors`}
											>
												<Settings className={`w-4 h-4 ${theme.text}`} />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
