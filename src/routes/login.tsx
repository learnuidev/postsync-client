import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Calendar, Eye, EyeOff, Lock, Mail, Moon, Sun, Palette } from "lucide-react";
import { useEffect, useId, useState, createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

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
const themes: { [key: string]: Theme } = {
  light: {
    name: 'Light',
    bg: 'bg-gradient-to-br from-blue-50 via-white to-indigo-50',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-gray-300',
    input: 'bg-white',
    inputText: 'text-gray-900',
    inputPlaceholder: 'placeholder-gray-400',
    inputBorder: 'border-gray-300',
    inputFocusRing: 'focus:ring-blue-500',
    button: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    buttonHover: 'hover:from-blue-700 hover:to-indigo-700',
    buttonText: 'text-white',
    errorBg: 'bg-red-50',
    errorBorder: 'border-red-400',
    errorText: 'text-red-700',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    link: 'text-blue-600',
    linkHover: 'hover:text-blue-500'
  },
  dark: {
    name: 'Dark',
    bg: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-gray-100',
    textSecondary: 'text-gray-400',
    border: 'border-gray-700',
    input: 'bg-gray-700',
    inputText: 'text-gray-100',
    inputPlaceholder: 'placeholder-gray-500',
    inputBorder: 'border-gray-600',
    inputFocusRing: 'focus:ring-blue-500',
    button: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    buttonHover: 'hover:from-blue-700 hover:to-indigo-700',
    buttonText: 'text-white',
    errorBg: 'bg-red-900/30',
    errorBorder: 'border-red-600',
    errorText: 'text-red-400',
    iconBg: 'bg-gray-700',
    iconColor: 'text-blue-400',
    link: 'text-blue-400',
    linkHover: 'hover:text-blue-300'
  },
  beige: {
    name: 'Beige',
    bg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50',
    card: 'bg-amber-100',
    text: 'text-amber-900',
    textSecondary: 'text-amber-700',
    border: 'border-amber-300',
    input: 'bg-white',
    inputText: 'text-amber-900',
    inputPlaceholder: 'placeholder-amber-500',
    inputBorder: 'border-amber-300',
    inputFocusRing: 'focus:ring-amber-500',
    button: 'bg-gradient-to-r from-amber-600 to-orange-600',
    buttonHover: 'hover:from-amber-700 hover:to-orange-700',
    buttonText: 'text-white',
    errorBg: 'bg-red-100',
    errorBorder: 'border-red-500',
    errorText: 'text-red-800',
    iconBg: 'bg-amber-200',
    iconColor: 'text-amber-700',
    link: 'text-amber-700',
    linkHover: 'hover:text-amber-800'
  },
  rose: {
    name: 'Rose Dark',
    bg: 'bg-[hsl(340,20%,11%)]', // Using rgb(9,10,11) base with rose tint
    card: 'bg-[hsl(340,25%,16%)]',
    text: 'text-rose-100',
    textSecondary: 'text-rose-300',
    border: 'border-rose-800',
    input: 'bg-[hsl(340,20%,20%)]',
    inputText: 'text-rose-100',
    inputPlaceholder: 'placeholder-rose-400',
    inputBorder: 'border-rose-700',
    inputFocusRing: 'focus:ring-rose-500',
    button: 'bg-gradient-to-r from-rose-600 to-pink-600',
    buttonHover: 'hover:from-rose-700 hover:to-pink-700',
    buttonText: 'text-white',
    errorBg: 'bg-red-900/30',
    errorBorder: 'border-red-500',
    errorText: 'text-red-400',
    iconBg: 'bg-[hsl(340,25%,25%)]',
    iconColor: 'text-rose-400',
    link: 'text-rose-400',
    linkHover: 'hover:text-rose-300'
  }
};

// Create theme context
const ThemeContext = createContext<{
  theme: Theme;
  themeName: string;
  setTheme: (name: string) => void;
}>({
  theme: themes.light,
  themeName: 'light',
  setTheme: () => {}
});

// Theme provider hook
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const Route = createFileRoute("/login")({
	component: LoginComponent,
});

function LoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [themeName, setThemeName] = useState('light');
	const { login, isLoading, user } = useAuth();
	const router = useRouter();
	
	const theme = themes[themeName];

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

	// Theme toggle component
	const ThemeToggle = () => {
		const themeOptions = Object.keys(themes);
		
		return (
			<div className="absolute top-4 right-4">
				<div className="relative">
					<button
						type="button"
						className={`p-2 rounded-lg ${theme.card} ${theme.border} border shadow-sm transition-all duration-200 hover:shadow-md`}
						onClick={() => setThemeName(themeOptions[(themeOptions.indexOf(themeName) + 1) % themeOptions.length])}
						title={`Current theme: ${theme.name}. Click to switch theme.`}
					>
						{themeName === 'light' && <Sun className="h-5 w-5 text-yellow-500" />}
						{themeName === 'dark' && <Moon className="h-5 w-5 text-blue-400" />}
						{themeName === 'beige' && <Palette className="h-5 w-5 text-amber-600" />}
						{themeName === 'rose' && <Palette className="h-5 w-5 text-rose-400" />}
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className={`min-h-screen ${theme.bg} flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8 relative`}>
			<ThemeToggle />
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
							className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg ${theme.buttonText} ${theme.button} ${theme.buttonHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]`}
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
								<div className={`w-full border-t ${theme.border}`} />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className={`px-2 ${theme.card} ${theme.textSecondary}`}>
									New to PostSync?
								</span>
							</div>
						</div>

						<div className="mt-6">
							<a
								href="#"
								className={`w-full flex justify-center py-3 px-4 border ${theme.border} rounded-lg shadow-sm text-sm font-medium ${theme.text} ${theme.input} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
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
