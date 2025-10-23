import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Calendar, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../contexts/ThemeContext";

export const Route = createFileRoute("/login")({
	component: LoginComponent,
});

function LoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { login, isLoading, user } = useAuth();
	const router = useRouter();
	const { theme } = useTheme();

	const emailId = useId();
	const passwordId = useId();
	const rememberId = useId();

	useEffect(() => {
		if (user) {
			router.navigate({ to: "/app" });
		}
	}, [user, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const success = await login(email, password);
		if (success) {
			router.navigate({ to: "/app" });
		} else {
			setError("Invalid email or password. Try again or create a new account.");
		}
	};

	return (
		<div className={`min-h-screen ${theme.bg} flex items-center justify-center pb-12 pt-24 px-4 sm:px-6 lg:px-8`}>
			<div className={`max-w-md w-full space-y-8 ${theme.card} rounded-xl shadow-xl p-8 border ${theme.border}`}>
				<div className="text-center">
					<div className="flex justify-center mb-6">
						<div className={`p-3 ${theme.iconBg} rounded-full`}>
							<Calendar className={`h-8 w-8 ${theme.iconColor}`} />
						</div>
					</div>
					<h2 className={`mt-6 text-center text-3xl font-bold ${theme.text}`}>
						Welcome back
					</h2>
					<p className={`mt-2 text-center text-sm ${theme.textSecondary}`}>
						Sign in to your PostSync account to continue
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className={`${theme.errorBg} border-l-4 ${theme.errorBorder} p-4 rounded-md animate-fadeIn`}>
							<div className="flex">
								<div className="flex-shrink-0">
									<svg
										className={`h-5 w-5 ${theme.errorText}`}
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="ml-3">
									<p className={`text-sm ${theme.errorText}`}>{error}</p>
								</div>
							</div>
						</div>
					)}

					<div className="space-y-5">
						<div>
							<label
								htmlFor={emailId}
								className={`block text-sm font-medium ${theme.text} mb-2`}
							>
								Email address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className={`h-5 w-5 ${theme.textSecondary}`} />
								</div>
								<input
									id={emailId}
									name="email"
									type="email"
									autoComplete="email"
									required
									className={`appearance-none block w-full pl-10 pr-3 py-3 border ${theme.inputBorder} rounded-lg ${theme.inputPlaceholder} ${theme.inputText} ${theme.input} focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent transition duration-150 ease-in-out`}
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor={passwordId}
								className={`block text-sm font-medium ${theme.text} mb-2`}
							>
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className={`h-5 w-5 ${theme.textSecondary}`} />
								</div>
								<input
									id={passwordId}
									name="password"
									type={showPassword ? "text" : "password"}
									autoComplete="current-password"
									required
									className={`appearance-none block w-full pl-10 pr-10 py-3 border ${theme.inputBorder} rounded-lg ${theme.inputPlaceholder} ${theme.inputText} ${theme.input} focus:outline-none focus:ring-2 ${theme.inputFocusRing} focus:border-transparent transition duration-150 ease-in-out`}
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
									<button
										type="button"
										className={`${theme.textSecondary} hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out`}
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id={rememberId}
								name="remember-me"
								type="checkbox"
								className={`h-4 w-4 ${theme.link} focus:ring-blue-500 ${theme.inputBorder} rounded`}
							/>
							<label
								htmlFor={rememberId}
								className={`ml-2 block text-sm ${theme.text}`}
							>
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a
								href="#"
								className={`font-medium ${theme.link} ${theme.linkHover} transition duration-150 ease-in-out`}
							>
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg ${theme.buttonText} ${theme.button} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]`}
						>
							{isLoading ? (
								<span className="flex items-center">
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Signing in...
								</span>
							) : (
								"Sign in"
							)}
						</button>
					</div>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-600">
									New to PostSync?
								</span>
							</div>
						</div>

						<div className="mt-6">
							<a
								href="#"
								className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
							>
								Start your 14-day free trial
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
