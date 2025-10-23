import {
	createFileRoute,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import {
	ArrowLeft,
	Facebook,
	Image,
	Linkedin,
	Share,
	Text,
	// TwitterIcon as Threads,
	// TwitterIcon as TikTok,
	Twitter,
	Video,
	Youtube,
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { ThreadsIcon } from "@/components/icons/threads-icon";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/create")({
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

interface AccountGroup {
	id: string;
	name: string;
	accountIds: string[];
	createdAt: string;
}

const PLATFORMS = {
	facebook: { name: "Facebook", icon: Facebook },
	linkedin: { name: "LinkedIn", icon: Linkedin },
	threads: { name: "Threads", icon: ThreadsIcon },
	twitter: { name: "Twitter", icon: Twitter },
	tiktok: { name: "TikTok", icon: TikTokIcon },
	youtube: { name: "YouTube", icon: Youtube },
};

function CreatePost() {
	const { user } = useAuth();
	const { theme } = useTheme();
	const router = useRouter();
	const navigate = useNavigate();
	const dateId = useId();
	const timeId = useId();

	const [postType, setPostType] = useState<PostType | null>(null);
	const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
	const [content, setContent] = useState("");
	const [isScheduled, setIsScheduled] = useState(false);
	const [scheduleDate, setScheduleDate] = useState("");
	const [scheduleTime, setScheduleTime] = useState("");
	
	// Account groups state
	const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([]);
	const [activeTab, setActiveTab] = useState<'accounts' | 'groups'>('accounts');
	const [showGroupModal, setShowGroupModal] = useState(false);
	const [groupName, setGroupName] = useState("");

	// Mock connected social accounts
	const [connectedAccounts, _setConnectedAccounts] = useState<SocialAccount[]>([
		{ id: "1", name: "John Doe", platform: "facebook" },
		{ id: "2", name: "John Professional", platform: "linkedin" },
		{ id: "3", name: "@johndoe", platform: "twitter" },
		{ id: "4", name: "@johnthreads", platform: "threads" },
		{ id: "5", name: "John Creator", platform: "tiktok" },
	]);

	useEffect(() => {
		if (!user) {
			router.navigate({ to: "/login" });
		}
	}, [user, router]);
	
	// Load account groups from localStorage on mount
	useEffect(() => {
		const storedGroups = localStorage.getItem('accountGroups');
		if (storedGroups) {
			try {
				setAccountGroups(JSON.parse(storedGroups));
			} catch (error) {
				console.error('Error loading account groups:', error);
			}
		}
	}, []);
	
	// Save account groups to localStorage whenever they change
	useEffect(() => {
		if (accountGroups.length > 0) {
			localStorage.setItem('accountGroups', JSON.stringify(accountGroups));
		}
	}, [accountGroups]);

	const getAccountsForPostType = (type: PostType): SocialAccount[] => {
		const supportedPlatforms = {
			text: ["facebook", "linkedin", "threads", "twitter"],
			video: ["facebook", "linkedin", "threads", "twitter", "tiktok", "youtube"],
			image: ["facebook", "linkedin", "threads", "twitter", "tiktok"],
		} as const;
		
		return connectedAccounts.filter((account) => 
			supportedPlatforms[type]?.includes(account.platform)
		);
	};

	const toggleAccount = (accountId: string) => {
		if (selectedAccounts.includes(accountId)) {
			setSelectedAccounts(selectedAccounts.filter((id) => id !== accountId));
		} else {
			setSelectedAccounts([...selectedAccounts, accountId]);
		}
	};
	
	const saveAsGroup = () => {
		if (groupName.trim() && selectedAccounts.length > 1) {
			const newGroup: AccountGroup = {
				id: Date.now().toString(),
				name: groupName.trim(),
				accountIds: [...selectedAccounts],
				createdAt: new Date().toISOString(),
			};
			setAccountGroups([...accountGroups, newGroup]);
			setGroupName('');
			setShowGroupModal(false);
		}
	};
	
	const deleteGroup = (groupId: string) => {
		setAccountGroups(accountGroups.filter(group => group.id !== groupId));
	};
	
	const selectGroup = (group: AccountGroup) => {
		setSelectedAccounts(group.accountIds);
	};
	
	const getAccountsForGroup = (group: AccountGroup): SocialAccount[] => {
		return connectedAccounts.filter(account => group.accountIds.includes(account.id));
	};

	const handleBack = () => {
		navigate({ to: "/app" });
	};

	const handlePostTypeSelect = (type: PostType) => {
		setPostType(type);
		setSelectedAccounts([]);
	};

	const handleCreatePost = () => {
		// Here you would implement the actual post creation logic
		alert("Post created successfully!");
		navigate({ to: "/app" });
	};

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
												(platform) => {
													const IconComponent =
														PLATFORMS[platform as Platform].icon;
													return (
														<span key={platform} className="text-lg">
															<IconComponent className="w-5 h-5" />
														</span>
													);
												},
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
											].map((platform) => {
												const IconComponent =
													PLATFORMS[platform as Platform].icon;
												return (
													<span key={platform} className="text-lg">
														<IconComponent className="w-5 h-5" />
													</span>
												);
											})}
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
											].map((platform) => {
												const IconComponent =
													PLATFORMS[platform as Platform].icon;
												return (
													<span key={platform} className="text-lg">
														<IconComponent className="w-5 h-5" />
													</span>
												);
											})}
										</div>
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
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

							{/* Connected Accounts Selection */}
							<div
								className={`mb-8 p-4 ${theme.card} rounded-lg border ${theme.border}`}
							>
								{/* Tabs */}
								<div className="flex items-center justify-between mb-4">
									<div className="flex gap-2">
										<button
											type="button"
											onClick={() => setActiveTab('accounts')}
											className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
												activeTab === 'accounts'
													? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
													: `${theme.textSecondary} hover:${theme.text}`
											}`}
										>
											Connected Accounts
										</button>
										<button
											type="button"
											onClick={() => setActiveTab('groups')}
											className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
												activeTab === 'groups'
													? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
													: `${theme.textSecondary} hover:${theme.text}`
											}`}
										>
											Account Groups ({accountGroups.length})
										</button>
									</div>
								</div>

								{/* Save as Group Button */}
								{activeTab === 'accounts' && selectedAccounts.length > 1 && (
									<div className="mb-4">
										<button
											type="button"
											onClick={() => setShowGroupModal(true)}
											className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
										>
											Save {selectedAccounts.length} accounts as group
										</button>
									</div>
								)}

								{/* Tab Content */}
								{activeTab === 'accounts' ? (
									<div className="flex flex-wrap gap-3">
										{getAccountsForPostType(postType).map((account) => {
											const IconComponent = PLATFORMS[account.platform].icon;
											return (
												<div
													key={account.id}
													className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all ${
														selectedAccounts.includes(account.id)
															? `border-blue-500 bg-blue-50 dark:bg-blue-900/20`
															: `${theme.border} ${theme.card} hover:border-opacity-50`
													}`}
													onClick={() => toggleAccount(account.id)}
												>
													<div className="flex items-center gap-2">
														<IconComponent className={`w-4 h-4 ${
															selectedAccounts.includes(account.id) ? 'text-blue-600' : theme.textSecondary
														}`} />
														<span className={`text-sm font-medium ${
															selectedAccounts.includes(account.id) ? 'text-blue-600' : theme.text
														}`}>
															{account.name}
														</span>
														<span className={`text-xs ${
															selectedAccounts.includes(account.id) ? 'text-blue-500' : theme.textSecondary
														}`}>
															• {PLATFORMS[account.platform].name}
														</span>
													</div>
												</div>
											);
										})}
									</div>
								) : (
									<div className="flex flex-wrap gap-3">
										{accountGroups.length === 0 ? (
											<div className={`w-full text-center py-8 ${theme.textSecondary}`}>
												<p>No account groups yet</p>
												<p className="text-sm mt-2">Select multiple accounts and save them as a group</p>
											</div>
										) : (
											accountGroups.map((group) => {
												const groupAccounts = getAccountsForGroup(group);
												const uniquePlatforms = [...new Set(groupAccounts.map(account => account.platform))];
												
												return (
													<div
														key={group.id}
														className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all group ${
															group.accountIds.every(id => selectedAccounts.includes(id)) &&
															selectedAccounts.every(id => group.accountIds.includes(id))
																? `border-blue-500 bg-blue-50 dark:bg-blue-900/20`
																: `${theme.border} ${theme.card} hover:border-opacity-50`
														}`}
														onClick={() => selectGroup(group)}
													>
														<div className="flex items-center gap-2">
															{/* Platform Icons */}
															<div className="flex items-center -space-x-2">
																{uniquePlatforms.slice(0, 3).map((platform, index) => {
																	const IconComponent = PLATFORMS[platform].icon;
																	return (
																		<div
																			key={platform}
																			className={`w-5 h-5 rounded-full ${theme.bg} ${theme.border} border flex items-center justify-center`}
																			style={{ zIndex: 3 - index }}
																		>
																			<IconComponent className="w-3 h-3" />
																		</div>
																	);
																})}
																{uniquePlatforms.length > 3 && (
																	<div className={`w-5 h-5 rounded-full ${theme.bg} ${theme.border} border flex items-center justify-center text-xs ${theme.textSecondary}`}>
																		+{uniquePlatforms.length - 3}
																	</div>
																)}
															</div>
															{/* Group Name */}
															<span className={`text-sm font-medium ${
																group.accountIds.every(id => selectedAccounts.includes(id)) &&
																selectedAccounts.every(id => group.accountIds.includes(id))
																	? 'text-blue-600'
																	: theme.text
															}`}>
																{group.name}
															</span>
															{/* Account Count */}
															<span className={`text-xs ${
																group.accountIds.every(id => selectedAccounts.includes(id)) &&
																selectedAccounts.every(id => group.accountIds.includes(id))
																	? 'text-blue-500'
																	: theme.textSecondary
															}`}>
																({groupAccounts.length})
															</span>
														</div>
														{/* Delete Button */}
														<button
															type="button"
															onClick={(e) => {
																e.stopPropagation();
																deleteGroup(group.id);
															}}
															className={`opacity-0 group-hover:opacity-100 p-1 rounded-full ${theme.bg} ${theme.textSecondary} hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-all`}
														>
															<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
															</svg>
														</button>
													</div>
												);
											})
										)}
									</div>
								)}
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
								disabled={!selectedAccounts.length || !content.trim()}
								className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Post to {selectedAccounts.length} account
								{selectedAccounts.length !== 1 && "s"}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Group Creation Modal */}
			{showGroupModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className={`w-full max-w-md p-6 rounded-lg ${theme.card} ${theme.border} border mx-4`}>
						<h3 className={`text-lg font-semibold ${theme.text} mb-4`}>
							Create Account Group
						</h3>
						<p className={`${theme.textSecondary} mb-4`}>
							Grouping {selectedAccounts.length} accounts
						</p>
						<input
							type="text"
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							placeholder="Enter group name..."
							className={`w-full p-3 rounded-lg ${theme.input} ${theme.inputText} ${theme.inputBorder} border focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent mb-4`}
							autoFocus
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									saveAsGroup();
								} else if (e.key === 'Escape') {
									setShowGroupModal(false);
									setGroupName('');
								}
							}}
						/>
						<div className="flex gap-3 justify-end">
							<button
								type="button"
								onClick={() => {
									setShowGroupModal(false);
									setGroupName('');
								}}
								className={`px-4 py-2 rounded-lg ${theme.card} ${theme.border} border ${theme.text} hover:${theme.bg} transition-colors`}
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={saveAsGroup}
								disabled={!groupName.trim()}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Save Group
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
