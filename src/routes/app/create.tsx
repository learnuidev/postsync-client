import {
	createFileRoute,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { ArrowLeft, Image, Text, Video } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

export const Route = createFileRoute("/app/create")({
	component: CreatePost,
});

type PostType = "text" | "video" | "image";
type Platform =
	| "facebook"
	| "linkedin"
	| "threads"
	| "twitter"
	| "tiktok"
	| "youtube";

interface SocialAccount {
	id: string;
	name: string;
	platform: Platform;
	avatar?: string;
}

const PLATFORMS = {
	facebook: { name: "Facebook", icon: "📘" },
	linkedin: { name: "LinkedIn", icon: "💼" },
	threads: { name: "Threads", icon: "🧵" },
	twitter: { name: "Twitter", icon: "🐦" },
	tiktok: { name: "TikTok", icon: "🎵" },
	youtube: { name: "YouTube", icon: "📹" },
};

function CreatePost() {
	const { user } = useAuth();
	const { theme } = useTheme();
	const router = useRouter();
	const navigate = useNavigate();
	const dateId = useId();
	const timeId = useId();

	const [postType, setPostType] = useState<PostType | null>(null);
	const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
	const [content, setContent] = useState("");
	const [isScheduled, setIsScheduled] = useState(false);
	const [scheduleDate, setScheduleDate] = useState("");
	const [scheduleTime, setScheduleTime] = useState("");

	// Mock connected social accounts
	const [connectedAccounts, _setConnectedAccounts] = useState<SocialAccount[]>([
		{ id: "1", name: "John Doe", platform: "facebook" },
		{ id: "2", name: "John Professional", platform: "linkedin" },
		{ id: "3", name: "@johndoe", platform: "twitter" },
	])

	useEffect(() => {
		if (!user) {
			router.navigate({ to: "/login" });
		}
	}, [user, router]);

	const getPlatformsForPostType = (type: PostType): Platform[] => {
		switch (type) {
			case "text":
				return ["facebook", "linkedin", "threads", "twitter"];
			case "video":
				return [
					"facebook",
					"linkedin",
					"threads",
					"twitter",
					"tiktok",
					"youtube",
				]
			case "image":
				return ["facebook", "linkedin", "threads", "twitter", "tiktok"];
			default:
				return []
		}
	}

	const togglePlatform = (platform: Platform) => {
		if (selectedPlatforms.includes(platform)) {
			setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
		} else {
			setSelectedPlatforms([...selectedPlatforms, platform]);
		}
	}

	const handleBack = () => {
		navigate({ to: "/app" });
	}

	const handlePostTypeSelect = (type: PostType) => {
		setPostType(type);
		setSelectedPlatforms([]);
	}

	const handleCreatePost = () => {
		// Here you would implement the actual post creation logic
		alert("Post created successfully!");
		navigate({ to: "/app" });
	}

	if (!postType) {
		return (
			<div className={`min-h-screen ${theme.bg} pb-20`}>
				<div className="max-w-7xl mx-auto py-6 pt-24 sm:px-6 lg:px-8">
					<div className="px-4 py-6 sm:px-0">
						{/* Header */}
						<div className="flex items-center gap-4 mb-8">
							<button
								type="button"
								onClick={handleBack}
								className={`p-2 rounded-lg ${theme.card} ${theme.border} border hover:bg-opacity-80 transition-colors`}
							>
								<ArrowLeft className={`w-5 h-5 ${theme.text}`} />
							</button>
							<h1 className={`text-2xl font-bold ${theme.text}`}>
								Create New Post
							</h1>
						</div>

						{/* Post Type Selection */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<button
								type="button"
								onClick={() => handlePostTypeSelect("text")}
								className={`p-8 rounded-lg border ${theme.border} ${theme.card} hover:shadow-md transition-all duration-200 hover:scale-105 text-center`}
							>
								<div className="flex flex-col items-center gap-4">
									<div className={`p-4 ${theme.iconBg} rounded-full`}>
										<Text className={`w-8 h-8 ${theme.iconColor}`} />
									</div>
									<div>
										<h2 className={`text-xl font-semibold ${theme.text}`}>
											Text Post
										</h2>
										<p className={`${theme.textSecondary} mt-2`}>
											Share your thoughts with text content
										</p>
										<div className="flex justify-center gap-2 mt-4">
											{["facebook", "linkedin", "threads", "twitter"].map(
												(platform) => (
													<span key={platform} className="text-lg">
														{PLATFORMS[platform as Platform].icon}
													</span>
												),
											)}
										</div>
									</div>
								</div>
							</button>

							<button
								type="button"
								onClick={() => handlePostTypeSelect("video")}
								className={`p-8 rounded-lg border ${theme.border} ${theme.card} hover:shadow-md transition-all duration-200 hover:scale-105 text-center`}
							>
								<div className="flex flex-col items-center gap-4">
									<div className={`p-4 ${theme.iconBg} rounded-full`}>
										<Video className={`w-8 h-8 ${theme.iconColor}`} />
									</div>
									<div>
										<h2 className={`text-xl font-semibold ${theme.text}`}>
											Video Post
										</h2>
										<p className={`${theme.textSecondary} mt-2`}>
											Share engaging video content
										</p>
										<div className="flex justify-center gap-2 mt-4">
											{[
												"facebook",
												"linkedin",
												"threads",
												"twitter",
												"tiktok",
												"youtube",
											].map((platform) => (
												<span key={platform} className="text-lg">
													{PLATFORMS[platform as Platform].icon}
												</span>
											))}
										</div>
									</div>
								</div>
							</button>

							<button
								type="button"
								onClick={() => handlePostTypeSelect("image")}
								className={`p-8 rounded-lg border ${theme.border} ${theme.card} hover:shadow-md transition-all duration-200 hover:scale-105 text-center`}
							>
								<div className="flex flex-col items-center gap-4">
									<div className={`p-4 ${theme.iconBg} rounded-full`}>
										<Image className={`w-8 h-8 ${theme.iconColor}`} />
									</div>
									<div>
										<h2 className={`text-xl font-semibold ${theme.text}`}>
											Image Post
										</h2>
										<p className={`${theme.textSecondary} mt-2`}>
											Share stunning visual content
										</p>
										<div className="flex justify-center gap-2 mt-4">
											{[
												"facebook",
												"linkedin",
												"threads",
												"twitter",
												"tiktok",
											].map((platform) => (
												<span key={platform} className="text-lg">
													{PLATFORMS[platform as Platform].icon}
												</span>
											))}
										</div>
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`min-h-screen ${theme.bg} pb-20`}>
			<div className="max-w-7xl mx-auto py-6 pt-24 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Main Content - 2 columns */}
						<div className="lg:col-span-2">
							{/* Header */}
							<div className="flex items-center gap-4 mb-8">
								<button
									type="button"
									onClick={() => setPostType(null)}
									className={`p-2 rounded-lg ${theme.card} ${theme.border} border hover:bg-opacity-80 transition-colors`}
								>
									<ArrowLeft className={`w-5 h-5 ${theme.text}`} />
								</button>
								<h1 className={`text-2xl font-bold ${theme.text}`}>
									Create {postType.charAt(0).toUpperCase() + postType.slice(1)}{" "}
									Post
								</h1>
							</div>

							{/* Platform Selection */}
							<div
								className={`mb-8 p-4 ${theme.card} rounded-lg border ${theme.border}`}
							>
								<h3 className={`font-semibold ${theme.text} mb-4`}>
									Select Platforms
								</h3>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
									{getPlatformsForPostType(postType).map((platform) => (
										<button
											type="button"
											key={platform}
											onClick={() => togglePlatform(platform)}
											className={`p-3 rounded-lg border flex items-center gap-2 transition-all ${
												selectedPlatforms.includes(platform)
													? `border-blue-500 bg-blue-50 dark:bg-blue-900/20`
													: "${theme.border} ${theme.card}"
											}`}
										>
											<span className="text-lg">
												{PLATFORMS[platform].icon}
											</span>
											<span className={`text-sm ${theme.text}`}>
												{PLATFORMS[platform].name}
											</span>
										</button>
									))}
								</div>
							</div>

							{/* Content Editor */}
							<div
								className={`mb-8 p-4 ${theme.card} rounded-lg border ${theme.border}`}
							>
								<h3 className={`font-semibold ${theme.text} mb-4`}>Content</h3>
								{postType === "text" && (
									<textarea
										value={content}
										onChange={(e) => setContent(e.target.value)}
										placeholder="Write your post content here..."
										className={`w-full p-4 rounded-lg ${theme.input} ${theme.inputText} ${theme.inputBorder} border focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent min-h-[200px]`}
									/>
								)}
								{postType === "image" && (
									<div>
										<textarea
											value={content}
											onChange={(e) => setContent(e.target.value)}
											placeholder="Write your caption here..."
											className={`w-full p-4 rounded-lg ${theme.input} ${theme.inputText} ${theme.inputBorder} border focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent min-h-[100px] mb-4`}
										/>
										<div
											className={`border-2 border-dashed ${theme.inputBorder} rounded-lg p-8 text-center`}
										>
											<Image
												className={`w-12 h-12 ${theme.textSecondary} mx-auto mb-4`}
											/>
											<p className={`${theme.textSecondary} mb-2`}>
												Click to upload or drag and drop
											</p>
											<p className={`text-sm ${theme.textSecondary}`}>
												SVG, PNG, JPG or GIF (max. 800x400px)
											</p>
											<button
												type="button"
												className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
											>
												Select Image
											</button>
										</div>
									</div>
								)}
								{postType === "video" && (
									<div>
										<textarea
											value={content}
											onChange={(e) => setContent(e.target.value)}
											placeholder="Write your caption here..."
											className={`w-full p-4 rounded-lg ${theme.input} ${theme.inputText} ${theme.inputBorder} border focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent min-h-[100px] mb-4`}
										/>
										<div
											className={`border-2 border-dashed ${theme.inputBorder} rounded-lg p-8 text-center`}
										>
											<Video
												className={`w-12 h-12 ${theme.textSecondary} mx-auto mb-4`}
											/>
											<p className={`${theme.textSecondary} mb-2`}>
												Click to upload or drag and drop
											</p>
											<p className={`text-sm ${theme.textSecondary}`}>
												MP4, WebM or OGG (max. 800x400px)
											</p>
											<button
												type="button"
												className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
											>
												Select Video
											</button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Sidebar - 1 column */}
						<div className="lg:col-span-1">
							{/* Connected Accounts */}
							<div
								className={`p-4 ${theme.card} rounded-lg border ${theme.border} mb-6`}
							>
								<h3 className={`font-semibold ${theme.text} mb-4`}>
									Connected Accounts
								</h3>
								<div className="space-y-3">
									{connectedAccounts.map((account) => (
										<div
											key={account.id}
											className={`flex items-center justify-between p-3 rounded-lg ${theme.bg}`}
										>
											<div className="flex items-center gap-3">
												<div className="text-lg">
													{PLATFORMS[account.platform].icon}
												</div>
												<div>
													<p className={`text-sm font-medium ${theme.text}`}>
														{account.name}
													</p>
													<p className={`text-xs ${theme.textSecondary}`}>
														{PLATFORMS[account.platform].name}
													</p>
												</div>
											</div>
											<button
												type="button"
												className={`text-xs ${theme.link} ${theme.linkHover}`}
												onClick={() => togglePlatform(account.platform)}
											>
												{selectedPlatforms.includes(account.platform)
													? "Selected"
													: "Select"}
											</button>
										</div>
									))}
								</div>
							</div>

							{/* Schedule Options */}
							<div
								className={`p-4 ${theme.card} rounded-lg border ${theme.border}`}
							>
								<div className="flex items-center justify-between mb-4">
									<h3 className={`font-semibold ${theme.text}`}>Schedule</h3>
									<button
										type="button"
										onClick={() => setIsScheduled(!isScheduled)}
										className={`flex items-center gap-2 text-sm ${theme.link} ${theme.linkHover}`}
									>
										{isScheduled ? "Post Now" : "Schedule"}
									</button>
								</div>

								{isScheduled && (
									<div className="space-y-3">
										<div>
											<label
												htmlFor={dateId}
												className={`block text-sm font-medium ${theme.text} mb-1`}
											>
												Date
											</label>
											<input
												id={dateId}
												type="date"
												value={scheduleDate}
												onChange={(e) => setScheduleDate(e.target.value)}
												className={`w-full p-2 rounded-lg ${theme.input} ${theme.inputText} ${theme.inputBorder} border focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent`}
											/>
										</div>
										<div>
											<label
												htmlFor={timeId}
												className={`block text-sm font-medium ${theme.text} mb-1`}
											>
												Time
											</label>
											<input
												id={timeId}
												type="time"
												value={scheduleTime}
												onChange={(e) => setScheduleTime(e.target.value)}
												className={`w-full p-2 rounded-lg ${theme.input} ${theme.inputText} ${theme.inputBorder} border focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent`}
											/>
										</div>
									</div>
								)}

								{!isScheduled && (
									<div className={`p-3 rounded-lg ${theme.bg}`}>
										<div className="flex items-center gap-2">
											<Share className={`w-4 h-4 ${theme.textSecondary}`} />
											<p className={`text-sm ${theme.text}`}>
												Post immediately
											</p>
										</div>
									</div>
								)}
							</div>

							{/* Post Button */}
							<button
								type="button"
								onClick={handleCreatePost}
								disabled={!selectedPlatforms.length || !content.trim()}
								className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Post to {selectedPlatforms.length} platform
								{selectedPlatforms.length !== 1 && "s"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
