
type Environment = "production" | "staging" | "development";
type ErrorStatus = "OPEN" | "RESOLVED" | "IGNORED";
type NavPage = "dashboard" | "projects" | "errors" | "api-keys" | "create-project" | "profile";
type NavSection = "Manage" | "Monitor" | "Developer" | "Account" | null;
type EnvironmentFilter = "all" | Environment;
type ErrorStatusFilter = "all" | ErrorStatus;

interface User { id: string; name: string; email: string; isActive: boolean; createdAt: string; }
interface ErrorSummary { open: number; resolved: number; ignored: number; }
interface Project { id: string; name: string; description?: string; environment: Environment; createdAt: string; }
interface ProjectWithErrorSummary extends Project { errors: ErrorSummary; }
interface ApiKeyDisplay { id: string; projectId: string; keyId: string; prefix: string; isActive: boolean; createdAt: string; }
interface ErrorGroup { id: string; title: string; service: string; status: ErrorStatus; occurrences: number; firstSeen: string; }
interface NavItem { id: NavPage; label: string; Icon: FC; section: NavSection; badge?: number; hidden?: boolean; }
interface PageTitleConfig { title: string; subtitle: string; }
interface CreateProjectFormState { name: string; description: string; environment: Environment; }
interface UpdateProfileFormState { name: string; email: string; }
interface ChangePasswordFormState { current: string; next: string; confirm: string; }
interface DashboardPageProps { projects: ProjectWithErrorSummary[]; onNavigate: (page: NavPage) => void; }
interface ProjectsPageProps { projects: ProjectWithErrorSummary[]; onNavigate: (page: NavPage) => void; }
interface CreateProjectPageProps { onSuccess: () => void; toast: (message: string) => void; }
interface ApiKeysPageProps { projects: Project[]; toast: (message: string) => void; }
interface ProfilePageProps { toast: (message: string) => void; }
interface ErrorsPageProps { projects: Project[]; }
interface ToastProps { message: string; onDone: () => void; }
interface IconProps { d: string; size?: number; stroke?: string; fill?: string; }
